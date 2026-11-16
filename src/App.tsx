import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Background from './components/Background';
import CardGrid from './components/CardGrid';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import TermCard from './components/TermCard';
import { GROUP_MAP, isGroupKey, subId, type GroupKey } from './data/groups';
import { SAMPLE_TERMS } from './data/sampleTerms';
import s from './App.module.css';

const byKo = (a: { ko: string }, b: { ko: string }) => a.ko.localeCompare(b.ko, 'ko');

function Home() {
  const { group: param } = useParams();
  const group: GroupKey | null = isGroupKey(param) ? param : null;
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [group]);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer]);

  const all = useMemo(() => [...SAMPLE_TERMS].sort(byKo), []);

  if (param && !group) return <Navigate to="/" replace />;

  const info = group ? GROUP_MAP[group] : null;
  const Icon = info?.icon;

  return (
    <>
      <Background />
      <Sidebar current={group} open={drawer} onClose={() => setDrawer(false)} />
      <div className={s.main}>
        <SearchBar onMenu={() => setDrawer(true)} />
        <main className={s.content}>
          {info && Icon ? (
            <>
              <h2 className={s.heading}>
                <Icon size={26} strokeWidth={2.2} className={s.headingIcon} aria-hidden="true" />
                {info.name}
              </h2>
              {info.subs.map((sub) => {
                const terms = SAMPLE_TERMS.filter((t) => t.groups.some((x) => x.group === info.key && x.sub === sub));
                if (info.sortSubs) terms.sort(byKo);
                if (!terms.length) return null;
                return (
                  <section key={sub} id={subId(sub)} className={s.section}>
                    <h3 className={s.subheading}>{sub}</h3>
                    <CardGrid>
                      {terms.map((t, i) => (
                        <TermCard key={t.id} term={t} group={info.key} index={i} />
                      ))}
                    </CardGrid>
                  </section>
                );
              })}
            </>
          ) : (
            <>
              <h2 className={s.heading}>전체</h2>
              <CardGrid>
                {all.map((t, i) => (
                  <TermCard key={t.id} term={t} index={i} />
                ))}
              </CardGrid>
            </>
          )}
        </main>
        <Footer linked />
      </div>
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
