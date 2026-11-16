import { INDEX_KEYS, type IndexKey } from '../lib/hangul';
import GlassPill from './GlassPill';
import s from './IndexStrip.module.css';

type Props = { available: Set<IndexKey>; active: IndexKey | null };

export const indexId = (k: IndexKey) => `idx-${k}`;

/** 오른쪽 색인 띠 (전체에서만) */
export default function IndexStrip({ available, active }: Props) {
  return (
    <GlassPill as="nav" className={s.strip} aria-label="ㄱㄴㄷ 색인">
      {INDEX_KEYS.map((k) => {
        const on = available.has(k);
        return (
          <button
            key={k}
            type="button"
            disabled={!on}
            aria-current={active === k ? 'true' : undefined}
            aria-label={k === 'A' ? '영어·숫자로 시작하는 용어' : `${k}으로 시작하는 용어`}
            className={`${s.key} ${active === k ? s.active : ''}`}
            onClick={() => document.getElementById(indexId(k))?.scrollIntoView({ block: 'start' })}
          >
            {k}
          </button>
        );
      })}
    </GlassPill>
  );
}
