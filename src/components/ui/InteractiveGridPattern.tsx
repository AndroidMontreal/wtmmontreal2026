'use client';

import { useEffect, useRef } from 'react';

interface InteractiveGridPatternProps {
  className?: string;
  dotColor?: string; // e.g. '#cbd5e1'
  spacing?: number;  // e.g. 30
  baseSize?: number; // e.g. 0.8
}

export default function InteractiveGridPattern({
  className = "",
  dotColor = "#334155", // Slate-700
  spacing = 26,
  baseSize = 1.8, // dot size
}: InteractiveGridPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      baseSize: number;
    }
    let particles: Particle[] = [];

    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    const initParticles = () => {
      // 1. Set canvas size to match its display size (parent container)
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;

      // 2. Create grid
      particles = [];
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            baseSize: baseSize,
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 1.0;

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180; // Slightly larger influence area

        let force = 0;
        let size = p.baseSize;

        if (dist < maxDist) {
          force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);

          const push = 0.8; // Stronger push
          p.vx -= Math.cos(angle) * force * push;
          p.vy -= Math.sin(angle) * force * push;

          size = p.baseSize + (force * 3.0); // More dramatic scaling
        }

        const spring = 0.05;
        p.vx += (p.baseX - p.x) * spring;
        p.vy += (p.baseY - p.y) * spring;

        const friction = 0.88;
        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Use ResizeObserver to detect when the parent container changes size
    const resizeObserver = new ResizeObserver(() => {
        initParticles();
    });
    resizeObserver.observe(canvas);

    window.addEventListener('mousemove', handleMouseMove); // Keep global mouse tracking?
    // Actually, strictly speaking, we want mouse relative to canvas.
    // If we listen on window, we need to recalc rect every time which is expensive.
    // Let's listen on the CANVAS itself or window but use the cached rect?
    // For now, listening on window and doing getBoundingClientRect is safer for accuracy but slower.
    // Optimization: Listen on window, but only update if interacting?
    // Let's stick to the previous 'handleMouseMove' which does rect.left. It works.

    initParticles();
    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, spacing, baseSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      // We don't set width/height here because we handle it in JS to match window/parent
      style={{ width: '100%', height: '100%' }}
    />
  );
}
