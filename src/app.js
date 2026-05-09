import { Cpu } from './core/cpu.js';
import { initClockLogic } from './clock.js';
import { initClockDisplay } from './clock-display.js';
import { initTestNetDisplay } from './test-net-display.js';
import { Net } from './core/net.js';

export function createWorkbench() {
  const cpu = new Cpu();

  return `
    <section>
      <h1>RISC-II-8 Workbench</h1>
      <p>Core status: ${cpu.status()}</p>
    </section>

    <section class="clock-panel">
      <div id="clock-canvas-container" class="clock-canvas-container"></div>
    </section>

    <section class="test-net-panel">
      <div id="test-net-canvas-container" class="test-net-canvas-container"></div>
    </section>
  `;
}

export function initializeWorkbench(root) {
  const net = new Net({
    clk: 0,
    invClk: 1,
    clr: 0,
  });
  const clock = initClockLogic(root, net);
  initClockDisplay(root, clock, net);
  initTestNetDisplay(root, net);
  return clock;
}
