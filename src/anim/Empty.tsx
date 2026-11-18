import { CheckCheck, FunnelX, Inbox, Lock, ServerCrash, ShieldAlert, Trash2, WifiOff } from 'lucide-react';
import { B, T } from './kit';
import { Empty } from './ScreensKit';
import { Callout, Phone } from './Stage';
import s from './Empty.module.css';

/** 📱 빈 화면 */
type P = { playing: boolean };
const C = 28.8;

export const FirstUse = ({ playing }: P) => (
  <Phone playing={playing} bare>
    <Empty icon={Inbox} title="아직 활동이 없어요" sub="첫 활동을 만들어 볼까요?" button="첫 활동 만들기" />
    <Callout x={C} y={70}>처음엔 첫 행동을 안내해요</Callout>
  </Phone>
);

export const NoFilterResults = ({ playing }: P) => (
  <Phone playing={playing} bare>
    {['3학년', '수학', '영상'].map((t, i) => (
      <B key={t} x={5 + i * 15} y={4} w={13} h={7} r={3.5} c="s"><T x={6.5} y={1.4} size={3.4} c="blue" align="center">{t}</T></B>
    ))}
    <Empty icon={FunnelX} title="조건에 맞는 게 없어요" sub="필터를 줄여 보세요" button="필터 지우기" />
    <Callout x={C} y={70}>필터를 바꾸라고 알려요</Callout>
  </Phone>
);

export const Offline = ({ playing }: P) => (
  <Phone playing={playing} bare>
    <Empty icon={WifiOff} title="인터넷이 끊겼어요" sub="연결을 확인해 주세요" button="다시 시도" />
    <Callout x={C} y={70}>연결이 끊긴 걸 알려요</Callout>
  </Phone>
);

export const PermissionRequired = ({ playing }: P) => (
  <Phone playing={playing} bare>
    <Empty icon={ShieldAlert} title="카메라 허락이 필요해요" sub="QR을 찍으려면 켜 주세요" button="허락하기" />
    <Callout x={C} y={70}>허락받는 방법을 알려요</Callout>
  </Phone>
);

export const AllDone = ({ playing }: P) => (
  <Phone playing={playing} bare>
    <span className={s.list}>
      {[0, 1, 2].map((i) => <B key={i} x={5} y={14 + i * 13} w={47.6} h={10} r={3} c="a" className={s.done} style={{ animationDelay: `${i * 0.35}s` }} />)}
    </span>
    <span className={s.after}>
      <Empty icon={CheckCheck} title="오늘 할 일 끝!" sub="정말 잘했어요" />
    </span>
    <Callout x={C} y={60}>다 끝내면 칭찬을 보여 줘요</Callout>
  </Phone>
);

export const PostDeletion = ({ playing }: P) => (
  <Phone playing={playing} bare>
    <B x={5} y={20} w={47.6} h={11} r={3} c="a" className={s.swipeAway} />
    <span className={s.after}>
      <Empty icon={Trash2} title="모두 지웠어요" sub="실수였다면 되돌릴 수 있어요" button="되돌리기" />
    </span>
    <Callout x={C} y={70}>지운 뒤 할 수 있는 일을 알려요</Callout>
  </Phone>
);

export const ErrorScreen = ({ playing }: P) => (
  <Phone playing={playing} bare>
    <Empty icon={ServerCrash} title="불러오지 못했어요" sub="잠시 뒤에 다시 해 주세요" button="다시 시도" />
    <Callout x={C} y={70}>이유와 다시 시도 버튼</Callout>
  </Phone>
);

export const Locked = ({ playing }: P) => (
  <Phone playing={playing} bare>
    <Empty icon={Lock} title="아직 잠겨 있어요" sub="2단계를 끝내면 열려요">
      <B x={11} y={58} w={35.6} h={4} r={2} c="g"><span className={s.prog} /></B>
      <T x={C} y={64} size={3.6} c="sub" align="center" weight={400}>2단계 중 1단계 완료</T>
    </Empty>
    <Callout x={C} y={70}>여는 방법을 보여 줘요</Callout>
  </Phone>
);

export const NotFound = ({ playing }: P) => (
  <Phone playing={playing} bare>
    <T x={C} y={14} size={18} align="center" weight={800} c="blue" className={s.wobble}>404</T>
    <T x={C} y={42} size={5.2} align="center" weight={700}>길을 잃었어요</T>
    <T x={C} y={49.5} size={3.8} c="sub" weight={400} align="center">없는 주소예요</T>
    <B x={11} y={58} w={35.6} h={10} r={5} c="p"><T x={17.8} y={2.4} size={4.4} c="white" align="center">홈으로</T></B>
    <Callout x={C} y={70}>없는 주소로 왔을 때</Callout>
  </Phone>
);
