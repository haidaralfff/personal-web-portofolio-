import React, { useEffect, useRef } from 'react';

export default function DotGridBackground() {
  const maskRef = useRef(null);
  const glowRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    let rafId;
    let lastUpdate = 0;

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const animate = (timestamp) => {
      // Throttle to ~60fps (16ms)
      if (timestamp - lastUpdate >= 16) {
        lastUpdate = timestamp;
        const { x, y } = mouseRef.current;

        if (maskRef.current) {
          maskRef.current.style.maskImage = `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`;
          maskRef.current.style.webkitMaskImage = `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`;
        }

        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.15), transparent 80%)`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none dark:opacity-60 transition-opacity duration-500">
      {/* Base very subtle square grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.2) 1px, transparent 1px)
          `,
        }}
      />

      {/* Interactive highlight square grid that follows mouse */}
      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
        }}
      />

      {/* Subtle glow effect behind the mouse */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-20"
      />
    </div>
  );
}
