import React from 'react';

/* The reference interactive figure. Motion licence 1: the process IS time, so
   Run animates and everything else is still.

   Two rules this figure exists to demonstrate:
   1. Plot with the plates by POSITION — curve in plate 3, trajectory in plate
      2, the answer in plate 1. No plate means "good".
   2. Derive the sampled domain FROM the frame. Clamping y instead draws the
      parabola flat exactly where it is steepest, which is worse than no figure. */
export function GradientDescent({ lr = 0.5, steps = 0 }) {
  const W = 620, H = 260, PAD = 26, Y_MAX = 12;
  const f = (x) => 0.9 * (x - 1) * (x - 1) + 0.4;
  const fp = (x) => 1.8 * (x - 1);

  const half = Math.sqrt((Y_MAX - 0.45) / 0.9);
  const xMin = 1 - half, xMax = 1 + half;
  const px = (x) => PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2);
  const py = (y) => H - PAD - (Math.min(y, Y_MAX) / Y_MAX) * (H - PAD * 2);

  let curve = '';
  for (let i = 0; i <= 120; i++) {
    const x = xMin + (i / 120) * (xMax - xMin);
    curve += (i ? 'L' : 'M') + px(x).toFixed(1) + ' ' + py(f(x)).toFixed(1) + ' ';
  }

  let grid = '';
  for (let gx = Math.ceil(xMin); gx <= Math.floor(xMax); gx++) grid += 'M' + px(gx).toFixed(1) + ' ' + PAD + 'V' + (H - PAD) + ' ';
  for (let gy = 0; gy <= Y_MAX; gy += 3) grid += 'M' + PAD + ' ' + py(gy).toFixed(1) + 'H' + (W - PAD) + ' ';

  const xs = [-2.2];
  for (let i = 0; i < steps; i++) {
    const nx = xs[xs.length - 1] - lr * fp(xs[xs.length - 1]);
    if (!isFinite(nx) || Math.abs(nx) > 60) { xs.push(Math.sign(nx) * 60); break; }
    xs.push(nx);
  }
  const clamp = (x) => Math.max(xMin, Math.min(xMax, x));
  const trail = xs.map((x, i) => (i ? 'L' : 'M') + px(clamp(x)).toFixed(1) + ' ' + py(f(x)).toFixed(1)).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Gradient descent on a quadratic loss">
      <path d={grid} stroke="var(--pp-hair)" strokeWidth="1" fill="none" />
      <path d={curve} stroke="var(--pp-plate-3)" strokeWidth="2" fill="none" />
      <path d={trail} stroke="var(--pp-plate-2)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      {xs.map((x, i) => (
        <rect key={i} x={px(clamp(x)) - 3.5} y={py(f(x)) - 3.5} width="7" height="7"
          fill="var(--pp-plate-2)" opacity={i === xs.length - 1 ? 1 : 0.45} />
      ))}
      <path d={`M${px(1) - 6} ${py(f(1)) + 10}h12M${px(1)} ${py(f(1)) + 4}v12`} stroke="var(--pp-plate-1)" strokeWidth="2" fill="none" />
      <text x={px(1) - 24} y={257} fontFamily="Cousine, monospace" fontSize="11" fill="var(--pp-plate-1-text)">minimum</text>
    </svg>
  );
}

export function gdVerdict(lr) {
  if (lr > 1.115) return { text: 'diverging', tone: 'var(--pp-plate-2-text)' };
  if (lr > 1.02) return { text: 'orbiting', tone: 'var(--pp-faint)' };
  if (lr < 0.2) return { text: 'crawling', tone: 'var(--pp-faint)' };
  return { text: 'converging', tone: 'var(--pp-plate-1-text)' };
}
