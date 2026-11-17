import type { Term } from '../data/terms';
import { choseong, compareKo, disassemble, isChoseongOnly } from './hangul';

export type Range = [start: number, end: number];
export type Hit = {
  term: Term;
  score: number;
  /** name = 이름에서 찾음, desc = 설명에서 찾음 */
  where: 'name' | 'desc';
  ko?: Range;
  en?: Range;
  /** 설명에서 찾았을 때 보여 줄 글과 강조할 곳 */
  desc?: { text: string; ranges: Range[] };
  /** 다른 이름에서 찾았을 때 그 이름 */
  alias?: string;
};

const strip = (s: string) => s.toLowerCase().replace(/\s+/g, '');

/** 띄어쓰기·대소문자를 무시하고 찾기. 원래 글에서의 위치를 돌려줌 */
export function findLoose(text: string, query: string): Range | null {
  const q = strip(query);
  if (!q) return null;
  const map: number[] = [];
  let flat = '';
  for (let i = 0; i < text.length; i++) {
    if (/\s/.test(text[i])) continue;
    flat += text[i].toLowerCase();
    map.push(i);
  }
  const at = flat.indexOf(q);
  return at < 0 ? null : [map[at], map[at + q.length - 1] + 1];
}

/** "아래서 올라오는 창" → ["아래서", "올라오는"]: 한 글자 낱말은 빼고 낱말로 나눔 */
function words(query: string): string[] {
  return query.trim().split(/\s+/).filter((w) => w.length >= 2);
}

/**
 * 낱말 끝(조사·어미)을 떼고 찾기. "아래서" → "아래", "넘기는" → "넘기", 그래도 없으면 "넘"
 * strong = 두 글자 이상 맞음
 */
function findStem(text: string, word: string): { range: Range; strong: boolean } | null {
  for (let n = Math.max(2, word.length - 2); n >= 2; n--) {
    const r = findLoose(text, word.slice(0, n));
    if (r) return { range: r, strong: true };
  }
  const r = /[가-힣]/.test(word[0]) ? findLoose(text, word[0]) : null;
  return r ? { range: r, strong: false } : null;
}

function matchTerm(term: Term, query: string): Hit | null {
  const q = strip(query);

  // 1) 이름 (한글 → 초성 → 다른 이름 → 영어)
  const ko = findLoose(term.ko, query);
  if (ko) {
    const flat = strip(term.ko);
    const score = flat === q ? 100 : flat.startsWith(q) ? 90 : 80;
    return { term, score, where: 'name', ko };
  }
  if (isChoseongOnly(query)) {
    const cho = findLoose(choseong(term.ko), query);
    if (cho) return { term, score: cho[0] === 0 ? 76 : 70, where: 'name', ko: cho };
    for (const a of term.aliases) if (findLoose(choseong(a), query)) return { term, score: 62, where: 'name', alias: a };
    return null;
  }
  for (const a of term.aliases) if (findLoose(a, query)) return { term, score: 66, where: 'name', alias: a };
  const en = findLoose(term.en, query);
  if (en) return { term, score: strip(term.en).startsWith(q) ? 64 : 60, where: 'name', en };

  // 2) 설명: 뜻 → 프롬프트 예시 문장 순서로, 검색어가 그대로 들어 있는지
  const texts = [term.meaning, term.prompt];
  for (const text of texts) {
    const r = findLoose(text, query);
    if (r) return { term, score: text === term.meaning ? 40 : 34, where: 'desc', desc: { text, ranges: [r] } };
  }

  // 3) 여러 낱말로 풀어 쓴 말: 낱말 끝을 떼고 모두 들어 있는지 ("아래서 올라오는 창" → 바텀시트)
  const list = [...new Set(words(query))];
  if (list.length >= 2) {
    for (const text of texts) {
      const found = list.map((w) => findStem(text, w));
      if (!found.every(Boolean) || !found.some((f) => f!.strong)) continue;
      const ranges = found.map((f) => f!.range).sort((a, b) => a[0] - b[0]);
      // 낱말이 그대로 많이 들어 있을수록 위로
      const exact = query.trim().split(/\s+/).filter((w) => findLoose(text, w)).length;
      const score = (found.every((f) => f!.strong) ? 20 : 12) + exact * 2 - (text === term.prompt ? 1 : 0);
      return { term, score, where: 'desc', desc: { text, ranges } };
    }
  }
  return null;
}

export function search(terms: Term[], query: string): Hit[] {
  if (!strip(query)) return [];
  const hits = terms.map((t) => matchTerm(t, query)).filter((h): h is Hit => !!h);
  hits.sort((a, b) => b.score - a.score || compareKo(a.term.ko, b.term.ko));
  // 느슨하게 맞은 것(낱말 끝을 떼고 찾은 것)은 많아지기 쉬워서 위에서 12개만
  const sure = hits.filter((h) => h.score >= 30);
  return [...sure, ...hits.filter((h) => h.score < 30).slice(0, 12)];
}

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

/** 결과가 없을 때: 글자가 비슷한 이름 추천 */
export function suggest(terms: Term[], query: string, count = 6): Term[] {
  const q = disassemble(strip(query));
  if (!q) return [];
  return terms
    .map((term) => {
      const best = Math.min(
        ...[term.ko, ...term.aliases, term.en].map((name) => {
          const n = disassemble(strip(name));
          // 앞부분만 비교해서 긴 이름도 걸리게
          return Math.min(distance(q, n), distance(q, n.slice(0, q.length))) / Math.max(q.length, 1);
        }),
      );
      return { term, best };
    })
    .filter((x) => x.best <= 0.5)
    .sort((a, b) => a.best - b.best || compareKo(a.term.ko, b.term.ko))
    .slice(0, count)
    .map((x) => x.term);
}
