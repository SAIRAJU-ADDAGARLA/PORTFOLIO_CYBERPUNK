'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';

// Dynamically import WebGL canvas with ssr disabled to prevent Next.js hydration mismatches
const Hyperspeed = dynamic(() => import('./Hyperspeed'), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Letter by letter fade/stagger for heading
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = text
          .split('')
          .map((char) => {
            if (char === ' ') return '<span class="inline-block">&nbsp;</span>';
            return `<span class="char inline-block opacity-0 translate-y-8">${char}</span>`;
          })
          .join('');

        gsap.to('.char', {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 1.4,
          ease: 'power4.out',
          delay: 0.2,
        });
      }

      // Letter/word stagger for subheadline
      if (subheadlineRef.current) {
        const text = subheadlineRef.current.textContent || '';
        subheadlineRef.current.innerHTML = text
          .split(' ')
          .map((word) => {
            return `<span class="word inline-block opacity-0 translate-y-4 mr-2">${word}</span>`;
          })
          .join(' ');

        gsap.to('.word', {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.8,
        });
      }

      // Fade-in CTAs
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.0,
            ease: 'power3.out',
            delay: 1.2,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    const aboutSection = document.querySelector('#about');
    if (lenis && aboutSection) {
      lenis.scrollTo(aboutSection, { duration: 1.5 });
    } else if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    const contactSection = document.querySelector('#contact');
    if (lenis && contactSection) {
      lenis.scrollTo(contactSection, { duration: 1.8 });
    } else if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden border-b border-warm-white/10"
    >
      {/* 3D WebGL space speed tunnel background canvas */}
      <Hyperspeed />

      {/* Decorative vertical Japanese typeset border layout */}
      <div 
        className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-warm-white/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono [writing-mode:vertical-rl]">
          A. SAIRAJU • 2026
        </span>
        <span className="w-[1px] h-20 bg-warm-white/10" />
        <span className="text-sm font-syne font-bold vertical-text text-japanese-red select-none">
          自己表現
        </span>
      </div>

      <div 
        className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-warm-white/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-sm font-syne font-bold vertical-text text-neon-blue select-none">
          技術創造
        </span>
        <span className="w-[1px] h-20 bg-warm-white/10" />
        <span className="text-[10px] tracking-widest uppercase font-mono [writing-mode:vertical-rl]">
          AI • FULLSTACK • BUILDER
        </span>
      </div>

      {/* Main Content Area */}
      <div className="z-10 w-full max-w-5xl text-center flex flex-col items-center justify-center mt-16 md:mt-24 select-none">
        
        {/* Main Fluid Chrome Heading */}
        <h1
          ref={titleRef}
          className="font-syne font-black text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter color-chrome max-w-4xl select-none leading-none mb-6"
        >
          HELLO, I&apos;M SAIRAJU
        </h1>

        {/* High-contrast subheadline stagger reveal */}
        <div
          ref={subheadlineRef}
          className="text-warm-white/80 font-mono text-sm md:text-lg tracking-widest uppercase mb-12 flex flex-wrap justify-center gap-1 md:gap-3"
        >
          AI ENGINEER • BUILDER • PROBLEM SOLVER
        </div>

        {/* Magnetic Interactive CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md px-4"
        >
          <a
            href="#projects"
            onClick={handleExploreClick}
            className="magnetic-effect px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-pure-black bg-warm-white rounded-full transition-all duration-300 border border-warm-white hover:bg-transparent hover:text-warm-white shadow-[0_0_20px_rgba(245,245,243,0.15)]"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            onClick={handleContactClick}
            className="magnetic-effect px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-warm-white bg-transparent border border-warm-white/20 rounded-full transition-all duration-300 hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-effect px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-warm-white/70 bg-transparent border border-warm-white/10 rounded-full transition-all duration-300 hover:border-neon-purple hover:text-neon-purple hover:shadow-[0_0_15px_rgba(189,0,255,0.2)]"
          >
            View Resume
          </a>
        </div>
      </div>

      {/* Embedded 3D parallax elements details */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 select-none animate-bounce text-warm-white/40 pointer-events-none">
        <span className="text-[9px] uppercase tracking-widest font-mono font-medium">
          Scroll to explore
        </span>
        <svg
          className="w-4 h-4 text-warm-white/40"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
