import { Check, Crown, Dice5, Download, FileImage, Heart, Lightbulb, Lock, Printer, RotateCcw, Shirt, Star, Trophy, Volume2, VolumeX, X } from 'lucide-react';
import type { CSSProperties } from 'react';
import { B, Finger, Pic, T, Tap, win } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Learn.module.css';

/** 🎮 학습·게임 UI (DragQuiz 템플릿 등): 카드가 끌려가 칸에 들어가고 정답 표시 */
type P = { playing: boolean };
const C = 28.8;

/* ───────── 문제 풀기 ───────── */

export function MultipleChoice({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={14} y={6} w={29.6} h={22} r={3} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
      {['산', '바다', '강', '숲'].map((t, i) => (
        <B key={t} x={5 + (i % 2) * 24.6} y={34 + Math.floor(i / 2) * 15} w={22.6} h={12} r={3} c="w" className={i === 0 ? s.correct : undefined}>
          <T x={11.3} y={3.2} size={5} align="center">{t}</T>
        </B>
      ))}
      <span className={s.okBadge}><Check strokeWidth={3.5} /></span>
      <Tap x={16} y={40} at={0.3} d={4} size={10} />
      <Callout x={C} y={66}>보기 중 하나를 골라요</Callout>
    </Phone>
  );
}

export function TrueFalse({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={5} y={8} w={47.6} h={20} r={4} c="a"><T x={23.8} y={6.4} size={4.6} align="center">고래는 물고기예요</T></B>
      <B x={5} y={36} w={22.6} h={24} r={4} c="w" className={s.pickO}><T x={11.3} y={5} size={13} align="center" c="blue" weight={700}>O</T></B>
      <B x={30} y={36} w={22.6} h={24} r={4} c="w" className={s.pickX}><T x={11.3} y={5} size={13} align="center" c="sub" weight={700}>X</T></B>
      <Tap x={41.3} y={48} at={0.3} d={4} size={11} />
      <Callout x={C} y={64}>맞다·틀리다 둘 중 하나</Callout>
    </Phone>
  );
}

export function Matching({ playing }: P) {
  return (
    <Stage playing={playing}>
      {['🍎', '🐶', '🚗'].map((_, i) => <B key={i} x={10} y={14 + i * 22} w={24} h={16} r={3} c="a"><T x={12} y={4} size={6} align="center">{['사과', '개', '차'][i]}</T></B>)}
      {['멍멍', '부릉', '아삭'].map((t, i) => <B key={t} x={66} y={14 + i * 22} w={24} h={16} r={3} c="s"><T x={12} y={4} size={6} align="center" c="blue">{t}</T></B>)}
      <svg viewBox="0 0 100 100" className={s.svg}>
        {[[22, 66], [44, 22], [66, 44]].map(([y1, y2], i) => (
          <path key={i} d={`M34 ${y1} L66 ${y2}`} pathLength="100" className={s.link} style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
      </svg>
      <Callout x={50} y={82}>짝이 되는 것끼리 이어요</Callout>
    </Stage>
  );
}

export function Sorting({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={8} y={52} w={38} h={30} r={4} c="a" className={s.basketA}><T x={19} y={21} size={5} align="center" c="sub">과일</T></B>
      <B x={54} y={52} w={38} h={30} r={4} c="a"><T x={19} y={21} size={5} align="center" c="sub">채소</T></B>
      <B x={39} y={12} w={22} h={14} r={3} c="p" className={s.sortCard}><T x={11} y={3.6} size={5.4} align="center" c="white">사과</T></B>
      <Finger className={s.sortFinger} />
      <Callout x={50} y={40}>알맞은 바구니에 넣어요</Callout>
    </Stage>
  );
}

export function Ordering({ playing }: P) {
  return (
    <Stage playing={playing}>
      {['손 적시기', '비누 칠하기', '헹구기'].map((t, i) => (
        <B key={t} x={14} y={16 + i * 20} w={72} h={15} r={3} c="w" className={[s.o0, s.o1, s.o2][i]}>
          <span className={s.num}>{i + 1}</span>
          <T x={18} y={4.4} size={5.2}>{t}</T>
        </B>
      ))}
      <Callout x={50} y={80}>올바른 차례로 늘어놓아요</Callout>
    </Stage>
  );
}

export function FillBlank({ playing }: P) {
  return (
    <Stage playing={playing}>
      <T x={10} y={24} size={6.4}>나는</T>
      <B x={28} y={21} w={26} h={12} r={2} c="n" className={s.blank} />
      <T x={57} y={24} size={6.4}>를 먹어요</T>
      {['사과', '책상', '구름'].map((t, i) => (
        <B key={t} x={14 + i * 25} y={56} w={22} h={12} r={6} c="s" className={i === 0 ? s.chipMove : undefined}>
          <T x={11} y={3} size={5} align="center" c="blue">{t}</T>
        </B>
      ))}
      <Callout x={50} y={72}>빈칸에 알맞은 낱말 넣기</Callout>
    </Stage>
  );
}

export function Flashcard({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.card3d}>
        <span className={s.faceF}><Pic /><b className={s.q}>?</b></span>
        <span className={s.faceB}>강아지</span>
      </span>
      <Callout x={50} y={80}>뒤집으면 답이 나와요</Callout>
    </Stage>
  );
}

export function AnswerFeedback({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={5} y={8} w={47.6} h={16} r={4} c="a"><T x={23.8} y={4.6} size={5.6} align="center">2 + 3 = ?</T></B>
      {['5', '6'].map((t, i) => (
        <B key={t} x={5 + i * 24.6} y={30} w={22.6} h={14} r={4} c="w" className={i === 0 ? s.fbOk : s.fbNo}><T x={11.3} y={3.4} size={7} align="center">{t}</T></B>
      ))}
      <span className={s.fbGood}><Check strokeWidth={3.5} /> 잘했어요!</span>
      <span className={s.fbTry}>다시 해 볼까요?</span>
      <Tap x={41} y={37} at={0.15} d={5} size={10} />
      <Tap x={16} y={37} at={0.6} d={5} size={10} />
      <Callout x={C} y={70}>맞히면 칭찬, 틀리면 부드럽게</Callout>
    </Phone>
  );
}

export function Hint({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={14} y={6} w={29.6} h={22} r={3} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
      <div className={s.letters}>
        {['산', '책', '길'].map((c, i) => <span key={i} className={s.letter}><b className={i === 0 ? s.reveal : s.hidden}>{c}</b></span>)}
      </div>
      <B right={4} y={34} w={11} h={11} r={5.5} c="s" className={s.bulb}><Lightbulb /></B>
      <Tap x={48} y={39.5} at={0.25} d={4} size={9} />
      <Callout x={C} y={60}>막히면 조금씩 도와줘요</Callout>
    </Phone>
  );
}

export function Retry({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={C} y={10} size={6} align="center" weight={700}>10개 중 7개</T>
      {[0, 1, 2].map((i) => (
        <B key={i} x={5} y={22 + i * 11} w={47.6} h={9} r={3} c="a">
          <X className={s.wrongX} />
          <B x={10} y={2.6} w={[22, 18, 26][i]} h={3.4} c="c" />
        </B>
      ))}
      <B x={9} y={60} w={39.6} h={11} r={5.5} c="p"><RotateCcw className={s.retryIcon} /><T x={22} y={2.8} size={4.4} c="white" align="center">틀린 것 다시</T></B>
      <Tap x={C} y={65.5} at={0.35} d={4} size={10} />
      <Callout x={C} y={74}>틀린 문제를 다시 풀어요</Callout>
    </Phone>
  );
}

export function ResultScreen({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.trophy}><Trophy /></span>
      <div className={s.stars}>{[0, 1, 2].map((i) => <Star key={i} className={s.star} style={{ animationDelay: `${0.4 + i * 0.25}s` }} />)}</div>
      <T x={C} y={44} size={7} align="center" weight={800} c="blue">9 / 10</T>
      <T x={C} y={54} size={4} align="center" c="sub" weight={400}>정말 잘했어요!</T>
      <B x={9} y={64} w={39.6} h={11} r={5.5} c="p"><T x={19.8} y={2.8} size={4.4} c="white" align="center">다음 활동</T></B>
      <Callout x={C} y={76}>맞힌 개수와 칭찬, 다음 활동</Callout>
    </Phone>
  );
}

/* ───────── 게임 장치 ───────── */

export function Score({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Star className={s.scoreStar} />
      <span className={s.score} />
      <span className={s.plus}>+10</span>
      <Callout x={50} y={64}>해낸 만큼 올라가는 숫자</Callout>
    </Stage>
  );
}

export function Timer({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.timeNum} />
      <B x={14} y={50} w={72} h={6} r={3} c="g"><span className={s.timeBar} /></B>
      <Callout x={50} y={62}>남은 시간이 줄어들어요</Callout>
    </Stage>
  );
}

export function Lives({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[0, 1, 2].map((i) => <span key={i} className={`${s.heart} ${i === 2 ? s.lose : ''}`} style={{ left: `${22 + i * 20}em` }}><Heart /></span>)}
      <Callout x={50} y={58}>틀릴 때마다 하나씩 줄어요</Callout>
    </Stage>
  );
}

export function LevelMap({ playing }: P) {
  const pts = [[16, 72], [36, 56], [56, 64], [74, 44], [60, 24]];
  return (
    <Stage playing={playing}>
      <svg viewBox="0 0 100 100" className={s.svg}>
        <path d={`M${pts.map((p) => p.join(' ')).join(' L')}`} className={s.road} />
      </svg>
      {pts.map(([x, y], i) => (
        <span key={i} className={`${s.node} ${i < 2 ? s.nodeDone : i === 2 ? s.nodeNext : ''}`} style={{ left: `${x}em`, top: `${y}em` }}>
          {i > 2 ? <Lock /> : i < 2 ? <Check strokeWidth={3} /> : <b>3</b>}
        </span>
      ))}
      <span className={s.me} />
      <Callout x={50} y={88} dir="down">길 위의 단계를 하나씩 깨요</Callout>
    </Stage>
  );
}

export function Reward({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={16} y={40} w={68} h={40} r={4} c="a">
        {Array.from({ length: 8 }, (_, i) => <B key={i} x={4 + (i % 4) * 16} y={4 + Math.floor(i / 4) * 17} w={12} h={12} r={6} c={i < 3 ? 's' : 'n'} style={i >= 3 ? { border: '0.5em dashed var(--gray-3)' } : undefined}>{i < 3 && <Star className={s.mini} />}</B>)}
      </B>
      <span className={s.sticker}><Star /></span>
      <Callout x={50} y={30} dir="down">해내면 스티커를 받아요</Callout>
    </Stage>
  );
}

export function Leaderboard({ playing }: P) {
  return (
    <Stage playing={playing}>
      {['하늘 모둠', '바다 모둠', '숲 모둠'].map((t, i) => (
        <B key={t} x={14} y={16 + i * 17} w={72} h={13} r={3} c={i === 2 ? 's' : 'a'} className={[s.l0, s.l1, s.l2][i]}>
          {i === 2 && <Crown className={s.crown} />}
          <T x={14} y={3.8} size={5} c={i === 2 ? 'blue' : 'ink'}>{t}</T>
          <T x={66} y={3.8} size={5} align="right" weight={700}>{[80, 70, 95][i]}</T>
        </B>
      ))}
      <Callout x={50} y={70}>점수 순서대로 줄 세워요</Callout>
    </Stage>
  );
}

export function RandomPicker({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.wheel} />
      <span className={s.pointer} />
      <Callout x={50} y={84} dir="down">돌려서 아무거나 하나</Callout>
    </Stage>
  );
}

export function Dice({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.dice}><Dice5 /></span>
      {[0, 1, 2, 3, 4, 5].map((i) => <B key={i} x={10 + i * 14} y={68} w={11} h={11} r={2} c={i === 5 ? 's' : 'a'} />)}
      <span className={s.piece} />
      <Callout x={50} y={58}>나온 숫자만큼 움직여요</Callout>
    </Stage>
  );
}

export function SoundEffect({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.spk} style={win(0, 2, 4)}><Volume2 /><i className={s.wave1} /><i className={s.wave2} /></span>
      <span className={s.spk} style={win(1, 2, 4)}><VolumeX /></span>
      <B x={56} y={66} w={30} h={12} r={6} c="g"><span className={s.toggle} /></B>
      <T x={14} y={68} size={4.6} c="sub">소리 끄기</T>
      <Callout x={50} y={56}>정답·버튼에 붙는 짧은 소리</Callout>
    </Stage>
  );
}

export function Gamification({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={10} y={14} w={80} h={16} r={4} c="a">
        <T x={4} y={4.6} size={5} weight={700}>Lv. 3</T>
        <B x={22} y={6} w={40} h={4} r={2} c="g"><span className={s.xp} /></B>
        <Star className={s.lvStar} />
      </B>
      <span className={s.gPlus}>+10점</span>
      <span className={s.gBadge}><Trophy /></span>
      <Callout x={50} y={78} dir="down">점수·레벨·보상을 공부에</Callout>
    </Stage>
  );
}

/* ───────── 만들기 활동 ───────── */

export function DrawingCanvas({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={10} y={10} w={80} h={60} r={4} c="w" />
      <svg viewBox="0 0 100 100" className={s.svg}><path d="M22 52 C30 26, 44 26, 50 44 S70 62, 78 30" pathLength="100" className={s.drawLine} /></svg>
      <Finger className={s.pen} />
      {['var(--ink)', 'var(--blue)', 'var(--gray-3)'].map((c, i) => <span key={i} className={s.swatch} style={{ left: `${30 + i * 14}em`, background: c, boxShadow: i === 1 ? '0 0 0 0.8em #fff, 0 0 0 1.6em var(--blue)' : undefined }} />)}
      <Callout x={50} y={88} dir="down">손가락으로 자유롭게 그려요</Callout>
    </Stage>
  );
}

export function Coloring({ playing }: P) {
  return (
    <Stage playing={playing}>
      <svg viewBox="0 0 100 100" className={s.svg}>
        <circle cx="50" cy="42" r="26" className={`${s.region} ${s.r1}`} />
        <circle cx="40" cy="36" r="5" className={`${s.region} ${s.r2}`} />
        <circle cx="60" cy="36" r="5" className={`${s.region} ${s.r2}`} />
        <path d="M38 52 Q50 62 62 52" className={s.mouth} />
      </svg>
      <Tap x={50} y={54} at={0.2} d={4} size={10} />
      <Tap x={40} y={36} at={0.5} d={4} size={8} />
      <Callout x={50} y={78}>칸을 누르면 색이 채워져요</Callout>
    </Stage>
  );
}

export function StickerPlacement({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={10} y={10} w={80} h={54} r={4} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
      <B x={10} y={70} w={80} h={16} r={4} c="a" />
      <span className={s.stk}><Star /></span>
      <Finger className={s.stkFinger} />
      <Callout x={50} y={8} dir="down">스티커를 끌어다 붙여요</Callout>
    </Stage>
  );
}

export function DressUp({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.head} />
      <span className={s.hat} style={win(0, 3, 4.5)} />
      <span className={`${s.hat} ${s.hat2}`} style={win(1, 3, 4.5)} />
      <span className={`${s.hat} ${s.hat3}`} style={win(2, 3, 4.5)} />
      <span className={s.body}><Shirt /></span>
      <div className={s.picks}>{[0, 1, 2].map((i) => <span key={i}><i style={win(i, 3, 4.5)} /></span>)}</div>
      <Callout x={50} y={88} dir="down">골라서 바꿔 입혀요</Callout>
    </Stage>
  );
}

export function SaveImage({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={14} y={10} w={44} h={44} r={4} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
      <span className={s.dlArrow}><Download /></span>
      <span className={s.file}><FileImage /><b>그림.png</b></span>
      <Callout x={50} y={84} dir="down">그림 파일로 내려받기</Callout>
    </Stage>
  );
}

export function PrintAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.paper}>{[0, 1, 2].map((i) => <i key={i} />)}</span>
      <span className={s.printer}><Printer /></span>
      <Callout x={50} y={88} dir="down">종이로 뽑아요</Callout>
    </Stage>
  );
}

export function SharedGallery({ playing }: P) {
  return (
    <Stage playing={playing}>
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className={s.art} style={{ left: `${10 + (i % 3) * 28}em`, top: `${12 + Math.floor(i / 3) * 34}em`, animationDelay: `${i * 0.2}s` } as CSSProperties}>
          <span className={s.artPic}><Pic /></span>
          <span className={s.artWho}>{['은', '민', '하', '준', '서', '윤'][i]}</span>
        </span>
      ))}
      <Callout x={50} y={84} dir="down">친구들 작품을 한곳에</Callout>
    </Stage>
  );
}
