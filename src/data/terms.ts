import type { GroupKey } from './groups';
import data from './terms.json';

/** scripts/build-terms.ts가 만드는 src/data/terms.json의 모양 */
export type Term = {
  id: string;
  ko: string;
  en: string;
  /** 같은 뜻 다른 이름 */
  aliases: string[];
  /** 겹치는 용어는 여러 개. order = TERMS.md에 나온 순서 */
  groups: { group: GroupKey; sub: string; order: number }[];
  /** 한 줄 설명 (검색용) */
  short: string;
  /** 원래 뜻 (노션·TERMS.md). 검색에만 씀 */
  meaning: string;
  /** 쉬운 뜻 (상세 화면의 '뜻') */
  easy: string;
  /** 자세한 설명 ([자세히 보기]에서 펼침). ' // '로 문단 나눔 */
  more?: string;
  /** 프롬프트 예시 문장 */
  prompt: string;
  /** 같이 쓰면 좋은 말 (term id) */
  related: string[];
  /** 헷갈리는 짝 (term id) */
  vs?: string[];
  /** 짝 id → "이럴 땐 이것" 비교 설명 */
  vsNote?: Record<string, string>;
  anim: { type: string; params?: Record<string, unknown> };
  tryIt?: boolean;
  /** "처음이라면 이것부터"에 나옴 */
  starter?: boolean;
  /** 🌱 초보용 용어 */
  sprout?: boolean;
  /** Claude가 채운 초안 (정은 검토 전) */
  draft?: boolean;
};

export const TERMS = data as Term[];
export const TERM_MAP = new Map(TERMS.map((t) => [t.id, t]));

/** 처음이라면 이것부터 (PLAN.md 3-7 순서) */
const STARTER_ORDER = ['바이브코딩', '프롬프트', '코드 블록', '컴포넌트', '반응형', '모달', '토스트', '바텀시트', '배포', '에러 메시지', '콘솔', '되돌리기'];
export const STARTERS = TERMS.filter((t) => t.starter).sort(
  (a, b) => STARTER_ORDER.indexOf(a.ko) - STARTER_ORDER.indexOf(b.ko),
);
