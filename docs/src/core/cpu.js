export class Cpu {
  constructor() {
    this.registers = new Array(8).fill(0);
    this.pc = 0;
  }

  status() {
    return `PC=${this.pc} registers=${this.registers.join(',')}`;
  }
}
