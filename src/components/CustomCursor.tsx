'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Detect mobile/touchscreen to gracefully degrade and hide custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setHidden(false);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for smooth spring physics interpolation
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
    
    // QuickTo for size and rotation stretching
    const scaleXTo = gsap.quickTo(cursor, 'scaleX', { duration: 0.25, ease: 'power2.out' });
    const scaleYTo = gsap.quickTo(cursor, 'scaleY', { duration: 0.25, ease: 'power2.out' });
    const rotateTo = gsap.quickTo(cursor, 'rotation', { duration: 0.25, ease: 'power2.out' });

    let lastX = 0;
    let lastY = 0;
    let velocity = 0;

    const onMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate speed and direction of mouse for stretching effect
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      velocity = Math.min(distance * 0.15, 1.2); // Cap the stretch
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      lastX = mouseX;
      lastY = mouseY;

      if (magneticElement) {
        // Locked on magnetic target: cursor centers on target, pulls slightly towards mouse
        const rect = magneticElement.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        
        const pullX = targetX + (mouseX - targetX) * 0.2;
        const pullY = targetY + (mouseY - targetY) * 0.2;

        xTo(pullX);
        yTo(pullY);
        scaleXTo(1.5);
        scaleYTo(1.5);
        rotateTo(0);
      } else {
        // Normal state: follow mouse with inertia, apply directional stretching
        xTo(mouseX);
        yTo(mouseY);
        
        if (distance > 1) {
          scaleXTo(1 + velocity);
          scaleYTo(1 - velocity * 0.4);
          rotateTo(angle);
        } else {
          scaleXTo(1);
          scaleYTo(1);
        }
      }
    };

    // Hover state handlers
    const onMouseOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Expand cursor on hovering interactive elements
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('interactive-node')
      ) {
        setHovered(true);
      }

      // Handle magnetic elements specifically
      const magneticTarget = target.closest('.magnetic-effect') as HTMLElement;
      if (magneticTarget) {
        setMagneticElement(magneticTarget);
        
        // Apply magnetic spring force to the element itself
        gsap.to(magneticTarget, {
          x: (e.clientX - (magneticTarget.getBoundingClientRect().left + magneticTarget.offsetWidth / 2)) * 0.35,
          y: (e.clientY - (magneticTarget.getBoundingClientRect().top + magneticTarget.offsetHeight / 2)) * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onMouseOutInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      setHovered(false);

      if (magneticElement) {
        gsap.to(magneticElement, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        setMagneticElement(null);
      }
    };

    const onMouseMoveInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticTarget = target.closest('.magnetic-effect') as HTMLElement;
      if (magneticTarget) {
        gsap.to(magneticTarget, {
          x: (e.clientX - (magneticTarget.getBoundingClientRect().left + magneticTarget.offsetWidth / 2)) * 0.35,
          y: (e.clientY - (magneticTarget.getBoundingClientRect().top + magneticTarget.offsetHeight / 2)) * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOverInteractive);
    window.addEventListener('mouseout', onMouseOutInteractive);
    window.addEventListener('mousemove', onMouseMoveInteractive);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOverInteractive);
      window.removeEventListener('mouseout', onMouseOutInteractive);
      window.removeEventListener('mousemove', onMouseMoveInteractive);
    };
  }, [magneticElement]);

  if (hidden) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-9999 mix-blend-difference flex items-center justify-center transition-colors duration-300 ${
        hovered 
          ? 'bg-neon-blue w-12 h-12 -ml-6 -mt-6 border border-warm-white' 
          : 'bg-warm-white'
      }`}
      style={{
        transform: 'translate3d(0px, 0px, 0px) scale(1)',
        willChange: 'transform',
      }}
    >
      {/* Inner glowing dot during hover states */}
      {hovered && (
        <span className="block w-2 h-2 rounded-full bg-pure-black animate-ping" />
      )}
    </div>
  );
}
