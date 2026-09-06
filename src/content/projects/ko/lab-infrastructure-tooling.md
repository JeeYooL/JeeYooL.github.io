---
title: "실험실 인프라 도구"
order: 5
oneLiner: "연구실에서 매일 실제로 쓰이는 내부 도구들."
accent: accent
status: "연구실에서 상시 사용 중"
tags:
  - "Tooling"
  - "Automation"
  - "Open Source"
---

## 문제

소재 연구실의 마찰 대부분은 과학적인 것이 아닙니다. 다른 어떤 것도 읽지 못하는 형식으로 내보내는 분광기, 아무도 훑을 시간이 없는 논문 적체, 그리고 정작 하고 싶은 측정을 스크립트로 짤 수 없는 벤더 소프트웨어입니다.

## 접근

각각을 겨냥한 세 개의 도구입니다.

**Z_to_O** — 논문 적체를 위한 Zotero → Obsidian 파이프라인. PyMuPDF가 전문을 추출하고, 멀티모달 패스가 figure를 읽고, 로컬 LLM이 요약을 쓰고, cron 작업이 새로 들어온 것만 처리합니다. 수동 단계 없이 볼트가 최신 상태를 유지합니다.

**Instrument data extractor** — EQE, PL, UV–Vis 출력은 서로 무관한 세 가지 형식으로 나옵니다. 파일을 끌어다 놓으면 Excel 리포트 하나가 나옵니다. LEHMS 연구실용으로 만들었고 그곳에서 쓰이고 있습니다.

**Keithley SMU GUI** — 2461을 위한 Python 측정 프로그램. 여기서 중요한 측정이 벤더 전면 패널이 제공하는 측정이 아니기 때문에 만들었습니다.

## 결과

셋 다 개인 저장소에 놓여 있는 것이 아니라 연구실에서 상시 사용되고 있으며, 측정·분석·문헌 도구는 공개 저장소로 정리해 두었습니다. 공정 조건에 대해 XGBoost, random forest, Gaussian process 회귀를 돌리고 SHAP로 기여도를 보는 Perovskite AI Lab 앱은 공개되어 있습니다.

*절감 시간과 사용자 수는 확인 후 채워 넣을 예정입니다.*

## 링크

- 실험실 도구 저장소 — https://github.com/JeeYooL/perovskite-lab-tools
- Perovskite AI Lab 저장소 — https://github.com/JeeYooL/Perovskite
- 도구 스크린샷 — *자료 준비 중*
