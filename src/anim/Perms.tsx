import { Bell, Camera, ImagePlus, Lock, MapPin, Mic, Settings, ShieldCheck, Upload, type LucideIcon } from 'lucide-react';
import { B, T, Tap } from './kit';
import { AppBg, Dialog, Dim } from './ScreensKit';
import { Callout, Phone } from './Stage';
import s from './Perms.module.css';

/** 📱 권한 묻는 화면 */
type P = { playing: boolean };
const C = 28.8;

/** 권한 창 → "허용" 누름 → 기능이 켜짐 */
function permission(Icon: LucideIcon, title: string, sub: string, note: string) {
  return function Permission({ playing }: P) {
    return (
      <Phone playing={playing} bare>
        <AppBg />
        <Dim className={s.dim} />
        <Dialog icon={Icon} title={title} sub={sub} className={s.pop} />
        <span className={s.result}><Icon /></span>
        <Tap x={41} y={57} at={0.6} d={4.2} size={9} />
        <Callout x={C} y={24} dir="down">{note}</Callout>
      </Phone>
    );
  };
}

export const NotificationPermission = permission(Bell, '알림을 보내도 될까요?', '숙제 마감 전에 알려 드려요', '알림을 보내도 되는지 물어요');
export const LocationPermission = permission(MapPin, '위치를 써도 될까요?', '가까운 도서관을 찾아요', '내 위치를 써도 되는지 물어요');
export const CameraPermission = permission(Camera, '카메라를 써도 될까요?', 'QR을 찍으려면 필요해요', '카메라를 켜도 되는지 물어요');
export const MicrophonePermission = permission(Mic, '마이크를 써도 될까요?', '따라 읽기를 녹음해요', '마이크를 써도 되는지 물어요');

export function PrePrompt({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={`${s.layer} ${s.preA}`}>
        <span className={s.bigIcon}><Camera /></span>
        <T x={C} y={36} size={5} align="center" weight={700}>사진을 찍어 올려요</T>
        <T x={C} y={44} size={3.6} c="sub" weight={400} align="center">카메라 허락이 있어야 해요</T>
        <B x={9} y={62} w={39.6} h={10} r={5} c="p"><T x={19.8} y={2.4} size={4.4} c="white" align="center">허용할게요</T></B>
      </span>
      <Dim className={s.dim2} />
      <Dialog system title="'그거 뭐더라'에서 카메라를 사용하려고 해요" no="안 함" yes="허용" className={s.pop2} />
      <Tap x={C} y={67} at={0.25} d={4.6} size={9} />
      <Callout x={C} y={10}>공식 창 전에 왜 필요한지 먼저</Callout>
    </Phone>
  );
}

export function SystemDialog({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg />
      <Dim className={s.dim} />
      <Dialog system title="'그거 뭐더라'에서 알림을 보내려고 해요" no="안 함" yes="허용" className={s.pop} />
      <Callout x={C} y={24} dir="down">휴대폰이 직접 띄우는 공식 창</Callout>
    </Phone>
  );
}

export function RePrompt({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg rows={2} />
      <B x={5} y={50} w={47.6} h={22} r={4} c="s" className={s.slideUp}>
        <Camera className={s.reIcon} />
        <T x={13} y={3.6} size={4.2} weight={700}>카메라가 꺼져 있어요</T>
        <T x={13} y={9.4} size={3.4} c="sub" weight={400}>QR을 찍으려면 필요해요</T>
        <B x={3} y={14} w={41.6} h={6.4} r={3.2} c="p"><T x={20.8} y={1.2} size={3.6} c="white" align="center">다시 허락하기</T></B>
      </B>
      <Callout x={C} y={48} dir="down">필요한 순간에 다시 부탁해요</Callout>
    </Phone>
  );
}

export function OpenSettings({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.layer}>
        <span className={s.bigIcon}><Settings /></span>
        <T x={C} y={36} size={4.6} align="center" weight={700}>설정에서 켜 주세요</T>
        <B x={9} y={50} w={39.6} h={10} r={5} c="p"><T x={19.8} y={2.4} size={4.2} c="white" align="center">설정 열기</T></B>
      </span>
      <span className={`${s.layer} ${s.settings}`}>
        <T x={6} y={7} size={5} weight={700}>설정</T>
        {['알림', '카메라', '위치'].map((t, i) => (
          <B key={t} x={5} y={18 + i * 12} w={47.6} h={10} r={3} c="a">
            <T x={3} y={2.6} size={4.2}>{t}</T>
            <span className={`${s.sw} ${i === 1 ? s.swOn : ''}`}><i /></span>
          </B>
        ))}
      </span>
      <Tap x={C} y={55} at={0.18} d={4.6} size={9} />
      <Callout x={C} y={70}>못 묻게 되면 설정으로 안내</Callout>
    </Phone>
  );
}

export function LimitedAccess({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={6} y={7} size={4.6} weight={700}>고른 사진 3장만</T>
      {Array.from({ length: 9 }, (_, i) => (
        <B key={i} x={5 + (i % 3) * 16} y={16 + Math.floor(i / 3) * 16} w={14.6} h={14.6} r={2} c={[0, 4, 5].includes(i) ? 's' : 'a'}>
          {![0, 4, 5].includes(i) && <Lock className={s.lock} />}
        </B>
      ))}
      <B x={9} y={68} w={39.6} h={9} r={4.5} c="w"><ImagePlus className={s.plus} /><T x={22} y={2} size={4} align="center">더 고르기</T></B>
      <Callout x={C} y={64} dir="down">허락한 것만 보여요</Callout>
    </Phone>
  );
}

export function DeniedScreen({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.bigIcon} style={{ background: 'var(--gray-1)', color: 'var(--gray-4)' }}><Camera /></span>
      <T x={C} y={36} size={4.6} align="center" weight={700}>카메라 없이도 할 수 있어요</T>
      <B x={6} y={46} w={45.6} h={10} r={5} c="p" className={s.glow}><Upload className={s.up} /><T x={25} y={2.4} size={4} c="white" align="center">사진 올리기로 대신</T></B>
      <B x={6} y={60} w={45.6} h={10} r={5} c="w"><ShieldCheck className={s.up} style={{ color: 'var(--gray-4)' }} /><T x={25} y={2.6} size={3.8} align="center">설정에서 다시 켜기</T></B>
      <Callout x={C} y={71}>거절해도 다른 방법을 알려요</Callout>
    </Phone>
  );
}
