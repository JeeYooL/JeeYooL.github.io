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
| 논문 추가·수정 | `src/content/publications/*.md` |
| 프로젝트 본문 | `src/content/projects/*.md` (Problem / Approach / Result / Links 4블록 고정) |
| 연구 3축 | `src/content/thrusts/*.md` |
| 이름·이메일·링크·네비 | `src/data/site.ts` |
| Home의 Highlights / Recent | `src/pages/index.astro` 상단 |
| 색·폰트 | `src/styles/global.css` |

frontmatter는 `src/content/config.ts`에서 스키마 검증을 하므로, 오타가 있으면
빈 칸으로 렌더링되지 않고 빌드가 실패합니다.

## 4. 지금 비어 있는 것

- **이력서 PDF** — `public/kwon-cv.pdf`에 넣고 `src/data/site.ts`의
  `links.cvPdf`를 `'/kwon-cv.pdf'`로 바꾸면 Home·CV의 비활성 버튼이 살아납니다.
- **Google Scholar / ORCID** — `src/data/site.ts`의 `links`가 비어 있으면
  해당 링크는 렌더링되지 않습니다.
- **프로젝트 Result 수치** — 채널당 단가, 전류 분해능, 연속 운전 시간,
  스크리닝 hit rate, 예측 오차. 지금은 구리색 이탤릭으로 "pending" 표시가
  나오니 눈에 띕니다.
- **이미지** — MPPT 보드 사진·회로도, 지그 CAD, SDL observability 스크린샷,
  파이프라인 다이어그램 2종, 랩 도구 스크린샷 3장, 대표 논문 graphical
  abstract 3장. `public/`에 넣고 Markdown에서 참조하면 됩니다.
  (#3 논문은 CC BY 4.0이라 출처 표기하면 재사용 가능, #1·#2는 Springer Nature라
  이용 조건 확인 또는 직접 다시 그리셔야 합니다.)

## 5. 지시서 대비 달라진 점

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
