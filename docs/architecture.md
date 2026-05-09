# Workbench Architecture

This project separates the simulator into core, UI, and module layers.

- `docs/src/core/` — CPU, ISA, memory, registers, and assembler logic
- `docs/src/modules/` — extension modules and reusable panels
- `docs/src/ui/` — editor and controls for the workbench
- `docs/` — the GitHub Pages static app shell and styles

The goal is a modular architecture where each component can be developed and tested independently.
