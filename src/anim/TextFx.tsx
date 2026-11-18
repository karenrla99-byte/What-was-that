import type { CSSProperties } from 'react';
import { B, T } from './kit';
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
  // 낱말 자리는 가운데 고정. 글자가 하나씩 생기고, 커서(|)는 늘 마지막 글자 바로 뒤에
  return (
    <Stage playing={playing}>
      <Line>
        <span className={s.typeWrap}>
          <span className={s.caretStart} />
          {[...WORD].map((c, i) => <span key={i} className={`${s.key} ${s[`k${i}`]}`}>{c}</span>)}
        </span>
      </Line>
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
  // 앞 절반: 글자가 빠르게 뒤섞이며 왼쪽부터 하나씩 제자리 찾기 → 뒤 절반: 진짜 글로 멈춤
  const frames = ['쀍@뷁#', '%뙇&쀍', '반#뷁@', '반쀍%뙇', '반가@#', '반가뷁&', '반가워%', '반가워뙇'];
  return (
    <Stage playing={playing}>
      {frames.map((f, i) => (
        <Line key={f}><span className={s.scrFrame} style={{ animationDelay: `${i * 0.2}s` }}>{f}</span></Line>
      ))}
      <Line><span className={s.scrFinal}>{WORD}</span></Line>
      <Callout x={50} y={60}>마구 바뀌다가 진짜 글로 멈춰요</Callout>
    </Stage>
  );
}

export function MaskReveal({ playing }: P) {
  // 파란 막이 글자 위를 지나가며 덮었다가 걷히면 글이 드러남
  return (
    <Stage playing={playing}>
      <Line>
        <span className={s.maskWrap}>
          <span className={s.maskText}>{WORD}</span>
          <span className={s.maskBar} />
        </span>
      </Line>
      <Callout x={50} y={60}>막이 걷히며 글이 드러나요</Callout>
    </Stage>
  );
}

export function Highlight({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Line><mark className={s.marker}>{WORD}</mark></Line>
      <Callout x={50} y={60}>형광펜으로 그은 듯 색이 칠해져요</Callout>
    </Stage>
  );
}

export function WordSwap({ playing }: P) {
  // 문장은 그대로, 가운데 낱말만 위로 굴러가며 바뀜
  const words = ['책 읽는', '그림 그리는', '노래하는', '책 읽는'];
  return (
    <Stage playing={playing}>
      <span className={s.swapLine}>
        오늘은
        <span className={s.swapBox}>
          <span className={s.swapRoll}>{words.map((w, i) => <b key={i}>{w}</b>)}</span>
        </span>
        날
      </span>
      <Callout x={50} y={60}>한 낱말만 계속 바뀌어요</Callout>
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
