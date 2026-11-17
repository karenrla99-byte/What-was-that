/**
 * docs/TERMS.md + docs/notion-terms.md → src/data/terms.json
 * 실행: npm run build:terms
 *
 * - 이름만 적힌 용어의 뜻은 notion-terms.md에서 가져옴
 * - `vs 가 vs 나` 줄은 두 용어의 vs 칸으로 연결 (짝이 용어로 없으면 비교 카드 하나로)
 * - 프롬프트 초안은 scripts/prompt-drafts.md, 쉬운 뜻은 scripts/easy-drafts.md에서 읽음
 */
import { readFileSync, writeFileSync } from 'node:fs';

type GroupKey = 'start' | 'look' | 'parts' | 'motion' | 'screens' | 'gesture' | 'learn' | 'ux' | 'size' | 'build' | 'ai';
type Term = {
  id: string;
  ko: string;
  en: string;
  aliases: string[];
  groups: { group: GroupKey; sub: string; order: number }[];
  short: string;
  meaning: string;
  /** 쉬운 뜻 (상세 화면의 '뜻') */
  easy: string;
  prompt: string;
  related: string[];
  vs?: string[];
  vsNote?: Record<string, string>;
  anim: { type: string; params?: Record<string, unknown> };
  tryIt?: boolean;
  starter?: boolean;
  sprout?: boolean;
  draft?: boolean;
};

const root = new URL('..', import.meta.url);
const read = (p: string) => readFileSync(new URL(p, root), 'utf8');

// ───────── 손으로 정한 규칙 ─────────
const GROUP_NAMES: Record<string, GroupKey> = {
  '처음 시작': 'start', '생김새': 'look', '부품': 'parts', '움직임': 'motion', '상황별 화면': 'screens',
  '손동작': 'gesture', '학습·게임 UI': 'learn', 'UX 원칙': 'ux', '화면 크기': 'size',
  '만들고 배포하기': 'build', 'AI와 일하기': 'ai',
};

/** TERMS.md 작은 분류 → notion-terms.md에서 먼저 찾아볼 장 */
const NOTION_SECTIONS: Record<string, string[]> = {
  '화면 배치': ['화면 배치', '레이아웃'],
  '버튼': ['버튼 상태'],
  '검색 화면': ['검색 화면 구성 요소'],
};

/** 같은 용어로 합치기: "이름@작은 분류" 또는 "이름" → 합쳐질 용어의 한글 이름 */
const MERGE: Record<string, string> = {
  '진행 링': '원형 진행률',
  '공유 요소': '공유 요소 전환',
  '줌': '확대 전환',
  '검색 결과 없음': '결과 없음',
};

/** 다른 이름(검색·vs 연결용) */
const ALIASES: Record<string, string[]> = {
  '안쪽 여백': ['패딩'],
  '바깥 여백': ['마진'],
  '스위치': ['토글'],
  '수량 스테퍼': ['스테퍼'],
  '기본': ['디폴트'],
  '바텀시트': ['하단 시트'],
  '벤토 그리드': ['벤토 레이아웃'],
  '스플릿': ['스플릿 레이아웃'],
  '메이슨리': ['메이슨리 레이아웃'],
  '아트 데코': ['아르데코'],
  '끌어다 놓기': ['드래그 앤 드롭'],
  '픽셀@반응형과 위치': ['px'],
};

/** 영어 이름이 원본에 없는 용어 */
const EN: Record<string, string> = {
  '좋은 프롬프트 4요소': 'Four Parts of a Good Prompt',
  'PRD': 'Product Requirements Document',
  '벡터 vs 비트맵': 'Vector vs Bitmap',
  '단일 HTML vs 리액트 프로젝트': 'Single HTML vs React Project',
};

/** id 직접 정하기 (영어 이름이 겹치는 서로 다른 용어) */
const ID: Record<string, string> = {
  '반복문@코드 기본': 'loop-statement',
  '픽셀@반응형과 위치': 'px',
};

/** 분류 태그 더 달기 (PLAN.md 4장 겹침 표) */
const EXTRA_GROUPS: Record<string, { group: GroupKey; sub: string }[]> = {
  '날짜 선택': [{ group: 'parts', sub: '날짜 고르는 UI' }],
  '캘린더': [{ group: 'parts', sub: '입력 폼' }],
  '기간 선택': [{ group: 'parts', sub: '입력 폼' }],
};

/** 여러 분류에 나올 때 대표로 삼을 분류 (뜻도 그 분류 것을 씀) */
const PRIMARY_SUB: Record<string, string> = { '바텀시트': '알림·피드백' };

/** 같이 쓰면 좋은 말을 직접 정한 것 (한글 이름) */
const RELATED: Record<string, string[]> = { '바텀시트': ['오버레이', '시트 확장', '스와이프'] };

/** 처음이라면 이것부터 (PLAN.md 3-7, 이 순서대로) */
const STARTERS = ['바이브코딩', '프롬프트', '코드 블록', '컴포넌트', '반응형', '모달', '토스트', '바텀시트', '배포', '에러 메시지', '콘솔', '되돌리기'];

/** 직접 해보기 */
const TRY_IT = ['스위치', '슬라이더', '체크박스', '라디오', '세그먼트', '별점', '수량 스테퍼', '아코디언', '탭@이동 부품', '바텀시트', '모달', '토스트', '스와이프', '드래그'];

/** 작은 분류 → 애니메이션 템플릿 (없으면 묶음 기본값) */
const ANIM_BY_GROUP: Record<GroupKey, string> = {
  start: 'BrowserWindow', look: 'StyleSwatch', parts: 'MiniPhone', motion: 'MotionBox', screens: 'MiniPhone',
  gesture: 'Finger', learn: 'DragQuiz', ux: 'BeforeAfter', size: 'ResizeFrame', build: 'FlowDiagram', ai: 'ChatFlow',
};
const ANIM_BY_SUB: Record<string, string> = {
  '화면 배치': 'LayoutSketch', '꾸밈 속성': 'PropertyMorph', '색과 글자': 'PropertyMorph', '그림과 파일 형식': 'Default',
  '화면 전환': 'MiniPhone', '로딩 패턴': 'MiniPhone', '완료 표시': 'MiniPhone',
};

// ───────── 도구 ─────────
const hasHangul = (s: string) => /[가-힣]/.test(s);
const kebab = (s: string) =>
  s.toLowerCase().replace(/'s\b/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function splitName(raw: string): { ko: string; paren?: string } {
  const m = raw.match(/^(.*?)\s*\((.*)\)$/);
  return m ? { ko: m[1].trim(), paren: m[2].trim() } : { ko: raw.trim() };
}

// ───────── notion-terms.md 읽기 ─────────
type NotionEntry = { ko: string; en: string; meaning: string; section: string };
const notion: NotionEntry[] = [];
{
  let section = '';
  for (const line of read('docs/notion-terms.md').split('\n')) {
    const h = line.match(/^## (.+)$/);
    if (h) { section = h[1].trim(); continue; }
    const m = line.match(/^- \*\*(.+?) \((.+)\)\*\*: (.*)$/);
    if (m) notion.push({ ko: m[1].trim(), en: m[2].trim(), meaning: m[3].trim(), section });
  }
}
const usedNotion = new Set<NotionEntry>();
function findNotion(name: string, sub: string): NotionEntry | undefined {
  const sections = NOTION_SECTIONS[sub] ?? [sub];
  const inSec = notion.filter((n) => sections.includes(n.section));
  return (
    inSec.find((n) => n.ko === name) ??
    inSec.find((n) => n.ko.startsWith(name + ' ')) ??
    notion.find((n) => n.ko === name) ??
    notion.find((n) => n.ko.startsWith(name + ' '))
  );
}

// ───────── TERMS.md 읽기 ─────────
type Raw = { ko: string; en: string; meaning: string; aliases: string[]; group: GroupKey; sub: string; sprout: boolean; fromNotion: boolean };
type RawVs = { sides: string[]; en?: string; meaning: string; group: GroupKey; sub: string; sprout: boolean };
const raws: Raw[] = [];
const rawVs: RawVs[] = [];
const problems: string[] = [];
{
  let group: GroupKey | null = null;
  let sub = '';
  for (const line of read('docs/TERMS.md').split('\n')) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      const name = Object.keys(GROUP_NAMES).find((n) => h2[1].endsWith(n));
      group = name ? GROUP_NAMES[name] : null;
      sub = '';
      continue;
    }
    const h3 = line.match(/^### (.+)$/);
    if (h3) { sub = h3[1].trim(); continue; }
    if (!group || !sub || !line.trim() || /^(>|\||---)/.test(line)) continue;

    if (line.startsWith('- ')) {
      const sprout = line.includes('🌱');
      for (const m of line.matchAll(/\*\*(.+?)\*\*(?::\s*(.*?))?(?=\s*·\s*\*\*|$)/g)) {
        const name = m[1].trim();
        const meaning = (m[2] ?? '').trim();
        if (name.startsWith('vs ')) {
          const { ko, paren } = splitName(name.slice(3));
          rawVs.push({ sides: ko.split(' vs ').map((x) => x.trim()), en: paren, meaning, group, sub, sprout });
        } else {
          const { ko, paren } = splitName(name);
          const aliases: string[] = [];
          let en = paren ?? '';
          if (paren && hasHangul(paren)) { aliases.push(paren); en = ''; }
          raws.push({ ko, en: en || EN[ko] || ko, meaning, aliases, group, sub, sprout, fromNotion: false });
        }
      }
    } else {
      for (const part of line.split(' · ')) {
        const m = part.trim().match(/^(.*?)\((?:=\s*)?(.+)\)$/);
        const ko = (m ? m[1] : part).trim();
        const aliases = m ? [m[2].trim()] : [];
        const n = findNotion(ko, sub);
        if (!n) problems.push(`뜻 못 찾음: ${sub} > ${ko}`);
        else usedNotion.add(n);
        raws.push({ ko, en: n?.en ?? ko, meaning: n?.meaning ?? '', aliases, group, sub, sprout: false, fromNotion: true });
      }
    }
  }
}

// ───────── 용어 합치기 ─────────
const terms: Term[] = [];
const byId = new Map<string, Term>();
const merges: string[] = [];
const pick = <T,>(map: Record<string, T>, ko: string, sub: string): T | undefined => map[`${ko}@${sub}`] ?? map[ko];
const addGroup = (t: Term, group: GroupKey, sub: string, order: number) => {
  if (!t.groups.some((g) => g.group === group && g.sub === sub)) t.groups.push({ group, sub, order });
};
const addAlias = (t: Term, a: string) => {
  if (a && a !== t.ko && !t.aliases.includes(a)) t.aliases.push(a);
};

raws.forEach((r, order) => {
  const mergeTo = pick(MERGE, r.ko, r.sub);
  let target: Term | undefined;
  let id = pick(ID, r.ko, r.sub) ?? kebab(r.en);
  if (!id) { problems.push(`id 못 만듦: ${r.ko}`); return; }

  if (mergeTo) {
    target = terms.find((t) => t.ko === mergeTo);
    if (!target) problems.push(`합칠 용어 없음: ${r.ko} → ${mergeTo}`);
  } else if (byId.has(id)) {
    if (r.sub === '글자 스타일') id += '-type';
    else target = byId.get(id);
  } else if (r.sub === '글자 스타일' && terms.some((t) => t.ko === r.ko)) id += '-type';

  if (target) {
    addGroup(target, r.group, r.sub, order);
    addAlias(target, r.ko);
    r.aliases.forEach((a) => addAlias(target!, a));
    if (r.sprout) target.sprout = true;
    if (PRIMARY_SUB[target.ko] === r.sub) {
      if (r.meaning) target.meaning = r.meaning;
      target.groups.unshift(target.groups.pop()!);
    }
    merges.push(`${r.sub} > ${r.ko}  →  ${target.ko} (${target.id})`);
    return;
  }
  if (byId.has(id)) { problems.push(`id 겹침: ${id} (${r.ko})`); return; }

  const t: Term = {
    id, ko: r.ko, en: r.en,
    aliases: [...r.aliases, ...(pick(ALIASES, r.ko, r.sub) ?? [])].filter((a) => a !== r.ko),
    groups: [{ group: r.group, sub: r.sub, order }],
    short: '', meaning: r.meaning, easy: '', prompt: '', related: [],
    anim: { type: ANIM_BY_SUB[r.sub] ?? ANIM_BY_GROUP[r.group], params: { variant: id } },
  };
  if (pick(Object.fromEntries(TRY_IT.map((k) => [k, true])), r.ko, r.sub)) t.tryIt = true;
  if (r.sprout) t.sprout = true;
  terms.push(t);
  byId.set(id, t);
});

for (const [ko, extra] of Object.entries(EXTRA_GROUPS)) {
  const t = terms.find((x) => x.ko === ko);
  if (!t) { problems.push(`분류 더 달 용어 없음: ${ko}`); continue; }
  for (const g of extra) {
    const after = Math.max(...terms.flatMap((x) => x.groups.filter((y) => y.sub === g.sub).map((y) => y.order)));
    addGroup(t, g.group, g.sub, after + 0.5);
  }
}

// ───────── vs 연결 ─────────
function resolve(name: string, group: GroupKey, sub: string): Term | undefined {
  const hits = terms.filter((t) => t.ko === name || t.aliases.includes(name));
  return (
    hits.find((t) => t.groups.some((g) => g.sub === sub)) ??
    hits.find((t) => t.groups.some((g) => g.group === group)) ??
    hits[0]
  );
}
const vsLinks: string[] = [];
const compareCards: string[] = [];
rawVs.forEach((v, i) => {
  const label = v.sides.join(' vs ');
  const n = notion.find((x) => x.ko === label);
  if (n) usedNotion.add(n);
  const meaning = v.meaning || n?.meaning || '';
  const sides = v.sides.map((s) => resolve(s, v.group, v.sub));

  if (sides.every(Boolean)) {
    const ts = sides as Term[];
    for (const a of ts) for (const b of ts) {
      if (a === b) continue;
      a.vs = [...new Set([...(a.vs ?? []), b.id])];
      if (meaning) (a.vsNote ??= {})[b.id] = meaning;
    }
    vsLinks.push(`${label}  →  ${ts.map((t) => t.id).join(' ↔ ')}${meaning ? '' : '  (비교 설명 없음)'}`);
    return;
  }
  // 짝이 용어로 없으면 비교 카드 하나로
  const en = v.en ?? n?.en ?? EN[label] ?? '';
  const id = kebab(en);
  if (!id || byId.has(id)) { problems.push(`비교 카드 id 문제: ${label}`); return; }
  const t: Term = {
    id, ko: label, en, aliases: [], groups: [{ group: v.group, sub: v.sub, order: raws.length + i }],
    short: '', meaning, easy: '', prompt: '', related: sides.filter(Boolean).map((s) => s!.id),
    anim: { type: 'Compare', params: { variant: id } },
  };
  if (v.sprout) t.sprout = true;
  terms.push(t);
  byId.set(id, t);
  compareCards.push(`${label} (${id})`);
});

// ───────── 초안 채우기: short · prompt · related ─────────
/** `## 작은 분류` 아래 `이름 | 문장` 줄을 읽음 → "이름@작은 분류" → 문장 */
function readDrafts(file: string): Map<string, string> {
  const out = new Map<string, string>();
  let sub = '';
  let text = '';
  try { text = read(file); } catch { /* 아직 없음 */ }
  for (const line of text.split('\n')) {
    const h = line.match(/^## (.+)$/);
    if (h) { sub = h[1].trim(); continue; }
    const m = line.match(/^([^>#].*?) \| (.+)$/);
    if (m) out.set(`${m[1].trim()}@${sub}`, m[2].trim());
  }
  return out;
}
const prompts = readDrafts('scripts/prompt-drafts.md');
const easies = readDrafts('scripts/easy-drafts.md');
const usedPrompts = new Set<string>();
const usedEasy = new Set<string>();
const noEasy: string[] = [];
const noPrompt: string[] = [];
const badPrompt: string[] = [];
STARTERS.forEach((ko) => {
  const t = terms.find((x) => x.ko === ko);
  if (t) t.starter = true; else problems.push(`처음이라면 용어 없음: ${ko}`);
});

for (const t of terms) {
  // easy: 쉬운 뜻
  for (const names of [[t.ko], t.aliases]) for (const name of names) for (const g of t.groups) {
    const key = `${name}@${g.sub}`;
    if (!easies.has(key)) continue;
    usedEasy.add(key);
    if (!t.easy) t.easy = easies.get(key)!;
  }
  if (!t.easy) { noEasy.push(`${t.groups[0].sub} > ${t.ko}`); t.easy = t.meaning; }
  // short: 쉬운 뜻의 첫 문장
  t.short = t.easy.split(/(?<=[.?!])\s/)[0].replace(/[.]$/, '');
  // prompt
  for (const names of [[t.ko], t.aliases]) for (const name of names) for (const g of t.groups) {
    const key = `${name}@${g.sub}`;
    if (!t.prompt && prompts.has(key)) { t.prompt = prompts.get(key)!; usedPrompts.add(key); }
    else if (prompts.has(key)) usedPrompts.add(key);
  }
  if (!t.prompt) noPrompt.push(`${t.groups[0].sub} > ${t.ko}`);
  else {
    const names = [t.ko, ...t.aliases, ...t.ko.split(/ vs |\s*[\/·]\s*/)].filter(Boolean);
    if (!names.some((n) => t.prompt.includes(n))) badPrompt.push(`용어가 문장에 없음: ${t.ko} | ${t.prompt}`);
    if (!/줘$/.test(t.prompt)) badPrompt.push(`"~줘"로 안 끝남: ${t.ko} | ${t.prompt}`);
  }
  t.draft = true;
}
// related: 뜻·프롬프트에 나온 다른 용어 → 같은 분류의 앞뒤 용어 (3개까지)
const bySub = new Map<string, Term[]>();
for (const t of terms) for (const g of t.groups) bySub.set(g.sub, [...(bySub.get(g.sub) ?? []), t]);
for (const list of bySub.values()) list.sort((a, b) => a.groups[0].order - b.groups[0].order);
for (const t of terms) {
  const out = new Set<string>(t.related);
  for (const ko of RELATED[t.ko] ?? []) {
    const o = terms.find((x) => x.ko === ko);
    if (o) out.add(o.id); else problems.push(`같이 쓰면 좋은 말 없음: ${t.ko} → ${ko}`);
  }
  const text = t.meaning;
  for (const o of terms) {
    if (out.size >= 3) break;
    if (o === t || t.vs?.includes(o.id) || o.ko.length < 2 || o.ko.includes(' vs ')) continue;
    if (t.ko.includes(o.ko) || o.ko.includes(t.ko)) continue;
    if (text.includes(o.ko)) out.add(o.id);
  }
  const list = bySub.get(t.groups[0].sub)!;
  const i = list.indexOf(t);
  for (const o of [list[i + 1], list[i - 1], list[i + 2], list[i - 2]]) {
    if (out.size >= 3) break;
    if (o && o !== t && !t.vs?.includes(o.id) && !o.ko.includes(' vs ')) out.add(o.id);
  }
  t.related = [...out];
}

// ───────── 검사 ─────────
for (const t of terms) {
  for (const id of [...t.related, ...(t.vs ?? [])]) if (!byId.has(id)) problems.push(`없는 id 연결: ${t.id} → ${id}`);
  for (const id of t.vs ?? []) if (!byId.get(id)?.vs?.includes(t.id)) problems.push(`vs 한쪽만 연결: ${t.id} → ${id}`);
  if (!t.meaning) problems.push(`뜻 없음: ${t.ko}`);
}
const unusedNotion = notion.filter((n) => !usedNotion.has(n)).map((n) => `${n.section} > ${n.ko}`);
const unusedPrompts = [...prompts.keys()].filter((k) => !usedPrompts.has(k));
const unusedEasy = [...easies.keys()].filter((k) => !usedEasy.has(k));

writeFileSync(new URL('src/data/terms.json', root), JSON.stringify(terms, null, 1) + '\n');

// ───────── 결과 보여 주기 ─────────
const show = (title: string, list: string[], max = 200) => {
  console.log(`\n■ ${title}: ${list.length}`);
  list.slice(0, max).forEach((x) => console.log('   ' + x));
};
console.log(`용어 ${terms.length}개 → src/data/terms.json`);
console.log(`   TERMS.md에 적힌 이름 ${raws.length}개 (노션에서 뜻 가져옴 ${raws.filter((r) => r.fromNotion).length} · 뜻 적힌 것 ${raws.filter((r) => !r.fromNotion).length}) + vs 줄 ${rawVs.length}개`);
console.log('\n■ 묶음별 카드 수');
for (const [name, key] of Object.entries(GROUP_NAMES)) {
  const inGroup = terms.filter((t) => t.groups.some((g) => g.group === key));
  const subs = [...new Set(inGroup.flatMap((t) => t.groups.filter((g) => g.group === key).map((g) => g.sub)))];
  console.log(`   ${name}: ${inGroup.length}  (${subs.map((s) => `${s} ${inGroup.filter((t) => t.groups.some((g) => g.sub === s)).length}`).join(' · ')})`);
}
console.log(`\n■ 표시: 🌱 ${terms.filter((t) => t.sprout).length} · 처음이라면 ${terms.filter((t) => t.starter).length} · 직접 해보기 ${terms.filter((t) => t.tryIt).length} · vs 배지 ${terms.filter((t) => t.vs?.length).length}`);
if (process.argv.includes('--list')) show('프롬프트 쓸 용어', terms.map((t) => `${t.groups[0].sub} > ${t.ko}`), 9999);
show('겹침 합친 것 (카드 하나 + 분류 여러 개)', merges);
show('vs 연결', vsLinks);
show('비교 카드로 만든 vs (짝이 용어로 없음)', compareCards);
show('프롬프트 초안 없음', noPrompt, 30);
show('프롬프트 규칙 어김', badPrompt);
show('안 쓰인 프롬프트 초안', unusedPrompts);
show('쉬운 뜻 없음 (원래 뜻을 씀)', noEasy);
show('안 쓰인 쉬운 뜻', unusedEasy);
show('노션에만 있고 안 쓰인 용어', unusedNotion);
show('문제', problems);
if (problems.length || badPrompt.length || noEasy.length) process.exitCode = 1;
