import type { ReactNode } from 'react';
import { B, Tap } from './kit';
import { Callout, Phone } from './Stage';
import s from './MenuIcons.module.css';

/**
 * 🧩 메뉴 버튼 모양: 폰 위쪽 띠에 아이콘을 크게 그리고, 누르면 그 메뉴가 열림.
 * 아이콘은 직접 그린 SVG (24칸 기준)
 */
type Kind = 'hamburger' | 'kebab' | 'meatballs' | 'waffle' | 'bento' | 'doner' | 'veggie' | 'stair' | 'sliders';
const L = (x1: number, y: number, x2: number) => <line x1={x1} y1={y} x2={x2} y2={y} />;
const D = (cx: number, cy: number) => <circle cx={cx} cy={cy} r="1.9" className={s.fillDot} />;

const ICONS: Record<Kind, ReactNode> = {
  hamburger: <>{L(4, 6, 20)}{L(4, 12, 20)}{L(4, 18, 20)}</>,
  kebab: <>{D(12, 5)}{D(12, 12)}{D(12, 19)}</>,
  meatballs: <>{D(5, 12)}{D(12, 12)}{D(19, 12)}</>,
  waffle: <>{[5, 12, 19].flatMap((y) => [5, 12, 19].map((x) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" className={s.fillDot} />))}</>,
  bento: <>{[3.5, 10, 16.5].flatMap((y) => [3.5, 10, 16.5].map((x) => <rect key={`${x}${y}`} x={x} y={y} width="4.2" height="4.2" rx="0.9" className={s.fillDot} />))}</>,
  doner: <>{L(3, 6, 21)}{L(6, 12, 18)}{L(9, 18, 15)}</>,
  veggie: <>{L(4, 6, 20)}{L(4, 12, 14)}{L(4, 18, 18)}</>,
  stair: <>{L(4, 6, 10)}{L(4, 12, 15)}{L(4, 18, 20)}</>,
  sliders: <>{L(3, 8, 21)}{L(3, 16, 21)}<circle cx="15" cy="8" r="2.6" className={s.knob} /><circle cx="8" cy="16" r="2.6" className={s.knob} /></>,
};

/** 열리는 메뉴 모양 */
function Panel({ kind }: { kind: Kind }) {
  if (kind === 'hamburger' || kind === 'veggie' || kind === 'stair') {
    return (
      <span className={s.drawer}>
        {[0, 1, 2, 3, 4].map((i) => <B key={i} x={4} y={6 + i * 10} w={[22, 18, 24, 16, 20][i]} h={4} c={i === 0 ? 'p' : 'g'} />)}
      </span>
    );
  }
  if (kind === 'waffle' || kind === 'bento') {
    return (
      <span className={`${s.pop} ${s.popRight}`} style={{ width: '30em', height: '30em' }}>
        {Array.from({ length: 9 }, (_, i) => <B key={i} x={2.6 + (i % 3) * 8.6} y={2.6 + Math.floor(i / 3) * 8.6} w={7} h={7} r={kind === 'waffle' ? 3.5 : 1.6} c={i === 4 ? 'p' : 'g'} />)}
      </span>
    );
  }
  if (kind === 'sliders') {
    return (
      <span className={s.sheet}>
        <B x={21} y={2.4} w={14} h={1.8} r={1} c="c" />
        {[0, 1, 2, 3].map((i) => <B key={i} x={4 + (i % 2) * 24} y={9 + Math.floor(i / 2) * 9} w={21} h={7} r={3.5} c={i === 1 ? 'p' : 'a'} />)}
      </span>
    );
  }
  // kebab · meatballs · doner: 작은 메뉴 목록
  return (
    <span className={`${s.pop} ${kind === 'doner' ? s.popLeft : s.popRight}`} style={{ width: '30em', height: '28em' }}>
      {[0, 1, 2].map((i) => <B key={i} x={3} y={3 + i * 8} w={[18, 22, 14][i]} h={4} c={i === 0 && kind === 'doner' ? 'p' : 'g'} />)}
    </span>
  );
}

const LEFT: Kind[] = ['hamburger', 'veggie', 'stair', 'doner'];

export function menuIcon(kind: Kind, name: string) {
  const left = LEFT.includes(kind);
  const x = left ? 9.5 : 48;
  return function MenuIcon({ playing }: { playing: boolean }) {
    return (
      <Phone playing={playing} bare>
        <B x={0} y={0} w={57.6} h={18} r={0} c="a" />
        <B x={left ? 20 : 5} y={7} w={18} h={4} c="c" />
        <svg viewBox="0 0 24 24" className={s.icon} style={{ left: `${x - 6}em` }}>{ICONS[kind]}</svg>
        {[0, 1, 2].map((i) => <B key={i} x={5} y={26 + i * 15} w={47.6} h={11} r={3} c="a" />)}
        <Panel kind={kind} />
        <Tap x={x} y={9} at={0.18} d={4} size={11} />
        <Callout x={x} y={16}>{name}</Callout>
      </Phone>
    );
  };
}

export const MENU_ICONS: [string, Kind, string][] = [
  ['hamburger-menu', 'hamburger', '가로줄 셋'],
  ['kebab-menu', 'kebab', '세로 점 셋'],
  ['meatballs-menu', 'meatballs', '가로 점 셋'],
  ['waffle-menu', 'waffle', '점 아홉 개'],
  ['bento-menu', 'bento', '네모 아홉 개'],
  ['doner-menu', 'doner', '점점 짧아지는 줄'],
  ['veggie-burger-menu', 'veggie', '길이가 다른 줄'],
  ['staircase-menu', 'stair', '계단처럼 늘어나는 줄'],
  ['sliders-icon', 'sliders', '조절 손잡이'],
];
