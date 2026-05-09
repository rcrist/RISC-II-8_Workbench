export class Clock {
  constructor(net = null, frequency = 1) {
    if (typeof net === 'number') {
      frequency = net;
      net = null;
    }

    this.net = net;
    this.frequency = Math.max(0.1, Number(frequency) || 1);
    this.state = 0; // low by default
    this.clr = 0;
    this.timerId = null;

    this.net?.define('clk', 0);
    this.net?.define('invClk', 1);
    this.net?.define('clr', 0);
    this.publishSignals();
  }

  get periodMs() {
    return 1000 / this.frequency;
  }

  get intervalMs() {
    return this.periodMs / 2;
  }

  get isRunning() {
    return this.timerId !== null;
  }

  get clk() {
    return this.state === 1;
  }

  get invClk() {
    return !this.clk;
  }

  setFrequency(value) {
    const frequency = Math.max(0.1, Number(value) || 1);
    this.frequency = frequency;

    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = window.setInterval(() => this.tick(), this.intervalMs);
    }

    this.publishSignals();
  }

  toggleClr() {
    this.clr = this.clr === 1 ? 0 : 1;
    this.publishSignals();
  }

  step() {
    this.tick();
  }

  run() {
    if (this.timerId !== null) {
      return;
    }

    this.timerId = window.setInterval(() => this.tick(), this.intervalMs);
    this.publishSignals();
  }

  stop() {
    if (this.timerId === null) {
      return;
    }

    clearInterval(this.timerId);
    this.timerId = null;
    this.publishSignals();
  }

  tick() {
    this.state ^= 1;
    this.publishSignals();
  }

  publishSignals() {
    if (!this.net) {
      return;
    }

    this.net.set('clk', this.clk ? 1 : 0);
    this.net.set('invClk', this.invClk ? 1 : 0);
    this.net.set('clr', this.clr);
  }
}

export function initClockLogic(root, net) {
  return new Clock(net, 1);
}
