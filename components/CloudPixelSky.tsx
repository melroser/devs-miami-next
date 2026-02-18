'use client';

import React from 'react';

const CLOUDS_SRC = '/img/istockphoto-1220927153-612x612.jpg';
const CYCLE_SECONDS = 90;
const PIXEL_STATES = [1, 4, 8, 14, 22, 30];
const PIXEL_SEQUENCE = [...PIXEL_STATES, ...PIXEL_STATES.slice(1, -1).reverse()];

type DrawMetrics = {
  dx: number;
  dy: number;
  dw: number;
  dh: number;
};

function coverMetrics(
  srcWidth: number,
  srcHeight: number,
  targetWidth: number,
  targetHeight: number
): DrawMetrics {
  const scale = Math.max(targetWidth / srcWidth, targetHeight / srcHeight);
  const dw = srcWidth * scale;
  const dh = srcHeight * scale;
  return {
    dx: (targetWidth - dw) / 2,
    dy: (targetHeight - dh) / 2,
    dw,
    dh,
  };
}

export function CloudPixelSky() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const small = document.createElement('canvas');
    const smallCtx = small.getContext('2d', { alpha: false });
    if (!smallCtx) return;

    const image = new Image();
    image.src = CLOUDS_SRC;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let rafId = 0;
    let active = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    const draw = (now: number) => {
      if (!active) return;
      if (!image.complete || !image.naturalWidth || !image.naturalHeight) {
        rafId = window.requestAnimationFrame(draw);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const elapsed = (now - start) / 1000;

      const segmentSeconds = CYCLE_SECONDS / PIXEL_SEQUENCE.length;
      const phase = reduceMotion ? 0 : elapsed / segmentSeconds;
      const stateIndex = Math.floor(phase) % PIXEL_SEQUENCE.length;
      const nextStateIndex = (stateIndex + 1) % PIXEL_SEQUENCE.length;
      const stateMixRaw = phase - Math.floor(phase);
      const stateMix = reduceMotion ? 0 : stateMixRaw * stateMixRaw * (3 - 2 * stateMixRaw);

      const renderState = (pixelSize: number, alpha: number) => {
        const tinyW = Math.max(1, Math.floor(width / pixelSize));
        const tinyH = Math.max(1, Math.floor(height / pixelSize));
        small.width = tinyW;
        small.height = tinyH;

        const smallDraw = coverMetrics(image.naturalWidth, image.naturalHeight, tinyW, tinyH);
        smallCtx.imageSmoothingEnabled = true;
        smallCtx.clearRect(0, 0, tinyW, tinyH);
        smallCtx.drawImage(image, smallDraw.dx, smallDraw.dy, smallDraw.dw, smallDraw.dh);

        ctx.globalAlpha = alpha;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(small, 0, 0, tinyW, tinyH, 0, 0, width, height);
      };

      ctx.clearRect(0, 0, width, height);
      renderState(PIXEL_SEQUENCE[stateIndex], 1);
      if (!reduceMotion && stateMix > 0.001) {
        renderState(PIXEL_SEQUENCE[nextStateIndex], stateMix);
      }
      ctx.globalAlpha = 1;

      const blendedPixelSize =
        PIXEL_SEQUENCE[stateIndex] * (1 - stateMix) + PIXEL_SEQUENCE[nextStateIndex] * stateMix;
      const intensity = (blendedPixelSize - PIXEL_STATES[0]) / (PIXEL_STATES[PIXEL_STATES.length - 1] - PIXEL_STATES[0]);

      // Vapor tint and slight CRT-like line structure.
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = `rgba(255, 182, 228, ${0.08 + intensity * 0.12})`;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = `rgba(142, 218, 255, ${0.06 + intensity * 0.08})`;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = `rgba(255, 255, 255, ${0.02 + intensity * 0.07})`;
      for (let y = 0; y < height; y += 3) {
        ctx.fillRect(0, y, width, 1);
      }
      ctx.globalCompositeOperation = 'source-over';

      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    rafId = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      active = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="dm-vapor-canvas-wrap" aria-hidden>
      <canvas ref={canvasRef} className="dm-vapor-canvas" />
      <div className="dm-vapor-canvas-edge" />
    </div>
  );
}
