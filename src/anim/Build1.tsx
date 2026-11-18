import {
  BookOpen, ChefHat, ConciergeBell, Dice5, File, FileCode2, Folder, FolderOpen, Gift, Image, Monitor,
  Package, Play, Puzzle, RefreshCw, Server, Sparkles, Star, Toolbox, User, Wrench,
} from 'lucide-react';
import { B, Cursor, T, Tap, win } from './kit';
import { Cm, Flow, K, Lines, Steps, Sx, Tag, Win } from './BuildKit';
import { Callout, Stage } from './Stage';
import s from './Build1.module.css';

/** 🛠 코드 기본 · 파일과 도구 */
type P = { playing: boolean };

/* ───────── 코드 기본 ───────── */

export function HtmlCssJs({ playing }: P) {
  const d = 6;
  return (
    <Stage playing={playing}>
      <Steps items={['HTML 뼈대', 'CSS 옷', 'JS 움직임']} d={d} />
      <Win x={14} y={18} w={72} h={58} kind="browser" title="내 웹페이지">
        <span className={s.layer} style={win(0, 3, d)}>
          <B x={4} y={4} w={40} h={5} r={0} c="n" className={s.dash} />
          <B x={4} y={13} w={58} h={16} r={0} c="n" className={s.dash} />
          <B x={4} y={33} w={22} h={8} r={0} c="n" className={s.dash} />
        </span>
        <span className={`${s.layer} ${s.dressed}`} style={{ animationDuration: `${d}s` }}>
          <B x={4} y={4} w={40} h={5} r={2.5} c="k" />
          <B x={4} y={13} w={58} h={16} r={3} c="s" />
          <B x={4} y={33} w={22} h={8} r={4} c="p" className={s.jsBtn} style={{ animationDuration: `${d}s` }} />
          <Star className={s.jsStar} style={{ animationDuration: `${d}s` }} />
        </span>
      </Win>
      <Callout x={50} y={80}>뼈대 → 옷 → 움직임</Callout>
    </Stage>
  );
}

function FrontBack({ playing, side }: P & { side: 'front' | 'back' }) {
  return (
    <Stage playing={playing}>
      <B x={4} y={10} w={44} h={66} r={4} c={side === 'front' ? 's' : 'a'} />
      <B x={52} y={10} w={44} h={66} r={4} c={side === 'back' ? 's' : 'a'} />
      <T x={26} y={14} size={4.4} align="center" c={side === 'front' ? 'blue' : 'sub'} weight={700}>프론트엔드</T>
      <T x={74} y={14} size={4.4} align="center" c={side === 'back' ? 'blue' : 'sub'} weight={700}>백엔드</T>
      <Flow
        nodes={[
          { x: 14, y: 46, icon: <User />, label: '사람', size: 15 },
          { x: 36, y: 46, icon: side === 'front' ? <Monitor /> : <ConciergeBell />, label: side === 'front' ? '화면' : '홀', sq: true, size: 15 },
          { x: 64, y: 46, icon: side === 'back' ? <ChefHat /> : <Server />, label: side === 'back' ? '주방' : '서버', sq: true, size: 15 },
          { x: 86, y: 46, icon: <Package />, label: '저장', sq: true, size: 15 },
        ]}
        path={[0, 1, 2, 3, 2, 1, 0]}
        d={5}
      />
      <Callout x={side === 'front' ? 26 : 74} y={78}>{side === 'front' ? '눈에 보이고 만지는 쪽' : '뒤에서 저장하고 처리하는 쪽'}</Callout>
    </Stage>
  );
}
export const Frontend = (p: P) => <FrontBack {...p} side="front" />;
export const Backend = (p: P) => <FrontBack {...p} side="back" />;

export function Component({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={6} y={30} w={26} h={30} r={4} c="s" style={{ border: '0.6em dashed var(--blue)' }} />
      <B x={9} y={39} w={20} h={10} r={5} c="p" />
      <T x={19} y={62} size={3.6} align="center" c="blue">버튼 조각</T>
      <Win x={42} y={10} w={52} h={70} kind="browser" title="화면">
        <B x={4} y={4} w={40} h={5} r={2} c="g" />
        <B x={4} y={12} w={42} h={12} r={2} c="a" />
        <B x={4} y={30} w={42} h={12} r={2} c="a" />
      </Win>
      {[0, 1, 2].map((i) => (
        <B key={i} x={9} y={39} w={20} h={10} r={5} c="p" className={s.copy} style={{ ['--tx' as string]: `${[38, 38, 38][i]}em`, ['--ty' as string]: `${[-9, 7, 23][i]}em`, animationDelay: `${i * 0.4}s` }} />
      ))}
      <Callout x={50} y={84} dir="down">한 번 만들어 여러 곳에 다시 써요</Callout>
    </Stage>
  );
}

export function State({ playing }: P) {
  const d = 4;
  return (
    <Stage playing={playing}>
      <B x={20} y={16} w={60} h={30} r={5} c="w" />
      <T x={28} y={27} size={5} weight={700}>소리</T>
      <span className={s.sw}><i /></span>
      <Tag x={50} y={60} fs={4.4} kind="dark"><span style={win(0, 2, d)}>켜짐 = false</span></Tag>
      <Tag x={50} y={60} fs={4.4} kind="blue" style={win(1, 2, d)}>켜짐 = true</Tag>
      <Tap x={66} y={31} at={0.5} d={d} size={10} />
      <Callout x={50} y={70}>화면이 지금 기억하는 값</Callout>
    </Stage>
  );
}

export function Variable({ playing }: P) {
  const d = 4.5;
  return (
    <Stage playing={playing}>
      <span className={s.boxV}><span className={s.lid} /></span>
      <Tag x={50} y={20} fs={5} kind="dark">점수</Tag>
      {['0', '10', '20'].map((v, i) => <T key={v} x={50} y={46} size={14} align="center" c="blue" weight={800} style={win(i, 3, d)}>{v}</T>)}
      <Tag x={50} y={72} fs={4} kind="plain"><code className={s.mono}>점수 = 점수 + 10</code></Tag>
      <Callout x={50} y={80}>값을 담는 이름표 붙은 상자</Callout>
    </Stage>
  );
}

export function Func({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={30} y={26} w={40} h={28} r={5} c="d" />
      <T x={50} y={34} size={5.4} c="white" align="center" weight={700}>정답확인()</T>
      <Wrench className={s.gear} />
      <Tag x={14} y={40} fs={4.4} kind="gray" className={s.fin}>"고래"</Tag>
      <Tag x={86} y={40} fs={4.4} kind="blue" className={s.fout}>⭕ 맞아요</Tag>
      <Tag x={50} y={66} fs={3.6} kind="plain" className={s.callAgain}><span className={s.mono}>정답확인() · 정답확인() · …</span></Tag>
      <Callout x={50} y={76}>일을 묶어 이름 붙이고 불러 써요</Callout>
    </Stage>
  );
}

export function Event({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      <Win x={14} y={12} w={72} h={56} kind="browser" title="퀴즈">
        <B x={20} y={18} w={28} h={10} r={5} c="p"><T x={14} y={2.6} size={4.4} c="white" align="center">제출</T></B>
      </Win>
      <Cursor className={s.evCursor} />
      <Tag x={70} y={32} fs={4.4} kind="blue" className={s.evPop} style={win(0, 2, d)}>click!</Tag>
      <Tag x={70} y={32} fs={4.4} kind="dark" className={s.evPop} style={win(1, 2, d)}>keydown!</Tag>
      <Callout x={50} y={74}>사용자가 한 행동을 알아채요</Callout>
    </Stage>
  );
}

export function IfStatement({ playing }: P) {
  const d = 4.4;
  const nodes = [
    { x: 14, y: 42, icon: <User />, size: 15 },
    { x: 48, y: 42, icon: <span className={s.q}>정답?</span>, sq: true, size: 22 },
    { x: 84, y: 22, icon: <span className={s.mark}>⭕</span>, size: 15, label: '맞으면' },
    { x: 84, y: 62, icon: <span className={s.mark}>✖</span>, size: 15, label: '아니면' },
  ];
  return (
    <Stage playing={playing}>
      <Flow nodes={nodes} path={[0, 1, 2]} arrows={[[0, 1], [1, 2], [1, 3]]} d={d} style={win(0, 2, d * 2)} />
      <Flow nodes={nodes} path={[0, 1, 3]} arrows={[[0, 1], [1, 2], [1, 3]]} d={d} style={win(1, 2, d * 2)} />
      <Callout x={50} y={80}>상황에 따라 길이 갈라져요</Callout>
    </Stage>
  );
}

export function LoopStatement({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.ring} />
      <span className={s.orbit}><i /></span>
      <RefreshCw className={s.loopIcon} />
      {[0, 1, 2].map((i) => <Star key={i} className={s.loopStar} style={{ left: `${30 + i * 16}em`, animationDelay: `${i * 1.2}s` }} />)}
      <Callout x={50} y={84} dir="down">같은 일을 여러 번 되풀이</Callout>
    </Stage>
  );
}

export function ArrayAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <T x={8} y={24} size={6} c="sub" weight={700}>[</T>
      <T x={88} y={24} size={6} c="sub" weight={700}>]</T>
      {['사과', '배', '포도'].map((t, i) => (
        <span key={t}>
          <B x={14 + i * 25} y={22} w={22} h={18} r={3} c="a" />
          <Tag x={25 + i * 25} y={31} fs={4.6} kind="blue" className={s.drop} style={{ animationDelay: `${i * 0.5}s` }}>{t}</Tag>
          <T x={25 + i * 25} y={44} size={4} c="sub" align="center">{i}번</T>
        </span>
      ))}
      <Callout x={50} y={64}>여러 값을 순서대로 담은 목록</Callout>
    </Stage>
  );
}

export function Json({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={12} y={12} w={76} h={58} title="학생.json" fs={4.6}>
        <Lines n={4}>
          <span>{'{'}</span>
          <span>&nbsp;&nbsp;<K>"이름"</K>: <Sx>"민준"</Sx>,</span>
          <span>&nbsp;&nbsp;<K>"점수"</K>: <Sx>90</Sx></span>
          <span>{'}'}</span>
        </Lines>
      </Win>
      <Callout x={50} y={74}>"이름": 값 짝으로 적어요</Callout>
    </Stage>
  );
}

export function Comment({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={10} y={12} w={80} h={58} title="quiz.js" fs={4.2}>
        <span className={s.run} />
        <span className={s.code}>
          <span><Cm>// 정답 확인하는 곳</Cm></span>
          <span><K>if</K> (답 === 정답) {'{'}</span>
          <span>&nbsp;&nbsp;점수 += 10</span>
          <span>{'}'}</span>
        </span>
      </Win>
      <Tag x={74} y={24} fs={3.4} kind="soft">사람 보라고 쓴 메모</Tag>
      <Callout x={50} y={74}>실행할 때는 건너뛰어요</Callout>
    </Stage>
  );
}

export function Async({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[{ x: 30, y: 26, icon: <Monitor />, sq: true, size: 15, label: '화면' }, { x: 80, y: 26, icon: <Server />, sq: true, size: 15, label: '서버' }]} path={[0, 1, 0]} d={4.4} />
      <B x={8} y={52} w={84} h={24} r={4} c="a" />
      <T x={12} y={55} size={3.6} c="sub">기다리는 동안에도</T>
      <B x={14} y={62} w={22} h={10} r={5} c="p" />
      <Tap x={25} y={67} at={0.25} d={1.4} size={8} />
      <Star className={s.asyncStar} />
      <Callout x={50} y={84} dir="down">화면이 멈추지 않아요</Callout>
    </Stage>
  );
}

export function Random({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Dice5 className={s.dice} />
      {[0, 1, 2, 3].map((i) => (
        <B key={i} x={10 + i * 21} y={44} w={17} h={22} r={3} c="a" className={s[`rnd${i}`]}>
          <T x={8.5} y={7} size={5.4} align="center" c="sub">{i + 1}</T>
        </B>
      ))}
      <Callout x={50} y={72}>무엇이 뽑힐지 몰라요</Callout>
    </Stage>
  );
}

export function Framework({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.frameHouse}>
        <svg viewBox="0 0 60 50">
          <path d="M4 22 L30 4 L56 22 M8 20 V46 H52 V20 M8 33 H52 M30 20 V46" pathLength="100" />
        </svg>
      </span>
      {[[24, 44], [48, 44], [24, 60], [48, 60]].map(([x, y], i) => (
        <B key={i} x={x} y={y} w={20} h={12} r={1.4} c={i === 0 ? 'p' : 's'} className={s.fill} style={{ animationDelay: `${1.2 + i * 0.35}s` }} />
      ))}
      <Callout x={50} y={80}>틀과 규칙이 먼저 있고, 안을 채워요</Callout>
    </Stage>
  );
}

export function Library({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Toolbox className={s.toolbox} />
      <Win x={50} y={16} w={44} h={50} kind="browser" title="내 앱">
        <B x={3} y={3} w={30} h={4} r={2} c="g" />
      </Win>
      <span className={s.tool}><Sparkles /></span>
      <Callout x={50} y={80}>필요한 기능만 꺼내 써요</Callout>
    </Stage>
  );
}

export function SingleHtml({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.bigFile}>
        <span className={s.fold} />
        {['HTML', 'CSS', 'JS'].map((t, i) => (
          <span key={t} className={s.strip} style={{ animationDelay: `${i * 0.5}s` }}><span>{t}</span></span>
        ))}
      </span>
      <Tag x={50} y={78} fs={4.4} kind="dark">index.html 하나</Tag>
      <Callout x={50} y={84}>파일 하나에 다 들어 있어요</Callout>
    </Stage>
  );
}

export function NpmInstall({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={10} w={58} h={40} kind="term" fs={3.8}>
        <Lines n={3}>
          <span><K>$</K> npm install</span>
          <span className={s.dim}>내려받는 중…</span>
          <span><K>✓</K> 3개 설치</span>
        </Lines>
      </Win>
      <span className={s.nodeMods}><FolderOpen /><span>node_modules</span></span>
      {[0, 1, 2].map((i) => <Gift key={i} className={s.pkg} style={{ left: `${70 + i * 8}em`, animationDelay: `${0.6 + i * 0.4}s` }} />)}
      <Callout x={50} y={84} dir="down">남이 만든 코드 묶음을 내려받아요</Callout>
    </Stage>
  );
}

export function HtmlVsReact({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={4} y={14} w={44} h={66} r={4} c="a" />
      <B x={52} y={14} w={44} h={66} r={4} c="s" />
      <T x={26} y={19} size={4.2} align="center" weight={700}>단일 HTML</T>
      <T x={74} y={19} size={4.2} align="center" weight={700} c="blue">리액트 프로젝트</T>
      <File className={s.oneFile} />
      <span className={s.tree}>
        {['src', '  App.tsx', '  Card.tsx', '  Quiz.tsx', 'package.json'].map((t, i) => (
          <span key={t} style={{ animationDelay: `${i * 0.3}s` }}>{t.startsWith(' ') ? <FileCode2 /> : <Folder />}{t.trim()}</span>
        ))}
      </span>
      <Callout x={50} y={84} dir="down">간단하면 하나, 크면 나눠서</Callout>
    </Stage>
  );
}

/* ───────── 파일과 도구 ───────── */

function Tree({ hl = -1 }: { hl?: number }) {
  const rows: [number, string, boolean][] = [[0, '내 프로젝트', true], [1, 'images', true], [2, 'cat.png', false], [1, 'src', true], [2, 'app.js', false], [1, 'index.html', false]];
  return (
    <span className={s.ftree}>
      {rows.map(([lv, t, dir], i) => (
        <span key={t} className={i <= 2 && hl >= 0 ? s.onPath : undefined} style={{ paddingLeft: `${lv * 1.4}em`, animationDelay: `${i * 0.3}s` }}>
          {dir ? <Folder /> : t.endsWith('.png') ? <Image /> : <FileCode2 />}{t}
        </span>
      ))}
    </span>
  );
}

export function FolderStructure({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Tree />
      <Callout x={50} y={82}>파일을 서랍처럼 나눠 담아요</Callout>
    </Stage>
  );
}

export function PathAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Tree hl={2} />
      <Tag x={50} y={78} fs={4.6} kind="dark" className={s.pathTag}><span>images</span><span>/cat.png</span></Tag>
      <Callout x={50} y={84}>파일이 있는 위치 주소</Callout>
    </Stage>
  );
}

export function FileExtension({ playing }: P) {
  const d = 4.5;
  const ex: [string, React.ReactNode][] = [['.png', <Image key="i" />], ['.html', <FileCode2 key="c" />], ['.mp3', <Play key="p" />]];
  return (
    <Stage playing={playing}>
      {ex.map(([e, ic], i) => (
        <span key={e} className={s.layer} style={win(i, 3, d)}>
          <span className={s.extIcon}>{ic}</span>
          <T x={48} y={66} size={7} align="right" weight={700}>cat</T>
          <T x={48} y={66} size={7} weight={800} c="blue">{e}</T>
        </span>
      ))}
      <Callout x={60} y={80}>끝부분이 파일 종류를 알려 줘요</Callout>
    </Stage>
  );
}

export function FileNaming({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Tag x={50} y={28} fs={5.4} kind="gray" className={s.badName}>내 파일 1.HTML</Tag>
      <Tag x={50} y={54} fs={5.4} kind="blue" className={s.goodName}>my-file-1.html</Tag>
      <T x={50} y={66} size={3.6} align="center" c="sub" className={s.goodName}>소문자 · 숫자 · 하이픈(-)</T>
      <Callout x={50} y={78}>한글·띄어쓰기는 빼요</Callout>
    </Stage>
  );
}

export function IndexHtml({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 16, y: 40, icon: <span className={s.q}>주소</span>, sq: true, size: 18 },
        { x: 50, y: 40, icon: <Folder />, sq: true, size: 18 },
        { x: 84, y: 40, icon: <FileCode2 />, sq: true, size: 18, label: 'index.html' },
      ]} d={4.4} />
      <T x={50} y={53} size={3.4} align="center" c="sub">about.html · quiz.html</T>
      <Callout x={50} y={72}>들어오면 가장 먼저 열리는 파일</Callout>
    </Stage>
  );
}

export function Readme({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={10} w={84} h={68} kind="plain" title="내 프로젝트" fs={3.8}>
        <span className={s.files}>
          <span><Folder />src</span>
          <span className={s.readmeRow}><BookOpen />README.md</span>
        </span>
        <span className={s.doc}>
          <b># 받아쓰기 퀴즈</b>
          <span>사용법: 1. 시작 누르기</span>
          <span>2. 듣고 쓰기</span>
        </span>
      </Win>
      <Callout x={50} y={82}>이 프로젝트 설명서</Callout>
    </Stage>
  );
}

export function CodeEditor({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={10} w={88} h={68} title="app.js" fs={3.8}>
        <span className={s.side}>{[0, 1, 2, 3].map((i) => <i key={i} className={i === 1 ? s.on : undefined} />)}</span>
        <span className={s.edLines}>
          <Lines n={4}>
            <span><Cm>1</Cm>&nbsp;<K>const</K> 점수 = 0</span>
            <span><Cm>2</Cm>&nbsp;<K>function</K> 채점() {'{'}</span>
            <span><Cm>3</Cm>&nbsp;&nbsp;&nbsp;점수 += 10</span>
            <span><Cm>4</Cm>&nbsp;{'}'}<span className={s.caret} /></span>
          </Lines>
        </span>
      </Win>
      <Callout x={50} y={82}>코드를 쓰고 고치는 프로그램</Callout>
    </Stage>
  );
}

export function TerminalAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={12} w={84} h={58} kind="term" fs={4.2}>
        <Lines n={4}>
          <span><K>$</K> npm run dev</span>
          <span className={s.dim}>준비하는 중…</span>
          <span><K>➜</K> localhost:5173</span>
          <span><K>$</K> <span className={s.caretW} /></span>
        </Lines>
      </Win>
      <Callout x={50} y={74}>글자 명령어로 일을 시켜요</Callout>
    </Stage>
  );
}

export function Devtools({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={10} w={88} h={68} kind="browser" title="내 사이트">
        <B x={3} y={3} w={30} h={4} r={2} c="g" />
        <B x={3} y={10} w={30} h={18} r={2} c="a" />
        <span className={s.dev}>
          <span className={s.devTabs}><b>Elements</b><span>Console</span></span>
          {[70, 50, 80, 40, 60].map((w, i) => <i key={i} style={{ width: `${w}%` }} />)}
        </span>
      </Win>
      <Tag x={22} y={58} fs={5} kind="dark" className={s.f12}>F12</Tag>
      <Callout x={70} y={82}>오류와 휴대폰 크기 보기가 여기에</Callout>
    </Stage>
  );
}

export function Extension({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={10} y={18} w={80} h={56} title="편집기" fs={1}>
        <span className={s.slots}>{[0, 1, 2].map((i) => <i key={i} />)}<i className={s.slotEmpty} /></span>
      </Win>
      <span className={s.puzzle}><Puzzle /></span>
      <Callout x={50} y={80}>기능을 끼워 더해요</Callout>
    </Stage>
  );
}

