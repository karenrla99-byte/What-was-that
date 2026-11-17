import { Link, useLocation } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import type { Term } from '../data/terms';
import { GROUP_MAP } from '../data/groups';
import type { Hit } from '../lib/search';
import CardGrid from './CardGrid';
import Mark from './Mark';
import TermCard from './TermCard';
import s from './SearchResults.module.css';

type Props = { query: string; hits: Hit[]; suggestions: Term[]; onPick: (text: string) => void };

/** 검색 결과: 이름에서 찾은 것은 카드로, 설명에서 찾은 것은 설명이 보이는 줄로 */
export default function SearchResults({ query, hits, suggestions, onPick }: Props) {
  const location = useLocation();
  const bg = { pathname: location.pathname, search: location.search };
  const names = hits.filter((h) => h.where === 'name');
  const descs = hits.filter((h) => h.where === 'desc');

  if (!hits.length) {
    return (
      <section className={s.empty} aria-live="polite">
        <span className={s.emptyIcon}>
          <SearchX size={36} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <h2 className={s.emptyTitle}>
          "<span className={s.q}>{query.trim()}</span>"은(는) 아직 사전에 없어요
        </h2>
        {suggestions.length > 0 ? (
          <>
            <p className={s.emptyText}>혹시 이 말을 찾으셨나요?</p>
            <ul className={s.chips}>
              {suggestions.map((t) => (
                <li key={t.id}>
                  <button type="button" className={s.chip} onClick={() => onPick(t.ko)}>
                    {t.ko}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className={s.emptyText}>생김새나 움직임을 풀어서 써 보세요. (예: 아래서 올라오는 창, 옆으로 넘기는)</p>
        )}
      </section>
    );
  }

  return (
    <div aria-live="polite">
      <h2 className={s.heading}>
        검색 결과 <span className={s.count}>{hits.length}</span>
      </h2>
      {names.length > 0 && (
        <section className={s.section} aria-label="이름에서 찾은 용어">
          {descs.length > 0 && <h3 className={s.sub}>이름에서 찾았어요</h3>}
          <CardGrid>
            {names.map((h, i) => (
              <TermCard key={h.term.id} term={h.term} index={i} hit={h} />
            ))}
          </CardGrid>
        </section>
      )}
      {descs.length > 0 && (
        <section className={s.section} aria-label="설명에서 찾은 용어">
          <h3 className={s.sub}>설명에서 찾았어요</h3>
          <ul className={s.rows}>
            {descs.map((h) => {
              const Icon = GROUP_MAP[h.term.groups[0].group].icon;
              return (
                <li key={h.term.id}>
                  <Link to={`/t/${h.term.id}`} state={{ bg }} className={s.row}>
                    <span className={s.rowIcon}>
                      <Icon size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className={s.rowBody}>
                      <span className={s.rowName}>
                        {h.term.ko} <em lang="en">{h.term.en}</em>
                      </span>
                      <span className={s.rowDesc}>
                        <Mark text={h.desc!.text} ranges={h.desc!.ranges} />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
