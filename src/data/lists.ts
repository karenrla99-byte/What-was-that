import { GROUP_MAP, isGroupKey, type Group } from './groups';
import { TERMS, type Term } from './terms';
import { INDEX_KEYS, compareKo, indexKeyOf, type IndexKey } from '../lib/hangul';

const byKo = (a: Term, b: Term) => compareKo(a.ko, b.ko);

/** 전체: ㄱㄴㄷ순으로 글자별 구역 */
export const ALL_SECTIONS: { key: IndexKey; terms: Term[] }[] = INDEX_KEYS.map((key) => ({
  key,
  terms: TERMS.filter((t) => indexKeyOf(t.ko) === key).sort(byKo),
})).filter((x) => x.terms.length);

/** 묶음 하나: 작은 분류별 구역 (🛠·💬는 ㄱㄴㄷ순, 나머지는 TERMS.md 순서) */
export function sectionsOf(info: Group): { sub: string; terms: Term[] }[] {
  return info.subs
    .map((sub) => {
      const order = (t: Term) => t.groups.find((x) => x.group === info.key && x.sub === sub)!.order;
      const terms = TERMS.filter((t) => t.groups.some((x) => x.group === info.key && x.sub === sub));
      terms.sort(info.sortSubs ? byKo : (a, b) => order(a) - order(b));
      return { sub, terms };
    })
    .filter((x) => x.terms.length);
}

/** 목록 화면 주소에 보이는 카드 순서 (상세 화면의 이전·다음에 씀) */
export function sequenceFor(pathname: string): Term[] {
  const key = pathname.match(/^\/c\/([^/]+)/)?.[1];
  const list = isGroupKey(key)
    ? sectionsOf(GROUP_MAP[key]).flatMap((x) => x.terms)
    : ALL_SECTIONS.flatMap((x) => x.terms);
  return [...new Set(list)];
}
