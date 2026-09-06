---
title: "Passivator Screening Pipeline"
order: 3
oneLiner: "Physics-grounded ML screening of surface passivator molecules, with stability as the optimization target."
accent: accent
status: "Descriptor suite in build; phases 0, 1 and 4A prioritized"
tags:
  - "Machine Learning"
  - "DFT"
  - "Materials Design"
thumbnail: "passivator-screening-pipeline/descriptor-correlation.png"
thumbnailAlt: "Correlation heatmap of twenty features"
images:
  - src: "passivator-screening-pipeline/descriptor-correlation.png"
    alt: "Pearson correlation heatmap of the twenty training features"
    caption: "Pearson correlation across the twenty features that enter training. The point is that no pair exceeds |r| = 0.95 — a pre-training check that redundant features are not inflating performance."
  - src: "passivator-screening-pipeline/descriptor-coefficients.png"
    alt: "Sign-constrained NNLS regression coefficients"
    caption: "Descriptor coefficients where physics fixes the sign in advance and only the magnitude is fitted (R² = 0.80). Insertion-type mono-ammonium is the worst term at −0.45; the bidentate clamp is the best at +0.35."
---

## Problem

Generative screening papers for passivator molecules share two weaknesses. Their labels come from text mining, so reliability is unknown; and stability never enters the objective function, so the pipeline optimizes for the property that happens to be easy to collect. A molecule that raises efficiency and shortens lifetime scores well.

## Approach

Descriptors are computed, not scraped. For roughly 213 candidate molecules, ORCA supplies electronic structure, binding energy, dipole moment, HOMO/LUMO levels and band offset. A UMA-based descriptor suite (Meta FAIR `uma-s-1p2`, `task_name="omat"`) extends that well past a single adsorption energy: multi-site adsorption, defect formation energies, ion migration barriers by CI-NEB, molecular-dynamics desorption tests, high-entropy slab mixing enthalpy, and labeled training data for cluster expansion. Every output merges into one `uma_descriptors.json`.

The learning side is built to not fool itself. T80 and T90 under ISOS protocols are explicit targets. Cross-validation is leave-one-group-out over chemical families, so a model cannot score well by memorizing a family it has already seen. The loop closes through multi-objective Bayesian optimization into a DFT pre-screen and then onto real hardware — the MPPT rig on this site is the validation step.

Composition-side work runs on the same footing: a ΔG_mix filter over a high-entropy composition grid, cluster-expansion Monte Carlo for halide segregation and the Hoke effect, and two-tier DFT validation (PBEsol to screen, HSE06+SOC to confirm) with a MACE-MP-0 surrogate path for cases where the full stack is too expensive.

## Result

*Screening hit rate and prediction error to be filled in once the first validation round completes.*

## Links

- Pipeline flow diagram — *asset pending*
