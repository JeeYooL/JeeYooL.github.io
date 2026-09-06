# 배포 및 수정 안내

## 1. 로컬에서 띄우기

```bash
npm install
npm run dev      # http://localhost:4321
```

Node 20 이상이면 됩니다. `npm run build`로 `dist/`가 만들어집니다.

## 2. GitHub Pages에 올리기 (사용자 사이트)

1. GitHub에서 **`<본인아이디>.github.io`** 이름으로 저장소를 새로 만듭니다.
   이 이름이어야 루트 주소(`https://<본인아이디>.github.io`)로 서비스됩니다.
2. 이 폴더를 그 저장소의 `main` 브랜치로 push 합니다.
   ```bash
   git init
   git add .
   git commit -m "portfolio site"
   git branch -M main
   git remote add origin https://github.com/<본인아이디>/<본인아이디>.github.io.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Build and deployment → Source**를
   **GitHub Actions**로 바꿉니다. (기본값인 "Deploy from a branch"가 아닙니다)
4. 이후 `main`에 push할 때마다 `.github/workflows/deploy.yml`이 자동으로 빌드·배포합니다.
   Actions 탭에서 진행 상황을 볼 수 있고, 보통 1~2분 걸립니다.

`astro.config.mjs`의 `site` 값을 실제 주소로 바꿔 주세요. 지금은
`https://jeeyool.github.io`로 되어 있고, canonical URL에만 쓰입니다.

프로젝트 저장소(`<아이디>.github.io/portfolio`)로 쓰고 싶다면 `astro.config.mjs`에
`base: '/portfolio'`만 추가하면 됩니다. 내부 링크는 전부 `src/data/site.ts`의
`href()`를 거치므로 다른 수정은 필요 없습니다.

## 3. 내용 고치기

전부 `src/content/` 아래 Markdown입니다. 이 폴더를 Obsidian 볼트로 열어서
편집하셔도 됩니다.

| 고칠 것 | 파일 |
| --- | --- |
| **모든 UI 문구·제목·Highlights·Recent·CV 내용** | `src/i18n/ui.ts` (한국어·영어 한 파일) |
| 논문 추가·수정 | `src/content/publications/*.md` — 논문 1편당 1파일. 서지정보는 언어 공통이고 `contribution`(영문)·`contributionKo`(국문) 두 줄만 언어별 |
| 프로젝트 본문 | `src/content/projects/ko/*.md`, `src/content/projects/en/*.md` (파일명이 같아야 언어 전환 시 같은 페이지로 갑니다) |
| 연구 3축 | `src/content/thrusts/ko/*.md`, `src/content/thrusts/en/*.md` |
| 이메일·GitHub·특허번호·최종수정일 | `src/data/site.ts` |
| 색·폰트 | `src/styles/global.css` |

### 언어 구조

한국어가 기본이라 루트(`/`, `/research/`, …)에서 바로 나오고, 영어는 `/en/`
아래에 있습니다. 헤더 오른쪽의 `EN` / `한국어` 버튼을 누르면 **보고 있던 페이지
그대로** 반대 언어로 넘어갑니다.

실제 페이지 코드는 `src/views/*.astro` 하나씩이고, `src/pages/` 밑의 파일들은
언어만 지정하는 두 줄짜리 껍데기입니다. 페이지를 추가하려면 view 하나와
껍데기 둘을 만들면 됩니다.

논문 제목·저자·저널명은 **번역하지 않습니다.** 원문 서지정보 그대로 두는 것이
맞고, 한국어 페이지에서도 영문으로 표기됩니다.

frontmatter는 `src/content/config.ts`에서 스키마 검증을 하므로, 오타가 있으면
빈 칸으로 렌더링되지 않고 빌드가 실패합니다.

## 4. 이미지 넣기

파일은 **`src/assets/`** 에 둡니다. 여기 둔 이미지는 빌드할 때 자동으로
WebP로 바뀌고 화면 크기별로 여러 벌이 만들어집니다. 원본 그대로 서빙해야 하는
파일(이력서 PDF 등)만 `public/`에 두세요.

```
src/assets/
  projects/<프로젝트-슬러그>/*.jpg|png|svg   프로젝트 사진·다이어그램
  publications/*.jpg|png                     논문 graphical abstract
```

프로젝트 슬러그는 `src/content/projects/ko/` 안의 파일명과 같습니다.
예: `mppt-measurement-system.md` → `src/assets/projects/mppt-measurement-system/`

### 순서

1. 파일을 위 폴더에 넣습니다.
2. 휴대폰 사진이면 크기를 줄입니다.
   ```bash
   npm run images            # 무엇이 줄어들지 확인만 (파일은 안 건드림)
   npm run images -- --fix   # 긴 변 2400px로 줄여서 덮어쓰기
   ```
   EXIF 회전 정보도 정리되므로 세로 사진이 눕는 문제도 같이 없어집니다.
3. 해당 프로젝트의 `.md` frontmatter에서 주석을 풉니다. `mppt-measurement-system.md`
   에 예시가 이미 적혀 있습니다.
   ```yaml
   thumbnail: "mppt-measurement-system/board.jpg"     # 목록 카드 썸네일 (3:2로 잘림)
   thumbnailAlt: "MPPT 측정 보드"
   images:                                            # 본문 아래 "자료" 섹션
     - src: "mppt-measurement-system/board.jpg"
       alt: "MPPT 측정 보드"                          # 필수 — 스크린리더가 읽습니다
       caption: "Rev 02 단채널 보드. INA226·MCP4725·LM358 배치."
     - src: "mppt-measurement-system/jig.jpg"
       alt: "2×2 온도 제어 지그"
       caption: "가공 직후 상태."
       wide: true                                     # 2열이 아니라 전체 폭
   ```
4. 한국어·영어 파일에 **같은 `src`** 를 쓰고 `alt`·`caption` 만 각 언어로 씁니다.
5. commit → push. GitHub Actions가 알아서 빌드합니다.

파일명을 틀리면 **빌드가 실패하면서 사용 가능한 파일 목록을 보여줍니다.**
조용히 깨진 이미지로 나가는 일은 없습니다.

### 본문 중간에 넣기

마크다운에 그냥 쓰면 됩니다. 이 경우 파일은 `public/img/` 에 두세요.

```markdown
![회로 블록 다이어그램](/img/mppt-block-diagram.svg)
```

본문 안의 이미지도 클릭하면 똑같이 확대됩니다.
다이어그램은 **SVG를 권합니다** — 용량이 작고 확대해도 깨지지 않습니다.
PowerPoint·Illustrator·draw.io 모두 SVG로 내보낼 수 있습니다.

### 논문 graphical abstract

`src/assets/publications/` 에 넣고 해당 논문 `.md` 에 한 줄 추가합니다.

```yaml
abstractImage: "2022-ethanol.jpg"
```

대표 논문 3편 중 #3(ACS AMI 2026)은 CC BY 4.0이라 출처를 밝히면 그대로 쓸 수
있고, #1·#2는 Springer Nature라 이용 조건을 확인하거나 핵심 도식을 직접 다시
그리셔야 합니다.

### 확대 보기

썸네일을 뺀 모든 이미지는 클릭하면 전체 화면으로 열립니다. Esc나 바깥쪽 클릭,
닫기 버튼으로 닫히고 키보드로도 열 수 있습니다. 확대용으로는 원본이 아니라
1600px WebP를 씁니다 — 원본 5 MB짜리를 그대로 내려받게 하지 않기 위해서입니다.

## 5. 지금 비어 있는 것

- **이력서 PDF** — `public/kwon-cv.pdf`에 넣고 `src/data/site.ts`의
  `links.cvPdf`를 `'/kwon-cv.pdf'`로 바꾸면 Home·CV의 비활성 버튼이 살아납니다.
- **Google Scholar / ORCID** — `src/data/site.ts`의 `links`가 비어 있으면
  해당 링크는 렌더링되지 않습니다.
- **프로젝트 Result 수치** — 채널당 단가, 전류 분해능, 연속 운전 시간,
  스크리닝 hit rate, 예측 오차. 지금은 구리색 이탤릭으로 "pending" 표시가
  나오니 눈에 띕니다.
- **이미지** — MPPT 보드 사진·회로도, 지그 CAD, SDL observability 스크린샷,
  파이프라인 다이어그램 2종, 랩 도구 스크린샷 3장, 대표 논문 graphical
  abstract 3장. 넣는 방법은 위 4장 참고.

## 6. 지시서 대비 달라진 점

- **디자인**: 지시서의 인디고(#2E2A9E) + Archivo 대신, 직전에 확인하신
  petrol(#0E5B54) + copper(#8E4E1D) / Spectral + IBM Plex 조합을 그대로
  가져왔습니다. 구조 원칙(카드 대신 1px 괘선, 액센트 1개 + 신호색 1개,
  본문 74ch 제한)은 지시서 그대로입니다.
- **지시서의 "하지 말 것" 중 두 가지를 남겨 뒀습니다**: 자간을 벌린 소문자
  모노 아이라벨(`RESEARCH`, `IN SHORT` 등)과 `A · B · C` 형태의 메타 문자열이
  그것입니다. 직전 아티팩트에서 좋다고 하신 부분이라 유지했는데, 원래
  지시서대로 빼는 편이 낫다면 말씀해 주세요.
- **번호 매기기**는 지시서가 허용한 곳(연구 3축, 루프 4단계)에만 썼습니다.
- **우주 파이프라인**: fast-scan hysteresis ↔ radiation hardness 가설은
  사이트 어디에도 넣지 않았습니다. 파이프라인 구조까지만 공개됩니다.
