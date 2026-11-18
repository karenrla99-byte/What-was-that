import {
  Check, CircleDot, Cloud, Code2, Eye, FileCode2, FileImage, FileText, Folder, Gauge, GitFork, GitMerge, GitPullRequest, Globe,
  Laptop, MessageSquare, Package, QrCode, Rocket, Server, Smartphone, Store, TriangleAlert, User, Users, X,
} from 'lucide-react';
import { B, Pic, T, win } from './kit';
import { Flow, Lines, Tag, Win } from './BuildKit';
import { Callout, Stage } from './Stage';
import s from './Build3.module.css';

/** 🛠 버전 관리 · 배포와 공유 · 속도 */
type P = { playing: boolean };

/** 커밋 줄: 점이 차례로 생김 */
function Dots({ x, y, n, gap = 14, c = 'gray', delay = 0, className = '' }: { x: number; y: number; n: number; gap?: number; c?: 'gray' | 'blue'; delay?: number; className?: string }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`${s.dot} ${c === 'blue' ? s.dotB : ''} ${className}`} style={{ left: `${x + i * gap}em`, top: `${y}em`, animationDelay: `${delay + i * 0.35}s` }} />
      ))}
    </>
  );
}

/* ───────── 버전 관리 ───────── */

export function Github({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 16, y: 56, icon: <Laptop />, sq: true, size: 16, label: '나' },
        { x: 50, y: 24, icon: <Cloud />, size: 24, label: 'GitHub', hot: true },
        { x: 84, y: 56, icon: <Laptop />, sq: true, size: 16, label: '친구' },
      ]} d={4.4} />
      <Callout x={50} y={82} dir="down">코드를 저장하고 함께 작업해요</Callout>
    </Stage>
  );
}

export function Repository({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.repo}>
        <Folder className={s.repoIcon} />
        <span className={s.repoFiles}>{['index.html', 'style.css', 'app.js'].map((t) => <span key={t}><FileCode2 />{t}</span>)}</span>
      </span>
      <span className={s.history}>
        {['버튼 추가', '색 바꿈', '오타 고침'].map((t, i) => <span key={t} style={{ animationDelay: `${i * 0.5}s` }}><i />{t}</span>)}
      </span>
      <Callout x={50} y={80}>파일과 바뀐 기록을 함께</Callout>
    </Stage>
  );
}

export function Commit({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.mainLine} style={{ top: '40em' }} />
      <Dots x={14} y={40} n={5} gap={18} c="blue" />
      {['처음', '버튼', '색', '소리', '완성'].map((t, i) => <span key={t} className={s.flag} style={{ left: `${14 + i * 18}em`, animationDelay: `${i * 0.35}s` }}><span>{t}</span></span>)}
      <Callout x={50} y={60}>게임의 저장 지점처럼</Callout>
    </Stage>
  );
}

function UpDown({ playing, up }: P & { up: boolean }) {
  const nodes = [
    { x: 50, y: 22, icon: <Cloud />, size: 22, label: 'GitHub' },
    { x: 50, y: 66, icon: <Laptop />, sq: true, size: 18, label: '내 컴퓨터' },
  ];
  return (
    <Stage playing={playing}>
      <Flow nodes={nodes} path={up ? [1, 0] : [0, 1]} token={<CircleDot />} d={3.6} />
      <Tag x={20} y={44} fs={4.4} kind="blue">{up ? '↑ 올리기' : '↓ 가져오기'}</Tag>
      <Callout x={74} y={44}>{up ? '내 커밋을 올려요' : '최신 내용을 받아요'}</Callout>
    </Stage>
  );
}
export const Push = (p: P) => <UpDown {...p} up />;
export const Pull = (p: P) => <UpDown {...p} up={false} />;

export function Clone({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[{ x: 50, y: 22, icon: <Cloud />, size: 22, label: 'GitHub 저장소' }, { x: 50, y: 66, icon: <Laptop />, sq: true, size: 18 }]} token={<Folder />} d={3.6} tokenClass={s.bigTok} />
      <Callout x={50} y={84} dir="down">저장소 전체를 복사해 와요</Callout>
    </Stage>
  );
}

export function Fork({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={4} y={14} w={42} h={56} r={4} c="a" />
      <B x={54} y={14} w={42} h={56} r={4} c="s" />
      <T x={25} y={18} size={4} align="center" c="sub" weight={700}>다른 사람 계정</T>
      <T x={75} y={18} size={4} align="center" c="blue" weight={700}>내 계정</T>
      <span className={s.repoBox} style={{ left: '13em' }}><Folder /></span>
      <span className={`${s.repoBox} ${s.forked}`} style={{ left: '13em' }}><Folder /></span>
      <GitFork className={s.forkIcon} />
      <Callout x={50} y={82} dir="down">내 쪽으로 복사해서 따로 고쳐요</Callout>
    </Stage>
  );
}

/** 가지 그림 (svg). branch: 갈라지기만, merge: 다시 합치기 */
function BranchSvg({ merge }: { merge: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={s.svg}>
      <path d="M8 56 H92" className={s.main} />
      <path d={merge ? 'M28 56 C36 30, 40 30, 48 30 H58 C66 30, 68 50, 76 56' : 'M28 56 C36 30, 40 30, 48 30 H88'} pathLength="100" className={s.branchPath} />
    </svg>
  );
}

export function Branch({ playing }: P) {
  return (
    <Stage playing={playing}>
      <BranchSvg merge={false} />
      <Dots x={10} y={56} n={5} gap={20} />
      <Dots x={48} y={30} n={3} gap={18} c="blue" delay={1} className={s.late} />
      <Tag x={22} y={70} fs={3.6} kind="gray">원본 (main)</Tag>
      <Tag x={66} y={18} fs={3.6} kind="soft">실험 갈래</Tag>
      <Callout x={50} y={82} dir="down">원본은 그대로, 갈래를 나눠요</Callout>
    </Stage>
  );
}

export function Merge({ playing }: P) {
  return (
    <Stage playing={playing}>
      <BranchSvg merge />
      <Dots x={10} y={56} n={3} gap={18} />
      <Dots x={48} y={30} n={1} c="blue" />
      <span className={s.mergeDot}><GitMerge /></span>
      <Tag x={48} y={18} fs={3.6} kind="soft">실험 갈래</Tag>
      <Callout x={50} y={82} dir="down">갈래를 원본에 합쳐요</Callout>
    </Stage>
  );
}

export function PullRequest({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={14} y={12} w={72} h={52} r={4} c="w" />
      <GitPullRequest className={s.prIcon} />
      <T x={34} y={18} size={5} weight={700}>합쳐 주세요</T>
      <T x={34} y={26} size={3.6} c="sub">버튼 색을 바꿨어요</T>
      <B x={20} y={36} w={60} h={0.6} r={0} c="g" />
      <span className={s.review}><User /><span>확인했어요</span><Check strokeWidth={3} /></span>
      <span className={s.mergeBtn}><GitMerge /><span>합치기</span></span>
      <Callout x={50} y={78}>고친 것을 검토해 달라고 해요</Callout>
    </Stage>
  );
}

export function MergeConflict({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Tag x={22} y={26} fs={4.6} kind="soft" className={s.leftEdit}>제목: 사과</Tag>
      <Tag x={78} y={26} fs={4.6} kind="dark" className={s.rightEdit}>제목: 배</Tag>
      <B x={20} y={48} w={60} h={12} r={3} c="a" />
      <T x={50} y={51} size={4.6} align="center" c="sub">제목: ???</T>
      <span className={s.clash}><TriangleAlert /></span>
      <Callout x={50} y={74}>같은 곳을 다르게 고쳐서 못 합쳐요</Callout>
    </Stage>
  );
}

export function Issue({ playing }: P) {
  return (
    <Stage playing={playing}>
      {['버튼이 안 눌려요', '글자가 너무 작아요', '소리 끄기 추가'].map((t, i) => (
        <span key={t} className={s.issue} style={{ top: `${12 + i * 17}em`, animationDelay: `${i * 0.5}s` }}>
          <CircleDot /><span>{t}</span>
        </span>
      ))}
      <Callout x={50} y={70}>고칠 점·할 일을 적어 둬요</Callout>
    </Stage>
  );
}

/* ───────── 배포와 공유 ───────── */

export function Deploy({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 14, y: 40, icon: <Laptop />, sq: true, size: 17, label: '내 컴퓨터' },
        { x: 50, y: 40, icon: <Cloud />, size: 20, label: '인터넷' },
        { x: 86, y: 40, icon: <Users />, size: 17, label: '누구나' },
      ]} token={<Rocket />} d={4.4} />
      <Tag x={50} y={66} fs={4.2} kind="dark" className={s.urlPop}>eunti.vercel.app</Tag>
      <Callout x={50} y={76}>주소만 있으면 누구나 열어요</Callout>
    </Stage>
  );
}

function BuildBox({ playing, fail }: P & { fail?: boolean }) {
  return (
    <Stage playing={playing}>
      {[0, 1, 2, 3].map((i) => (
        <FileCode2 key={i} className={s.srcFile} style={{ top: `${10 + i * 15}em`, ['--dy' as string]: `${30 - (10 + i * 15)}em`, animationDelay: `${i * 0.15}s` }} />
      ))}
      <span className={`${s.pack} ${fail ? s.packFail : ''}`}><Package /></span>
      {fail ? (
        <>
          <span className={s.failX}><X strokeWidth={3.5} /></span>
          <Win x={56} y={52} w={40} h={26} kind="term" fs={3}>
            <Lines n={2}><span>Build failed</span><span>✗ app.js 12줄</span></Lines>
          </Win>
        </>
      ) : (
        <Tag x={80} y={36} fs={4.4} kind="blue" className={s.dist}>완성 파일</Tag>
      )}
      <Callout x={36} y={74}>{fail ? '포장하다가 실패했어요' : '올릴 수 있게 포장해요'}</Callout>
    </Stage>
  );
}
export const Build = (p: P) => <BuildBox {...p} />;
export const BuildError = (p: P) => <BuildBox {...p} fail />;

function DeployTwo({ playing, prod }: P & { prod: boolean }) {
  return (
    <Stage playing={playing}>
      <Flow nodes={[
        { x: 14, y: 40, icon: <Laptop />, sq: true, size: 16 },
        { x: 50, y: 22, icon: <Eye />, size: 17, label: '미리보기 주소' },
        { x: 86, y: 56, icon: <Rocket />, size: 17, label: '정식 주소' },
      ]} path={prod ? [0, 1, 2] : [0, 1]} arrows={[[0, 1], [1, 2]]} d={4.4} />
      {prod
        ? <span className={s.crowd}>{[0, 1, 2].map((i) => <User key={i} style={{ animationDelay: `${i * 0.25}s` }} />)}</span>
        : <Tag x={50} y={40} fs={3.4} kind="gray">test-ab12.vercel.app</Tag>}
      <Callout x={50} y={80}>{prod ? '진짜 사용자가 쓰는 주소' : '시험용 주소로 먼저 확인'}</Callout>
    </Stage>
  );
}
export const PreviewDeployment = (p: P) => <DeployTwo {...p} prod={false} />;
export const Production = (p: P) => <DeployTwo {...p} prod />;

export function Hosting({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Store className={s.store} />
      <Tag x={66} y={14} fs={4} kind="dark">eunti.com</Tag>
      {[0, 1, 2].map((i) => <FileText key={i} className={s.moveIn} style={{ top: `${30 + i * 12}em`, animationDelay: `${i * 0.4}s` }} />)}
      <Callout x={50} y={80}>사이트 파일을 올려 두는 자리</Callout>
    </Stage>
  );
}

export function StaticSite({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.fileStack}>{[<FileCode2 key="a" />, <FileText key="b" />, <FileImage key="c" />].map((ic, i) => <span key={i}>{ic}</span>)}</span>
      <Win x={54} y={18} w={40} h={44} kind="browser" title="eunti.com">
        <B x={4} y={4} w={24} h={4} r={2} c="k" className={s.ss} />
        <B x={4} y={12} w={30} h={14} r={2} c="s" className={s.ss} />
      </Win>
      <span className={s.arrowR} />
      <span className={s.noServer}><Server /><X strokeWidth={3} /></span>
      <Callout x={50} y={80}>파일만으로 바로 보여요</Callout>
    </Stage>
  );
}

export function Domain({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={12} w={84} h={60} kind="browser" title={<span className={s.typeUrl}>eunti.com</span>}>
        <B x={6} y={6} w={40} h={6} r={3} c="k" className={s.ss} />
        <B x={6} y={16} w={72} h={22} r={3} c="s" className={s.ss} />
      </Win>
      <Callout x={50} y={80}>웹사이트의 이름 주소</Callout>
    </Stage>
  );
}

export function CustomDomain({ playing }: P) {
  const d = 4.4;
  return (
    <Stage playing={playing}>
      <span className={s.layer} style={win(0, 2, d)}><span className={s.addrBar}><Globe /><span className={s.oldAddr}>my-app.vercel.app</span></span></span>
      <span className={s.layer} style={win(1, 2, d)}><span className={s.addrBar}><Globe /><b>eunti.com</b></span></span>
      <Tag x={50} y={56} fs={4} kind="soft">같은 사이트, 내 주소</Tag>
      <Callout x={50} y={70}>기본 주소 대신 내 주소로</Callout>
    </Stage>
  );
}

export function Favicon({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.tabs}>
        <span className={s.tab}><i className={s.fav}>?</i><span>그거 뭐더라?</span></span>
        <span className={`${s.tab} ${s.tabOff}`}><i /><span>다른 탭</span></span>
      </span>
      <span className={s.zoom}><i>?</i></span>
      <Callout x={30} y={34}>탭에 보이는 작은 아이콘</Callout>
    </Stage>
  );
}

export function OgImage({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.bubble}><MessageSquare /><span>eunti.com</span></span>
      <span className={s.ogCard}>
        <span className={s.ogPic}><Pic /></span>
        <b>그거 뭐더라?</b>
        <span>바이브코딩 용어사전</span>
      </span>
      <Callout x={50} y={84} dir="down">주소를 보내면 뜨는 그림과 제목</Callout>
    </Stage>
  );
}

export function QrCodeAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.qr}><QrCode /></span>
      <B x={56} y={14} w={32} h={56} r={5} c="w" />
      <span className={s.scan} />
      <Smartphone className={s.scanPhone} />
      <B x={60} y={22} w={24} h={40} r={2} c="s" className={s.opened} />
      <Callout x={50} y={80}>찍으면 주소로 이동해요</Callout>
    </Stage>
  );
}

export function License({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.codeBox}><Code2 /><b>MIT</b></span>
      <span className={s.rules}>
        {['써도 돼요', '고쳐도 돼요', '출처는 밝혀요'].map((t, i) => <span key={t} style={{ animationDelay: `${0.4 + i * 0.4}s` }}><Check strokeWidth={3} />{t}</span>)}
      </span>
      <Callout x={50} y={80}>어디까지 써도 되는지 정한 약속</Callout>
    </Stage>
  );
}

/* ───────── 속도 ───────── */

export function PageLoadSpeed({ playing }: P) {
  return (
    <Stage playing={playing}>
      <Win x={8} y={12} w={60} h={56} kind="browser" title="eunti.com">
        <span className={s.loadBar} />
        <B x={4} y={6} w={30} h={5} r={2.5} c="k" className={s.ss} />
        <B x={4} y={15} w={44} h={18} r={3} c="s" className={s.ss} />
      </Win>
      <Gauge className={s.gauge} />
      <T x={84} y={52} size={6} align="center" weight={800} c="blue" className={s.sec}><span /></T>
      <Callout x={50} y={80}>열리는 데 걸리는 시간</Callout>
    </Stage>
  );
}

export function ImageOptimization({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.imgBig}><Pic /></span>
      <span className={s.sizeTag}><b>5MB</b><b>300KB</b></span>
      <Callout x={50} y={80}>화질은 그대로, 크기는 작게</Callout>
    </Stage>
  );
}

export function LazyLoading({ playing }: P) {
  return (
    <Stage playing={playing}>
      <span className={s.lazyPage}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={s.lazyImg} style={{ top: `${4 + i * 30}em`, animationDelay: `${0.2 + i * 0.9}s` }}><Pic /></span>
        ))}
      </span>
      <span className={s.viewport} />
      <Callout x={50} y={84} dir="down">보일 때가 돼서야 불러와요</Callout>
    </Stage>
  );
}

export function FileSize({ playing }: P) {
  return (
    <Stage playing={playing}>
      {[['글', '20KB', 8], ['사진', '2MB', 40], ['영상', '80MB', 92]].map(([t, sz, w], i) => (
        <span key={t as string}>
          <T x={8} y={16 + i * 18} size={4.4} weight={700}>{t}</T>
          <T x={92} y={16 + i * 18} size={3.8} align="right" c="sub">{sz}</T>
          <B x={8} y={23 + i * 18} w={84} h={4} r={2} c="a" />
          <span className={s.dl} style={{ top: `${23 + i * 18}em`, animationDuration: `${0.6 + (w as number) / 30}s` }} />
        </span>
      ))}
      <Callout x={50} y={72}>클수록 늦게 열려요</Callout>
    </Stage>
  );
}
