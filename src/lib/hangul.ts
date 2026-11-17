const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const BASE: Record<string, string> = { 'ㄲ': 'ㄱ', 'ㄸ': 'ㄷ', 'ㅃ': 'ㅂ', 'ㅆ': 'ㅅ', 'ㅉ': 'ㅈ' };

/** 오른쪽 색인 띠 글자. A = 영어·숫자로 시작하는 용어 */
export const INDEX_KEYS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'A'] as const;
export type IndexKey = (typeof INDEX_KEYS)[number];

/** 한글 한 글자의 초성. 한글이 아니면 그대로 */
export function choseongOf(ch: string): string {
  const code = ch.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return ch;
  return CHO[Math.floor(code / 588)];
}

/** 낱말 전체의 초성 ("바텀시트" → "ㅂㅌㅅㅌ") */
export function choseong(word: string): string {
  return [...word].map(choseongOf).join('');
}

/** 용어가 들어갈 색인 글자 */
export function indexKeyOf(ko: string): IndexKey {
  const c = choseongOf(ko.trim()[0] ?? '');
  const base = BASE[c] ?? c;
  return (INDEX_KEYS as readonly string[]).includes(base) && base !== 'A' ? (base as IndexKey) : 'A';
}

/** ㄱㄴㄷ순 (한글 먼저, 영어·숫자는 맨 뒤) */
export function compareKo(a: string, b: string): number {
  const d = INDEX_KEYS.indexOf(indexKeyOf(a)) - INDEX_KEYS.indexOf(indexKeyOf(b));
  return d || a.localeCompare(b, 'ko');
}

const JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

/** 한글을 자모로 풀기 ("값" → "ㄱㅏㅄ"). 비슷한 이름 찾기에 씀 */
export function disassemble(word: string): string {
  let out = '';
  for (const ch of word) {
    const code = ch.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) out += ch;
    else out += CHO[Math.floor(code / 588)] + JUNG[Math.floor((code % 588) / 28)] + JONG[code % 28];
  }
  return out;
}

/** 초성만으로 이루어진 글인지 ("ㅂㅌㅅㅌ") */
export function isChoseongOnly(text: string): boolean {
  return /^[ㄱ-ㅎ\s]+$/.test(text);
}
