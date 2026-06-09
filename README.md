# 먹BTI — 식습관 유형 검사 서비스

> 20개의 질문으로 나의 식습관 성격을 분석하는 바이럴 웹 서비스.  
> MBTI 포맷을 차용한 4축 이분법 모델로 16가지 유형을 도출합니다.

**[→ 라이브 데모](https://meokbti.vercel.app)**

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 언어 | TypeScript 6 (strict) |
| UI | React 19 + Tailwind CSS v3 |
| 라우팅 | React Router v7 |
| 번들러 | Vite 8 |
| 테스트 | Vitest + React Testing Library + Playwright |
| 배포 | Vercel (CI/CD 자동화) |

---

## 아키텍처

```
src/
├── types.ts               # 도메인 타입 정의 (Axis, AxisScores, TypeDefinition…)
├── data/
│   ├── questions.ts       # 20문항 × 4축 데이터
│   └── typeDefinitions.ts # 16가지 유형 정의 (이름·설명·궁합·충돌)
├── utils/
│   ├── scoring.ts         # 점수 계산 / 타입 코드 도출 순수 함수
│   └── url.ts             # 결과 URL 인코딩·디코딩
├── components/
│   ├── QuestionCard       # 질문 카드 UI
│   ├── ProgressBar        # 진행 표시기
│   ├── ResultChart        # 4축 점수 시각화 (CSS 바)
│   └── ShareButton        # Web Share API / Clipboard 공유
└── pages/
    ├── Home               # 랜딩
    ├── Quiz               # 퀴즈 플로우
    └── Result             # 결과 표시
```

**관심사 분리 원칙을 엄격하게 적용했습니다.**  
비즈니스 로직(`scoring.ts`, `url.ts`)은 React에 전혀 의존하지 않는 순수 함수로 분리되어 단독 테스트가 가능합니다.

---

## 핵심 설계 결정

### 1. URL-first 결과 공유

결과 데이터를 서버가 아닌 URL 쿼리 파라미터에 인코딩합니다.

```
/result?type=GJEH&s=80-70-65-55
```

- 백엔드 없이 결과를 영구 공유할 수 있습니다.
- 클라이언트가 URL을 파싱해 즉시 결과를 렌더링하며, 잘못된 파라미터는 에러 뷰로 graceful하게 처리합니다.
- `decodeResultFromUrl`은 형식·범위·타입 유효성을 모두 검증합니다.

### 2. 4축 이분법 스코어링 모델

```
G/P  (미식 vs 실용)
J/S  (계획 vs 즉흥)
E/R  (탐험 vs 단골)
H/M  (자극 vs 순한)
```

각 축별 A 선택 비율(0–100)을 계산해 50 기준으로 문자를 결정합니다.  
모든 계산은 `calculateScores` → `scoresToTypeCode` 파이프라인으로 처리하며, 제로 나눗셈을 명시적으로 방어합니다.

### 3. 더블클릭 가드 — ref 기반 멱등성 보장

React의 상태 업데이트는 비동기이므로, 빠른 연속 클릭이 같은 질문을 여러 번 처리할 수 있습니다.  
`useRef`로 "이미 처리한 질문 ID"를 추적해 멱등성을 보장합니다.

```ts
const answeredRef = useRef<number | null>(null)

function handleAnswer(questionId: number, answer: 'A' | 'B') {
  if (answeredRef.current === questionId) return  // 동일 질문 중복 처리 차단
  answeredRef.current = questionId
  // …
}
```

boolean 플래그보다 견고합니다 — 다음 질문의 ID가 다르므로 별도 reset 로직이 불필요합니다.

### 4. Web Share API 우선 + Clipboard 폴백

```ts
if (navigator.share) {
  navigator.share({ title, text, url }).catch(() => {})
} else {
  navigator.clipboard.writeText(url)
}
```

모바일 네이티브 공유 시트를 최대한 활용하고, 지원하지 않는 환경에서는 클립보드로 폴백합니다.

---

## 테스트 전략

**TDD(Test-Driven Development)로 전 기능 개발** — 48개 테스트, 10개 테스트 파일.

```
Test Files  10 passed (10)
Tests       48 passed (48)
```

| 레이어 | 테스트 대상 | 전략 |
|--------|-------------|------|
| 유틸 | `scoring.ts`, `url.ts` | 순수 함수 단위 테스트, 경계값 포함 |
| 컴포넌트 | QuestionCard, ProgressBar, ResultChart, ShareButton | RTL + 사용자 인터랙션 |
| 페이지 | Home, Quiz, Result | MemoryRouter + navigate 모킹 |
| 통합 | 퀴즈 완주 플로우, URL 파싱, 더블클릭 가드 | `act()` 배칭으로 경쟁 조건 재현 |

주요 테스트 케이스:

- 모든 A → `GJEH`, 모든 B → `PSRM` 타입 코드 검증
- URL 파라미터 음수·범위 초과·형식 오류 → null 반환
- `navigator.share` 지원/미지원 환경 분기
- `act()` 내 3회 연속 클릭 → 정확히 1문제 진행 (더블클릭 가드 통합 테스트)

---

## 로컬 실행

```bash
# 설치
npm install

# 개발 서버
npm run dev

# 테스트
npm test

# 프로덕션 빌드
npm run build
```

---

## 프로젝트 배경

MBTI 심리 유형 검사의 형식을 식습관 도메인에 적용한 바이럴 서비스입니다.  
단순한 토이 프로젝트처럼 보이지만, **백엔드 없이 순수 정적 앱으로 결과 공유까지 해결하는 URL-first 설계**, **TDD 기반 개발 프로세스**, **컴포넌트 / 유틸 / 데이터 레이어의 명확한 관심사 분리**에 집중했습니다.

---

## 라이선스

MIT
