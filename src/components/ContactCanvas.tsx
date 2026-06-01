'use client';

import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number; // Original x coordinates
  oy: number; // Original y coordinates
}

export default function ContactCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, rx: 0, ry: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node Count based on viewport size
    const count = Math.min(60, Math.floor((width * height) / 25000));
    const points: Point[] = [];

    // Initialize points
    for (let i = 0; i < count; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      points.push({
        x: rx,
        y: ry,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        ox: rx,
        oy: ry,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp real mouse coords to smooth cursor tracker
      mouse.current.rx += (mouse.current.x - mouse.current.rx) * 0.08;
      mouse.current.ry += (mouse.current.y - mouse.current.ry) * 0.08;

      // Draw neural connections
      ctx.lineWidth = 0.5;

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];

        // Slowly drift nodes
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce nodes off screen edges
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Apply interactive gravitational pull towards mouse coordinates
        if (mouse.current.active) {
          const dx = mouse.current.rx - p1.x;
          const dy = mouse.current.ry - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 280) {
            const force = (280 - dist) / 280;
            p1.x -= (dx / dist) * force * 0.75;
            p1.y -= (dy / dist) * force * 0.75;
          }
        }

        // Draw node dot
        ctx.fillStyle = 'rgba(245, 245, 243, 0.08)';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = ((180 - dist) / 180) * 0.055;
            ctx.strokeStyle = `rgba(245, 245, 243, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 bg-pure-black pointer-events-none select-none"
    />
  );
}
