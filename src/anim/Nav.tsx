import { ArrowLeft, ArrowUp, ChevronDown, ChevronRight, Home, Menu, Search, User } from 'lucide-react';
import { B, T, Tap, win } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Nav.module.css';

/** 🧩 이동 부품. 폰 안쪽 폭 57.6em */
type P = { playing: boolean };
const C = 28.8;
const rows = (n: number, y0: number, gap = 15, h = 11) =>
  Array.from({ length: n }, (_, i) => <B key={i} x={5} y={y0 + i * gap} w={47.6} h={h} r={3} c="a" />);

export function Header({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.scroll}>{rows(8, 22)}</div>
      <B x={0} y={0} w={57.6} h={16} r={0} c="s" className={s.bar}>
        <B x={5} y={5.5} w={14} h={5} c="p" />
        <Menu className={s.barIcon} />
      </B>
      <Callout x={C} y={16}>맨 위 띠 (로고·메뉴)</Callout>
    </Phone>
  );
}

export function Footer({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.toFooter}>
        {rows(4, 6)}
        <B x={0} y={66} w={57.6} h={30} r={0} c="k">
          <B x={5} y={6} w={26} h={3.4} c="c" />
          <B x={5} y={13} w={36} h={3.4} c="c" />
        </B>
      </div>
      <Callout x={C} y={62} dir="down">맨 아래 띠 (저작권·연락처)</Callout>
    </Phone>
  );
}

export function NavigationBar({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={5} y={16} w={90} h={66} r={4} c="w">
        <B x={0} y={0} w={88.8} h={14} r={0} c="a" />
        <B x={4} y={4.5} w={12} h={5} c="p" />
        {[0, 1, 2, 3].map((i) => <B key={i} x={34 + i * 13} y={5.4} w={9} h={3.4} c="k" />)}
        <span className={s.navLine} />
        <B x={4} y={20} w={50} h={6} c="g" />
        <B x={4} y={30} w={80} h={26} r={2} c="a" />
      </B>
      <Callout x={60} y={31}>주요 메뉴를 가로로</Callout>
    </Stage>
  );
}

export function TabBar({ playing }: P) {
  const icons = [Home, Search, User];
  return (
    <Phone playing={playing} bare>
      {[0, 1, 2].map((k) => (
        <span key={k} style={win(k, 3, 4.5)}>
          <B x={5} y={6} w={[30, 24, 20][k]} h={5} c="c" />
          {rows(3, 16 + k * 3, 16, 12)}
        </span>
      ))}
      <B x={0} y={73} w={57.6} h={14.6} r={0} c="w" className={s.tabBar}>
        {icons.map((Icon, i) => (
          <span key={i} className={s.tabIcon} style={{ left: `${9.6 + i * 19.2}em` }}>
            <Icon className={s.tabIconGray} />
            <Icon className={s.tabIconBlue} style={win(i, 3, 4.5)} />
          </span>
        ))}
      </B>
      <Callout x={C} y={72} dir="down">화면 맨 아래 아이콘 메뉴</Callout>
    </Phone>
  );
}

export function Tabs({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={0} y={24} w={57.6} h={11} r={0} c="n" className={s.tabsRow}>
        {['설명', '활동', '평가'].map((t, i) => (
          <T key={t} x={9.6 + i * 19.2} y={2.6} size={4.8} align="center" c="sub">{t}</T>
        ))}
        <span className={s.tabsLine} />
      </B>
      {[0, 1, 2].map((k) => (
        <span key={k} style={win(k, 3, 4.5)}>
          <B x={5} y={40} w={47.6} h={[24, 14, 30][k]} r={3} c={k === 1 ? 's' : 'a'} />
          <B x={5} y={[68, 58, 74][k]} w={[30, 40, 22][k]} h={4} c="g" />
        </span>
      ))}
      <Callout x={C} y={36}>이름표를 누르면 내용만 바뀌어요</Callout>
    </Phone>
  );
}

export function Drawer({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={0} y={0} w={57.6} h={16} r={0} c="a"><Menu className={s.menuLeft} /></B>
      {rows(4, 24)}
      <span className={s.dim} />
      <span className={s.drawer}>
        {[0, 1, 2, 3, 4].map((i) => <B key={i} x={4} y={8 + i * 10} w={[20, 26, 18, 24, 16][i]} h={4} c={i === 0 ? 'p' : 'g'} />)}
      </span>
      <Tap x={8} y={8} at={0.15} d={4} size={10} />
      <Callout x={20} y={62}>옆에서 스르륵 나오는 메뉴판</Callout>
    </Phone>
  );
}

export function DropdownMenu({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={5} y={24} w={30} h={11} r={5.5} c="w">
        <B x={3} y={3.4} w={14} h={3.4} c="k" />
        <ChevronDown className={s.chev} />
      </B>
      <span className={s.drop}>
        {[0, 1, 2].map((i) => <B key={i} x={3} y={3 + i * 8.5} w={[20, 16, 22][i]} h={4} c={i === 1 ? 'p' : 'g'} />)}
      </span>
      {rows(2, 66, 12, 8)}
      <Tap x={29} y={29.5} at={0.15} d={4} size={10} />
      <Callout x={20} y={64}>누르면 아래로 펼쳐지는 목록</Callout>
    </Phone>
  );
}

export function ContextMenu({ playing }: P) {
  return (
    <Phone playing={playing}>
      {rows(3, 24, 17, 14)}
      <span className={s.ctx}>
        {['복사', '수정', '삭제'].map((t, i) => <T key={t} x={4} y={3 + i * 8} size={4.6}>{t}</T>)}
      </span>
      <span className={s.press} />
      <Callout x={C} y={22} dir="down">길게 누른 자리에 뜨는 메뉴</Callout>
    </Phone>
  );
}

export function Breadcrumb({ playing }: P) {
  const parts = ['홈', '수업자료', '국어'];
  return (
    <Stage playing={playing}>
      <B x={6} y={30} w={88} h={18} r={9} c="a" />
      {parts.map((p, i) => (
        <span key={p} className={s.crumb} style={{ animationDelay: `${i * 0.6}s` }}>
          <T x={[12, 30, 62][i]} y={35} size={6} c={i === 2 ? 'ink' : 'blue'} weight={i === 2 ? 700 : 600}>{p}</T>
          {i < 2 && <ChevronRight className={s.crumbArrow} style={{ left: `${[21, 54][i]}em` }} />}
        </span>
      ))}
      <Callout x={66} y={50}>지금 있는 곳까지의 길</Callout>
    </Stage>
  );
}

export function Pagination({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((k) => <span key={k} style={win(k, 3, 4.5)}>{rows(3, 24 + k * 2, 13, 10)}</span>)}
      <div className={s.pages}>
        {[1, 2, 3, 4].map((n, i) => (
          <span key={n} className={s.page}>
            {i < 3 && <span className={s.pageOn} style={win(i, 3, 4.5)} />}
            <b>{n}</b>
          </span>
        ))}
      </div>
      <Callout x={C} y={76}>번호를 눌러 쪽 넘기기</Callout>
    </Phone>
  );
}

export function BackButton({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.screenA}>{rows(4, 10)}</span>
      <span className={s.screenB}>
        <B x={0} y={0} w={57.6} h={16} r={0} c="a"><ArrowLeft className={s.menuLeft} /></B>
        <B x={5} y={22} w={47.6} h={30} r={3} c="s" />
        <B x={5} y={58} w={34} h={4} c="g" />
      </span>
      <Tap x={8} y={8} at={0.35} d={4} size={10} />
      <Callout x={8} y={15}>이전 화면으로</Callout>
    </Phone>
  );
}

export function BackToTop({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.longScroll}>
        <B x={5} y={6} w={30} h={6} c="p" />
        {rows(12, 18)}
      </div>
      <B right={4} bottom={5} w={12} h={12} r={6} c="d" className={s.topBtn}><ArrowUp color="#fff" strokeWidth={3} /></B>
      <Tap x={47.6} y={76.6} at={0.62} d={4.4} size={10} />
      <Callout x={47.6} y={68} dir="down">누르면 맨 위로 슝</Callout>
    </Phone>
  );
}

export function LinkAnim({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <span className={s.screenA}>
        <B x={5} y={10} w={47.6} h={4} c="g" />
        <B x={5} y={18} w={14} h={4} c="g" />
        <B x={21} y={17.4} w={18} h={5.2} r={0.4} c="n" className={s.link} />
        <B x={41} y={18} w={11.6} h={4} c="g" />
        <B x={5} y={26} w={40} h={4} c="g" />
      </span>
      <span className={s.screenIn}>
        <B x={5} y={8} w={30} h={6} c="k" />
        <B x={5} y={20} w={47.6} h={28} r={3} c="s" />
      </span>
      <Tap x={30} y={20} at={0.3} d={4} size={10} />
      <Callout x={30} y={24}>누르면 다른 곳으로 이동</Callout>
    </Phone>
  );
}
