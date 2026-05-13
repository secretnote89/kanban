# User Flow: 칸반 보드 애플리케이션

## 1. 전체 사용자 여정 개요

```mermaid
graph TD
    A[사용자 접속] --> B[칸반 보드 화면 로딩]
    B --> C{원하는 작업 선택}
    C --> D[카드 추가]
    C --> E[카드 이동]
    C --> F[카드 삭제]
    C --> G[카드 조회]
    D --> C
    E --> C
    F --> C
    G --> C
```

## 2. 상세 사용자 플로우

### 2.1 초기 진입 플로우

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant HTML
    participant CSS
    participant JS
    
    User->>Browser: kanban.html 접속
    Browser->>HTML: HTML 파싱
    Browser->>CSS: 스타일 로드
    Browser->>JS: JavaScript 실행
    JS->>JS: window.onload 실행
    JS->>JS: 샘플 카드 생성
    JS->>HTML: 카드 렌더링
    HTML-->>User: 칸반 보드 화면 표시
```

### 2.2 카드 추가 플로우

```mermaid
flowchart TD
    Start([사용자가 카드 추가 원함]) --> A1[컬럼의 '+ 카드 추가' 버튼 클릭]
    A1 --> A2[모달 창 열림]
    A2 --> A3{카드 제목 입력}
    
    A3 --> A4[제목 입력]
    A4 --> A5{Enter 키 또는 '추가' 버튼}
    
    A5 --> A6{제목이 비어있는가?}
    A6 -->|Yes| A7[경고 메시지 표시]
    A7 --> A3
    
    A6 -->|No| A8[카드 객체 생성]
    A8 --> A9[cards 배열에 추가]
    A9 --> A10[DOM에 카드 렌더링]
    A10 --> A11[컬럼 카드 개수 업데이트]
    A11 --> A12[모달 창 닫기]
    A12 --> End([카드 추가 완료])
    
    A3 --> A13['취소' 버튼 클릭]
    A13 --> A14[모달 창 닫기]
    A14 --> End
    
    A3 --> A15[모달 외부 클릭]
    A15 --> A14
```

### 2.3 카드 이동 플로우 (드래그 앤 드롭)

```mermaid
flowchart TD
    Start([사용자가 카드 이동 원함]) --> B1[카드에 마우스 오버]
    B1 --> B2[카드를 클릭하고 드래그 시작]
    B2 --> B3[dragstart 이벤트 발생]
    B3 --> B4[카드에 .dragging 클래스 추가]
    B4 --> B5[카드 스타일 변경: 투명도 50%, 5도 회전]
    
    B5 --> B6[다른 컬럼 위로 드래그]
    B6 --> B7[dragenter 이벤트 발생]
    B7 --> B8[드롭 영역 하이라이트: 배경색 변경, 점선 테두리]
    
    B8 --> B9[dragover 이벤트 지속]
    B9 --> B10{마우스 버튼 놓음}
    
    B10 -->|컬럼 내부에서| B11[drop 이벤트 발생]
    B10 -->|컬럼 외부에서| B17[dragend 이벤트 발생]
    
    B11 --> B12[카드 상태 업데이트: status 변경]
    B12 --> B13[카드 DOM 이동: appendChild]
    B13 --> B14[모든 컬럼 카드 개수 업데이트]
    B14 --> B15[하이라이트 제거]
    B15 --> B16[.dragging 클래스 제거]
    B16 --> End([카드 이동 완료])
    
    B17 --> B18[원래 위치로 복귀]
    B18 --> B19[하이라이트 제거]
    B19 --> B16
```

### 2.4 카드 삭제 플로우

```mermaid
flowchart TD
    Start([사용자가 카드 삭제 원함]) --> C1[카드의 '삭제' 버튼 클릭]
    C1 --> C2[확인 다이얼로그 표시]
    C2 --> C3{사용자 응답}
    
    C3 -->|확인| C4[cards 배열에서 카드 제거: filter]
    C3 -->|취소| C9[다이얼로그 닫기]
    
    C4 --> C5[DOM에서 카드 요소 제거: remove]
    C5 --> C6[컬럼 카드 개수 업데이트]
    C6 --> C7[삭제 완료 피드백]
    C7 --> End([카드 삭제 완료])
    
    C9 --> End2([삭제 취소됨])
```

### 2.5 모달 인터랙션 플로우

```mermaid
stateDiagram-v2
    [*] --> ModalClosed: 초기 상태
    
    ModalClosed --> ModalOpen: '+ 카드 추가' 버튼 클릭
    ModalOpen --> ModalClosed: '추가' 버튼 클릭 (제목 유효)
    ModalOpen --> ModalOpen: '추가' 버튼 클릭 (제목 비어있음)
    ModalOpen --> ModalClosed: '취소' 버튼 클릭
    ModalOpen --> ModalClosed: 모달 외부 클릭
    ModalOpen --> ModalClosed: Enter 키 (제목 유효)
    
    ModalOpen: 모달 열림
    note right of ModalOpen
        - 입력 필드 포커스
        - 배경 어두워짐
        - 키보드 입력 대기
    end note
    
    ModalClosed: 모달 닫힘
    note right of ModalClosed
        - 입력 필드 초기화
        - 배경 복원
    end note
```

## 3. 컬럼별 카드 상태 전환

```mermaid
stateDiagram-v2
    [*] --> ToDo: 카드 생성 (To-Do 컬럼)
    [*] --> InProgress: 카드 생성 (In Progress 컬럼)
    [*] --> Done: 카드 생성 (Done 컬럼)
    
    ToDo --> InProgress: 드래그 앤 드롭
    ToDo --> Done: 드래그 앤 드롭
    
    InProgress --> ToDo: 드래그 앤 드롭
    InProgress --> Done: 드래그 앤 드롭
    
    Done --> ToDo: 드래그 앤 드롭
    Done --> InProgress: 드래그 앤 드롭
    
    ToDo --> [*]: 카드 삭제
    InProgress --> [*]: 카드 삭제
    Done --> [*]: 카드 삭제
    
    note right of ToDo
        status: 'todo'
        할 일 목록
    end note
    
    note right of InProgress
        status: 'in-progress'
        진행 중인 작업
    end note
    
    note right of Done
        status: 'done'
        완료된 작업
    end note
```

## 4. 이벤트 처리 흐름

```mermaid
flowchart LR
    subgraph User Actions
        UA1[버튼 클릭]
        UA2[드래그 시작]
        UA3[키보드 입력]
        UA4[마우스 이동]
    end
    
    subgraph Event Listeners
        EL1[click]
        EL2[dragstart]
        EL3[keypress]
        EL4[dragover]
        EL5[drop]
        EL6[dragend]
    end
    
    subgraph Event Handlers
        EH1[addCard]
        EH2[deleteCard]
        EH3[handleDragStart]
        EH4[handleDragOver]
        EH5[handleDrop]
        EH6[handleDragEnd]
    end
    
    subgraph State Update
        SU1[Update cards array]
        SU2[Update draggedCard]
        SU3[Update currentColumn]
    end
    
    subgraph DOM Update
        DU1[renderCard]
        DU2[remove element]
        DU3[appendChild]
        DU4[updateCounts]
        DU5[toggle classes]
    end
    
    UA1 --> EL1 --> EH1 --> SU1 --> DU1
    UA1 --> EL1 --> EH2 --> SU1 --> DU2
    UA2 --> EL2 --> EH3 --> SU2 --> DU5
    UA3 --> EL3 --> EH1 --> SU1 --> DU1
    UA4 --> EL4 --> EH4 --> DU5
    UA4 --> EL5 --> EH5 --> SU1 --> DU3 --> DU4
    UA4 --> EL6 --> EH6 --> DU5
```

## 5. 에러 처리 플로우

```mermaid
flowchart TD
    Start([사용자 액션]) --> Check1{입력 검증}
    
    Check1 -->|유효| Action[작업 실행]
    Check1 -->|무효| Error1[에러 메시지 표시]
    
    Action --> Check2{DOM 조작 성공?}
    
    Check2 -->|성공| Success[성공 피드백]
    Check2 -->|실패| Error2[에러 핸들링]
    
    Error1 --> End1([사용자 재시도])
    Error2 --> Rollback[상태 롤백]
    Rollback --> Error3[에러 메시지 표시]
    Error3 --> End1
    
    Success --> End2([작업 완료])
    
    style Error1 fill:#ffcccc
    style Error2 fill:#ffcccc
    style Error3 fill:#ffcccc
    style Success fill:#ccffcc
```

### 5.1 에러 시나리오별 처리

```mermaid
graph TD
    subgraph "빈 제목 입력"
        E1[제목 입력 없이 추가] --> E2[alert 메시지]
        E2 --> E3[입력 필드 포커스 유지]
    end
    
    subgraph "삭제 확인 취소"
        D1[삭제 버튼 클릭] --> D2[확인 다이얼로그]
        D2 --> D3[취소 클릭]
        D3 --> D4[아무 변경 없음]
    end
    
    subgraph "드래그 실패"
        F1[드래그 시작] --> F2[컬럼 외부로 드롭]
        F2 --> F3[원래 위치 유지]
        F3 --> F4[스타일 복원]
    end
    
    style E2 fill:#ffffcc
    style D2 fill:#ffffcc
    style F3 fill:#ccffff
```

## 6. 데이터 흐름 (Phase 2: LocalStorage 추가)

```mermaid
flowchart TD
    subgraph "현재 (Phase 1)"
        P1A[페이지 로드] --> P1B[샘플 카드 생성]
        P1B --> P1C[메모리에 cards 배열]
        P1C --> P1D[DOM 렌더링]
        P1D --> P1E[사용자 인터랙션]
        P1E --> P1C
    end
    
    subgraph "향후 (Phase 2)"
        P2A[페이지 로드] --> P2B{LocalStorage 확인}
        P2B -->|데이터 있음| P2C[데이터 불러오기]
        P2B -->|데이터 없음| P2D[샘플 카드 생성]
        P2C --> P2E[메모리에 cards 배열]
        P2D --> P2E
        P2E --> P2F[DOM 렌더링]
        P2F --> P2G[사용자 인터랙션]
        P2G --> P2E
        P2E --> P2H[LocalStorage 저장]
        P2H --> P2G
    end
```

## 7. 반응형 디자인 플로우

```mermaid
flowchart TD
    Start([페이지 로드]) --> Check[화면 크기 확인]
    
    Check --> Desktop{1024px 이상?}
    Desktop -->|Yes| Layout1[3컬럼 Grid 레이아웃]
    Desktop -->|No| Tablet{768px 이상?}
    
    Tablet -->|Yes| Layout2[3컬럼 축소 레이아웃]
    Tablet -->|No| Layout3[1컬럼 세로 레이아웃]
    
    Layout1 --> Render[렌더링]
    Layout2 --> Render
    Layout3 --> Render
    
    Render --> Resize{화면 크기 변경?}
    Resize -->|Yes| Check
    Resize -->|No| End([유지])
    
    style Layout1 fill:#e6f3ff
    style Layout2 fill:#fff4e6
    style Layout3 fill:#ffe6f0
```

## 8. 키보드 네비게이션 (Phase 2 예정)

```mermaid
stateDiagram-v2
    [*] --> BoardView: 페이지 로드
    
    BoardView --> Modal: '+ 카드 추가' 클릭 또는 N 키
    Modal --> BoardView: ESC 키 또는 외부 클릭
    Modal --> BoardView: Enter 키 (카드 추가)
    
    BoardView --> CardFocus: Tab 키 (카드로 포커스)
    CardFocus --> NextCard: Tab 키 (다음 카드)
    CardFocus --> PrevCard: Shift+Tab (이전 카드)
    CardFocus --> BoardView: ESC 키
    CardFocus --> DeleteConfirm: Delete 키
    
    DeleteConfirm --> CardFocus: N 키 (취소)
    DeleteConfirm --> BoardView: Y 키 (확인)
    
    note right of BoardView
        키보드 단축키:
        - N: 새 카드
        - Tab: 다음 요소
        - Enter: 선택
        - ESC: 닫기
    end note
```

## 9. 사용자 시나리오별 플로우

### 9.1 시나리오 1: 신규 사용자의 첫 사용

```mermaid
journey
    title 신규 사용자의 첫 사용 경험
    section 접속 및 탐색
      칸반 보드 URL 접속: 5: User
      샘플 카드 확인: 4: User
      3개 컬럼 구조 이해: 4: User
    section 첫 카드 생성
      To-Do 컬럼에서 '+ 카드 추가' 클릭: 5: User
      '회의 준비' 입력: 5: User
      Enter 키로 추가: 5: User
    section 카드 이동 시도
      카드를 In Progress로 드래그: 4: User
      카드가 이동됨을 확인: 5: User
    section 완료 처리
      카드를 Done으로 드래그: 5: User
      완료된 작업 확인: 5: User
```

### 9.2 시나리오 2: 일일 작업 관리

```mermaid
journey
    title 일일 작업 관리 플로우
    section 아침: 작업 계획
      페이지 오픈: 5: User
      오늘 할 일 3개 추가: 5: User
      우선순위 확인: 4: User
    section 오전: 작업 시작
      첫 번째 작업 In Progress로 이동: 5: User
      작업 진행: 4: User
      완료 후 Done으로 이동: 5: User
    section 오후: 추가 작업
      두 번째 작업 In Progress로 이동: 5: User
      중간에 새 작업 추가: 4: User
      작업 완료 후 Done으로 이동: 5: User
    section 저녁: 정리
      완료된 작업 확인: 5: User
      내일 할 일 추가: 4: User
```

### 9.3 시나리오 3: 빠른 작업 추가 및 정리

```mermaid
sequenceDiagram
    actor User
    participant Board as 칸반 보드
    participant Modal as 모달
    
    User->>Board: '+ 카드 추가' 클릭 (To-Do)
    Board->>Modal: 모달 열림
    User->>Modal: '이메일 답장' 입력
    User->>Modal: Enter 키
    Modal->>Board: 카드 생성
    Board-->>User: To-Do 컬럼에 카드 표시
    
    User->>Board: '+ 카드 추가' 클릭 (To-Do)
    Board->>Modal: 모달 열림
    User->>Modal: '보고서 작성' 입력
    User->>Modal: Enter 키
    Modal->>Board: 카드 생성
    Board-->>User: To-Do 컬럼에 카드 표시
    
    User->>Board: '이메일 답장' 카드를 Done으로 드래그
    Board-->>User: 카드 이동 완료
    
    User->>Board: '이메일 답장' 카드 삭제 버튼 클릭
    Board->>User: 확인 다이얼로그
    User->>Board: 확인
    Board-->>User: 카드 삭제 완료
```

## 10. 성능 최적화 플로우

```mermaid
flowchart TD
    subgraph "렌더링 최적화"
        R1[카드 추가 요청] --> R2{100개 미만?}
        R2 -->|Yes| R3[일반 렌더링]
        R2 -->|No| R4[가상 스크롤링]
        R3 --> R5[DOM 업데이트]
        R4 --> R5
    end
    
    subgraph "이벤트 최적화"
        E1[드래그 이벤트] --> E2[Throttle 적용]
        E2 --> E3[16ms마다 실행]
        E3 --> E4[부드러운 애니메이션]
    end
    
    subgraph "메모리 최적화"
        M1[카드 삭제] --> M2[배열에서 제거]
        M2 --> M3[DOM 요소 제거]
        M3 --> M4[이벤트 리스너 정리]
    end
    
    R5 --> E1
    E4 --> M1
```

## 11. 요약

이 문서는 칸반 보드 애플리케이션의 모든 사용자 인터랙션 플로우를 Mermaid 다이어그램으로 시각화했습니다.

### 주요 플로우
1. **카드 추가**: 모달 기반 입력 → 검증 → 렌더링
2. **카드 이동**: 드래그 시작 → 시각적 피드백 → 드롭 → 상태 업데이트
3. **카드 삭제**: 확인 다이얼로그 → 배열 및 DOM 업데이트
4. **에러 처리**: 입력 검증 → 에러 메시지 → 재시도

### 향후 개선 (Phase 2+)
- LocalStorage 데이터 지속성
- 키보드 네비게이션
- 성능 최적화 (가상 스크롤링)
- 접근성 개선 (ARIA)
