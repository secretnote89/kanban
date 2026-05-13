# 사용 가이드: 칸반 보드

## 🎯 Phase 2 구현 완료!

이 칸반 보드는 **멀티유저 대비 구조**로 구현되었습니다.
- ✅ 익명 사용자 ID 자동 생성
- ✅ LocalStorage 사용자별 데이터 격리
- ✅ 데이터 내보내기/가져오기
- ✅ XSS 보안 강화

## 🚀 시작하기

### 1. 파일 열기
```bash
# 방법 1: 직접 열기
open kanban.html

# 방법 2: 로컬 서버
python3 -m http.server 8000
# http://localhost:8000/kanban.html
```

### 2. 첫 실행 시
- 자동으로 익명 사용자 ID 생성 (예: `anonymous-abc123...`)
- 4개의 샘플 카드 자동 로드
- LocalStorage에 자동 저장

## 📋 주요 기능

### 1️⃣ 카드 관리

#### 카드 추가
1. 각 컬럼의 **"+ 카드 추가"** 버튼 클릭
2. 모달 창에 제목 입력 (1-200자)
3. **Enter** 키 또는 **"추가"** 버튼 클릭
4. 자동으로 LocalStorage에 저장

#### 카드 이동
1. 카드를 **마우스로 드래그**
2. 원하는 컬럼으로 이동
3. 드롭하면 자동 저장

#### 카드 삭제
1. 카드의 **"삭제"** 버튼 클릭
2. 확인 다이얼로그에서 **확인**
3. 자동으로 LocalStorage에서 제거

### 2️⃣ 데이터 관리

#### 💾 데이터 내보내기
1. 하단의 **"💾 데이터 내보내기"** 버튼 클릭
2. JSON 파일 자동 다운로드 (`kanban-backup-[timestamp].json`)
3. 백업 파일은 안전한 곳에 보관

**내보낸 파일 내용**:
```json
{
  "version": "1.0.0",
  "exportedAt": "2026-05-13T...",
  "userId": "anonymous-abc123...",
  "boardId": "default",
  "totalCards": 4,
  "cards": [...]
}
```

#### 📂 데이터 가져오기
1. 하단의 **"📂 데이터 가져오기"** 버튼 클릭
2. 이전에 내보낸 JSON 파일 선택
3. 확인 다이얼로그에서 **확인**
4. 기존 데이터가 삭제되고 새 데이터로 교체
5. **주의**: 가져온 카드는 현재 사용자 ID로 자동 변경

#### 🗑️ 데이터 초기화
1. 하단의 **"🗑️ 데이터 초기화"** 버튼 클릭
2. 확인 다이얼로그에서 **확인**
3. **모든 카드 삭제** (복구 불가)
4. LocalStorage 초기화

## 🔐 사용자 ID 시스템

### 익명 사용자 ID
- 첫 방문 시 자동 생성: `anonymous-[UUID]`
- 예: `anonymous-a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- LocalStorage에 영구 저장: `kanban-current-user`

### 사용자 ID 확인
- 화면 우측 상단에 짧은 ID 표시 (마지막 8자)
- 마우스 오버 시 전체 ID 툴팁 표시

### 사용자별 데이터 격리
```javascript
// LocalStorage 키 구조
{
  "kanban-current-user": "anonymous-abc123...",
  "kanban-anonymous-abc123...-default": "[{카드 데이터}]"
}
```

## 💡 실전 사용 시나리오

### 시나리오 1: 일일 작업 관리
```
아침:
1. 칸반 보드 열기
2. 오늘 할 일 3개 To-Do에 추가
3. 첫 번째 작업 In Progress로 이동

점심:
4. 완료된 작업 Done으로 이동
5. 새로운 긴급 작업 추가

저녁:
6. 오늘 완료한 작업 확인
7. 내일 할 일 미리 추가
```

### 시나리오 2: 프로젝트 관리
```
초기 설정:
1. 프로젝트 작업 전체 To-Do에 추가
2. 우선순위 높은 것부터 배치

진행 중:
3. 작업 시작 시 In Progress로 이동
4. 완료 시 Done으로 이동
5. 주기적으로 데이터 내보내기 (백업)

완료 후:
6. Done 카드 삭제 또는 보관
7. 새 프로젝트 시작 시 데이터 초기화
```

### 시나리오 3: 데이터 이전
```
기존 브라우저:
1. 💾 데이터 내보내기
2. JSON 파일 다운로드

새 브라우저/컴퓨터:
3. 칸반 보드 접속
4. 📂 데이터 가져오기
5. JSON 파일 선택
6. 모든 카드 복원 완료!
```

## 🛡️ 보안 및 개인정보

### 데이터 저장 위치
- **로컬 브라우저만**: 서버 전송 없음
- **LocalStorage**: 브라우저 저장소에 암호화되지 않은 텍스트로 저장
- **개인정보 주의**: 민감한 정보는 카드에 입력하지 마세요

### XSS 방지
- 카드 제목은 `textContent`로 안전하게 렌더링
- `innerHTML` 사용하지 않음

### 데이터 손실 방지
- 모든 작업 자동 저장
- 주기적으로 데이터 내보내기 권장
- LocalStorage 용량 제한: ~5MB

## 🐛 문제 해결

### Q: 카드가 저장되지 않아요
**A**: 
1. 브라우저 LocalStorage 확인
2. 개발자 도구 > Application > Local Storage
3. `kanban-` 시작 키 확인
4. 용량 초과 시 오래된 카드 삭제

### Q: 데이터가 사라졌어요
**A**:
1. 브라우저 쿠키/캐시 삭제 시 LocalStorage도 삭제됨
2. 시크릿 모드는 데이터 저장 안 됨
3. 백업 파일이 있다면 가져오기로 복원

### Q: 사용자 ID를 변경하고 싶어요
**A**:
1. 개발자 도구 > Console
2. `localStorage.removeItem('kanban-current-user')`
3. 페이지 새로고침
4. 새 ID 자동 생성

### Q: 여러 사용자가 같은 컴퓨터를 사용해요
**A**:
- Phase 2는 브라우저별 1개 사용자만 지원
- 각자 다른 브라우저 또는 시크릿 모드 사용
- Phase 3(Supabase 인증)에서 로그인/로그아웃 지원 예정

## 📊 LocalStorage 관리

### 용량 확인
```javascript
// 개발자 도구 Console에서
function getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    return (total / 1024).toFixed(2) + ' KB';
}

getStorageSize();
// 출력: "2.5 KB"
```

### 데이터 확인
```javascript
// 현재 사용자 ID
localStorage.getItem('kanban-current-user');

// 카드 데이터
const userId = localStorage.getItem('kanban-current-user');
const cards = JSON.parse(localStorage.getItem(`kanban-${userId}-default`));
console.log(cards);
```

## 🔜 향후 기능 (Phase 3+)

### Supabase 인증 연동
- ✅ 이메일/비밀번호 로그인
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ 익명 데이터 자동 마이그레이션

### 다중 보드
- 프로젝트별 보드 생성
- 보드 간 전환
- 보드 공유 (Phase 4)

### 실시간 협업 (Phase 4)
- 팀원 초대
- 실시간 업데이트
- 멤버별 권한 관리

## 📞 지원

문제가 있거나 제안사항이 있으면:
1. GitHub Issues에 등록
2. 개발자에게 문의
3. 문서 확인: [README.md](./README.md)

---

**즐거운 작업 관리 되세요!** 🎉
