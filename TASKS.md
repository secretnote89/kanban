# Tasks: 칸반 보드 애플리케이션

## 프로젝트 개요
이 문서는 칸반 보드 애플리케이션의 구현, 테스트, 배포를 위한 세부 작업 목록입니다.
AI agent 또는 개발자가 순차적으로 작업할 수 있도록 구성되어 있습니다.

---

## Phase 1: MVP 구현 (완료)

### 1. 프로젝트 초기화
- [x] 프로젝트 디렉토리 구조 생성
- [x] HTML 파일 생성 (`kanban.html`)
- [x] CSS 파일 생성 (`kanban.css`)
- [x] JavaScript 파일 생성 (`kanban.js`)
- [x] Git 저장소 초기화 (선택)

### 2. HTML 구조 구현
- [x] 기본 HTML5 문서 구조 작성
- [x] 메타 태그 설정 (charset, viewport)
- [x] 페이지 제목 (`<h1>`) 추가
- [x] 3개 컬럼 구조 생성 (To-Do, In Progress, Done)
- [x] 각 컬럼에 헤더 및 카드 개수 배지 추가
- [x] 각 컬럼에 카드 컨테이너 추가
- [x] 각 컬럼에 "카드 추가" 버튼 추가
- [x] 모달 창 구조 추가 (카드 생성용)
- [x] CSS 및 JS 파일 링크 연결

### 3. CSS 스타일링 구현
- [x] CSS 리셋 및 전역 스타일 설정
- [x] 그라디언트 배경 적용
- [x] 3컬럼 Grid 레이아웃 구현
- [x] 컬럼 스타일 (배경, 패딩, 테두리 반경)
- [x] 컬럼 헤더 스타일 (Flexbox, 색상)
- [x] 카드 스타일 (배경, 그림자, 패딩)
- [x] 카드 호버 효과 (transform, box-shadow)
- [x] 드래그 중 카드 스타일 (opacity, rotate)
- [x] 드롭 영역 하이라이트 스타일
- [x] 버튼 스타일 (primary, danger)
- [x] 모달 스타일 (overlay, content)
- [x] 입력 필드 스타일
- [x] 반응형 미디어 쿼리 (모바일)

### 4. JavaScript 기능 구현
- [x] 전역 상태 변수 선언 (`cards`, `draggedCard`, `currentColumn`)
- [x] 카드 추가 기능 구현 (`addCard`)
- [x] 카드 렌더링 기능 구현 (`renderCard`)
- [x] 카드 삭제 기능 구현 (`deleteCard`)
- [x] 카드 개수 업데이트 기능 구현 (`updateCounts`)
- [x] 모달 열기/닫기 기능 구현
- [x] 드래그 앤 드롭 이벤트 핸들러 구현
  - [x] `handleDragStart`
  - [x] `handleDragEnd`
  - [x] `handleDragOver`
  - [x] `handleDragEnter`
  - [x] `handleDragLeave`
  - [x] `handleDrop`
- [x] 샘플 카드 데이터 로드 (`window.onload`)

### 5. 테스트 및 디버깅
- [x] 브라우저에서 HTML 파일 열기
- [x] 카드 추가 기능 테스트
- [x] 카드 드래그 앤 드롭 테스트
- [x] 카드 삭제 기능 테스트
- [x] 반응형 디자인 테스트 (모바일 화면)
- [x] 콘솔 에러 확인 및 수정

---

## Phase 2: 데이터 지속성 및 멀티유저 대비 ✅

### 6. 사용자 ID 관리 (멀티유저 대비) ✅
- [x] `initializeUserId()` 함수 구현 (익명 UUID 생성)
- [x] `generateUUID()` 함수 구현
- [x] 현재 사용자 ID를 LocalStorage에 저장
- [x] 전역 변수 `currentUserId` 추가
- [x] 전역 변수 `currentBoardId` 추가 (기본값: 'default')
- [x] 카드 데이터 모델에 `userId`, `boardId` 필드 추가
- [x] 모든 카드 생성 함수에 userId, boardId 자동 추가
- [x] 사용자 ID 표시 UI 추가

### 7. LocalStorage 구현 (사용자별 격리) ✅
- [x] `saveToStorage()` 함수 구현 (키: `kanban-${userId}-${boardId}`)
- [x] `loadFromStorage()` 함수 구현 (사용자별 키)
- [x] `validateCards()` 스키마 검증 (userId 포함)
- [x] 페이지 로드 시 사용자 ID 초기화 → 데이터 로드
- [x] 카드 추가/수정/삭제 시 자동 저장 (auto-save)
- [x] LocalStorage quota 초과 처리
- [x] 손상된 데이터 복구 로직 구현

### 8. 데이터 접근 제어 (사용자별 필터링) ✅
- [x] 카드 삭제 시 userId 확인 추가
- [x] 카드 이동 시 userId 확인 추가
- [x] 다른 사용자 카드 접근 시 에러 처리
- [x] XSS 방지 (textContent 사용)

### 12-B. 데이터 내보내기/가져오기 ✅
- [x] `exportData()` 함수 구현 (현재 사용자 데이터만)
- [x] `importData(file)` 함수 구현 (현재 사용자에게 추가)
- [x] 파일 선택 UI 추가
- [x] 가져오기 시 userId 자동 할당
- [x] 가져오기 성공/실패 알림
- [x] `clearStorage()` 데이터 초기화 함수 구현

### 9. 카드 수정 기능
- [ ] 카드에 "수정" 버튼 추가
- [ ] 카드 수정 모달 UI 구현
- [ ] 카드 제목 수정 기능 구현
- [ ] `updateCard(id, newData)` 함수 구현
- [ ] 수정 후 `updatedAt` 타임스탬프 업데이트
- [ ] 수정 후 DOM 업데이트

### 10. 카드 상세 정보 추가
- [ ] 카드 데이터 모델에 `description` 필드 추가
- [ ] 카드 클릭 시 상세 보기 모달 열기
- [ ] 설명 텍스트 입력 필드 추가
- [ ] 설명 저장 기능 구현
- [ ] 설명이 있는 카드에 아이콘 표시

### 11. 마감일 기능
- [ ] 카드 데이터 모델에 `dueDate` 필드 추가
- [ ] 날짜 선택 입력 필드 추가
- [ ] 마감일 표시 UI 구현
- [ ] 마감일 임박 시 시각적 경고 (빨간색)
- [ ] 마감일 지난 카드 처리

### 12. 데이터 내보내기/가져오기 (사용자별)
- [ ] `exportData()` 함수 구현 (현재 사용자 데이터만)
- [ ] `importData(file)` 함수 구현 (현재 사용자에게 추가)
- [ ] 파일 선택 UI 추가
- [ ] 가져오기 시 userId 자동 할당
- [ ] 가져오기 성공/실패 알림

---

## Phase 3: 고급 기능

### 11. 키보드 네비게이션
- [ ] Tab 키로 카드 간 이동
- [ ] Enter 키로 카드 선택/수정
- [ ] ESC 키로 모달 닫기
- [ ] N 키로 새 카드 생성 (단축키)
- [ ] Delete 키로 카드 삭제
- [ ] 화살표 키로 카드 이동 (선택)

### 12. 검색 및 필터링
- [ ] 검색 바 UI 추가
- [ ] 카드 제목 검색 기능 구현
- [ ] 검색 결과 하이라이트
- [ ] 필터 드롭다운 추가 (상태별, 마감일별)
- [ ] 필터 적용 시 카드 숨김/표시

### 13. 우선순위 및 태그
- [ ] 카드에 `priority` 필드 추가 (low, medium, high)
- [ ] 우선순위 선택 UI 추가
- [ ] 우선순위별 색상 라벨 표시
- [ ] 카드에 `tags` 배열 추가
- [ ] 태그 입력 및 표시 UI 구현
- [ ] 태그별 필터링 기능

### 14. 컬럼 커스터마이징
- [ ] 컬럼 추가 기능 구현
- [ ] 컬럼 삭제 기능 구현
- [ ] 컬럼 이름 수정 기능
- [ ] 컬럼 순서 변경 (드래그 앤 드롭)
- [ ] 컬럼 설정 LocalStorage에 저장

### 15. 다크 모드
- [ ] 다크 모드 CSS 변수 정의
- [ ] 테마 토글 버튼 추가
- [ ] 테마 상태 LocalStorage에 저장
- [ ] 시스템 테마 감지 (`prefers-color-scheme`)
- [ ] 부드러운 테마 전환 애니메이션

### 16. 알림 시스템
- [ ] 토스트 알림 UI 구현
- [ ] 성공/에러/경고 알림 타입
- [ ] 카드 추가/삭제 시 알림 표시
- [ ] 자동 사라지는 알림 (3초 후)
- [ ] 알림 큐 관리 (여러 알림 동시 표시)

---

## Phase 4: Supabase 인증 및 클라우드 동기화

### 17. Supabase 프로젝트 설정
- [ ] Supabase 프로젝트 생성
- [ ] Supabase JavaScript Client 설치 (`@supabase/supabase-js`)
- [ ] 환경 변수 설정 (SUPABASE_URL, SUPABASE_ANON_KEY)
- [ ] Supabase 클라이언트 초기화

### 18. Supabase Auth 연동
- [ ] 이메일/비밀번호 회원가입 UI 구현
- [ ] 이메일/비밀번호 로그인 UI 구현
- [ ] Google OAuth 로그인 버튼 추가
- [ ] GitHub OAuth 로그인 버튼 추가
- [ ] 로그아웃 기능 구현
- [ ] 세션 유지 및 자동 로그인
- [ ] 로그인 상태에 따른 UI 전환

### 19. 익명 데이터 마이그레이션
- [ ] `migrateAnonymousToAuthenticated()` 함수 구현
- [ ] 로그인 시 익명 데이터 존재 확인
- [ ] 사용자에게 마이그레이션 확인 요청
- [ ] LocalStorage → Supabase 데이터 복사
- [ ] 마이그레이션 후 익명 데이터 정리

### 20. Supabase 데이터베이스 스키마
- [ ] `boards` 테이블 생성
- [ ] `cards` 테이블 생성
- [ ] `board_members` 테이블 생성 (Phase 5)
- [ ] 인덱스 생성 (user_id, board_id, status)
- [ ] RLS 정책 설정 (사용자별 데이터 격리)
  - [ ] Users can view own cards
  - [ ] Users can insert own cards
  - [ ] Users can update own cards
  - [ ] Users can delete own cards

### 21. 프론트엔드-Supabase 통합
- [ ] `fetchCards()` 함수 구현 (Supabase 조회)
- [ ] `createCard()` 함수 구현 (Supabase 삽입)
- [ ] `updateCard()` 함수 구현 (Supabase 업데이트)
- [ ] `deleteCard()` 함수 구현 (Supabase 삭제)
- [ ] 로딩 상태 UI 추가 (스피너)
- [ ] 에러 처리 및 사용자 알림
- [ ] 낙관적 업데이트 (Optimistic UI)
- [ ] 오프라인 지원 (LocalStorage fallback)

### 22. 다중 보드 지원
- [ ] 보드 생성 UI 구현
- [ ] 보드 목록 페이지 구현
- [ ] 보드 삭제 기능
- [ ] 보드 간 전환 UI (드롭다운)
- [ ] 현재 보드 ID를 상태로 관리
- [ ] 보드별 카드 필터링

## Phase 5: 실시간 협업 및 공유

### 23. Supabase Realtime 구독
- [ ] Realtime 채널 구독 (`subscribeToCards`)
- [ ] 카드 생성 이벤트 수신 및 UI 업데이트
- [ ] 카드 수정 이벤트 수신 및 UI 업데이트
- [ ] 카드 삭제 이벤트 수신 및 UI 업데이트
- [ ] 충돌 방지 로직 (낙관적 잠금)

### 24. 보드 공유 기능
- [ ] 보드 멤버 초대 UI (이메일 입력)
- [ ] `inviteMember()` 함수 구현
- [ ] 멤버 목록 조회 및 표시
- [ ] 멤버 제거 기능
- [ ] 권한 관리 (owner, editor, viewer)
- [ ] RLS 정책 업데이트 (공유 보드 접근 허용)

### 25. 협업 기능
- [ ] 카드에 작성자 표시
- [ ] 카드 수정 이력 표시
- [ ] 멤버별 아바타 표시
- [ ] 현재 누가 어떤 카드를 보고 있는지 표시 (선택)
- [ ] 활동 피드 구현 (선택)

---

## Phase 5: 테스트 및 품질 보증

### 22. 단위 테스트
- [ ] Jest 또는 Vitest 설정
- [ ] `addCard()` 함수 테스트
- [ ] `deleteCard()` 함수 테스트
- [ ] `updateCard()` 함수 테스트
- [ ] `saveToStorage()` 함수 테스트
- [ ] `loadFromStorage()` 함수 테스트
- [ ] `validateCards()` 함수 테스트
- [ ] 테스트 커버리지 80% 이상 달성

### 23. 통합 테스트
- [ ] Playwright 또는 Cypress 설정
- [ ] 카드 추가 플로우 테스트
- [ ] 카드 이동 (드래그 앤 드롭) 테스트
- [ ] 카드 삭제 플로우 테스트
- [ ] 모달 열기/닫기 테스트
- [ ] LocalStorage 저장/불러오기 테스트
- [ ] 반응형 디자인 테스트 (다양한 화면 크기)

### 24. 접근성 테스트
- [ ] WAVE 도구로 접근성 검사
- [ ] axe DevTools로 ARIA 검증
- [ ] 키보드만으로 모든 기능 사용 가능한지 확인
- [ ] 스크린 리더 테스트 (NVDA, VoiceOver)
- [ ] 색상 대비 검사 (WCAG 2.1 AA)
- [ ] 접근성 이슈 수정

### 25. 성능 테스트
- [ ] Lighthouse 성능 감사 실행
- [ ] 100개 카드 렌더링 성능 측정
- [ ] 드래그 앤 드롭 응답 시간 측정
- [ ] 메모리 누수 확인 (Chrome DevTools)
- [ ] 네트워크 요청 최적화
- [ ] 이미지/에셋 최적화

### 26. 브라우저 호환성 테스트
- [ ] Chrome 최신 버전 테스트
- [ ] Firefox 최신 버전 테스트
- [ ] Safari 최신 버전 테스트
- [ ] Edge 최신 버전 테스트
- [ ] iOS Safari 테스트
- [ ] Chrome Mobile 테스트
- [ ] 호환성 이슈 수정

---

## Phase 6: 배포 및 운영

### 27. 프로덕션 빌드
- [ ] HTML/CSS/JS 파일 minify
- [ ] 이미지 최적화 (WebP, 압축)
- [ ] CSS 중복 제거
- [ ] 사용하지 않는 코드 제거
- [ ] 소스맵 생성 (디버깅용)

### 28. 정적 호스팅 배포
- [ ] GitHub Pages 설정
- [ ] Netlify 또는 Vercel 연결
- [ ] 커스텀 도메인 설정 (선택)
- [ ] HTTPS 설정 확인
- [ ] robots.txt 및 sitemap.xml 추가

### 29. CI/CD 파이프라인
- [ ] GitHub Actions 워크플로우 설정
- [ ] 푸시 시 자동 테스트 실행
- [ ] 테스트 통과 시 자동 배포
- [ ] 배포 실패 시 알림 설정
- [ ] 프로덕션 배포 승인 단계 추가

### 30. 모니터링 및 로깅
- [ ] Sentry 에러 추적 설정
- [ ] Google Analytics 설정
- [ ] 사용자 행동 이벤트 추적
- [ ] 성능 모니터링 (Web Vitals)
- [ ] 에러 알림 설정 (Slack, Email)

### 31. 문서화
- [ ] README.md 작성
  - [ ] 프로젝트 소개
  - [ ] 기능 목록
  - [ ] 설치 방법
  - [ ] 사용 방법
  - [ ] 스크린샷
- [ ] CONTRIBUTING.md 작성 (오픈소스 시)
- [ ] LICENSE 파일 추가
- [ ] 코드 주석 추가
- [ ] API 문서 작성 (백엔드 연동 시)

---

## Phase 7: 유지보수 및 개선

### 32. 버그 수정
- [ ] 사용자 피드백 수집
- [ ] 버그 이슈 트래킹 (GitHub Issues)
- [ ] 우선순위별 버그 수정
- [ ] 회귀 테스트 실행
- [ ] 패치 버전 배포

### 33. 기능 개선
- [ ] 사용자 요청 기능 검토
- [ ] 기능 우선순위 결정
- [ ] 새 기능 설계 및 구현
- [ ] 베타 테스트 실행
- [ ] 마이너 버전 배포

### 34. 성능 최적화
- [ ] 코드 프로파일링
- [ ] 불필요한 렌더링 제거
- [ ] 이벤트 위임 적용
- [ ] 가상 스크롤링 구현 (카드 많을 때)
- [ ] 이미지 레이지 로딩
- [ ] 번들 크기 최적화

### 35. 리팩토링
- [ ] 코드 스멜 제거
- [ ] 중복 코드 제거
- [ ] 함수 분리 및 모듈화
- [ ] 네이밍 개선
- [ ] TypeScript 마이그레이션 고려
- [ ] 컴포넌트 기반 아키텍처로 전환 (React/Vue)

---

## 진행 상황 요약

### 완료된 작업
- ✅ Phase 1: MVP 구현 (100%)
  - 기본 HTML/CSS/JS 구조
  - 카드 CRUD 기능
  - 드래그 앤 드롭
  - 반응형 디자인
- ✅ 멀티유저 대비 문서 작성 (11개 문서)
- ✅ Phase 2: 데이터 지속성 및 멀티유저 대비 (100%)
  - 익명 사용자 ID 관리 (UUID)
  - LocalStorage 사용자별 격리
  - 데이터 접근 제어
  - 자동 저장/불러오기
  - 데이터 내보내기/가져오기
  - XSS 보안 강화

### 진행 중인 작업
- 🔄 없음 (Phase 2 완료!)

### 예정된 작업
- ⏳ Phase 3: 고급 기능
- ⏳ Phase 4: Supabase 인증 및 동기화
- ⏳ Phase 5: 실시간 협업 및 공유
- ⏳ Phase 6: 테스트 및 품질 보증
- ⏳ Phase 7: 배포 및 운영
- ⏳ Phase 8: 유지보수 및 개선

---

## 작업 우선순위

### P0 (긴급 - 즉시 수행)
- Phase 2: 사용자 ID 관리 (멀티유저 대비)
- Phase 2: LocalStorage 사용자별 격리
- Phase 6: 브라우저 호환성 테스트

### P1 (높음 - 1-2주 내)
- Phase 2: 카드 수정 기능
- Phase 2: 데이터 접근 제어
- Phase 3: 키보드 네비게이션
- Phase 6: 접근성 테스트

### P2 (중간 - 1개월 내)
- Phase 3: 검색 및 필터링
- Phase 3: 다크 모드
- Phase 4: Supabase Auth 연동
- Phase 6: 성능 테스트

### P3 (낮음 - 장기)
- Phase 4: 다중 보드 지원
- Phase 5: 실시간 협업
- Phase 5: 보드 공유
- Phase 8: TypeScript 마이그레이션

---

## AI Agent 작업 지침

### 작업 순서
1. 체크되지 않은 작업 중 가장 우선순위가 높은 것부터 시작
2. 각 작업 완료 후 체크박스 업데이트 (`[ ]` → `[x]`)
3. 관련 파일 수정 및 커밋
4. 다음 작업으로 진행

### 작업 시 주의사항
- 기존 코드와 일관성 유지 (코딩 컨벤션 준수)
- 각 기능 구현 후 반드시 테스트
- 코드 주석 최소화 (명확한 네이밍으로 대체)
- 에러 처리 및 엣지 케이스 고려
- 성능 및 접근성 항상 고려

### 완료 기준
- 기능이 정상 동작함
- 브라우저 콘솔에 에러 없음
- 코드가 컨벤션을 따름
- 관련 테스트 통과 (Phase 5 이후)

---

## 참고 링크
- [프로젝트 PLAN.md](./PLAN.md)
- [PRD 문서](./PRD.md)
- [TRD 문서](./TRD.md)
- [코딩 컨벤션](./CONVENTIONS.md)
- [디자인 시스템](./DESIGN_SYSTEM.md)
