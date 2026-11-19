import { NavLink } from 'react-router-dom';
import { Info, LayoutGrid } from 'lucide-react';
import { GROUPS, subId, type GroupKey } from '../data/groups';
import GlassCard from './GlassCard';
import s from './Sidebar.module.css';

type Props = {
  current: GroupKey | null;
  /** 스크롤로 지금 보고 있는 작은 분류 */
  activeSub: string | null;
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ current, activeSub, open, onClose }: Props) {
  const goSub = (sub: string) => {
    document.getElementById(subId(sub))?.scrollIntoView({ block: 'start' });
    onClose();
  };

  return (
    <>
      <div className={`${s.scrim} ${open ? s.scrimOn : ''}`} onClick={onClose} aria-hidden="true" />
      <GlassCard as="aside" className={`${s.side} ${open ? s.open : ''}`} aria-label="카테고리">
        <NavLink to="/" className={s.brand} onClick={onClose}>
          <h1 className={s.title}>
            그거 뭐더라<span className={s.q}>?</span>
          </h1>
          <p className={s.subtitle}>
            바이브코딩 용어사전 · <em lang="en">Vibe Glossary</em>
          </p>
        </NavLink>

        <nav className={s.nav}>
          <ul>
            <li>
              <NavLink to="/" end onClick={onClose} className={({ isActive }) => `${s.item} ${isActive ? s.active : ''}`}>
                <LayoutGrid size={18} strokeWidth={2.2} aria-hidden="true" />
                전체
              </NavLink>
            </li>
            {GROUPS.map((g) => {
              const Icon = g.icon;
              const on = current === g.key;
              return (
                <li key={g.key}>
                  <NavLink
                    to={`/c/${g.key}`}
                    onClick={() => g.subs.length <= 1 && onClose()}
                    aria-expanded={on}
                    className={`${s.item} ${on ? s.active : ''}`}
                  >
                    <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                    {g.name}
                  </NavLink>
                  <div className={`${s.acc} ${on ? s.accOpen : ''}`}>
                    <ul className={s.subs} inert={!on}>
                      {g.subs.map((sub) => (
                        <li key={sub}>
                          <button
                            type="button"
                            className={`${s.sub} ${on && activeSub === sub ? s.subActive : ''}`}
                            aria-current={on && activeSub === sub ? 'true' : undefined}
                            onClick={() => goSub(sub)}
                          >
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        <NavLink to="/welcome" className={s.about} onClick={onClose}>
          <Info size={16} strokeWidth={2.2} aria-hidden="true" />
          이 사전 소개
        </NavLink>
      </GlassCard>
    </>
  );
}
