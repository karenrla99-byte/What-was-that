import { ChevronDown } from 'lucide-react';
import { B, Pic, T, Tap, win } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Content.module.css';

/** 🧩 콘텐츠 담기 */
type P = { playing: boolean };
const C = 28.8;

export function AvatarGroup({ playing }: P) {
  const names = ['은', '민', '하', '준'];
  return (
    <Stage playing={playing}>
      {names.map((n, i) => (
        <B key={n} x={16 + i * 13} y={34} w={20} h={20} r={10} c={i % 2 ? 'k' : 'p'} className={s.ava} style={{ animationDelay: `${i * 0.25}s`, zIndex: 4 - i }}>
          <T x={10} y={5.4} size={7} c="white" align="center">{n}</T>
        </B>
      ))}
      <B x={68} y={34} w={20} h={20} r={10} c="g" className={s.ava} style={{ animationDelay: '1s' }}>
        <T x={10} y={6} size={6} align="center">+3</T>
      </B>
      <Callout x={50} y={58}>여러 사람 얼굴을 겹쳐서</Callout>
    </Stage>
  );
}

export function List({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={s.row} style={{ animationDelay: `${i * 0.3}s` }}>
          <B x={5} y={25 + i * 14} w={9} h={9} r={4.5} c={i === 1 ? 'p' : 'c'} />
          <B x={18} y={26 + i * 14} w={[26, 20, 30, 16][i]} h={3.4} c="k" />
          <B x={18} y={31.4 + i * 14} w={[34, 28, 24, 32][i]} h={2.6} c="g" />
        </span>
      ))}
      <Callout x={C} y={81} dir="down">한 줄씩 위에서 아래로</Callout>
    </Phone>
  );
}

export function Table({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={8} y={16} w={84} h={64} r={3} c="w" style={{ overflow: 'hidden' }}>
        <B x={0} y={0} w={82.8} h={12} r={0} c="s" />
        {[0, 1, 2].map((c) => <T key={c} x={6 + c * 28} y={3} size={5} c="blue">{['이름', '출석', '점수'][c]}</T>)}
        {[0, 1, 2, 3].map((r) => (
          <span key={r} className={s.row} style={{ animationDelay: `${r * 0.35}s` }}>
            {[0, 1, 2].map((c) => <B key={c} x={6 + c * 28} y={17 + r * 11} w={[16, 10, 12][c]} h={3.6} c={c === 2 && r === 1 ? 'p' : 'g'} />)}
            <B x={0} y={23 + r * 11} w={82.8} h={0.5} r={0} c="a" />
          </span>
        ))}
        <B x={27} y={0} w={0.5} h={62.8} r={0} c="a" />
        <B x={55} y={0} w={0.5} h={62.8} r={0} c="a" />
      </B>
      <Callout x={50} y={82}>가로줄(행)과 세로줄(열)</Callout>
    </Stage>
  );
}

export function Accordion({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.acc}>
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className={s.accHead}>
              <B x={4} y={3.6} w={[20, 24, 18][i]} h={3.6} c="k" />
              <ChevronDown className={`${s.accChev} ${i === 1 ? s.accChevOn : ''}`} />
            </div>
            {i === 1 && (
              <div className={s.accBody}>
                <B x={4} y={2} w={36} h={3} c="g" />
                <B x={4} y={8} w={30} h={3} c="g" />
                <B x={4} y={14} w={22} h={3} c="g" />
              </div>
            )}
          </div>
        ))}
      </div>
      <Tap x={46} y={39} at={0.12} d={4} size={10} />
      <Callout x={C} y={82} dir="down">누르면 펼쳐지고 다시 접혀요</Callout>
    </Phone>
  );
}

export function Carousel({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.strip}>
        {[0, 1, 2, 3].map((i) => <span key={i} className={s.slide}><Pic /></span>)}
      </div>
      <div className={s.dots}>{[0, 1, 2].map((i) => <span key={i}><i style={win(i, 3, 4.5)} /></span>)}</div>
      <Callout x={C} y={66}>옆으로 넘겨 보는 슬라이드</Callout>
    </Phone>
  );
}

export function Chip({ playing }: P) {
  return (
    <Phone playing={playing}>
      {['전체', '국어', '수학'].map((t, i) => (
        <B key={t} x={5 + i * 16.5} y={24} w={15} h={8} r={4} c="a" className={i === 1 ? s.chipOn : undefined}>
          <T x={7.5} y={1.8} size={4.2} align="center" className={i === 1 ? s.chipInk : undefined}>{t}</T>
        </B>
      ))}
      {[0, 1, 2, 3].map((i) => <B key={i} x={5} y={37 + i * 11} w={47.6} h={8} r={2.4} c="a" className={i % 2 ? s.filtered : undefined} />)}
      <Tap x={29} y={28} at={0.2} d={4} size={10} />
      <Callout x={C} y={22} dir="down">눌러서 고르는 작은 알약</Callout>
    </Phone>
  );
}

export function Tag({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={20} y={10} w={60} h={74} r={5} c="w">
        <B x={3} y={3} w={52.8} h={32} r={3} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
        <B x={4} y={40} w={34} h={5} c="k" />
        {['국어', '3학년', '쓰기'].map((t, i) => (
          <B key={t} x={4 + [0, 14, 30][i]} y={52} w={[12, 14, 12][i]} h={7} r={1.6} c="s" className={s.tag} style={{ animationDelay: `${0.3 + i * 0.3}s` }}>
            <T x={[6, 7, 6][i]} y={1.4} size={4} c="blue" align="center">{t}</T>
          </B>
        ))}
      </B>
      <Callout x={50} y={70}>분류를 알려 주는 작은 글자 상자</Callout>
    </Stage>
  );
}

export function Avatar({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={32} y={22} w={36} h={36} r={18} c="p" className={s.bigAva}>
        <T x={18} y={9} size={16} c="white" align="center">은</T>
      </B>
      <B x={58} y={48} w={9} h={9} r={4.5} c="w" style={{ borderColor: '#fff', background: 'var(--blue-deep)' }} />
      <Callout x={50} y={64}>사진이나 이름 첫 글자를 담은 동그라미</Callout>
    </Stage>
  );
}

export function Thumbnail({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((i) => (
        <span key={i}>
          <B x={5} y={25 + i * 16} w={16} h={12} r={2} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
          <B x={25} y={27 + i * 16} w={22} h={3.4} c="k" />
          <B x={25} y={32 + i * 16} w={16} h={2.6} c="g" />
        </span>
      ))}
      <span className={s.preview}><Pic /></span>
      <Tap x={13} y={47} at={0.25} d={4} size={10} />
      <Callout x={13} y={38}>작게 줄인 미리보기 그림</Callout>
    </Phone>
  );
}

export function InfiniteScroll({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.endless}>
        {Array.from({ length: 12 }, (_, i) => <B key={i} x={5} y={5 + i * 15} w={47.6} h={11} r={3} c={i % 4 === 1 ? 's' : 'a'} />)}
      </div>
      <span className={s.loader} />
      <Callout x={C} y={74} dir="down">내리면 끝없이 이어져요</Callout>
    </Phone>
  );
}

export function LoadMore({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((i) => <B key={i} x={5} y={24 + i * 12} w={47.6} h={9} r={2.4} c="a" />)}
      {[0, 1].map((i) => <B key={i} x={5} y={60 + i * 12} w={47.6} h={9} r={2.4} c="s" className={s.more} />)}
      <B x={14} y={61} w={29.6} h={10} r={5} c="w" className={s.moreBtn}><T x={14.8} y={2.2} size={4.4} align="center">더보기</T></B>
      <Tap x={C} y={66} at={0.22} d={4} size={10} />
      <Callout x={C} y={60} dir="down">눌러야 더 불러와요</Callout>
    </Phone>
  );
}
