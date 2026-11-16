import type { GroupKey } from '../data/groups';
import type { Term } from '../data/terms';
import DefaultAnim from './DefaultAnim';

type Props = {
  term: Term;
  /** 어느 묶음 화면에서 보고 있는지 (기본 애니메이션의 아이콘) */
  group?: GroupKey;
  playing: boolean;
  /** card = 카드 안 작게, detail = 상세 화면 크게 */
  size?: 'card' | 'detail';
};

/**
 * 용어 하나의 애니메이션. term.anim.type에 맞는 템플릿을 고르는 곳.
 * 아직 템플릿이 없는 용어는 묶음 아이콘이 숨 쉬는 기본 애니메이션. (템플릿은 Phase 6~7)
 */
export default function TermAnim({ term, group, playing }: Props) {
  return <DefaultAnim group={group ?? term.groups[0].group} playing={playing} />;
}
