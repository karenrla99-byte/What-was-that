import type { ButtonHTMLAttributes, ElementType, HTMLAttributes, Ref } from 'react';
import s from './Glass.module.css';

type Props = HTMLAttributes<HTMLElement> &
  Pick<ButtonHTMLAttributes<HTMLElement>, 'type'> & { as?: ElementType; ref?: Ref<HTMLElement> };

/** 알약 모양 유리: 검색창·색인 띠·선택 표시 */
export default function GlassPill({ as: Tag = 'div', className = '', ...rest }: Props) {
  return <Tag className={`${s.pill} ${className}`} {...rest} />;
}
