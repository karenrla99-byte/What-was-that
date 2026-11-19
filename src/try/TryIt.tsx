import { useEffect, useRef, useState, type PointerEvent as RPE, type ReactNode } from 'react';
import { Check, ChevronDown, Minus, Plus, Star, Trash2, User, Volume2, VolumeX } from 'lucide-react';
import s from './TryIt.module.css';

/**
 * 직접 해보기: 상세 화면에서 진짜로 눌러 보는 작은 부품들.
 * 단위는 em (그림 칸 짧은 변의 1% = 1em). 진짜 버튼·입력 요소라 키보드로도 쓸 수 있어요.
 */

function Phone({ children, hint }: { children: ReactNode; hint: string }) {
  return (
    <div className={s.root}>
      <div className={s.unit}>
        <p className={s.hint}>{hint}</p>
        <div className={s.phone}><div className={s.screen}>{children}</div></div>
      </div>
    </div>
  );
}

function Segmented() {
  const items = ['오늘', '이번 주', '이번 달'];
  const [i, setI] = useState(0);
  return (
    <Phone hint="세 칸 중 하나를 눌러 보세요">
      <div className={s.seg} role="radiogroup" aria-label="기간">
        <span className={s.segPill} style={{ transform: `translateX(${i * 100}%)` }} />
        {items.map((t, k) => (
          <button key={t} type="button" role="radio" aria-checked={i === k} className={i === k ? s.on : undefined} onClick={() => setI(k)}>{t}</button>
        ))}
      </div>
      <p className={s.big}>{[3, 12, 41][i]}<small>권 읽었어요</small></p>
    </Phone>
  );
}

function Switch() {
  const [on, setOn] = useState(true);
  return (
    <Phone hint="스위치를 눌러 켜고 꺼 보세요">
      <div className={s.row}>
        {on ? <Volume2 className={s.rowIc} /> : <VolumeX className={s.rowIc} />}
        <span>효과음</span>
        <button type="button" role="switch" aria-checked={on} aria-label="효과음" className={`${s.sw} ${on ? s.swOn : ''}`} onClick={() => setOn(!on)}><i /></button>
      </div>
      <p className={s.status}>{on ? '소리가 나요' : '조용해요'}</p>
    </Phone>
  );
}

function Checkbox() {
  const items = ['국어', '수학', '과학', '미술'];
  const [sel, setSel] = useState<string[]>(['국어']);
  const toggle = (t: string) => setSel((v) => (v.includes(t) ? v.filter((x) => x !== t) : [...v, t]));
  return (
    <Phone hint="여러 개를 골라 보세요">
      <p className={s.q}>좋아하는 과목은?</p>
      {items.map((t) => (
        <label key={t} className={s.check}>
          <input type="checkbox" checked={sel.includes(t)} onChange={() => toggle(t)} />
          <span className={s.box}><Check strokeWidth={3.5} /></span>
          {t}
        </label>
      ))}
      <p className={s.status}>{sel.length}개 골랐어요</p>
    </Phone>
  );
}

function Radio() {
  const items: [string, number][] = [['작게', 1], ['보통', 1.3], ['크게', 1.7]];
  const [v, setV] = useState(1);
  return (
    <Phone hint="하나만 고를 수 있어요">
      <p className={s.q}>글자 크기</p>
      {items.map(([t], k) => (
        <label key={t} className={s.check}>
          <input type="radio" name="try-radio" checked={v === k} onChange={() => setV(k)} />
          <span className={`${s.box} ${s.circle}`}><i /></span>
          {t}
        </label>
      ))}
      <p className={s.sample} style={{ fontSize: `${items[v][1]}em` }}>가나다</p>
    </Phone>
  );
}

function Slider() {
  const [v, setV] = useState(60);
  return (
    <Phone hint="손잡이를 좌우로 밀어 보세요">
      <p className={s.q}>소리 크기</p>
      <div className={s.bars} aria-hidden="true">{Array.from({ length: 10 }, (_, k) => <i key={k} className={k * 10 < v ? s.barOn : undefined} style={{ height: `${0.6 + k * 0.32}em` }} />)}</div>
      <input className={s.range} type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} aria-label="소리 크기" style={{ ['--p' as string]: `${v}%` }} />
      <p className={s.status}>{v}</p>
    </Phone>
  );
}

function Stepper() {
  const [n, setN] = useState(3);
  return (
    <Phone hint="− + 를 눌러 보세요">
      <p className={s.q}>모둠 인원</p>
      <div className={s.stepper}>
        <button type="button" aria-label="줄이기" disabled={n <= 1} onClick={() => setN(n - 1)}><Minus /></button>
        <output aria-live="polite">{n}</output>
        <button type="button" aria-label="늘리기" disabled={n >= 6} onClick={() => setN(n + 1)}><Plus /></button>
      </div>
      <div className={s.people}>{Array.from({ length: n }, (_, k) => <User key={k} />)}</div>
      <p className={s.status}>1명부터 6명까지</p>
    </Phone>
  );
}

function Tabs() {
  const items = ['설명', '예시', '문제'];
  const [i, setI] = useState(0);
  return (
    <Phone hint="이름표를 눌러 보세요">
      <div className={s.tabs} role="tablist">
        {items.map((t, k) => (
          <button key={t} type="button" role="tab" aria-selected={i === k} className={i === k ? s.on : undefined} onClick={() => setI(k)}>{t}</button>
        ))}
        <span className={s.tabLine} style={{ transform: `translateX(${i * 100}%)` }} />
      </div>
      <div className={s.tabBody} role="tabpanel" key={i}>
        {[<p key="a">바텀시트는 화면 아래에서 올라오는 판이에요.</p>, <div key="b" className={s.miniSheet}><i /></div>, <p key="c">Q. 아래에서 올라오는 판의 이름은?</p>][i]}
      </div>
    </Phone>
  );
}

function Accordion() {
  const items: [string, string][] = [['준비물이 뭐예요?', '연필, 지우개, 색연필이에요.'], ['언제 끝나요?', '3교시가 끝나면 마쳐요.'], ['어디서 해요?', '과학실에서 해요.']];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Phone hint="질문을 눌러 펼치고 접어 보세요">
      {items.map(([q, a], k) => (
        <div key={q} className={s.acc}>
          <button type="button" aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)}>
            {q}<ChevronDown className={open === k ? s.flip : undefined} />
          </button>
          <div className={`${s.accBody} ${open === k ? s.accOpen : ''}`}><p>{a}</p></div>
        </div>
      ))}
    </Phone>
  );
}

function StarRating() {
  const [v, setV] = useState(3);
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? v;
  return (
    <Phone hint="별을 눌러 점수를 매겨 보세요">
      <p className={s.q}>오늘 활동은 어땠나요?</p>
      <div className={s.stars} role="radiogroup" aria-label="별점" onMouseLeave={() => setHover(null)}>
        {[1, 2, 3, 4, 5].map((k) => (
          <button key={k} type="button" role="radio" aria-checked={v === k} aria-label={`${k}점`} className={k <= shown ? s.on : undefined} onMouseEnter={() => setHover(k)} onClick={() => setV(k)}><Star /></button>
        ))}
      </div>
      <p className={s.status}>{['', '아쉬워요', '그저 그래요', '괜찮아요', '좋아요', '최고예요'][shown]} · {shown}점</p>
    </Phone>
  );
}

/** 끌기 도우미: 누른 뒤 움직인 거리 */
function useDrag(onEnd: (dx: number, dy: number) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const [d, setD] = useState({ x: 0, y: 0 });
  return {
    d,
    dragging: start.current !== null,
    bind: {
      onPointerDown: (e: RPE) => { start.current = { x: e.clientX, y: e.clientY }; (e.currentTarget as Element).setPointerCapture(e.pointerId); },
      onPointerMove: (e: RPE) => { if (start.current) setD({ x: e.clientX - start.current.x, y: e.clientY - start.current.y }); },
      onPointerUp: () => { if (!start.current) return; start.current = null; onEnd(d.x, d.y); setD({ x: 0, y: 0 }); },
      onPointerCancel: () => { start.current = null; setD({ x: 0, y: 0 }); },
    },
  };
}

function BottomSheet() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState('보통');
  const drag = useDrag((_, dy) => { if (dy > 40) setOpen(false); });
  return (
    <Phone hint="눌러서 올리고, 손잡이를 끌어 내려 보세요">
      <p className={s.sample} style={{ fontSize: { 작게: '1em', 보통: '1.3em', 크게: '1.7em' }[size] }}>가나다</p>
      <button type="button" className={s.mainBtn} onClick={() => setOpen(true)}>글자 크기 바꾸기</button>
      <div className={`${s.dim} ${open ? s.dimOn : ''}`} onClick={() => setOpen(false)} />
      <div className={`${s.sheet} ${open ? s.sheetOn : ''}`} style={open && drag.d.y > 0 ? { transform: `translateY(${drag.d.y}px)`, transition: 'none' } : undefined} aria-hidden={!open}>
        <span className={s.handle} {...drag.bind} />
        {['작게', '보통', '크게'].map((t) => (
          <button key={t} type="button" tabIndex={open ? 0 : -1} className={size === t ? s.on : undefined} onClick={() => { setSize(t); setOpen(false); }}>{t}{size === t && <Check />}</button>
        ))}
      </div>
    </Phone>
  );
}

function Toast() {
  const [n, setN] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!n) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <Phone hint="저장을 누르면 잠깐 떴다 사라져요">
      <div className={s.lines}><i /><i /><i /></div>
      <button type="button" className={s.mainBtn} onClick={() => setN(n + 1)}>저장</button>
      <div className={`${s.toast} ${show ? s.toastOn : ''}`} role="status">{show && <><Check />저장됐어요</>}</div>
    </Phone>
  );
}

function Modal() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const cancel = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (open) cancel.current?.focus(); }, [open]);
  return (
    <Phone hint="지우기를 누르면 가운데 창이 떠요">
      <div className={`${s.card} ${gone ? s.cardGone : ''}`}>{gone ? '지웠어요' : '내 그림.png'}</div>
      <button type="button" className={`${s.mainBtn} ${s.dark}`} onClick={() => (gone ? setGone(false) : setOpen(true))}>{gone ? '다시 놓기' : <><Trash2 />지우기</>}</button>
      <div className={`${s.dim} ${open ? s.dimOn : ''}`} />
      {open && (
        <div className={s.modal} role="dialog" aria-modal="true" aria-label="정말 지울까요?" onKeyDown={(e) => e.key === 'Escape' && (e.stopPropagation(), setOpen(false))}>
          <b>정말 지울까요?</b>
          <p>지우면 되돌릴 수 없어요.</p>
          <div>
            <button ref={cancel} type="button" onClick={() => setOpen(false)}>취소</button>
            <button type="button" className={s.danger} onClick={() => { setGone(true); setOpen(false); }}>지우기</button>
          </div>
        </div>
      )}
    </Phone>
  );
}

function Swipe() {
  const cards = ['1', '2', '3', '4'];
  const [i, setI] = useState(0);
  const drag = useDrag((dx) => { if (dx < -30) setI((v) => Math.min(cards.length - 1, v + 1)); if (dx > 30) setI((v) => Math.max(0, v - 1)); });
  return (
    <Phone hint="카드를 옆으로 밀어 넘겨 보세요">
      <div className={s.swipe} tabIndex={0} aria-label={`${i + 1}번째 카드`} onKeyDown={(e) => { if (e.key === 'ArrowRight') setI(Math.min(cards.length - 1, i + 1)); if (e.key === 'ArrowLeft') setI(Math.max(0, i - 1)); }} {...drag.bind}>
        <div className={s.track} style={{ transform: `translateX(calc(${-i * 100}% + ${drag.d.x}px))`, transition: drag.d.x ? 'none' : undefined }}>
          {cards.map((c) => <div key={c} className={s.slide}><b>{c}</b></div>)}
        </div>
      </div>
      <div className={s.dots}>{cards.map((c, k) => <i key={c} className={k === i ? s.on : undefined} />)}</div>
    </Phone>
  );
}

function Drag() {
  const [inBox, setInBox] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLButtonElement>(null);
  const drag = useDrag(() => {
    const b = boxRef.current?.getBoundingClientRect(), it = itemRef.current?.getBoundingClientRect();
    if (b && it && it.top + it.height / 2 > b.top && it.top + it.height / 2 < b.bottom) setInBox(true);
  });
  return (
    <Phone hint="사과를 끌어서 바구니에 넣어 보세요">
      <div className={s.dragArea}>
        {!inBox && (
          <button ref={itemRef} type="button" className={s.item} style={{ transform: `translate(${drag.d.x}px, ${drag.d.y}px)`, transition: drag.d.x || drag.d.y ? 'none' : undefined }} onClick={(e) => e.detail === 0 && setInBox(true)} {...drag.bind}>사과</button>
        )}
        <div ref={boxRef} className={`${s.basket} ${inBox ? s.basketOn : ''}`}>
          {inBox ? <><span className={s.item}>사과</span><Check className={s.ok} /></> : '과일 바구니'}
        </div>
        {inBox && <button type="button" className={s.again} onClick={() => setInBox(false)}>다시 하기</button>}
      </div>
    </Phone>
  );
}

const TRY: Record<string, () => ReactNode> = {
  'segmented-control': Segmented,
  switch: Switch,
  checkbox: Checkbox,
  'radio-button': Radio,
  slider: Slider,
  'quantity-stepper': Stepper,
  tabs: Tabs,
  accordion: Accordion,
  'star-rating': StarRating,
  'bottom-sheet': BottomSheet,
  toast: Toast,
  modal: Modal,
  swipe: Swipe,
  drag: Drag,
};

export const hasTry = (id: string) => id in TRY;

export default function TryIt({ id }: { id: string }) {
  const C = TRY[id];
  return C ? <C /> : null;
}
