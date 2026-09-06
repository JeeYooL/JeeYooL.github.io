---
title: "Lab Infrastructure Tooling"
order: 5
oneLiner: "Internal tools the group actually uses, day to day."
accent: accent
status: "In daily group use"
tags:
  - "Tooling"
  - "Automation"
  - "Open Source"
---

## Problem

Most of the friction in a materials group is not scientific. It is a spectrometer that exports a format nothing else reads, a literature backlog nobody has time to triage, and an instrument whose vendor software cannot script the measurement you actually want.

## Approach

Three tools, each aimed at one of those.

**Z_to_O** — a Zotero-to-Obsidian pipeline for the reading backlog. PyMuPDF pulls full text, a multimodal pass reads the figures, a local LLM writes the summary, and a cron job processes only what is new, so the vault stays current without a manual step.

**Instrument data extractor** — EQE, PL and UV–Vis outputs arrive in three unrelated formats. Drag the files in, get one Excel report out. Built for the LEHMS group and in use there.

**Keithley SMU GUI** — a Python measurement program for the 2636B and 2401, written because the measurements that matter here are not the ones the vendor front panel exposes.

## Result

All three are in routine use by the group rather than sitting in a personal repository, and the measurement, analysis and literature tools are now published as a single repository. The Perovskite AI Lab app — XGBoost, random forest and Gaussian process regression over process conditions, with SHAP attribution — is public.

*Time saved and user count to be filled in.*

## Links

- Lab tools repository — https://github.com/JeeYooL/perovskite-lab-tools
- Perovskite AI Lab repository — https://github.com/JeeYooL/Perovskite
- Tool screenshots — *asset pending*
