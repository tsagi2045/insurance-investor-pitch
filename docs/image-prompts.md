# 섹션별 이미지 제안 — 2차 PT 투자 제안 웹사이트

> AI 이미지 생성 도구에 요청할 때 사용하는 가이드
> 디자인 방향: Apple-like minimal, "Simple is the best"

---

## 공통 스타일 가이드

- **배경**: 투명 (PNG, transparent background)
- **톤**: 모노톤 실버/화이트 기반 — 골드 포인트는 아주 미세하게만
- **스타일**: 미니멀 3D 렌더링, 불필요한 장식 없이 오브젝트 하나에 집중
- **질감**: 매트 메탈릭 또는 프로스티드 글래스, 과하지 않은 반사
- **조명**: 단일 소프트 라이트, 강한 그림자 없이 깔끔하게
- **해상도**: 2048×1536 이상 (4:3), 고해상도
- **금지**: 사람, 텍스트, 과도한 이펙트, 화려한 색상

---

## Section 1: WHY — "쓰나미가 오고 있다"

**핵심**: 변화의 불가피성, 거대한 전환의 흐름

### 추천 컨셉: 추상적 파도

하나의 거대하고 유려한 웨이브(파도) 형태. 유체 시뮬레이션 느낌의 매끈한 곡면. 실버/화이트 톤의 반투명 재질, 끝부분에만 미세한 따뜻한 빛(앰버 힌트). 파도의 규모감이 핵심.

**프롬프트**:
```
Minimal 3D abstract wave sculpture, single elegant curved form, frosted glass material with subtle warm amber light at the crest, soft studio lighting, clean composition, transparent PNG background, no text, no people, Apple-style product render quality, 4:3 ratio
```

### 대안: 기울어지는 거대한 블록
매끄러운 직육면체가 기울어지기 직전의 순간. 변화의 임계점을 표현. 매트 실버 재질.

---

## Section 2: HOW — "빈틈을 선점한다"

**핵심**: 전략적 위치 선점, 다른 곳을 보는 시선

### 추천 컨셉: 빈 공간을 채우는 조각

여러 개의 매끄러운 기하학적 블록들 사이에 딱 맞는 하나의 조각이 떠 있는 장면. 빈 공간(gap)과 그걸 채울 조각의 관계가 핵심. 블록들은 매트 다크 톤, 떠있는 조각만 프로스티드 글래스.

**프롬프트**:
```
Minimal 3D geometric blocks arranged with one gap, a single frosted glass piece floating above the empty space about to fit in, matte dark blocks, soft directional lighting, clean composition, transparent PNG background, no text, Apple-style render, 4:3 ratio
```

### 대안: 체스 킹 하나
체스판 없이, 단일 킹 피스만 클로즈업. 매트 실버 재질, 극도로 심플한 구도.

---

## Section 3: WHAT — "실행으로 증명한다"

**핵심**: 구체적 실행, 시작, 전진

### 추천 컨셉: 상승하는 화살표

하나의 심플한 화살표가 위를 향해 상승하는 장면. 기하학적이고 미니멀한 형태. 매트 실버 바디에 끝부분만 미세한 따뜻한 빛. 로켓이 아닌, 추상적 화살표 형태.

**프롬프트**:
```
Minimal 3D abstract upward arrow form, single geometric shape ascending, matte silver material with subtle warm light at the tip, soft studio lighting, clean minimal composition, transparent PNG background, no text, no people, Apple-style product quality, 4:3 ratio
```

### 대안: 3개의 계단
3단의 미니멀한 계단 구조. 각 단이 Phase 1/2/3을 암시. 매트 톤, 장식 없음.

---

## 적용 가이드

| 섹션 | 파일명 | data-image-id |
|------|--------|---------------|
| WHY | `/public/images/why-hero.png` | `why-hero` |
| HOW | `/public/images/how-hero.png` | `how-hero` |
| WHAT | `/public/images/what-hero.png` | `what-hero` |

### 체크리스트
- [ ] 3개 이미지의 렌더링 스타일과 조명이 통일되었는가
- [ ] 색상이 과하지 않고 모노톤 기반인가
- [ ] 투명 배경이 다크 네이비(#060912) 위에서 자연스러운가
- [ ] 하나의 오브젝트에 집중하는 심플한 구도인가
