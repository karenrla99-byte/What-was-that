import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import CardGrid from './components/CardGrid';
import Detail from './components/Detail';
import Footer from './components/Footer';
import IndexStrip, { indexId } from './components/IndexStrip';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Sidebar from './components/Sidebar';
import StarterRow from './components/StarterRow';
import TermCard from './components/TermCard';
import { GROUP_MAP, isGroupKey, subId, type GroupKey } from './data/groups';
import { ALL_SECTIONS, sectionsOf } from './data/lists';
import { STARTERS, TERMS } from './data/terms';
import { useScrollSpy } from './hooks/useScrollSpy';
import Splash from './components/Splash';
import { search, suggest } from './lib/search';
import s from './App.module.css';

const ALL_IDS = ALL_SECTIONS.map((x) => indexId(x.key));
const AVAILABLE = new Set(ALL_SECTIONS.map((x) => x.key));

function Home() {
  const { group: param } = useParams();
  const group: GroupKey | null = isGroupKey(param) ? param : null;
  const [drawer, setDrawer] = useState(false);
  const info = group ? GROUP_MAP[group] : null;

  // 검색어: 입력은 바로 반영하고, 주소(?q=)에는 조금 뒤에 적어 둠 (상세에서 돌아와도 남게)
  const location = useLocation();
  const navigate = useNavigate();
  const urlQ = new URLSearchParams(location.search).get('q') ?? '';
  const [text, setText] = useState(urlQ);
  const query = useDeferredValue(text).trim();
  const searching = query.length > 0;
  const hits = useMemo(() => search(TERMS, query), [query]);
  const suggestions = useMemo(() => (searching && !hits.length ? suggest(TERMS, query) : []), [searching, hits, query]);

  useEffect(() => {
    const next = text.trim();
    if (next === urlQ) return;
    const timer = setTimeout(() => {
      navigate({ pathname: location.pathname, search: next ? `?q=${encodeURIComponent(next)}` : '' }, { replace: true });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (searching) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [query, searching]);

  const sections = useMemo(() => (info ? sectionsOf(info) : []), [info]);
  const spyIds = useMemo(() => (info ? sections.map((x) => subId(x.sub)) : ALL_IDS), [info, sections]);
  const activeId = useScrollSpy(spyIds);
  const activeSub = info ? (sections.find((x) => subId(x.sub) === activeId)?.sub ?? null) : null;
  const activeKey = info ? null : (ALL_SECTIONS.find((x) => indexId(x.key) === activeId)?.key ?? null);

  // 다른 묶음으로 옮기면 맨 위로 + 검색어 지우기 (처음 열 때는 주소의 검색어를 그대로 둠)
  const lastGroup = useRef<GroupKey | null | undefined>(undefined);
  useEffect(() => {
    if (lastGroup.current === group) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (lastGroup.current !== undefined) setText('');
    lastGroup.current = group;
  }, [group]);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer]);

  if (param && !group) return <Navigate to="/" replace />;
  const Icon = info?.icon;

  return (
    <>
      <Sidebar current={group} activeSub={activeSub} open={drawer} onClose={() => setDrawer(false)} />
      <div className={`${s.main} ${info || searching ? '' : s.withIndex}`}>
        <SearchBar value={text} onChange={setText} onMenu={() => setDrawer(true)} />
        <main className={s.content}>
          {searching ? (
            <SearchResults query={query} hits={hits} suggestions={suggestions} onPick={setText} />
          ) : info && Icon ? (
            <>
              <h2 className={s.heading}>
                <Icon size={26} strokeWidth={2.2} className={s.headingIcon} aria-hidden="true" />
                {info.name}
              </h2>
              {sections.map(({ sub, terms }) => (
                <section key={sub} id={subId(sub)} className={s.section} aria-labelledby={`${subId(sub)}-h`}>
                  <h3 id={`${subId(sub)}-h`} className={s.subheading}>
                    {sub} <span className={s.count}>{terms.length}</span>
                  </h3>
                  <CardGrid>
                    {terms.map((t, i) => (
                      <TermCard key={t.id} term={t} group={info.key} index={i} />
                    ))}
                  </CardGrid>
                </section>
              ))}
            </>
          ) : (
            <>
              <StarterRow terms={STARTERS} />
              <h2 className={s.heading}>
                전체 <span className={s.count}>{TERMS.length}</span>
              </h2>
              {ALL_SECTIONS.map(({ key, terms }) => (
                <section key={key} id={indexId(key)} className={s.section} aria-labelledby={`${indexId(key)}-h`}>
                  <h3 id={`${indexId(key)}-h`} className={s.letter}>
                    {key}
                  </h3>
                  <CardGrid>
                    {terms.map((t, i) => (
                      <TermCard key={t.id} term={t} index={i} />
                    ))}
                  </CardGrid>
                </section>
              ))}
            </>
          )}
        </main>
        <Footer linked />
      </div>
      {!info && !searching && <IndexStrip available={AVAILABLE} active={activeKey} />}
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/t/');
  // 상세 화면은 목록 위에 뜨는 창. 뒤에는 들어온 목록(바로 들어왔으면 전체)을 그대로 둠
  const bg = (location.state as { bg?: { pathname: string } } | null)?.bg ?? { pathname: '/' };

  return (
    <>
      <div inert={isDetail}>
        <Routes location={isDetail ? bg : location}>
          <Route path="/" element={<Home />} />
          <Route path="/c/:group" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Splash />
      {isDetail && (
        <Routes>
          <Route path="/t/:id" element={<Detail />} />
        </Routes>
      )}
    </>
  );
}
