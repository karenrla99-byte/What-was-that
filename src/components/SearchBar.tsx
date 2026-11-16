import { Menu, Search } from 'lucide-react';
import GlassPill from './GlassPill';
import s from './SearchBar.module.css';

type Props = { onMenu: () => void };

/** 검색창 자리 (찾기 기능은 Phase 5) */
export default function SearchBar({ onMenu }: Props) {
  return (
    <div className={s.bar}>
      <GlassPill as="button" type="button" className={s.menu} onClick={onMenu} aria-label="카테고리 열기">
        <Menu size={22} aria-hidden="true" />
      </GlassPill>
      <GlassPill as="label" className={s.search}>
        <Search size={20} strokeWidth={2.2} className={s.icon} aria-hidden="true" />
        <span className="sr-only">용어 검색</span>
        <input
          type="search"
          className={s.input}
          placeholder="그거… 뭐였더라? (예: 아래서 올라오는 창)"
          autoComplete="off"
          spellCheck={false}
        />
      </GlassPill>
    </div>
  );
}
