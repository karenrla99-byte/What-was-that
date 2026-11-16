import { useRef, type CSSProperties } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TermAnim from '../anim/TermAnim';
import type { Term } from '../data/terms';
import type { GroupKey } from '../data/groups';
import { useInView } from '../hooks/useInView';
import GlassCard from './GlassCard';
import s from './TermCard.module.css';

type Props = { term: Term; group?: GroupKey; index: number };

/** 1:1 카드: 위 75% 애니메이션 칸 + 아래 25% 이름. 누르면 상세 화면으로 커짐 */
export default function TermCard({ term, group, index }: Props) {
  const { ref, inView, seen } = useInView<HTMLElement>();
  const location = useLocation();
  const navigate = useNavigate();
  const bg = { pathname: location.pathname, search: location.search };
  const linkRef = useRef<HTMLAnchorElement>(null);

  const rect = () => {
    const r = linkRef.current?.getBoundingClientRect();
    return r ? { x: r.left, y: r.top, w: r.width, h: r.height } : undefined;
  };

  return (
    <GlassCard
      as="article"
      ref={ref}
      className={`${s.card} ${seen ? s.seen : ''}`}
      style={{ '--i': index % 6 } as CSSProperties}
    >
      <Link
        ref={linkRef}
        to={`/t/${term.id}`}
        className={s.link}
        onClick={(e) => {
          // 카드 자리에서 커지며 열리게 지금 위치를 넘겨 줌
          e.preventDefault();
          navigate(`/t/${term.id}`, { state: { bg, rect: rect() } });
        }}
        state={{ bg }}
        aria-label={`${term.ko} (${term.en}) 자세히 보기`}
      >
        <div className={s.stage}>
          <TermAnim term={term} group={group} playing={inView} size="card" />
          {term.vs?.length ? <span className={s.vs}>vs</span> : null}
        </div>
        <div className={s.name}>
          <h3 className={s.ko}>{term.ko}</h3>
          <p className={s.en} lang="en">{term.en}</p>
        </div>
      </Link>
    </GlassCard>
  );
}

