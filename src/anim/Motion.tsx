import { Heart, Repeat, Timer } from 'lucide-react';
import { B, Cursor, Pic, T, Tap } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Motion.module.css';

/** 🎬 움직임 (MotionBox 템플릿): 같은 네모가 효과별로 움직임. 비교는 두 줄 경주 */
type P = { playing: boolean };

/** 경주 한 줄: 같은 거리를 같은 시간에, 움직이는 방식만 다르게 */
function Lane({ y, label, cls, blue = false }: { y: number; label: string; cls: string; blue?: boolean }) {
  return (
    <>
      <T x={10} y={y} size={4.2} c={blue ? 'blue' : 'sub'}>{label}</T>
      <B x={10} y={y + 15} w={80} h={0.6} r={0} c="g" />
      <B x={10} y={y + 6} w={9} h={9} r={2.4} c={blue ? 'p' : 'c'} className={`${s.run} ${cls}`} />
    </>
  );
}

function Race({ playing, label, cls, note }: P & { label: string; cls: string; note: string }) {
  return (
    <Stage playing={playing}>
      <Lane y={18} label="일정한 속도" cls={s.linear} />
      <Lane y={46} label={label} cls={cls} blue />
      <Callout x={50} y={70}>{note}</Callout>
    </Stage>
  );
}

export const EaseIn = ({ playing }: P) => <Race playing={playing} label="이즈 인" cls={s.easeIn} note="천천히 출발해서 점점 빠르게" />;
export const EaseOut = ({ playing }: P) => <Race playing={playing} label="이즈 아웃" cls={s.easeOut} note="빠르게 출발해서 천천히 멈춤" />;
export const EaseInOut = ({ playing }: P) => <Race playing={playing} label="이즈 인 아웃" cls={s.easeInOut} note="천천히 → 빠르게 → 천천히" />;

export function Linear({ playing }: P) {
  return (
    <Stage playing={playing}>
      {Array.from({ length: 8 }, (_, i) => <B key={i} x={13.5 + i * 10} y={50} w={2} h={2} r={1} c="c" />)}
      <B x={10} y={38} w={9} h={9} r={2.4} c="p" className={`${s.run} ${s.linear}`} />
      <Callout x={50} y={58}>처음부터 끝까지 같은 속도</Callout>
    </Stage>
  );
}

export function Spring({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={80} y={30} w={0.8} h={28} r={0} c="g" />
      <B x={10} y={38} w={12} h={12} r={3} c="p" className={s.spring} />
      <Callout x={50} y={60}>살짝 넘쳤다가 제자리로</Callout>
    </Stage>
  );
}

export function Bounce({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={20} y={70} w={60} h={0.8} r={0} c="c" />
      <B x={44} y={10} w={12} h={12} r={6} c="p" className={s.ball} />
      <Callout x={50} y={74}>공처럼 통통 튀다가 멈춤</Callout>
    </Stage>
  );
}

export function Stagger({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[0, 1, 2, 3, 4].map((i) => <B key={i} x={12 + i * 16} y={36} w={12} h={16} r={3} c={i === 2 ? 'p' : 'c'} className={s.stag} style={{ animationDelay: `${i * 0.18}s` }} />)}
      <Callout x={50} y={58}>하나씩 차례로 나타나요</Callout>
    </Stage>
  );
}

export function Fade({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={36} y={28} w={28} h={28} r={5} c="p" className={s.fade} />
      <Callout x={50} y={60}>서서히 나타났다 사라져요</Callout>
    </Stage>
  );
}

export function Slide({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={10} y={24} w={80} h={36} r={4} c="a" style={{ overflow: 'hidden' }}>
        <B x={26} y={7} w={28} h={22} r={4} c="p" className={s.slide} />
      </B>
      <Callout x={50} y={64}>한쪽에서 미끄러져 들어와요</Callout>
    </Stage>
  );
}

export function ZoomTransition({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      {[0, 1, 2, 3].map((i) => <B key={i} x={5 + (i % 2) * 25} y={6 + Math.floor(i / 2) * 25} w={22.6} h={22} r={3} c="a" />)}
      <B x={5} y={6} w={22.6} h={22} r={3} c="p" className={s.zoom} />
      <Tap x={16} y={17} at={0.18} d={4} size={10} />
      <Callout x={28.8} y={60}>누른 것이 그 자리에서 커져요</Callout>
    </Phone>
  );
}

export function SharedElement({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      {[0, 1, 2].map((i) => (
        <span key={i}>
          <B x={5} y={6 + i * 16} w={14} h={12} r={2} c="a" />
          <B x={23} y={8 + i * 16} w={24} h={3.4} c="g" />
        </span>
      ))}
      <span className={s.sharedBg} />
      <span className={s.shared}><Pic /></span>
      <Callout x={28.8} y={70}>같은 그림이 이어지며 커져요</Callout>
    </Phone>
  );
}

export function Duration({ playing }: P) {
  return (
    <Stage playing={playing}>
      <T x={10} y={18} size={4.2} c="sub">0.3초</T>
      <B x={10} y={33} w={80} h={0.6} r={0} c="g" />
      <B x={10} y={24} w={9} h={9} r={2.4} c="p" className={`${s.run} ${s.fast}`} />
      <T x={10} y={46} size={4.2} c="sub">1초</T>
      <B x={10} y={61} w={80} h={0.6} r={0} c="g" />
      <B x={10} y={52} w={9} h={9} r={2.4} c="c" className={`${s.run} ${s.slow}`} />
      <Timer className={s.timer} />
      <Callout x={50} y={70}>움직임이 이어지는 시간</Callout>
    </Stage>
  );
}

export function Delay({ playing }: P) {
  return (
    <Stage playing={playing}>
      <T x={10} y={18} size={4.2} c="sub">바로</T>
      <B x={10} y={33} w={80} h={0.6} r={0} c="g" />
      <B x={10} y={24} w={9} h={9} r={2.4} c="c" className={`${s.run} ${s.easeOut}`} />
      <T x={10} y={46} size={4.2} c="blue">0.5초 기다렸다가</T>
      <B x={10} y={61} w={80} h={0.6} r={0} c="g" />
      <B x={10} y={52} w={9} h={9} r={2.4} c="p" className={`${s.run} ${s.delayed}`} />
      <Callout x={50} y={70}>출발 전에 기다리는 시간</Callout>
    </Stage>
  );
}

export function Loop({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.orbit}><B x={0} y={0} w={10} h={10} r={2.4} c="p" /></span>
      <Repeat className={s.loopIcon} />
      <Callout x={50} y={74}>계속 되풀이해요</Callout>
    </Stage>
  );
}

export function HoverEffect({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={26} y={18} w={48} h={52} r={5} c="w" className={s.hoverCard}>
        <B x={3} y={3} w={40.8} h={26} r={3} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
        <B x={4} y={34} w={28} h={4} c="k" />
        <B x={4} y={41} w={20} h={3} c="g" />
      </B>
      <Cursor className={s.hoverCursor} />
      <Callout x={50} y={76}>마우스를 올리면 살짝 떠요</Callout>
    </Stage>
  );
}

export function MicroInteraction({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.burst}>{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ transform: `rotate(${i * 45}deg)` }} />)}</span>
      <span className={s.heart}><Heart /></span>
      <Tap x={50} y={42} at={0.3} d={3} size={12} />
      <Callout x={50} y={60}>누르면 하트가 톡 튀어요</Callout>
    </Stage>
  );
}

export function Parallax({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={8} y={14} w={84} h={62} r={4} c="a" style={{ overflow: 'hidden' }}>
        <div className={s.far}>{[0, 1, 2, 3].map((i) => <i key={i} />)}</div>
        <div className={s.near}>{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} />)}</div>
      </B>
      <Callout x={50} y={78}>뒤는 천천히, 앞은 빠르게</Callout>
    </Stage>
  );
}

export function ScrollReveal({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.scroller}>
        {Array.from({ length: 7 }, (_, i) => <B key={i} x={5} y={8 + i * 18} w={47.6} h={14} r={3} c={i % 3 === 1 ? 's' : 'a'} className={s.reveal} style={{ animationDelay: `${i * 0.5}s` }} />)}
      </div>
      <Callout x={28.8} y={74} dir="down">화면에 들어오면 떠올라요</Callout>
    </Phone>
  );
}

export function Shake({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={5} y={22} size={5}>정답</T>
      <B x={5} y={29} w={47.6} h={12} r={3} c="w" className={s.shake}>
        <T x={3} y={3} size={5}>강아지</T>
      </B>
      <T x={5} y={44} size={3.8} c="sub" className={s.shakeMsg}>다시 해 볼까요?</T>
      <Callout x={28.8} y={50}>틀리면 좌우로 도리도리</Callout>
    </Phone>
  );
}

export function Pulse({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.pulseRing} />
      <span className={s.pulseRing} style={{ animationDelay: '0.8s' }} />
      <B x={28} y={34} w={44} h={18} r={9} c="p" className={s.pulseBtn}><T x={22} y={4.6} size={7} c="white" align="center">시작</T></B>
      <Callout x={50} y={64}>숨 쉬듯 커졌다 작아졌다</Callout>
    </Stage>
  );
}
