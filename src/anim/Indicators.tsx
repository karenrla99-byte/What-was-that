import { Phone } from './Stage';
import s from './Indicators.module.css';

type P = { playing: boolean };

export function ProgressBar({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.block} />
      <div className={s.track}>
        <span className={s.fill} />
      </div>
    </Phone>
  );
}

export function StepIndicator({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.steps}>
        <span className={`${s.dot} ${s.d1}`} />
        <span className={`${s.bar} ${s.b1}`} />
        <span className={`${s.dot} ${s.d2}`} />
        <span className={`${s.bar} ${s.b2}`} />
        <span className={`${s.dot} ${s.d3}`} />
      </div>
      <div className={s.block} style={{ top: '46em' }} />
    </Phone>
  );
}

export function PageIndicator({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.pages}>
        <span />
        <span />
        <span />
      </div>
      <div className={s.pageDots}>
        <span className={s.p1} />
        <span className={s.p2} />
        <span className={s.p3} />
      </div>
    </Phone>
  );
}

export function StoryBar({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.story} />
      <div className={s.storyBars}>
        <span><i className={s.s1} /></span>
        <span><i className={s.s2} /></span>
        <span><i className={s.s3} /></span>
      </div>
    </Phone>
  );
}

export function ScrollProgressBar({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.article}>
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} style={{ width: `${[44, 40, 46, 30, 0, 44, 38, 46, 24, 0, 42, 46, 36, 20][i]}em` }} />
        ))}
      </div>
      <div className={s.readTrack}>
        <span className={s.readFill} />
      </div>
    </Phone>
  );
}

export function CircularProgress({ playing }: P) {
  return (
    <Phone playing={playing}>
      <svg className={s.ring} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" className={s.ringBg} />
        <circle cx="50" cy="50" r="40" className={s.ringFg} pathLength="100" />
        <path d="M36 51l10 10 19-21" className={s.ringCheck} pathLength="100" />
      </svg>
    </Phone>
  );
}

export function StrengthIndicator({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.field}>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{ animationDelay: `${0.2 + i * 0.25}s` }} />
        ))}
      </div>
      <div className={s.strength}>
        <span className={s.g1} />
        <span className={s.g2} />
        <span className={s.g3} />
      </div>
    </Phone>
  );
}

export function TabIndicator({ playing }: P) {
  return (
    <Phone playing={playing} bare>
      <div className={s.tabs}>
        <span className={s.t1} />
        <span className={s.t2} />
        <span className={s.t3} />
        <i className={s.underline} />
      </div>
      <div className={s.block} style={{ top: '26em', height: '30em' }} />
      <div className={s.block} style={{ top: '60em', height: '14em' }} />
    </Phone>
  );
}

export function HomeIndicator({ playing }: P) {
  return (
    <Phone playing={playing}>
      <div className={s.block} />
      <div className={s.block} style={{ top: '50em', height: '14em' }} />
      <span className={s.homeGlow} />
      <span className={s.home} />
    </Phone>
  );
}
