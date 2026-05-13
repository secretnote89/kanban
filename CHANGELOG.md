# 변경 이력

## [Phase 2] - 2026-05-13

### ✨ 추가된 기능
- **멀티유저 대비 구조**
  - 익명 사용자 ID 자동 생성 (UUID)
  - 사용자별 데이터 격리 (LocalStorage)
  - 사용자 ID 화면 표시

- **데이터 관리**
  - 💾 데이터 내보내기 (JSON)
  - 📂 데이터 가져오기 (JSON)
  - 🗑️ 데이터 초기화
  - 자동 저장 (카드 추가/수정/삭제 시)

- **보안 강화**
  - XSS 방지 (textContent 사용)
  - 사용자 권한 확인 (카드 삭제/이동)
  - 입력 검증 (제목 200자 제한)

### 🔄 변경된 기능
- 카드 데이터 모델 확장
  - `userId` 필드 추가
  - `boardId` 필드 추가
  - `createdAt` 타임스탬프 추가
  - `updatedAt` 타임스탬프 추가

- LocalStorage 키 구조 변경
  - 기존: `kanban-cards`
  - 신규: `kanban-{userId}-{boardId}`

### 🎨 UI 개선
- 헤더에 사용자 ID 표시 추가
- 푸터에 데이터 관리 버튼 추가
- 반응형 디자인 개선 (모바일)

### 📚 문서
- 11개 전문 문서 작성
  - README.md (프로젝트 개요)
  - ARCHITECTURE.md (멀티유저 아키텍처)
  - PRD.md (제품 요구사항)
  - TRD.md (기술 요구사항)
  - DATABASE_DESIGN.md (Supabase 포함)
  - STORAGE_PLAN.md (스토리지 전략)
  - USER_FLOW.md (Mermaid 다이어그램)
  - DESIGN_SYSTEM.md (디자인 시스템)
  - TASKS.md (작업 체크리스트)
  - CONVENTIONS.md (코딩 컨벤션)
  - USAGE_GUIDE.md (사용 가이드)

### 🔧 기술적 개선
- 코드 라인 수: 173 → 507 (JavaScript)
- 함수 구조화 및 모듈화
- 에러 처리 강화
- 콘솔 로깅 추가

---

## [Phase 1] - 2026-05-13

### ✨ 초기 출시
- 3개 컬럼 칸반 보드 (To-Do, In Progress, Done)
- 드래그 앤 드롭으로 카드 이동
- 카드 추가/삭제
- 반응형 디자인
- 샘플 카드 4개 포함

### 📊 통계
- HTML: 57줄
- CSS: 262줄
- JavaScript: 173줄
- 총 492줄
