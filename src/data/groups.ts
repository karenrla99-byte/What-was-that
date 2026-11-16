import {
  Sprout, Palette, Puzzle, Clapperboard, Smartphone, Hand,
  Gamepad2, Brain, Ruler, Wrench, MessageCircle, type LucideIcon,
} from 'lucide-react';

export type GroupKey =
  | 'start' | 'look' | 'parts' | 'motion' | 'screens' | 'gesture'
  | 'learn' | 'ux' | 'size' | 'build' | 'ai';

export type Group = {
  key: GroupKey;
  name: string;
  icon: LucideIcon;
  subs: string[];
  /** 분류 안에서 ㄱㄴㄷ순으로 보여 줄지 (개념 용어 묶음) */
  sortSubs?: boolean;
};

/** 왼쪽 사이드바 순서 그대로 (docs/TERMS.md 기준) */
export const GROUPS: Group[] = [
  { key: 'start', name: '처음 시작', icon: Sprout, subs: ['기본 말', '컴퓨터와 브라우저', 'AI 답변 읽기', '자주 만나는 문제'] },
  { key: 'look', name: '생김새', icon: Palette, subs: ['디자인 스타일', '글자 스타일', '화면 배치', '꾸밈 속성', '색과 글자', '그림과 파일 형식'] },
  { key: 'parts', name: '부품', icon: Puzzle, subs: ['입력 폼', '버튼', '메뉴 버튼 모양', '이동 부품', '콘텐츠 담기', '미디어', '데이터 보여주기', '인디케이터', '평점 UI', '날짜 고르는 UI', '검색 화면'] },
  { key: 'motion', name: '움직임', icon: Clapperboard, subs: ['움직임', '화면 전환', '텍스트 등장 효과', '로딩 패턴', '완료 표시'] },
  { key: 'screens', name: '상황별 화면', icon: Smartphone, subs: ['첫 화면과 시작 단계', '권한 묻는 화면', '빈 화면', '알림·피드백', '단계별 진행'] },
  { key: 'gesture', name: '손동작', icon: Hand, subs: ['제스처'] },
  { key: 'learn', name: '학습·게임 UI', icon: Gamepad2, subs: ['문제 풀기', '게임 장치', '만들기 활동'] },
  { key: 'ux', name: 'UX 원칙', icon: Brain, subs: ['보기 쉽게', '쓰기 쉽게', '사용자 이해하기'] },
  { key: 'size', name: '화면 크기', icon: Ruler, subs: ['반응형과 위치', '기기와 브라우저'] },
  { key: 'build', name: '만들고 배포하기', icon: Wrench, sortSubs: true, subs: ['코드 기본', '파일과 도구', '데이터와 저장', '보안과 개인정보', '문제 해결', '버전 관리', '배포와 공유', '속도'] },
  { key: 'ai', name: 'AI와 일하기', icon: MessageCircle, sortSubs: true, subs: ['기획과 요청', '작업 흐름', 'AI 도구 이해하기'] },
];

export const GROUP_MAP = Object.fromEntries(GROUPS.map((g) => [g.key, g])) as Record<GroupKey, Group>;

export function isGroupKey(v: string | undefined): v is GroupKey {
  return !!v && v in GROUP_MAP;
}

export function subId(sub: string) {
  return `sub-${sub.replace(/[^0-9A-Za-z가-힣]+/g, '-')}`;
}
