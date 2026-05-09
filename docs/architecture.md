# Workbench Architecture

This project separates the simulator into core, UI, and module layers.

- `src/core/` — CPU, ISA, memory, registers, and assembler logic
- `src/modules/` — extension modules and reusable panels
- `src/ui/` — editor and controls for the workbench
- `public/` — the static HTML shell and styles

The goal is a modular architecture where each component can be developed and tested independently.
