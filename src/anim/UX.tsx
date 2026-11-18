import { Accessibility, CalendarDays, ChevronDown, Eye, FlaskConical, Hand, QrCode, Trophy, User, Undo2 } from 'lucide-react';
import { B, T } from './kit';
import { BeforeAfter } from './BeforeAfter';
import { Callout, Stage } from './Stage';
import s from './UX.module.css';

/** 🧠 UX 원칙 (BeforeAfter 템플릿). 판 안쪽: 폭 42em × 높이 58em */
type P = { playing: boolean };
const line = (y: number, w: number, c: 'g' | 'c' | 'k' | 'p' | 'd' = 'g', h = 3, x = 4) => <B x={x} y={y} w={w} h={h} c={c} />;

export const VisualHierarchy = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="중요한 것일수록 크고 진하게"
    bad={<>{line(6, 26, 'c', 4)}{line(14, 30, 'c', 4)}{line(22, 24, 'c', 4)}{line(30, 28, 'c', 4)}<B x={4} y={42} w={20} h={8} r={2} c="c" /></>}
    good={<>{line(6, 30, 'd', 7)}{line(17, 26, 'k', 3.4)}{line(23, 30, 'g', 2.6)}{line(28, 22, 'g', 2.6)}<B x={4} y={40} w={34} h={10} r={5} c="p" /></>} />
);

export const WhiteSpace = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="빈 공간이 넉넉하면 덜 복잡해요"
    bad={<>{[0, 1, 2, 3, 4, 5].map((i) => <B key={i} x={1.6 + (i % 2) * 19.4} y={1.6 + Math.floor(i / 2) * 17.6} w={18.4} h={16.6} r={1} c="g" />)}</>}
    good={<>{[0, 1, 2, 3].map((i) => <B key={i} x={5 + (i % 2) * 17} y={6 + Math.floor(i / 2) * 22} w={14} h={16} r={3} c="s" />)}</>} />
);

export const Proximity = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="관련 있는 것끼리 가까이"
    bad={<>{[0, 1].map((i) => <span key={i}>{line(4 + i * 26, 12, 'k')}<B x={4} y={14 + i * 26} w={34} h={7} r={2} c="w" /></span>)}</>}
    good={<>{[0, 1].map((i) => <span key={i}>{line(6 + i * 24, 12, 'k')}<B x={4} y={11 + i * 24} w={34} h={7} r={2} c="w" /></span>)}</>} />
);

export const Alignment = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="가장자리를 한 줄로 맞춰요"
    bad={<>{line(6, 24, 'k', 5, 7)}{line(16, 30, 'g', 3, 3)}{line(22, 22, 'g', 3, 9)}<B x={5} y={32} w={20} h={8} r={4} c="p" /></>}
    good={<><B x={3.6} y={2} w={0.4} h={52} r={0} c="p" className={s.guide} />{line(6, 24, 'k', 5)}{line(16, 30, 'g')}{line(22, 22, 'g')}<B x={4} y={32} w={20} h={8} r={4} c="p" /></>} />
);

export const Consistency = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="같은 기능은 늘 같은 모양"
    bad={<><B x={4} y={8} w={22} h={9} r={4.5} c="p" /><B x={4} y={22} w={30} h={9} r={1} c="k" /><B x={4} y={36} w={16} h={9} r={0} c="c" /></>}
    good={<><B x={4} y={8} w={24} h={9} r={4.5} c="p" /><B x={4} y={22} w={24} h={9} r={4.5} c="p" /><B x={4} y={36} w={24} h={9} r={4.5} c="p" /></>} />
);

export const Readability = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="크고 진한 글, 넉넉한 줄 간격"
    bad={<>{Array.from({ length: 12 }, (_, i) => line(4 + i * 3.6, [34, 32, 35, 30][i % 4], 'g', 1.4))}</>}
    good={<>{line(5, 30, 'd', 5)}{Array.from({ length: 5 }, (_, i) => line(16 + i * 7, [33, 30, 34, 20, 28][i], 'k', 2.6))}</>} />
);

export const CognitiveLoad = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="한 화면에 한 가지 일만"
    bad={<>{Array.from({ length: 12 }, (_, i) => <B key={i} x={3 + (i % 3) * 12.4} y={4 + Math.floor(i / 3) * 12} w={10.4} h={10} r={2} c={i % 4 === 0 ? 'p' : 'c'} />)}</>}
    good={<>{line(10, 26, 'k', 5)}<B x={4} y={22} w={34} h={14} r={3} c="s" /><B x={4} y={42} w={34} h={9} r={4.5} c="p" /></>} />
);

export const ProgressiveDisclosure = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="필요할 때 펼쳐 보게"
    bad={<>{Array.from({ length: 9 }, (_, i) => <span key={i}>{line(4 + i * 5.8, 18, 'g', 2.4)}<B x={30} y={3 + i * 5.8} w={8} h={4.4} r={2.2} c="c" /></span>)}</>}
    good={<>{[0, 1].map((i) => <span key={i}>{line(5 + i * 9, 18, 'k')}<B x={28} y={3.6 + i * 9} w={10} h={5.6} r={2.8} c="p" /></span>)}
      <B x={4} y={22} w={34} h={8} r={2} c="a"><T x={3} y={2} size={3.6} c="sub">더 보기</T><ChevronDown className={s.chev} /></B>
      <div className={s.more}>{[0, 1, 2].map((i) => <span key={i}>{line(i * 7, 18, 'g', 2.4)}<B x={30} y={i * 7 - 1} w={8} h={4.4} r={2.2} c="c" /></span>)}</div></>} />
);

export const Affordance = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="생김새만 봐도 누를 수 있게"
    bad={<><T x={21} y={22} size={6} align="center" c="sub" weight={400}>보내기</T></>}
    good={<B x={6} y={20} w={30} h={13} r={6.5} c="p" className={s.raised}><T x={15} y={3.6} size={5.4} c="white" align="center">보내기 →</T></B>} />
);

export const Feedback = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="누르면 바로 반응해요"
    bad={<><B x={6} y={20} w={30} h={12} r={6} c="p"><T x={15} y={3.2} size={5} c="white" align="center">저장</T></B><span className={s.tapL} /></>}
    good={<><B x={6} y={20} w={30} h={12} r={6} c="p" className={s.fbBtn}><T x={15} y={3.2} size={5} c="white" align="center" className={s.fbTxt}>저장</T></B><span className={s.fbDone}>저장됐어요 ✓</span><span className={s.tapR} /></>} />
);

export const TouchTarget = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="손가락보다 넉넉한 크기"
    bad={<>{[0, 1, 2].map((i) => <B key={i} x={8 + i * 10} y={22} w={5} h={5} r={1} c="k" />)}<span className={s.finger} style={{ left: '15em', top: '24.5em' }} /></>}
    good={<>{[0, 1, 2].map((i) => <B key={i} x={3 + i * 12.6} y={18} w={11} h={12} r={3} c="p" />)}<span className={s.finger} style={{ left: '21em', top: '24em' }} /></>} />
);

export const FittsLaw = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="자주 쓰는 버튼은 크고 가까이"
    bad={<><B x={32} y={2} w={7} h={5} r={1} c="p" /><Hand className={s.thumb} /></>}
    good={<><B x={4} y={40} w={34} h={11} r={5.5} c="p" /><Hand className={s.thumb} /></>} />
);

export const HickLaw = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="고를 게 적으면 빨리 정해요"
    bad={<>{Array.from({ length: 12 }, (_, i) => <B key={i} x={3 + (i % 3) * 12.4} y={4 + Math.floor(i / 3) * 12} w={10.4} h={10} r={2} c="c" />)}</>}
    good={<>{[0, 1, 2].map((i) => <B key={i} x={4} y={6 + i * 15} w={34} h={11} r={3} c={i === 0 ? 'p' : 's'} />)}</>} />
);

export const DefaultValue = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="많이 고르는 것을 미리 골라 둬요"
    bad={<>{['작게', '보통', '크게'].map((t, i) => <span key={t}><B x={4} y={8 + i * 12} w={6} h={6} r={3} c="w" /><T x={14} y={8 + i * 12} size={4.4}>{t}</T></span>)}</>}
    good={<>{['작게', '보통', '크게'].map((t, i) => <span key={t}><B x={4} y={8 + i * 12} w={6} h={6} r={3} c={i === 1 ? 'p' : 'w'} /><T x={14} y={8 + i * 12} size={4.4} c={i === 1 ? 'blue' : 'ink'}>{t}</T></span>)}</>} />
);

export const ErrorPrevention = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="실수할 틈을 막아요"
    bad={<><B x={4} y={10} w={34} h={9} r={2} c="w"><T x={2} y={1.6} size={4} style={{ fontFamily: 'ui-monospace, monospace' }}>3/32?</T></B><T x={4} y={22} size={3.6} c="ink">! 날짜가 이상해요</T></>}
    good={<><B x={4} y={10} w={34} h={9} r={2} c="w"><CalendarDays className={s.cal} /></B>{Array.from({ length: 14 }, (_, i) => <B key={i} x={4 + (i % 7) * 4.9} y={22 + Math.floor(i / 7) * 5} w={4} h={4} r={1} c={i === 8 ? 'p' : 'a'} />)}</>} />
);

export const Reversibility = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="실수해도 되돌릴 수 있게"
    bad={<><T x={21} y={20} size={5} align="center" c="sub">영원히 지웠어요</T></>}
    good={<><T x={21} y={14} size={5} align="center" c="sub">지웠어요</T><B x={7} y={24} w={28} h={10} r={5} c="d"><Undo2 className={s.undo} /><T x={17} y={2.6} size={4} c="white" align="center">되돌리기</T></B></>} />
);

export const DarkPattern = ({ playing }: P) => (
  <BeforeAfter playing={playing} badLabel="속이는 설계" goodLabel="정직한 설계" note="거절을 숨기지 않아요"
    bad={<><B x={4} y={14} w={34} h={12} r={6} c="p"><T x={17} y={3.4} size={4.6} c="white" align="center">예, 구독할게요!</T></B><T x={21} y={32} size={2.6} c="light" align="center" weight={400}>아니요</T></>}
    good={<><B x={4} y={14} w={34} h={11} r={5.5} c="p"><T x={17} y={3} size={4.4} c="white" align="center">구독하기</T></B><B x={4} y={29} w={34} h={11} r={5.5} c="w"><T x={17} y={2.4} size={4.4} align="center">괜찮아요</T></B></>} />
);

export const Usability = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="헤매지 않고 바로 목표까지"
    bad={<svg viewBox="0 0 42 58" className={s.svg}><path d="M6 50 V30 H30 V44 H16 V10 H36" className={s.pathBad} /><circle cx="36" cy="10" r="3" className={s.goal} /></svg>}
    good={<svg viewBox="0 0 42 58" className={s.svg}><path d="M6 50 L36 10" className={s.pathGood} pathLength="100" /><circle cx="36" cy="10" r="3" className={s.goal} /></svg>} />
);

export const Persona = ({ playing }: P) => (
  <Stage playing={playing}>
    <B x={18} y={12} w={64} h={60} r={5} c="w">
      <B x={5} y={5} w={18} h={18} r={9} c="s"><User className={s.who} /></B>
      <T x={28} y={7} size={6} weight={700}>민준</T>
      <T x={28} y={15} size={4} c="sub" weight={400}>2학년 · 한글을 막 배워요</T>
      {['그림이 있으면 좋아요', '글이 길면 어려워요', '태블릿으로 해요'].map((t, i) => (
        <span key={t} className={s.trait} style={{ animationDelay: `${i * 0.35}s` }}><B x={5} y={30 + i * 8} w={3} h={3} r={1.5} c="p" /><T x={11} y={29 + i * 8} size={4}>{t}</T></span>
      ))}
    </B>
    <Callout x={50} y={74}>대표 사용자를 한 사람처럼</Callout>
  </Stage>
);

export const UserJourney = ({ playing }: P) => (
  <Stage playing={playing}>
    <B x={10} y={44} w={80} h={1} r={0} c="g" />
    {[QrCode, Eye, Hand, Trophy].map((Icon, i) => (
      <span key={i} className={s.stop} style={{ left: `${16 + i * 22.6}em` }}><Icon /></span>
    ))}
    {['QR 찍기', '둘러보기', '활동', '끝!'].map((t, i) => <T key={t} x={16 + i * 22.6} y={56} size={4} align="center" c="sub">{t}</T>)}
    <span className={s.walker} />
    <Callout x={50} y={70}>처음부터 끝까지의 경험 흐름</Callout>
  </Stage>
);

export const InfoArchitecture = ({ playing }: P) => (
  <Stage playing={playing}>
    <svg viewBox="0 0 100 100" className={s.svg}>
      <path d="M50 22 V30 M24 30 H76 M24 30 V38 M50 30 V38 M76 30 V38 M24 48 V54 M16 54 H32 M16 54 V60 M32 54 V60" className={s.tree} />
    </svg>
    <B x={38} y={12} w={24} h={10} r={2} c="p" className={s.tn} style={{ animationDelay: '0s' }}><T x={12} y={2.4} size={4} c="white" align="center">홈</T></B>
    {['수업', '자료', '문의'].map((t, i) => <B key={t} x={14 + i * 26} y={38} w={20} h={10} r={2} c="s" className={s.tn} style={{ animationDelay: `${0.3 + i * 0.15}s` }}><T x={10} y={2.4} size={4} c="blue" align="center">{t}</T></B>)}
    {['국어', '수학'].map((t, i) => <B key={t} x={8 + i * 16} y={60} w={15} h={9} r={2} c="a" className={s.tn} style={{ animationDelay: `${0.8 + i * 0.15}s` }}><T x={7.5} y={2} size={3.6} align="center">{t}</T></B>)}
    <Callout x={64} y={64}>메뉴를 나누고 묶은 지도</Callout>
  </Stage>
);

export const UsabilityTest = ({ playing }: P) => (
  <Stage playing={playing}>
    <B x={10} y={16} w={34} h={56} r={5} c="w"><B x={4} y={6} w={24} h={4} c="k" /><B x={4} y={16} w={24} h={10} r={2} c="a" /><B x={4} y={40} w={24} h={8} r={4} c="p" /></B>
    <span className={s.testTap} />
    <span className={s.eyeBox}><Eye /></span>
    <B x={58} y={36} w={32} h={36} r={3} c="a">
      {[0, 1, 2].map((i) => <span key={i} className={s.note} style={{ animationDelay: `${0.6 + i * 0.6}s` }}><B x={3} y={4 + i * 10} w={3.6} h={3.6} r={1} c={i === 1 ? 'd' : 'p'} /><B x={9} y={4.6 + i * 10} w={[16, 18, 12][i]} h={2.4} c="g" /></span>)}
    </B>
    <Callout x={50} y={80} dir="down">써 보는 모습을 보며 문제 찾기</Callout>
  </Stage>
);

export const ABTest = ({ playing }: P) => (
  <Stage playing={playing}>
    {['A', 'B'].map((t, i) => (
      <span key={t}>
        <B x={12 + i * 42} y={12} w={34} h={30} r={4} c="w">
          <T x={3} y={2} size={5} weight={700} c={i ? 'blue' : 'sub'}>{t}</T>
          <B x={6} y={i ? 18 : 6} w={22} h={6} r={3} c="p" />
        </B>
        <B x={20 + i * 42} y={78} w={18} h={0.8} r={0} c="c" />
        <B x={22 + i * 42} y={50} w={14} h={28} r={1.6} c={i ? 'p' : 'c'} className={i ? s.barB : s.barA} />
      </span>
    ))}
    <FlaskConical className={s.flask} />
    <Callout x={50} y={88} dir="down">두 가지를 보여 주고 비교</Callout>
  </Stage>
);

export const PlainLanguage = ({ playing }: P) => (
  <BeforeAfter playing={playing} note="짧고 쉬운 말로 안내해요"
    bad={<T x={3} y={18} size={3.6} c="sub" weight={400} style={{ whiteSpace: 'normal', width: '36em' }}>인증 토큰이 만료되어 세션이 종료되었습니다</T>}
    good={<><T x={21} y={16} size={5.4} align="center" weight={700}>다시 들어와 주세요</T><B x={7} y={28} w={28} h={10} r={5} c="p"><T x={14} y={2.4} size={4} c="white" align="center">로그인</T></B></>} />
);

export const UniversalDesign = ({ playing }: P) => (
  <BeforeAfter playing={playing} badLabel="계단만" goodLabel="누구나" note="처음부터 누구나 쓸 수 있게"
    bad={<svg viewBox="0 0 42 58" className={s.svg}><path d="M2 50 H10 V42 H18 V34 H26 V26 H40" className={s.stair} /></svg>}
    good={<><svg viewBox="0 0 42 58" className={s.svg}><path d="M2 50 L40 26" className={s.ramp} /><path d="M2 50 H10 V42 H18 V34 H26 V26 H40" className={s.stair2} /></svg><Accessibility className={s.wheel} /></>} />
);

