# 물어봐이브 (Mureo-Vibe)

일상의 사소한 고민부터 창의적인 아이디어까지, 무엇이든 물어보면 AI가 재치있게 답해주는 인터랙티브 웹 앱

## 🚀 프로젝트 시작하기

## 🌐 Netlify 배포

### 1. 자동 배포 설정
이 프로젝트는 Netlify 배포를 위한 완벽한 설정이 포함되어 있습니다:

- **`netlify.toml`**: 빌드 설정, 리다이렉트, 헤더 설정
- **`public/_redirects`**: SPA 라우팅을 위한 fallback
- **`public/404.html`**: 정적 404 페이지
- **`src/pages/NotFound.jsx`**: React 404 컴포넌트

### 2. SEO 최적화
구글 검색 노출을 위한 완벽한 SEO 설정:

- **`public/robots.txt`**: 검색엔진 크롤러 가이드
- **`public/sitemap.xml`**: 사이트 구조 정보
- **`public/hamster-og.png`**: 소셜미디어 공유 이미지 (1200x630)
- **메타태그**: Open Graph, Twitter Card, 구조화된 데이터
- **도메인**: https://myham.netlify.app/

### 3. 배포 방법
1. GitHub에 코드 푸시
2. Netlify에서 "New site from Git" 선택
3. 저장소 연결
4. 빌드 설정은 `netlify.toml`에서 자동으로 인식됨:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node.js version: `20`

### 4. 환경변수 설정 (Netlify)
Netlify 대시보드에서 다음 환경변수를 설정하세요:
- `VITE_GEMINI_API_KEY`: Gemini API 키
- `VITE_GEMINI_API_URL`: Gemini API URL

## 🚀 프로젝트 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
프로젝트 루트에 `..local` 파일을 생성하고 다음 내용을 추가하세요:

```
# Gemini API Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com

# ironment
NODE_=development
```

**Gemini API 키 발급 방법:**
1. [Google AI Studio](https://aistudio.google.com/)에 접속
2. Google 계정으로 로그인
3. "Get API key" 버튼 클릭
4. 새 API 키 생성 또는 기존 키 사용
5. 생성된 키를 `VITE_GEMINI_API_KEY`에 설정

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 코드 포맷팅
```bash
npm run format
```

## 📁 프로젝트 구조 (FSD)

```
src/
├── app/           # 애플리케이션 레이어 (라우팅, 초기화)
├── pages/         # 페이지 레이어
│   └── home/      # 홈 페이지
├── widgets/       # 위젯 레이어
│   └── question-form/  # 질문 폼 위젯
├── features/      # 기능 레이어
│   ├── question-input/ # 질문 입력 기능 (validation 포함)
│   └── ai-answer/      # AI 답변 생성 기능 (Gemini API 연동)
├── entities/      # 비즈니스 엔티티
└── shared/        # 공유 레이어
    ├── ui/        # 공통 UI 컴포넌트
    └── api/       # 공통 API 유틸리티
```

## 🛠 기술 스택

- **Frontend**: React 19 + Vite
- **AI API**: Google Gemini API (gemini-2.0-flash-exp)
- **State Management**: React Hooks (useState, useCallback)
- **Styling**: CSS with Glassmorphism
- **Code Quality**: Prettier, ESLint
- **Deployment**: Netlify

## 📋 주요 기능

- **질문 입력**: 텍스트 영역 + 실시간 validation
- **AI 답변 생성**: Gemini API 연동으로 재치있는 답변 생성
- **상태 관리**: 로딩, 에러, 성공 상태 관리
- **사용자 경험**: 키보드 단축키, 복사 기능, 새 질문 기능
- **에러 처리**: API 오류, 네트워크 오류 등 다양한 에러 상황 처리

## 🔧 개발 명령어

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드 결과 미리보기
- `npm run format` - 코드 포맷팅
- `npm run format:check` - 포맷팅 검사
- `npm run lint` - 코드 린팅

## 🌟 Gemini API 특징

- **모델**: gemini-2.0-flash-exp (빠른 응답)
- **프롬프트**: 물어봐이브 스타일의 재치있고 친근한 답변
- **에러 처리**: API 키, 할당량, 네트워크 오류 등 다양한 상황 대응
- **사용자 경험**: 로딩 상태, 에러 메시지, 재시도 기능

## 🚨 주의사항

- `..local` 파일은 `.gitignore`에 추가되어 있어 Git에 커밋되지 않습니다
- Gemini API 키는 절대 공개 저장소에 노출하지 마세요
- API 사용량과 비용을 모니터링하세요
