export function initClockDisplay(root, clock, net) {
  const container = root.querySelector('#clock-canvas-container');
  if (!container) return;

  const canvasWidth = 300;
  const canvasHeight = 86;

  const sketch = (p) => {
    const buttons = [
      { id: 'freqDown', label: '- Hz', x: 14, y: 42, w: 48, h: 28 },
      { id: 'freqUp', label: '+ Hz', x: 68, y: 42, w: 48, h: 28 },
      { id: 'clr', label: 'CLR', x: 124, y: 42, w: 50, h: 28 },
      { id: 'step', label: 'Step', x: 180, y: 42, w: 42, h: 28 },
      { id: 'run', label: 'Run', x: 228, y: 42, w: 26, h: 28 },
      { id: 'stop', label: 'Stop', x: 260, y: 42, w: 28, h: 28 },
    ];

    let clockState = {
      clk: net?.get('clk') ?? 0,
      invClk: net?.get('invClk') ?? 1,
    };

    net?.subscribe('clk', (value) => {
      clockState.clk = value;
    });

    net?.subscribe('invClk', (value) => {
      clockState.invClk = value;
    });

    function isInside(rect, x, y) {
      return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
    }

    function isDisabled(button) {
      return (button.id === 'run' && clock.isRunning) || (button.id === 'stop' && !clock.isRunning);
    }

    function drawLed(x, y, isOn, label, overline = false) {
      p.fill(isOn ? '#ffeb3b' : '#4c4200');
      p.stroke('#776b00');
      p.strokeWeight(2);
      p.circle(x, y, 12);

      p.noStroke();
      p.fill('#ddd');
      p.textFont('Arial');
      p.textSize(11);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(label, x + 10, y);

      if (overline) {
        const textWidth = p.textWidth(label);
        const textX = x + 10;
        p.stroke('#ddd');
        p.strokeWeight(1);
        p.line(textX, y - 7, textX + textWidth, y - 7);
      }
    }

    function drawButton(button) {
      const hovered = isInside(button, p.mouseX, p.mouseY);
      const disabled = isDisabled(button);

      p.stroke(disabled ? '#333' : '#555');
      p.strokeWeight(1);
      p.fill(disabled ? '#202020' : hovered ? '#3c3c3c' : '#2b2b2b');
      p.rect(button.x, button.y, button.w, button.h, 5);

      p.noStroke();
      p.fill(disabled ? '#777' : '#f0f0f0');
      p.textFont('Arial');
      p.textSize(11);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(button.label, button.x + button.w / 2, button.y + button.h / 2);
    }

    function changeFrequency(delta) {
      const nextFrequency = Math.max(0.1, clock.frequency + delta);
      clock.setFrequency(Number(nextFrequency.toFixed(1)));
    }

    p.setup = function () {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.parent(container);
      p.textFont('Arial');
    };

    p.draw = function () {
      p.background('#151515');

      p.stroke('#3a3a3a');
      p.strokeWeight(1);
      p.fill('#1f1f1f');
      p.rect(0.5, 0.5, canvasWidth - 1, canvasHeight - 1, 8);

      p.noStroke();
      p.fill('#f5f5f5');
      p.textFont('Arial');
      p.textSize(14);
      p.textAlign(p.LEFT, p.TOP);
      p.text('Clock', 14, 12);
      drawLed(82, 20, clockState.clk === 1, 'CLK');
      drawLed(154, 20, clockState.invClk === 1, 'CLK', true);

      p.stroke('#333');
      p.fill('#ccc');
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(`Freq: ${clock.frequency.toFixed(1)} Hz`, 216, 20);

      p.stroke('#333');
      p.line(14, 36, 286, 36);

      for (const button of buttons) {
        drawButton(button);
      }
    };

    p.mousePressed = function () {
      for (const button of buttons) {
        if (!isInside(button, p.mouseX, p.mouseY) || isDisabled(button)) {
          continue;
        }

        if (button.id === 'freqDown') changeFrequency(-1);
        if (button.id === 'freqUp') changeFrequency(1);
        if (button.id === 'clr') clock.toggleClr();
        if (button.id === 'step') clock.step();
        if (button.id === 'run') clock.run();
        if (button.id === 'stop') clock.stop();
      }
    };
  };

  new p5(sketch);
}
