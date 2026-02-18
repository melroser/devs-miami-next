'use client';

import React from 'react';

export function OutrunMockup1Background() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.68,
      r: Math.random() * 1.8 + 0.3,
      a: Math.random() * 0.7 + 0.2,
      s: Math.random() * 2.5 + 0.5,
    }));

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let active = true;
    let smoothProgress = 0;
    let smoothScrollPx = 0;
    let previousSmoothScrollPx = 0;
    let gridPhase = 0;
    let gridVelocity = 0;
    let lastNow = 0;

    const TAU = Math.PI * 2;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const ease = (t: number) => t * t * (3 - 2 * t);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.floor(window.innerWidth);
      height = Math.floor(window.innerHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawSun = (cx: number, cy: number, r: number, p: number, time: number) => {
      const g = ctx.createRadialGradient(cx, cy - r * 0.45, r * 0.1, cx, cy, r);
      g.addColorStop(0, `rgba(${120 + p * 120}, ${88 + p * 84}, ${220 - p * 64}, ${0.68 + p * 0.2})`);
      g.addColorStop(0.45, `rgba(${186 + p * 60}, ${92 + p * 80}, ${182 - p * 70}, ${0.66 + p * 0.2})`);
      g.addColorStop(1, `rgba(${65 + p * 150}, ${38 + p * 82}, ${96 - p * 26}, ${0.45 + p * 0.22})`);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, TAU);
      ctx.clip();

      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

      const stripe = Math.max(4, r * 0.03);
      const gap = stripe * 0.95;
      const jitter = Math.sin(time * 0.0016) * 1.2;
      ctx.fillStyle = `rgba(8, 6, 24, ${0.3 + p * 0.16})`;
      for (let yy = cy - r; yy < cy + r; yy += stripe + gap) {
        const y = yy + jitter;
        ctx.fillRect(cx - r, y, r * 2, stripe);
      }
      ctx.restore();
    };

    const frame = (now: number) => {
      if (!active) return;

      if (!lastNow) lastNow = now;
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const targetScrollPx = window.scrollY;

      // Low-pass filter scroll input to avoid wheel/touch jitter in visual motion.
      const lerpFactor = 1 - Math.exp(-dt * 11);
      smoothProgress += (targetProgress - smoothProgress) * lerpFactor;
      smoothScrollPx += (targetScrollPx - smoothScrollPx) * lerpFactor;

      const p = ease(clamp01(smoothProgress));

      ctx.clearRect(0, 0, width, height);

      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, `rgb(${5 + p * 8}, ${4 + p * 8}, ${20 + p * 26})`);
      sky.addColorStop(0.52, `rgb(${18 + p * 28}, ${6 + p * 14}, ${45 + p * 35})`);
      sky.addColorStop(1, `rgb(${2 + p * 4}, ${2 + p * 3}, ${14 + p * 14})`);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      for (const s of stars) {
        const tw = Math.sin(now * 0.001 * s.s + s.x * 17 + p * 9) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(214,205,255,${s.a * (0.3 + tw * 0.7)})`;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, TAU);
        ctx.fill();
      }

      const vanishY = height * (0.55 - p * 0.06);
      const sunY = vanishY - height * 0.17;
      const sunR = height * (0.1 + p * 0.23);
      drawSun(width * 0.5, sunY, sunR, p, now);

      ctx.fillStyle = `rgba(246, 88, 220, ${0.14 + p * 0.18})`;
      ctx.fillRect(0, vanishY - 2, width, 4);
      ctx.fillStyle = `rgba(92, 220, 255, ${0.06 + p * 0.1})`;
      ctx.fillRect(0, vanishY + 2, width, 2);

      const scrollDelta = smoothScrollPx - previousSmoothScrollPx;
      previousSmoothScrollPx = smoothScrollPx;

      // Convert scroll deltas into a damped velocity so the road lines glide instead of stepping.
      const impulse = scrollDelta * (0.0015 + p * 0.0012);
      gridVelocity += impulse;
      gridVelocity *= Math.exp(-dt * 8.8);
      gridPhase += gridVelocity;

      const fractionalPhase = ((gridPhase % 1) + 1) % 1;
      const lineCount = 40;
      const roadRange = height - vanishY + 110;

      ctx.strokeStyle = `rgba(233, 86, 255, ${0.23 + p * 0.28})`;
      ctx.lineWidth = 1.15;
      for (let i = -2; i < lineCount + 2; i++) {
        const d = (i + fractionalPhase) / lineCount;
        if (d <= 0) continue;

        const y = vanishY + Math.pow(d, 2.25) * roadRange;
        if (y < vanishY || y > height + 3) continue;

        // Keep scan lines crisp while moving to reduce shimmer artifacts.
        const yAligned = Math.round(y) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, yAligned);
        ctx.lineTo(width, yAligned);
        ctx.stroke();
      }

      for (let i = -24; i <= 24; i++) {
        const x0 = width * 0.5 + i * (width * 0.012);
        const xb = width * 0.5 + i * (width * 0.078);
        ctx.strokeStyle = `rgba(55, 238, 255, ${0.15 + (1 - Math.abs(i) / 24) * 0.28})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x0, vanishY);
        ctx.lineTo(xb, height + 20);
        ctx.stroke();
      }

      const roadGlow = ctx.createRadialGradient(width * 0.5, height * 0.82, 30, width * 0.5, height * 0.82, width * 0.44);
      roadGlow.addColorStop(0, `rgba(255,70,180,${0.2 + p * 0.25})`);
      roadGlow.addColorStop(1, 'rgba(255,70,180,0)');
      ctx.fillStyle = roadGlow;
      ctx.fillRect(0, vanishY, width, height - vanishY);

      rafId = window.requestAnimationFrame(frame);
    };

    resize();
    rafId = window.requestAnimationFrame(frame);
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      active = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="dm-outrun-m1-canvas" aria-hidden />;
}
