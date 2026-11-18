import { useId, type CSSProperties, type ReactNode } from 'react';
import { win } from './kit';
import s from './Build.module.css';

/**
 * 🛠 만들고 배포하기 도구 (FlowDiagram 템플릿)
 * - Flow: 아이콘(마디)이 화살표로 이어지고, 작은 공(token)이 길을 따라 이동. 도착한 마디가 파랗게 켜짐
 * - Win: 코드 창·터미널·브라우저 같은 작은 창
 * - Lines: 안의 줄이 한 줄씩 나타남
 * - Steps: 아래쪽 단계 이름표 (지금 단계만 파랗게)
 */

export type FlowNode = { x: number; y: number; icon?: ReactNode; label?: string; sq?: boolean; size?: number; hot?: boolean };

const pct = (v: number) => `${v.toFixed(2)}%`;

export function Flow({ nodes, path, token, d = 4.4, arrows, tokenClass = '', style, className = '' }: {
  nodes: FlowNode[]; path?: number[]; token?: ReactNode; d?: number; arrows?: [number, number][];
  tokenClass?: string; style?: CSSProperties; className?: string;
}) {
  const id = 'f' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const p = path ?? nodes.map((_, i) => i);
  const seg = 70 / Math.max(1, p.length - 1);
  const arr = (i: number) => 10 + i * seg;
  const lv = (i: number) => arr(i) + seg * 0.35;
  const pos = (j: number) => `left:${nodes[j].x}em;top:${nodes[j].y}em;`;
  let css = `@keyframes ${id}t{0%{${pos(p[0])}opacity:0}6%{${pos(p[0])}opacity:1}`;
  p.forEach((j, i) => {
    if (i > 0) css += `${pct(arr(i))}{${pos(j)}}`;
    if (i < p.length - 1) css += `${pct(lv(i))}{${pos(j)}}`;
  });
  css += `90%{${pos(p[p.length - 1])}opacity:1}96%,100%{${pos(p[p.length - 1])}opacity:0}}`;
  nodes.forEach((_, j) => {
    const i = p.indexOf(j);
    if (i < 0) return;
    const a = arr(i);
    css += `@keyframes ${id}n${j}{0%,${pct(Math.max(0, a - 0.5))}{background:#fff;border-color:var(--gray-3);color:var(--gray-4)}${pct(a + 3)},92%{background:var(--blue-soft);border-color:var(--blue);color:var(--blue)}98%,100%{background:#fff;border-color:var(--gray-3);color:var(--gray-4)}}`;
  });
  // 화살표: 지정하지 않으면 길을 따라 이어진 짝마다 (중복 없이)
  const pairs: [number, number][] = arrows ?? [];
  if (!arrows) p.slice(1).forEach((j, i) => {
    const a = p[i];
    if (!pairs.some(([x, y]) => (x === a && y === j) || (x === j && y === a))) pairs.push([a, j]);
  });
  return (
    <span className={`${s.layer} ${className}`} style={style}>
      <style>{css}</style>
      {pairs.map(([a, b]) => {
        const A = nodes[a], Bn = nodes[b];
        const dx = Bn.x - A.x, dy = Bn.y - A.y, L = Math.hypot(dx, dy);
        const ra = (A.size ?? 18) / 2 + 2, rb = (Bn.size ?? 18) / 2 + 2.6;
        return (
          <span key={`${a}-${b}`} className={s.arrow} style={{ left: `${A.x + (dx / L) * ra}em`, top: `${A.y + (dy / L) * ra}em`, width: `${L - ra - rb}em`, transform: `rotate(${Math.atan2(dy, dx)}rad)` }} />
        );
      })}
      {nodes.map((n, j) => (
        <span key={j} className={`${s.node} ${n.sq ? s.sq : ''} ${n.hot ? s.hot : ''}`} style={{ left: `${n.x}em`, top: `${n.y}em`, width: `${n.size ?? 18}em`, height: `${n.size ?? 18}em`, animation: p.includes(j) && !n.hot ? `${id}n${j} ${d}s linear infinite` : undefined }}>
          {n.icon}
          {n.label && <span className={s.nodeLabel}><span>{n.label}</span></span>}
        </span>
      ))}
      <span className={`${s.token} ${tokenClass}`} style={{ animation: `${id}t ${d}s var(--ease) infinite` }}>{token}</span>
    </span>
  );
}

type WinKind = 'code' | 'term' | 'browser' | 'plain';

/** 작은 창. 안쪽 글자 크기 fs(그림 단위). 안에서는 1em = fs */
export function Win({ x, y, w, h, kind = 'code', title, fs: fsIn, children, className = '', style, bodyClass = '' }: {
  x: number; y: number; w: number; h: number; kind?: WinKind; title?: ReactNode; fs?: number; children?: ReactNode;
  className?: string; style?: CSSProperties; bodyClass?: string;
}) {
  const fs = fsIn ?? (kind === 'browser' ? 1 : 3.4);
  return (
    <span className={`${s.win} ${s[kind]} ${className}`} style={{ left: `${x}em`, top: `${y}em`, width: `${w}em`, height: `${h}em`, ...style }}>
      <span className={s.bar}>
        <i /><i /><i />
        {title !== undefined && <span className={s.wtitle}><span>{title}</span></span>}
      </span>
      <span className={`${s.body} ${bodyClass}`} style={{ fontSize: `${fs}em`, top: `${7 / fs}em` }}>{children}</span>
    </span>
  );
}

/** 줄이 위에서부터 하나씩 나타남 (d초 중 앞 55% 동안) */
export function Lines({ n, d = 4.4, children, className = '' }: { n: number; d?: number; children: ReactNode; className?: string }) {
  return <span className={`${s.lines} ${className}`} style={{ animationDuration: `${d}s`, animationTimingFunction: `steps(${n}, end)` }}>{children}</span>;
}

/** 아래 단계 이름표 n개. 지금 단계만 파랗게 (d초를 n등분) */
export function Steps({ items, d, y = 5 }: { items: string[]; d: number; y?: number }) {
  return (
    <span className={s.steps} style={{ top: `${y}em` }}>
      {items.map((t, i) => (
        <span key={t} className={s.step}>
          <span>{t}</span>
          <span className={s.stepOn} style={win(i, items.length, d)}>{t}</span>
        </span>
      ))}
    </span>
  );
}

/** 코드 글자 꾸밈 */
export const K = ({ children }: { children: ReactNode }) => <span className={s.kw}>{children}</span>;
export const Sx = ({ children }: { children: ReactNode }) => <span className={s.str}>{children}</span>;
export const Cm = ({ children }: { children: ReactNode }) => <span className={s.cm}>{children}</span>;

/** 그림 위 아무 데나 글자 상자 (fs 크기, 가운데 기준) */
export function Tag({ x, y, fs = 3.6, kind = 'gray', children, className = '', style }: {
  x: number; y: number; fs?: number; kind?: 'gray' | 'blue' | 'soft' | 'dark' | 'plain'; children: ReactNode; className?: string; style?: CSSProperties;
}) {
  return (
    <span className={`${s.tagPos} ${className}`} style={{ left: `${x}em`, top: `${y}em`, ...style }}>
      <span className={`${s.tag} ${s[`tag_${kind}`]}`} style={{ fontSize: `${fs}em` }}>{children}</span>
    </span>
  );
}
