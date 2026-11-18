import { Check, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Stage } from './Stage';
import s from './BeforeAfter.module.css';

/**
 * BeforeAfter 템플릿: 왼쪽 아쉬운 예 → 오른쪽 좋은 예.
 * 판 안쪽 좌표: 폭 42em × 높이 58em. 왼쪽이 먼저 보이고, 조금 뒤 오른쪽이 나타나 체크가 붙음.
 */
export function BeforeAfter({ playing, bad, good, badLabel = '아쉬워요', goodLabel = '좋아요', note }: {
  playing: boolean; bad: ReactNode; good: ReactNode; badLabel?: string; goodLabel?: string; note?: string;
}) {
  return (
    <Stage playing={playing}>
      <span className={`${s.label} ${s.badL}`}><X strokeWidth={3} />{badLabel}</span>
      <span className={`${s.label} ${s.goodL}`}><Check strokeWidth={3} />{goodLabel}</span>
      <div className={`${s.panel} ${s.bad}`}>{bad}</div>
      <div className={`${s.panel} ${s.good}`}>{good}</div>
      <span className={s.arrow} />
      {note && <span className={s.note}>{note}</span>}
    </Stage>
  );
}
