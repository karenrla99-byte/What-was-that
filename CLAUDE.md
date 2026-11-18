# CLAUDE.md — 그거 뭐더라?

**바이브코딩 용어사전 · Vibe Glossary**
바이브코딩할 때 원하는 디자인·UI를 **정확한 이름으로 프롬프트에 쓰도록 돕는** 움직이는 그림 사전. 용어마다 짧은 애니메이션으로 생김새·작동을 보여 주고, 상세 화면에서 프롬프트 예시 문장을 복사할 수 있다.

- 화면·기능 전체: **`docs/PLAN.md`** (기획서 v2) — 작업 전에 해당 장을 꼭 읽기
- 용어 목록: **`docs/TERMS.md`** (최종 용어 목록, 약 520개)
- 노션 원본 용어 뜻: **`docs/notion-terms.md`** (TERMS.md에서 뜻 없이 이름만 적힌 용어의 뜻은 여기서 가져오기)
- 만든 사람: 특수교사 은티 (정은). 반말·짧은 한국어로 소통, 화면 단위로 만들고 눈으로 확인하며 진행

## 작업 방식 (꼭 지키기)
1. **단계(Phase)별로 만들고, 단계가 끝나면 멈춰서** 무엇을 했는지 + 확인 방법(`npm run dev` 주소, 눌러볼 순서)을 알려 주고 다음으로 넘어가도 되는지 묻기
2. 길게 선택지를 묻지 말고 합리적으로 정해서 바로 만들기. 정한 것은 한 줄로 알려 주기
3. 되돌리기 어려운 일(배포, 파일 삭제)은 먼저 물어보기
4. 화면 문구는 쉬운 한국어, 끝말은 "~해요"

## 기술 스택
- **Vite + React + TypeScript**, 스타일은 CSS Modules + CSS 변수(디자인 토큰)로 통일
- 데이터베이스 없음. 용어는 **`src/data/terms.json`** 하나로 관리 (정적 사이트)
- 라우팅: React Router — `/` (전체), `/c/:group` (큰 묶음), `/t/:id` (상세, 모달처럼 열리되 주소가 바뀌어 공유 가능)
- 애니메이션: CSS 애니메이션 + SVG 우선. 필요할 때만 Framer Motion (카드 확장 전환 등)
- 아이콘: **Lucide** (`lucide-react`)
- 한글 초성 검색: 직접 구현 (유니코드 분해) 또는 `es-hangul`
- 배포: **Vercel** (배포는 정은이 직접. 배포 전 꼭 물어보기)

## 공통 규칙
- **전체화면 버튼·설정 버튼 없음** (설명 사이트라서 다른 웹앱 공통 규칙의 예외)
- **하단 저작권**: `© 2026 특수교사 은티 · @special_eun_t`
  - 인스타 주소는 **홈(전체·묶음 목록 화면)에서만 링크**(https://www.instagram.com/special_eun_t/). 상세 팝업에는 저작권 표시 없음 (사이트 맨 아래에만)
  - 그 아래 작게: `디자인 참고: Figma Community (CC BY 4.0)`
  - "무단 복제·배포 금지" 같은 문구 넣지 않기
- 브라우저 탭 제목: `그거 뭐더라? · Vibe Glossary`, 파비콘은 파란 물음표
- 링크 미리보기(OG 이미지): 제목 + 부제 + 루미너스 블루 배경
- 기기의 **동작 줄이기(prefers-reduced-motion)** 켜져 있으면 애니메이션은 첫 장면에서 멈춤
- 키보드로도 모두 쓸 수 있게 (Tab 이동, Enter 열기, Esc 닫기, 포커스 링 보이게)

## 화면 구조 (자세한 건 PLAN.md 3장)
```
┌ 왼쪽 사이드바 ┬──── 가운데 ────────────┬ 오른쪽 색인 ┐
│ 제목·부제      │ 🔍 검색 (위에 고정)      │ ㄱ~ㅎ, A     │
│ 전체           │ 1:1 카드 그리드          │ (전체에서만)  │
│ 큰 묶음 11개    │                          │              │
└───────────────┴──────────────────────────┴──────────────┘
```
- **왼쪽 사이드바 = 카테고리 선택**: 제목 "그거 뭐더라?" + 부제, 그 아래 **전체** + 큰 묶음 11개
  - 순서: 🌱 처음 시작 · 🎨 생김새 · 🧩 부품 · 🎬 움직임 · 📱 상황별 화면 · ✋ 손동작 · 🎮 학습·게임 UI · 🧠 UX 원칙 · 📐 화면 크기 · 🛠 만들고 배포하기 · 💬 AI와 일하기
  - 묶음을 고르면 그 묶음 카드만 보이고, 사이드바에서 작은 분류가 아코디언으로 펼쳐짐. 작은 분류 누르면 그 위치로 스크롤, 스크롤하면 현재 작은 분류가 켜짐
  - 묶음 안에서는 작은 분류별로 제목을 달고 나열. 🛠·💬는 분류 안에서 ㄱㄴㄷ순, 나머지는 TERMS.md 순서
  - 휴대폰: 왼쪽 위 햄버거 → 드로어
- **전체** = 모든 용어를 **ㄱㄴㄷ순**으로 (겹치는 용어는 한 번만). 이때만 **오른쪽 색인 띠**(ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ A) 표시. 누르면 이동, 해당 글자 없으면 흐리게. 영어·숫자로 시작하는 용어는 A
  - 전체 맨 위: **"처음이라면 이것부터"** 가로 줄 (🌱 처음 시작 묶음의 대표 카드 10~12장, 옆으로 넘김)
- **검색**: 한글·영어·초성·다른 이름·한 줄 설명·뜻에서 찾기. 결과에서 검색어 강조, 없으면 비슷한 이름 추천. 안내 문구 `그거… 뭐였더라? (예: 아래서 올라오는 창)`
- **카드 (1:1)**: 위 75% 애니메이션 칸, 아래 25%에 한글 이름(600) + 영어 이름(400 기울임, 작게). 이름은 두 줄까지 말줄임. 헷갈리는 짝 있으면 애니메이션 칸 오른쪽 위에 `vs` 배지. 마우스 올리면 살짝 뜨고 테두리 루미너스 블루
  - 한 줄 카드 수: 1680px↑ 5개 · 1280~1680px **4개** · 1024px 안팎 3개 · 태블릿 세로 2개 · 휴대폰 2개. 간격 16px(휴대폰 12px)
  - **화면에 보이는 카드만 애니메이션 재생** (IntersectionObserver)
- **상세 화면**: 카드가 커지며 열림(카드 확장). 이름·영어 이름·분류 / 큰 애니메이션 + [다시 보기] [직접 해보기] / 뜻 / **💬 프롬프트에 이렇게 쓰세요 + [📋 복사]** (복사 시 "복사됐어요" 토스트) / 🔑 같이 쓰면 좋은 말(누르면 그 용어로) / ⚖️ 헷갈리는 짝(누르면 두 애니메이션 나란히 비교) / [‹ 이전] [다음 ›]

## 디자인 (자세한 건 PLAN.md 7장)
### 색 토큰
```css
--blue: #0095FF;        /* 루미너스 블루: 버튼 배경, 선택, 강조, 애니메이션 속 부품 */
--blue-text: #0077CC;   /* 흰 배경 위 작은 파랑 글자 */
--blue-deep: #005FA3;   /* 눌림, 연한 파랑 위 글자 */
--blue-soft: #E5F4FF;   /* 선택된 메뉴·태그 배경 */
--ink: #1C1C1E;         /* 제목·본문 */
--ink-sub: #6E6E73;     /* 영어 이름, 부가 설명 */
--bg: #FAFAF8;          /* 바탕: 부드러운 흰색 (빛 덩어리 없음) */
```
- 애니메이션 속 색은 **루미너스 블루 + 회색 계열만** (모든 카드 통일감)

### 글래스 (애플 리퀴드 글래스 느낌, 깔끔하게)
- 배경: `--bg` 부드러운 흰색 한 가지 (빛 덩어리·그라데이션 없음). 파랑은 아이콘·글자·선택 표시에만
- 카드: `rgba(255,255,255,0.58)` + `backdrop-filter: blur(20px) saturate(160%)` + 흰 테두리 1.4px + 135° 흰 빛 그라데이션(50%→0%) + 아주 옅은 그림자. 모서리 20px
- 카드 안 애니메이션 칸: 한 단계 더 불투명한 흰 바탕 (애니메이션 또렷하게)
- 사이드바: 세로 유리 판, 모서리 24px, 화면 가장자리에서 12~16px 떠 있게
- 검색창·선택 표시·색인 띠: 알약 모양 + 안쪽 흰 빛 테두리(inset 하이라이트) + 옅은 바깥 그림자 `0 2px 16px rgba(0,0,0,.12)`
- 상세 화면: 모서리 32px, 뒤는 어둡게 깐 오버레이
- **글자 바로 뒤는 거의 불투명하게** (프로젝터에서도 읽히게). `backdrop-filter` 안 되는 브라우저는 불투명 흰색으로 대체
- 애플 SF 폰트·SF Symbols·애플 UI 키트 그림은 쓰지 않기 (라이선스)

### 글꼴: Pretendard (이 블록 그대로 `src/styles/fonts.css`에 넣기)
```css
@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2') format('woff2');
    font-weight: 100;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2') format('woff2');
    font-weight: 200;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2') format('woff2');
    font-weight: 300;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2') format('woff2');
    font-weight: 900;
    font-display: swap;
}

@font-face {
    font-family: 'PretendardVariable';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/2611030106@font-variable-694/variable-694/PretendardVariable.woff2') format('woff2');
    font-weight: 45 930;
    font-display: swap;
}

/* 가변: font-family: 'PretendardVariable'; font-variation-settings: "wght" 400; */
```
- 모든 글자 `font-family: 'Pretendard', 'PretendardVariable', system-ui, sans-serif;`
- Pretendard에는 기울임 파일이 없어서 기울임(영어 이름·vs 배지)은 브라우저가 비스듬히 만들어 보여 줌
- 제목 700 (물음표 `?`만 `--blue`) · 부제 400 + "Vibe Glossary"만 600 기울임 · 묶음 제목 700 · 상세 용어 이름 700 · 카드 용어 이름 600 · 사이드바 큰 묶음·버튼 600 · 작은 분류 400 · 본문 400 · **영어 이름 400 기울임** · 프롬프트 속 핵심 용어 600 `--blue-text` · `vs` 배지 700 기울임 · 색인 글자 600
- 기울임은 영어와 vs 배지에만

### 움직임
- 기본 전환: ease-out 0.3초, 카드 열기는 스프링, 카드가 처음 보일 때 순차 등장, 사이드바 펼치기 아코디언

## 데이터: `src/data/terms.json`
TERMS.md(+ notion-terms.md의 뜻)를 읽어 **스크립트로** 만든다 (`scripts/build-terms.ts`). 손으로 520개 쓰지 않기.
```ts
type Term = {
  id: string;              // 'bottom-sheet' (영어 이름 kebab-case)
  ko: string;              // '바텀시트'
  en: string;              // 'Bottom Sheet'
  aliases: string[];       // ['하단 시트']  같은 뜻 다른 이름 (예: 원형 진행률 ↔ 프로그레스 바 서큘러)
  groups: { group: GroupKey; sub: string }[];  // 겹치는 용어는 여러 개
  short: string;           // 15자 안팎 한 줄 설명 (검색용)
  meaning: string;         // 뜻 (노션 설명 또는 TERMS.md 설명)
  prompt: string;          // 프롬프트 예시 문장
  related: string[];       // 같이 쓰면 좋은 말 (term id)
  vs?: string[];           // 헷갈리는 짝 (term id)
  anim: { type: string; params?: Record<string, unknown> }; // 애니메이션 템플릿
  tryIt?: boolean;         // 직접 해보기 가능 여부
  starter?: boolean;       // "처음이라면 이것부터"에 나올지
}
type GroupKey = 'start'|'look'|'parts'|'motion'|'screens'|'gesture'|'learn'|'ux'|'size'|'build'|'ai';
```
- 초성은 `ko`에서 런타임 계산 (저장 안 함)
- 스크립트가 더 넣는 칸: `easy`(쉬운 뜻) · `groups[].order`(TERMS.md 순서) · `vsNote`(짝 id → 비교 설명) · `sprout`(🌱 초보용) · `draft`. 만들기: `npm run build:terms` (프롬프트 초안은 `scripts/prompt-drafts.md`, 쉬운 뜻은 `scripts/easy-drafts.md`에서 고치기)
- **상세 화면의 '뜻'은 `easy`**: 처음 보는 사람도 알 쉬운 말, 한두 문장, "~예요/~해요", 도움이 되면 생활 속 비유. 원래 뜻(`meaning`)은 검색에만 씀
- `vs` 줄의 짝이 용어로 없으면(예: 벡터 vs 비트맵) **비교 카드 하나**로 만듦 (`anim.type: 'Compare'`)
- TERMS.md의 `vs 가 vs 나` 줄은 별도 카드가 아니라 **각 용어의 `vs` 칸**으로 넣기 (가↔나 서로 연결). 단 `vs` 줄에 뜻이 적힌 것은 상세의 비교 설명으로 사용
- 같은 용어가 여러 분류에 나오면 **카드 하나 + groups 여러 개** (PLAN.md 4장 겹침 표 + TERMS.md 참고: 벤토, 스켈레톤, 바텀시트, 순차 등장, 진행 바, 코치마크 등)
- `short`, `prompt`, `related`가 원본에 없으면 **Claude가 초안을 채우고** `"draft": true` 표시 → 정은이 검토. 프롬프트 문장 규칙: "언제 + 어디서 + 무엇이 + 어떻게" 구조, 핵심 용어를 문장 안에 그대로 넣기, "~해줘"로 끝내기. 예: "설정 버튼을 누르면 화면 아래에서 **바텀시트**가 올라와서 글자 크기를 고를 수 있게 해줘"

## 애니메이션 만드는 법 (가장 중요한 원칙)
**520개를 하나씩 따로 만들지 말고, 묶음별 '애니메이션 템플릿'을 만들어 값만 바꿔 재사용.**
- `src/anim/` 아래 템플릿 컴포넌트. 카드(작게, 2~3초 반복)와 상세(크게, 다시 보기, 직접 해보기)를 같은 컴포넌트에 `size`·`interactive` 속성으로
- 모두 HTML/CSS/SVG로 그림 (이미지·영상 없음). 화면 밖이면 멈춤
- 템플릿 예시
  | 템플릿 | 쓰는 곳 |
  |---|---|
  | `StyleSwatch` — 같은 메모 아이콘+글을 스타일만 바꿔 그림 | 🎨 디자인 스타일·글자 스타일 |
  | `PropertyMorph` — 상자 하나의 속성이 0→최대로 변함 | 🎨 꾸밈 속성·색과 글자 (패딩, 모서리 둥글기, 그림자, 블러…) |
  | `LayoutSketch` — 회색 상자들로 배치를 그림 | 🎨 화면 배치 |
  | `MiniPhone` — 작은 폰 화면 안에서 부품·화면이 작동 | 🧩 부품 대부분, 📱 상황별 화면, 🎬 화면 전환 |
  | `MotionBox` — 같은 네모가 효과별로 움직임, 비교는 두 줄 경주 | 🎬 움직임·텍스트 등장 |
  | `Finger` — 손가락 동그라미가 누르고 미는 모습 (MiniPhone 위에 겹쳐 씀) | ✋ 손동작, 직접 해보기 안내 |
  | `DragQuiz` — 카드가 끌려가 칸에 들어가고 정답 표시 | 🎮 학습·게임 UI |
  | `BeforeAfter` — 왼쪽 아쉬운 예 → 오른쪽 좋은 예 | 🧠 UX 원칙 |
  | `ResizeFrame` — 화면 틀이 넓어졌다 좁아지며 배치가 바뀜 | 📐 화면 크기 |
  | `FlowDiagram` — 아이콘이 화살표를 따라 이동하는 작은 흐름도 | 🛠 만들고 배포하기 |
  | `ChatFlow` — 말풍선이 오가며 결과가 만들어짐 | 💬 AI와 일하기 |
  | `BrowserWindow` — 작은 브라우저/코드 창 안에서 상황이 벌어짐 | 🌱 처음 시작 |
- 템플릿에 맞지 않는 용어만 따로 만들기. 아직 못 만든 용어는 **용어 뜻에 맞는 아이콘**(`src/anim/termIcons.ts`, 없으면 묶음 아이콘)이 천천히 숨 쉬는 **기본 애니메이션**으로 표시 (빈칸 없게)
- 애니메이션은 `src/anim/registry.ts`에 용어 id로 등록 (registry가 termIcons보다 먼저)
- **그림 속 이름표**: 중요한 곳을 `Callout`(또는 화면 배치의 `labels`)으로 짚어 줌. 상세 화면에서만 보이고 카드에서는 숨김 (카드는 이름 + 애니메이션만)
- **직접 해보기**(`tryIt: true`)는 실제로 조작되는 작은 부품: 스위치, 슬라이더, 체크박스, 라디오, 세그먼트, 별점, 스테퍼, 아코디언, 탭, 바텀시트, 모달, 토스트, 스와이프, 드래그 등

## 만드는 순서 (Phase)
1. **뼈대**: 프로젝트 생성, 폰트·색 토큰·글래스 기본 컴포넌트(GlassCard, GlassPill), 배경 빛, 왼쪽 사이드바, 검색창 자리, 1:1 카드 그리드(애니메이션 자리만, 묶음 아이콘 기본 애니메이션), 하단 저작권
2. **데이터**: `scripts/build-terms.ts`로 TERMS.md + notion-terms.md → terms.json. 개수·겹침·vs 연결 검사 결과를 보여 주기. `short`·`prompt`·`related` 초안 채우기(draft 표시)
3. **목록**: 묶음 선택·작은 분류 스크롤 연동, 전체 ㄱㄴㄷ순 + 오른쪽 색인 띠, 처음이라면 이것부터 줄, 반응형 카드 수, 휴대폰 드로어
4. **상세**: 카드 확장 전환, 상세 레이아웃, 프롬프트 복사 + 토스트, 같이 쓰면 좋은 말 이동, 이전·다음, `/t/:id` 주소 공유, vs 나란히 비교
5. **검색**: 초성 포함, 강조, 결과 없음 안내
6. **애니메이션 1차**: 템플릿 만들고 **🧩 인디케이터 → 🧩 평점 UI → 🎨 디자인 스타일** 먼저 (참고 이미지와 같은 묶음이라 기준 잡기). 정은 확인 후 다음
7. **애니메이션 2차**: 나머지 묶음을 템플릿으로 채우기 → 직접 해보기
8. **마무리**: 동작 줄이기 대응, 키보드 조작, OG 이미지·파비콘, 휴대폰·태블릿·프로젝터(1280px, 글자 크기) 확인, Lighthouse 점검

## 하지 말 것
- 애플 SF 폰트, SF Symbols, 애플 UI 키트 그림·요소 사용
- 전체화면·설정 버튼 추가
- 애니메이션에 루미너스 블루·회색 말고 다른 색 쓰기 (생김새 묶음의 스타일 예시는 예외)
- 카드에 설명·태그·복사 버튼 넣기 (카드는 이름 + 애니메이션만)
- 이미지·GIF·영상 파일로 애니메이션 만들기
