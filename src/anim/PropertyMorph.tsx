import type { ReactNode } from 'react';
import { Stage } from './Stage';
import s from './PropertyMorph.module.css';

/**
 * PropertyMorph 템플릿: 상자 하나의 속성이 0 → 최대로 바뀜.
 * variant = 용어 id. 아래 작은 글씨는 CSS 속성 이름.
 */
const T = ({ children }: { children: ReactNode }) => <span className={s.t}>{children}</span>;

const VARIANTS: Record<string, { label: string; body: ReactNode }> = {
  padding: { label: '안쪽 빈칸이 넓어져요', body: <div className={s.hatch}><span className={s.fillBox} /></div> },
  margin: { label: '바깥 빈칸이 넓어져요', body: <div className={s.hatch}><span className={s.fillBox} /></div> },
  gap: { label: '사이가 벌어져요', body: <div className={s.row}><i /><i /><i /></div> },
  'border-radius': { label: '네모 → 알약', body: <span className={s.solid} /> },
  border: { label: '테두리 선이 생겨요', body: <span className={s.soft} /> },
  'drop-shadow': { label: '그림자로 떠올라요', body: <span className={s.white} /> },
  opacity: { label: '점점 비쳐 보여요', body: <div className={s.checker}><span className={s.solid} /></div> },
  blur: { label: '점점 흐려져요', body: <div className={s.shapes}><i /><i /><i /></div> },
  gradient: { label: '색이 스르르 이어져요', body: <span className={s.solid} /> },
  divider: { label: '사이를 나누는 선', body: <div className={s.list}><i /><b /><i /><b /><i /></div> },
  'primary-color': { label: '버튼·스위치·링크가 같은 색', body: <div className={s.ui}><i className={s.uiBtn} /><i className={s.uiSwitch} /><i className={s.uiLink} /></div> },
  'accent-color': { label: '딱 한 곳만 눈에 띄게', body: <div className={s.ui}><i className={s.uiCard} /><i className={s.uiCard} /><i className={s.uiCard}><b /></i></div> },
  'color-palette': { label: '쓸 색을 정한 세트', body: <div className={s.palette}><i /><i /><i /><i /><i /></div> },
  'hex-code': { label: '색을 숫자로 적은 이름', body: <div className={s.hex}><i /><T>#0095FF</T></div> },
  contrast: { label: '흐릿 → 또렷', body: <div className={s.contrast}><T>가 Aa</T></div> },
  'font-weight': { label: '가늘게 · 보통 · 굵게', body: <div className={s.weights}><T>가</T><T>가</T><T>가</T></div> },
  'font-size': { label: '작게 → 크게', body: <div className={s.center}><T>가</T></div> },
  'line-height': { label: '줄 사이가 벌어져요', body: <div className={s.lines}><i /><i /><i /><i /></div> },
  'letter-spacing': { label: '글자 사이가 벌어져요', body: <div className={s.center}><T>글자사이</T></div> },
  'text-truncation-ellipsis': { label: '넘치면 …으로', body: <div className={s.trunc}><T>제목이 길면 이렇게 줄어요</T></div> },
  'web-font': { label: '기본 글꼴 → 불러온 글꼴', body: <div className={s.center}><T>가나다 Aa</T></div> },
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
