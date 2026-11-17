import { CalendarDays, Check, ChevronDown, Eye, EyeOff, FileText, Minus, Plus, Upload } from 'lucide-react';
import { B, MiniCal, T, Tap, win } from './kit';
import { Callout, Phone } from './Stage';
import s from './Forms.module.css';

/** 🧩 입력 폼 (MiniPhone 템플릿). 폰 안쪽 폭 57.6em, 가운데 28.8em */
type P = { playing: boolean };
const C = 28.8;

export function TextFieldStates({ playing }: P) {
  const words = ['평소', '누르는 중', '틀렸을 때', '못 쓸 때'];
  return (
    <Phone playing={playing} bare>
      {words.map((w, i) => (
        <T key={w} x={C} y={15} size={5.4} align="center" style={win(i, 4, 4.8)}>{w}</T>
      ))}
      <B x={6} y={26} w={45.6} h={12} r={3} c="w" className={s.tf}>
        <span className={s.tfCaret} />
        <B x={3} y={3.4} w={16} h={4} c="g" className={s.tfText} />
      </B>
      <T x={6} y={41} size={3.8} c="sub" style={win(2, 4, 4.8)}>다시 확인해 주세요</T>
      <Callout x={C} y={48}>상황마다 칸 모양이 바뀌어요</Callout>
    </Phone>
  );
}

export function Select({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={6} y={26} w={45.6} h={12} r={3} c="w">
        <B x={3} y={3.4} w={16} h={4} c="g" className={s.selPlace} />
        <B x={3} y={3.4} w={22} h={4} c="k" className={s.selChosen} />
        <ChevronDown className={s.chev} />
      </B>
      <div className={s.selList}>
        <i /><i className={s.selHit} /><i />
      </div>
      <Tap x={44} y={32} at={0.14} d={4} />
      <Tap x={20} y={53} at={0.52} d={4} />
      <Callout x={C} y={76}>눌러서 목록 펼치기</Callout>
    </Phone>
  );
}

export function Segmented({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={6} y={30} w={45.6} h={12} r={6} c="a">
        <span className={s.segPill} />
        {[0, 1, 2].map((i) => <B key={i} x={4.5 + i * 14.6} y={4} w={6} h={4} c="k" style={{ zIndex: 1 }} />)}
      </B>
      <B x={6} y={48} w={45.6} h={24} r={3} c="a" />
      <Callout x={C} y={43}>셋 중 하나만 골라요</Callout>
    </Phone>
  );
}

export function Switch({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[30, 46].map((y, i) => (
        <span key={y}>
          <B x={6} y={y + 3} w={22} h={4} c={i ? 'g' : 'c'} />
          <B x={32} y={y} w={19.6} h={10} r={5} c={i ? 'c' : 'g'} className={i ? undefined : s.swTrack}>
            <span className={`${s.swKnob} ${i ? '' : s.swKnobMove}`} />
          </B>
        </span>
      ))}
      <Tap x={42} y={35} at={0.32} d={4} />
      <Callout x={42} y={29} dir="down">눌러서 켜고 끄기</Callout>
    </Phone>
  );
}

export function Checkbox({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((i) => (
        <span key={i}>
          <B x={6} y={27 + i * 13} w={9} h={9} r={2} c="w" className={i === 1 ? undefined : i === 0 ? s.cb1 : s.cb3}>
            {i !== 1 && <Check className={`${s.cbCheck} ${i === 0 ? s.cbc1 : s.cbc3}`} strokeWidth={3.5} />}
          </B>
          <B x={19} y={29.5 + i * 13} w={[24, 18, 28][i]} h={4} c="g" />
        </span>
      ))}
      <Tap x={10.5} y={31.5} at={0.22} d={4} />
      <Tap x={10.5} y={57.5} at={0.5} d={4} />
      <Callout x={C} y={67}>여러 개 골라도 돼요</Callout>
    </Phone>
  );
}

export function Radio({ playing }: P) {
  return (
    <Phone playing={playing}>
      {[0, 1, 2].map((i) => (
        <span key={i}>
          <B x={6} y={27 + i * 13} w={9} h={9} r={5} c="w">
            <span className={s.radioDot} style={win(i, 3, 3.6)} />
          </B>
          <B x={19} y={29.5 + i * 13} w={[22, 28, 18][i]} h={4} c="g" />
        </span>
      ))}
      <Callout x={C} y={67}>딱 하나만 골라요</Callout>
    </Phone>
  );
}

export function Slider({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={6} y={32} w={22} h={4} c="c" />
      <B x={6} y={44} w={45.6} h={3.6} r={2} c="g">
        <span className={s.slFill} />
        <span className={s.slThumb} />
      </B>
      <Callout x={C} y={53}>손잡이를 밀어서 값 정하기</Callout>
    </Phone>
  );
}

export function Stepper({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={8} y={32} w={41.6} h={14} r={7} c="a">
        <B x={1.6} y={1.6} w={10.8} h={10.8} r={5.4} c="w" className={s.stepBtn}><Minus /></B>
        <B right={1.6} y={1.6} w={10.8} h={10.8} r={5.4} c="p" className={s.stepBtn}><Plus color="#fff" /></B>
        {[1, 2, 3].map((n, i) => (
          <T key={n} x={20.8} y={2.6} size={8} align="center" style={win(i, 3, 3.6)}>{n}</T>
        ))}
      </B>
      <Tap x={43} y={39} at={0.28} d={3.6} />
      <Tap x={43} y={39} at={0.61} d={3.6} />
      <Callout x={C} y={50}>＋를 누를 때마다 하나씩</Callout>
    </Phone>
  );
}

export function DatePicker({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={6} y={24} w={45.6} h={11} r={3} c="w">
        <B x={3} y={3} w={20} h={3.6} c="g" className={s.selPlace} />
        <B x={3} y={3} w={24} h={3.6} c="p" className={s.selChosen} />
        <CalendarDays className={s.chev} />
      </B>
      <span className={s.calPop}>
        <MiniCal x={2.6} y={2.6} cell={4.4} gap={1} rows={5} cellClass={(i) => (i === 17 ? s.calHit : undefined)} />
      </span>
      <Tap x={44} y={29.5} at={0.12} d={4.2} />
      <Tap x={29} y={53} at={0.5} d={4.2} />
      <Callout x={C} y={74}>달력에서 날짜 고르기</Callout>
    </Phone>
  );
}

export function Picker({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={6} y={20} w={45.6} h={42} r={4} c="a" style={{ overflow: 'hidden' }}>
        <B x={2} y={16} w={41.6} h={10} r={2.5} c="s" />
        <div className={s.wheel}>
          {['7시', '8시', '9시', '10시', '11시', '12시', '1시'].map((t) => <b key={t}>{t}</b>)}
        </div>
      </B>
      <Callout x={C} y={64}>돌려서 가운데 것을 골라요</Callout>
    </Phone>
  );
}

export function Placeholder({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={6} y={28} w={45.6} h={12} r={3} c="w">
        <T x={3} y={3} size={5} c="light" weight={400} className={s.phText}>예: 김은티</T>
        <T x={3} y={3} size={5} className={s.phTyped}>김은티</T>
      </B>
      <Callout x={22} y={41}>흐린 예시 글</Callout>
    </Phone>
  );
}

export function Textarea({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={6} y={24} w={45.6} h={40} r={3} c="w">
        {[0, 1, 2, 3].map((i) => <B key={i} x={3} y={3.4 + i * 8} w={[36, 34, 38, 20][i]} h={3.6} c="c" className={s.taLine} style={{ animationDelay: `${i * 0.6}s` }} />)}
        <B x={34} right={1.4} bottom={1.4} w={3} h={3} r={0.4} c="n" className={s.taGrip} />
      </B>
      <Callout x={C} y={66}>여러 줄을 쓰는 큰 칸</Callout>
    </Phone>
  );
}

export function Label({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      {[0, 1].map((i) => (
        <span key={i}>
          <T x={6} y={24 + i * 26} size={5} className={s.labelGlow} style={{ animationDelay: `${i * 1.4}s` }}>{i ? '학년' : '이름'}</T>
          <B x={6} y={31 + i * 26} w={45.6} h={11} r={3} c="w" />
        </span>
      ))}
      <Callout x={14} y={23} dir="down">무슨 칸인지 알려 주는 이름표</Callout>
    </Phone>
  );
}

export function HelperText({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={6} y={20} size={5}>비밀번호</T>
      <B x={6} y={27} w={45.6} h={11} r={3} c="w" />
      <T x={6} y={41} size={3.8} c="sub" weight={400} className={s.helper}>8자 이상, 숫자를 넣어요</T>
      <Callout x={C} y={46}>쓰는 방법을 작게 안내</Callout>
    </Phone>
  );
}

export function FormValidation({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={6} y={14} w={45.6} h={11} r={3} c="w">
        <B x={3} y={3.2} w={20} h={3.6} c="c" />
        <Check className={s.okMark} strokeWidth={3} />
      </B>
      <B x={6} y={30} w={45.6} h={11} r={3} c="w" className={s.badField} />
      <T x={6} y={43.5} size={3.8} c="ink" className={s.badMsg}>! 이 칸을 채워 주세요</T>
      <B x={6} y={64} w={45.6} h={11} r={5.5} c="p"><T x={22.8} y={2.8} size={4.6} c="white" align="center">제출</T></B>
      <Tap x={29} y={69.5} at={0.25} d={4} />
      <Callout x={C} y={49}>빈칸을 찾아 알려 줘요</Callout>
    </Phone>
  );
}

export function RequiredField({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      {[0, 1].map((i) => (
        <span key={i}>
          <T x={6} y={20 + i * 25} size={5}>{i ? '학년' : '이름'}</T>
          <T x={i ? 18 : 18} y={19.4 + i * 25} size={6} c="blue" className={s.star}>*</T>
          <B x={6} y={27 + i * 25} w={45.6} h={11} r={3} c="w" />
        </span>
      ))}
      <Callout x={19.5} y={19} dir="down">꼭 채워야 하는 칸</Callout>
    </Phone>
  );
}

export function FileUpload({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={6} y={14} w={45.6} h={36} r={4} c="n" className={s.drop}>
        <Upload className={s.upIcon} />
      </B>
      <span className={s.file}><FileText /></span>
      <B x={6} y={56} w={45.6} h={3.4} r={2} c="g"><span className={s.upFill} /></B>
      <Callout x={C} y={63}>끌어다 놓거나 눌러서 올리기</Callout>
    </Phone>
  );
}

export function ColorPicker({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <B x={6} y={12} w={45.6} h={36} r={3} c="n" className={s.colorSq}>
        <span className={s.colorDot} />
      </B>
      <B x={6} y={62} w={12} h={12} r={6} c="p" className={s.swatch} />
      <T x={22} y={65.5} size={4.6} style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>#0095FF</T>
      <Callout x={C} y={49}>점을 옮겨서 색 고르기</Callout>
    </Phone>
  );
}

export function TagInput({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={6} y={28} w={45.6} h={24} r={3} c="w">
        {[[2.4, 2.4, 14], [18.4, 2.4, 11], [2.4, 11.4, 17]].map(([x, y, w], i) => (
          <B key={i} x={x} y={y} w={w} h={7} r={3.5} c="s" className={s.chip} style={{ animationDelay: `${0.5 + i * 0.9}s` }}>
            <B x={2} y={2.4} w={w - 6} h={2.2} r={1} c="p" />
          </B>
        ))}
      </B>
      <Callout x={C} y={54}>엔터를 치면 칩으로 쌓여요</Callout>
    </Phone>
  );
}

export function PasswordToggle({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <T x={6} y={20} size={5}>비밀번호</T>
      <B x={6} y={27} w={45.6} h={12} r={3} c="w">
        <span className={s.dots} style={win(0, 2, 3.6)}>{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</span>
        <T x={3} y={3.2} size={5} style={{ ...win(1, 2, 3.6), fontFamily: 'ui-monospace, Consolas, monospace' }}>eunti24</T>
        <span className={s.eye} style={win(0, 2, 3.6)}><EyeOff /></span>
        <span className={s.eye} style={win(1, 2, 3.6)}><Eye /></span>
      </B>
      <Tap x={45} y={33} at={0.47} d={3.6} />
      <Tap x={45} y={33} at={0.97} d={3.6} />
      <Callout x={45} y={39}>눈을 누르면 보여요</Callout>
    </Phone>
  );
}
