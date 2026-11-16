import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import CardGrid from './components/CardGrid';
import Footer from './components/Footer';
import IndexStrip, { indexId } from './components/IndexStrip';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import StarterRow from './components/StarterRow';
import TermCard from './components/TermCard';
import { GROUP_MAP, isGroupKey, subId, type Group, type GroupKey } from './data/groups';
import { STARTERS, TERMS, type Term } from './data/terms';
import { useScrollSpy } from './hooks/useScrollSpy';
import { INDEX_KEYS, compareKo, indexKeyOf, type IndexKey } from './lib/hangul';
import s from './App.module.css';

const byKo = (a: Term, b: Term) => compareKo(a.ko, b.ko);

/** 전체: ㄱㄴㄷ순으로 글자별 구역 */
const ALL_SECTIONS: { key: IndexKey; terms: Term[] }[] = INDEX_KEYS.map((key) => ({
  key,
  terms: TERMS.filter((t) => indexKeyOf(t.ko) === key).sort(byKo),
})).filter((x) => x.terms.length);
const ALL_IDS = ALL_SECTIONS.map((x) => indexId(x.key));
const AVAILABLE = new Set(ALL_SECTIONS.map((x) => x.key));

function sectionsOf(info: Group): { sub: string; terms: Term[] }[] {
  return info.subs
    .map((sub) => {
      const order = (t: Term) => t.groups.find((x) => x.group === info.key && x.sub === sub)!.order;
      const terms = TERMS.filter((t) => t.groups.some((x) => x.group === info.key && x.sub === sub));
      terms.sort(info.sortSubs ? byKo : (a, b) => order(a) - order(b));
      return { sub, terms };
    })
    .filter((x) => x.terms.length);
}

function Home() {
  const { group: param } = useParams();
  const group: GroupKey | null = isGroupKey(param) ? param : null;
  const [drawer, setDrawer] = useState(false);
  const info = group ? GROUP_MAP[group] : null;

  const sections = useMemo(() => (info ? sectionsOf(info) : []), [info]);
  const spyIds = useMemo(() => (info ? sections.map((x) => subId(x.sub)) : ALL_IDS), [info, sections]);
  const activeId = useScrollSpy(spyIds);
  const activeSub = info ? (sections.find((x) => subId(x.sub) === activeId)?.sub ?? null) : null;
  const activeKey = info ? null : (ALL_SECTIONS.find((x) => indexId(x.key) === activeId)?.key ?? null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
      <div className={`${s.main} ${info ? '' : s.withIndex}`}>
        <SearchBar onMenu={() => setDrawer(true)} />
        <main className={s.content}>
          {info && Icon ? (
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
      {!info && <IndexStrip available={AVAILABLE} active={activeKey} />}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/c/:group" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
