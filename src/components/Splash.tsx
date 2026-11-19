import { useEffect, useState } from 'react';
import s from './Splash.module.css';

const KEY = 'ww-splash';


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
      {/* 아이콘(책) → 반짝이 → 제목 → 파란 물음표 → 부제 순서로 등장. 글자는 그림이 아니라 진짜 글자 */}
      <div className={s.logo}>
        <div className={s.art}>
          <img className={s.book} src="/brand/splash-book.webp" alt="" width={360} height={390} />
          <img className={s.spark} src="/brand/splash-spark.webp" alt="" width={200} height={230} />
        </div>
        <p className={s.title}>
          그거 뭐더라<span className={s.mark}>?</span>
        </p>
        <p className={s.sub}>
          바이브코딩 용어사전 · <i>Vibe Glossary</i>
        </p>
      </div>
    </div>
  );
}
