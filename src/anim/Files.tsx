import type { ReactNode } from 'react';
import { Music } from 'lucide-react';
import { Stage } from './Stage';
import s from './Files.module.css';

/** 🎨 그림과 파일 형식: 파일 종류마다 그 특징을 작은 그림으로 */

/** 산과 해가 있는 작은 그림 (사진 대신) */
function Pic({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 30" className={`${s.pic} ${className}`} preserveAspectRatio="xMidYMid slice">
      <rect width="40" height="30" className={s.sky} />
      <circle cx="29" cy="9" r="4" className={s.sun} />
      <path d="M0 30 L13 11 L22 23 L28 17 L40 30Z" className={s.hill} />
    </svg>
  );
}

/** 배경이 뚫린 그림 (별) */
function Sticker({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${s.sticker} ${className}`}>
      <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95z" />
    </svg>
  );
}

const Tag = ({ children }: { children: ReactNode }) => <span className={s.tag}>{children}</span>;

const BODIES: Record<string, ReactNode> = {
  png: <><div className={`${s.frame} ${s.checker}`}><Sticker className={s.float} /></div><Tag>.png</Tag></>,
  jpg: <><div className={s.frame}><Pic className={s.zoomPic} /></div><Tag>.jpg</Tag></>,
  svg: <><div className={`${s.frame} ${s.plain}`}><Sticker className={s.scale} /></div><Tag>.svg</Tag></>,
  webp: <><div className={s.weigh}><span><Pic /><i className={s.barBig} /></span><span><Pic /><i className={s.barSmall} /></span></div><Tag>.webp</Tag></>,
  'transparent-background': <div className={`${s.frame} ${s.bgCycle}`}><Sticker /></div>,
  resolution: <div className={`${s.frame} ${s.plain}`}><span className={s.pixels} /></div>,
  'aspect-ratio': <div className={s.ratioWrap}><span className={s.ratio}><Pic /></span><span className={s.ratioText}><b>16:9</b><b>4:3</b><b>1:1</b></span></div>,
  asset: <div className={s.folder}><i><Pic /></i><i><Music /></i><i><b>Aa</b></i><span /></div>,
  sprite: <div className={s.sprite}><div className={s.strip}><i /><i /><i /><i /><b /></div><span className={s.runner} /></div>,
  emoji: <div className={s.emoji}>{[s.faceA, s.faceB].map((c) => (
    <svg key={c} viewBox="0 0 24 24" className={c}><circle cx="12" cy="12" r="10.5" /><circle cx="8.6" cy="10" r="1.3" /><circle cx="15.4" cy="10" r="1.3" /><path d="M7.5 14q4.5 4.5 9 0" /></svg>
  ))}</div>,
  'vector-vs-bitmap': <div className={s.vs}><span><i className={s.vector} /></span><span><i className={s.bitmap} /></span></div>,
  'cover-vs-contain': <div className={s.vs}><span className={s.fit}><Pic className={s.cover} /></span><span className={s.fit}><Pic className={s.contain} /></span></div>,
};

export function fileAnim(variant: string) {
  return function FileAnim({ playing }: { playing: boolean }) {
    return (
      <Stage playing={playing} className={s.fa} variant={variant}>
        {BODIES[variant]}
      </Stage>
    );
  };
}

export const FILE_IDS = Object.keys(BODIES);
