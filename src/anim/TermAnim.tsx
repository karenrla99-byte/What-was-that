import type { GroupKey } from '../data/groups';
import type { Term } from '../data/terms';
import DefaultAnim from './DefaultAnim';
import { ANIMS } from './registry';
import { TERM_ICONS } from './termIcons';

type Props = {
  term: Term;
  /** 어느 묶음 화면에서 보고 있는지 (기본 애니메이션의 아이콘) */
  group?: GroupKey;
  playing: boolean;
  /** card = 카드 안 작게, detail = 상세 화면 크게 */
  size?: 'card' | 'detail';
};

/** 용어 하나의 애니메이션. 아직 못 만든 용어는 용어 아이콘이 숨 쉬는 기본 애니메이션 */
export default function TermAnim({ term, group, playing, size = 'card' }: Props) {
  const Anim = ANIMS[term.id];
  return (
    // data-size: 카드에서는 이름표(Callout)를 숨기려고
    <div style={{ display: 'contents' }} data-size={size}>
      {Anim ? (
        <Anim playing={playing} size={size} />
      ) : (
        <DefaultAnim group={group ?? term.groups[0].group} playing={playing} icon={TERM_ICONS[term.id]} />
      )}
    </div>
  );
}
