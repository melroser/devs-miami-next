'use client';

import React, { useEffect } from 'react';

export function SearchlightBackground() {
  useEffect(() => {
    const blob = document.getElementById('dm-blob');
    if (!blob) return;

    const onMove = (e: PointerEvent) => {
      blob.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 6200, fill: 'forwards', easing: 'cubic-bezier(0.2, 0.72, 0.2, 1)' }
      );
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <div id="dm-blob" aria-hidden />
      <div id="dm-blur" aria-hidden />

      <style jsx global>{`
        html,
        body {
          background: var(--dm-search-bg, var(--background));
        }

        #dm-blob {
          position: fixed;
          left: 14%;
          top: 74%;
          translate: -50% -50%;
          width: min(560px, 72vw);
          aspect-ratio: 1;
          border-radius: 999px;
          z-index: -6;

          background: linear-gradient(90deg, var(--dm-search-a, var(--dm-accent)), var(--dm-search-b, var(--dm-soft)));
          opacity: 0.055;
          filter: saturate(0.72) brightness(0.9) blur(2px);

          pointer-events: none;
          will-change: left, top, transform;
        }

        #dm-blur {
          position: fixed;
          inset: 0;
          z-index: -5;

          backdrop-filter: blur(220px);
          -webkit-backdrop-filter: blur(220px);

          background: radial-gradient(
            circle at 50% 50%,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.26) 58%,
            rgba(0, 0, 0, 0.58) 100%
          );

          pointer-events: none;
        }

      `}</style>
    </>
  );
}
