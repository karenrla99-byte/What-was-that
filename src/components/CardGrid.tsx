import type { ReactNode } from 'react';
import s from './CardGrid.module.css';

export default function CardGrid({ children }: { children: ReactNode }) {
  return <div className={s.grid}>{children}</div>;
}
