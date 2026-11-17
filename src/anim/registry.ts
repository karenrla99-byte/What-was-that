import type { ComponentType } from 'react';
import { FILE_IDS, fileAnim } from './Files';
import * as I from './Indicators';
import { PROPERTY_IDS, propertyMorph } from './PropertyMorph';
import * as R from './Ratings';
import { LAYOUT_IDS, layoutSketch } from './LayoutSketch';
import { DESIGN_STYLES, styleSwatch } from './StyleSwatch';
import { TYPE_STYLES, typeSwatch } from './TypeSwatch';

export type AnimProps = { playing: boolean; size: 'card' | 'detail' };

/** 용어 id → 애니메이션. 여기에 없는 용어는 기본 애니메이션(묶음 아이콘) */
export const ANIMS: Record<string, ComponentType<AnimProps>> = {
  // 🧩 인디케이터
  'progress-bar': I.ProgressBar,
  'step-indicator': I.StepIndicator,
  'page-indicator': I.PageIndicator,
  'story-progress-bar': I.StoryBar,
  'scroll-progress-bar': I.ScrollProgressBar,
  'circular-progress-indicator': I.CircularProgress,
  'strength-indicator': I.StrengthIndicator,
  'tab-indicator': I.TabIndicator,
  'home-indicator': I.HomeIndicator,
  // 🧩 평점 UI
  'star-rating': R.StarRating,
  'half-star-rating': R.HalfStarRating,
  'net-promoter-score-nps': R.NpsScore,
  'emoji-rating': R.EmojiRating,
  'thumbs-up-thumbs-down': R.Thumbs,
  'rating-slider': R.RatingSlider,
  'rating-summary': R.RatingSummary,
  'review-tags': R.ReviewTags,
  'rating-badge': R.RatingBadge,
  // 🎨 디자인 스타일 (StyleSwatch 템플릿)
  ...Object.fromEntries(DESIGN_STYLES.map((id) => [id, styleSwatch(id)])),
  // 🎨 글자 스타일 (TypeSwatch 템플릿)
  ...Object.fromEntries(Object.entries(TYPE_STYLES).map(([id, cap]) => [id, typeSwatch(id, cap)])),
  // 🎨 화면 배치 (LayoutSketch 템플릿)
  ...Object.fromEntries(LAYOUT_IDS.map((id) => [id, layoutSketch(id)])),
  // 🎨 꾸밈 속성 · 색과 글자 (PropertyMorph 템플릿)
  ...Object.fromEntries(PROPERTY_IDS.map((id) => [id, propertyMorph(id)])),
  // 🎨 그림과 파일 형식
  ...Object.fromEntries(FILE_IDS.map((id) => [id, fileAnim(id)])),
};
