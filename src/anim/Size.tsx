import { Check, Cloud, CloudOff, Moon, Plus, Printer, Share, Sun } from 'lucide-react';
import { B, Pic, T, Tap, win } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Size.module.css';

/** 📐 화면 크기 (ResizeFrame 템플릿 등): 화면 틀이 넓어졌다 좁아지며 배치가 바뀜 */
type P = { playing: boolean };

/** 넓을 때 4칸 → 중간 2칸 → 좁을 때 1칸 (틀 너비와 함께 바뀜) */
function Cards({ n, w, k }: { n: number; w: number; k: number }) {
  const gap = 2;
  const cw = (w - 6 - gap * (n - 1)) / n;
  return (
    <span style={win(k, 3, 5)} className={s.layer}>
      <B x={3} y={3} w={w - 6} h={6} r={1.6} c="k" />
      {Array.from({ length: n === 1 ? 2 : n }, (_, i) => (
        <B key={i} x={3 + (n === 1 ? 0 : i * (cw + gap))} y={12 + (n === 1 ? i * 16 : 0)} w={n === 1 ? w - 6 : cw} h={n === 1 ? 14 : 22} r={2} c={i === 0 ? 's' : 'a'} />
      ))}
    </span>
  );
}

export function Responsive({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.frame}>
        <Cards n={4} w={84} k={0} />
        <Cards n={2} w={50} k={1} />
        <Cards n={1} w={28} k={2} />
      </span>
      <Callout x={50} y={80}>화면 크기에 맞춰 배치가 바뀌어요</Callout>
    </Stage>
  );
}

export function Breakpoint({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.frame2}>
        <span style={win(0, 2, 4.4)} className={s.layer}>
          <B x={3} y={3} w={60} h={6} r={1.6} c="k" />
          {[0, 1, 2].map((i) => <B key={i} x={3 + i * 20.6} y={12} w={18.6} h={20} r={2} c={i === 0 ? 's' : 'a'} />)}
        </span>
        <span style={win(1, 2, 4.4)} className={s.layer}>
          <B x={3} y={3} w={26} h={6} r={1.6} c="k" />
          {[0, 1].map((i) => <B key={i} x={3} y={12 + i * 14} w={26} h={12} r={2} c={i === 0 ? 's' : 'a'} />)}
        </span>
      </span>
      <span className={s.bpLine} />
      <span className={s.bpTag}>768px</span>
      <Callout x={50} y={80}>이 너비를 넘으면 배치가 바뀌어요</Callout>
    </Stage>
  );
}

export function Viewport({ playing }: P) {
  return (
    <Stage playing={playing}>
      <div className={s.page}>
        {Array.from({ length: 9 }, (_, i) => <B key={i} x={4} y={4 + i * 13} w={i % 3 === 0 ? 40 : 46} h={10} r={2} c={i === 4 ? 's' : 'a'} />)}
      </div>
      <span className={s.window} />
      <Callout x={50} y={84} dir="down">지금 실제로 보이는 만큼</Callout>
    </Stage>
  );
}

export function Px({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={14} y={36} w={22} h={12} r={6} c="p" />
      <span className={s.lens}>
        {Array.from({ length: 64 }, (_, i) => <i key={i} className={[9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30].includes(i) ? s.on : undefined} />)}
      </span>
      <span className={s.measure}><b>48px</b></span>
      <Callout x={50} y={84} dir="down">화면을 이루는 작은 점 하나</Callout>
    </Stage>
  );
}

export function MobileFirst({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.frameGrow}>
        <Cards n={1} w={28} k={0} />
        <Cards n={2} w={50} k={1} />
        <Cards n={4} w={84} k={2} />
      </span>
      <Callout x={50} y={80}>휴대폰부터 만들고 넓혀 가요</Callout>
    </Stage>
  );
}

export function Orientation({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.rotor}>
        <span className={s.portrait} style={win(0, 2, 4.4)}>{[0, 1, 2].map((i) => <B key={i} x={4} y={6 + i * 16} w={28} h={12} r={2} c={i === 0 ? 's' : 'a'} />)}</span>
        <span className={s.landscape} style={win(1, 2, 4.4)}>{[0, 1].map((i) => <B key={i} x={6 + i * 28} y={4} w={24} h={26} r={2} c={i === 0 ? 's' : 'a'} />)}</span>
      </span>
      <Callout x={50} y={88} dir="down">눕히면 두 칸, 세우면 한 칸</Callout>
    </Stage>
  );
}

export function Fixed({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.scroll}>{Array.from({ length: 10 }, (_, i) => <B key={i} x={5} y={20 + i * 14} w={47.6} h={10} r={3} c="a" />)}</div>
      <B x={0} y={73} w={57.6} h={14.6} r={0} c="p" className={s.fixedBar}><T x={28.8} y={3.6} size={4.6} c="white" align="center">제출하기</T></B>
      <Callout x={28.8} y={72} dir="down">스크롤해도 늘 같은 자리</Callout>
    </Phone>
  );
}

export function Sticky({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.scroll2}>
        {[0, 1, 2].map((i) => <B key={i} x={5} y={4 + i * 13} w={47.6} h={10} r={3} c="a" />)}
        {Array.from({ length: 8 }, (_, i) => <B key={i} x={5} y={56 + i * 13} w={47.6} h={10} r={3} c="a" />)}
      </div>
      <B x={0} y={42} w={57.6} h={10} r={0} c="s" className={s.stickyBar}><T x={5} y={2.4} size={4.4} c="blue">3월 일정</T></B>
      <Callout x={28.8} y={66}>끝에 닿으면 그 자리에 붙어요</Callout>
    </Phone>
  );
}

export function ZIndex({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={18} y={18} w={36} h={30} r={4} c="c" style={{ zIndex: 1 }} />
      <B x={34} y={30} w={36} h={30} r={4} c="g" style={{ zIndex: 2 }} />
      <B x={26} y={24} w={36} h={30} r={4} c="p" className={s.zUp} />
      <Callout x={50} y={72}>겹칠 때 무엇이 위로 올지</Callout>
    </Stage>
  );
}

export function Overflow({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={22} y={14} w={56} h={44} r={4} c="n" style={{ border: '0.7em solid var(--gray-3)' }} />
      <span className={s.spill}>{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</span>
      <span className={s.clipBox}><span className={s.clipInner}>{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</span><b className={s.bar} /></span>
      <Callout x={50} y={70}>넘치면 자를지, 스크롤할지</Callout>
    </Stage>
  );
}

export function CenterAlign({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={10} y={10} w={80} h={66} r={4} c="w" />
      <span className={s.cross} />
      <B x={14} y={14} w={24} h={14} r={7} c="p" className={s.toCenter} />
      <Callout x={50} y={80}>가로·세로 한가운데로</Callout>
    </Stage>
  );
}

export function Fullscreen({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.browser}>
        <span className={s.chrome}><i /><i /><i /><b /></span>
        <span className={s.video}><Pic /></span>
      </span>
      <Callout x={50} y={88} dir="down">메뉴까지 숨기고 화면 가득</Callout>
    </Stage>
  );
}

export function SafeArea({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.notch} />
      <span className={s.safe} />
      <B x={5} y={10} w={47.6} h={6} r={2} c="k" />
      <B x={5} y={70} w={47.6} h={9} r={4.5} c="p" className={s.safeBtn} />
      <span className={s.homeBar} />
      <Callout x={28.8} y={40}>가리지 않는 안쪽 영역</Callout>
    </Phone>
  );
}

export function CrossBrowser({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={s.mini} style={{ left: `${6 + i * 31}em`, animationDelay: `${i * 0.3}s` }}>
          <span className={`${s.miniTop} ${s[`t${i}`]}`} />
          <B x={2} y={8} w={22} h={4} r={1} c="k" />
          <B x={2} y={15} w={22} h={12} r={1.6} c="s" />
          <span className={s.ok}><Check strokeWidth={3.5} /></span>
        </span>
      ))}
      <Callout x={50} y={72}>어느 브라우저에서나 똑같이</Callout>
    </Stage>
  );
}

export function DeviceMode({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={6} y={12} w={88} h={64} r={3} c="a" />
      <span className={s.devPage}>
        <B x={3} y={3} w={20} h={4} r={1} c="k" />
        <B x={3} y={10} w={20} h={14} r={1.6} c="s" />
        <B x={3} y={27} w={20} h={14} r={1.6} c="g" />
      </span>
      <span className={s.devtools}>{Array.from({ length: 6 }, (_, i) => <i key={i} style={{ width: `${[60, 40, 70, 50, 30, 55][i]}%` }} />)}</span>
      <T x={60} y={14} size={3.8} c="sub">F12 · 기기 모드</T>
      <Callout x={50} y={86} dir="down">컴퓨터에서 휴대폰 크기로 보기</Callout>
    </Stage>
  );
}

export function LargeDisplay({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={6} y={8} w={88} h={56} r={3} c="d" />
      <B x={10} y={12} w={80} h={48} r={2} c="w">
        <T x={40} y={6} size={9} align="center" weight={800}>사과</T>
        {[0, 1, 2].map((i) => <B key={i} x={6 + i * 24} y={26} w={20} h={16} r={4} c={i === 1 ? 'p' : 's'} />)}
      </B>
      <B x={44} y={64} w={12} h={14} r={0} c="c" />
      <Tap x={50} y={50} at={0.4} d={3.6} size={12} />
      <Callout x={50} y={84} dir="down">멀리서도 보이게 크게</Callout>
    </Stage>
  );
}

export function AddToHome({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.homeGrid}>
        {Array.from({ length: 11 }, (_, i) => <i key={i} />)}
        <b className={s.newApp}>?</b>
      </span>
      <span className={s.shareSheet}>
        <span className={s.shareRow}><Share /> 공유</span>
        <span className={`${s.shareRow} ${s.addRow}`}><Plus /> 홈 화면에 추가</span>
      </span>
      <Tap x={28.8} y={74} at={0.25} d={4.4} size={9} />
      <Callout x={28.8} y={45}>앱처럼 아이콘으로 깔아요</Callout>
    </Phone>
  );
}

export function OfflineSupport({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.net} style={win(0, 2, 4)}><Cloud /></span>
      <span className={s.net} style={win(1, 2, 4)}><CloudOff /></span>
      {[0, 1, 2].map((i) => <B key={i} x={5} y={20 + i * 15} w={47.6} h={11} r={3} c={i === 0 ? 's' : 'a'} />)}
      <T x={5} y={68} size={3.8} c="blue" style={win(1, 2, 4)}>저장해 둔 내용을 보여 줘요</T>
      <Callout x={28.8} y={74}>인터넷이 끊겨도 볼 수 있게</Callout>
    </Phone>
  );
}

export function PrintStyle({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.screenV} style={win(0, 2, 4.4)}>
        <B x={3} y={3} w={36} h={6} r={1} c="p" />
        <B x={3} y={13} w={30} h={3} c="g" /><B x={3} y={19} w={34} h={3} c="g" />
        <B x={3} y={28} w={16} h={7} r={3.5} c="p" /><B x={22} y={28} w={16} h={7} r={3.5} c="w" />
      </span>
      <span className={s.paperV} style={win(1, 2, 4.4)}>
        <B x={3} y={4} w={24} h={3} c="k" />
        {[0, 1, 2, 3, 4].map((i) => <B key={i} x={3} y={11 + i * 5} w={[26, 24, 27, 20, 25][i]} h={2} c="g" />)}
      </span>
      <Printer className={s.printIcon} />
      <Callout x={50} y={84} dir="down">인쇄할 땐 버튼 빼고 A4에 맞게</Callout>
    </Stage>
  );
}

export function WakeLock({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.timerRing} />
      <T x={28.8} y={30} size={9} align="center" weight={800}>3:00</T>
      <Sun className={s.sun} />
      <span className={s.noSleep}><Moon /><i /></span>
      <Callout x={28.8} y={62}>활동하는 동안 화면이 안 꺼져요</Callout>
    </Phone>
  );
}

