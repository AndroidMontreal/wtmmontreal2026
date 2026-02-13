'use client';

import { useEffect, useRef } from 'react';

interface InteractiveGridPatternProps {
  className?: string;
  dotColor?: string;
  spacing?: number;
  size?: number;
  hoverRadius?: number;
}

export default function InteractiveGridPattern({
  className = "",
  dotColor = "#cbd5e1",
  spacing = 32,
  size = 1.5,
  hoverRadius = 220, // Increased radius for softer falloff
}: InteractiveGridPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Dot grid state (only need origin for this effect)
    let points: { x: number; y: number }[] = [];

    const initPoints = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      points = [];
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push({ x: i * spacing, y: j * spacing });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Smoothly interpolate mouse position if we wanted trailing, 
      // but strictly following cursor is snappier for a lens effect.
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      points.forEach(point => {
        const dx = mx - point.x;
        const dy = my - point.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        let r = size;
        let x = point.x;
        let y = point.y;

        // Lens Effect Logic
        if (dist < hoverRadius) {
          // Calculate falloff (0 to 1, 1 at center)
          // Using a cosine curve for ultra-smooth transition
          const normDist = dist / hoverRadius;
          const falloff = Math.pow(Math.cos(normDist * Math.PI / 2), 2); 

          // 1. Magnification (Scale) - Softer
          r = size + (size * 0.6 * falloff); 

          // 2. Distortion (Move slightly towards/away to simulate refraction)
          // Subtle shift
          const shift = 4 * falloff; 
          const angle = Math.atan2(dy, dx);
          x -= Math.cos(angle) * shift;
          y -= Math.sin(angle) * shift;
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', initPoints);
    window.addEventListener('mousemove', handleMouseMove);

    initPoints();
    draw();

    return () => {
      window.removeEventListener('resize', initPoints);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, spacing, size, hoverRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
