import { createWorkbench, initializeWorkbench } from './app.js';

const root = document.getElementById('app');
root.innerHTML = createWorkbench();

window.clock = initializeWorkbench(root);
