import type { CSSProperties } from 'react';
import { Stage } from './Stage';
import s from './TypeSwatch.module.css';

/**
 * TypeSwatch 템플릿: 같은 낱말 "글자"를 글자 스타일만 바꿔 그림.
 * variant = 용어 id. 모양과 움직임은 TypeSwatch.module.css의 [data-v='…'] 규칙에서 정함.
 */
const WORD = '글자';

export function typeSwatch(variant: string, caption = 'Type') {
  return function TypeSwatch({ playing }: { playing: boolean }) {
    return (
      <Stage playing={playing} className={s.tw} variant={variant}>
        <span className={`${s.deco} ${s.d1}`} />
        <span className={`${s.deco} ${s.d2}`} />
        <b className={s.word} data-t={WORD}>
          {[...WORD].map((ch, i) => (
            <span key={i} className={s.ch} style={{ '--i': i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </b>
        <span className={s.cap}>{caption}</span>
      </Stage>
    );
  };
}

export const TYPE_STYLES: Record<string, string> = {
  'acid-graphics': 'ACID',
  glitch: 'ERR_0x3F',
  'inflated-3d': 'puffy',
  'bauhaus-type': 'FORM + FUNCTION',
  'art-deco-type': 'EST. 1925',
  outline: 'OUTLINE',
  monospace: 'const a = 1;',
  'hand-lettering': 'by hand',
  minimal: 'less',
  'brutalism-type': 'RAW / NO ORNAMENT',
  'neo-brutalism-type': 'NEO / 002',
  'swiss-style-type': 'Grid system',
  'editorial-type': 'ISSUE NO. 09',
  chunky: 'chunky',
  'retro-groovy': 'groovy',
  'y2k-chrome-type': 'CHROME',
  'pixel-type': 'PRESS START',
  kinetic: 'in motion',
};
