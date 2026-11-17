import { AlignCenter, AlignLeft, AlignRight, Ban, Check, Plus, Star, X } from 'lucide-react';
import { B, Cursor, T, Tap, win } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Buttons.module.css';

/** 🧩 버튼. 가운데 큰 버튼 하나로 상태를 보여 줌 (100em 칸) */
type P = { playing: boolean };

function Btn({ label = '저장', className = '', c = 'p' as 'p' | 'g' | 'w' | 'n', ink = 'white' as 'white' | 'ink' | 'light' | 'blue', children }: {
  label?: string; className?: string; c?: 'p' | 'g' | 'w' | 'n'; ink?: 'white' | 'ink' | 'light' | 'blue'; children?: React.ReactNode;
}) {
  return (
    <B x={24} y={38} w={52} h={18} r={9} c={c} className={`${s.btn} ${className}`}>
      <T x={26} y={4.6} size={7} c={ink} align="center" className={s.label}>{label}</T>
      {children}
    </B>
  );
}

export function Default({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Btn />
      <Callout x={50} y={60}>아무것도 안 한 평소 모습</Callout>
    </Stage>
  );
}

export function Hover({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Btn className={s.hoverBtn} />
      <Cursor className={s.hoverCursor} />
      <Callout x={50} y={60}>마우스를 올리면 진해져요</Callout>
    </Stage>
  );
}

export function Pressed({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Btn className={s.pressBtn} />
      <Tap x={56} y={47} at={0.45} d={3} size={12} />
      <Callout x={50} y={60}>꾹 누르는 동안</Callout>
    </Stage>
  );
}

export function Focus({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={10} y={12} w={18} h={11} r={2.4} c="w" className={s.key}><T x={9} y={2.4} size={4.6} align="center">Tab</T></B>
      <Btn className={s.focusBtn} />
      <Callout x={50} y={62}>키보드로 고르면 테두리가 생겨요</Callout>
    </Stage>
  );
}

export function Disabled({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Btn c="g" ink="light" />
      <Cursor className={s.hoverCursor} />
      <span className={s.ban}><Ban /></span>
      <Callout x={50} y={60}>흐려서 누를 수 없어요</Callout>
    </Stage>
  );
}

export function Loading({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Btn className={s.loadBtn}>
        <span className={s.spin} />
      </Btn>
      <Tap x={50} y={47} at={0.12} d={3.6} size={12} />
      <Callout x={50} y={60}>누른 뒤 기다리는 동안 빙글빙글</Callout>
    </Stage>
  );
}

export function Success({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Btn className={s.loadBtn}>
        <span className={s.spinShort} />
        <span className={s.result}><Check strokeWidth={3} /> 완료</span>
      </Btn>
      <Tap x={50} y={47} at={0.12} d={3.6} size={12} />
      <Callout x={50} y={60}>잘 끝나면 체크로 바뀌어요</Callout>
    </Stage>
  );
}

export function ErrorBtn({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Btn className={`${s.loadBtn} ${s.errBtn}`}>
        <span className={s.spinShort} />
        <span className={s.result}>! 다시 시도</span>
      </Btn>
      <Tap x={50} y={47} at={0.12} d={3.6} size={12} />
      <Callout x={50} y={60}>실패하면 색이 바뀌고 흔들려요</Callout>
    </Stage>
  );
}

export function Selected({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[0, 1, 2].map((i) => (
        <B key={i} x={8 + i * 29} y={38} w={26} h={16} r={8} c="w" className={i === 1 ? s.selOn : undefined}>
          <T x={13} y={4} size={5.4} align="center" className={i === 1 ? s.selInk : undefined}>{['쉬움', '보통', '어려움'][i]}</T>
        </B>
      ))}
      <Tap x={50} y={46} at={0.25} d={4} size={11} />
      <Callout x={50} y={58}>고른 버튼이 계속 칠해져 있어요</Callout>
    </Stage>
  );
}

function Pair({ hit }: { hit: 'primary' | 'secondary' }) {
  return (
    <>
      <B x={20} y={34} w={60} h={16} r={8} c="p" className={hit === 'primary' ? s.glow : undefined}>
        <T x={30} y={4} size={6} c="white" align="center">제출하기</T>
      </B>
      <B x={20} y={56} w={60} h={16} r={8} c="w" className={hit === 'secondary' ? s.glowSoft : undefined}>
        <T x={30} y={3.4} size={6} align="center">취소</T>
      </B>
    </>
  );
}

export function PrimaryButton({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Pair hit="primary" />
      <Callout x={50} y={32} dir="down">가장 중요한 버튼은 진하게</Callout>
    </Stage>
  );
}

export function SecondaryButton({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Pair hit="secondary" />
      <Callout x={50} y={74}>덜 중요한 버튼은 테두리만</Callout>
    </Stage>
  );
}

export function GhostButton({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Btn c="n" ink="blue" label="건너뛰기" className={s.ghostBtn} />
      <Cursor className={s.hoverCursor} />
      <Callout x={50} y={60}>글자만 있다가 올리면 살짝 칠해져요</Callout>
    </Stage>
  );
}

export function IconButton({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={38} y={32} w={24} h={24} r={12} c="a" className={s.iconBtn}><X /></B>
      <Tap x={50} y={44} at={0.4} d={3} size={12} />
      <Callout x={50} y={60}>글자 없이 아이콘만</Callout>
    </Stage>
  );
}

export function Fab({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.feed}>
        {Array.from({ length: 10 }, (_, i) => <B key={i} x={5} y={4 + i * 15} w={47.6} h={11} r={3} c="a" />)}
      </div>
      <B right={4} bottom={5} w={14} h={14} r={7} c="p" className={s.fab}><Plus color="#fff" strokeWidth={3} /></B>
      <Callout x={46.6} y={66} dir="down">스크롤해도 그 자리에 떠 있어요</Callout>
    </Phone>
  );
}

export function Cta({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={14} y={16} w={72} h={8} r={4} c="k" />
      <B x={22} y={29} w={56} h={4} r={2} c="g" />
      <B x={22} y={48} w={56} h={18} r={9} c="p" className={s.cta}>
        <T x={28} y={4.6} size={7} c="white" align="center">시작하기</T>
      </B>
      <Callout x={50} y={70}>꼭 눌러 주길 바라는 버튼</Callout>
    </Stage>
  );
}

export function ToggleButton({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={38} y={30} w={24} h={24} r={12} c="w" style={win(0, 2, 3.6)} className={s.iconBtn}><Star /></B>
      <B x={38} y={30} w={24} h={24} r={12} c="p" style={win(1, 2, 3.6)} className={s.iconBtn}><Star fill="#fff" color="#fff" /></B>
      <Tap x={50} y={42} at={0.47} d={3.6} size={12} />
      <Tap x={50} y={42} at={0.97} d={3.6} size={12} />
      <Callout x={50} y={58}>누를 때마다 켜짐 ↔ 꺼짐</Callout>
    </Stage>
  );
}

export function ButtonGroup({ playing }: P) {
  const icons = [AlignLeft, AlignCenter, AlignRight];
  return (
    <Stage playing={playing}>
      <B x={17} y={36} w={66} h={18} r={9} c="w" style={{ overflow: 'hidden', display: 'flex' }}>
        {icons.map((Icon, i) => (
          <span key={i} className={s.groupCell}>
            <span className={s.groupOn} style={win(i, 3, 4.2)} />
            <Icon />
          </span>
        ))}
      </B>
      <Callout x={50} y={56}>붙어 있는 버튼 한 묶음</Callout>
    </Stage>
  );
}

export function DefaultVsResting({ playing }: P) {
  return (
    <Stage playing={playing}>
      <T x={26} y={10} size={6} align="center">디폴트</T>
      <T x={74} y={10} size={6} align="center">레스팅</T>
      <B x={49.6} y={10} w={0.8} h={78} r={0.4} c="g" />
      {[0, 1, 2].map((i) => (
        <span key={i}>
          <B x={8} y={24 + i * 14} w={9} h={9} r={5} c="w">
            {i === 1 && <span className={s.dot} />}
          </B>
          <B x={20} y={26.5 + i * 14} w={[16, 22, 14][i]} h={4} c={i === 1 ? 'k' : 'g'} />
        </span>
      ))}
      <B x={58} y={38} w={32} h={14} r={7} c="p"><T x={16} y={3.4} size={5.4} c="white" align="center">저장</T></B>
      <T x={26} y={70} size={4.2} c="sub" weight={400} align="center">처음부터 골라진 값</T>
      <T x={74} y={70} size={4.2} c="sub" weight={400} align="center">아무도 안 건드린 모습</T>
    </Stage>
  );
}
