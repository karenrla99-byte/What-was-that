import type { CSSProperties, ReactNode } from 'react';
import s from './Stage.module.css';

type StageProps = { playing: boolean; children: ReactNode; className?: string; style?: CSSProperties; variant?: string };

/**
 * 모든 애니메이션의 바탕.
 * 안쪽 크기는 em으로 그림: 100em = 칸의 짧은 변. 그래서 카드(작게)와 상세(크게)에서 같은 그림이 그대로 커짐.
 * playing이 false면 (화면 밖) 멈춤.
 */
export function Stage({ playing, children, className = '', style, variant }: StageProps) {
  return (
    <div className={`${s.root} ${playing ? '' : s.paused} ${className}`} style={style} data-v={variant} aria-hidden="true">
      <div className={s.unit}>
        <div className={s.canvas}>{children}</div>
      </div>
    </div>
  );
}

/** 작은 폰 화면 (MiniPhone 템플릿). 안에서 부품·화면이 작동 */
export function Phone({ playing, children, bare = false }: { playing: boolean; children: ReactNode; bare?: boolean }) {
  return (
    <Stage playing={playing}>
      <div className={s.phone}>
        {!bare && (
          <>
            <span className={s.title} />
            <span className={s.line} />
          </>
        )}
        {children}
      </div>
    </Stage>
  );
}
