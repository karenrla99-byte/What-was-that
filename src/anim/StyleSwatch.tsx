import { StickyNote } from 'lucide-react';
import { Stage } from './Stage';
import s from './StyleSwatch.module.css';

/**
 * StyleSwatch 템플릿: 같은 "메모 아이콘 + 짧은 글" 카드를 스타일만 바꿔 그림.
 * variant = 용어 id. 모양은 StyleSwatch.module.css의 [data-v='…'] 규칙에서 정함.
 * (생김새 묶음의 스타일 예시라서 루미너스 블루·회색 말고 다른 색도 씀)
 */
export function styleSwatch(variant: string) {
  return function StyleSwatch({ playing }: { playing: boolean }) {
    return (
      <Stage playing={playing} className={s.sw} variant={variant}>
        <span className={`${s.deco} ${s.d1}`} />
        <span className={`${s.deco} ${s.d2}`} />
        <span className={`${s.deco} ${s.d3}`} />
        <div className={s.card}>
          <span className={s.icon}>
            <StickyNote />
          </span>
          <div className={s.text}>
            <b className={s.title}>메모</b>
            <span className={s.sub}>오늘 할 일 3개</span>
          </div>
        </div>
      </Stage>
    );
  };
}

export const DESIGN_STYLES = [
  'skeuomorphism', 'flat-design', 'material-design', 'neumorphism', 'glassmorphism', 'liquid-glass', 'claymorphism',
  'neobrutalism', 'brutalism', 'minimalism', 'maximalism', 'editorial', 'swiss-style', 'bento-grid', 'bauhaus',
  'art-deco', 'memphis', 'pop-art', 'collage', 'cut-paper', 'ink', 'risograph', 'sketchbook', 'pixel-art', 'isometric',
  'mathematical-design', 'kinetic-typography', 'grainy-gradient', 'y2k', 'y2k-chrome', 'cyberpunk', 'dark-mode', '3d-icon',
];
