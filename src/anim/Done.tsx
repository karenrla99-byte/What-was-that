import { Award, Check, Heart, Send } from 'lucide-react';
import { B, Pic, T, Tap } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Done.module.css';

/** 🎬 로딩 패턴 · 완료 표시 */
type P = { playing: boolean };
const C = 28.8;

export function Spinner({ playing }: P) {
  return (
    <Phone playing={playing}>
      <span className={s.spinner} />
      <Callout x={C} y={52}>빙글빙글 = 기다려 주세요</Callout>
    </Phone>
  );
}

export function Skeleton({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      {[0, 1, 2].map((i) => (
        <span key={i}>
          <span className={s.skel}>
            <B x={5} y={8 + i * 24} w={14} h={14} r={7} c="g" className={s.shimmer} />
            <B x={23} y={9 + i * 24} w={29} h={4} c="g" className={s.shimmer} />
            <B x={23} y={16 + i * 24} w={20} h={3} c="g" className={s.shimmer} />
          </span>
          <span className={s.real}>
            <B x={5} y={8 + i * 24} w={14} h={14} r={7} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
            <B x={23} y={9 + i * 24} w={29} h={4} c="k" />
            <B x={23} y={16 + i * 24} w={20} h={3} c="c" />
          </span>
        </span>
      ))}
      <Callout x={C} y={76}>내용 대신 회색 뼈대 먼저</Callout>
    </Phone>
  );
}

export function BlurUp({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={16} y={14} w={68} h={50} r={4} c="n" className={s.blurUp} style={{ overflow: 'hidden' }}><Pic /></B>
      <Callout x={50} y={66}>흐릿한 그림이 점점 선명하게</Callout>
    </Stage>
  );
}

export function OptimisticUi({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.heart}><Heart /></span>
      <T x={50} y={56} size={4.4} c="sub" align="center" className={s.sending}>보내는 중…</T>
      <T x={50} y={56} size={4.4} c="blue" align="center" className={s.sent}>저장됐어요</T>
      <Tap x={50} y={40} at={0.15} d={4} size={12} />
      <Callout x={50} y={66}>대답을 안 기다리고 바로 바뀌어요</Callout>
    </Stage>
  );
}

export function StreamingText({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={10} y={14} w={80} h={56} r={5} c="a">
        {[0, 1, 2, 3].map((i) => <B key={i} x={5} y={6 + i * 10} w={[66, 60, 68, 36][i]} h={4} c="c" className={s.stream} style={{ animationDelay: `${i * 0.7}s` }} />)}
      </B>
      <Callout x={50} y={72}>만들어지는 대로 바로바로</Callout>
    </Stage>
  );
}

export function CheckDraw({ playing }: P) {
  return (
    <Stage playing={playing}>
      <svg viewBox="0 0 100 100" className={s.svg}>
        <circle cx="50" cy="42" r="20" pathLength="100" className={s.circle} />
        <path d="M40 43 L48 51 L62 35" pathLength="100" className={s.check} />
      </svg>
      <Callout x={50} y={66}>체크가 그려지며 "다 됐어요"</Callout>
    </Stage>
  );
}

export function Strike({ playing }: P) {
  return (
    <Phone playing={playing}>
      {['숙제하기', '준비물 챙기기', '책 읽기'].map((t, i) => (
        <span key={t}>
          <B x={5} y={26 + i * 13} w={8} h={8} r={2} c="w" className={i === 1 ? s.box : undefined}>
            {i === 1 && <Check className={s.boxCheck} strokeWidth={3.5} />}
          </B>
          <T x={17} y={27 + i * 13} size={4.8} className={i === 1 ? s.strike : undefined}>{t}</T>
        </span>
      ))}
      <Tap x={9} y={43} at={0.25} d={4} size={9} />
      <Callout x={C} y={66}>끝낸 일에 줄이 쭉</Callout>
    </Phone>
  );
}

export function ButtonMorph({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.morph}>
        <b className={s.morphLabel}>보내기</b>
        <Check className={s.morphCheck} strokeWidth={3} />
      </span>
      <Tap x={50} y={42} at={0.15} d={4} size={12} />
      <Callout x={50} y={60}>버튼이 동그랗게 줄어 체크로</Callout>
    </Stage>
  );
}

export function ProgressDone({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={14} y={40} w={64} h={6} r={3} c="g"><span className={s.fill} /></B>
      <span className={s.doneMark}><Check strokeWidth={3.5} /></span>
      <Callout x={46} y={50}>끝까지 차고 반짝</Callout>
    </Stage>
  );
}

export function SendAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.trail} />
      <span className={s.plane}><Send /></span>
      <Callout x={50} y={70}>종이비행기처럼 슝</Callout>
    </Stage>
  );
}

export function Stamp({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={20} y={14} w={60} h={62} r={3} c="w">
        {[0, 1, 2, 3].map((i) => <B key={i} x={5} y={6 + i * 8} w={[44, 38, 46, 30][i]} h={3.4} c="g" />)}
      </B>
      <span className={s.stamp}>참 잘했어요</span>
      <Callout x={50} y={78}>도장이 쾅</Callout>
    </Stage>
  );
}

export function BadgeAward({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.rays} />
      <span className={s.badge}><Award /></span>
      <T x={50} y={60} size={5.4} align="center" className={s.badgeText}>일주일 연속 출석!</T>
      <Callout x={50} y={70}>목표를 이루면 배지가 짠</Callout>
    </Stage>
  );
}

export function Confetti({ playing }: P) {
  const pieces = Array.from({ length: 18 }, (_, i) => i);
  return (
    <Stage playing={playing}>
      {pieces.map((i) => (
        <i key={i} className={s.piece} style={{ '--x': `${(i % 6) * 14 - 35}em`, '--r': `${i * 47}deg`, '--h': `${-40 - (i % 3) * 12}em`, animationDelay: `${(i % 4) * 0.05}s`, background: ['var(--blue)', 'var(--gray-3)', 'var(--blue-deep)', '#7cc8ff'][i % 4] } as React.CSSProperties} />
      ))}
      <Callout x={50} y={78}>색종이가 펑!</Callout>
    </Stage>
  );
}

export function CompletionScreen({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.bigCheck}><Check strokeWidth={3} /></span>
      <T x={C} y={42} size={6} align="center" className={s.fadeIn}>모두 끝냈어요!</T>
      <T x={C} y={51} size={4} c="sub" weight={400} align="center" className={s.fadeIn}>10문제 중 9개 맞혔어요</T>
      <B x={8} y={68} w={41.6} h={11} r={5.5} c="p" className={s.fadeIn}><T x={20.8} y={2.8} size={4.6} c="white" align="center">다음 활동</T></B>
      <Callout x={C} y={80}>결과와 다음 할 일을 보여 줘요</Callout>
    </Phone>
  );
}
