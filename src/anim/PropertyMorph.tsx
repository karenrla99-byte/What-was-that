import type { ReactNode } from 'react';
import { Stage } from './Stage';
import s from './PropertyMorph.module.css';

/**
 * PropertyMorph 템플릿: 상자 하나의 속성이 0 → 최대로 바뀜.
 * variant = 용어 id. 아래 작은 글씨는 CSS 속성 이름.
 */
const T = ({ children }: { children: ReactNode }) => <span className={s.t}>{children}</span>;

const VARIANTS: Record<string, { label: string; body: ReactNode }> = {
  padding: { label: 'padding', body: <div className={s.hatch}><span className={s.fillBox} /></div> },
  margin: { label: 'margin', body: <div className={s.hatch}><span className={s.fillBox} /></div> },
  gap: { label: 'gap', body: <div className={s.row}><i /><i /><i /></div> },
  'border-radius': { label: 'border-radius', body: <span className={s.solid} /> },
  border: { label: 'border', body: <span className={s.soft} /> },
  'drop-shadow': { label: 'box-shadow', body: <span className={s.white} /> },
  opacity: { label: 'opacity', body: <div className={s.checker}><span className={s.solid} /></div> },
  blur: { label: 'blur', body: <div className={s.shapes}><i /><i /><i /></div> },
  gradient: { label: 'gradient', body: <span className={s.solid} /> },
  divider: { label: 'divider', body: <div className={s.list}><i /><b /><i /><b /><i /></div> },
  'primary-color': { label: 'primary', body: <div className={s.ui}><i className={s.uiBtn} /><i className={s.uiSwitch} /><i className={s.uiLink} /></div> },
  'accent-color': { label: 'accent', body: <div className={s.ui}><i className={s.uiCard} /><i className={s.uiCard} /><i className={s.uiCard}><b /></i></div> },
  'color-palette': { label: 'palette', body: <div className={s.palette}><i /><i /><i /><i /><i /></div> },
  'hex-code': { label: 'HEX', body: <div className={s.hex}><i /><T>#0095FF</T></div> },
  contrast: { label: 'contrast', body: <div className={s.contrast}><T>가 Aa</T></div> },
  'font-weight': { label: 'font-weight', body: <div className={s.weights}><T>가</T><T>가</T><T>가</T></div> },
  'font-size': { label: 'font-size', body: <div className={s.center}><T>가</T></div> },
  'line-height': { label: 'line-height', body: <div className={s.lines}><i /><i /><i /><i /></div> },
  'letter-spacing': { label: 'letter-spacing', body: <div className={s.center}><T>글자사이</T></div> },
  'text-truncation-ellipsis': { label: 'ellipsis', body: <div className={s.trunc}><T>제목이 길면 이렇게 줄어요</T></div> },
  'web-font': { label: 'web font', body: <div className={s.center}><T>가나다 Aa</T></div> },
};

export function propertyMorph(variant: string) {
  const v = VARIANTS[variant];
  return function PropertyMorph({ playing }: { playing: boolean }) {
    return (
      <Stage playing={playing} className={s.pm} variant={variant}>
        <div className={s.area}>{v.body}</div>
        <span className={s.label}>{v.label}</span>
      </Stage>
    );
  };
}

export const PROPERTY_IDS = Object.keys(VARIANTS);
