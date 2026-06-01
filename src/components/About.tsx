'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];

    cards.forEach((card, index) => {
      if (!card) return;

      // Anti-Design organic rotation offset calculations
      const rotationOffset = index % 2 === 0 ? -1.5 : 1.5;
      
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotate: rotationOffset * 3,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: rotationOffset,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-24 md:py-32 px-6 bg-pure-black border-b border-warm-white/10"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        
        {/* Section Heading & Vertical Accents */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-warm-white/10 pb-6">
          <div className="relative">
            <span className="font-mono text-xs text-neon-purple uppercase tracking-widest block mb-2">
              [ 01 // IDENTITY ]
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-6xl uppercase tracking-tighter">
              MIXED-MEDIA EDITORIAL
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-warm-white/40">
            <span className="text-[10px] tracking-widest font-mono font-medium uppercase">
              REVEAL ON SCROLL
            </span>
            <span className="w-12 h-[1px] bg-warm-white/20" />
            <span className="text-sm font-syne font-bold text-cyber-green vertical-text">
              本質
            </span>
          </div>
        </div>

        {/* Asymmetric Brutalist Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Main Narrative Card (8 Cols) */}
          <div
            ref={card1Ref}
            className="md:col-span-8 border border-warm-white/10 bg-warm-white/[0.02] p-8 md:p-12 rounded-2xl relative shadow-lg backdrop-blur-sm"
          >
            <div className="absolute top-6 right-6 font-mono text-[9px] text-warm-white/20">
              ID_SYS: 902.A
            </div>
            
            <h3 className="font-syne font-bold text-2xl md:text-3xl text-neon-blue uppercase tracking-tight mb-6">
              THE JOURNEY OF A. SAIRAJU
            </h3>
            
            <p className="font-space text-base md:text-lg leading-relaxed text-warm-white/80 mb-6">
              I am an AI Engineer, builder, and creative problem solver focused on building next-generation digital intelligence interfaces. Bridging the gap between strict machine architectures and organic visual storytelling, I construct fast, intelligent products.
            </p>
            
            <p className="font-space text-base md:text-lg leading-relaxed text-warm-white/80">
              My engineering framework blends core database structures, advanced neural networks, and high-fidelity client components. I believe technology should not just solve problems; it should create an emotional footprint.
            </p>
          </div>

          {/* Polaroid paper collage effect card (4 Cols) */}
          <div
            ref={card2Ref}
            className="md:col-span-4 border border-warm-white/15 bg-warm-white p-4 rounded-xl shadow-xl flex flex-col"
          >
            <div className="bg-pure-black aspect-square relative rounded-lg overflow-hidden flex items-center justify-center group">
              {/* Dynamic Abstract Cyber Brutalist Collage Graphic */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 via-transparent to-neon-blue/20 z-10" />
              <div className="w-32 h-32 rounded-full border border-dashed border-neon-blue/40 animate-spin absolute" />
              <div className="w-20 h-20 rounded-full bg-japanese-red/10 backdrop-blur-md border border-japanese-red/30 absolute" />
              <span className="font-mono text-neon-blue text-xs tracking-widest uppercase z-10 font-bold group-hover:scale-110 transition-transform duration-300">
                SAIRAJU // AI
              </span>
            </div>
            <div className="pt-4 pb-2 px-1 flex flex-col text-pure-black font-space select-none">
              <span className="text-[10px] tracking-wider font-mono font-bold uppercase text-pure-black/40">
                PLATE REF_049 // 2026
              </span>
              <span className="font-mono text-sm font-semibold tracking-tight text-pure-black/90 mt-1 select-none">
                &ldquo;Building the future grid.&rdquo;
              </span>
            </div>
          </div>

          {/* Lined Digitized Note Card (4 Cols) */}
          <div
            ref={card3Ref}
            className="md:col-span-4 border border-warm-white/10 bg-warm-white/[0.01] p-6 rounded-2xl relative"
            style={{
              backgroundImage: 'linear-gradient(#ffffff03 1px, transparent 1px)',
              backgroundSize: '100% 24px',
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-japanese-red absolute top-6 right-6" />
            <h4 className="font-mono text-xs uppercase tracking-widest text-warm-white/40 mb-6">
              // LOG_METRICS
            </h4>
            <div className="flex flex-col gap-4 font-mono text-xs text-warm-white/70">
              <div className="flex justify-between border-b border-warm-white/5 pb-2">
                <span>FOCUS:</span>
                <span className="text-cyber-green">AI AGENTS / NEURAL INTERFACES</span>
              </div>
              <div className="flex justify-between border-b border-warm-white/5 pb-2">
                <span>ORIGIN:</span>
                <span>INDIA</span>
              </div>
              <div className="flex justify-between border-b border-warm-white/5 pb-2">
                <span>PHILOSOPHY:</span>
                <span>ANTI-DESIGN MINIMALISM</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>INTERESTS:</span>
                <span>GLSL / R3F / CYBER ARCHITECTURE</span>
              </div>
            </div>
          </div>

          {/* Vision 2035 Terminal Card (8 Cols) */}
          <div
            ref={card4Ref}
            className="md:col-span-8 border border-neon-blue/20 bg-pure-black p-8 rounded-2xl relative shadow-[0_0_30px_rgba(0,229,255,0.02)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />
            
            <h4 className="font-syne font-bold text-xl text-warm-white uppercase tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              VISION FOR 2035 TECHNOLOGY
            </h4>
            
            <p className="font-mono text-xs text-warm-white/50 leading-relaxed uppercase mb-4">
              &gt; STAGE_01: UNIVERSAL INTELLIGENCE INTERFACES<br />
              &gt; STAGE_02: IMMERSIVE 3D SPATIAL COMPUTING GRAPHICS<br />
              &gt; STAGE_03: HYPER-LOCALIZED MULTILINGUAL WELFARE SYSTEMS
            </p>
            
            <p className="font-space text-sm md:text-base leading-relaxed text-warm-white/70">
              By 2035, applications will transition from isolated containers into context-aware systems that adapt to human behavior. I am actively building systems that respect user privacy, run performant calculations, and represent regional contexts beautifully.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
