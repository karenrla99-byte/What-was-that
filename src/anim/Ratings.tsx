import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Callout, Phone } from './Stage';
import s from './Ratings.module.css';

type P = { playing: boolean };

const STAR = 'M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95z';

function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${s.star} ${className}`}>
      <path d={STAR} />
    </svg>
  );
}

export function StarRating({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.stars}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={i < 4 ? s.fillStar : ''} />
        ))}
      </div>
      <Callout x={28.8} y={39}>눌러서 별 채우기</Callout>
      <div className={s.block} />
    </Phone>
  );
}

export function HalfStarRating({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.stars}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={s.halfWrap}>
            <Star />
            {i < 4 && (
              <span className={`${s.halfClip} ${i === 3 ? s.halfOnly : ''}`} style={{ animationDelay: `${0.3 + i * 0.3}s` }}>
                <Star className={s.blueStar} />
              </span>
            )}
          </span>
        ))}
      </div>
      <div className={s.score}>3.5</div>
      <Callout x={39.5} y={28} dir="down">반 개</Callout>
    </Phone>
  );
}

export function NpsScore({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.nps}>
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className={i === 9 ? s.npsPick : ''}>
            {i}
          </span>
        ))}
      </div>
      <div className={s.npsEnds}>
        <i />
        <i />
      </div>
      <Callout x={28.8} y={29} dir="down">0~10점 중 고르기</Callout>
    </Phone>
  );
}

const MOUTHS = ['M8 16.5q4-3.5 8 0', 'M8 16q4-1.8 8 0', 'M8 15h8', 'M8 14.5q4 2.5 8 0', 'M7.5 14q4.5 4.5 9 0'];

export function EmojiRating({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.faces}>
        {MOUTHS.map((d, i) => (
          <svg key={i} viewBox="0 0 24 24" className={`${s.face} ${i === 3 ? s.facePick : ''}`}>
            <circle cx="12" cy="12" r="10.5" className={s.faceBg} />
            <circle cx="8.7" cy="9.8" r="1.2" className={s.faceInk} />
            <circle cx="15.3" cy="9.8" r="1.2" className={s.faceInk} />
            <path d={d} className={s.faceLine} />
          </svg>
        ))}
      </div>
      <Callout x={28.8} y={40}>표정으로 고르기</Callout>
      <div className={s.block} />
    </Phone>
  );
}

export function Thumbs({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.block} style={{ top: '26em', height: '16em' }} />
      <div className={s.thumbs}>
        <span className={s.thumbUp}>
          <ThumbsUp />
        </span>
        <span>
          <ThumbsDown />
        </span>
      </div>
      <Callout x={17.3} y={63}>좋아요</Callout>
    </Phone>
  );
}

export function RatingSlider({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.slider}>
        <span className={s.sliderFill} />
        <span className={s.thumb}>
          <i className={s.bubble}>8</i>
        </span>
      </div>
      <div className={s.ticks}>
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <Callout x={28.8} y={58}>밀어서 점수</Callout>
    </Phone>
  );
}

export function RatingSummary({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.sumScore}>4.8</div>
      <div className={s.sumStars}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={s.blueStar} />
        ))}
      </div>
      <div className={s.sumBars}>
        {[0.86, 0.5, 0.2, 0.08, 0.04].map((w, i) => (
          <span key={i}>
            <i style={{ width: `${w * 100}%`, animationDelay: `${0.2 + i * 0.15}s` }} />
          </span>
        ))}
      </div>
      <Callout x={28.8} y={72}>점수별 개수</Callout>
    </Phone>
  );
}

export function ReviewTags({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.tags}>
        {[18, 24, 20, 26, 16, 22].map((w, i) => (
          <span key={i} style={{ width: `${w}em` }} className={i === 1 ? s.tagA : i === 2 ? s.tagB : i === 5 ? s.tagC : ''} />
        ))}
      </div>
      <Callout x={28.8} y={64}>이유를 골라 누르기</Callout>
    </Phone>
  );
}

export function RatingBadge({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.thumbCard}>
        <span className={s.badge}>
          <Star className={s.whiteStar} />
          4.8
        </span>
      </div>
      <Callout x={42} y={18}>점수 배지</Callout>
      <span className={s.capA} />
      <span className={s.capB} />
    </Phone>
  );
}
