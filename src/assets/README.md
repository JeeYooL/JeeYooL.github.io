# 이미지 넣는 곳 / Where images go

여기에 파일을 두면 Astro가 빌드할 때 자동으로 WebP 변환·여러 크기 생성까지
처리합니다. 원본 그대로 서빙해야 하는 파일(PDF 등)만 `public/`에 두세요.

Put image files here and Astro optimizes them at build time (WebP, multiple
widths). Only files that must be served byte-for-byte belong in `public/`.

```
src/assets/
  projects/<프로젝트-슬러그>/*.jpg|png|svg   프로젝트 사진·다이어그램
  publications/*.jpg|png                     논문 graphical abstract
```

프로젝트 슬러그는 `src/content/projects/ko/` 안의 파일명과 같습니다.
예: `mppt-measurement-system.md` → `src/assets/projects/mppt-measurement-system/`

## 참조하는 법

`src/content/projects/ko/mppt-measurement-system.md` 와 `.../en/...` 의 frontmatter에:

```yaml
thumbnail: "mppt-measurement-system/board.jpg"     # 목록 카드 썸네일 (3:2로 잘림)
thumbnailAlt: "MPPT 측정 보드"
images:                                            # 본문 아래 자료 섹션
  - src: "mppt-measurement-system/board.jpg"
    alt: "MPPT 측정 보드"                          # 필수 — 스크린리더가 읽습니다
    caption: "Rev 02 단채널 보드. INA226·MCP4725·LM358 배치."
  - src: "mppt-measurement-system/jig.jpg"
    alt: "2×2 온도 제어 지그"
    caption: "가공 직후 상태."
    wide: true                                     # 2열이 아니라 전체 폭
```

`src` 는 `src/assets/projects/` 기준 상대경로입니다. 파일명을 틀리면 빌드가
실패하면서 사용 가능한 파일 목록을 보여주니, 조용히 깨질 일은 없습니다.

한국어·영어 파일에 **같은 `src`** 를 쓰고 `alt`·`caption` 만 각 언어로 쓰세요.

## 본문 중간에 넣고 싶으면

마크다운에 그냥 쓰면 됩니다. 이 경우 파일은 `public/img/` 에 두세요.

```markdown
![회로 블록 다이어그램](/img/mppt-block-diagram.svg)
```

본문 안의 이미지도 클릭하면 똑같이 확대됩니다. 다이어그램은 SVG를 권합니다 —
용량이 작고 확대해도 깨지지 않습니다.

## 휴대폰 사진

원본이 4000px, 5 MB씩 되면 저장소와 CI 빌드가 무거워집니다. 파일을 넣은 뒤:

```bash
npm run images          # 무엇이 줄어들지 확인만 (파일은 안 건드림)
npm run images -- --fix # 긴 변 2400px로 줄여서 덮어쓰기
```

EXIF 회전 정보도 같이 정리되므로, 세로로 찍은 사진이 눕는 문제도 사라집니다.
