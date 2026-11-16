import { ArrowRight, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Term } from '../data/terms';
import TermCard from './TermCard';
import s from './StarterRow.module.css';

/** 전체 맨 위 "처음이라면 이것부터" 가로 줄 */
export default function StarterRow({ terms }: { terms: Term[] }) {
  return (
    <section className={s.wrap} aria-labelledby="starter-title">
      <h2 id="starter-title" className={s.title}>
        <Sprout size={22} strokeWidth={2.2} className={s.icon} aria-hidden="true" />
        처음이라면 이것부터
      </h2>
      <ul className={s.row} tabIndex={0} aria-label="처음이라면 이것부터 카드, 옆으로 넘겨 보세요">
        {terms.map((t, i) => (
          <li key={t.id} className={s.item}>
            <TermCard term={t} index={i} />
          </li>
        ))}
        <li className={s.item}>
          <Link to="/c/start" className={s.more}>
            <span className={s.moreIcon}>
              <ArrowRight size={24} aria-hidden="true" />
            </span>
            처음 시작
            <br />
            모두 보기
          </Link>
        </li>
      </ul>
    </section>
  );
}
