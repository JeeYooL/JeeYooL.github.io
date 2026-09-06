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
- Descriptor correlation map — *asset pending*
