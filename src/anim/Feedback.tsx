import { Bell, CircleAlert, CircleHelp, Settings, Trash2, Undo2, X } from 'lucide-react';
import { B, Cursor, T, Tap } from './kit';
import { AppBg, Dialog, Dim } from './ScreensKit';
import { Callout, Phone } from './Stage';
import s from './Feedback.module.css';

/** 📱 알림·피드백 */
type P = { playing: boolean };
const C = 28.8;

export function Toast({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={5} y={26} w={47.6} h={22} r={3} c="a" />
      <B x={5} y={52} w={47.6} h={9} r={4.5} c="p"><T x={23.8} y={2} size={4.2} c="white" align="center">저장</T></B>
      <span className={s.toast}>저장됐어요</span>
      <Tap x={C} y={56.5} at={0.15} d={4} size={9} />
      <Callout x={C} y={62}>잠깐 떴다가 저절로 사라져요</Callout>
    </Phone>
  );
}

export function Snackbar({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      {[0, 1, 2].map((i) => <B key={i} x={5} y={8 + i * 14} w={47.6} h={11} r={3} c="a" className={i === 1 ? s.gone : undefined} />)}
      <span className={s.snack}><b>지웠어요</b><b className={s.undoTxt}>되돌리기</b></span>
      <Tap x={45} y={78} at={0.62} d={4.6} size={8} />
      <Callout x={C} y={70} dir="down">알림 + 되돌리기 버튼</Callout>
    </Phone>
  );
}

export function Banner({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.bannerPush}><AppBg /></span>
      <span className={s.banner}><CircleAlert /> 오늘 밤 점검이 있어요<X className={s.x} /></span>
      <Callout x={C} y={14}>위에 띠처럼 계속 붙어 있어요</Callout>
    </Phone>
  );
}

export function Modal({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg />
      <Dim className={s.dim} />
      <Dialog icon={Trash2} title="정말 지울까요?" no="취소" yes="지우기" className={s.pop} />
      <Callout x={C} y={24} dir="down">가운데 창, 대답해야 닫혀요</Callout>
    </Phone>
  );
}

export function InlineError({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={6} y={18} size={4.6}>이메일</T>
      <B x={6} y={25} w={45.6} h={11} r={3} c="w" className={s.errField}><T x={3} y={2.8} size={4.4} className={s.typed}>eunti@</T></B>
      <span className={s.errMsg}><CircleAlert /> 이메일 형식이 아니에요</span>
      <B x={6} y={48} w={45.6} h={11} r={3} c="w" />
      <Callout x={C} y={45}>틀린 칸 바로 아래에 알려요</Callout>
    </Phone>
  );
}

export function Tooltip({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg rows={3} />
      <B x={42} y={4} w={11} h={11} r={5.5} c="a" className={s.iconBtn}><Settings /></B>
      <span className={s.tooltip}>설정</span>
      <Cursor className={s.cursor} />
      <Callout x={C} y={34}>올리면 옆에 뜨는 짧은 설명</Callout>
    </Phone>
  );
}

export function Badge({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg rows={3} />
      <span className={s.bell}><Bell /><span className={s.badge}><b className={s.n} /></span></span>
      <Callout x={47} y={16}>새 소식 개수를 콕</Callout>
    </Phone>
  );
}

export function Popover({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={6} y={10} size={4.6}>글자 크기</T>
      <CircleHelp className={s.help} />
      <span className={s.popover}>
        <b className={s.popTitle}>글자 크기란?</b>
        <span className={s.popText}>화면 글자를 크게 해요</span>
        <span className={s.popBtn}>자세히 보기</span>
      </span>
      <B x={6} y={44} w={45.6} h={11} r={3} c="a" />
      <Tap x={27.5} y={12.6} at={0.15} d={4} size={8} />
      <Callout x={C} y={60}>누르면 옆에 뜨는 작은 창</Callout>
    </Phone>
  );
}

export function ConfirmDialog({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg rows={3} />
      <B x={5} y={64} w={47.6} h={10} r={5} c="w"><T x={23.8} y={2.6} size={4} align="center">전체 삭제</T></B>
      <Dim className={s.dim} />
      <Dialog title="되돌릴 수 없어요" sub="모두 지울까요?" no="취소" yes="지우기" className={s.pop} />
      <Tap x={C} y={69} at={0.08} d={4.2} size={9} />
      <Callout x={C} y={24} dir="down">되돌리기 어려운 일 전에 한 번 더</Callout>
    </Phone>
  );
}

export function Undo({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      {[0, 1, 2].map((i) => <B key={i} x={5} y={8 + i * 14} w={47.6} h={11} r={3} c={i === 1 ? 's' : 'a'} className={i === 1 ? s.undoCard : undefined} />)}
      <B x={14} y={60} w={29.6} h={10} r={5} c="d" className={s.undoBtn}><Undo2 className={s.undoIcon} /><T x={17} y={2.6} size={4} c="white" align="center">실행 취소</T></B>
      <Tap x={C} y={65} at={0.55} d={4.4} size={9} />
      <Callout x={C} y={72}>방금 한 일을 없던 일로</Callout>
    </Phone>
  );
}

export function Overlay({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg />
      <Dim className={s.dim} />
      <span className={s.panel} />
      <Tap x={C} y={12} at={0.62} d={4.2} size={9} />
      <Callout x={C} y={20}>뒤를 어둡게 덮는 반투명 막</Callout>
    </Phone>
  );
}
