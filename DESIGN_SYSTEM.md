# Design System: 칸반 보드 애플리케이션

## 1. 디자인 철학

### 1.1 핵심 원칙
- **명확성 (Clarity)**: 사용자가 직관적으로 이해할 수 있는 인터페이스
- **일관성 (Consistency)**: 모든 요소가 통일된 디자인 언어 사용
- **반응성 (Responsiveness)**: 모든 디바이스에서 최적의 경험 제공
- **접근성 (Accessibility)**: 모든 사용자가 쉽게 접근 가능

### 1.2 디자인 목표
- 작업 흐름을 한눈에 파악 가능
- 드래그 앤 드롭 시 명확한 시각적 피드백
- 깔끔하고 현대적인 UI
- 눈의 피로를 최소화하는 색상 팔레트

## 2. 색상 시스템

### 2.1 Primary Colors (주요 색상)

```css
/* Brand Colors */
--color-primary: #667eea;      /* 보라 - 메인 브랜드 컬러 */
--color-primary-dark: #5568d3; /* 진한 보라 - 호버 상태 */
--color-primary-light: #e6f3ff; /* 연한 보라 - 배경 */

/* Secondary Colors */
--color-secondary: #764ba2;    /* 자주 - 그라디언트 보조 */
```

**사용 예시**:
- 버튼 배경: `--color-primary`
- 버튼 호버: `--color-primary-dark`
- 강조 영역: `--color-primary-light`

### 2.2 Status Colors (상태별 색상)

```css
/* Column Status Colors */
--color-todo: #e74c3c;         /* 빨강 - To-Do */
--color-in-progress: #f39c12;  /* 주황 - In Progress */
--color-done: #27ae60;         /* 초록 - Done */

/* Semantic Colors */
--color-success: #27ae60;      /* 성공 */
--color-warning: #f39c12;      /* 경고 */
--color-error: #e74c3c;        /* 에러 */
--color-info: #3498db;         /* 정보 */
```

**사용 예시**:
- To-Do 컬럼 헤더: `--color-todo`
- In Progress 컬럼 헤더: `--color-in-progress`
- Done 컬럼 헤더: `--color-done`

### 2.3 Neutral Colors (중립 색상)

```css
/* Grayscale */
--color-white: #ffffff;
--color-gray-100: #f5f5f5;
--color-gray-200: #e0e0e0;
--color-gray-300: #d0d0d0;
--color-gray-400: #b0b0b0;
--color-gray-500: #909090;
--color-gray-600: #666666;
--color-gray-700: #444444;
--color-gray-800: #333333;
--color-gray-900: #222222;
--color-black: #000000;
```

**사용 예시**:
- 배경: `--color-gray-100`
- 테두리: `--color-gray-200`
- 텍스트: `--color-gray-800`

### 2.4 Background Gradients

```css
/* Main Background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Alternative Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-success: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
--gradient-warning: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%);
```

### 2.5 Color Palette Overview

| 색상 | Hex | RGB | 용도 |
|------|-----|-----|------|
| Primary | `#667eea` | `102, 126, 234` | 버튼, 링크, 포커스 |
| Primary Dark | `#5568d3` | `85, 104, 211` | 호버 상태 |
| Secondary | `#764ba2` | `118, 75, 162` | 그라디언트 |
| To-Do Red | `#e74c3c` | `231, 76, 60` | To-Do 컬럼 |
| In Progress Orange | `#f39c12` | `243, 156, 18` | In Progress 컬럼 |
| Done Green | `#27ae60` | `39, 174, 96` | Done 컬럼 |
| Error | `#c0392b` | `192, 57, 43` | 삭제 버튼 호버 |
| Background | `#f5f5f5` | `245, 245, 245` | 카드 컨테이너 |

## 3. 타이포그래피

### 3.1 Font Family

```css
/* Primary Font Stack */
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

/* Fallback for Korean */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', 
             '맑은 고딕', sans-serif;
```

### 3.2 Font Sizes

```css
/* Font Size Scale */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.85rem;    /* 13.6px */
--font-size-base: 1rem;     /* 16px - body text */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 2rem;      /* 32px */
--font-size-4xl: 2.5rem;    /* 40px */
```

**사용 예시**:
```css
h1 { font-size: var(--font-size-4xl); }  /* 2.5rem / 40px */
h2 { font-size: var(--font-size-xl); }   /* 1.25rem / 20px */
body { font-size: var(--font-size-base); } /* 1rem / 16px */
.count { font-size: var(--font-size-sm); } /* 0.85rem / 13.6px */
```

### 3.3 Font Weights

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

**사용 예시**:
- 본문: `400 (normal)`
- 버튼: `600 (semibold)`
- 헤더: `700 (bold)`

### 3.4 Line Heights

```css
--line-height-tight: 1.25;    /* 125% - 헤더 */
--line-height-normal: 1.5;    /* 150% - 본문 */
--line-height-relaxed: 1.75;  /* 175% - 긴 텍스트 */
```

### 3.5 Typography Usage

| 요소 | Size | Weight | Line Height | Color |
|------|------|--------|-------------|-------|
| Page Title (h1) | 2.5rem | 700 | 1.25 | white |
| Column Header (h2) | 1.3rem | 700 | 1.25 | #333 |
| Card Title | 1rem | 400 | 1.5 | #333 |
| Button Text | 1rem | 600 | 1.5 | white |
| Count Badge | 0.9rem | 700 | 1.5 | #666 |

## 4. 간격 시스템 (Spacing)

### 4.1 Spacing Scale

```css
/* 8px Base Unit */
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

### 4.2 Component Spacing

| 컴포넌트 | Padding | Margin | Gap |
|----------|---------|--------|-----|
| Card | 15px | 0 0 10px 0 | - |
| Column | 20px | - | - |
| Button | 12px | 10px 0 0 0 | - |
| Modal | 30px | - | - |
| Board Grid | - | - | 20px |
| Column Header | - | 0 0 15px 0 | - |

### 4.3 Layout Spacing

```css
/* Container */
.container {
    padding: 20px;           /* --spacing-5 */
}

/* Kanban Board Grid */
.kanban-board {
    gap: 20px;               /* --spacing-5 */
    margin-bottom: 20px;     /* --spacing-5 */
}

/* Column */
.column {
    padding: 20px;           /* --spacing-5 */
}

/* Card */
.card {
    padding: 15px;           /* ~--spacing-4 */
    margin-bottom: 10px;     /* ~--spacing-2.5 */
}
```

## 5. 그림자 (Shadows)

### 5.1 Shadow Scale

```css
/* Elevation Shadows */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.25);
```

### 5.2 Component Shadows

| 컴포넌트 | 기본 상태 | 호버 상태 |
|----------|-----------|-----------|
| Card | `0 2px 4px rgba(0,0,0,0.1)` | `0 4px 8px rgba(0,0,0,0.15)` |
| Column | `0 4px 6px rgba(0,0,0,0.1)` | - |
| Modal | `0 8px 16px rgba(0,0,0,0.2)` | - |
| Button | None | `0 2px 4px rgba(0,0,0,0.1)` |

## 6. 테두리 (Borders)

### 6.1 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;  /* 완전한 원형 */
```

### 6.2 Component Borders

| 컴포넌트 | Border Radius | Border |
|----------|---------------|--------|
| Card | 8px | none |
| Column | 12px | none |
| Button | 8px | none |
| Modal | 12px | none |
| Count Badge | 12px | none |
| Input | 8px | 2px solid #e0e0e0 |

### 6.3 Border Usage

```css
/* Column Header Border */
.column-header {
    border-bottom: 2px solid #e0e0e0;
}

/* Input Border */
input {
    border: 2px solid #e0e0e0;
}

input:focus {
    border-color: #667eea;  /* Primary color */
}

/* Drag Over Border */
.cards-container.drag-over {
    border: 2px dashed #667eea;
}
```

## 7. 애니메이션 및 전환 (Animations & Transitions)

### 7.1 Transition Duration

```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### 7.2 Easing Functions

```css
--ease-linear: linear;
--ease-in: ease-in;
--ease-out: ease-out;
--ease-in-out: ease-in-out;
--ease-custom: cubic-bezier(0.4, 0, 0.2, 1);
```

### 7.3 Component Transitions

```css
/* Card Hover */
.card {
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Button Hover */
.button {
    transition: background 0.3s ease;
}

/* Drag State */
.card.dragging {
    transition: opacity 0.15s ease, transform 0.15s ease;
    opacity: 0.5;
    transform: rotate(5deg);
}

/* Modal Fade In */
.modal.active {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
```

### 7.4 Animation Examples

| 상태 | 애니메이션 | Duration | Easing |
|------|-----------|----------|--------|
| Card Hover | `translateY(-2px)` | 300ms | ease |
| Card Dragging | `opacity 0.5, rotate(5deg)` | 150ms | ease |
| Button Hover | `background color change` | 300ms | ease |
| Modal Open | `fadeIn opacity 0→1` | 300ms | ease |
| Drag Over | `background color change` | 150ms | ease |

## 8. 레이아웃

### 8.1 Grid System

```css
/* 3-Column Grid */
.kanban-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

/* Single Column (Mobile) */
@media (max-width: 1024px) {
    .kanban-board {
        grid-template-columns: 1fr;
    }
}
```

### 8.2 Flexbox Patterns

```css
/* Column Layout */
.column {
    display: flex;
    flex-direction: column;
}

/* Column Header */
.column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Card Content */
.card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Modal Buttons */
.modal-buttons {
    display: flex;
    gap: 10px;
}
```

### 8.3 Responsive Breakpoints

```css
/* Breakpoint System */
--breakpoint-mobile: 767px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1440px;
```

**사용 예시**:
```css
/* Mobile: < 768px */
@media (max-width: 767px) {
    .kanban-board {
        grid-template-columns: 1fr;
    }
    .cards-container {
        min-height: 200px;
    }
}

/* Tablet: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
    .kanban-board {
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
    .kanban-board {
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
}
```

## 9. 컴포넌트 스타일

### 9.1 Button Styles

```css
/* Primary Button */
.button-primary {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.button-primary:hover {
    background: #5568d3;
}

/* Danger Button */
.delete-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.delete-btn:hover {
    background: #c0392b;
}

/* Secondary Button */
.button-secondary {
    background: #e0e0e0;
    color: #333;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.button-secondary:hover {
    background: #d0d0d0;
}
```

### 9.2 Card Styles

```css
.card {
    background: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: move;
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.card.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}
```

### 9.3 Modal Styles

```css
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal.active {
    display: flex;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    min-width: 400px;
}
```

### 9.4 Input Styles

```css
input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 20px;
    transition: border-color 0.3s ease;
}

input:focus {
    outline: none;
    border-color: #667eea;
}

input::placeholder {
    color: #b0b0b0;
}
```

## 10. 아이콘 시스템

### 10.1 Icon Size

```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### 10.2 Icon Usage (향후)

| 위치 | 아이콘 | 크기 |
|------|--------|------|
| 카드 추가 버튼 | + (Plus) | 16px |
| 삭제 버튼 | × (Close) | 14px |
| 설정 | ⚙ (Gear) | 20px |
| 검색 | 🔍 (Search) | 18px |

## 11. 상태별 스타일

### 11.1 Hover States

```css
/* Card Hover */
.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Button Hover */
.add-card-btn:hover {
    background: #5568d3;
}

/* Delete Button Hover */
.delete-btn:hover {
    background: #c0392b;
}
```

### 11.2 Active/Focus States

```css
/* Input Focus */
input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Button Active */
button:active {
    transform: scale(0.98);
}
```

### 11.3 Dragging States

```css
/* Card Being Dragged */
.card.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}

/* Drop Zone Active */
.cards-container.drag-over {
    background: rgba(102, 126, 234, 0.1);
    border: 2px dashed #667eea;
}
```

### 11.4 Disabled States

```css
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}
```

## 12. 접근성 (Accessibility)

### 12.1 Focus Visible

```css
/* Keyboard Navigation Focus */
*:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

button:focus-visible {
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}
```

### 12.2 Color Contrast (WCAG 2.1 AA)

| 텍스트 | 배경 | 대비율 | 통과 |
|--------|------|--------|------|
| #333 | #ffffff | 12.6:1 | ✅ AAA |
| #666 | #ffffff | 5.7:1 | ✅ AA |
| white | #667eea | 4.5:1 | ✅ AA |
| white | #e74c3c | 4.5:1 | ✅ AA |

### 12.3 ARIA Labels (Phase 2)

```html
<!-- Add Card Button -->
<button aria-label="To-Do 컬럼에 새 카드 추가">+ 카드 추가</button>

<!-- Delete Button -->
<button aria-label="카드 삭제">삭제</button>

<!-- Modal -->
<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
    <h2 id="modal-title">새 카드 추가</h2>
</div>
```

## 13. 다크 모드 (Phase 3 예정)

```css
/* Dark Mode Colors */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: #1a1a1a;
        --bg-secondary: #2d2d2d;
        --text-primary: #ffffff;
        --text-secondary: #b0b0b0;
        --border-color: #404040;
    }
    
    body {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        color: var(--text-primary);
    }
    
    .card {
        background: var(--bg-secondary);
        color: var(--text-primary);
    }
}
```

## 14. Design Tokens (CSS Variables)

```css
:root {
    /* Colors */
    --color-primary: #667eea;
    --color-primary-dark: #5568d3;
    --color-todo: #e74c3c;
    --color-in-progress: #f39c12;
    --color-done: #27ae60;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Typography */
    --font-size-base: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 2.5rem;
    --font-weight-normal: 400;
    --font-weight-bold: 700;
    
    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    /* Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-normal: 300ms ease;
}
```

## 15. 요약

이 디자인 시스템은 칸반 보드 애플리케이션의 모든 시각적 요소를 일관되게 정의합니다.

### 핵심 요소
- **색상**: Primary #667eea, 상태별 색상 (빨강/주황/초록)
- **타이포그래피**: Segoe UI, 1rem 기본, 400-700 weight
- **간격**: 8px 기본 단위
- **그림자**: 0-4단계 elevation
- **애니메이션**: 300ms ease 트랜지션

### 일관성 유지 팁
1. CSS 변수 사용으로 중앙 관리
2. 컴포넌트별 일관된 패턴 적용
3. 반응형 디자인 고려
4. 접근성 기준 준수
