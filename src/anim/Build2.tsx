import {
  Bug, Check, Copy, Database, Eye, EyeOff, FileSpreadsheet, FileText, Globe, HardDrive, Image, KeyRound, Laptop, Lock, LockOpen,
  MessageSquare, RefreshCw, Search, Server, ShieldCheck, Smartphone, Sun, TriangleAlert, Unplug, User, Users, X,
} from 'lucide-react';
import { B, T, Tap, win } from './kit';
import { Cm, Flow, K, Lines, Steps, Sx, Tag, Win } from './BuildKit';
import { Callout, Stage } from './Stage';
import s from './Build2.module.css';

/** 🛠 데이터와 저장 · 보안과 개인정보 · 문제 해결 */
type P = { playing: boolean };

/** 작은 표 (행 rows, 열 cols). 안의 칸은 회색 막대 */
function Grid({ x, y, w, rows, cols, rh = 8, head = true, className = '', cell }: {
  x: number; y: number; w: number; rows: number; cols: number; rh?: number; head?: boolean; className?: string;
  cell?: (r: number, c: number) => string | undefined;
}) {
  return (
    <span className={`${s.grid} ${className}`} style={{ left: `${x}em`, top: `${y}em`, width: `${w}em`, gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: `${rh}em` }}>
      {Array.from({ length: (rows + (head ? 1 : 0)) * cols }, (_, i) => {
        const r = Math.floor(i / cols) - (head ? 1 : 0), c = i % cols;
        return <i key={i} className={`${r < 0 ? s.head : ''} ${cell?.(r, c) ?? ''}`} />;
      })}
    </span>
  );
}

/* ───────── 데이터와 저장 ───────── */

export function DatabaseAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 16, y: 30, icon: <Laptop />, sq: true, size: 17, label: '컴퓨터' },
        { x: 50, y: 52, icon: <Database />, size: 22, label: '데이터베이스' },
        { x: 84, y: 30, icon: <Smartphone />, sq: true, size: 17, label: '휴대폰' },
      ]} d={4.4} />
      <Callout x={50} y={80}>어느 기기에서나 같은 내용</Callout>
    </Stage>
  );
}

export function Crud({ playing }: P) {
  const d = 8;
  return (
    <Stage playing={playing}>
      <Steps items={['만들기', '읽기', '고치기', '지우기']} d={d} />
      <Grid x={14} y={20} w={72} rows={3} cols={3} />
      <span className={s.newRow} style={{ animationDuration: `${d}s` }} />
      <span className={s.readRow} style={{ animationDuration: `${d}s` }} />
      <span className={s.editCell} style={{ animationDuration: `${d}s` }} />
      <span className={s.delRow} style={{ animationDuration: `${d}s` }} />
      <Callout x={50} y={70}>데이터로 하는 네 가지 일</Callout>
    </Stage>
  );
}

export function TableRowCol({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Grid x={14} y={12} w={72} rows={4} cols={4} />
      <span className={s.rowHl}><b>행</b></span>
      <span className={s.colHl}><b>열</b></span>
      <Callout x={50} y={74}>가로줄은 한 건, 세로줄은 항목</Callout>
    </Stage>
  );
}

export function Schema({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.schema}>
        {[['이름', '글자'], ['점수', '숫자'], ['날짜', '날짜']].map(([a, b]) => (
          <span key={a}><b>{a}</b><i>{b}</i></span>
        ))}
      </span>
      {[0, 1].map((i) => <B key={i} x={14} y={40 + i * 11} w={72} h={8} r={1.6} c="a" className={s.fitRow} style={{ animationDelay: `${0.4 + i * 0.4}s` }} />)}
      <Callout x={50} y={70}>칸 이름과 종류를 정한 설계도</Callout>
    </Stage>
  );
}

export function LocalStorage({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={4} y={12} w={56} h={62} kind="browser" title="내 브라우저">
        <B x={6} y={6} w={34} h={8} r={4} c="p" />
        <span className={s.box}><HardDrive /></span>
      </Win>
      <span className={s.saveDot} />
      <B x={68} y={20} w={26} h={44} r={5} c="w" />
      <Smartphone className={s.phoneIcon} />
      <X className={s.noX} strokeWidth={3} />
      <Callout x={32} y={78}>이 브라우저 안에만 저장돼요</Callout>
    </Stage>
  );
}

export function Storage({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[{ x: 16, y: 40, icon: <Image />, sq: true, size: 16, label: '사진' }, { x: 74, y: 40, icon: <HardDrive />, sq: true, size: 26, label: '스토리지' }]} d={3.6} />
      <span className={s.dbSide}><Database /><span>데이터베이스</span></span>
      <Callout x={50} y={80}>사진·파일은 창고에 따로</Callout>
    </Stage>
  );
}

export function SheetDb({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={6} y={20} w={30} h={46} r={4} c="w" />
      <B x={10} y={26} w={22} h={6} r={2} c="a" />
      <B x={10} y={36} w={22} h={6} r={2} c="a" />
      <B x={10} y={50} w={22} h={8} r={4} c="p" />
      <Tap x={21} y={54} at={0.2} d={4.4} size={8} />
      <FileSpreadsheet className={s.sheetIcon} />
      <Grid x={46} y={24} w={48} rows={3} cols={3} rh={7} cell={(r) => (r === 2 ? s.newCell : undefined)} />
      <Callout x={50} y={78}>구글 시트에 한 줄씩 쌓여요</Callout>
    </Stage>
  );
}

export function Csv({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      <span className={s.layer} style={win(0, 2, d)}>
        <Win x={14} y={16} w={72} h={44} kind="plain" title="점수.csv" fs={5}>
          <span className={s.csv}>이름<b>,</b>점수<br />민준<b>,</b>90<br />서연<b>,</b>85</span>
        </Win>
      </span>
      <span className={s.layer} style={win(1, 2, d)}>
        <span className={s.csvTable}>
          {['이름', '점수', '민준', '90', '서연', '85'].map((t, i) => <span key={i} className={i < 2 ? s.th : undefined}>{t}</span>)}
        </span>
      </span>
      <Callout x={50} y={74}>쉼표로 칸을 나눈 표</Callout>
    </Stage>
  );
}

export function Api({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 14, y: 40, icon: <Smartphone />, sq: true, size: 16, label: '내 앱' },
        { x: 50, y: 40, icon: <span className={s.word}>API</span>, sq: true, size: 18, label: '창구' },
        { x: 86, y: 40, icon: <Server />, sq: true, size: 16, label: '날씨 서비스' },
      ]} path={[0, 1, 2, 1, 0]} d={5} />
      <Sun className={s.sunBack} />
      <Callout x={50} y={74}>주문하면 데이터를 받아 와요</Callout>
    </Stage>
  );
}

export function ApiKey({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.lockBox}>
        <Lock className={s.locked} />
        <LockOpen className={s.unlocked} />
      </span>
      <span className={s.keyFly}><KeyRound /></span>
      <span className={s.flowData}>{[0, 1, 2].map((i) => <i key={i} style={{ animationDelay: `${i * 0.3}s` }} />)}</span>
      <Callout x={50} y={74}>열쇠가 있어야 문이 열려요</Callout>
    </Stage>
  );
}

export function EnvVariable({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={12} w={58} h={34} title="app.js" fs={3.6}>
        <span className={s.envCode}>
          <span className={s.envBefore}>키 = <Sx>"sk-12ab…"</Sx></span>
          <span className={s.envAfter}>키 = <K>env</K>.API_KEY</span>
        </span>
      </Win>
      <span className={s.vault}><Lock /><span>.env</span></span>
      <span className={s.keyMove}><KeyRound /></span>
      <Callout x={50} y={80}>비밀 값은 코드 밖 금고에</Callout>
    </Stage>
  );
}

export function Authentication({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      <B x={24} y={10} w={52} h={62} r={5} c="w" />
      <span className={s.layer} style={win(0, 2, d)}>
        <T x={50} y={16} size={5} align="center" weight={700}>로그인</T>
        <B x={30} y={28} w={40} h={9} r={2.4} c="a"><span className={s.typed}>minjun</span></B>
        <B x={30} y={40} w={40} h={9} r={2.4} c="a"><span className={s.typed}>●●●●●●</span></B>
        <B x={30} y={54} w={40} h={10} r={5} c="p"><T x={20} y={2.6} size={4.2} c="white" align="center">들어가기</T></B>
      </span>
      <span className={s.layer} style={win(1, 2, d)}>
        <span className={s.avatar}><User /></span>
        <T x={50} y={50} size={5.4} align="center" weight={700}>민준 님</T>
        <ShieldCheck className={s.shield} />
      </span>
      <Callout x={50} y={78}>누구인지 확인해요</Callout>
    </Stage>
  );
}

export function Realtime({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[6, 52].map((x, k) => (
        <B key={x} x={x} y={12} w={42} h={56} r={4} c="w">
          <B x={3} y={4} w={30} h={7} r={3.5} c="a" />
          <B x={3} y={14} w={26} h={7} r={3.5} c="a" />
          <B x={3} y={24} w={32} h={7} r={3.5} c="p" className={k === 0 ? s.msgA : s.msgB} />
        </B>
      ))}
      <Tag x={27} y={74} fs={3.6} kind="gray">내 화면</Tag>
      <Tag x={73} y={74} fs={3.6} kind="gray">친구 화면</Tag>
      <Callout x={73} y={52}>새로고침 없이 바로</Callout>
    </Stage>
  );
}

export function Backup({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.dbA}><Database /></span>
      <span className={s.dbCopy}><Database /></span>
      <Tag x={30} y={66} fs={3.6} kind="gray">원본</Tag>
      <Tag x={70} y={66} fs={3.6} kind="soft">복사본</Tag>
      <RefreshCw className={s.restore} />
      <Callout x={50} y={78}>잃어버려도 되찾을 수 있게</Callout>
    </Stage>
  );
}

export function Sync({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={6} y={18} w={44} h={34} r={3} c="w" />
      <B x={18} y={52} w={20} h={3} r={0} c="c" />
      <B x={68} y={14} w={24} h={44} r={4} c="w" />
      {[0, 1].map((i) => (
        <span key={i}>
          <B x={10} y={22 + i * 9} w={36} h={6} r={2} c="a" />
          <B x={71} y={19 + i * 9} w={18} h={6} r={2} c="a" />
        </span>
      ))}
      <B x={10} y={40} w={36} h={6} r={2} c="p" className={s.syncA} />
      <B x={71} y={37} w={18} h={6} r={2} c="p" className={s.syncB} />
      <RefreshCw className={s.syncIcon} />
      <Callout x={50} y={74}>여러 기기 내용을 똑같이</Callout>
    </Stage>
  );
}

/* ───────── 보안과 개인정보 ───────── */

export function PersonalInfo({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={20} y={8} w={60} h={64} r={4} c="w" />
      {['이름', '사진', '전화번호', '주소', '생일'].map((t, i) => (
        <span key={t} className={`${s.field} ${i > 0 ? s.cut : ''}`} style={{ top: `${14 + i * 11}em`, animationDelay: `${i * 0.2}s` }}>
          <span>{t}</span>
        </span>
      ))}
      <Callout x={50} y={78}>꼭 필요한 만큼만 받아요</Callout>
    </Stage>
  );
}

export function Anonymization({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      {[['김민준', '학생 1'], ['이서연', '학생 2'], ['박지호', '학생 3']].map(([a, b], i) => (
        <span key={a}>
          <B x={22} y={14 + i * 18} w={56} h={14} r={3} c="a" />
          <T x={50} y={18 + i * 18} size={5.4} align="center" style={win(0, 2, d)}>{a}</T>
          <T x={50} y={18 + i * 18} size={5.4} align="center" c="blue" weight={700} style={win(1, 2, d)}>{b}</T>
        </span>
      ))}
      <EyeOff className={s.eyeOff} />
      <Callout x={50} y={70}>누구인지 모르게 바꿔요</Callout>
    </Stage>
  );
}

export function Https({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.addr}><Lock /><span>https://eunti.com</span></span>
      <Flow nodes={[{ x: 16, y: 54, icon: <User />, size: 15 }, { x: 84, y: 54, icon: <Server />, sq: true, size: 15 }]} token={<span className={s.scramble}><b>비번</b><b>●●</b></span>} d={3.6} tokenClass={s.wideToken} />
      <Callout x={50} y={74}>가는 길에는 암호로 바뀌어요</Callout>
    </Stage>
  );
}

export function AccessControl({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      <B x={30} y={10} w={40} h={50} r={3} c="w">
        <FileText className={s.docIcon} />
      </B>
      <span className={s.who} style={win(0, 2, d)}>
        <Tag x={50} y={70} fs={4.2} kind="blue"><User />교사 · 삭제 가능</Tag>
        <Check className={s.okMark} strokeWidth={3} />
      </span>
      <span className={s.who} style={win(1, 2, d)}>
        <Tag x={50} y={70} fs={4.2} kind="gray"><Users />학생 · 보기만</Tag>
        <Lock className={s.lockMark} />
      </span>
      <Callout x={50} y={82}>누가 무엇을 할 수 있는지</Callout>
    </Stage>
  );
}

export function Rls({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={i % 2 === 0 ? s.mine : s.others}>
          <B x={14} y={10 + i * 13} w={72} h={10} r={2.4} c={i % 2 === 0 ? 's' : 'a'} />
          <span className={s.owner} style={{ top: `${11 + i * 13}em` }}>{i % 2 === 0 ? <User /> : <Users />}</span>
        </span>
      ))}
      <Tag x={50} y={66} fs={3.8} kind="dark"><User />민준이 볼 때</Tag>
      <Callout x={50} y={74}>자기 기록만 보여요</Callout>
    </Stage>
  );
}

export function SecretLeak({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={10} w={52} h={48} kind="browser" title="공개 저장소">
        <Globe className={s.globe} />
        <span className={s.leakKey}><KeyRound /></span>
      </Win>
      {[0, 1, 2].map((i) => (
        <span key={i} className={s.thief} style={{ top: `${16 + i * 18}em`, animationDelay: `${0.6 + i * 0.4}s` }}><User /><KeyRound /></span>
      ))}
      <TriangleAlert className={s.warn} />
      <Callout x={34} y={74}>비밀 열쇠를 남도 쓸 수 있게 돼요</Callout>
    </Stage>
  );
}

export function PublicPrivate({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={4} y={10} w={44} h={64} r={4} c="a" />
      <B x={52} y={10} w={44} h={64} r={4} c="a" />
      <T x={26} y={14} size={4.4} align="center" weight={700}>공개</T>
      <T x={74} y={14} size={4.4} align="center" weight={700}>비공개</T>
      <Globe className={s.pubIcon} />
      {[0, 1, 2, 3].map((i) => <Eye key={i} className={s.eyes} style={{ left: `${8 + i * 9.4}em`, animationDelay: `${i * 0.25}s` }} />)}
      <Lock className={s.privIcon} />
      <span className={s.me}><User /></span>
      <Callout x={50} y={80}>누구나 보거나, 나만 보거나</Callout>
    </Stage>
  );
}

/* ───────── 문제 해결 ───────── */

export function Console({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={6} y={10} w={88} h={64} title="Console" fs={3.8}>
        <Lines n={4}>
          <span><Cm>›</Cm> 시작했어요</span>
          <span><Cm>›</Cm> 점수: 10</span>
          <span className={s.errLine}><TriangleAlert /> 점수 is not defined</span>
          <span><Cm>›</Cm> <span className={s.caret} /></span>
        </Lines>
      </Win>
      <Callout x={50} y={78}>오류 메시지가 쌓이는 창</Callout>
    </Stage>
  );
}

export function ErrorMessage({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.errBox}><TriangleAlert /><span>TypeError: 점수 is undefined</span></span>
      <span className={s.copyIcon}><Copy /></span>
      <span className={s.chat}><MessageSquare /><span>TypeError: 점수…</span></span>
      <Callout x={50} y={80}>통째로 복사해 AI에게 줘요</Callout>
    </Stage>
  );
}

export function BugAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={18} y={14} w={64} h={52} r={4} c="w" />
      <T x={50} y={22} size={5} align="center" c="sub">점수</T>
      <T x={50} y={30} size={10} align="center" weight={800} className={s.badScore}><span /></T>
      <B x={36} y={50} w={28} h={10} r={5} c="p" />
      <Tap x={50} y={55} at={0.2} d={4} size={9} />
      <Bug className={s.bugIcon} />
      <Callout x={50} y={74}>+10 눌렀는데 줄어들어요</Callout>
    </Stage>
  );
}

export function Debugging({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={10} w={84} h={56} title="quiz.js" fs={4}>
        <span className={s.dbgLines}>
          <span>점수 = 0</span>
          <span className={s.badLine}><span className={s.wrong}>점수 -= 10</span><span className={s.right}>점수 += 10</span></span>
          <span>보여주기(점수)</span>
        </span>
      </Win>
      <Search className={s.lens} />
      <span className={s.fixed}><Check strokeWidth={3.5} /></span>
      <Callout x={50} y={76}>원인을 찾아서 고쳐요</Callout>
    </Stage>
  );
}

export function Cache({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={4} y={14} w={50} h={50} kind="browser" title="내 사이트">
        <B x={8} y={8} w={30} h={20} r={3} c="c" />
        <T x={23} y={32} size={3.6} align="center" c="sub">예전 모습</T>
      </Win>
      <span className={s.cacheBox}><span>캐시</span><i /></span>
      <span className={s.newFile}><b>새로 고친 파일</b><i /></span>
      <X className={s.blocked} strokeWidth={3} />
      <Callout x={30} y={70}>저장해 둔 예전 파일을 보여 줘요</Callout>
    </Stage>
  );
}

export function HardRefresh({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.keys}>{['Ctrl', 'Shift', 'R'].map((k, i) => <b key={k} style={{ animationDelay: `${i * 0.15}s` }}>{k}</b>)}</span>
      <Win x={18} y={26} w={64} h={46} kind="browser" title="내 사이트">
        <B x={8} y={6} w={44} h={20} r={3} c="c" className={s.oldV} />
        <B x={8} y={6} w={44} h={20} r={3} c="p" className={s.newV} />
        <RefreshCw className={s.spin} />
      </Win>
      <Callout x={50} y={80}>예전 파일 무시하고 새로</Callout>
    </Stage>
  );
}

export function Localhost({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={14} w={56} h={44} kind="browser" title="localhost:5173">
        <B x={6} y={6} w={30} h={6} r={3} c="k" />
        <B x={6} y={16} w={40} h={12} r={3} c="s" className={s.pop} />
      </Win>
      <B x={4} y={58} w={64} h={4} r={2} c="c" />
      <span className={s.globeOff}><Globe /><Unplug /></span>
      <Callout x={36} y={70}>내 컴퓨터에서만 열려요</Callout>
    </Stage>
  );
}
