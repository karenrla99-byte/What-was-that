import { useEffect, useState } from 'react';
import s from './Splash.module.css';

const KEY = 'ww-splash';

/** 조각 이름, 원본 그림 안의 위치(왼쪽 %, 위 %, 너비 %) */
const PARTS: [string, number, number, number][] = [
  ['icon', 27.523, 19.055, 44.204],
  ['spark', 60.467, 15.625, 13.344],
  ['title', 18.766, 60.213, 55.796],
  ['mark', 74.479, 60.595, 8.09],
  ['sub', 14.595, 73.552, 70.892],
];

function shown() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * 사이트를 열 때 잠깐 보이는 로딩 화면 (로고만, 설명 없음).
 * 브라우저 탭을 열 때마다 한 번, 2.3초쯤 보였다가 사라져요. 누르거나 아무 키나 누르면 바로 넘어가요.
 * 화면 읽기 프로그램에는 보이지 않고(aria-hidden), 뒤의 사전은 그동안 이미 준비돼요.
 */
export default function Splash() {
  const [stage, setStage] = useState<'on' | 'out' | 'off'>(() => (shown() ? 'off' : 'on'));

  useEffect(() => {
    if (stage === 'off') return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* 저장이 막힌 브라우저 */
    }
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const t1 = setTimeout(() => setStage('out'), reduced ? 600 : 2300);
    const skip = () => setStage('out');
    window.addEventListener('keydown', skip, { once: true });
    return () => {
      clearTimeout(t1);
      window.removeEventListener('keydown', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage !== 'out') return;
    const t = setTimeout(() => setStage('off'), 450);
    return () => clearTimeout(t);
  }, [stage]);

  if (stage === 'off') return null;
  return (
    <div className={`${s.splash} ${stage === 'out' ? s.out : ''}`} aria-hidden="true" onClick={() => setStage('out')}>
      {/* 로고 그림(splash-original)을 조각내서 차례로 등장: 아이콘 → 반짝이 → 제목 → 물음표 → 부제 */}
      <div className={s.logo}>
        {PARTS.map(([k, l, t, w]) => (
          <img key={k} className={`${s.part} ${s[k]}`} src={`/brand/splash-${k}.webp`} alt="" style={{ left: `${l}%`, top: `${t}%`, width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
