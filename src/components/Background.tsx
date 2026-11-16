import s from './Background.module.css';

/** 고정 배경: 파랑·하늘색 빛 덩어리를 크게 흐리게 */
export default function Background() {
  return (
    <div className={s.bg} aria-hidden="true">
      <span className={`${s.blob} ${s.b1}`} />
      <span className={`${s.blob} ${s.b2}`} />
      <span className={`${s.blob} ${s.b3}`} />
      <span className={`${s.blob} ${s.b4}`} />
    </div>
  );
}
