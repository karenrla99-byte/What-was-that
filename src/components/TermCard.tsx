import type { CSSProperties } from 'react';
import DefaultAnim from '../anim/DefaultAnim';
import type { CardTerm } from '../data/sampleTerms';
import type { GroupKey } from '../data/groups';
import { useInView } from '../hooks/useInView';
import GlassCard from './GlassCard';
import s from './TermCard.module.css';

type Props = { term: CardTerm; group?: GroupKey; index: number };

/** 1:1 카드: 위 75% 애니메이션 칸 + 아래 25% 이름 */
export default function TermCard({ term, group, index }: Props) {
  const { ref, inView, seen } = useInView<HTMLElement>();
  const g = group ?? term.groups[0].group;

  return (
    <GlassCard
      as="article"
      ref={ref}
      className={`${s.card} ${seen ? s.seen : ''}`}
      style={{ '--i': index % 6 } as CSSProperties}
    >
      <div className={s.stage}>
        <DefaultAnim group={g} playing={inView} />
        {term.vs?.length ? <span className={s.vs}>vs</span> : null}
      </div>
      <div className={s.name}>
        <h3 className={s.ko}>{term.ko}</h3>
        <p className={s.en} lang="en">{term.en}</p>
      </div>
    </GlassCard>
  );
}
