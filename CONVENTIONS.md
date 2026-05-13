# 코딩 컨벤션: 칸반 보드 애플리케이션

## 1. 개요

이 문서는 칸반 보드 프로젝트의 일관된 코드 스타일과 베스트 프랙티스를 정의합니다.
모든 기여자는 이 컨벤션을 따라야 하며, 코드 리뷰 시 이를 기준으로 검토합니다.

---

## 2. 파일 구조 및 네이밍

### 2.1 디렉토리 구조

```
kanban-board/
├── kanban.html           # 메인 HTML 파일
├── kanban.css            # 스타일시트
├── kanban.js             # 메인 JavaScript
├── assets/               # 정적 리소스 (향후)
│   ├── images/
│   └── icons/
├── docs/                 # 문서
│   ├── PLAN.md
│   ├── PRD.md
│   ├── TRD.md
│   └── ...
└── tests/                # 테스트 파일 (Phase 5)
    ├── unit/
    └── integration/
```

### 2.2 파일 네이밍 규칙

| 파일 타입 | 네이밍 규칙 | 예시 |
|-----------|-------------|------|
| HTML | `kebab-case.html` | `kanban.html`, `login-page.html` |
| CSS | `kebab-case.css` | `kanban.css`, `dark-mode.css` |
| JavaScript | `camelCase.js` | `kanban.js`, `apiClient.js` |
| Markdown | `UPPERCASE.md` 또는 `kebab-case.md` | `README.md`, `user-guide.md` |

### 2.3 컴포넌트 파일 (향후 리팩토링 시)

```
components/
├── Card.js
├── Column.js
├── Modal.js
└── Button.js
```

---

## 3. HTML 컨벤션

### 3.1 기본 원칙
- HTML5 시맨틱 태그 사용
- 들여쓰기: 4 스페이스
- 속성 순서: `id` → `class` → `data-*` → 기타
- 속성 값은 항상 큰따옴표(`"`) 사용

### 3.2 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>페이지 제목</title>
    <link rel="stylesheet" href="kanban.css">
</head>
<body>
    <!-- 컨텐츠 -->
    <script src="kanban.js"></script>
</body>
</html>
```

### 3.3 클래스 네이밍 (BEM 스타일)

```html
<!-- Block -->
<div class="card">
    <!-- Element -->
    <div class="card__header">
        <h3 class="card__title">Title</h3>
    </div>
    <!-- Modifier -->
    <div class="card__body card__body--highlighted">
        Content
    </div>
</div>
```

**규칙**:
- **Block**: 독립적인 컴포넌트 (예: `card`, `modal`, `button`)
- **Element**: Block의 하위 요소 (예: `card__title`, `modal__content`)
- **Modifier**: 상태나 변형 (예: `card--dragging`, `button--primary`)

### 3.4 데이터 속성

```html
<!-- Good: 명확한 의미 -->
<div class="column" data-status="todo" data-column-id="1">

<!-- Bad: 불명확한 이름 -->
<div class="column" data-s="td" data-id="1">
```

### 3.5 접근성 (ARIA)

```html
<!-- 버튼 -->
<button aria-label="To-Do 컬럼에 새 카드 추가">
    + 카드 추가
</button>

<!-- 모달 -->
<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
    <h2 id="modal-title">새 카드 추가</h2>
</div>

<!-- 숨김 요소 -->
<div class="visually-hidden" aria-hidden="true">
    Screen reader only
</div>
```

### 3.6 주석

```html
<!-- Good: 섹션 구분 -->
<!-- Header Section -->
<header class="site-header">
    ...
</header>

<!-- Bad: 불필요한 주석 -->
<!-- div -->
<div class="container">
```

---

## 4. CSS 컨벤션

### 4.1 기본 원칙
- 들여쓰기: 4 스페이스
- 클래스 선택자 우선 (ID 선택자 최소화)
- CSS 변수 사용 (색상, 간격, 폰트 등)
- Mobile-first 접근 (작은 화면 → 큰 화면)

### 4.2 선택자 작성 순서

```css
/* 1. Layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
grid-template-columns: repeat(3, 1fr);
gap: 20px;

/* 2. Box Model */
width: 100%;
height: 200px;
padding: 20px;
margin: 10px 0;
border: 1px solid #ccc;
border-radius: 8px;

/* 3. Typography */
font-size: 1rem;
font-weight: 600;
line-height: 1.5;
color: #333;

/* 4. Visual */
background: #ffffff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
opacity: 1;

/* 5. Animation */
transition: all 0.3s ease;
transform: translateY(0);

/* 6. Misc */
cursor: pointer;
overflow: hidden;
```

### 4.3 CSS 변수

```css
:root {
    /* Colors */
    --color-primary: #667eea;
    --color-success: #27ae60;
    
    /* Spacing */
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    
    /* Typography */
    --font-size-base: 1rem;
}

/* 사용 */
.button {
    background: var(--color-primary);
    padding: var(--spacing-md);
    font-size: var(--font-size-base);
}
```

### 4.4 클래스 네이밍

```css
/* Good: BEM 스타일 */
.card { }
.card__title { }
.card__body { }
.card--dragging { }

/* Bad: 비일관적 */
.card { }
.cardTitle { }
.card-body { }
.isDragging { }
```

### 4.5 미디어 쿼리

```css
/* Mobile First */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        padding: 20px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

### 4.6 주석

```css
/* Good: 섹션 구분 */
/* ==========================================================================
   Card Component
   ========================================================================== */

.card {
    /* ... */
}

/* Good: 복잡한 계산 설명 */
.element {
    width: calc(100% - 40px); /* 좌우 padding 20px씩 제외 */
}

/* Bad: 불필요한 주석 */
.card {
    color: red; /* 빨간색 */
}
```

---

## 5. JavaScript 컨벤션

### 5.1 기본 원칙
- ES6+ 문법 사용
- 들여쓰기: 4 스페이스
- 세미콜론 필수
- `const` 우선, 재할당 필요 시 `let`, `var` 사용 금지
- 함수는 선언식 또는 화살표 함수 사용

### 5.2 변수 및 상수 네이밍

```javascript
// 상수: UPPER_SNAKE_CASE (진짜 상수만)
const MAX_CARDS = 500;
const API_BASE_URL = 'https://api.example.com';

// 변수: camelCase
let currentCard = null;
let draggedElement = null;

// 배열: 복수형
const cards = [];
const users = [];

// Boolean: is/has 접두사
let isModalOpen = false;
let hasChanges = true;

// 함수: 동사 + 명사
function addCard() { }
function deleteCard() { }
function renderCard() { }

// 이벤트 핸들러: handle + 이벤트명
function handleDragStart(e) { }
function handleClick(e) { }
```

### 5.3 함수 작성

```javascript
// Good: 명확한 이름, 단일 책임
function createCard(title, status) {
    const card = {
        id: Date.now(),
        title: title,
        status: status
    };
    return card;
}

// Good: 화살표 함수 (간단한 콜백)
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// Bad: 불명확한 이름
function doStuff() { }
function process(data) { }

// Bad: 너무 긴 함수 (20줄 이상)
function megaFunction() {
    // 50 lines of code...
}
```

### 5.4 객체 및 배열

```javascript
// Good: 구조 분해 할당
const { id, title, status } = card;

// Good: 단축 속성
const card = { id, title, status };

// Good: 스프레드 연산자
const newCards = [...cards, newCard];

// Bad: 불필요한 중복
const card = {
    id: id,
    title: title,
    status: status
};
```

### 5.5 조건문

```javascript
// Good: 명확한 조건
if (cards.length > 0) {
    renderCards();
}

// Good: 삼항 연산자 (간단한 경우)
const message = isSuccess ? '성공' : '실패';

// Bad: 복잡한 중첩
if (condition1) {
    if (condition2) {
        if (condition3) {
            // ...
        }
    }
}

// Good: Early return
function processCard(card) {
    if (!card) return;
    if (!card.title) return;
    
    // 메인 로직
}
```

### 5.6 에러 처리

```javascript
// Good: try-catch로 에러 처리
function saveToStorage() {
    try {
        const data = JSON.stringify(cards);
        localStorage.setItem('kanban-cards', data);
        return true;
    } catch (error) {
        console.error('Failed to save:', error);
        alert('저장에 실패했습니다.');
        return false;
    }
}

// Bad: 에러 무시
function saveToStorage() {
    localStorage.setItem('kanban-cards', JSON.stringify(cards));
}
```

### 5.7 비동기 처리

```javascript
// Good: async/await (권장)
async function fetchCards() {
    try {
        const response = await fetch('/api/cards');
        const cards = await response.json();
        return cards;
    } catch (error) {
        console.error('Failed to fetch:', error);
        return [];
    }
}

// Good: Promise (필요한 경우)
function fetchCards() {
    return fetch('/api/cards')
        .then(response => response.json())
        .catch(error => {
            console.error('Failed to fetch:', error);
            return [];
        });
}
```

### 5.8 주석

```javascript
// Good: 복잡한 로직 설명
function calculatePosition(card) {
    // 카드의 중심점을 기준으로 드롭 위치 계산
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    return centerX;
}

// Good: TODO 주석
// TODO: LocalStorage quota 초과 처리 추가
function saveToStorage() {
    // ...
}

// Bad: 코드 그대로 설명
// cards 배열에 카드를 push한다
cards.push(card);

// Bad: 주석으로 코드 설명하지 말고 함수로 분리
// 카드를 렌더링하고 이벤트를 추가한다
function renderCard(card) {
    // 10 lines...
}
```

### 5.9 DOM 조작

```javascript
// Good: querySelector 사용
const modal = document.querySelector('#cardModal');
const cards = document.querySelectorAll('.card');

// Good: 이벤트 위임 (많은 요소에 이벤트 추가 시)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const cardId = e.target.closest('.card').dataset.id;
        deleteCard(cardId);
    }
});

// Bad: innerHTML로 사용자 입력 삽입 (XSS 취약점)
card.innerHTML = `<h3>${userInput}</h3>`;

// Good: textContent 사용
title.textContent = userInput;
```

### 5.10 코드 구조

```javascript
// 1. 상수 정의
const MAX_CARDS = 500;
const DEFAULT_STATUS = 'todo';

// 2. 전역 변수
let cards = [];
let draggedCard = null;

// 3. 초기화 함수
function init() {
    loadFromStorage();
    renderAllCards();
    attachEventListeners();
}

// 4. 이벤트 핸들러
function handleDragStart(e) {
    // ...
}

// 5. 헬퍼 함수
function getCardById(id) {
    return cards.find(card => card.id === id);
}

// 6. 초기화 실행
window.addEventListener('DOMContentLoaded', init);
```

---

## 6. Git 컨벤션

### 6.1 브랜치 네이밍

```
main                    # 프로덕션 브랜치
develop                 # 개발 브랜치

feature/add-dark-mode   # 새 기능
fix/drag-drop-bug       # 버그 수정
refactor/card-module    # 리팩토링
docs/update-readme      # 문서 업데이트
test/add-unit-tests     # 테스트 추가
```

### 6.2 커밋 메시지

```
type: subject

body (optional)

footer (optional)
```

**Type 종류**:
- `feat`: 새 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 파일 수정

**예시**:
```bash
# Good
feat: Add LocalStorage data persistence

Implement saveToStorage() and loadFromStorage() functions.
Auto-save on every card modification.

Closes #12

# Good
fix: Prevent duplicate card IDs

Use Date.now() + random suffix for unique IDs.

# Bad
Update files
Fixed bug
Changes
```

### 6.3 커밋 크기
- 하나의 논리적 변경사항 = 하나의 커밋
- 너무 크지 않게 (100줄 이내 권장)
- 의미 있는 단위로 분리

---

## 7. 코드 품질 체크리스트

### 7.1 코드 작성 후 확인사항

- [ ] 변수/함수 네이밍이 명확한가?
- [ ] 함수가 단일 책임 원칙을 따르는가?
- [ ] 중복 코드가 없는가?
- [ ] 에러 처리가 되어 있는가?
- [ ] XSS 등 보안 취약점이 없는가?
- [ ] 주석이 필요한 곳에만 있는가?
- [ ] 들여쓰기가 일관되는가?
- [ ] 브라우저 콘솔에 에러가 없는가?
- [ ] 코드가 이 컨벤션을 따르는가?

### 7.2 코드 리뷰 체크리스트

- [ ] 코드가 요구사항을 만족하는가?
- [ ] 코드가 읽기 쉽고 이해하기 쉬운가?
- [ ] 네이밍이 명확하고 일관되는가?
- [ ] 불필요한 복잡성이 없는가?
- [ ] 성능 이슈가 없는가?
- [ ] 보안 취약점이 없는가?
- [ ] 테스트가 통과하는가?
- [ ] 문서가 업데이트되었는가?

---

## 8. 베스트 프랙티스

### 8.1 성능
- 불필요한 DOM 조작 최소화
- 이벤트 위임 사용
- Throttle/Debounce 적용 (필요 시)
- 메모리 누수 방지 (이벤트 리스너 정리)

### 8.2 보안
- 사용자 입력을 `textContent`로 삽입 (innerHTML 금지)
- 입력 검증 및 새니타이징
- LocalStorage에 민감 정보 저장 금지
- CSP (Content Security Policy) 적용

### 8.3 접근성
- 시맨틱 HTML 사용
- ARIA 속성 추가
- 키보드 네비게이션 지원
- 색상 대비 확인 (WCAG 2.1 AA)

### 8.4 유지보수성
- 함수를 작고 명확하게 작성
- 매직 넘버 대신 상수 사용
- 중복 코드 제거
- 코드 주석 최소화 (명확한 네이밍으로 대체)

---

## 9. 린터 및 포매터 설정 (권장)

### 9.1 ESLint 설정 (Phase 2+)

```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-var": "error",
        "prefer-const": "error",
        "no-console": "warn"
    }
}
```

### 9.2 Prettier 설정 (Phase 2+)

```json
{
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "printWidth": 100
}
```

---

## 10. 참고 자료

- [MDN Web Docs](https://developer.mozilla.org/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
- [BEM Methodology](https://en.bem.info/methodology/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 11. 변경 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2026-05-13 | 1.0.0 | 초기 버전 작성 |
