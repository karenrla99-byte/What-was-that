import { GROUP_MAP, type GroupKey } from '../data/groups';
import s from './DefaultAnim.module.css';

type Props = { group: GroupKey; playing: boolean };

/** 기본 애니메이션: 묶음 아이콘이 천천히 숨 쉼 (아직 못 만든 용어용) */
export default function DefaultAnim({ group, playing }: Props) {
  const Icon = GROUP_MAP[group].icon;
  return (
    <div className={`${s.wrap} ${playing ? '' : s.paused}`} aria-hidden="true">
      <span className={s.ring} />
      <span className={s.disc}>
        <Icon className={s.icon} strokeWidth={1.8} />
      </span>
    </div>
  );
}
