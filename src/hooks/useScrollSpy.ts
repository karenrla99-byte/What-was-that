import { useEffect, useState } from 'react';

/** 스크롤 위치에 따라 지금 보고 있는 구역의 id를 알려 줌 */
export function useScrollSpy(ids: string[], offset = 150): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const key = ids.join('|');

  useEffect(() => {
    const list = key ? key.split('|') : [];
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = list[0] ?? null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      // 맨 아래에 닿으면 마지막 구역
      if (list.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = list[list.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key, offset]);

  return active;
}
