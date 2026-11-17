import type { ComponentType } from 'react';
import { FILE_IDS, fileAnim } from './Files';
import * as Bt from './Buttons';
import * as Ct from './Content';
import * as D from './Data';
import * as Dt from './Dates';
import * as F from './Forms';
import * as I from './Indicators';
import * as M from './Media';
import { MENU_ICONS, menuIcon } from './MenuIcons';
import * as N from './Nav';
import { PROPERTY_IDS, propertyMorph } from './PropertyMorph';
import * as R from './Ratings';
import * as Sr from './Search';
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
  // 🧩 입력 폼
  'text-field-states': F.TextFieldStates,
  select: F.Select,
  'segmented-control': F.Segmented,
  switch: F.Switch,
  checkbox: F.Checkbox,
  'radio-button': F.Radio,
  slider: F.Slider,
  'quantity-stepper': F.Stepper,
  'date-picker': F.DatePicker,
  picker: F.Picker,
  placeholder: F.Placeholder,
  textarea: F.Textarea,
  label: F.Label,
  'helper-text': F.HelperText,
  'form-validation': F.FormValidation,
  'required-field': F.RequiredField,
  'file-upload': F.FileUpload,
  'color-picker': F.ColorPicker,
  'tag-input': F.TagInput,
  'password-visibility-toggle': F.PasswordToggle,
  // 🧩 버튼
  default: Bt.Default,
  hover: Bt.Hover,
  pressed: Bt.Pressed,
  focus: Bt.Focus,
  disabled: Bt.Disabled,
  loading: Bt.Loading,
  success: Bt.Success,
  error: Bt.ErrorBtn,
  selected: Bt.Selected,
  'primary-button': Bt.PrimaryButton,
  'secondary-button': Bt.SecondaryButton,
  'ghost-button': Bt.GhostButton,
  'icon-button': Bt.IconButton,
  'floating-action-button-fab': Bt.Fab,
  'call-to-action': Bt.Cta,
  'toggle-button': Bt.ToggleButton,
  'button-group': Bt.ButtonGroup,
  'default-vs-resting': Bt.DefaultVsResting,
  // 🧩 메뉴 버튼 모양
  ...Object.fromEntries(MENU_ICONS.map(([id, kind, name]) => [id, menuIcon(kind, name)])),
  // 🧩 이동 부품
  header: N.Header,
  footer: N.Footer,
  'navigation-bar': N.NavigationBar,
  'tab-bar': N.TabBar,
  tabs: N.Tabs,
  drawer: N.Drawer,
  'dropdown-menu': N.DropdownMenu,
  'context-menu': N.ContextMenu,
  breadcrumb: N.Breadcrumb,
  pagination: N.Pagination,
  'back-button': N.BackButton,
  'back-to-top': N.BackToTop,
  link: N.LinkAnim,
  // 🧩 콘텐츠 담기
  'avatar-group': Ct.AvatarGroup,
  list: Ct.List,
  table: Ct.Table,
  accordion: Ct.Accordion,
  carousel: Ct.Carousel,
  chip: Ct.Chip,
  tag: Ct.Tag,
  avatar: Ct.Avatar,
  thumbnail: Ct.Thumbnail,
  'infinite-scroll': Ct.InfiniteScroll,
  'load-more': Ct.LoadMore,
  // 🧩 미디어
  'image-gallery': M.ImageGallery,
  lightbox: M.Lightbox,
  'video-player': M.VideoPlayer,
  'audio-player': M.AudioPlayer,
  embed: M.Embed,
  map: M.MapAnim,
  icon: M.IconAnim,
  // 🧩 데이터 보여주기
  'bar-chart': D.BarChart,
  'line-chart': D.LineChart,
  'pie-donut-chart': D.PieChart,
  'stat-card': D.StatCard,
  timeline: D.Timeline,
  'kanban-board': D.Kanban,
  'tree-view': D.TreeView,
  heatmap: D.Heatmap,
  // 🧩 날짜 고르는 UI
  'inline-calendar': Dt.InlineCalendar,
  'popover-calendar': Dt.PopoverCalendar,
  'month-grid': Dt.MonthGrid,
  'wheel-picker': Dt.WheelPicker,
  'manual-input': Dt.ManualInput,
  calendar: Dt.Calendar,
  'month-picker': Dt.MonthPicker,
  'date-range-calendar': Dt.RangeCalendar,
  'date-range-picker': Dt.RangePicker,
  'check-in-check-out': Dt.CheckInOut,
  'time-slot': Dt.TimeSlot,
  'recurrence-settings': Dt.Recurrence,
  'quick-select': Dt.QuickSelect,
  'quick-select-chips': Dt.QuickSelectChips,
  // 🧩 검색 화면 · 카드 · 바텀시트
  'search-bar': Sr.SearchBar,
  autocomplete: Sr.Autocomplete,
  'recent-searches': Sr.RecentSearches,
  'trending-searches': Sr.TrendingSearches,
  filter: Sr.Filter,
  sort: Sr.Sort,
  'search-term-highlighting': Sr.SearchHighlight,
  'no-results': Sr.NoResults,
  'search-scope-tabs': Sr.SearchScopeTabs,
  'initial-consonant-search': Sr.ChoseongSearch,
  card: Sr.Card,
  'bottom-sheet': Sr.BottomSheet,
};
