# Supabase 설정 가이드

## 1. 데이터베이스 스키마 생성

### 방법 1: Supabase Dashboard (추천)

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택: `uuoujtaguxoaircmzjxu`
3. 왼쪽 메뉴에서 **SQL Editor** 선택
4. **New Query** 버튼 클릭
5. `supabase-schema.sql` 파일 내용을 복사하여 붙여넣기
6. **Run** 버튼 클릭
7. 성공 메시지 확인: `Schema created successfully!`

### 방법 2: CLI (선택)

```bash
# Supabase CLI 설치
npm install -g supabase

# 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref uuoujtaguxoaircmzjxu

# 스키마 적용
supabase db push
```

## 2. OAuth 설정

### Google OAuth

1. **Google Cloud Console** (https://console.cloud.google.com)
   - 프로젝트 생성 또는 선택
   - **APIs & Services > Credentials** 이동
   - **Create Credentials > OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs 추가:
     ```
     https://uuoujtaguxoaircmzjxu.supabase.co/auth/v1/callback
     ```
   - Client ID와 Client Secret 복사

2. **Supabase Dashboard**
   - **Authentication > Providers** 이동
   - **Google** 활성화
   - Client ID와 Client Secret 입력
   - **Save** 클릭

### GitHub OAuth

1. **GitHub Settings** (https://github.com/settings/developers)
   - **OAuth Apps > New OAuth App**
   - Application name: `Kanban Board`
   - Homepage URL: `https://secretnote89.github.io/kanban/`
   - Authorization callback URL:
     ```
     https://uuoujtaguxoaircmzjxu.supabase.co/auth/v1/callback
     ```
   - **Register application**
   - Client ID와 Client Secret 복사

2. **Supabase Dashboard**
   - **Authentication > Providers** 이동
   - **GitHub** 활성화
   - Client ID와 Client Secret 입력
   - **Save** 클릭

## 3. URL Configuration 설정

### Site URL (중요!)

1. **Supabase Dashboard**
2. **Settings > Authentication > General settings**
3. **Site URL** 설정:
   ```
   https://secretnote89.github.io/kanban/
   ```
4. **Redirect URLs** 추가:
   ```
   https://secretnote89.github.io/kanban/app.html
   https://secretnote89.github.io/kanban/index.html
   http://localhost:8000/app.html  (로컬 테스트용)
   ```

## 4. Email Templates (선택)

이메일 확인이 필요한 경우:

1. **Authentication > Email Templates**
2. **Confirm signup** 템플릿 수정:
   ```html
   <h2>이메일 확인</h2>
   <p>아래 링크를 클릭하여 회원가입을 완료하세요:</p>
   <a href="{{ .ConfirmationURL }}">이메일 확인하기</a>
   ```

## 5. 테이블 확인

SQL Editor에서 확인:

```sql
-- 테이블 구조 확인
SELECT * FROM public.cards LIMIT 0;

-- RLS 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'cards';

-- 인덱스 확인
SELECT * FROM pg_indexes WHERE tablename = 'cards';
```

## 6. 문제 해결

### OAuth 리다이렉트 오류

**증상**: OAuth 로그인 후 `redirect_uri_mismatch` 오류

**해결**:
1. Google/GitHub OAuth 설정에서 Redirect URI 재확인
2. Supabase의 **Redirect URLs**에 정확한 URL 추가
3. 대소문자, 슬래시(/) 주의

### RLS 정책 오류

**증상**: `new row violates row-level security policy`

**해결**:
1. SQL Editor에서 RLS 정책 재확인:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'cards';
   ```
2. 정책이 없으면 `supabase-schema.sql` 재실행

### 이메일 확인 필요 설정

개발 중 이메일 확인 건너뛰기:

1. **Authentication > Settings**
2. **Email Confirmation** 비활성화 (개발 환경만)
3. 배포 시 다시 활성화 권장

## 7. 로컬 테스트

```bash
# HTTP 서버 실행
cd ~/work/kosa-vibecoding-2026-1st/src/exercise/secretnote89/day03
python3 -m http.server 8000

# 브라우저에서 열기
open http://localhost:8000/index.html
```

## 8. 배포 후 확인사항

✅ Google OAuth 로그인 테스트  
✅ GitHub OAuth 로그인 테스트  
✅ 이메일/비밀번호 회원가입 테스트  
✅ 카드 CRUD 동작 확인  
✅ 다른 사용자 데이터 격리 확인  
✅ 익명 데이터 마이그레이션 확인

## 9. 유용한 SQL 쿼리

```sql
-- 전체 카드 개수
SELECT COUNT(*) FROM public.cards;

-- 사용자별 카드 개수
SELECT user_id, COUNT(*) as card_count 
FROM public.cards 
GROUP BY user_id;

-- 최근 생성된 카드
SELECT * FROM public.cards 
ORDER BY created_at DESC 
LIMIT 10;

-- 특정 사용자의 카드
SELECT * FROM public.cards 
WHERE user_id = 'your-user-id-here';

-- 테이블 초기화 (주의!)
TRUNCATE TABLE public.cards RESTART IDENTITY CASCADE;
```

## 10. 보안 체크리스트

✅ RLS (Row Level Security) 활성화됨  
✅ 모든 CRUD 작업에 RLS 정책 설정됨  
✅ anon key는 공개 가능 (읽기만 가능)  
✅ service_role key는 절대 노출 금지  
✅ HTTPS 사용 (GitHub Pages 자동)  
✅ OAuth Redirect URI 화이트리스트 설정

---

**문제가 발생하면**: 
1. Supabase Dashboard > Logs에서 에러 확인
2. 브라우저 개발자 도구 Console 확인
3. [Supabase 문서](https://supabase.com/docs) 참고
