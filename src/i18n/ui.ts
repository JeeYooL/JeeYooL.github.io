/**
 * Every string that appears on the site, in both languages.
 * Korean is the default locale and is served from the site root;
 * English lives under /en/. Bibliographic data (paper titles, author
 * names, venues) is never translated — only the contribution summaries.
 */
export const LOCALES = ['ko', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'ko';

export const langNames: Record<Lang, string> = { ko: '한국어', en: 'English' };
/** Short label shown on the switcher — always names the OTHER language. */
export const switchLabel: Record<Lang, string> = { ko: 'EN', en: '한국어' };
export const htmlLang: Record<Lang, string> = { ko: 'ko', en: 'en' };

export const ui = {
  ko: {
    name: '권형우',
    nameLatin: 'Hyoung Woo Kwon',
    role: '박사후연구원',
    affiliation: 'UNIST · LEHMS · 석상일 교수 연구실',
    affiliationPlain: 'UNIST LEHMS — 석상일 교수 연구실',
    location: '울산광역시, 대한민국',
    tagline: '페로브스카이트 태양전지, op\u2011amp에서 Pareto front까지.',
    intro:
      '보통 세 사람이 나눠 맡는 세 개의 층 — 직접 만든 계측 장비, 물리 기반 열화 모델, 머신러닝 소재 설계 — 을 한 사람이 이어서 다룹니다.',

    nav: {
      research: { label: '연구', blurb: '세 개의 축과 그것을 닫는 루프' },
      projects: { label: '프로젝트', blurb: '다섯 개의 제작물, 문제부터 결과까지' },
      publications: { label: '논문', blurb: '논문 8편, 공동 1저자 3편' },
      cv: { label: '이력', blurb: '경력·학력·특허·툴스택' },
    },

    a11y: { skip: '본문으로 건너뛰기', sections: '섹션', footerNav: '푸터', projectNav: '프로젝트 이동', themeToggle: '색 테마 전환', langToggle: '언어 전환' },
    theme: { system: '자동', light: '밝게', dark: '어둡게' },

    tagLabels: {
      All: '전체',
      Perovskite: 'Perovskite',
      Stability: 'Stability',
      Processing: 'Processing',
      Modules: 'Modules',
      Tandem: 'Tandem',
      'Lead-Free': 'Lead-free',
      Characterization: 'Characterization',
    },

    common: {
      email: '이메일',
      github: 'GitHub',
      allProjects: '프로젝트 전체',
      allPapers: '논문 8편 전체',
      fullResearch: '연구 페이지 전체',
      seeProjects: '프로젝트 보기',
      resumePending: '이력서 — 준비 중',
      resumePdf: '이력서 (PDF)',
      resumePdfTitle: 'PDF가 아직 게시되지 않았습니다',
      previous: '이전',
      next: '다음',
      status: '진행 상태',
      lastUpdated: '최종 수정',
      siteRepo: '사이트 저장소',
      scholar: 'Google Scholar 프로필',
      doi: 'DOI',
      figures: '자료',
      close: '닫기',
      imageViewer: '이미지 크게 보기',
      zoomHint: '이미지를 누르면 크게 볼 수 있습니다.',
    },

    home: {
      title: '권형우',
      description:
        '페로브스카이트 태양전지 연구자 권형우 — 계측 하드웨어, 물리 기반 열화 모델, 머신러닝 소재 설계.',
      figureCaption:
        '3-exponential 열화 모델(burn-in, light-soaking 회복, 두 개의 감쇠항)로 생성한 합성 곡선입니다. 실측 데이터가 아니며, 측정된 MPPT 데이터로 대체되기 전까지의 자리표시입니다.',
      figureAxisY: 'Normalized PCE',
      figureAxisX: 'Time under continuous MPPT (h)',
      highlightsLabel: '요약',
      highlightsTitle: '세 가지',
      highlights: [
        {
          lead: '논문 8편',
          body: '그중 3편이 공동 1저자이고, <i>Nature Energy</i> 2편이 포함됩니다 — FAPbI₃의 친환경 용매 공정, 그리고 1-sun 연속 구동 2,000시간 동안 초기 효율을 유지한 α상 안정화.',
        },
        {
          lead: '12채널 MPPT 측정 시스템',
          body: '회로도부터 펌웨어까지 직접 설계하고 캘리브레이션 레지스터 수준까지 디버깅했으며, 지금은 온도 제어 operando 지그 3대로 확장 중입니다.',
        },
        {
          lead: '우주환경 열화 예측 파이프라인',
          body: 'SPENVIS·SRIM·SR-NIEL로 이어지는 궤도 방사선 수송 계산을 소자 시뮬레이션과 수명 예측으로 연결합니다. 셀을 쏘아 올리기 전에 안정성을 추정하기 위한 것입니다.',
        },
      ],
      researchLabel: '연구',
      researchTitle: '세 개의 축',
      thrustWord: '축',
      ordinals: ['첫 번째', '두 번째', '세 번째', '네 번째'],
      projectsLabel: '프로젝트',
      projectsTitle: '다섯 개의 제작물',
      publicationsLabel: '논문',
      publicationsTitle: '공동 1저자',
      stats: [
        { value: 8, unit: '', label: '동료평가 논문 (공동 1저자 3편)' },
        { value: 12, unit: 'ch', label: '자체 제작 MPPT 측정 채널' },
        { value: 1718, unit: 'h', label: '모델이 예측한 T80' },
        { value: 3, unit: '', label: '거쳐온 연구그룹, 2개국' },
      ],
      story: {
        label: 'Degradation',
        heading: '이 소자는 어떻게 죽는가',
        lede:
          '아래 곡선은 1-sun 연속 구동에서 정규화 효율이 떨어지는 모습입니다. 하나의 매끄러운 감쇠처럼 보이지만, 실제로는 서로 다른 물리를 가진 네 개의 구간이 겹쳐 있습니다. 스크롤하면 순서대로 지나갑니다.',
        elapsed: '경과',
        remaining: '잔존 효율',
        stages: [
          {
            tag: '0 – 60 h',
            title: 'Burn-in',
            body: '처음 며칠이 가장 가파릅니다. 계면의 shallow trap이 채워지고 이온이 자리를 잡는 구간으로, τ ≈ 9 h 수준입니다. 여기서 잃은 6.5%는 대부분 돌아오지 않습니다.',
          },
          {
            tag: '60 – 320 h',
            title: 'Light soaking',
            body: '그런데 곡선이 잠깐 되돌아옵니다. 광조사가 일부 결함을 되돌리는 self-healing 구간입니다. 지상에서는 2% 남짓한 작은 항이지만, proton irradiation 환경에서는 이 항이 수명 예측을 통째로 바꿉니다.',
          },
          {
            tag: '320 h –',
            title: 'Long-term decay',
            body: '이후는 두 개의 감쇠항이 지배합니다. 빠른 쪽(τ ≈ 320 h)은 transport layer 계면, 느린 쪽(τ ≈ 2400 h)은 absorber 자체의 조성 변화입니다. 수명을 정하는 것은 느린 쪽이고, 제가 예측하려는 것도 그것입니다.',
          },
          {
            tag: '≈ 1,718 h',
            title: 'T80',
            body: '초기 효율의 80%에 도달하는 시점입니다. 논문에 실리는 숫자는 이것 하나지만, 그 숫자를 만드는 것은 위의 세 항 전부입니다. 그래서 효율만 최적화하는 모델은 이 지점을 맞히지 못합니다.',
          },
        ],
        footnote:
          '3-exponential 모델로 생성한 합성 곡선입니다. 실측 MPPT 데이터로 대체할 예정입니다.',
      },
      recentLabel: '최근',
      recentTitle: '요즘',
      recent: [
        { when: '2026', what: '습도 내성 모듈 제조에 관한 공동 1저자 논문을 <i>ACS Applied Materials &amp; Interfaces</i>에 게재. 12, 36, 72 cm² 블레이드 코팅 미니모듈.' },
        { when: '2025.10', what: 'Northwestern과 University of Toledo에서의 박사후 과정을 마치고 UNIST 석상일 교수 연구실로 복귀.' },
        { when: '진행 중', what: '12채널 MPPT 보드 Rev 03과 2×2 온도 제어 operando 지그 3대를 제작 중.' },
      ],
      closing:
        '하드웨어와 모델과 스크리닝 파이프라인은 하나의 루프입니다. 프로젝트 페이지가 그 루프가 실제로 보이는 곳입니다.',
    },

    research: {
      title: '연구',
      description: '세 개의 연구 축 — 우주환경 신뢰성, 데이터 기반 안정성 설계, 계측 자동화.',
      label: '연구',
      heading: '세 개의 축, 하나의 루프',
      lede:
        '이 일은 보통 세 사람이 나눠 맡는 세 갈래로 나뉩니다. 순서대로 적은 이유는 실제로 순서대로 돌기 때문입니다. 환경이 고장 방식을 정하고, 모델이 수명을 예측하고, 장비가 그 예측이 맞았는지 판정합니다.',
      builtIn: '어디서 만들어지는가',
      loopLabel: '루프',
      loopHeading: '세 축이 닫히는 방식',
      loopNote: '실제로 이 순서대로 돌기 때문에 번호를 붙였습니다.',
      stageWord: '단계',
      stages: [
        { label: '설계', note: 'descriptor, ΔG_mix, MOBO 제안' },
        { label: '예측', note: '열화 모델, T80 추정' },
        { label: '측정', note: 'MPPT, J–V, EIS, operando 지그' },
        { label: '재학습', note: '측정된 수명을 다시 모델로' },
      ],
      loopCaption:
        '4단계가 1단계로 돌아갑니다. 이 순환이 핵심입니다 — 측정과 만나지 않는 예측은 가설이고, 모델을 갱신하지 않는 측정은 데이터 한 점일 뿐입니다.',
    },

    projects: {
      title: '프로젝트',
      description: '계측 하드웨어, self-driving lab 아키텍처, ML 스크리닝 파이프라인, 실험실 도구.',
      label: '프로젝트',
      heading: '다섯 개의 제작물',
      lede:
        '모든 페이지가 문제 · 접근 · 결과 · 링크라는 같은 네 블록을 따릅니다. 감상하기보다 비교할 수 있게 하기 위해서입니다. 아직 측정되지 않은 수치는 그렇다고 적어 두었습니다.',
    },

    publications: {
      title: '논문',
      description: '동료평가 논문 8편, 그중 공동 1저자 3편 (Nature Energy 2편 포함).',
      label: '논문',
      heading: '논문 8편, 그중 공동 1저자 3편',
      lede:
        '아래 대표 3편은 공동 1저자 논문이며, 공교롭게도 세 연구 축을 하나씩 지납니다 — 친환경 공정, 상 안정성, 대면적 모듈. 논문 서지정보는 원문 그대로 영문으로 표기합니다.',
      featured: '대표 논문',
      allList: '전체 목록',
      filterLabel: '태그로 논문 거르기',
      empty: '해당 태그의 논문이 없습니다.',
      coFirst: '공동 1저자',
      openAccess: '오픈 액세스',
      patentLabel: '특허',
      patentTitle:
        '페로브스카이트 태양전지 모듈 제조용 시트 세트, 이를 이용한 제조 방법 및 페로브스카이트 태양전지 모듈',
      patentMeta: '등록 2020년 5월 28일 · 발명자: 석상일, 권형우',
    },

    cv: {
      title: '이력',
      description: '권형우의 경력, 학력, 특허, 툴스택.',
      label: '이력서',
      lede: 'UNIST LEHMS 석상일 교수 연구실 박사후연구원. UNIST 에너지공학 박사.',
      downloadPdf: 'PDF 내려받기',
      pdfPending: 'PDF 준비 중',
      experienceLabel: '경력',
      experienceTitle: '재직 이력',
      educationLabel: '학력',
      educationTitle: '학위',
      patentLabel: '특허',
      patentTitle: '등록',
      toolLabel: '툴스택',
      toolTitle: '역할별',
      toolNote: '공급사가 아니라 무엇에 쓰는 도구인지로 묶었습니다.',
      present: '현재',
      positions: [
        {
          when: '2025.10 – 현재',
          role: '박사후연구원',
          where: 'UNIST, LEHMS — 석상일 교수 연구실',
          what: '머신러닝 기반 소재 스크리닝, 수명·안정성 예측, 우주환경 페로브스카이트 태양전지. 직접 제작한 계측 장비로 검증합니다.',
        },
        {
          when: '2024.09 – 2025.08',
          role: '박사후연구원',
          where: 'University of Toledo — Yanfa Yan 그룹',
          what: '블레이드 코팅 대면적 모듈과 상온 대기 공정 — 실험실 레시피가 양산 제약과 만나는 스케일업 영역입니다.',
        },
        {
          when: '2023.09 – 2024.08',
          role: '박사후연구원',
          where: 'Northwestern University — Edward H. Sargent 그룹',
          what: 'Wide-bandgap 및 all-perovskite 탠덤 소자.',
        },
      ],
      education: [
        { when: '2023.08', what: '박사, 에너지공학', where: 'UNIST — 지도교수: 석상일' },
        { when: '2016.02', what: '학사, 화공생명공학', where: '부산대학교' },
      ],
      toolstack: [
        {
          group: '계산 및 머신러닝',
          items: [
            'Python, PyTorch, graph neural network',
            '다목적 베이지안 최적화(ParEGO), 능동학습 루프',
            'DFT — PBEsol 및 HSE06+SOC, cluster expansion Monte Carlo',
            'ML 퍼텐셜 — UMA, MACE-MP-0, CI-NEB, 결함 형성 에너지',
            'ORCA 양자화학 계산, SCAPS-1D 소자 시뮬레이션, PINN',
            'SPENVIS, SRIM, SR-NIEL 방사선 수송 계산',
          ],
        },
        {
          group: '하드웨어 및 계측',
          items: [
            'Arduino 및 임베디드 C, I²C 센서 연동 (INA226, MCP4725)',
            '아날로그 프론트엔드 설계 및 디버깅',
            'Keithley 2461 SMU 제어, 자체 제작 Python GUI',
            'Metrohm Autolab PGSTAT302N + FRA32M 임피던스 분광',
            'Tektronix MDO34 오실로스코프, Keysight 33500B 함수발생기',
            'ISOS 프로토콜 기반 MPPT 안정성 추적, operando 지그 설계',
          ],
        },
        {
          group: '제작 및 워크플로',
          items: [
            '스핀 코팅, 블레이드 코팅, 진공 보조 용액 공정(VASP)',
            '단일 셀부터 대면적 모듈까지, 상온 대기 공정',
            'Git, Linux 및 macOS, CUDA',
            'Obsidian, Zotero, 로컬 LLM 파이프라인',
          ],
        },
      ],
    },
  },

  en: {
    name: 'Hyoung Woo Kwon',
    nameLatin: 'Hyoung Woo Kwon',
    role: 'Postdoctoral Researcher',
    affiliation: 'UNIST · LEHMS · Sang Il Seok group',
    affiliationPlain: 'UNIST, LEHMS — Sang Il Seok group',
    location: 'Ulsan, Republic of Korea',
    tagline: 'Perovskite solar cells, from op\u2011amp to Pareto front.',
    intro:
      'I work across three layers that are usually held by three different people: custom measurement hardware, physics-based degradation models, and machine-learning materials design.',

    nav: {
      research: { label: 'Research', blurb: 'Three thrusts and the loop that closes them' },
      projects: { label: 'Projects', blurb: 'Five builds, problem through result' },
      publications: { label: 'Publications', blurb: '8 papers, 3 as co-first author' },
      cv: { label: 'CV', blurb: 'Positions, education, patent, toolstack' },
    },

    a11y: { skip: 'Skip to content', sections: 'Sections', footerNav: 'Footer', projectNav: 'Project navigation', themeToggle: 'Switch colour theme', langToggle: 'Switch language' },
    theme: { system: 'Auto', light: 'Light', dark: 'Dark' },

    tagLabels: {
      All: 'All',
      Perovskite: 'Perovskite',
      Stability: 'Stability',
      Processing: 'Processing',
      Modules: 'Modules',
      Tandem: 'Tandem',
      'Lead-Free': 'Lead-Free',
      Characterization: 'Characterization',
    },

    common: {
      email: 'Email',
      github: 'GitHub',
      allProjects: 'All projects',
      allPapers: 'All 8 papers',
      fullResearch: 'Full research page',
      seeProjects: 'See the projects',
      resumePending: 'Résumé — pending',
      resumePdf: 'Résumé (PDF)',
      resumePdfTitle: 'PDF not published yet',
      previous: 'Previous',
      next: 'Next',
      status: 'Status',
      lastUpdated: 'Last updated',
      siteRepo: 'Site repository',
      scholar: 'Google Scholar profile',
      doi: 'DOI',
      figures: 'Figures',
      close: 'Close',
      imageViewer: 'Image viewer',
      zoomHint: 'Click an image to enlarge.',
    },

    home: {
      title: 'Hyoung Woo Kwon',
      description:
        'Hyoung Woo Kwon — perovskite photovoltaics, from measurement hardware through degradation models to machine-learning materials design.',
      figureCaption:
        'Synthetic trace from a three-exponential degradation model — burn-in, light-soaking recovery, and two decay terms. Not measured data; it stands in until a measured MPPT run replaces it.',
      figureAxisY: 'Normalized PCE',
      figureAxisX: 'Time under continuous MPPT (h)',
      highlightsLabel: 'In short',
      highlightsTitle: 'Three things',
      highlights: [
        {
          lead: '8 publications',
          body: 'three of them as co-first author, including two in <i>Nature Energy</i> — green-solvent processing of FAPbI₃, and α-phase stabilization that held its efficiency through 2,000 h of continuous operation.',
        },
        {
          lead: '12-channel MPPT measurement system',
          body: 'designed from schematic through firmware, debugged down to the calibration register, and now scaling to three temperature-controlled operando jigs in the lab.',
        },
        {
          lead: 'Space-environment degradation pipeline',
          body: 'linking orbital radiation transport — SPENVIS, SRIM, SR-NIEL — to device simulation and a predicted lifetime, so stability can be estimated before a cell is ever flown.',
        },
      ],
      researchLabel: 'Research',
      researchTitle: 'Three thrusts',
      thrustWord: 'THRUST',
      ordinals: ['1', '2', '3', '4'],
      projectsLabel: 'Projects',
      projectsTitle: 'Five builds',
      publicationsLabel: 'Publications',
      publicationsTitle: 'Co-first author',
      stats: [
        { value: 8, unit: '', label: 'peer-reviewed papers (3 as co-first)' },
        { value: 12, unit: 'ch', label: 'self-built MPPT measurement channels' },
        { value: 1718, unit: 'h', label: 'modelled T80' },
        { value: 3, unit: '', label: 'research groups, two countries' },
      ],
      story: {
        label: 'Degradation',
        heading: 'How a perovskite cell dies',
        lede:
          'The curve below is normalized efficiency under continuous 1-sun operation. It looks like one smooth decay, but four regimes with different physics are stacked inside it. Scroll to pass through them in order.',
        elapsed: 'Elapsed',
        remaining: 'Remaining',
        stages: [
          {
            tag: '0 – 60 h',
            title: 'Burn-in',
            body: 'The first days are the steepest. Shallow interfacial traps fill and mobile ions settle, on a time constant near 9 hours. Most of the 6.5% lost here never comes back.',
          },
          {
            tag: '60 – 320 h',
            title: 'Light-soaking recovery',
            body: 'Then the curve turns back up. Illumination reverses part of the damage — self-healing. On the ground it is a 2% term; under proton irradiation it rewrites the lifetime prediction entirely.',
          },
          {
            tag: '320 h onward',
            title: 'Long-term decay',
            body: 'Two decay terms take over. The faster one (τ ≈ 320 h) is the transport-layer interface; the slower one (τ ≈ 2400 h) is compositional change in the absorber itself. The slow term sets the lifetime, and it is the one I am trying to predict.',
          },
          {
            tag: '≈ 1,718 h',
            title: 'T80',
            body: 'The point where the cell reaches 80% of its initial efficiency. One number goes into the paper, but all three terms above produce it — which is why a model that optimizes efficiency alone never lands on it.',
          },
        ],
        footnote: 'Synthetic curve from a three-exponential model, standing in until measured MPPT data replaces it.',
      },
      recentLabel: 'Recent',
      recentTitle: 'Lately',
      recent: [
        { when: '2026', what: 'Co-first-author paper on humidity-robust module fabrication published in <i>ACS Applied Materials &amp; Interfaces</i>; blade-coated mini-modules at 12, 36 and 72 cm².' },
        { when: '2025.10', what: 'Returned to UNIST as a postdoctoral researcher in the Sang Il Seok group, after postdocs at Northwestern and the University of Toledo.' },
        { when: 'In progress', what: 'Rev 03 of the 12-channel MPPT board in fabrication, together with three 2×2 operando temperature-controlled measurement jigs.' },
      ],
      closing:
        'The hardware, the model and the screening pipeline are one loop. The projects are where that loop is visible.',
    },

    research: {
      title: 'Research',
      description: 'Three research thrusts: reliability in space environments, data-driven stability design, and measurement automation.',
      label: 'Research',
      heading: 'Three thrusts, one loop',
      lede:
        'The work splits into three lines that are usually held by three different people. They are listed in order because they run in order: an environment sets the failure mode, a model predicts the lifetime, and an instrument decides whether the prediction was right.',
      builtIn: 'Where it is built',
      loopLabel: 'The loop',
      loopHeading: 'How the three close',
      loopNote: 'Numbered because the stages genuinely run in this order.',
      stageWord: 'STAGE',
      stages: [
        { label: 'Design', note: 'descriptors, ΔG_mix, MOBO proposal' },
        { label: 'Predict', note: 'degradation model, T80 estimate' },
        { label: 'Measure', note: 'MPPT, J–V, EIS, operando jig' },
        { label: 'Retrain', note: 'measured lifetime back into the model' },
      ],
      loopCaption:
        'Stage 4 feeds stage 1. The loop is the point — a prediction that never meets a measurement is a hypothesis, and a measurement that never updates a model is a data point.',
    },

    projects: {
      title: 'Projects',
      description: 'Five builds — measurement hardware, a self-driving lab architecture, ML screening pipelines and lab tooling.',
      label: 'Projects',
      heading: 'Five builds',
      lede:
        'Each page follows the same four blocks — problem, approach, result, links — so they can be compared rather than admired. Where a result number is not measured yet, it says so.',
    },

    publications: {
      title: 'Publications',
      description: 'Eight peer-reviewed papers, three as co-first author, including two in Nature Energy.',
      label: 'Publications',
      heading: 'Eight papers, three as co-first author',
      lede:
        'The three featured below are the co-first-author papers, and they happen to span the three research thrusts — green processing, phase stability, and scalable modules. Some published versions hyphenate the author name; the site uses one spelling throughout.',
      featured: 'Featured',
      allList: 'All publications — citation list',
      filterLabel: 'Filter publications by tag',
      empty: 'No publications carry that tag.',
      coFirst: 'Co-first',
      openAccess: 'Open access',
      patentLabel: 'Patent',
      patentTitle:
        'Sheet set for manufacturing perovskite solar cell modules, manufacturing method using the same, and perovskite solar cell module',
      patentMeta: 'registered 28 May 2020 · inventors: Sang Il Seok, Hyoungwoo Kwon',
    },

    cv: {
      title: 'CV',
      description: 'Positions, education, patent and toolstack for Hyoung Woo Kwon.',
      label: 'Curriculum vitae',
      lede: 'Postdoctoral Researcher at UNIST, LEHMS — Sang Il Seok group. Ph.D. in Energy Engineering, UNIST.',
      downloadPdf: 'Download PDF',
      pdfPending: 'PDF pending',
      experienceLabel: 'Experience',
      experienceTitle: 'Positions',
      educationLabel: 'Education',
      educationTitle: 'Degrees',
      patentLabel: 'Patent',
      patentTitle: 'Granted',
      toolLabel: 'Toolstack',
      toolTitle: 'By role',
      toolNote: 'Grouped by what the tool is for, not by vendor.',
      present: 'present',
      positions: [
        {
          when: '2025.10 – present',
          role: 'Postdoctoral Researcher',
          where: 'UNIST, LEHMS — Sang Il Seok group',
          what: 'Machine-learning materials screening, lifetime and stability prediction, and space-environment perovskite photovoltaics, validated on self-built measurement hardware.',
        },
        {
          when: '2024.09 – 2025.08',
          role: 'Postdoctoral Researcher',
          where: 'University of Toledo — Yanfa Yan group',
          what: 'Blade-coated large-area modules and room-temperature ambient processing — the scale-up regime where laboratory recipes meet manufacturing constraints.',
        },
        {
          when: '2023.09 – 2024.08',
          role: 'Postdoctoral Researcher',
          where: 'Northwestern University — Edward H. Sargent group',
          what: 'Wide-bandgap and all-perovskite tandem devices.',
        },
      ],
      education: [
        { when: '2023.08', what: 'Ph.D., Energy Engineering', where: 'UNIST — advisor: Sang Il Seok' },
        { when: '2016.02', what: 'B.S., Chemical & Biomolecular Engineering', where: 'Pusan National University' },
      ],
      toolstack: [
        {
          group: 'Computation & ML',
          items: [
            'Python, PyTorch, graph neural networks',
            'Multi-objective Bayesian optimization (ParEGO), active learning',
            'DFT — PBEsol and HSE06+SOC; cluster expansion Monte Carlo',
            'ML potentials — UMA, MACE-MP-0; CI-NEB, defect formation energies',
            'ORCA quantum chemistry; SCAPS-1D device simulation; PINN',
            'SPENVIS, SRIM, SR-NIEL radiation transport',
          ],
        },
        {
          group: 'Hardware & Measurement',
          items: [
            'Arduino and embedded C; I²C sensor integration (INA226, MCP4725)',
            'Analog front-end design and debugging',
            'Keithley 2461 SMU control, with a self-written Python GUI',
            'Metrohm Autolab PGSTAT302N + FRA32M impedance spectroscopy',
            'Tektronix MDO34 oscilloscope, Keysight 33500B function generator',
            'MPPT stability tracking to ISOS protocols; operando jig design',
          ],
        },
        {
          group: 'Fabrication & Workflow',
          items: [
            'Spin coating, blade coating, vacuum-assisted solution processing',
            'Single cells through large-area modules; ambient room-temperature routes',
            'Git, Linux and macOS, CUDA',
            'Obsidian, Zotero, local LLM pipelines',
          ],
        },
      ],
    },
  },
} as const;

export type UI = (typeof ui)['en'];
export const t = (lang: Lang): UI => ui[lang] as unknown as UI;
