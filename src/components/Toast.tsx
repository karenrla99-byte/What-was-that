import { Check } from 'lucide-react';
import s from './Toast.module.css';

/** 화면 아래에 잠깐 떴다 사라지는 알림 */
export default function Toast({ message }: { message: string | null }) {
  return (
    <div className={s.wrap} role="status" aria-live="polite">
      {message && (
        <div className={s.toast} key={message}>
          <Check size={18} strokeWidth={3} aria-hidden="true" />
          {message}
        </div>
      )}
    </div>
  );
}
