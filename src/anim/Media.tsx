import { Heart, Home, MapPin, Play, Search, Settings } from 'lucide-react';
import { B, Pic, Tap } from './kit';
import { Callout, Phone, Stage } from './Stage';
import s from './Media.module.css';

/** 🧩 미디어 */
type P = { playing: boolean };

export function ImageGallery({ playing }: P) {
  return (
    <Stage playing={playing}>
      {Array.from({ length: 9 }, (_, i) => (
        <B key={i} x={14 + (i % 3) * 25} y={8 + Math.floor(i / 3) * 25} w={22} h={22} r={2.4} c="n" className={s.tile} style={{ overflow: 'hidden', animationDelay: `${i * 0.12}s` }}><Pic /></B>
      ))}
      <Callout x={50} y={82}>사진을 바둑판처럼 모아요</Callout>
    </Stage>
  );
}

export function Lightbox({ playing }: P) {
  return (
    <Stage playing={playing}>
      {Array.from({ length: 6 }, (_, i) => (
        <B key={i} x={14 + (i % 3) * 25} y={22 + Math.floor(i / 3) * 25} w={22} h={22} r={2.4} c="n" style={{ overflow: 'hidden' }}><Pic /></B>
      ))}
      <span className={s.dim} />
      <span className={s.big}><Pic /></span>
      <Tap x={50} y={33} at={0.15} d={4} size={11} />
      <Callout x={50} y={82}>누르면 어둡게 깔고 크게</Callout>
    </Stage>
  );
}

export function VideoPlayer({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={8} y={18} w={84} h={52} r={4} c="k" style={{ overflow: 'hidden' }}>
        <span className={s.playBig}><Play fill="#fff" color="#fff" /></span>
        <B x={4} y={42} w={74} h={2.6} r={1.3} c="c"><span className={s.vidFill} /></B>
        <Play className={s.miniPlay} fill="#fff" color="#fff" />
      </B>
      <Callout x={50} y={72}>재생·진행 바가 있는 영상 상자</Callout>
    </Stage>
  );
}

export function AudioPlayer({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={10} y={34} w={80} h={22} r={11} c="a">
        <B x={3} y={3} w={16} h={16} r={8} c="p" className={s.center}><Play fill="#fff" color="#fff" /></B>
        <span className={s.wave}>{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 0.13) % 0.9}s` }} />)}</span>
      </B>
      <Callout x={50} y={60}>소리를 재생하는 부품</Callout>
    </Stage>
  );
}

export function Embed({ playing }: P) {
  return (
    <Phone playing={playing}>
      <B x={5} y={24} w={47.6} h={3.4} c="g" />
      <B x={5} y={30} w={36} h={3.4} c="g" />
      <B x={5} y={38} w={47.6} h={28} r={3} c="k" className={s.embed}>
        <span className={s.center} style={{ position: 'absolute', inset: 0 }}><Play fill="#fff" color="#fff" style={{ width: '9em', height: '9em' }} /></span>
      </B>
      <B x={5} y={70} w={40} h={3.4} c="g" />
      <Callout x={28.8} y={66}>다른 사이트 영상을 끼워 넣기</Callout>
    </Phone>
  );
}

export function MapAnim({ playing }: P) {
  return (
    <Stage playing={playing}>
      <B x={8} y={12} w={84} h={70} r={4} c="a" className={s.map} />
      <span className={s.ripple} />
      <span className={s.pin}><MapPin fill="var(--blue)" color="#fff" /></span>
      <Callout x={50} y={52}>위치를 핀으로 콕</Callout>
    </Stage>
  );
}

export function IconAnim({ playing }: P) {
  const icons = [Search, Home, Heart, Settings];
  return (
    <Stage playing={playing}>
      {icons.map((Icon, i) => (
        <span key={i} className={s.icon} style={{ left: `${13 + i * 20}em`, animationDelay: `${i * 0.3}s` }}><Icon /></span>
      ))}
      <Callout x={50} y={58}>뜻을 작은 그림으로</Callout>
    </Stage>
  );
}
