import { ChevronRight, File, Folder } from 'lucide-react';
import { B, T } from './kit';
import { Callout, Stage } from './Stage';
import s from './Data.module.css';

/** 🧩 데이터 보여주기 */
type P = { playing: boolean };

export function BarChart({ playing }: P) {
  const hs = [28, 44, 20, 52, 36];
  return (
    <Stage playing={playing}>
      <B x={10} y={76} w={80} h={0.8} r={0} c="c" />
      {hs.map((h, i) => <B key={i} x={15 + i * 15} y={76 - h} w={10} h={h} r={1.6} c={i === 3 ? 'p' : 'c'} className={s.bar} style={{ animationDelay: `${i * 0.15}s` }} />)}
      <Callout x={65} y={22} dir="down">막대 길이로 비교</Callout>
    </Stage>
  );
}

export function LineChart({ playing }: P) {
  return (
    <Stage playing={playing}>
      <svg viewBox="0 0 100 100" className={s.svg}>
        <path d="M10 80 H92 M10 18 V80" className={s.axis} />
        <path d="M14 70 L32 58 L50 62 L68 40 L86 26" className={s.line} pathLength="100" />
        {[[14, 70], [32, 58], [50, 62], [68, 40], [86, 26]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" className={s.pt} style={{ animationDelay: `${i * 0.4}s` }} />)}
      </svg>
      <Callout x={68} y={42}>시간에 따라 변하는 모습</Callout>
    </Stage>
  );
}

export function PieChart({ playing }: P) {
  const segs = [[0, 45, 'var(--blue)'], [45, 25, 'var(--blue-deep)'], [70, 18, 'var(--gray-3)'], [88, 12, 'var(--gray-2)']] as const;
  return (
    <Stage playing={playing}>
      <svg viewBox="0 0 100 100" className={s.svg}>
        {segs.map(([start, len, color], i) => (
          <circle key={i} cx="50" cy="46" r="24" pathLength="100" className={s.seg}
            style={{ stroke: color, strokeDasharray: `${len} ${100 - len}`, strokeDashoffset: -start, animationDelay: `${i * 0.25}s` }} />
        ))}
      </svg>
      <Callout x={50} y={80}>전체를 조각으로 나눈 비율</Callout>
    </Stage>
  );
}

export function StatCard({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={20} y={22} w={60} h={46} r={5} c="w">
        <B x={6} y={6} w={26} h={4} c="g" />
        <T x={6} y={14} size={20} c="ink" weight={700} className={s.count}>{''}</T>
        <T x={33} y={24} size={6} c="sub">명</T>
        <B x={6} y={35} w={18} h={4} c="s" />
      </B>
      <Callout x={50} y={70}>큰 숫자 하나로 한눈에</Callout>
    </Stage>
  );
}

export function Timeline({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={24} y={12} w={1.4} h={72} r={0.7} c="g" />
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={s.step} style={{ animationDelay: `${i * 0.5}s` }}>
          <B x={21.2} y={14 + i * 18} w={7} h={7} r={3.5} c={i === 3 ? 'p' : 'k'} />
          <B x={34} y={14.6 + i * 18} w={[30, 40, 24, 36][i]} h={3.6} c="k" />
          <B x={34} y={20 + i * 18} w={[44, 30, 38, 26][i]} h={2.6} c="g" />
        </span>
      ))}
      <Callout x={40} y={86} dir="down">일어난 순서대로 선 위에</Callout>
    </Stage>
  );
}

export function Kanban({ playing }: P) {
  return (
    <Stage playing={playing}>
      {['할 일', '하는 중', '끝남'].map((t, i) => (
        <span key={t}>
          <B x={6 + i * 30} y={14} w={28} h={68} r={3} c="a" />
          <T x={20 + i * 30} y={17} size={4.4} align="center" c="sub">{t}</T>
          <B x={8 + i * 30} y={i === 2 ? 26 : 50} w={24} h={11} r={2} c="w" />
        </span>
      ))}
      <B x={8} y={26} w={24} h={11} r={2} c="p" className={s.card} />
      <Callout x={50} y={84}>카드를 옆 칸으로 옮겨요</Callout>
    </Stage>
  );
}

export function TreeView({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.treeRow} style={{ top: '16em', left: '14em' }}>
        <ChevronRight className={s.treeChev} /><Folder className={s.folder} /><b className={s.treeBar} style={{ width: '24em' }} />
      </span>
      <div className={s.children}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={s.treeRow} style={{ top: `${i * 12}em`, left: '0' }}>
            <File className={s.file} /><b className={s.treeBar} style={{ width: `${[22, 16, 26][i]}em` }} />
          </span>
        ))}
      </div>
      <span className={s.treeRow} style={{ top: '30em', left: '14em' }} >
        <ChevronRight className={s.treeChev2} /><Folder className={s.folder} /><b className={s.treeBar} style={{ width: '20em' }} />
      </span>
      <Callout x={30} y={16} dir="down">눌러서 아래 단계 펼치기</Callout>
    </Stage>
  );
}

export function Heatmap({ playing }: P) {
  const v = [0.2, 0.6, 0.1, 0.9, 0.4, 0.7, 0.3, 0.5, 1, 0.2, 0.6, 0.8, 0.1, 0.4, 0.9, 0.3, 0.7, 0.5, 0.2, 1, 0.6, 0.4, 0.8, 0.1, 0.5, 0.9, 0.3, 0.7];
  return (
    <Stage playing={playing}>
      {v.map((o, i) => (
        <B key={i} x={13 + (i % 7) * 11} y={18 + Math.floor(i / 7) * 11} w={9} h={9} r={1.6} c="a" className={s.cell}>
          <span className={s.cellFill} style={{ opacity: o, animationDelay: `${(i % 7) * 0.12 + Math.floor(i / 7) * 0.08}s` }} />
        </B>
      ))}
      <Callout x={50} y={64}>값이 클수록 진한 색</Callout>
    </Stage>
  );
}
