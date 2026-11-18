import type { CSSProperties } from 'react';
import { B, T, win } from './kit';
import { Callout, Stage } from './Stage';
import s from './TextFx.module.css';

/** 🎬 텍스트 등장 효과: 같은 문장 "반가워요"가 효과별로 나타남 */
type P = { playing: boolean };
const WORD = '반가워요';
const Chars = ({ cls }: { cls: string }) => (
  <>{[...WORD].map((c, i) => <span key={i} className={cls} style={{ '--i': i } as CSSProperties}>{c}</span>)}</>
);

function Line({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`${s.line} ${className}`}>{children}</span>;
}

export function Typing({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Line className={s.typing}>{WORD}</Line>
      <Callout x={50} y={60}>한 글자씩 쳐지듯 나타나요</Callout>
    </Stage>
  );
}

export function FadeUp({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Line className={s.fadeUp}>{WORD}</Line>
      <Callout x={50} y={60}>아래에서 살짝 올라오며 나타나요</Callout>
    </Stage>
  );
}

export function StaggeredChars({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Line><Chars cls={s.char} /></Line>
      <Callout x={50} y={60}>글자가 하나씩 차례로</Callout>
    </Stage>
  );
}

export function CountUp({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Line className={s.count}>{''}</Line>
      <T x={68} y={36} size={8} c="sub">점</T>
      <Callout x={50} y={60}>0부터 목표 숫자까지 촤라락</Callout>
    </Stage>
  );
}

export function Scramble({ playing }: P) {
  const frames = ['#@%&', '반@가%', '반가#요', WORD];
  return (
    <Stage playing={playing}>
      {frames.map((f, i) => <Line key={f} className={s.abs}><span style={{ ...win(i, 4, 2.4), display: 'block' }}>{f}</span></Line>)}
      <Callout x={50} y={60}>마구 바뀌다가 진짜 글로 멈춰요</Callout>
    </Stage>
  );
}

export function MaskReveal({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Line className={s.mask}>{WORD}<span className={s.wiper} /></Line>
      <Callout x={50} y={60}>가려진 글이 닦이듯 드러나요</Callout>
    </Stage>
  );
}

export function Highlight({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Line><mark className={s.marker}>{WORD}</mark></Line>
      <Callout x={50} y={60}>형광펜처럼 뒤에 색이 칠해져요</Callout>
    </Stage>
  );
}

export function WordSwap({ playing }: P) {
  const words = ['책 읽는', '그림 그리는', '노래하는'];
  return (
    <Stage playing={playing}>
      <T x={50} y={26} size={7} align="center" c="sub">오늘은</T>
      <B x={14} y={38} w={72} h={14} r={3} c="s" style={{ overflow: 'hidden' }}>
        {words.map((w, i) => <T key={w} x={36} y={3} size={7} c="blue" weight={700} align="center" className={s.swap} style={win(i, 3, 4.5)}>{w}</T>)}
      </B>
      <T x={50} y={56} size={7} align="center" c="sub">날</T>
      <Callout x={50} y={70}>한 낱말만 계속 바뀌어요</Callout>
    </Stage>
  );
}

export function BlurIn({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Line className={s.blurIn}>{WORD}</Line>
      <Callout x={50} y={60}>뿌옇다가 또렷해져요</Callout>
    </Stage>
  );
}

export function Marquee({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={0} y={34} w={100} h={16} r={0} c="d" style={{ overflow: 'hidden' }}>
        <span className={s.marquee}>내일은 현장학습이에요 · 물과 모자를 챙겨요 · 내일은 현장학습이에요 · 물과 모자를 챙겨요 ·</span>
      </B>
      <Callout x={50} y={54}>전광판처럼 옆으로 흘러가요</Callout>
    </Stage>
  );
}
