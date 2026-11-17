import type { LucideIcon } from 'lucide-react';
import { GROUP_MAP, type GroupKey } from '../data/groups';
import s from './DefaultAnim.module.css';

type Props = { group: GroupKey; playing: boolean; /** 용어에 맞는 아이콘. 없으면 묶음 아이콘 */ icon?: LucideIcon };

/** 기본 애니메이션: 용어 아이콘(없으면 묶음 아이콘)이 천천히 숨 쉼 (아직 못 만든 용어용) */
export default function DefaultAnim({ group, playing, icon }: Props) {
  const Icon = icon ?? GROUP_MAP[group].icon;
  return (
    <div className={`${s.wrap} ${playing ? '' : s.paused}`} aria-hidden="true">
      <span className={s.ring} />
      <span className={s.disc}>
        <Icon className={s.icon} strokeWidth={1.8} />
      </span>
    </div>
  );
}
