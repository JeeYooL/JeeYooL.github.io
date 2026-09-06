---
title: "Self-Driving Lab Architecture"
order: 1
oneLiner: "Closed-loop architecture for autonomous perovskite experimentation, with a live observability layer."
accent: accent
status: "Reference implementation running"
tags:
  - "Automation"
  - "Optimization"
  - "Systems"
thumbnail: "self-driving-lab/pareto-front.png"
thumbnailAlt: "Pareto front of predicted PCE against retention"
images:
  - src: "self-driving-lab/pareto-front.png"
    alt: "Pareto front of predicted PCE against retention, with the third objective"
    caption: "What the closed loop actually returns. (a) The ten-point Pareto front drawn from fifty candidates, coloured by Cs fraction. (b) Phase stability, the third objective, peaks near Cs 0.15 and then collapses — the point where the three objectives genuinely conflict."
    wide: true
---

## Problem

Autonomous experimentation systems tend to run as black boxes. A campaign picks its next composition, the robot makes it, a number comes back — and there is no point at which a human can see *why* that composition was chosen, or intervene before the material is consumed. The result is a loop that is technically closed but practically untrustworthy.

## Approach

Four stages, in order, with one of them deliberately gated on a human:

1. **Decide** — multi-objective Bayesian optimization (ParEGO) proposes the next batch against efficiency and stability jointly, not efficiency alone.
2. **Dry compute** — surrogate models (UMA, MACE, the screening GNN) filter the proposals before anything is fabricated.
3. **Fabricate** — a human approves the batch. This gate is a design decision, not a missing feature.
4. **Measure** — J–V and MPPT results return to the same store the optimizer reads from.

Over that pipeline sits a browser-based observability layer, built with Phaser 3, xterm.js and a FastAPI WebSocket feed, showing the campaign as it runs: structured events from each stage, the instrumented optimizer's reasoning, and the Pareto front updating between batches.

The architecture holds to one rule: the experiment database is the single source of truth and the interface only observes it. Nothing the visual layer shows can diverge from what the optimizer actually did, because the visual layer never holds state of its own.

The sim-to-real gap here is the same one I ran into building a scale autonomous vehicle on the DonkeyCar platform — a policy that behaves in simulation and then meets an environment whose noise it was never shown. Perovskite fabrication has the same failure mode with a longer feedback loop, which is exactly why the human gate stays.

## Result

Reference implementation built and run end to end, with structured event emission at every stage, an instrumented ParEGO loop, and Pareto front visualization across batches.

## Links

- Architecture diagram — *asset pending*
- Observability layer walkthrough — *asset pending*
