import { Home, Search, User } from 'lucide-react';
import { B, Tap } from './kit';
import { Callout, Phone } from './Stage';
import s from './Transitions.module.css';

/** 🎬 화면 전환 (MiniPhone): 화면 A → 화면 B */
type P = { playing: boolean };
const C = 28.8;

function ScreenA() {
  return (
    <>
      <B x={5} y={6} w={26} h={6} c="k" />
      {[0, 1, 2, 3].map((i) => <B key={i} x={5} y={18 + i * 16} w={47.6} h={12} r={3} c="a" />)}
    </>
  );
}
function ScreenB() {
  return (
    <>
      <B x={5} y={6} w={20} h={6} c="p" />
      <B x={5} y={18} w={47.6} h={34} r={3} c="s" />
      <B x={5} y={58} w={38} h={4} c="g" />
      <B x={5} y={66} w={30} h={4} c="g" />
    </>
  );
}

export function Push({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={`${s.layer} ${s.pushOut}`}><ScreenA /></span>
      <span className={`${s.layer} ${s.pushIn}`}><ScreenB /></span>
      <Tap x={C} y={24} at={0.18} d={4} size={10} />
      <Callout x={C} y={82} dir="down">새 화면이 옆에서 밀고 들어와요</Callout>
    </Phone>
  );
}

export function ModalEntrance({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.layer}><ScreenA /></span>
      <span className={s.dim} />
      <span className={s.modal}>
        <B x={4} y={4} w={24} h={5} c="k" />
        <B x={4} y={13} w={36} h={3.4} c="g" />
        <B x={4} y={24} w={17} h={8} r={4} c="w" />
        <B x={24} y={24} w={17} h={8} r={4} c="p" />
      </span>
      <Callout x={C} y={74}>지금 화면 위로 창이 올라와요</Callout>
    </Phone>
  );
}

export function FadeThrough({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={`${s.layer} ${s.ftOut}`}><ScreenA /></span>
      <span className={`${s.layer} ${s.ftIn}`}><ScreenB /></span>
      <Callout x={C} y={82} dir="down">사라진 뒤에 새 화면이 나타나요</Callout>
    </Phone>
  );
}

export function CardExpansion({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.layer}><ScreenA /></span>
      <span className={s.expand}><span className={s.expandInner}><ScreenB /></span></span>
      <Tap x={C} y={40} at={0.15} d={4} size={10} />
      <Callout x={C} y={82} dir="down">누른 카드가 커져서 상세 화면으로</Callout>
    </Phone>
  );
}

export function TabTransition({ playing }: P) {
  const icons = [Home, Search, User];
  return (
    <Phone playing={playing} bare>
      <div className={s.tabTrack}>
        <span className={s.tabPage}><ScreenA /></span>
        <span className={s.tabPage}><ScreenB /></span>
        <span className={s.tabPage}><ScreenA /></span>
      </div>
      <B x={0} y={74} w={57.6} h={13.6} r={0} c="w" style={{ borderWidth: '0.6em 0 0' }}>
        {icons.map((Icon, i) => <Icon key={i} className={s.tabIcon} style={{ left: `${5.6 + i * 19.2}em` }} />)}
        <span className={s.tabDot} />
      </B>
      <Callout x={C} y={73} dir="down">탭을 누르면 내용이 옆으로 바뀌어요</Callout>
    </Phone>
  );
}

export function SheetExpansion({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.layer}><ScreenA /></span>
      <span className={s.sheet}>
        <B x={21.8} y={2} w={14} h={1.8} r={1} c="c" />
        {[0, 1, 2, 3, 4].map((i) => <B key={i} x={4} y={8 + i * 11} w={49.6} h={8} r={2.4} c="a" />)}
      </span>
      <span className={s.drag} />
      <Callout x={C} y={30} dir="down">끌어올리면 화면 가득</Callout>
    </Phone>
  );
}
