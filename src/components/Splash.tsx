import { useEffect, useState } from 'react';
import s from './Splash.module.css';

const KEY = 'ww-splash';

/** 조각 이름. 모두 원본과 같은 크기의 투명 그림이라 그대로 겹치면 원본이 됨 (자른 티가 나지 않게) */
const PARTS = ['icon', 'spark', 'title', 'mark', 'sub'];

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
        {PARTS.map((k) => (
          <img key={k} className={`${s.part} ${s[k]}`} src={`/brand/splash-${k}.webp`} alt="" />
        ))}
      </div>
    </div>
  );
}
