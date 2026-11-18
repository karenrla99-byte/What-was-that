import { Heart, MousePointer2, RefreshCw } from 'lucide-react';
import { B, Cursor, Finger, Pic, T, Tap, win } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Gestures.module.css';

/** ✋ 손동작 (Finger 템플릿): 손가락 동그라미가 누르고 밀면 화면이 반응 */
type P = { playing: boolean };
const C = 28.8;

export function Tap1({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={9} y={26} w={39.6} h={40} r={4} c="a" className={s.flip}>
        <span className={s.front}><Pic /></span>
        <T x={19.8} y={15} size={8} align="center" c="white" weight={700} className={s.back}>강아지</T>
      </B>
      <Tap x={C} y={46} at={0.25} d={3.6} size={12} />
      <Callout x={C} y={70}>톡 한 번 누르기</Callout>
    </Phone>
  );
}

export function LongPress({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((i) => <B key={i} x={5} y={24 + i * 16} w={47.6} h={12} r={3} c="a" className={i === 1 ? s.held : undefined} />)}
      <svg className={s.ring} viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" pathLength="100" /></svg>
      <Finger className={s.hold} />
      <span className={s.menu}>{['복사', '삭제'].map((t) => <b key={t}>{t}</b>)}</span>
      <Callout x={C} y={76}>떼지 않고 꾹 누르고 있기</Callout>
    </Phone>
  );
}

export function Swipe({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.cards}>
        {['사과', '바나나', '포도'].map((t, i) => (
          <B key={t} x={9 + i * 57.6} y={0} w={39.6} h={40} r={4} c={i === 1 ? 's' : 'a'}>
            <T x={19.8} y={16} size={7} align="center" weight={700} c={i === 1 ? 'blue' : 'ink'}>{t}</T>
          </B>
        ))}
      </div>
      <Finger className={s.swipeFinger} />
      <Callout x={C} y={70}>쓱 밀어서 넘기기</Callout>
    </Phone>
  );
}

export function SwipeToDelete({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((i) => (
        <span key={i}>
          {i === 1 && <B x={33.6} y={40} w={19} h={12} r={3} c="d"><T x={9.5} y={3.4} size={4.2} c="white" align="center">삭제</T></B>}
          <B x={5} y={24 + i * 16} w={47.6} h={12} r={3} c={i === 1 ? 'g' : 'a'} className={i === 1 ? s.rowSlide : undefined}>
            <B x={3} y={4} w={22} h={4} c="c" />
          </B>
        </span>
      ))}
      <Finger className={s.rowFinger} />
      <Callout x={C} y={74}>옆으로 밀면 삭제 버튼</Callout>
    </Phone>
  );
}

export function Drag({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((i) => <B key={i} x={5} y={24 + i * 16} w={47.6} h={12} r={3} c="a" className={[s.d0, s.d1, s.d2][i]} />)}
      <B x={5} y={24} w={47.6} h={12} r={3} c="p" className={s.dragged}><T x={4} y={3.4} size={4.4} c="white">끌어서 옮기기</T></B>
      <Finger className={s.dragFinger} />
      <Callout x={C} y={74}>꾹 누른 채 끌어서 옮기기</Callout>
    </Phone>
  );
}

export function Pinch({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={4} y={14} w={49.6} h={50} r={3} c="n" style={{ overflow: 'hidden' }}><span className={s.zoomPic}><Pic /></span></B>
      <Finger className={s.pinchA} />
      <Finger className={s.pinchB} />
      <Callout x={C} y={68}>두 손가락을 벌리면 커져요</Callout>
    </Phone>
  );
}

export function DoubleTap({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={4} y={14} w={49.6} h={50} r={3} c="n" style={{ overflow: 'hidden' }}><span className={s.dtPic}><Pic /></span></B>
      <span className={s.dtHeart}><Heart /></span>
      <Tap x={C} y={39} at={0.2} d={4} size={12} />
      <Tap x={C} y={39} at={0.28} d={4} size={12} />
      <Callout x={C} y={68}>톡톡 빠르게 두 번</Callout>
    </Phone>
  );
}

export function PullToRefresh({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.ptrSpin}><RefreshCw /></span>
      <div className={s.ptrList}>
        <B x={5} y={6} w={47.6} h={11} r={3} c="s" className={s.newRow} />
        {[0, 1, 2, 3].map((i) => <B key={i} x={5} y={20 + i * 14} w={47.6} h={11} r={3} c="a" />)}
      </div>
      <Finger className={s.ptrFinger} />
      <Callout x={C} y={76}>아래로 당겼다 놓으면 새로고침</Callout>
    </Phone>
  );
}

export function EdgeSwipe({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.screenPrev}>
        <B x={5} y={6} w={24} h={5} c="k" />
        {[0, 1, 2].map((i) => <B key={i} x={5} y={18 + i * 15} w={47.6} h={11} r={3} c="a" />)}
      </span>
      <span className={s.screenCur}>
        <B x={5} y={6} w={20} h={5} c="p" />
        <B x={5} y={18} w={47.6} h={30} r={3} c="s" />
      </span>
      <span className={s.edge} />
      <Finger className={s.edgeFinger} />
      <Callout x={C} y={74}>가장자리에서 밀면 뒤로 가기</Callout>
    </Phone>
  );
}

export function DragAndDrop({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={56} y={46} w={34} h={30} r={4} c="n" className={s.dropZone}><T x={17} y={22} size={4.4} c="sub" align="center">여기에 놓기</T></B>
      <B x={12} y={18} w={22} h={22} r={3} c="n" className={s.dndItem} style={{ overflow: 'hidden' }}><Pic /></B>
      <Finger className={s.dndFinger} />
      <Callout x={50} y={86} dir="down">끌어서 다른 칸에 놓기</Callout>
    </Stage>
  );
}

export function RightClick({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={14} y={16} w={50} h={34} r={4} c="a" />
      <Cursor className={s.rcCursor} />
      <span className={s.rcMenu}>{['복사', '이름 바꾸기', '삭제'].map((t) => <b key={t}>{t}</b>)}</span>
      <span className={s.mouse}><MousePointer2 /><i className={s.mouseR} /></span>
      <Callout x={34} y={70}>오른쪽 버튼 = 숨은 메뉴</Callout>
    </Stage>
  );
}

export function KeyboardShortcut({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={14} y={14} w={72} h={18} r={3} c="w">
        <T x={4} y={5} size={5.4}>오늘은 </T>
        <T x={22} y={5} size={5.4} c="blue" weight={700} style={win(1, 2, 3.6)}>즐거운</T>
        <T x={22} y={5} size={5.4} c="light" style={win(0, 2, 3.6)}>|</T>
        <T x={41} y={5} size={5.4}> 날</T>
      </B>
      <B x={22} y={46} w={24} h={18} r={3} c="w" className={s.key}><T x={12} y={4.6} size={6} align="center">Ctrl</T></B>
      <T x={50} y={50} size={8} c="sub" align="center">+</T>
      <B x={56} y={46} w={18} h={18} r={3} c="w" className={s.key}><T x={9} y={4.2} size={7} align="center">Z</T></B>
      <Callout x={50} y={68}>키를 같이 눌러 바로 하기 (되돌리기)</Callout>
    </Stage>
  );
}
