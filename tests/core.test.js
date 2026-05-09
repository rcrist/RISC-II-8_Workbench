import { Cpu } from '../src/core/cpu.js';

test('cpu status returns initial values', () => {
  const cpu = new Cpu();
  expect(cpu.status()).toContain('PC=0');
});
