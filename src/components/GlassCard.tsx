import type { ButtonHTMLAttributes, ElementType, HTMLAttributes, Ref } from 'react';
import s from './Glass.module.css';

type Props = HTMLAttributes<HTMLElement> &
  Pick<ButtonHTMLAttributes<HTMLElement>, 'type'> & { as?: ElementType; ref?: Ref<HTMLElement> };

/** 유리 판: 반투명 흰색 + 뒤 흐림 + 흰 테두리 + 135° 흰 빛 */
export default function GlassCard({ as: Tag = 'div', className = '', ...rest }: Props) {
  return <Tag className={`${s.card} ${className}`} {...rest} />;
}
