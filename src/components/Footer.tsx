import s from './Footer.module.css';

/** 하단 저작권. 인스타 주소는 홈(목록 화면)에서만 링크 */
export default function Footer({ linked = true }: { linked?: boolean }) {
  return (
    <footer className={s.footer}>
      <p>
        © 2026 특수교사 은티 ·{' '}
        {linked ? (
          <a className={s.link} href="https://www.instagram.com/special_eun_t/" target="_blank" rel="noreferrer">
            @special_eun_t
          </a>
        ) : (
          '@special_eun_t'
        )}
      </p>
      <p className={s.small}>디자인 참고: Figma Community (CC BY 4.0)</p>
    </footer>
  );
}
