import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Copy, MousePointerClick, Play, Search, Sprout } from 'lucide-react';
import TermAnim from '../anim/TermAnim';
import Footer from '../components/Footer';
import TermCard from '../components/TermCard';
import CardGrid from '../components/CardGrid';
import { GROUPS } from '../data/groups';
import { TERMS, TERM_MAP } from '../data/terms';
import s from './Landing.module.css';

/** 처음 들어온 사람에게 한 번 보여 주는 소개 화면. 다시 보려면 /welcome */
export const SEEN_KEY = 'ww-seen-landing';

export function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* 저장이 막힌 브라우저 */
  }
}

export function hasSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return true;
  }
}

/** 검색창에 생김새를 치면 → 정확한 이름이 나오는 예시 */
const DEMO: [string, string][] = [
  ['아래서 올라오는 창', 'bottom-sheet'],
  ['잠깐 떴다 사라지는 알림', 'toast'],
  ['옆으로 넘기는 사진', 'carousel'],
  ['회색 뼈대 로딩', 'skeleton'],
];

const SHOWCASE = ['bottom-sheet', 'toast', 'skeleton', 'carousel', 'confetti', 'accordion', 'typing-effect', 'star-rating'];

function useReduced() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function SearchDemo() {
  const reduced = useReduced();
  const [k, setK] = useState(0);
  const [n, setN] = useState(reduced ? DEMO[0][0].length : 0);
  const [q, id] = DEMO[k];
  const done = n >= q.length;

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(
      () => {
        if (!done) setN(n + 1);
        else {
          setK((k + 1) % DEMO.length);
          setN(0);
        }
      },
      done ? 2600 : 110,
    );
    return () => clearTimeout(t);
  }, [n, done, k, reduced]);

  const term = TERM_MAP.get(id)!;
  return (
    <div className={s.demo} aria-label="검색 예시" role="img">
      <div className={s.demoSearch}>
        <Search size={20} aria-hidden="true" />
        <span>
          {q.slice(0, n)}
          <i className={s.caret} />
        </span>
      </div>
      <div className={`${s.demoCard} ${done ? s.demoOn : ''}`} aria-hidden={!done}>
        <div className={s.demoStage}>{done && <TermAnim key={id} term={term} playing size="card" />}</div>
        <div className={s.demoName}>
          <b>{term.ko}</b>
          <span lang="en">{term.en}</span>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const start = (to: string) => {
    markSeen();
    navigate(to);
  };
  const showcase = SHOWCASE.map((id) => TERM_MAP.get(id)!).filter(Boolean);
  const count = (key: string) => TERMS.filter((t) => t.groups.some((g) => g.group === key)).length;

  return (
    <div className={s.page}>
      <header className={s.top}>
        <span className={s.logo}>
          그거 뭐더라<b>?</b>
        </span>
        <button type="button" className={s.skip} onClick={() => start('/')}>
          바로 사전 보기 <ArrowRight size={16} aria-hidden="true" />
        </button>
      </header>

      <main>
        {/* 첫 화면 */}
        <section className={s.hero}>
          <div className={s.heroText}>
            <p className={s.kicker}>
              바이브코딩 용어사전 · <i>Vibe Glossary</i>
            </p>
            <h1 className={s.title}>
              그거… 뭐였더라<b>?</b>
            </h1>
            <p className={s.lead}>
              만들고 싶은 화면은 머릿속에 있는데 이름이 안 떠오를 때.
              <br />
              움직이는 그림으로 찾고, <strong>정확한 이름</strong>으로 AI에게 말해요.
            </p>
            <div className={s.ctas}>
              <button type="button" className={s.primary} onClick={() => start('/')}>
                사전 열어 보기 <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button type="button" className={s.secondary} onClick={() => start('/c/start')}>
                <Sprout size={18} aria-hidden="true" /> 처음이라면 여기부터
              </button>
            </div>
            <p className={s.stats}>
              용어 <b>{TERMS.length}</b>개 · 묶음 <b>{GROUPS.length}</b>개 · 모두 움직이는 그림
            </p>
          </div>
          <SearchDemo />
        </section>

        {/* 이렇게 달라져요 */}
        <section className={s.block} aria-labelledby="before-after">
          <h2 id="before-after" className={s.h2}>
            이름을 알면 AI가 한 번에 알아들어요
          </h2>
          <div className={s.ba}>
            <div className={`${s.bubble} ${s.before}`}>
              <span className={s.tag}>이름을 모를 때</span>
              <p>"아래에서 뭔가 쓱 올라오는 창 같은 거… 그거 만들어줘"</p>
            </div>
            <ArrowRight className={s.baArrow} size={28} aria-hidden="true" />
            <div className={`${s.bubble} ${s.after}`}>
              <span className={s.tag}>이름을 알 때</span>
              <p>
                "설정 버튼을 누르면 화면 아래에서 <strong>바텀시트</strong>가 올라와서 글자 크기를 고를 수 있게 해줘"
              </p>
            </div>
          </div>
        </section>

        {/* 쓰는 방법 */}
        <section className={s.block} aria-labelledby="how">
          <h2 id="how" className={s.h2}>
            세 걸음이면 돼요
          </h2>
          <ol className={s.steps}>
            <li>
              <span className={s.stepIcon}><Search aria-hidden="true" /></span>
              <b>찾기</b>
              <p>"아래서 올라오는 창"처럼 생김새로 쳐도, "ㅂㅌㅅㅌ"처럼 초성만 쳐도 찾아요.</p>
            </li>
            <li>
              <span className={s.stepIcon}><Play aria-hidden="true" /></span>
              <b>보기</b>
              <p>움직이는 그림으로 생김새와 작동을 확인하고, 직접 눌러 볼 수도 있어요.</p>
            </li>
            <li>
              <span className={s.stepIcon}><Copy aria-hidden="true" /></span>
              <b>복사</b>
              <p>프롬프트 예시 문장을 복사해서 AI에게 그대로 붙여 넣어요.</p>
            </li>
          </ol>
        </section>

        {/* 맛보기 카드 */}
        <section className={s.block} aria-labelledby="taste">
          <h2 id="taste" className={s.h2}>
            이런 이름들이 있어요
          </h2>
          <p className={s.sub}>
            <MousePointerClick size={16} aria-hidden="true" /> 카드를 눌러 보세요
          </p>
          <CardGrid>
            {showcase.map((t, i) => (
              <TermCard key={t.id} term={t} index={i} />
            ))}
          </CardGrid>
        </section>

        {/* 묶음 */}
        <section className={s.block} aria-labelledby="groups">
          <h2 id="groups" className={s.h2}>
            11개 묶음으로 나눠 두었어요
          </h2>
          <ul className={s.groups}>
            {GROUPS.map((g) => {
              const Icon = g.icon;
              return (
                <li key={g.key}>
                  <Link to={`/c/${g.key}`} onClick={markSeen} className={s.group}>
                    <Icon size={20} aria-hidden="true" />
                    <span>{g.name}</span>
                    <small>{count(g.key)}</small>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={s.final}>
          <h2 className={s.finalTitle}>이제 "그거"를 이름으로 불러 봐요</h2>
          <button type="button" className={s.primary} onClick={() => start('/')}>
            사전 열어 보기 <ArrowRight size={18} aria-hidden="true" />
          </button>
        </section>
      </main>
      <Footer linked />
    </div>
  );
}
