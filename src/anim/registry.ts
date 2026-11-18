import type { ComponentType } from 'react';
import { FILE_IDS, fileAnim } from './Files';
import * as Bt from './Buttons';
import * as Ct from './Content';
import * as D from './Data';
import * as Dt from './Dates';
import * as Dn from './Done';
import * as Em from './Empty';
import * as Fb from './Feedback';
import * as F from './Forms';
import * as I from './Indicators';
import * as M from './Media';
import { MENU_ICONS, menuIcon } from './MenuIcons';
import * as Mo from './Motion';
import * as Pm from './Perms';
import * as N from './Nav';
import { PROPERTY_IDS, propertyMorph } from './PropertyMorph';
import * as R from './Ratings';
import * as Sc from './Screens';
import * as Sr from './Search';
import * as Tx from './TextFx';
import * as Tr from './Transitions';
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
  // 🎬 움직임 (MotionBox 템플릿)
  'ease-in': Mo.EaseIn,
  'ease-out': Mo.EaseOut,
  'ease-in-out': Mo.EaseInOut,
  linear: Mo.Linear,
  spring: Mo.Spring,
  bounce: Mo.Bounce,
  'staggered-entrance': Mo.Stagger,
  fade: Mo.Fade,
  slide: Mo.Slide,
  'zoom-transition': Mo.ZoomTransition,
  'shared-element-transition': Mo.SharedElement,
  duration: Mo.Duration,
  delay: Mo.Delay,
  loop: Mo.Loop,
  'hover-effect': Mo.HoverEffect,
  'micro-interaction': Mo.MicroInteraction,
  'parallax-scrolling': Mo.Parallax,
  'scroll-triggered-animation': Mo.ScrollReveal,
  shake: Mo.Shake,
  pulse: Mo.Pulse,
  // 🎬 화면 전환
  'push-transition': Tr.Push,
  'modal-entrance': Tr.ModalEntrance,
  'fade-through': Tr.FadeThrough,
  'card-expansion': Tr.CardExpansion,
  'tab-transition': Tr.TabTransition,
  'sheet-expansion': Tr.SheetExpansion,
  // 🎬 텍스트 등장 효과
  'typing-effect': Tx.Typing,
  'fade-up': Tx.FadeUp,
  'staggered-character-animation': Tx.StaggeredChars,
  'count-up': Tx.CountUp,
  'scramble-text': Tx.Scramble,
  'mask-reveal': Tx.MaskReveal,
  highlight: Tx.Highlight,
  'word-swap': Tx.WordSwap,
  'blur-in': Tx.BlurIn,
  marquee: Tx.Marquee,
  // 🎬 로딩 패턴
  spinner: Dn.Spinner,
  skeleton: Dn.Skeleton,
  'blur-up': Dn.BlurUp,
  'optimistic-ui': Dn.OptimisticUi,
  'streaming-text': Dn.StreamingText,
  'loading-button': Bt.Loading,
  // 🎬 완료 표시
  'checkmark-animation': Dn.CheckDraw,
  'task-strikethrough': Dn.Strike,
  'button-morphing': Dn.ButtonMorph,
  'progress-completion': Dn.ProgressDone,
  'send-animation': Dn.SendAnim,
  stamp: Dn.Stamp,
  'badge-award': Dn.BadgeAward,
  confetti: Dn.Confetti,
  'completion-screen': Dn.CompletionScreen,
  // 📱 첫 화면과 시작 단계
  'splash-screen': Sc.Splash,
  onboarding: Sc.Onboarding,
  'permission-request': Sc.PermissionRequest,
  'coach-mark': Sc.CoachMark,
  'social-login': Sc.SocialLogin,
  'terms-and-conditions-consent': Sc.TermsConsent,
  'profile-setup': Sc.ProfileSetup,
  'welcome-screen': Sc.WelcomeScreen,
  // 📱 권한 묻는 화면
  'notification-permission': Pm.NotificationPermission,
  'location-permission': Pm.LocationPermission,
  'camera-permission': Pm.CameraPermission,
  'microphone-permission': Pm.MicrophonePermission,
  'permission-pre-prompt': Pm.PrePrompt,
  'system-permission-dialog': Pm.SystemDialog,
  'permission-re-prompt': Pm.RePrompt,
  'open-settings': Pm.OpenSettings,
  'limited-access': Pm.LimitedAccess,
  'permission-denied-screen': Pm.DeniedScreen,
  // 📱 빈 화면
  'first-use-empty-state': Em.FirstUse,
  'no-filter-results': Em.NoFilterResults,
  offline: Em.Offline,
  'permission-required': Em.PermissionRequired,
  'all-done': Em.AllDone,
  'post-deletion-empty-state': Em.PostDeletion,
  'error-screen': Em.ErrorScreen,
  locked: Em.Locked,
  '404-not-found': Em.NotFound,
  // 📱 알림·피드백
  toast: Fb.Toast,
  snackbar: Fb.Snackbar,
  banner: Fb.Banner,
  modal: Fb.Modal,
  'inline-error': Fb.InlineError,
  tooltip: Fb.Tooltip,
  badge: Fb.Badge,
  popover: Fb.Popover,
  'confirm-dialog': Fb.ConfirmDialog,
  undo: Fb.Undo,
  'overlay-dim': Fb.Overlay,
  // 📱 단계별 진행
  'wizard-multi-step-form': Sc.Wizard,
  'review-step': Sc.ReviewStep,
  'draft-autosave': Sc.DraftAutosave,
  'unsaved-changes-warning': Sc.UnsavedWarning,
};
