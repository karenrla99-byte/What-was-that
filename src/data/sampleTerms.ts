import type { GroupKey } from './groups';

/**
 * Phase 1용 견본 카드. Phase 2에서 scripts/build-terms.ts가 만드는
 * src/data/terms.json으로 바뀌면 이 파일은 지운다.
 */
export type CardTerm = {
  id: string;
  ko: string;
  en: string;
  groups: { group: GroupKey; sub: string }[];
  vs?: string[];
};

const t = (id: string, ko: string, en: string, group: GroupKey, sub: string, vs?: string[]): CardTerm => ({
  id, ko, en, groups: [{ group, sub }], vs,
});

export const SAMPLE_TERMS: CardTerm[] = [
  t('vibe-coding', '바이브코딩', 'Vibe Coding', 'start', '기본 말'),
  t('web-app', '웹앱', 'Web App', 'start', '기본 말', ['website']),
  t('browser', '브라우저', 'Browser', 'start', '컴퓨터와 브라우저'),
  t('code-block', '코드 블록', 'Code Block', 'start', 'AI 답변 읽기'),
  t('blank-screen', '흰 화면', 'Blank Screen', 'start', '자주 만나는 문제'),

  t('glassmorphism', '글래스모피즘', 'Glassmorphism', 'look', '디자인 스타일'),
  t('neo-brutalism', '네오 브루탈리즘', 'Neo Brutalism', 'look', '디자인 스타일'),
  t('outline', '아웃라인', 'Outline', 'look', '글자 스타일'),
  t('bento-grid', '벤토 그리드', 'Bento Grid', 'look', '화면 배치'),
  t('padding', '안쪽 여백', 'Padding', 'look', '꾸밈 속성', ['margin']),
  t('border-radius', '모서리 둥글기', 'Border Radius', 'look', '꾸밈 속성'),

  t('tabs', '탭', 'Tabs', 'parts', '이동 부품'),
  t('progress-bar', '프로그레스 바', 'Progress Bar', 'parts', '인디케이터'),
  t('circular-progress', '원형 진행률', 'Circular Progress', 'parts', '인디케이터'),
  t('star-rating', '별점', 'Star Rating', 'parts', '평점 UI'),
  t('wheel-picker', '휠 피커', 'Wheel Picker', 'parts', '날짜 고르는 UI'),
  t('check-in-check-out', '체크인·체크아웃', 'Check-in / Check-out', 'parts', '날짜 고르는 UI'),

  t('ease-out', '이즈 아웃', 'Ease Out', 'motion', '움직임', ['ease-in']),
  t('stagger', '순차 등장', 'Stagger', 'motion', '화면 전환'),
  t('typewriter', '타자기 효과', 'Typewriter', 'motion', '텍스트 등장 효과'),
  t('skeleton', '스켈레톤', 'Skeleton', 'motion', '로딩 패턴'),

  t('onboarding', '온보딩', 'Onboarding', 'screens', '첫 화면과 시작 단계'),
  t('empty-state', '빈 화면', 'Empty State', 'screens', '빈 화면'),
  t('toast', '토스트', 'Toast', 'screens', '알림·피드백', ['snackbar']),
  t('bottom-sheet', '바텀시트', 'Bottom Sheet', 'screens', '알림·피드백', ['modal']),
  t('modal', '모달', 'Modal', 'screens', '알림·피드백', ['bottom-sheet']),

  t('swipe', '스와이프', 'Swipe', 'gesture', '제스처'),
  t('long-press', '길게 누르기', 'Long Press', 'gesture', '제스처'),
  t('pinch', '핀치', 'Pinch', 'gesture', '제스처'),

  t('drag-and-drop', '드래그 앤 드롭', 'Drag and Drop', 'learn', '문제 풀기'),
  t('badge', '배지', 'Badge', 'learn', '게임 장치'),

  t('visual-hierarchy', '시각적 위계', 'Visual Hierarchy', 'ux', '보기 쉽게'),
  t('affordance', '어포던스', 'Affordance', 'ux', '쓰기 쉽게'),

  t('responsive', '반응형', 'Responsive', 'size', '반응형과 위치'),
  t('viewport', '뷰포트', 'Viewport', 'size', '기기와 브라우저'),

  t('component', '컴포넌트', 'Component', 'build', '코드 기본'),
  t('commit', '커밋', 'Commit', 'build', '버전 관리'),
  t('deploy', '배포', 'Deploy', 'build', '배포와 공유'),
  t('api', 'API', 'Application Programming Interface', 'build', '데이터와 저장'),

  t('prompt', '프롬프트', 'Prompt', 'ai', '기획과 요청'),
  t('context', '컨텍스트', 'Context', 'ai', 'AI 도구 이해하기'),
];
