import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, Hand, ChevronLeft, ChevronRight, Copy, KeyRound, MessageCircle, RotateCcw, Scale, X } from 'lucide-react';
import TermAnim from '../anim/TermAnim';
import TryIt, { hasTry } from '../try/TryIt';
import { GROUP_MAP } from '../data/groups';
import { sequenceFor } from '../data/lists';
import { TERM_MAP, type Term } from '../data/terms';
import Toast from './Toast';
import s from './Detail.module.css';

type Bg = { pathname: string; search?: string };
type Rect = { x: number; y: number; w: number; h: number };
type NavState = { bg?: Bg; rect?: Rect } | null;

/** 프롬프트 문장에서 핵심 용어를 찾아 강조 */
function PromptText({ term }: { term: Term }) {
  const names = [term.ko, ...term.aliases, ...term.ko.split(/ vs |\s*[/·]\s*/)].filter((n) => n.length > 0);
  const parts: (string | { hit: string })[] = [term.prompt];
  for (const name of names) {
    if (parts.some((p) => typeof p !== 'string')) break;
    const text = parts[0] as string;
    const i = text.indexOf(name);
    if (i >= 0) parts.splice(0, 1, text.slice(0, i), { hit: name }, text.slice(i + name.length));
  }
  return (
    <>
      {parts.map((p, i) => (typeof p === 'string' ? p : <strong key={i} className={s.key}>{p.hit}</strong>))}
    </>
  );
}

/** 상세 화면: 카드가 커지며 열리는 창. 주소는 /t/:id */
export default function Detail() {
  const { id } = useParams();
  const term = id ? TERM_MAP.get(id) : undefined;
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as NavState;
  const bg: Bg = state?.bg ?? { pathname: '/' };

  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [replay, setReplay] = useState(0);
  const [compare, setCompare] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [more, setMore] = useState(false);
  const [trying, setTrying] = useState(false);

  const seq = useMemo(() => sequenceFor(bg.pathname, bg.search), [bg.pathname, bg.search]);
  const pos = term ? seq.indexOf(term) : -1;
  const prev = pos > 0 ? seq[pos - 1] : undefined;
  const next = pos >= 0 && pos < seq.length - 1 ? seq[pos + 1] : undefined;

  const close = () => {
    // 목록에서 들어왔으면 그 자리로, 주소로 바로 들어왔으면 홈으로
    if (state?.bg) navigate(-1);
    else navigate('/', { replace: true });
  };
  const goTo = (t: Term) => navigate(`/t/${t.id}`, { replace: true, state: { bg } });

  // 카드 자리에서 커지며 열리기 (스프링 느낌)
  useLayoutEffect(() => {
    const el = panelRef.current;
    const r = state?.rect;
    if (!el || !r || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const to = el.getBoundingClientRect();
    el.animate(
      [
        {
          transform: `translate(${r.x - to.left}px, ${r.y - to.top}px) scale(${r.w / to.width}, ${r.h / to.height})`,
          opacity: 0.4,
        },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 460, easing: 'cubic-bezier(0.3, 1.32, 0.5, 1)' },
    );
    // 처음 열릴 때 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 용어가 바뀌면 처음 상태로
  useEffect(() => {
    setCompare(null);
    setCopied(false);
    setMore(false);
    setTrying(false);
    setReplay(0);
    panelRef.current?.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!term) return;
    const before = document.title;
    document.title = `${term.ko} · 그거 뭐더라?`;
    return () => {
      document.title = before;
    };
  }, [term]);

  // 뒤 화면 스크롤 막기 + 포커스 옮기기
  useEffect(() => {
    const last = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add('modal-open');
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.classList.remove('modal-open');
      last?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft' && prev) goTo(prev);
      else if (e.key === 'ArrowRight' && next) goTo(next);
      else if (e.key === 'Tab') {
        // 창 안에서만 Tab 이동
        const items = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)');
        if (!items?.length) return;
        const first = items[0];
        const lastItem = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastItem.focus(); }
        else if (!e.shiftKey && document.activeElement === lastItem) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const copy = async () => {
    if (!term) return;
    try {
      await navigator.clipboard.writeText(term.prompt);
    } catch {
      // 클립보드 권한이 없는 브라우저용
      const ta = document.createElement('textarea');
      ta.value = term.prompt;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setToast('복사됐어요');
  };

  const related = term ? term.related.map((x) => TERM_MAP.get(x)).filter((x): x is Term => !!x) : [];
  const rivals = term ? (term.vs ?? []).map((x) => TERM_MAP.get(x)).filter((x): x is Term => !!x) : [];
  const rival = rivals.find((x) => x.id === compare);

  const replayBtn = (
    <button type="button" className={s.replay} onClick={() => setReplay((n) => n + 1)}>
      <RotateCcw size={16} strokeWidth={2.4} aria-hidden="true" />
      다시 보기
    </button>
  );

  return (
    <div className={s.overlay} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div ref={panelRef} className={s.panel} role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <div className={s.bar}>
          <button ref={closeRef} type="button" className={s.pillBtn} onClick={close}>
            {state?.bg ? <ArrowLeft size={18} aria-hidden="true" /> : <X size={18} aria-hidden="true" />}
            닫기
          </button>
          {term && (
            <div className={s.pager}>
              <button type="button" className={s.pillBtn} disabled={!prev} onClick={() => prev && goTo(prev)}>
                <ChevronLeft size={18} aria-hidden="true" />
                이전
              </button>
              <button type="button" className={s.pillBtn} disabled={!next} onClick={() => next && goTo(next)}>
                다음
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {!term ? (
          <div className={s.missing}>
            <h2 id="detail-title" className={s.ko}>이 용어는 찾을 수 없어요</h2>
            <p className={s.meaning}>주소가 바뀌었거나 없는 용어예요. 목록에서 다시 찾아보세요.</p>
          </div>
        ) : (
          <div className={s.body}>
            {/* 왼쪽: 움직이는 예시 (비교 중이면 두 개 나란히) */}
            <div className={s.visual}>
              {rival ? (
                <section aria-label={`${term.ko} vs ${rival.ko} 나란히 비교`}>
                  <div className={s.duo}>
                    {[term, rival].map((t) => (
                      <figure key={t.id} className={s.side}>
                        <div className={s.stage}>
                          <TermAnim key={replay} term={t} playing size="detail" />
                        </div>
                        <figcaption className={s.sideName}>{t.ko}</figcaption>
                      </figure>
                    ))}
                    <span className={s.vsMark} aria-hidden="true">vs</span>
                  </div>
                  {term.vsNote?.[rival.id] && <p className={s.note}>{term.vsNote[rival.id]}</p>}
                  <div className={s.actions}>
                    {replayBtn}
                    <button type="button" className={s.ghostBtn} onClick={() => setCompare(null)}>
                      <X size={16} aria-hidden="true" />
                      비교 닫기
                    </button>
                    <button type="button" className={s.ghostBtn} onClick={() => goTo(rival)}>
                      {rival.ko} 보기
                      <ChevronRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </section>
              ) : (
                <section className={`${s.stage} ${s.big}`} aria-label={trying ? '직접 해보기' : '움직이는 예시'}>
                  {trying ? <TryIt id={term.id} /> : <TermAnim key={replay} term={term} playing size="detail" />}
                  <div className={s.replayWrap}>
                    {!trying && replayBtn}
                    {term.tryIt && hasTry(term.id) && (
                      <button type="button" className={`${s.replay} ${trying ? '' : s.tryBtn}`} aria-pressed={trying} onClick={() => setTrying((v) => !v)}>
                        {trying ? <RotateCcw size={16} strokeWidth={2.4} aria-hidden="true" /> : <Hand size={16} strokeWidth={2.4} aria-hidden="true" />}
                        {trying ? '예시 보기' : '직접 해보기'}
                      </button>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* 오른쪽: 이름 · 뜻 · 프롬프트 · 같이 쓰면 좋은 말 · 헷갈리는 짝 */}
            <div className={s.info}>
              <header className={s.head}>
                <h2 id="detail-title" className={s.ko}>
                  {term.ko} <span className={s.en} lang="en">{term.en}</span>
                </h2>
                <ul className={s.tags} aria-label="분류">
                  {term.groups.map((g) => {
                    const Icon = GROUP_MAP[g.group].icon;
                    return (
                      <li key={g.group + g.sub} className={s.tag}>
                        <Icon size={13} strokeWidth={2.4} aria-hidden="true" />
                        {GROUP_MAP[g.group].name} · {g.sub}
                      </li>
                    );
                  })}
                  {term.aliases.length > 0 && <li className={s.alias}>다른 이름: {term.aliases.join(' · ')}</li>}
                </ul>
              </header>

              <div className={s.meanBox}>
                <p className={s.meaning}>{term.easy}</p>
                {term.more && (
                  <>
                    <button type="button" className={s.moreBtn} aria-expanded={more} aria-controls="term-more" onClick={() => setMore((v) => !v)}>
                      {more ? '접기' : '자세히 보기'}
                      <ChevronDown size={16} strokeWidth={2.4} aria-hidden="true" className={more ? s.flip : undefined} />
                    </button>
                    <div id="term-more" className={`${s.more} ${more ? s.moreOpen : ''}`} hidden={!more}>
                      {term.more.split(' // ').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </>
                )}
              </div>

              <section className={s.promptBox}>
                <h3 className={s.promptTitle}>
                  <MessageCircle size={17} strokeWidth={2.2} aria-hidden="true" />
                  프롬프트 이렇게 써보세요
                </h3>
                <div className={s.promptWrap}>
                  <p className={s.prompt}>
                    <PromptText term={term} />
                  </p>
                  <button type="button" className={s.copyBtn} onClick={copy} aria-label="프롬프트 복사">
                    {copied ? <Check size={15} strokeWidth={3} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                    복사
                  </button>
                </div>
              </section>

              {related.length > 0 && (
                <section className={s.row}>
                  <h3 className={s.label}>
                    <KeyRound size={16} strokeWidth={2.2} aria-hidden="true" />
                    같이 쓰면 좋은 말
                  </h3>
                  <ul className={s.chips}>
                    {related.map((t) => (
                      <li key={t.id}>
                        <Link to={`/t/${t.id}`} replace state={{ bg }} className={s.chip}>
                          {t.ko}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {rivals.length > 0 && (
                <section className={s.row}>
                  <h3 className={s.label}>
                    <Scale size={16} strokeWidth={2.2} aria-hidden="true" />
                    헷갈리는 짝
                  </h3>
                  <ul className={s.chips}>
                    {rivals.map((t) => (
                      <li key={t.id}>
                        <button
                          type="button"
                          className={`${s.chip} ${s.vsBtn} ${compare === t.id ? s.vsOn : ''}`}
                          aria-pressed={compare === t.id}
                          onClick={() => setCompare(compare === t.id ? null : t.id)}
                        >
                          <em>vs</em> {t.ko}
                          <span className={s.vsHint}>{compare === t.id ? '비교 중' : '나란히 비교'}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
      <Toast message={toast} />
    </div>
  );
}
