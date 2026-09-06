---
title: "Passivator 스크리닝 파이프라인"
order: 3
oneLiner: "안정성을 최적화 목표로 삼는, 물리에 근거한 표면 패시베이터 분자 ML 스크리닝."
accent: accent
status: "Descriptor suite 구축 중, Phase 0·1·4A 우선"
tags:
  - "Machine Learning"
  - "DFT"
  - "Materials Design"
thumbnail: "passivator-screening-pipeline/descriptor-correlation.png"
thumbnailAlt: "20개 피처 상관 히트맵"
images:
  - src: "passivator-screening-pipeline/descriptor-correlation.png"
    alt: "학습 피처 20개의 Pearson 상관 히트맵"
    caption: "학습에 들어가는 피처 20개의 Pearson 상관. 요점은 |r| > 0.95 쌍이 0이라는 것 — 중복 피처가 성능을 부풀리지 않는지 학습 전에 확인한다."
  - src: "passivator-screening-pipeline/descriptor-coefficients.png"
    alt: "부호 제약 NNLS 회귀 계수"
    caption: "물리가 부호를 먼저 정하고 크기만 적합한 디스크립터 계수 (R² = 0.80). 삽입형 모노암모늄이 −0.45로 가장 불리하고, 양단을 잠그는 bidentate가 +0.35로 가장 유리하다."
---

## 문제

패시베이터 분자에 대한 생성형 스크리닝 논문들은 두 가지 약점을 공유합니다. 라벨이 텍스트 마이닝에서 나와 신뢰도를 알 수 없고, 안정성이 목적함수에 아예 들어가지 않습니다. 그래서 파이프라인은 수집하기 쉬운 물성을 최적화하게 됩니다. 효율을 올리면서 수명을 깎는 분자가 좋은 점수를 받습니다.

## 접근

Descriptor는 긁어오는 것이 아니라 계산합니다. 약 213개 후보 분자에 대해 ORCA가 전자구조, 결합 에너지, 쌍극자 모멘트, HOMO/LUMO 준위, 밴드 오프셋을 제공합니다. UMA 기반 descriptor suite(Meta FAIR `uma-s-1p2`, `task_name="omat"`)가 이를 단일 흡착 에너지 너머로 확장합니다 — 다중 사이트 흡착, 결함 형성 에너지, CI-NEB 이온 이동 장벽, 분자동역학 탈착 테스트, 고엔트로피 슬랩 혼합 엔탈피, 그리고 cluster expansion용 라벨링된 학습 데이터까지. 모든 출력은 하나의 `uma_descriptors.json`으로 합쳐집니다.

학습 쪽은 스스로를 속이지 않도록 설계했습니다. ISOS 프로토콜 기준 T80과 T90이 명시적 타깃입니다. 교차검증은 화학적 계열 단위의 leave-one-group-out이라, 이미 본 계열을 외워서 좋은 점수를 받을 수 없습니다. 루프는 다목적 베이지안 최적화에서 DFT 선별을 거쳐 실제 하드웨어로 닫힙니다 — 이 사이트의 MPPT 장비가 그 검증 단계입니다.

조성 쪽 작업도 같은 원칙 위에 있습니다. 고엔트로피 조성 격자에 대한 ΔG_mix 필터, 할라이드 상분리와 Hoke 효과를 위한 cluster expansion Monte Carlo, 그리고 2단계 DFT 검증(PBEsol로 선별, HSE06+SOC로 확인). 전체 스택이 너무 비싼 경우를 위해 MACE-MP-0 대리 모델 경로를 따로 두었습니다.

## 결과

*스크리닝 hit rate와 예측 오차는 첫 검증 라운드가 끝난 뒤 채워 넣을 예정입니다.*

## 링크

- 파이프라인 플로우 다이어그램 — *자료 준비 중*
