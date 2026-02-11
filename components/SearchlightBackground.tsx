'use client';

import React, { useEffect } from 'react';

export function SearchlightBackground() {
  useEffect(() => {
    const blob = document.getElementById('dm-blob');
    if (!blob) return;

    const onMove = (e: PointerEvent) => {
      blob.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 2600, fill: 'forwards', easing: 'ease-out' }
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
        :root {
          --dm-bg: #23272e;
          --dm-blue: #67dfff;
          --dm-hot: #ff8c5f;
        }

        html,
        body {
          background: var(--dm-bg);
        }

        #dm-blob {
          position: fixed;
          left: 50%;
          top: 50%;
          translate: -50% -50%;
          width: min(720px, 98vw);
          aspect-ratio: 1;
          border-radius: 999px;
          z-index: 0;

          background: linear-gradient(90deg, var(--dm-blue), var(--dm-hot));
          opacity: 0.18;
          filter: saturate(0.8) brightness(0.95);
          animation: dm-rotate 36s ease-in-out infinite;

          pointer-events: none;
          will-change: left, top, transform;
        }

        #dm-blur {
          position: fixed;
          inset: 0;
          z-index: 1;

          backdrop-filter: blur(580px);
          -webkit-backdrop-filter: blur(580px);

          background: radial-gradient(
            circle at 50% 50%,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.46) 58%,
            rgba(0, 0, 0, 0.9) 100%
          );

          pointer-events: none;
        }

        @keyframes dm-rotate {
          from {
            rotate: 0deg;
          }
          50% {
            transform: scale(1, 1.55);
          }
          to {
            rotate: 360deg;
          }
        }
      `}</style>
    </>
  );
}
