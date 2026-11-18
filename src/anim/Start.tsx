import {
  AppWindow, BookOpen, Check, Cloud, Cookie, Copy, Eye, FileArchive, FileText, HatGlasses, Hourglass, Image, ImageOff, Laptop,
  Loader, Play, Plus, ShieldBan, Star, X,
} from 'lucide-react';
import { B, Cursor, Pic, T, Tap, win } from './kit';
import { Cm, Flow, K, Lines, Steps, Sx, Tag, Win } from './BuildKit';
import { Chat } from './AI';
import { Callout, Stage } from './Stage';
import s from './Start.module.css';

/** 🌱 처음 시작 (BrowserWindow 템플릿): 작은 브라우저·코드 창 안에서 상황이 벌어짐 */
type P = { playing: boolean };

/* ───────── 기본 말 ───────── */

export function VibeCoding({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Chat msgs={[{ me: true, t: <>별점 매기는 칸 만들어줘</> }]} />
      <Win x={16} y={28} w={68} h={46} kind="browser" title="내 앱" className={s.appear}>
        <span className={s.stars}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} style={{ animationDelay: `${2 + i * 0.15}s` }} />)}</span>
      </Win>
      <Callout x={50} y={80}>말로 설명하면 AI가 코드를 써요</Callout>
    </Stage>
  );
}

export function Code({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={14} w={56} h={52} title="app.js" fs={3.8}>
        <Lines n={4}>
          <span><K>버튼</K>을 누르면</span>
          <span>&nbsp;&nbsp;점수 <Sx>+1</Sx></span>
          <span>&nbsp;&nbsp;<K>화면</K>에 보여 주기</span>
          <span><Cm>// 컴퓨터용 레시피</Cm></span>
        </Lines>
      </Win>
      <span className={s.recipe}><BookOpen /></span>
      <Callout x={34} y={72}>컴퓨터가 알아듣는 명령문</Callout>
    </Stage>
  );
}

export function Run({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={4} y={16} w={40} h={48} title="app.js" fs={3}>
        <span className={s.codeLines}>{[80, 60, 70, 50, 65].map((w, i) => <i key={i} style={{ width: `${w}%` }} />)}</span>
      </Win>
      <span className={s.play}><Play /></span>
      <Tap x={52} y={40} at={0.2} d={4.4} size={9} />
      <Win x={60} y={16} w={36} h={48} kind="browser" title="결과">
        <B x={4} y={4} w={20} h={4} r={2} c="k" className={s.on} />
        <B x={4} y={12} w={26} h={12} r={3} c="s" className={s.on} />
        <B x={4} y={28} w={16} h={6} r={3} c="p" className={s.on} />
      </Win>
      <Callout x={50} y={72}>코드를 움직여 화면이 나와요</Callout>
    </Stage>
  );
}

export function Preview({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={10} y={14} w={80} h={56} kind="browser" title="미리보기">
        <B x={6} y={6} w={34} h={5} r={2.5} c="k" />
        <B x={6} y={15} w={50} h={18} r={3} c="s" />
        <B x={6} y={37} w={20} h={7} r={3.5} c="p" />
      </Win>
      <span className={s.eye}><Eye /></span>
      <Tag x={76} y={66} fs={3.6} kind="dark">나만 먼저 봐요</Tag>
      <Callout x={50} y={80}>보여 주기 전에 먼저 확인</Callout>
    </Stage>
  );
}

export function Website({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={12} y={10} w={76} h={66} kind="browser" title="우리 학교 홈페이지">
        <span className={s.article}>
          <b />
          <span className={s.artPic}><Pic /></span>
          {[90, 80, 85, 60, 88, 70].map((w, i) => <i key={i} style={{ width: `${w}%` }} />)}
        </span>
      </Win>
      <span className={s.read}><BookOpen /></span>
      <Callout x={50} y={82}>주로 읽고 보는 곳</Callout>
    </Stage>
  );
}

export function WebApp({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={12} y={10} w={76} h={66} kind="browser" title="받아쓰기 퀴즈">
        <T x={38} y={6} size={5} align="center" weight={700}>"사과"를 골라요</T>
        {['사과', '사가', '삭과'].map((t, i) => (
          <B key={t} x={8} y={16 + i * 12} w={60} h={9} r={4.5} c="a" className={i === 0 ? s.pick : undefined}>
            <T x={30} y={2.2} size={4.2} align="center">{t}</T>
          </B>
        ))}
      </Win>
      <Tap x={50} y={31.5} at={0.3} d={4} size={9} />
      <span className={s.okMark}><Check strokeWidth={3.5} /></span>
      <Callout x={50} y={82}>누르고 입력하며 '하는' 곳</Callout>
    </Stage>
  );
}

export function NoCode({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.palette}>{['제목', '사진', '버튼'].map((t) => <span key={t}>{t}</span>)}</span>
      <Win x={42} y={10} w={52} h={66} kind="browser" title="내 페이지">
        <B x={4} y={4} w={40} h={6} r={2} c="k" />
      </Win>
      <span className={s.dragBlock}>사진</span>
      <Callout x={50} y={82}>블록을 끌어다 놓아 만들어요</Callout>
    </Stage>
  );
}

export function Template({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      <B x={20} y={8} w={60} h={70} r={4} c="w" />
      <B x={26} y={14} w={48} h={8} r={2} c="n" className={s.slot} />
      <B x={26} y={26} w={48} h={22} r={2} c="n" className={s.slot} />
      <B x={26} y={52} w={22} h={8} r={4} c="n" className={s.slot} />
      {[['받아쓰기', 0], ['구구단', 1]].map(([t, k]) => (
        <span key={t as string} className={s.layer} style={win(k as number, 2, d)}>
          <T x={50} y={15.4} size={5} align="center" weight={700}>{t}</T>
          <B x={27} y={27} w={46} h={20} r={2} c={k === 0 ? 's' : 'a'} />
          <B x={27} y={53} w={20} h={6} r={3} c="p" />
        </span>
      ))}
      <Callout x={50} y={82}>틀은 그대로, 내용만 바꿔요</Callout>
    </Stage>
  );
}

export function ArtifactCanvas({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={4} y={10} w={42} h={70} r={4} c="w" />
      <span className={s.chatCol}><i className={s.r} /><i /><i className={s.r} /></span>
      <B x={50} y={10} w={46} h={70} r={4} c="w" style={{ border: '0.8em solid var(--blue)' }} />
      <span className={s.canvas}>
        <B x={4} y={4} w={24} h={4} r={2} c="k" />
        <B x={4} y={12} w={30} h={20} r={3} c="s" />
        <B x={4} y={36} w={18} h={7} r={3.5} c="p" />
      </span>
      <Tag x={73} y={14} fs={3.2} kind="soft">결과물 창</Tag>
      <Callout x={73} y={84} dir="down">만든 화면이 바로 옆에</Callout>
    </Stage>
  );
}

export function Version({ playing }: P) {
  return (
    <Stage playing={playing}>
      {['v1', 'v2', 'v3'].map((v, i) => (
        <span key={v} className={s.vCard} style={{ left: `${14 + i * 12}em`, top: `${14 + i * 8}em`, animationDelay: `${i * 0.7}s` }}>
          <b>{v}</b><i /><i /><em className={i === 2 ? s.vNew : undefined} />
        </span>
      ))}
      <Callout x={50} y={84} dir="down">고칠 때마다 쌓이는 판</Callout>
    </Stage>
  );
}

export function FreeTier({ playing }: P) {
  return (
    <Stage playing={playing}>
      <T x={10} y={22} size={4.4} weight={700}>오늘 쓴 양</T>
      <span className={s.meter}><i /></span>
      <span className={s.limit}><b>무료 한도</b></span>
      <span className={s.stop}><Hourglass /><span>내일 다시</span></span>
      <Callout x={50} y={80}>넘으면 멈추거나 요금이 생겨요</Callout>
    </Stage>
  );
}

/* ───────── 컴퓨터와 브라우저 ───────── */

export function Browser({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={10} w={84} h={66} kind="browser" title="https://school.kr">
        <span className={s.tabsRow}><i className={s.tabOn} /><i /><i /></span>
        <B x={6} y={12} w={40} h={6} r={3} c="k" className={s.on} />
        <B x={6} y={22} w={70} h={22} r={3} c="s" className={s.on} />
      </Win>
      <Callout x={50} y={82}>인터넷 페이지를 여는 프로그램</Callout>
    </Stage>
  );
}

export function Url({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.addr}><span className={s.typeUrl}>https://eunti.com</span></span>
      <B x={10} y={34} w={80} h={40} r={4} c="w" className={s.on} />
      <B x={16} y={40} w={40} h={6} r={3} c="k" className={s.on} />
      <B x={16} y={50} w={68} h={18} r={3} c="s" className={s.on} />
      <Callout x={50} y={30}>인터넷 페이지의 집 주소</Callout>
    </Stage>
  );
}

export function NewTab({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.tabBar}>
        <span className={s.tabA}><span>지금 페이지</span></span>
        <span className={s.tabB}><span>새 탭</span></span>
        <Plus className={s.plus} />
      </span>
      <B x={8} y={30} w={84} h={46} r={3} c="w" />
      <B x={14} y={36} w={40} h={6} r={3} c="k" />
      <B x={14} y={46} w={70} h={22} r={3} c="s" className={s.swapPage} />
      <Callout x={50} y={84} dir="down">보던 페이지는 그대로 두고 하나 더</Callout>
    </Stage>
  );
}

export function Incognito({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={12} y={12} w={76} h={60} kind="term" title="시크릿 창" fs={1}>
        <span className={s.hat}><HatGlasses /></span>
        <T x={38} y={32} size={4.2} align="center" c="white">기록 없이, 처음 온 사람처럼</T>
      </Win>
      <Callout x={50} y={80}>새로 고친 게 보이는지 확인할 때</Callout>
    </Stage>
  );
}

export function CookieAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={14} w={50} h={52} kind="browser" title="내 브라우저">
        <span className={s.jar}><Cookie /><span>로그인됨</span></span>
      </Win>
      <Flow nodes={[{ x: 82, y: 40, icon: <AppWindow />, sq: true, size: 18, label: '사이트' }, { x: 30, y: 58, icon: <Cookie />, size: 12 }]} path={[0, 1]} token={<FileText />} d={4.4} />
      <Callout x={50} y={80}>사이트가 남기는 작은 메모</Callout>
    </Stage>
  );
}

export function PopupBlocker({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={10} w={88} h={66} kind="browser" title="eunti.com">
        <B x={6} y={6} w={40} h={6} r={3} c="k" />
      </Win>
      <span className={s.popup}><X /></span>
      <span className={s.block}><ShieldBan /></span>
      <Callout x={50} y={82}>새 창이 멋대로 못 뜨게 막아요</Callout>
    </Stage>
  );
}

export function DownloadUpload({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[{ x: 50, y: 18, icon: <Cloud />, size: 20, label: '인터넷' }, { x: 50, y: 64, icon: <Laptop />, sq: true, size: 18, label: '내 컴퓨터' }]} path={[0, 1, 0]} token={<FileText />} d={4.4} />
      <Tag x={20} y={34} fs={4} kind="blue">↓ 다운로드</Tag>
      <Tag x={80} y={46} fs={4} kind="dark">↑ 업로드</Tag>
      <Callout x={50} y={88} dir="down">받아 오기 · 올리기</Callout>
    </Stage>
  );
}

export function Zip({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[0, 1, 2].map((i) => <FileText key={i} className={s.zf} style={{ top: `${16 + i * 18}em`, ['--dy' as string]: `${(1 - i) * 18}em` }} />)}
      <span className={s.zipBox}><FileArchive /><span>.zip</span></span>
      <Callout x={50} y={80}>여러 파일을 봉투 하나에</Callout>
    </Stage>
  );
}

export function Zoom({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.keyCtrl}>Ctrl</span>
      <span className={s.wheel}><i /></span>
      <Win x={30} y={14} w={64} h={60} kind="browser" title="내 사이트">
        <span className={s.zoomed}>
          <B x={4} y={4} w={30} h={5} r={2.5} c="k" />
          <B x={4} y={13} w={40} h={14} r={3} c="s" />
          <T x={4} y={31} size={4}>가나다라</T>
        </span>
      </Win>
      <Callout x={62} y={80}>화면을 크게·작게</Callout>
    </Stage>
  );
}

export function Shortcuts({ playing }: P) {
  const d = 6;
  const list: [string, string][] = [['C', '복사'], ['V', '붙여 넣기'], ['Z', '되돌리기']];
  return (
    <Stage playing={playing}>
      {list.map(([k, t], i) => (
        <span key={k} className={s.layer} style={win(i, 3, d)}>
          <span className={s.keys}><b>Ctrl</b><i>+</i><b className={s.keyHit}>{k}</b></span>
          <T x={50} y={52} size={6} align="center" c="blue" weight={800}>{t}</T>
        </span>
      ))}
      <Callout x={50} y={74}>키 두 개로 빠르게</Callout>
    </Stage>
  );
}

export function Screenshot({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={10} w={84} h={62} kind="browser" title="내 앱">
        <B x={6} y={6} w={36} h={6} r={3} c="k" />
        <B x={6} y={16} w={50} h={20} r={3} c="s" />
        <B x={60} y={16} w={16} h={20} r={3} c="a" />
      </Win>
      <span className={s.selRect} />
      <span className={s.flash} />
      <span className={s.thumb}><Image /></span>
      <Callout x={50} y={82}>화면을 사진처럼 찍어요</Callout>
    </Stage>
  );
}

/* ───────── AI 답변 읽기 ───────── */

export function CodeBlock({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.answer}>
        <span className={s.ansText}>버튼을 이렇게 바꿔 보세요.</span>
        <span className={s.codeBox}>
          <span className={s.copyBtn}><Copy /></span>
          <span>&lt;button&gt;시작&lt;/button&gt;</span>
          <span>button {'{'} color: blue {'}'}</span>
        </span>
        <span className={s.ansText}>바꾼 뒤 새로고침해요.</span>
      </span>
      <Callout x={50} y={84} dir="down">회색 상자 안이 진짜 코드</Callout>
    </Stage>
  );
}

export function CopyAll({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.codeBig}>
        <span className={s.selAll} />
        {[70, 50, 80, 40, 60, 30].map((w, i) => <i key={i} style={{ width: `${w}%` }} />)}
        <span className={s.copyBig}><Copy /><span>복사</span></span>
        <span className={s.copied}><Check strokeWidth={3} /><span>복사됨</span></span>
      </span>
      <Tap x={78} y={22} at={0.3} d={4.4} size={9} />
      <Callout x={50} y={82}>버튼으로 빠짐없이 복사</Callout>
    </Stage>
  );
}

export function Markdown({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={4} y={14} w={44} h={54} title="쓰는 글" fs={3.6}>
        <span className={s.mdRaw}><span><K>#</K> 준비물</span><span><K>**</K>꼭<K>**</K> 챙기기</span><span><K>-</K> 연필</span><span><K>-</K> 지우개</span></span>
      </Win>
      <span className={s.arrowR} />
      <B x={60} y={14} w={36} h={54} r={4} c="w" />
      <span className={s.mdOut}><b>준비물</b><span><strong>꼭</strong> 챙기기</span><span>• 연필</span><span>• 지우개</span></span>
      <Callout x={50} y={78}>기호로 제목·굵게·목록을 표시해요</Callout>
    </Stage>
  );
}

export function LineNumber({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={10} y={12} w={80} h={60} title="app.js" fs={3.8}>
        <span className={s.lnHl} />
        <span className={s.ln}>
          {['let 점수 = 0', 'function 채점() {', '  점수 += 10', '}', 'show(점수)'].map((t, i) => <span key={i}><Cm>{i + 1}</Cm>&nbsp;&nbsp;{t}</span>)}
        </span>
      </Win>
      <Tag x={78} y={40} fs={4} kind="blue" className={s.lnTag}>3번째 줄</Tag>
      <Callout x={20} y={76}>위치를 짚는 번호</Callout>
    </Stage>
  );
}

export function Indentation({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={10} y={12} w={80} h={60} title="quiz.js" fs={3.8}>
        <span className={s.indent}>
          <span>if (정답) {'{'}</span>
          <span className={s.in1}>점수 += 10</span>
          <span className={s.in1}>if (다 맞힘) {'{'}</span>
          <span className={s.in2}>축하()</span>
          <span className={s.in1}>{'}'}</span>
          <span>{'}'}</span>
        </span>
      </Win>
      <Callout x={50} y={78}>안쪽에 든 코드를 들여 써요</Callout>
    </Stage>
  );
}

export function Brackets({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.br}>
        {['(', '{', '[', ']', '}', ''].map((c, i) => (
          <b key={i} className={`${s[`b${i}`]} ${c === '' ? s.missing : ''}`}>{c || ')'}</b>
        ))}
      </span>
      <span className={s.brX}><X strokeWidth={3.5} /></span>
      <Callout x={50} y={70}>여는 것과 닫는 것이 꼭 짝</Callout>
    </Stage>
  );
}

export function Quotes({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.qRow} style={{ top: '18em' }}><code>"사과"</code><span className={s.qOk}><Check strokeWidth={3.5} /></span></span>
      <span className={s.qRow} style={{ top: '42em' }}><code className={s.curly}>“사과”</code><span className={s.qNo}><X strokeWidth={3.5} /></span></span>
      <Callout x={50} y={72}>곧은 따옴표만 써요</Callout>
    </Stage>
  );
}

export function CaseSensitive({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.caseRow}><code>Button</code><b>≠</b><code>button</code></span>
      <span className={s.caseRow2}><code>Cat.png</code><b>≠</b><code>cat.png</code></span>
      <Callout x={50} y={72}>대문자·소문자는 다른 글자</Callout>
    </Stage>
  );
}

export function TruncatedCode({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={10} y={10} w={80} h={62} title="app.js" fs={3.8}>
        <span className={s.trunc}>
          <span>function 시작() {'{'}</span>
          <span className={s.gone}>&nbsp;&nbsp;문제 불러오기()</span>
          <span className={s.gone}>&nbsp;&nbsp;점수 = 0</span>
          <span className={s.gone}>&nbsp;&nbsp;타이머 켜기()</span>
          <span className={s.dots}><Cm>&nbsp;&nbsp;// 나머지는 그대로</Cm></span>
          <span>{'}'}</span>
        </span>
      </Win>
      <Callout x={50} y={78}>그대로 붙이면 코드가 사라져요</Callout>
    </Stage>
  );
}

/* ───────── 자주 만나는 문제 ───────── */

export function BlankScreen({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={8} w={88} h={50} kind="browser" title="내 앱" />
      <Win x={6} y={62} w={88} h={22} title="Console (F12)" fs={3.4} className={s.consoleUp}>
        <span className={s.redLine}>✖ SyntaxError: Unexpected token</span>
      </Win>
      <Callout x={50} y={30}>하얗기만 하면 콘솔부터</Callout>
    </Stage>
  );
}

export function Encoding({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      <Win x={12} y={14} w={76} h={46} kind="browser" title="공지">
        <T x={38} y={12} size={8} align="center" weight={700} style={win(0, 2, d)}>ì•ˆë…•</T>
        <T x={38} y={12} size={8} align="center" weight={700} c="blue" style={win(1, 2, d)}>안녕하세요</T>
      </Win>
      <Tag x={50} y={68} fs={4} kind="dark" style={win(1, 2, d)}>UTF-8로 저장</Tag>
      <Callout x={50} y={78}>한글이 이상한 글자로 보여요</Callout>
    </Stage>
  );
}

export function BrokenImage({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={10} w={50} h={56} kind="browser" title="갤러리">
        <span className={s.broken}><ImageOff /></span>
      </Win>
      <span className={s.names}>
        <span><Cm>코드:</Cm> <b><u>C</u>at.png</b></span>
        <span><Cm>파일:</Cm> <b><u>c</u>at.png</b></span>
      </span>
      <Callout x={50} y={80}>이름 한 글자만 달라도 못 찾아요</Callout>
    </Stage>
  );
}

export function NotUpdated({ playing }: P) {
  const d = 6;
  return (
    <Stage playing={playing}>
      <Steps items={['저장', 'Ctrl+Shift+R', '시크릿 창']} d={d} y={4} />
      <Win x={14} y={18} w={72} h={56} kind="browser" title="내 사이트">
        <B x={8} y={8} w={50} h={20} r={3} c="c" className={s.oldPage} />
        <B x={8} y={8} w={50} h={20} r={3} c="p" className={s.newPage} />
      </Win>
      <Callout x={50} y={82}>고쳤는데 그대로일 때 순서</Callout>
    </Stage>
  );
}

export function Freeze({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={12} y={12} w={76} h={58} kind="browser" title="내 앱">
        <B x={8} y={8} w={30} h={8} r={4} c="p" />
        <span className={s.veil}><Loader /></span>
      </Win>
      <Cursor className={s.clicky} />
      <Callout x={50} y={80}>눌러도 아무 반응이 없어요</Callout>
    </Stage>
  );
}

export function Regression({ playing }: P) {
  return (
    <Stage playing={playing}>
      {['버튼', '점수', '소리'].map((t, i) => (
        <span key={t} className={`${s.part} ${i === 0 ? s.fixedP : ''} ${i === 2 ? s.brokeP : ''}`} style={{ left: `${8 + i * 30}em` }}>
          <b>{t}</b>
          <span className={s.mark}>{i === 2 ? <X strokeWidth={3.5} /> : <Check strokeWidth={3.5} />}</span>
        </span>
      ))}
      <span className={s.wire2} />
      <Callout x={50} y={72}>하나 고쳤더니 다른 곳이 망가져요</Callout>
    </Stage>
  );
}

export function MobileBug({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={4} y={14} w={56} h={46} kind="browser" title="컴퓨터">
        <B x={4} y={4} w={30} h={5} r={2.5} c="k" />
        <B x={4} y={14} w={46} h={10} r={5} c="p"><T x={23} y={2.4} size={4} c="white" align="center">시작하기</T></B>
      </Win>
      <span className={s.phone}>
        <B x={3} y={6} w={16} h={4} r={2} c="k" />
        <span className={s.overflowBtn}><span>시작하기</span></span>
      </span>
      <Callout x={78} y={78}>휴대폰에서만 넘쳐요</Callout>
    </Stage>
  );
}
