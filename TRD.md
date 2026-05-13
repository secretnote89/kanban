# TRD: 칸반 보드 애플리케이션

## 1. 기술 개요

### 1.1 기술 스택
| 계층 | 기술 | 버전 | 용도 |
|------|------|------|------|
| 마크업 | HTML5 | - | 구조 및 시맨틱 |
| 스타일 | CSS3 | - | 레이아웃 및 디자인 |
| 스크립트 | JavaScript (Vanilla) | ES6+ | 로직 및 인터랙션 |
| 브라우저 API | Drag and Drop API | HTML5 | 드래그 앤 드롭 구현 |
| 스토리지 | LocalStorage | HTML5 | 데이터 지속성 (Phase 2) |

### 1.2 의존성
- **외부 라이브러리**: 없음 (Zero dependency)
- **빌드 도구**: 불필요 (정적 HTML/CSS/JS)
- **패키지 매니저**: 불필요

### 1.3 개발 환경
- **에디터**: VS Code, WebStorm, 기타
- **브라우저 DevTools**: Chrome DevTools, Firefox DevTools
- **버전 관리**: Git
- **로컬 서버**: Live Server (VS Code Extension) 또는 Python SimpleHTTPServer

## 2. 시스템 아키텍처

### 2.1 전체 구조
```
┌─────────────────────────────────────┐
│        Browser (Client)             │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │   Presentation Layer        │   │
│  │   (HTML + CSS)              │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Application Logic         │   │
│  │   (JavaScript)              │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Data Layer                │   │
│  │   (In-Memory Array)         │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Persistence (Phase 2)     │   │
│  │   (LocalStorage)            │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 2.2 컴포넌트 구조
```
kanban.html (Entry Point)
├── kanban.css (Styles)
└── kanban.js (Logic)
    ├── State Management (cards array)
    ├── Event Handlers
    │   ├── Drag Events
    │   ├── Modal Events
    │   └── Button Events
    ├── DOM Manipulation
    │   ├── renderCard()
    │   ├── deleteCard()
    │   └── updateCounts()
    └── Data Persistence (Phase 2)
        ├── saveToStorage()
        └── loadFromStorage()
```

### 2.3 데이터 흐름
```
User Action
    ↓
Event Listener
    ↓
Event Handler Function
    ↓
Update State (cards array)
    ↓
Update DOM (render)
    ↓
Visual Feedback to User
```

## 3. 기술 요구사항

### 3.1 HTML5 요구사항
- **시맨틱 태그 사용**: `<div>`, `<button>`, `<input>`, `<h1>`, `<h2>`
- **드래그 속성**: `draggable="true"`
- **데이터 속성**: `data-status`, `data-id`, `data-column`
- **접근성 속성**: ARIA 레이블 (Phase 2)

### 3.2 CSS3 요구사항
#### 3.2.1 레이아웃
- **Grid Layout**: 3컬럼 칸반 보드
- **Flexbox**: 컬럼 내부 수직 레이아웃
- **Responsive Design**: 미디어 쿼리 활용

#### 3.2.2 스타일링
- **그라디언트 배경**: `linear-gradient()`
- **박스 섀도우**: 카드 및 버튼 입체감
- **트랜지션**: 0.3초 ease 애니메이션
- **호버 효과**: `transform`, `box-shadow`

#### 3.2.3 성능 최적화
- **GPU 가속**: `transform`, `opacity` 사용
- **Layout Thrashing 방지**: 일괄 DOM 업데이트
- **CSS 압축**: 프로덕션 환경에서 minify

### 3.3 JavaScript 요구사항
#### 3.3.1 언어 버전
- **ES6+ 문법**: `const`, `let`, `arrow function`, `template literals`
- **배열 메서드**: `forEach`, `filter`, `find`, `push`
- **DOM API**: `querySelector`, `addEventListener`, `createElement`

#### 3.3.2 이벤트 처리
- **드래그 이벤트**:
  - `dragstart`: 드래그 시작
  - `dragend`: 드래그 종료
  - `dragover`: 드래그 중 (preventDefault 필수)
  - `dragenter`: 영역 진입
  - `dragleave`: 영역 이탈
  - `drop`: 드롭 완료

- **마우스/키보드 이벤트**:
  - `click`: 버튼 클릭
  - `keypress`: Enter 키 입력
  - `submit`: 폼 제출 (향후)

#### 3.3.3 상태 관리
```javascript
// Global State
let cards = [
    {
        id: Number,        // Unique ID (timestamp)
        title: String,     // Card title (1-200 chars)
        status: String     // 'todo' | 'in-progress' | 'done'
    }
];

let draggedCard = null;      // Currently dragged card element
let currentColumn = null;    // Target column for new card
```

#### 3.3.4 함수 구조
```javascript
// Initialization
window.onload = () => { /* ... */ }

// Card Management
addCard()                    // Create new card
renderCard(card)             // Render card to DOM
deleteCard(id)               // Remove card
updateCounts()               // Update column counts

// Drag & Drop
handleDragStart(e)           // Start dragging
handleDragEnd(e)             // End dragging
handleDragOver(e)            // Allow drop
handleDragEnter(e)           // Visual feedback on enter
handleDragLeave(e)           // Remove feedback on leave
handleDrop(e)                // Handle drop event

// Modal
openModal(column)            // Open card creation modal
closeModal()                 // Close modal

// Storage (Phase 2)
saveToStorage()              // Save cards to LocalStorage
loadFromStorage()            // Load cards from LocalStorage
```

## 4. 성능 요구사항

### 4.1 로딩 성능
| 지표 | 목표 | 측정 방법 |
|------|------|-----------|
| 초기 로드 시간 | < 1초 | Chrome DevTools Performance |
| HTML 파일 크기 | < 5KB | File size |
| CSS 파일 크기 | < 10KB | File size |
| JS 파일 크기 | < 15KB | File size |
| First Contentful Paint (FCP) | < 1초 | Lighthouse |
| Time to Interactive (TTI) | < 1.5초 | Lighthouse |

### 4.2 런타임 성능
| 작업 | 목표 | 측정 방법 |
|------|------|-----------|
| 카드 렌더링 | < 16ms (60fps) | Performance API |
| 드래그 앤 드롭 응답 | < 50ms | User timing |
| 카드 추가/삭제 | < 100ms | User timing |
| 메모리 사용량 | < 50MB | Chrome Task Manager |
| 100개 카드 렌더링 | < 500ms | Performance benchmark |

### 4.3 최적화 기법
- **이벤트 위임**: 카드 이벤트를 부모에 위임 (Phase 2)
- **Throttling/Debouncing**: 검색 입력 시 (Phase 3)
- **Virtual Scrolling**: 카드가 많을 때 (Phase 3)
- **Lazy Loading**: 이미지 또는 큰 데이터 (Phase 3)

## 5. 보안 요구사항

### 5.1 입력 검증
- **XSS 방지**:
  - 사용자 입력을 `textContent`로 삽입 (innerHTML 금지)
  - 특수문자 이스케이프
  - 입력 길이 제한 (제목 200자)

- **입력 검증**:
  - 빈 제목 입력 방지
  - 허용되지 않은 문자 필터링
  - 최대 카드 개수 제한 (500개)

### 5.2 LocalStorage 보안 (Phase 2)
- **데이터 검증**:
  - JSON 파싱 오류 처리
  - 스키마 검증
  - 손상된 데이터 복구 또는 초기화

- **용량 관리**:
  - LocalStorage quota 초과 처리
  - 오래된 데이터 정리 (LRU)
  - 사용자에게 용량 경고

### 5.3 CSP (Content Security Policy)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline';">
```

## 6. 브라우저 호환성

### 6.1 필수 지원 브라우저
| 브라우저 | 버전 | 시장 점유율 | 우선순위 |
|----------|------|-------------|----------|
| Chrome | 90+ | 65% | P0 |
| Firefox | 88+ | 10% | P0 |
| Safari | 14+ | 15% | P0 |
| Edge | 90+ | 8% | P0 |

### 6.2 기능별 호환성
| 기능 | Chrome | Firefox | Safari | Edge | Polyfill 필요 |
|------|--------|---------|--------|------|---------------|
| Drag & Drop API | 90+ | 88+ | 14+ | 90+ | No |
| CSS Grid | 90+ | 88+ | 14+ | 90+ | No |
| CSS Flexbox | 90+ | 88+ | 14+ | 90+ | No |
| LocalStorage | 90+ | 88+ | 14+ | 90+ | No |
| ES6 (let/const) | 90+ | 88+ | 14+ | 90+ | No |
| Arrow Functions | 90+ | 88+ | 14+ | 90+ | No |
| Template Literals | 90+ | 88+ | 14+ | 90+ | No |

### 6.3 모바일 브라우저
| 브라우저 | 버전 | 특이사항 |
|----------|------|----------|
| iOS Safari | 14+ | 터치 이벤트 별도 처리 필요 |
| Chrome Mobile | 90+ | 데스크톱과 동일 |
| Samsung Internet | 14+ | 테스트 필요 |

### 6.4 Fallback 전략
- **Drag & Drop 미지원 시**: 터치 이벤트 또는 버튼 기반 이동 (Phase 3)
- **LocalStorage 미지원 시**: 메모리 전용 모드
- **CSS Grid 미지원 시**: Flexbox fallback

## 7. 테스트 요구사항

### 7.1 단위 테스트 (Phase 2)
- **테스트 프레임워크**: Jest 또는 Vitest
- **커버리지 목표**: 80% 이상
- **테스트 대상**:
  - `addCard()`: 카드 생성 로직
  - `deleteCard()`: 카드 삭제 로직
  - `updateCounts()`: 카운트 업데이트
  - `saveToStorage()`: 저장 로직
  - `loadFromStorage()`: 불러오기 로직

### 7.2 통합 테스트 (Phase 2)
- **테스트 도구**: Playwright 또는 Cypress
- **테스트 시나리오**:
  - 카드 생성 → 이동 → 삭제 플로우
  - 페이지 새로고침 후 데이터 복원
  - 에러 처리 (빈 입력, 네트워크 오류 등)

### 7.3 수동 테스트
- **브라우저 테스트**:
  - Chrome, Firefox, Safari, Edge에서 동작 확인
  - 모바일 브라우저에서 터치 동작 확인
- **반응형 테스트**:
  - 320px ~ 1920px 해상도에서 레이아웃 확인
  - 세로/가로 모드 전환 테스트
- **접근성 테스트**:
  - 키보드 네비게이션 (Tab, Enter, Esc)
  - 스크린 리더 호환성 (NVDA, VoiceOver)

## 8. 배포 요구사항

### 8.1 정적 호스팅
- **권장 플랫폼**:
  - GitHub Pages (무료)
  - Netlify (무료)
  - Vercel (무료)
  - AWS S3 + CloudFront

### 8.2 배포 프로세스
```bash
# 1. 파일 압축 (선택)
# - HTML/CSS/JS minify

# 2. Git push
git add .
git commit -m "Release v1.0.0"
git push origin main

# 3. 자동 배포 (CI/CD)
# - GitHub Actions 또는 Netlify 자동 배포
```

### 8.3 배포 체크리스트
- [ ] 코드 minify (프로덕션)
- [ ] 브라우저 호환성 테스트
- [ ] 모바일 동작 확인
- [ ] 성능 측정 (Lighthouse)
- [ ] 접근성 검사 (WAVE, axe)
- [ ] 오류 로깅 설정 (Sentry 등)

## 9. 모니터링 및 로깅

### 9.1 에러 추적 (Phase 2)
- **도구**: Sentry, LogRocket, 또는 Custom Logger
- **추적 대상**:
  - JavaScript 런타임 에러
  - LocalStorage quota 초과
  - 브라우저 호환성 이슈

### 9.2 사용자 분석 (Phase 3)
- **도구**: Google Analytics, Plausible
- **추적 지표**:
  - 페이지 뷰
  - 카드 생성/이동/삭제 횟수
  - 평균 세션 시간
  - 이탈률

### 9.3 성능 모니터링
- **도구**: Web Vitals, Lighthouse CI
- **추적 지표**:
  - Core Web Vitals (LCP, FID, CLS)
  - 로딩 시간
  - 메모리 사용량

## 10. 기술 부채 및 개선 계획

### 10.1 현재 기술 부채
| 항목 | 설명 | 우선순위 | 해결 계획 |
|------|------|----------|-----------|
| 데이터 지속성 없음 | LocalStorage 미구현 | P1 | Phase 2 |
| 테스트 코드 없음 | 자동화 테스트 부재 | P2 | Phase 2 |
| 접근성 부족 | ARIA 레이블 미비 | P2 | Phase 2 |
| 모바일 최적화 | 터치 이벤트 미흡 | P3 | Phase 3 |

### 10.2 향후 기술 개선
- **TypeScript 도입**: 타입 안정성 향상
- **React/Vue 마이그레이션**: 복잡도 증가 시 고려
- **PWA 전환**: 오프라인 지원, 앱 설치
- **백엔드 연동**: Node.js + Express + MongoDB

## 11. 개발 워크플로우

### 11.1 Git 브랜치 전략
```
main (production)
└── develop (staging)
    ├── feature/add-localstorage
    ├── feature/edit-card
    └── bugfix/drag-drop-issue
```

### 11.2 커밋 컨벤션
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code formatting
refactor: Code restructuring
test: Add tests
chore: Build tasks, dependencies
```

### 11.3 코드 리뷰 체크리스트
- [ ] 코드가 컨벤션을 따르는가?
- [ ] XSS 취약점이 없는가?
- [ ] 성능에 영향을 주는가?
- [ ] 브라우저 호환성이 보장되는가?
- [ ] 테스트가 추가되었는가? (Phase 2+)

## 12. 참고 문서

### 12.1 Web Standards
- [HTML5 Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

### 12.2 Best Practices
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript)

### 12.3 Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I Use](https://caniuse.com/)
- [BrowserStack](https://www.browserstack.com/)
