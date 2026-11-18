import type { CSSProperties, ReactNode } from 'react';
import {
  Accessibility, Bot, Brain, Calendar, Camera, Check, ClipboardList, Eye, FileText, Folder, Image, Keyboard, Mic,
  Pin, RotateCcw, Search, Sparkles, Undo2, User, Volume2, X, Zap,
} from 'lucide-react';
import { B, Pic, T, Tap, win } from './kit';
import { Flow, Steps, Tag, Win } from './BuildKit';
import { Callout, Phone, Stage } from './Stage';
import s from './AI.module.css';

/** 💬 AI와 일하기 (ChatFlow 템플릿): 말풍선이 오가며 결과가 만들어짐 */
type P = { playing: boolean };

/** 말풍선 줄. 차례로 나타남 (i번째는 i*gap초 뒤) */
function Chat({ y = 8, msgs, gap = 0.7, d = 4.4, w = 84 }: { y?: number; msgs: { me?: boolean; t: ReactNode; wide?: boolean }[]; gap?: number; d?: number; w?: number }) {
  return (
    <span className={s.chat} style={{ top: `${y}em`, width: `${w}em`, left: `${(100 - w) / 2}em` }}>
      {msgs.map((m, i) => (
        <span key={i} className={`${s.bub} ${m.me ? s.me : s.ai} ${m.wide ? s.wide : ''}`} style={{ animationDelay: `${0.2 + i * gap}s`, animationDuration: `${d}s` }}>
          {!m.me && <Bot className={s.who} />}
          <span className={s.bt}>{m.t}</span>
        </span>
      ))}
    </span>
  );
}

const Hl = ({ children }: { children: ReactNode }) => <b className={s.hl}>{children}</b>;

/** 아래 결과 칸: d초 중 at 이후 나타남 */
function Result({ x = 20, y = 50, w = 60, h = 32, at = 0.5, children, style }: { x?: number; y?: number; w?: number; h?: number; at?: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <span className={s.result} style={{ left: `${x}em`, top: `${y}em`, width: `${w}em`, height: `${h}em`, ['--at' as string]: at, ...style }}>{children}</span>
  );
}

/* ───────── 기획과 요청 ───────── */

export function Prompt({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Chat msgs={[{ me: true, t: <>아래서 올라오는 <Hl>바텀시트</Hl> 만들어줘</> }]} />
      <Result x={30} y={26} w={40} h={54}>
        <B x={4} y={4} w={24} h={4} r={2} c="g" />
        <B x={4} y={11} w={30} h={3} r={1.5} c="a" />
        <span className={s.sheet} />
      </Result>
      <Callout x={50} y={84} dir="down">AI에게 주는 요청 글</Callout>
    </Stage>
  );
}

export function FourParts({ playing }: P) {
  const rows: [string, string][] = [['누가', '초등 3학년이'], ['무엇을', '받아쓰기 퀴즈'], ['어떤 모양', '큰 글자, 파란색'], ['하지 말 것', '광고·로그인 없이']];
  return (
    <Stage playing={playing}>
      <span className={s.card4}>
        {rows.map(([a, b], i) => (
          <span key={a} className={s.row4} style={{ animationDelay: `${0.2 + i * 0.6}s` }}>
            <b>{a}</b><span>{b}</span>
          </span>
        ))}
      </span>
      <Callout x={50} y={84} dir="down">네 가지를 넣어 요청해요</Callout>
    </Stage>
  );
}

export function Prd({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.doc}>
        <b className={s.docTitle}>받아쓰기 앱 기획서</b>
        {[['목표', 70], ['누구', 50], ['기능', 80], ['화면', 60]].map(([t, w], i) => (
          <span key={t as string} className={s.docRow} style={{ animationDelay: `${0.3 + i * 0.5}s` }}>
            <i>{t}</i><em style={{ width: `${w}%` }} />
          </span>
        ))}
      </span>
      <Callout x={50} y={84} dir="down">무엇을, 누구를 위해, 어떻게</Callout>
    </Stage>
  );
}

function Screen({ colored }: { colored: boolean }) {
  const c = (on: 'p' | 's' | 'k') => (colored ? on : 'n');
  const cls = colored ? undefined : s.wire;
  return (
    <>
      <B x={6} y={6} w={34} h={6} r={colored ? 3 : 1} c={c('k')} className={cls} />
      <B x={6} y={16} w={45.6} h={22} r={colored ? 4 : 1} c={c('s')} className={cls} />
      <B x={6} y={42} w={21} h={14} r={colored ? 4 : 1} c={c('s')} className={cls} />
      <B x={30.6} y={42} w={21} h={14} r={colored ? 4 : 1} c={c('s')} className={cls} />
      <B x={6} y={66} w={45.6} h={10} r={colored ? 5 : 1} c={c('p')} className={cls} />
    </>
  );
}

export function Wireframe({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.draw}><Screen colored={false} /></span>
      <Callout x={28.8} y={84} dir="down">상자와 선으로 그린 뼈대</Callout>
    </Phone>
  );
}

export function Mockup({ playing }: P) {
  const d = 4.4;
  return (
    <Phone playing={playing} bare>
      <span className={s.layer} style={win(0, 2, d)}><Screen colored={false} /></span>
      <span className={s.layer} style={win(1, 2, d)}><Screen colored /></span>
      <Callout x={28.8} y={84} dir="down">색까지 입힌 멈춘 그림</Callout>
    </Phone>
  );
}

export function Prototype({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={6} y={14} w={36} h={58} r={5} c="w" />
      <B x={10} y={20} w={22} h={4} r={2} c="k" />
      <B x={10} y={54} w={28} h={9} r={4.5} c="p" />
      <Tap x={24} y={58.5} at={0.25} d={4} size={9} />
      <span className={s.link} />
      <B x={58} y={14} w={36} h={58} r={5} c="w" className={s.next} />
      <B x={62} y={20} w={26} h={4} r={2} c="k" className={s.next} />
      <B x={62} y={28} w={28} h={18} r={3} c="s" className={s.next} />
      <Callout x={50} y={80}>눌러 볼 수 있게 이은 시험용</Callout>
    </Stage>
  );
}

export function Reference({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.refCard}><Pic /><b>이런 느낌</b></span>
      <span className={s.arrowR} />
      <Result x={58} y={20} w={36} h={46} at={0.4}>
        <span className={s.refOut}><Pic /></span>
        <B x={4} y={30} w={20} h={4} r={2} c="k" />
      </Result>
      <Callout x={50} y={78}>참고 그림으로 느낌을 전해요</Callout>
    </Stage>
  );
}

export function DesignSystem({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.ds}>
        <span className={s.swatches}><i /><i /><i /><i /></span>
        <b className={s.aa}>Aa</b>
        <span className={s.btns}><i /><i /></span>
      </span>
      {[0, 1, 2].map((i) => (
        <span key={i} className={s.mini} style={{ left: `${10 + i * 28}em`, animationDelay: `${0.8 + i * 0.3}s` }}>
          <i /><b /><em />
        </span>
      ))}
      <Callout x={50} y={84} dir="down">규칙 하나로 모든 화면을 똑같이</Callout>
    </Stage>
  );
}

export function DesignToken({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.token}><span>주요색 =</span><b className={s.tokVal} /></span>
      {[0, 1, 2].map((i) => <span key={i} className={s.tokBtn} style={{ left: `${10 + i * 28}em` }} />)}
      <Callout x={50} y={78}>값 하나만 바꾸면 전부 바뀌어요</Callout>
    </Stage>
  );
}

export function UserFlow({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 12, y: 40, icon: <span className={s.n}>시작</span>, sq: true, size: 16 },
        { x: 37, y: 40, icon: <span className={s.n}>이름</span>, sq: true, size: 16 },
        { x: 62, y: 40, icon: <span className={s.n}>문제</span>, sq: true, size: 16 },
        { x: 87, y: 40, icon: <span className={s.n}>결과</span>, sq: true, size: 16 },
      ]} token={<User />} d={4.8} />
      <Callout x={50} y={70}>첫 화면부터 목표까지의 순서</Callout>
    </Stage>
  );
}

export function AccessibilityAnim({ playing }: P) {
  const d = 6;
  return (
    <Stage playing={playing}>
      <B x={14} y={14} w={50} h={46} r={4} c="w" />
      <T x={39} y={20} size={5} align="center" className={s.bigText}>사과</T>
      <B x={22} y={44} w={34} h={10} r={5} c="p" className={s.focusRing} />
      <span className={s.tools}>
        {[<Eye key="e" />, <Volume2 key="v" />, <Keyboard key="k" />].map((ic, i) => (
          <span key={i}><span className={s.toolOff}>{ic}</span><span className={s.toolOn} style={win(i, 3, d)}>{ic}</span></span>
        ))}
      </span>
      <Accessibility className={s.a11y} />
      <Callout x={40} y={74}>누구나 똑같이 쓸 수 있게</Callout>
    </Stage>
  );
}

export function AltText({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.altPic}><Pic /></span>
      <span className={s.altBubble}><Volume2 /><span>"빨간 사과 그림"</span></span>
      <Tag x={30} y={70} fs={3.6} kind="dark">alt="빨간 사과 그림"</Tag>
      <Callout x={70} y={58}>그림을 말로 읽어 줘요</Callout>
    </Stage>
  );
}

export function FewShot({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Chat msgs={[
        { me: true, t: <>이렇게 해 줘: 사과 → ㅅㄱ<br />나무 → ㄴㅁ<br />포도 → ?</> },
        { t: <Hl>ㅍㄷ</Hl> },
      ]} gap={1.4} />
      <Callout x={50} y={84} dir="down">예를 보여 주면 그대로 따라 해요</Callout>
    </Stage>
  );
}

export function Constraints({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.rules}>
        {['버튼은 3개까지', '광고 없이', '인터넷 없이도'].map((t, i) => <span key={t} style={{ animationDelay: `${0.2 + i * 0.4}s` }}><Pin />{t}</span>)}
      </span>
      <Result x={56} y={16} w={38} h={52} at={0.45}>
        {[0, 1, 2].map((i) => <B key={i} x={4} y={6 + i * 12} w={28} h={8} r={4} c={i === 0 ? 'p' : 's'} />)}
        <span className={s.noAd}><span>AD</span><X strokeWidth={3} /></span>
      </Result>
      <Callout x={50} y={78}>꼭 지킬 조건을 미리 말해요</Callout>
    </Stage>
  );
}

export function AcceptanceCriteria({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.check}>
        {['휴대폰에서도 잘 보임', '새로고침해도 점수 남음', '소리 끄기 있음', '글자 크기 큼'].map((t, i) => (
          <span key={t}><i style={{ animationDelay: `${0.4 + i * 0.6}s` }}><Check strokeWidth={3.5} /></i>{t}</span>
        ))}
      </span>
      <Callout x={50} y={80}>다 됐는지 하나씩 점검해요</Callout>
    </Stage>
  );
}

/* ───────── 작업 흐름 ───────── */

export function PlanFirst({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Chat msgs={[
        { me: true, t: '계획부터 보여 줘' },
        { t: <>1. 첫 화면<br />2. 문제 풀기<br />3. 결과</>, wide: true },
        { me: true, t: '좋아, 만들어 줘' },
      ]} gap={1} d={5} />
      <Callout x={50} y={86} dir="down">만들기 전에 방향부터 맞춰요</Callout>
    </Stage>
  );
}

export function SmallSteps({ playing }: P) {
  const d = 6;
  return (
    <Stage playing={playing}>
      <Steps items={['① 첫 화면', '② 문제', '③ 결과']} d={d} />
      {[0, 1, 2].map((i) => (
        <span key={i} className={s.step} style={{ left: `${8 + i * 30}em`, animationDelay: `${i * (d / 3)}s`, animationDuration: `${d}s` }}>
          <B x={3} y={3} w={16} h={3} r={1.5} c="k" />
          <B x={3} y={10} w={20} h={10} r={2} c="s" />
          <span className={s.ok}><Check strokeWidth={3.5} /></span>
        </span>
      ))}
      <Callout x={50} y={80}>하나씩 만들고 확인해요</Callout>
    </Stage>
  );
}

export function Iteration({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 50, y: 18, icon: <Sparkles />, size: 17, label: '만들기' },
        { x: 78, y: 60, icon: <Eye />, size: 17, label: '보기' },
        { x: 22, y: 60, icon: <RotateCcw />, size: 17, label: '고치기' },
      ]} path={[0, 1, 2, 0]} d={4.8} />
      <Callout x={50} y={48}>되풀이하며 다듬어요</Callout>
    </Stage>
  );
}

export function ScreenshotFeedback({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.shot}>
        <B x={3} y={3} w={20} h={3} r={1.5} c="k" />
        <B x={3} y={10} w={28} h={10} r={2} c="s" />
        <B x={3} y={24} w={14} h={6} r={3} c="p" />
        <span className={s.circle} />
      </span>
      <Camera className={s.cam} />
      <span className={s.say}><User /><span>동그라미 친 버튼, 더 크게!</span></span>
      <Callout x={50} y={84} dir="down">화면을 찍어 짚어 줘요</Callout>
    </Stage>
  );
}

export function PasteError({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={8} w={88} h={22} title="Console" fs={3.6}>
        <span className={s.errLine}>✖ TypeError: 점수 is undefined (app.js:12)</span>
      </Win>
      <Chat y={38} msgs={[
        { me: true, t: <span className={s.mono}>TypeError: 점수 is undefined…</span> },
        { t: <>12줄 고쳤어요 <Check className={s.inlineIc} strokeWidth={3} /></> },
      ]} gap={1.2} />
      <Callout x={50} y={86} dir="down">설명 말고 통째로 붙여 넣어요</Callout>
    </Stage>
  );
}

function Versions({ broken = 3, back }: { broken?: number; back?: boolean }) {
  return (
    <>
      <span className={s.vline} />
      {[1, 2, 3].map((v) => (
        <span key={v} className={`${s.ver} ${v === broken ? s.verBad : ''} ${back && v === 2 ? s.verBack : ''}`} style={{ left: `${10 + (v - 1) * 32}em`, animationDelay: `${(v - 1) * 0.6}s` }}>
          <b>v{v}</b>
          {v === broken ? <X strokeWidth={3} /> : <Check strokeWidth={3} />}
        </span>
      ))}
    </>
  );
}

export function SaveWorking({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Versions />
      <span className={s.saveTag}>잘 될 때 저장</span>
      <Callout x={50} y={74}>망가져도 돌아올 곳이 생겨요</Callout>
    </Stage>
  );
}

export function Rollback({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Versions back />
      <span className={s.backArrow}><Undo2 /></span>
      <Callout x={50} y={74}>잘 되던 버전으로 돌아가요</Callout>
    </Stage>
  );
}

export function Refactoring({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      <Win x={6} y={12} w={52} h={56} title="app.js" fs={1}>
        <span className={s.layer} style={win(0, 2, d)}>
          {[[2, 30, 0], [8, 18, 6], [4, 34, 12], [12, 12, 18], [3, 26, 24], [9, 20, 30], [5, 32, 36]].map(([x, w, y], i) => <B key={i} x={x} y={y + 4} w={w} h={3} r={1.5} c="c" />)}
        </span>
        <span className={s.layer} style={win(1, 2, d)}>
          {[[3, 24, 0], [6, 30, 6], [6, 22, 12], [3, 12, 18], [3, 26, 28], [6, 20, 34]].map(([x, w, y], i) => <B key={i} x={x} y={y + 4} w={w} h={3} r={1.5} c={i === 0 || i === 4 ? 'p' : 'g'} />)}
        </span>
      </Win>
      <B x={66} y={22} w={28} h={36} r={4} c="w">
        <B x={4} y={4} w={18} h={4} r={2} c="k" />
        <B x={4} y={22} w={18} h={8} r={4} c="p" />
      </B>
      <T x={80} y={62} size={3.6} align="center" c="sub">화면은 그대로</T>
      <Callout x={32} y={74}>코드 속만 깔끔하게</Callout>
    </Stage>
  );
}

export function FreshStart({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.longChat}>{Array.from({ length: 9 }, (_, i) => <i key={i} className={i % 2 ? s.r : undefined} />)}</span>
      <span className={s.summary}><ClipboardList /><span>요약 + 최신 코드</span></span>
      <span className={s.newChat}><b>새 대화</b><i /></span>
      <Callout x={50} y={84} dir="down">길어지면 요약을 들고 새로</Callout>
    </Stage>
  );
}

/* ───────── AI 도구 이해하기 ───────── */

export function CodingAgent({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 20, y: 22, icon: <Search />, size: 15, label: '읽기' },
        { x: 80, y: 22, icon: <FileText />, size: 15, label: '고치기' },
        { x: 80, y: 62, icon: <Zap />, size: 15, label: '실행' },
        { x: 20, y: 62, icon: <Check />, size: 15, label: '확인' },
      ]} path={[0, 1, 2, 3]} token={<Bot />} d={4.8} />
      <Callout x={50} y={46}>스스로 이어서 해요</Callout>
    </Stage>
  );
}

export function Model({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[[<Zap key="z" />, '빠른 모델'], [<Brain key="b" />, '깊게 생각하는 모델']].map(([ic, t], i) => (
        <span key={i} className={s.model} style={{ top: `${16 + i * 26}em` }}>
          <span className={s.mIcon}>{ic}</span>
          <span className={s.mName}>{t}</span>
          <span className={s.mBar}><i style={{ animationDuration: `${i === 0 ? 0.9 : 2.6}s` }} /></span>
        </span>
      ))}
      <Callout x={50} y={74}>성격이 다른 AI 두뇌</Callout>
    </Stage>
  );
}

export function Token({ playing }: P) {
  const parts = ['안녕', '하세요', ', ', '선생', '님', '!'];
  return (
    <Stage playing={playing}>
      <span className={s.tokens}>
        {parts.map((p, i) => <span key={i} style={{ animationDelay: `${0.3 + i * 0.4}s` }}>{p}</span>)}
      </span>
      <T x={50} y={56} size={5} align="center" c="blue" weight={700} className={s.count}><span /></T>
      <Callout x={50} y={76}>AI가 세는 글 조각</Callout>
    </Stage>
  );
}

export function Context({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.ctxWin} />
      <span className={s.ctxScroll}>
        {Array.from({ length: 10 }, (_, i) => <i key={i} className={i % 2 ? s.r : undefined} />)}
      </span>
      <Tag x={50} y={10} fs={3.6} kind="soft">기억하는 범위</Tag>
      <Callout x={50} y={86} dir="down">길어지면 앞부분을 잊어요</Callout>
    </Stage>
  );
}

export function ProjectInstructions({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.pinned}><Pin /><span>늘 지킬 규칙</span><i /><i /></span>
      {[0, 1, 2].map((i) => (
        <span key={i} className={s.chatMini} style={{ left: `${8 + i * 30}em`, animationDelay: `${0.5 + i * 0.5}s` }}>
          <i /><i /><b><Check strokeWidth={3.5} /></b>
        </span>
      ))}
      <Callout x={50} y={84} dir="down">새 대화에서도 알아서 지켜요</Callout>
    </Stage>
  );
}

export function Multimodal({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 16, y: 16, icon: <FileText />, sq: true, size: 13 },
        { x: 16, y: 38, icon: <Image />, sq: true, size: 13 },
        { x: 16, y: 60, icon: <Mic />, sq: true, size: 13 },
        { x: 66, y: 38, icon: <Bot />, size: 24, hot: true },
      ]} path={[1, 3]} arrows={[[0, 3], [1, 3], [2, 3]]} d={3.6} />
      <Callout x={62} y={56}>글·그림·소리를 함께</Callout>
    </Stage>
  );
}

export function Connector({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 50, y: 40, icon: <Bot />, size: 22, hot: true },
        { x: 16, y: 16, icon: <FileText />, sq: true, size: 14, label: '노트' },
        { x: 84, y: 16, icon: <Calendar />, sq: true, size: 14, label: '일정' },
        { x: 50, y: 74, icon: <Folder />, sq: true, size: 14, label: '드라이브' },
      ]} path={[0, 1, 0, 2]} arrows={[[0, 1], [0, 2], [0, 3]]} d={4.8} />
      <Callout x={72} y={52}>서비스와 이어 주는 통로</Callout>
    </Stage>
  );
}

export function Hallucination({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Chat msgs={[{ t: <>설정 › <Hl>마법 메뉴</Hl>에 있어요!</> }]} />
      <B x={20} y={30} w={60} h={40} r={4} c="w" />
      {['설정', '소리', '글자 크기'].map((t, i) => <T key={t} x={26} y={35 + i * 10} size={4.2}>{t}</T>)}
      <span className={s.ghost}>마법 메뉴</span>
      <Search className={s.lens} />
      <span className={s.nope}><X strokeWidth={3.5} /></span>
      <Callout x={50} y={82}>없는 걸 그럴듯하게 지어내요</Callout>
    </Stage>
  );
}

