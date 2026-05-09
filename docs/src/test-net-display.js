export function initTestNetDisplay(root, net) {
  const container = root.querySelector('#test-net-canvas-container');
  if (!container || !net) return;

  const canvasWidth = 300;
  const canvasHeight = 64;

  const sketch = (p) => {
    const signals = {
      clk: net.get('clk') ?? 0,
      invClk: net.get('invClk') ?? 1,
      clr: net.get('clr') ?? 0,
    };

    net.subscribe('clk', (value) => {
      signals.clk = value;
    });

    net.subscribe('invClk', (value) => {
      signals.invClk = value;
    });

    net.subscribe('clr', (value) => {
      signals.clr = value;
    });

    function drawLed(x, y, isOn, label, overline = false) {
      p.fill(isOn ? '#5cff87' : '#12351d');
      p.stroke(isOn ? '#b6ffc8' : '#2e5d39');
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
      p.text('Net Test', 14, 12);

      drawLed(94, 20, signals.clk === 1, 'CLK');
      drawLed(156, 20, signals.invClk === 1, 'CLK', true);
      drawLed(224, 20, signals.clr === 1, 'CLR');
    };
  };

  new p5(sketch);
}
