import { ArrowLeft, Camera, Cat, Check, CircleHelp, Cloud, Dog, Hand, Mail, Pencil, Rabbit, Sparkles, User } from 'lucide-react';
import { B, T, Tap, win } from './kit';
import { Dialog, Dim, AppBg } from './ScreensKit';
import { Callout, Phone } from './Stage';
import s from './Screens.module.css';

/** 📱 첫 화면과 시작 단계 · 단계별 진행 */
type P = { playing: boolean };
const C = 28.8;

export function Splash({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg />
      <span className={s.splash}>
        <span className={s.logo}><CircleHelp /></span>
        <T x={C} y={52} size={5.4} c="white" align="center" weight={700}>그거 뭐더라?</T>
      </span>
      <Callout x={C} y={76}>앱을 열 때 잠깐 보이는 첫 화면</Callout>
    </Phone>
  );
}

export function Onboarding({ playing }: P) {
  const icons = [Sparkles, Pencil, Check];
  return (
    <Phone playing={playing} bare>
      <div className={s.track}>
        {icons.map((Icon, i) => (
          <span key={i} className={s.page}>
            <span className={s.obIcon}><Icon /></span>
            <B x={12} y={44} w={33.6} h={5} c="k" />
            <B x={9} y={53} w={39.6} h={3.4} c="g" />
            <B x={14} y={59} w={29.6} h={3.4} c="g" />
          </span>
        ))}
      </div>
      <div className={s.dots}>{[0, 1, 2].map((i) => <span key={i}><i style={win(i, 3, 4.5)} /></span>)}</div>
      <B x={11} y={74} w={35.6} h={9} r={4.5} c="p"><T x={17.8} y={2} size={4.2} c="white" align="center">다음</T></B>
      <Tap x={C} y={78.5} at={0.28} d={4.5} size={9} />
      <Callout x={C} y={20}>사용법을 몇 장으로 소개해요</Callout>
    </Phone>
  );
}

export function PermissionRequest({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg />
      <Dim className={s.dimIn} />
      <Dialog icon={Camera} title="카메라를 써도 될까요?" sub="사진을 찍어 올리려면 필요해요" className={s.popIn} />
      <Tap x={41} y={56} at={0.62} d={4.2} size={9} />
      <Callout x={C} y={24} dir="down">기능을 쓰기 전에 허락을 물어요</Callout>
    </Phone>
  );
}

export function CoachMark({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <AppBg />
      <B right={4} bottom={5} w={14} h={14} r={7} c="p" />
      <span className={s.spot} />
      <span className={s.tip}>여기를 눌러 새 활동을 만들어요</span>
      <Callout x={45} y={70} dir="down">한 곳만 밝게 비추며 안내</Callout>
    </Phone>
  );
}

export function SocialLogin({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.logoSmall}><CircleHelp /></span>
      <T x={C} y={30} size={5.2} align="center" weight={700}>시작하기</T>
      {[['G', '구글로 계속하기'], ['K', '카카오로 계속하기']].map(([m, t], i) => (
        <B key={t} x={6} y={42 + i * 12} w={45.6} h={10} r={5} c="w" className={i === 0 ? s.pick : undefined}>
          <T x={5} y={2.4} size={4.4} weight={700} c="blue">{m}</T>
          <T x={24} y={2.6} size={4} align="center">{t}</T>
        </B>
      ))}
      <B x={6} y={66} w={45.6} h={10} r={5} c="a"><Mail className={s.mail} /><T x={24} y={2.6} size={4} align="center">이메일로 계속하기</T></B>
      <Tap x={C} y={47} at={0.3} d={4} size={9} />
      <Callout x={C} y={53}>버튼 한 번으로 가입·로그인</Callout>
    </Phone>
  );
}

export function TermsConsent({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={6} y={8} size={5.2} weight={700}>약관에 동의해 주세요</T>
      <B x={5} y={18} w={47.6} h={11} r={3} c="a">
        <span className={`${s.box} ${s.boxAll}`}><Check strokeWidth={3.5} /></span>
        <T x={14} y={3} size={4.4} weight={700}>모두 동의해요</T>
      </B>
      {['이용 약관 (필수)', '개인정보 (필수)', '알림 받기 (선택)'].map((t, i) => (
        <span key={t}>
          <span className={`${s.box} ${s.boxOne}`} style={{ left: '7.6em', top: `${34 + i * 9}em`, animationDelay: `${i * 0.08}s` }}><Check strokeWidth={3.5} /></span>
          <T x={16} y={34.6 + i * 9} size={3.8} c="sub" weight={400}>{t}</T>
        </span>
      ))}
      <B x={5} y={70} w={47.6} h={10} r={5} c="g" className={s.nextBtn}><T x={23.8} y={2.4} size={4.4} c="white" align="center">다음</T></B>
      <Tap x={10} y={23.5} at={0.28} d={4} size={9} />
      <Callout x={C} y={30}>읽고 동의에 체크해요</Callout>
    </Phone>
  );
}

export function ProfileSetup({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.avatar}><User /><span className={s.cam}><Camera /></span></span>
      <T x={6} y={38} size={3.8} c="sub">이름</T>
      <B x={6} y={43} w={45.6} h={10} r={3} c="w"><T x={3} y={2.6} size={4.4} className={s.typeName}>김은티</T></B>
      <T x={6} y={57} size={3.8} c="sub">좋아하는 동물</T>
      {[Dog, Cat, Rabbit].map((Icon, i) => (
        <B key={i} x={6 + i * 15.6} y={62} w={13.6} h={11} r={3} c="a" className={i === 1 ? s.animalOn : undefined}><Icon className={s.animal} /></B>
      ))}
      <Callout x={C} y={30}>이름·사진 같은 내 정보 넣기</Callout>
    </Phone>
  );
}

export function WelcomeScreen({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.wave}><Hand /></span>
      <T x={C} y={40} size={6.4} align="center" weight={700} className={s.rise}>반가워요, 은티님!</T>
      <T x={C} y={49} size={3.8} c="sub" weight={400} align="center" className={s.rise}>오늘 첫 활동을 시작해 볼까요?</T>
      <B x={9} y={66} w={39.6} h={11} r={5.5} c="p" className={s.pulse}><T x={19.8} y={2.8} size={4.6} c="white" align="center">시작하기</T></B>
      <Callout x={C} y={78}>반갑게 맞이하고 시작 버튼</Callout>
    </Phone>
  );
}

export function Wizard({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.steps}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={s.step}>
            <b>{i + 1}</b>
            <i style={win(i, 3, 4.5)} />
          </span>
        ))}
      </div>
      <div className={s.track} style={{ top: '18em', height: '50em' }}>
        {['이름이 뭐예요?', '몇 학년이에요?', '좋아하는 과목은?'].map((q) => (
          <span key={q} className={s.page} style={{ height: '50em' }}>
            <T x={6} y={6} size={5} weight={700}>{q}</T>
            <B x={6} y={16} w={45.6} h={10} r={3} c="w" />
          </span>
        ))}
      </div>
      <B x={11} y={72} w={35.6} h={9} r={4.5} c="p"><T x={17.8} y={2} size={4.2} c="white" align="center">다음</T></B>
      <Callout x={C} y={64} dir="down">긴 입력을 한 화면에 하나씩</Callout>
    </Phone>
  );
}

export function ReviewStep({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={6} y={7} size={5.2} weight={700}>확인해 주세요</T>
      {[['이름', '김은티'], ['학년', '3학년'], ['과목', '국어']].map(([k, v], i) => (
        <B key={k} x={5} y={17 + i * 12} w={47.6} h={10} r={3} c="a" className={i === 1 ? s.fixRow : undefined}>
          <T x={3} y={2.6} size={3.8} c="sub" weight={400}>{k}</T>
          <T x={14} y={2.4} size={4.4}>{v}</T>
          <T x={44} y={2.6} size={3.6} c="blue" align="right">수정</T>
        </B>
      ))}
      <B x={5} y={66} w={47.6} h={10} r={5} c="p"><T x={23.8} y={2.4} size={4.4} c="white" align="center">제출하기</T></B>
      <Tap x={47} y={34} at={0.3} d={4} size={8} />
      <Callout x={C} y={55}>내기 전에 한눈에 보고 고쳐요</Callout>
    </Phone>
  );
}

export function DraftAutosave({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={6} y={7} size={5} weight={700}>오늘의 일기</T>
      <span className={s.saved}><Cloud /> 저장됨</span>
      {[0, 1, 2, 3].map((i) => <B key={i} x={6} y={18 + i * 8} w={[42, 38, 44, 22][i]} h={3.4} c="c" className={s.writeLine} style={{ animationDelay: `${i * 0.8}s` }} />)}
      <Callout x={45} y={13}>쓰는 동안 저절로 저장</Callout>
    </Phone>
  );
}

export function UnsavedWarning({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <ArrowLeft className={s.back} />
      <T x={16} y={6.4} size={4.6} weight={700}>글쓰기</T>
      {[0, 1, 2].map((i) => <B key={i} x={6} y={20 + i * 8} w={[42, 38, 30][i]} h={3.4} c="c" />)}
      <Dim className={s.dimIn} />
      <Dialog title="쓴 내용이 사라져요" sub="저장하지 않고 나갈까요?" no="나가기" yes="계속 쓰기" className={s.popIn} />
      <Tap x={8} y={9} at={0.18} d={4.2} size={9} />
      <Callout x={C} y={24} dir="down">저장 안 하고 나가면 한 번 물어요</Callout>
    </Phone>
  );
}

