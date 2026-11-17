import type { CSSProperties } from 'react';
import { Stage } from './Stage';
import s from './LayoutSketch.module.css';

/**
 * LayoutSketch 템플릿: 작은 화면 틀 안에 회색 상자로 배치를 그림.
 * 상자 = [x, y, w, h, 색] (틀 크기의 %). 색: a 연회색 · b 회색 · c 진회색 · k 글자색 · p 파랑 · s 연파랑 · w 흰색
 * 상자가 차례로 나타남. path가 있으면 시선이 가는 길을 파란 선으로 그림.
 */
type Box = [x: number, y: number, w: number, h: number, c: string, round?: boolean];
/** labels: 상자 번호 → 이름 (상세 화면에서만 보임) */
type Layout = { boxes: Box[]; path?: string; bleed?: boolean; labels?: Record<number, string> };

const rows = (n: number, fn: (i: number) => Box[]): Box[] => Array.from({ length: n }, (_, i) => fn(i)).flat();

const LAYOUTS: Record<string, Layout> = {
  hero: {
    labels: { 0: '히어로', 5: '버튼' },
    boxes: [
      [0, 0, 100, 60, 's'], [6, 6, 14, 5, 'c'], [70, 6, 24, 4, 'b'],
      [28, 20, 44, 9, 'k'], [34, 34, 32, 4, 'c'], [40, 43, 20, 9, 'p'],
      [6, 68, 26, 26, 'a'], [37, 68, 26, 26, 'a'], [68, 68, 26, 26, 'a'],
    ],
  },
  'split-layout': {
    labels: { 0: '왼쪽: 글', 5: '오른쪽: 그림' },
    boxes: [[0, 0, 50, 100, 's'], [8, 26, 32, 8, 'k'], [8, 40, 26, 4, 'c'], [8, 48, 20, 4, 'c'], [8, 60, 18, 10, 'p'], [56, 12, 38, 76, 'b']],
  },
  'card-grid': {
    labels: { 0: '카드' },
    boxes: rows(6, (i) => {
      const x = 5 + (i % 3) * 31.5;
      const y = 8 + Math.floor(i / 3) * 45;
      return [[x, y, 27, 39, 'a'], [x + 3, y + 4, 21, 17, 'b'], [x + 3, y + 25, 15, 4, 'c'], [x + 3, y + 32, 10, 3, 'b']] as Box[];
    }),
  },
  'grid-layout': {
    labels: { 5: '한 칸' },
    boxes: rows(12, (i) => [[5 + (i % 4) * 23.3, 7 + Math.floor(i / 4) * 30, 20, 26, i === 5 ? 'p' : 'b']]),
  },
  'sidebar-layout': {
    labels: { 0: '사이드바', 7: '본문' },
    boxes: [
      [0, 0, 26, 100, 's'], [5, 8, 14, 6, 'k'], [5, 24, 16, 6, 'p'], [5, 36, 14, 4, 'c'], [5, 46, 16, 4, 'c'], [5, 56, 12, 4, 'c'],
      [32, 8, 34, 7, 'k'], [32, 22, 62, 34, 'a'], [32, 62, 29, 30, 'a'], [65, 62, 29, 30, 'a'],
    ],
  },
  'magazine-layout': {
    labels: { 0: '큰 사진', 4: '작은 기사' },
    boxes: [
      [5, 7, 54, 48, 'c'], [5, 61, 46, 9, 'k'], [5, 75, 54, 4, 'b'], [5, 83, 40, 4, 'b'],
      [65, 7, 30, 22, 'b'], [65, 33, 24, 4, 'c'], [65, 44, 30, 22, 'p'], [65, 70, 24, 4, 'c'], [65, 79, 30, 4, 'b'], [65, 87, 18, 4, 'b'],
    ],
  },
  'masonry-layout': {
    labels: { 4: '높이가 달라요' },
    boxes: [
      [5, 6, 27, 34, 'b'], [5, 44, 27, 20, 'a'], [5, 68, 27, 26, 'c'],
      [36.5, 6, 27, 20, 'a'], [36.5, 30, 27, 40, 'p'], [36.5, 74, 27, 20, 'b'],
      [68, 6, 27, 28, 'c'], [68, 38, 27, 24, 'b'], [68, 66, 27, 28, 'a'],
    ],
  },
  'list-layout': {
    labels: { 0: '한 줄에 하나' },
    boxes: rows(4, (i) => {
      const y = 8 + i * 22.5;
      return [[6, y, 88, 18, 'a'], [10, y + 4, 10, 10, i === 1 ? 'p' : 'c', true], [25, y + 4, 34, 4, 'k'], [25, y + 11, 50, 3, 'b']] as Box[];
    }),
  },
  'column-layout': {
    labels: { 0: '1단 · 2단 · 3단' },
    boxes: [
      [6, 7, 50, 8, 'k'],
      ...rows(3, (c) => rows(7, (r) => [[6 + c * 30.5, 24 + r * 10, r === 6 ? 16 : 27, 4, c === 1 && r < 3 ? 'p' : 'b']] as Box[])),
    ],
  },
  dashboard: {
    labels: { 0: '숫자', 12: '그래프', 19: '목록' },
    boxes: [
      ...rows(4, (i) => [[5 + i * 23.3, 6, 20, 20, 'a'], [8 + i * 23.3, 10, 8, 3, 'c'], [8 + i * 23.3, 16, 12, 6, i === 0 ? 'p' : 'k']] as Box[]),
      [5, 32, 59, 62, 'a'],
      ...rows(6, (i) => [[11 + i * 8.5, 86 - [22, 34, 28, 44, 38, 50][i], 5, [22, 34, 28, 44, 38, 50][i], i === 5 ? 'p' : 'c']] as Box[]),
      [68, 32, 27, 62, 'a'], [72, 38, 19, 19, 's', true], [72, 64, 19, 4, 'c'], [72, 72, 14, 4, 'b'], [72, 80, 17, 4, 'b'],
    ],
  },
  'z-pattern': {
    labels: { 0: '1', 1: '2', 3: '3', 5: '4' },
    boxes: [[6, 8, 18, 9, 'k'], [68, 9, 26, 6, 'c'], [6, 28, 88, 36, 'a'], [6, 74, 40, 6, 'c'], [6, 84, 28, 4, 'b'], [74, 73, 20, 14, 'p']],
    path: 'M12 12 H88 L14 79 H86',
  },
  'full-bleed': {
    labels: { 0: '끝까지 꽉' },
    boxes: [[0, 0, 100, 100, 'c'], [8, 56, 52, 10, 'w'], [8, 72, 34, 5, 'w'], [8, 83, 18, 9, 'p']],
    bleed: true,
  },
  'f-pattern': {
    labels: { 0: '1', 1: '2', 5: '3' },
    boxes: [
      [6, 8, 88, 8, 'k'], [6, 24, 58, 5, 'c'], [6, 33, 74, 4, 'b'],
      [6, 46, 44, 5, 'c'], [6, 55, 60, 4, 'b'],
      [6, 68, 22, 4, 'b'], [6, 76, 30, 4, 'b'], [6, 84, 18, 4, 'b'], [6, 92, 26, 4, 'b'],
    ],
    path: 'M8 12 H92 M8 12 V94 M8 48 H52',
  },
  'centered-layout': {
    labels: { 4: '가운데로 모음' },
    boxes: [
      [30, 9, 40, 9, 'k'], [26, 26, 48, 4, 'b'], [26, 34, 48, 4, 'b'], [26, 42, 36, 4, 'b'],
      [26, 54, 48, 22, 'a'], [41, 84, 18, 9, 'p'],
    ],
  },
};

export function layoutSketch(variant: string) {
  const layout = LAYOUTS[variant];
  return function LayoutSketch({ playing }: { playing: boolean }) {
    return (
      <Stage playing={playing}>
        <div className={`${s.frame} ${layout.bleed ? s.bleed : ''}`}>
          {layout.boxes.map(([x, y, w, h, c, round], i) => (
            <span
              key={i}
              className={`${s.box} ${s[c]} ${round ? s.round : ''}`}
              style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, '--i': i, '--n': layout.boxes.length } as CSSProperties}
            />
          ))}
          {Object.entries(layout.labels ?? {}).map(([k, text]) => {
            const [x, y, w, h, c] = layout.boxes[+k];
            return (
              <b key={k} className={`${s.name} ${'kcp'.includes(c) ? s.dark : ''}`} style={{ left: `${x + w / 2}%`, top: `${y + h / 2}%` }}>
                {text}
              </b>
            );
          })}
          {layout.path && (
            <svg className={s.path} viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d={layout.path} pathLength="100" />
            </svg>
          )}
        </div>
      </Stage>
    );
  };
}

export const LAYOUT_IDS = Object.keys(LAYOUTS);
