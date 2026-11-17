import { ArrowDownUp, Clock, Search as SearchIcon, SearchX, SlidersHorizontal, TrendingUp, X } from 'lucide-react';
import { B, Pic, T, Tap, win } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Search.module.css';

/** 🧩 검색 화면 + 카드·바텀시트 */
type P = { playing: boolean };
const C = 28.8;

function Bar({ text, typing = false, focus = false }: { text?: string; typing?: boolean; focus?: boolean }) {
  return (
    <B x={4} y={6} w={49.6} h={11} r={5.5} c="w" className={focus ? s.focus : undefined}>
      <SearchIcon className={s.mag} />
      {text && <T x={11} y={2.8} size={4.6} className={typing ? s.typing : undefined}>{text}</T>}
    </B>
  );
}

export function SearchBar({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar text="바텀시트" typing focus />
      {[0, 1, 2].map((i) => <B key={i} x={4} y={24 + i * 13} w={49.6} h={10} r={2.6} c="a" className={s.result} style={{ animationDelay: `${i * 0.15}s` }} />)}
      <Callout x={C} y={17}>찾고 싶은 낱말을 쓰는 칸</Callout>
    </Phone>
  );
}

export function Autocomplete({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar text="바텀" typing focus />
      <span className={s.suggest}>
        {['바텀시트', '바텀 내비게이션', '바텀 탭'].map((t, i) => (
          <T key={t} x={10} y={3 + i * 8.6} size={4.4}><b className={s.hl}>바텀</b>{t.slice(2)}</T>
        ))}
        {[0, 1, 2].map((i) => <SearchIcon key={i} className={s.sugIcon} style={{ top: `${3.6 + i * 8.6}em` }} />)}
      </span>
      <Callout x={C} y={50}>치는 동안 추천 낱말이 떠요</Callout>
    </Phone>
  );
}

export function RecentSearches({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar focus />
      <T x={5} y={22} size={4} c="sub">최근 검색어</T>
      {['토스트', '모달', '스와이프'].map((t, i) => (
        <span key={t} className={s.result} style={{ animationDelay: `${i * 0.2}s` }}>
          <Clock className={s.rowIcon} style={{ top: `${30.4 + i * 9}em` }} />
          <T x={13} y={30 + i * 9} size={4.6}>{t}</T>
          <X className={s.rowX} style={{ top: `${30.6 + i * 9}em` }} />
        </span>
      ))}
      <Callout x={C} y={58}>전에 찾았던 낱말</Callout>
    </Phone>
  );
}

export function TrendingSearches({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar />
      <T x={5} y={22} size={4} c="sub">인기 검색어</T>
      {['바텀시트', '토스트', '반응형', '배포'].map((t, i) => (
        <span key={t} className={s.result} style={{ animationDelay: `${i * 0.18}s` }}>
          <T x={6} y={30 + i * 9} size={4.8} c={i < 3 ? 'blue' : 'sub'} weight={700}>{i + 1}</T>
          <T x={13} y={30 + i * 9} size={4.6}>{t}</T>
          {i === 0 && <TrendingUp className={s.rowX} style={{ top: `${30.6}em`, color: 'var(--blue)' }} />}
        </span>
      ))}
      <Callout x={C} y={67}>많이 찾는 낱말 순위</Callout>
    </Phone>
  );
}

export function Filter({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar text="달력" />
      <B x={4} y={21} w={14} h={8} r={4} c="a" className={s.chipOn}><SlidersHorizontal className={s.chipIcon} /></B>
      {['3학년', '국어'].map((t, i) => (
        <B key={t} x={21 + i * 16} y={21} w={14} h={8} r={4} c="s" className={s.chipPop} style={{ animationDelay: `${i * 0.2}s` }}>
          <T x={7} y={1.8} size={3.8} c="blue" align="center">{t}</T>
        </B>
      ))}
      {[0, 1, 2, 3, 4].map((i) => <B key={i} x={4} y={34 + i * 10} w={49.6} h={7.4} r={2.4} c="a" className={i % 2 ? s.fade : undefined} />)}
      <Tap x={11} y={25} at={0.15} d={4} size={9} />
      <Callout x={C} y={31}>조건으로 결과를 걸러요</Callout>
    </Phone>
  );
}

export function Sort({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar text="달력" />
      <B right={4} y={21} w={20} h={8} r={4} c="a"><ArrowDownUp className={s.chipIcon} /><T x={7} y={1.8} size={3.8}>{''}</T></B>
      {['최신순', '이름순'].map((t, i) => <T key={t} x={44.6} y={22.6} size={3.8} align="right" style={win(i, 2, 4)}>{t}</T>)}
      <div className={s.sortList}>
        {[46, 30, 38, 22].map((w, i) => <B key={i} x={0} y={i * 10} w={w} h={7.4} r={2.4} c={i === 0 ? 's' : 'a'} className={s[`o${i}`]} />)}
      </div>
      <Callout x={C} y={74}>순서를 바꿔 줄 세우기</Callout>
    </Phone>
  );
}

export function SearchHighlight({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar text="시트" />
      {['바텀시트', '시트 확장', '스프레드시트'].map((t, i) => {
        const at = t.indexOf('시트');
        return (
          <B key={t} x={4} y={23 + i * 13} w={49.6} h={10} r={2.6} c="a">
            <T x={4} y={2.4} size={4.6}>
              {t.slice(0, at)}<mark className={s.mark} style={{ animationDelay: `${i * 0.2}s` }}>시트</mark>{t.slice(at + 2)}
            </T>
          </B>
        );
      })}
      <Callout x={C} y={63}>찾은 낱말에 색칠</Callout>
    </Phone>
  );
}

export function NoResults({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar text="바텀쉬트" />
      <span className={s.empty}><SearchX /></span>
      <T x={C} y={46} size={4.4} align="center">찾는 게 없어요</T>
      <T x={C} y={53} size={3.6} c="sub" weight={400} align="center">혹시 이 말인가요?</T>
      <B x={16} y={60} w={25.6} h={9} r={4.5} c="s" className={s.chipPop}><T x={12.8} y={2} size={4.2} c="blue" align="center">바텀시트</T></B>
      <Callout x={C} y={70}>다른 낱말을 추천해 줘요</Callout>
    </Phone>
  );
}

export function SearchScopeTabs({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar text="달력" />
      <B x={0} y={21} w={57.6} h={9} r={0} c="n" style={{ borderBottom: '0.6em solid var(--gray-2)' }}>
        {['전체', '활동', '자료'].map((t, i) => <T key={t} x={9.6 + i * 19.2} y={1.6} size={4.4} align="center" c="sub">{t}</T>)}
        <span className={s.scopeLine} />
      </B>
      {[0, 1, 2].map((k) => <span key={k} style={win(k, 3, 4.5)}>{[0, 1, 2].map((i) => <B key={i} x={4} y={36 + i * 12} w={[49.6, 40, 44][(i + k) % 3]} h={9} r={2.4} c={k === 1 ? 's' : 'a'} />)}</span>)}
      <Callout x={C} y={30}>무엇에서 찾을지 나누는 탭</Callout>
    </Phone>
  );
}

export function ChoseongSearch({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <Bar text="ㅂㅌㅅㅌ" typing focus />
      <B x={4} y={24} w={49.6} h={12} r={3} c="s" className={s.result} style={{ animationDelay: '1.2s' }}>
        <T x={4} y={2.8} size={5}><b className={s.hl}>바</b>텀<b className={s.hl}>시</b>트 → </T>
      </B>
      <T x={C} y={58} size={4} c="sub" weight={400} align="center">ㅂ ㅌ ㅅ ㅌ = 바 텀 시 트</T>
      <Callout x={C} y={36}>첫소리만 쳐도 찾아요</Callout>
    </Phone>
  );
}

export function Card({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={22} y={8} w={56} h={78} r={5} c="w" className={s.card}>
        <B x={3} y={3} w={48.8} h={34} r={3} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
        <B x={4} y={42} w={34} h={5} c="k" />
        <B x={4} y={51} w={44} h={3.4} c="g" />
        <B x={4} y={57} w={30} h={3.4} c="g" />
        <B x={4} y={64} w={18} h={7} r={3.5} c="p" />
      </B>
      <Callout x={50} y={86} dir="down">사진·제목·설명을 한 상자에</Callout>
    </Stage>
  );
}

export function BottomSheet({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((i) => <B key={i} x={5} y={26 + i * 14} w={47.6} h={10} r={3} c="a" />)}
      <B x={36} y={24} w={16.6} h={10} r={5} c="p" />
      <span className={s.dim} />
      <span className={s.sheet}>
        <B x={21.8} y={2} w={14} h={1.8} r={1} c="c" />
        {['작게', '보통', '크게'].map((t, i) => (
          <B key={t} x={4} y={8 + i * 9.6} w={49.6} h={8} r={2.4} c={i === 1 ? 's' : 'a'}><T x={3} y={1.6} size={4.2} c={i === 1 ? 'blue' : 'ink'}>{t}</T></B>
        ))}
      </span>
      <Tap x={44} y={29} at={0.12} d={4.2} size={10} />
      <Callout x={C} y={54} dir="down">아래에서 쑥 올라오는 판</Callout>
    </Phone>
  );
}
