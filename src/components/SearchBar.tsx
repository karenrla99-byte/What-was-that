import { useRef } from 'react';
import { Menu, Search, X } from 'lucide-react';
import GlassPill from './GlassPill';
import s from './SearchBar.module.css';

type Props = { value: string; onChange: (text: string) => void; onMenu: () => void };

/** 위에 고정된 검색창. 한글·영어·초성·설명에서 찾음 */
export default function SearchBar({ value, onChange, onMenu }: Props) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className={s.bar} role="search">
      <GlassPill as="button" type="button" className={s.menu} onClick={onMenu} aria-label="카테고리 열기">
        <Menu size={22} aria-hidden="true" />
      </GlassPill>
      <GlassPill as="label" className={s.search}>
        <Search size={20} strokeWidth={2.2} className={s.icon} aria-hidden="true" />
        <span className="sr-only">용어 검색</span>
        <input
          ref={input}
          type="search"
          className={s.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && value) {
              e.stopPropagation();
              onChange('');
            }
          }}
          placeholder="그거… 뭐였더라? (예: 아래서 올라오는 창)"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        {value && (
          <button
            type="button"
            className={s.clear}
            aria-label="검색어 지우기"
            onClick={(e) => {
              e.preventDefault();
              onChange('');
              input.current?.focus();
            }}
          >
            <X size={16} strokeWidth={2.6} aria-hidden="true" />
          </button>
        )}
      </GlassPill>
    </div>
  );
}
