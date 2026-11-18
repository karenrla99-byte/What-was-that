import type { CSSProperties, ReactNode } from 'react';
import './kit.css';

/**
 * 애니메이션을 짧게 쓰려고 만든 작은 도구들. 단위는 모두 em (100em = 그림 칸 짧은 변).
 * 색: a 연회색 · g 회색 · c 진한 회색 · k 더 진한 회색 · p 파랑 · s 연파랑 · w 흰색(테두리) · d 글자색
 */
type Col = 'a' | 'g' | 'c' | 'k' | 'p' | 's' | 'w' | 'd' | 'n';

const em = (v?: number) => (v === undefined ? undefined : `${v}em`);

type BProps = {
  x?: number; y?: number; w?: number; h?: number; r?: number; right?: number; bottom?: number;
  c?: Col; className?: string; style?: CSSProperties; children?: ReactNode;
};

/** 상자 */
export function B({ x, y, w, h, r = 2, right, bottom, c = 'g', className = '', style, children }: BProps) {
  return (
    <span
      className={`k-b k-${c} ${className}`}
      style={{ left: em(x), top: em(y), right: em(right), bottom: em(bottom), width: em(w), height: em(h), borderRadius: em(r), ...style }}
    >
      {children}
    </span>
  );
}

type TProps = {
  x: number; y: number; size?: number; align?: 'left' | 'center' | 'right';
  c?: 'ink' | 'sub' | 'blue' | 'white' | 'light'; weight?: 400 | 600 | 700 | 800;
  className?: string; style?: CSSProperties; children: ReactNode;
};

/**
 * 글자. x는 align 기준점. 바깥은 그림 단위(em)로 자리만 잡고, 글자 크기는 안쪽에서 정함.
 * style은 바깥(자리·보이기), className은 안쪽(글자 단위의 꾸밈)에 붙음
 */
export function T({ x, y, size = 5, align = 'left', c = 'ink', weight = 600, className = '', style, children }: TProps) {
  const shift = align === 'center' ? 'translateX(-50%)' : align === 'right' ? 'translateX(-100%)' : undefined;
  return (
    <span className="k-t" style={{ left: em(x), top: em(y), transform: shift, ...style }}>
      <span className={`k-tx k-t-${c} ${className}`} style={{ fontSize: em(size), fontWeight: weight }}>
        {children}
      </span>
    </span>
  );
}

/**
 * 손가락이 누르는 곳 (회색 동그라미). d초 주기 중 at(0~1) 때 꾹 누름.
 */
export function Tap({ x, y, at = 0.3, d = 3.6, size = 10 }: { x: number; y: number; at?: number; d?: number; size?: number }) {
  return (
    <span
      className="k-tap"
      style={{ left: em(x), top: em(y), width: em(size), height: em(size), marginLeft: em(-size / 2), marginTop: em(-size / 2), animationDuration: `${d}s`, animationDelay: `${at * d - d / 2}s` }}
    />
  );
}

/**
 * n개 중 k번째 구간에만 보이게 (d초 주기). 예: win(0, 3, 3.6) → 0~1.2초에만 보임
 */
export function win(k: number, n: number, d: number): CSSProperties {
  return { animation: `k-win${n} ${d}s steps(1) infinite`, animationDelay: `${-(((n - k) % n) * d) / n}s` };
}

/** 마우스 화살표 */
export function Cursor({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={`k-cursor ${className}`} style={style} viewBox="0 0 24 24">
      <path d="M5 3l14 8-6.5 1.6L9.4 19z" />
    </svg>
  );
}

/** 산과 해가 있는 작은 그림 (사진 자리) */
export function Pic({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={`k-pic ${className}`} style={style} viewBox="0 0 40 30" preserveAspectRatio="xMidYMid slice">
      <rect width="40" height="30" fill="var(--blue-soft)" />
      <circle cx="29" cy="9" r="4" fill="#fff" />
      <path d="M0 30 L13 11 L22 23 L28 17 L40 30Z" fill="var(--blue)" />
    </svg>
  );
}

/** 작은 달력 (7칸 × rows줄). on = 파랗게 칠할 칸 번호들, mid = 연파랑 칸 번호들 */
export function MiniCal({ x, y, cell = 5.6, gap = 0.8, rows = 5, on = [], mid = [], className = '', cellClass }: {
  x: number; y: number; cell?: number; gap?: number; rows?: number; on?: number[]; mid?: number[]; className?: string;
  cellClass?: (i: number) => string | undefined;
}) {
  return (
    <span className={`k-cal ${className}`} style={{ left: em(x), top: em(y), gridTemplateColumns: `repeat(7, ${cell}em)`, gap: em(gap) }}>
      {Array.from({ length: rows * 7 }, (_, i) => (
        <i key={i} className={`${on.includes(i) ? 'k-cal-on' : mid.includes(i) ? 'k-cal-mid' : ''} ${cellClass?.(i) ?? ''}`} style={{ height: em(cell) }} />
      ))}
    </span>
  );
}

/** 움직이는 손가락 (위치·움직임은 className의 애니메이션으로) */
export function Finger({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <span className={`k-finger ${className}`} style={style} />;
}
