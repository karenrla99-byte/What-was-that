import { BedDouble, CalendarDays, ChevronLeft, ChevronRight, LogOut, Repeat } from 'lucide-react';
import { B, MiniCal, T, Tap, win } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Dates.module.css';

/** 🧩 날짜 고르는 UI */
type P = { playing: boolean };
const C = 28.8;

/** 폰 안 달력 한 판 (폭 47.6em) */
function Cal({ y, on = [], mid = [], cellClass }: { y: number; on?: number[]; mid?: number[]; cellClass?: (i: number) => string | undefined }) {
  return (
    <>
      <B x={5} y={y} w={47.6} h={6} c="n">
        <ChevronLeft className={s.arrowL} />
        <T x={23.8} y={0.6} size={4.6} align="center">3월</T>
        <ChevronRight className={s.arrowR} />
      </B>
      <MiniCal x={5.4} y={y + 8} cell={5.8} gap={1} rows={5} on={on} mid={mid} cellClass={cellClass} />
    </>
  );
}

export function InlineCalendar({ playing }: P) {
  return (
    <Phone playing={playing}>
      <Cal y={24} cellClass={(i) => (i === 9 ? s.pickA : i === 19 ? s.pickB : i === 25 ? s.pickC : undefined)} />
      <Callout x={C} y={70}>화면에 늘 펼쳐진 달력</Callout>
    </Phone>
  );
}

export function PopoverCalendar({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={5} y={24} w={47.6} h={11} r={3} c="w"><CalendarDays className={s.fieldIcon} /><B x={3} y={3.2} w={20} h={3.4} c="g" /></B>
      <span className={s.pop}>
        <MiniCal x={2.4} y={2.4} cell={4.4} gap={0.9} rows={5} on={[16]} />
      </span>
      <B x={5} y={42} w={47.6} h={9} r={2.4} c="a" />
      <B x={5} y={54} w={47.6} h={9} r={2.4} c="a" />
      <Tap x={46} y={29.5} at={0.15} d={4} size={10} />
      <Callout x={C} y={74}>칸을 누르면 작게 튀어나와요</Callout>
    </Phone>
  );
}

export function MonthGrid({ playing }: P) {
  return (
    <Phone playing={playing}>
      <T x={C} y={23} size={5} align="center">2026년</T>
      {Array.from({ length: 12 }, (_, i) => (
        <B key={i} x={5 + (i % 3) * 16.2} y={31 + Math.floor(i / 3) * 10.5} w={14.8} h={9} r={2.4} c="a" className={i === 4 ? s.monthOn : undefined}>
          <T x={7.4} y={2.2} size={4.2} align="center" className={i === 4 ? s.monthInk : undefined}>{i + 1}월</T>
        </B>
      ))}
      <Tap x={C} y={46} at={0.3} d={4} size={10} />
      <Callout x={C} y={74}>열두 달을 바둑판으로</Callout>
    </Phone>
  );
}

export function WheelPicker({ playing }: P) {
  const cols = [['2024', '2025', '2026', '2027', '2028'], ['1월', '2월', '3월', '4월', '5월'], ['1일', '2일', '3일', '4일', '5일']];
  return (
    <Phone playing={playing} bare>
      <B x={4} y={18} w={49.6} h={46} r={4} c="a" style={{ overflow: 'hidden' }}>
        <B x={1.6} y={18} w={46.4} h={10} r={2.4} c="s" className={s.band} />
        {cols.map((col, k) => (
          <div key={k} className={s.wheel} style={{ left: `${2 + k * 15.6}em`, animationDelay: `${k * 0.35}s` }}>
            {col.map((t) => <b key={t}>{t}</b>)}
          </div>
        ))}
      </B>
      <Callout x={C} y={66}>바퀴를 돌려서 연·월·일</Callout>
    </Phone>
  );
}

export function ManualInput({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={5} y={28} w={47.6} h={12} r={3} c="w" className={s.manual}>
        <T x={3} y={3.2} size={5} className={s.typed}>2026-03-02</T>
      </B>
      <T x={5} y={43} size={3.8} c="sub" weight={400}>연-월-일로 써요</T>
      <Callout x={C} y={49}>날짜를 직접 타자로</Callout>
    </Phone>
  );
}

export function Calendar({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={8} y={10} w={84} h={76} r={4} c="w">
        <T x={41.4} y={3} size={5} align="center">3월 일정</T>
        {Array.from({ length: 28 }, (_, i) => (
          <B key={i} x={2.6 + (i % 7) * 11.4} y={12 + Math.floor(i / 7) * 14.6} w={10.4} h={13.4} r={1.6} c="a">
            {[3, 9, 10, 17, 24].includes(i) && <B x={1.2} y={7} w={i === 9 || i === 10 ? 9.2 : 6} h={2.6} r={1.3} c={i === 17 ? 'k' : 'p'} className={s.event} />}
          </B>
        ))}
      </B>
      <Callout x={50} y={88} dir="down">일정이 날짜 칸마다 보여요</Callout>
    </Stage>
  );
}

export function MonthPicker({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={5} y={24} w={47.6} h={9} c="n">
        <ChevronLeft className={s.arrowL} />
        {['2025년', '2026년'].map((t, i) => <T key={t} x={23.8} y={1.6} size={4.8} align="center" style={win(i, 2, 4)}>{t}</T>)}
        <ChevronRight className={s.arrowR} />
      </B>
      {Array.from({ length: 12 }, (_, i) => (
        <B key={i} x={5 + (i % 4) * 12.2} y={36 + Math.floor(i / 4) * 10} w={11} h={8.4} r={2.4} c="a" className={i === 2 ? s.monthOn : undefined}>
          <T x={5.5} y={2} size={3.8} align="center" className={i === 2 ? s.monthInk : undefined}>{i + 1}월</T>
        </B>
      ))}
      <Tap x={50} y={28.5} at={0.42} d={4} size={9} />
      <Callout x={C} y={68}>날짜 말고 연도와 달만</Callout>
    </Phone>
  );
}

export function RangeCalendar({ playing }: P) {
  return (
    <Phone playing={playing}>
      <Cal y={24} cellClass={(i) => (i === 9 ? s.rStart : i === 13 ? s.rEnd : i > 9 && i < 13 ? s.rMid : undefined)} />
      <Tap x={18} y={45} at={0.15} d={4.4} size={9} />
      <Tap x={45} y={45} at={0.4} d={4.4} size={9} />
      <Callout x={C} y={70}>시작 날과 끝 날 사이가 칠해져요</Callout>
    </Phone>
  );
}

export function RangePicker({ playing }: P) {
  return (
    <Phone playing={playing}>
      {['시작', '끝'].map((t, i) => (
        <span key={t}>
          <T x={5 + i * 25} y={24} size={4} c="sub">{t}</T>
          <B x={5 + i * 25} y={30} w={22.6} h={11} r={3} c="w" className={i ? s.endBox : s.startBox}>
            <B x={2.4} y={3.2} w={15} h={3.4} c="p" className={i ? s.endVal : s.startVal} />
          </B>
        </span>
      ))}
      <MiniCal x={5.4} y={47} cell={5.8} gap={1} rows={3} cellClass={(i) => (i === 3 ? s.rStart : i === 9 ? s.rEnd : i > 3 && i < 9 ? s.rMid : undefined)} />
      <Callout x={C} y={42}>시작과 끝을 골라 기간 정하기</Callout>
    </Phone>
  );
}

export function CheckInOut({ playing }: P) {
  return (
    <Phone playing={playing}>
      <Cal y={22} cellClass={(i) => (i === 16 ? s.rStart : i === 18 ? s.rEnd : i === 17 ? s.rMid : undefined)} />
      <span className={s.badgeIn}><BedDouble /> 들어가는 날</span>
      <span className={s.badgeOut}><LogOut /> 나오는 날</span>
      <Callout x={C} y={70}>숙소에 들어가고 나오는 날</Callout>
    </Phone>
  );
}

export function TimeSlot({ playing }: P) {
  const t = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00'];
  return (
    <Phone playing={playing}>
      {t.map((x, i) => (
        <B key={x} x={5 + (i % 3) * 16.2} y={25 + Math.floor(i / 3) * 12} w={14.8} h={9.4} r={4.7} c={i === 1 || i === 6 ? 'a' : 'w'} className={i === 4 ? s.slotOn : undefined}>
          <T x={7.4} y={2.2} size={4} align="center" c={i === 1 || i === 6 ? 'light' : 'ink'} className={i === 4 ? s.slotInk : undefined}>{x}</T>
        </B>
      ))}
      <Tap x={C} y={42} at={0.3} d={4} size={10} />
      <Callout x={C} y={62}>예약할 수 있는 시간을 버튼으로</Callout>
    </Phone>
  );
}

export function Recurrence({ playing }: P) {
  return (
    <Phone playing={playing}>
      <Repeat className={s.repeat} />
      {['안 함', '매일', '매주', '매월'].map((t, i) => (
        <B key={t} x={5} y={32 + i * 11} w={47.6} h={9} r={2.4} c="a">
          <T x={3} y={1.8} size={4.4}>{t}</T>
          {i > 0 && <span className={s.radio}><i style={win(i - 1, 3, 4.5)} /></span>}
          {i === 0 && <span className={s.radio} />}
        </B>
      ))}
      <Callout x={C} y={78}>되풀이 규칙 고르기</Callout>
    </Phone>
  );
}

export function QuickSelect({ playing }: P) {
  return (
    <Phone playing={playing}>
      {['오늘', '내일', '다음 주'].map((t, i) => (
        <B key={t} x={5 + i * 16.2} y={24} w={14.8} h={9} r={2.4} c="w" className={i === 1 ? s.qsOn : undefined}>
          <T x={7.4} y={2.2} size={3.6} align="center" className={i === 1 ? s.monthInk : undefined}>{t}</T>
        </B>
      ))}
      <MiniCal x={5.4} y={38} cell={5.8} gap={1} rows={4} cellClass={(i) => (i === 10 ? s.qsDay : i === 9 ? s.today : undefined)} />
      <Tap x={28.8} y={28.5} at={0.25} d={4} size={10} />
      <Callout x={C} y={74}>자주 쓰는 날짜를 한 번에</Callout>
    </Phone>
  );
}

export function QuickSelectChips({ playing }: P) {
  return (
    <Phone playing={playing}>
      {['최근 7일', '이번 달', '올해'].map((t, i) => (
        <B key={t} x={5 + [0, 17, 31.5][i]} y={24} w={[15.6, 13.4, 10][i]} h={8} r={4} c="a" className={i === 0 ? s.qsOn : undefined}>
          <T x={[7.8, 6.7, 5][i]} y={1.8} size={3.8} align="center" className={i === 0 ? s.monthInk : undefined}>{t}</T>
        </B>
      ))}
      <B x={5} y={38} w={47.6} h={11} r={3} c="w">
        <B x={3} y={3.2} w={22} h={3.4} c="g" className={s.qsPlace} />
        <T x={3} y={2.6} size={4.2} className={s.qsVal}>3/1 ~ 3/7</T>
      </B>
      <Tap x={12.8} y={28} at={0.25} d={4} size={9} />
      <Callout x={C} y={22} dir="down">알약 모양 빠른 선택</Callout>
    </Phone>
  );
}
