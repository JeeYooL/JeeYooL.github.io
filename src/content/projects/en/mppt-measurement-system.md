---
title: "12-Channel MPPT Measurement System"
order: 2
oneLiner: "Custom multi-channel maximum-power-point tracker for long-term perovskite stability testing."
accent: signal
status: "Rev 03 in fabrication; single-channel board complete"
tags:
  - "Hardware"
  - "Firmware"
  - "Instrumentation"
# To add images, drop files into src/assets/projects/mppt-measurement-system/
# and uncomment the lines below. See src/assets/README.md.
# thumbnail: "mppt-measurement-system/board.jpg"
# thumbnailAlt: "MPPT measurement board"
# images:
#   - src: "mppt-measurement-system/board.jpg"
#     alt: "MPPT measurement board"
#     caption: "Rev 02 single-channel board — INA226, MCP4725 and LM358 layout."
#   - src: "mppt-measurement-system/jig.jpg"
#     alt: "2x2 temperature-controlled jig"
#     caption: "Straight out of the workshop."
#     wide: true
---

## Problem

Stability data is, by definition, many samples tracked for a long time. Commercial MPPT equipment prices that per channel, so the number of cells a group can track simultaneously is set by the budget rather than by what the statistics require. Running eight cells instead of two changes what a stability claim is worth.

## Approach

An Arduino-based tracker built from parts, not bought: INA226 for current and voltage sensing over I²C, MCP4725 DAC for bias, LM358 op-amp buffering the output stage.

Three problems ate most of the debugging time, and all three are worth writing down:

- **Current quantization.** The measured current came back in coarse steps regardless of the sense range. Fixed by writing the INA226 calibration register directly instead of relying on the library's derived value.
- **Shunt selection.** The stock R010 shunt put the cell currents at the bottom of the ADC range; replacing it with a 1 Ω shunt moved the working point into a usable part of the scale.
- **Offset measurement placement.** Where in the sequence the offset is sampled changes the result. Moving it resolved a drift that had looked like a device effect.

Rev 03 scales that single channel to twelve, driving three 2×2 temperature-controlled operando jigs — twelve slots total, in a 2-wire configuration. The jigs take 25 × 25 mm glass substrates with four gold top pixels in a single column against a common exposed ITO bottom electrode, and measure encapsulated cells in ambient air under illumination from above.

Building the jigs pulled in a second piece of equipment: a vacuum-assisted solution processing setup that runs immediately after spin coating, so film formation and measurement share one workflow rather than two.

### Current work

Under illumination the LM358 cannot sink current at the required level, which limits the reachable bias range. A PNP BJT push-pull output stage is the candidate fix, and it is not resolved yet.

## Result

Single-channel board complete and in use. Twelve-channel revision and the operando jigs are in fabrication at the campus workshop.

*Cost per channel, current resolution and continuous run time to be filled in once Rev 03 has run.*

## Links

- Board photograph and circuit block diagram — *asset pending*
- Jig CAD render — *asset pending*
- Representative MPPT trace — *asset pending*
