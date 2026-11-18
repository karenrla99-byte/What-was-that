import { Bot, Check, ClipboardPaste, Copy, FileCode2, Play, TriangleAlert, User, X } from 'lucide-react';
import { B, T } from './kit';
import { Lines, Win } from './BuildKit';
import { Callout, Stage } from './Stage';
import s from './VsPairs.module.css';

/** 비교 카드에서 나눈 짝 용어들 (에러·경고, 채팅형·에이전트형) */
type P = { playing: boolean };

/** 콘솔 한 줄 + 앱 화면. stop이면 앱이 멈춤 */
function ConsoleLevel({ playing, stop }: P & { stop: boolean }) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={10} w={50} h={56} kind="browser" title="내 앱">
        <B x={6} y={6} w={34} h={6} r={3} c="k" />
        <B x={6} y={16} w={34} h={16} r={3} c="s" className={stop ? s.freeze : s.alive} />
        {stop && <span className={s.stopVeil}><X strokeWidth={3} /></span>}
      </Win>
      <span className={`${s.badge} ${stop ? s.err : s.warn}`}>{stop ? <X strokeWidth={3.5} /> : <TriangleAlert />}</span>
      <Win x={6} y={70} w={88} h={22} title="Console" fs={3.6}>
        <span className={`${s.line} ${stop ? s.errLine : s.warnLine}`}>{stop ? '✖ 점수 is not defined' : '⚠ 이미지에 alt가 없어요'}</span>
      </Win>
      <Callout x={74} y={50}>{stop ? '멈춰요 · 꼭 고쳐요' : '돌아가요 · 나중에 고쳐도 OK'}</Callout>
    </Stage>
  );
}
export const ConsoleError = (p: P) => <ConsoleLevel {...p} stop />;
export const ConsoleWarning = (p: P) => <ConsoleLevel {...p} stop={false} />;

export function ChatMode({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.ask}><User /><span>버튼 만들어줘</span></span>
      <span className={s.answer}>
        <Bot />
        <span className={s.codeBlock}><Lines n={2}><span>&lt;button&gt;</span><span>시작&lt;/button&gt;</span></Lines></span>
      </span>
      <span className={s.copyFly}><Copy /></span>
      <Win x={58} y={52} w={38} h={30} title="index.html" fs={3}>
        <span className={s.pasted}><ClipboardPaste />붙여 넣기</span>
      </Win>
      <Callout x={36} y={84} dir="down">복사·붙여 넣기는 내가 해요</Callout>
    </Stage>
  );
}

export function AgentMode({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.agent}><Bot /></span>
      {['index.html', 'style.css', 'app.js'].map((t, i) => (
        <span key={t} className={s.file} style={{ top: `${12 + i * 15}em`, animationDelay: `${0.4 + i * 0.6}s` }}>
          <FileCode2 /><span>{t}</span><Check strokeWidth={3.5} className={s.tick} style={{ animationDelay: `${0.4 + i * 0.6}s` }} />
        </span>
      ))}
      <span className={s.run}><Play /><span>실행해서 확인</span></span>
      <T x={22} y={60} size={3.8} align="center" c="sub">AI가 직접</T>
      <Callout x={60} y={82} dir="down">파일을 직접 고치고 실행해요</Callout>
    </Stage>
  );
}

