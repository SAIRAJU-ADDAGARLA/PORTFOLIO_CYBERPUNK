'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import WebGL Galaxy Canvas to prevent SSR loading issues
const SkillsGalaxyCanvas = dynamic(() => import('./SkillsGalaxyCanvas'), { ssr: false });

const skills = [
  { name: 'Java', level: 'Advanced', color: 'shadow-[0_0_15px_rgba(248,152,32,0.15)] hover:border-[#f89820] hover:text-[#f89820]' },
  { name: 'Python', level: 'Advanced', color: 'shadow-[0_0_15px_rgba(55,118,171,0.15)] hover:border-[#3776ab] hover:text-[#3776ab]' },
  { name: 'React', level: 'Expert', color: 'shadow-[0_0_15px_rgba(97,218,251,0.15)] hover:border-[#61dafb] hover:text-[#61dafb]' },
  { name: 'Node.js', level: 'Advanced', color: 'shadow-[0_0_15px_rgba(51,153,51,0.15)] hover:border-[#339933] hover:text-[#339933]' },
  { name: 'AI / ML', level: 'Specialist', color: 'shadow-[0_0_15px_rgba(255,0,60,0.15)] hover:border-[#FF003C] hover:text-[#FF003C]' },
  { name: 'LLM Applications', level: 'Specialist', color: 'shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:border-[#00E5FF] hover:text-[#00E5FF]' },
  { name: 'Firebase', level: 'Intermediate', color: 'shadow-[0_0_15px_rgba(255,202,40,0.15)] hover:border-[#ffca28] hover:text-[#ffca28]' },
  { name: 'MongoDB', level: 'Advanced', color: 'shadow-[0_0_15px_rgba(71,162,72,0.15)] hover:border-[#47a248] hover:text-[#47a248]' },
  { name: 'GitHub', level: 'Expert', color: 'shadow-[0_0_15px_rgba(245,245,243,0.15)] hover:border-[#F5F5F3] hover:text-[#F5F5F3]' },
  { name: 'UI / UX Design', level: 'Advanced', color: 'shadow-[0_0_15px_rgba(189,0,255,0.15)] hover:border-[#BD00FF] hover:text-[#BD00FF]' },
];

export default function SkillsGalaxy() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      // Degrade WebGL to 2D grid for small viewports/mobile touchscreens
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full h-[100vh] min-h-[600px] bg-pure-black border-b border-warm-white/10 flex flex-col justify-between py-20 px-6 overflow-hidden select-none"
    >
      {/* Absolute background layout markings */}
      <div className="absolute top-20 right-8 font-mono text-[9px] text-warm-white/15 select-none pointer-events-none uppercase">
        SYS_GRID_SCALE: ACTIVE // LATENCY_3MS
      </div>

      {/* Grid Border Accent Layouts */}
      <div 
        className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 text-warm-white/10 font-mono text-[10px] tracking-widest uppercase [writing-mode:vertical-rl] select-none pointer-events-none"
        aria-hidden="true"
      >
        SKILLS GALAXY MAP // 3D GRAPH
      </div>

      {/* Title Header */}
      <div className="max-w-5xl w-full mx-auto z-10 flex flex-col gap-2">
        <span className="font-mono text-xs text-neon-blue uppercase tracking-widest block">
          [ 02 // TECHNICAL GALAXY ]
        </span>
        <h2 className="font-syne font-extrabold text-4xl md:text-6xl uppercase tracking-tighter leading-none">
          INTERACTIVE CONSTELLATIONS
        </h2>
        <p className="font-mono text-xs text-warm-white/40 uppercase tracking-widest max-w-lg mt-1">
          Hover to pulse nodes and activate gravitational spring networks. Drag to rotate the viewport structure.
        </p>
      </div>

      {/* Main Galaxy Area */}
      <div className="flex-grow w-full max-w-5xl mx-auto my-6 relative flex items-center justify-center">
        {isMobile ? (
          /* Mobile / Touchscreen 2D Fallback Layout */
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-2 z-10 select-none">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`bg-warm-white/[0.02] border border-warm-white/10 rounded-xl p-4 transition-all duration-300 active:scale-95 flex flex-col justify-between aspect-video select-none ${skill.color}`}
              >
                <div className="font-syne font-extrabold text-base tracking-tight select-none">
                  {skill.name}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-warm-white/40 mt-2 select-none">
                  {skill.level}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* High-Fidelity 3D WebGL Galaxy Scene */
          <div className="absolute inset-0 w-full h-full rounded-2xl border border-warm-white/5 bg-warm-white/[0.01]">
            <SkillsGalaxyCanvas />
          </div>
        )}
      </div>

      {/* Section Footer Accent */}
      <div className="max-w-5xl w-full mx-auto z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-warm-white/10 pt-4 font-mono text-[10px] text-warm-white/30 uppercase tracking-widest select-none pointer-events-none">
        <div>
          CORE DEV CORE SYSTEM: ON // WEBGL 1.0 + 2.0 SHADERS
        </div>
        <div className="flex items-center gap-2">
          <span>COSMIC MAP</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
        </div>
      </div>
    </section>
  );
}
