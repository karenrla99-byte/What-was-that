import type { Range } from '../lib/search';
import s from './Mark.module.css';

/** 글에서 검색어와 맞는 부분을 강조 */
export default function Mark({ text, ranges }: { text: string; ranges?: (Range | undefined)[] }) {
  const list = (ranges ?? []).filter((r): r is Range => !!r && r[1] > r[0]);
  if (!list.length) return <>{text}</>;
  const out: React.ReactNode[] = [];
  let at = 0;
  list.forEach(([a, b], i) => {
    if (a < at) return;
    out.push(text.slice(at, a), <mark key={i} className={s.mark}>{text.slice(a, b)}</mark>);
    at = b;
  });
  out.push(text.slice(at));
  return <>{out}</>;
}
