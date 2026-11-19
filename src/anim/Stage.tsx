import { Children, isValidElement, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import s from './Stage.module.css';

type StageProps = { playing: boolean; children: ReactNode; className?: string; style?: CSSProperties; variant?: string };

/**
 * 모든 애니메이션의 바탕.
 * 안쪽 크기는 em으로 그림: 100em = 칸의 짧은 변. 그래서 카드(작게)와 상세(크게)에서 같은 그림이 그대로 커짐.
 * playing이 false면 (화면 밖) 멈춤.
 */
export function Stage({ playing, children, className = '', style, variant }: StageProps) {
  const ref = useRef<HTMLDivElement>(null);
  useStill(ref);
  return (
    <div ref={ref} className={`${s.root} ${playing ? '' : s.paused} ${className}`} style={style} data-v={variant} aria-hidden="true">
      <div className={s.unit}>
        <div className={s.canvas}>{children}</div>
      </div>
    </div>
  );
}

/**
 * 그림 속 중요한 곳을 가리키는 이름표. 상세 화면(크게)에서만 보이고 카드에서는 숨김.
 * x, y = 이름표 화살 끝 위치(em). dir = 화살이 가리키는 쪽.
 */
export function Callout({ x, y, dir = 'up', children }: { x: number; y: number; dir?: 'up' | 'down'; children: ReactNode }) {
  return (
    // 바깥은 그림 단위(em)로 자리만 잡고, 글자 크기는 안쪽에서 정함
    <span className={`${s.callout} ${dir === 'up' ? s.up : s.down}`} style={{ left: `${x}em`, top: `${y}em` }}>
      <span className={s.calloutText}>{children}</span>
    </span>
  );
}

/** 작은 폰 화면 (MiniPhone 템플릿). 안에서 부품·화면이 작동 */
export function Phone({ playing, children, bare = false }: { playing: boolean; children: ReactNode; bare?: boolean }) {
  // 이름표(Callout)는 폰 테두리에 잘리지 않게 폰과 같은 자리의 겹친 층에 그림
  const all = Children.toArray(children);
  const callouts = all.filter((c) => isValidElement(c) && c.type === Callout);
  const rest = all.filter((c) => !(isValidElement(c) && c.type === Callout));
  return (
    <Stage playing={playing}>
      <div className={s.phone}>
        {!bare && (
          <>
            <span className={s.title} />
            <span className={s.line} />
          </>
        )}
        {rest}
      </div>
      <div className={s.phoneOver}>{callouts}</div>
    </Stage>
  );
}

/**
 * 동작 줄이기(prefers-reduced-motion)가 켜져 있으면 움직임을 멈춤.
 * 0초에 멈추면 빈 그림인 경우가 많아서, 한 바퀴의 60% 지점(결과가 보이는 장면)에서 멈춰 둠.
 */
export function useStill(ref: { current: HTMLElement | null }) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined' || !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const freeze = () => {
      const anims = el.getAnimations?.({ subtree: true }) ?? [];
      const durs = anims.map((a) => Number(a.effect?.getTiming().duration) || 0);
      const t = Math.max(0, ...durs) * 0.6;
      anims.forEach((a) => {
        a.pause();
        a.currentTime = t;
      });
    };
    const id = requestAnimationFrame(freeze);
    return () => cancelAnimationFrame(id);
  });
}
