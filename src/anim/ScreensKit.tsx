import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { B, T } from './kit';
import s from './ScreensKit.module.css';

/** 📱 상황별 화면에서 같이 쓰는 조각들 (폰 안쪽 폭 57.6em) */

/** 앱 화면 뒷배경: 제목 + 목록 */
export function AppBg({ rows = 4 }: { rows?: number }) {
  return (
    <>
      <B x={5} y={6} w={24} h={5} c="k" />
      {Array.from({ length: rows }, (_, i) => <B key={i} x={5} y={17 + i * 15} w={47.6} h={11} r={3} c="a" />)}
    </>
  );
}

/** 가운데 뜨는 창: 아이콘 · 제목 · 버튼 두 개 (className으로 등장 시점 조절) */
export function Dialog({ icon: Icon, title, sub, no = '안 함', yes = '허용', className = '', system = false }: {
  icon?: LucideIcon; title: string; sub?: string; no?: string; yes?: string; className?: string; system?: boolean;
}) {
  return (
    <span className={`${s.dialog} ${system ? s.system : ''} ${className}`}>
      {Icon && <span className={s.dIcon}><Icon /></span>}
      <span className={s.dTitle}>{title}</span>
      {sub && <span className={s.dSub}>{sub}</span>}
      <span className={s.dBtns}>
        <b>{no}</b>
        <b className={s.dYes}>{yes}</b>
      </span>
    </span>
  );
}

/** 빈 화면: 큰 아이콘 · 제목 · 설명 · 버튼 */
export function Empty({ icon: Icon, title, sub, button, children }: { icon: LucideIcon; title: string; sub?: string; button?: string; children?: ReactNode }) {
  return (
    <>
      <span className={s.eIcon}><Icon /></span>
      <T x={28.8} y={42} size={5.2} align="center" weight={700}>{title}</T>
      {sub && <T x={28.8} y={49.5} size={3.8} c="sub" weight={400} align="center">{sub}</T>}
      {button && (
        <B x={11} y={58} w={35.6} h={10} r={5} c="p" className={s.eBtn}>
          <T x={17.8} y={2.4} size={4.4} c="white" align="center">{button}</T>
        </B>
      )}
      {children}
    </>
  );
}

/** 어둡게 덮는 막 (className으로 시점 조절) */
export function Dim({ className = '' }: { className?: string }) {
  return <span className={`${s.dim} ${className}`} />;
}
