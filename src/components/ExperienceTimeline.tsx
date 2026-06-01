'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Code, Award, GraduationCap } from 'lucide-react';

interface Milestone {
  id: string;
  station: string;
  stationKanji: string;
  title: string;
  subtitle: string;
  date: string;
  color: string;
  icon: React.ReactNode;
  details: string[];
  metrics: string;
}

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const routeLineRef = useRef<SVGLineElement>(null);
  const progressLineRef = useRef<SVGLineElement>(null);

  const milestones: Milestone[] = [
    {
      id: 'sih-hackathon',
      station: 'STATION_01 // HACKATHON_HUB',
      stationKanji: '予選突破',
      title: 'Smart India Hackathon Qualifier',
      subtitle: 'Ministry of Education Initiative',
      date: 'Q3 2024',
      color: '#00FF66', // Cyber Green
      icon: <Award className="text-[#00FF66]" size={16} />,
      details: [
        'Qualified in the Top 50 among 300+ highly competitive teams nationwide',
        'Architected real-time hardware tracking interfaces under strict 36hr run constraints',
        'Coordinated full-stack database integrations for scalable field diagnostics'
      ],
      metrics: 'SCORE: 96.8% // RANK: TOP 50'
    },
    {
      id: 'ai-builds',
      station: 'STATION_02 // AI_DEVELOPMENT_GRID',
      stationKanji: '人工知能',
      title: 'Advanced AI Product Builds',
      subtitle: 'Neural Interfaces & LLM Agent Pipelines',
      date: 'Q1 2025 - Present',
      color: '#00E5FF', // Neon Blue
      icon: <Code className="text-[#00E5FF]" size={16} />,
      details: [
        'Fine-tuned complex large language models mapping semantic frameworks to dialects',
        'Designed latency-optimized voice assistant tools using Whisper ASR edge engines',
        'Constructed vectorized goal tracking platforms representing projected personal paths'
      ],
      metrics: 'AVG_LATENCY: <120MS // ACCURACY: 98%'
    },
    {
      id: 'open-source',
      station: 'STATION_03 // CORE_CONTRIBUTIONS',
      stationKanji: '開発資格',
      title: 'Open Source & Core Certifications',
      subtitle: 'Technical Foundation & Infrastructure Standards',
      date: 'Ongoing',
      color: '#BD00FF', // Neon Purple
      icon: <Star className="text-[#BD00FF]" size={16} />,
      details: [
        'Engineered modular UI components, optimizing full-viewport Canvas layers',
        'Earned expert certifications across core server databases and cloud systems',
        'Contributed micro-animation optimization modules to open layouts'
      ],
      metrics: 'SYS_DEV: VERIFIED // STABILITY: 100%'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Animate central transit path vector fill
    if (progressLineRef.current && containerRef.current) {
      gsap.fromTo(
        progressLineRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
    }

    // 2. Animate station panels and nodes
    milestones.forEach((m) => {
      const node = document.querySelector(`.node-${m.id}`);
      const panel = document.querySelector(`.panel-${m.id}`);

      if (node && panel) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        tl.to(node, {
          scale: 1.3,
          backgroundColor: m.color,
          borderColor: '#F5F5F3',
          duration: 0.5,
          ease: 'back.out(2)',
        })
          .fromTo(
            panel,
            { opacity: 0, x: panel.classList.contains('left-panel') ? -40 : 40 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.3'
          )
          .to(node, {
            boxShadow: `0 0 25px ${m.color}cc`,
            duration: 0.3,
          });
      }
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-24 md:py-32 px-6 bg-pure-black border-b border-warm-white/10"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-warm-white/10 pb-6 select-none">
          <div>
            <span className="font-mono text-xs text-[#BD00FF] uppercase tracking-widest block mb-2">
              [ 04 // TIMELINE ]
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-6xl uppercase tracking-tighter">
              METRO TIMELINE MAP
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-warm-white/40">
            <span className="text-[10px] tracking-widest font-mono font-medium uppercase">
              SCROLL THROUGH STATIONS
            </span>
            <span className="w-12 h-[1px] bg-warm-white/20" />
            <span className="text-sm font-syne font-bold text-cyber-green vertical-text">
              経歴
            </span>
          </div>
        </div>

        {/* Transit Grid System */}
        <div className="relative w-full py-10">
          
          {/* Central Vertical SVG Vector Transit Path */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 h-full flex justify-center pointer-events-none select-none">
            <svg className="w-2 h-full" height="100%" width="8" xmlns="http://www.w3.org/2000/svg">
              {/* Backing structural wireline */}
              <line
                x1="4"
                y1="0"
                x2="4"
                y2="10000"
                stroke="#171717"
                strokeWidth="4"
                strokeDasharray="8,8"
              />
              {/* Glowing animated path fill */}
              <line
                ref={progressLineRef}
                x1="4"
                y1="0"
                x2="4"
                y2="10000"
                stroke="#00E5FF"
                strokeWidth="4"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{
                  filter: 'drop-shadow(0px 0px 8px #00E5FF)',
                }}
              />
            </svg>
          </div>

          {/* Chronological Stations list */}
          <div className="flex flex-col gap-24 relative z-10">
            {milestones.map((m, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={m.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center w-full gap-4 md:gap-0"
                >
                  
                  {/* Left Column (Even: Data Panel, Odd: Empty/Label on Mobile) */}
                  <div className={`flex flex-col ${isEven ? 'md:items-end text-left md:text-right md:pr-8' : 'md:opacity-0 order-2 md:order-1 select-none pointer-events-none'}`}>
                    {isEven && (
                      <div className={`panel-${m.id} left-panel border border-warm-white/10 hover:border-warm-white/20 bg-warm-white/[0.01] p-6 md:p-8 rounded-2xl flex flex-col gap-4 max-w-md w-full`}>
                        <div className="flex items-center md:justify-end gap-3 font-mono text-[9px] uppercase tracking-widest text-warm-white/40 select-none">
                          <span>{m.date}</span>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                        </div>
                        <h3 className="font-syne font-extrabold text-xl text-warm-white tracking-tight uppercase">
                          {m.title}
                        </h3>
                        <p className="font-space text-xs text-neon-blue uppercase tracking-wider font-semibold select-none">
                          {m.subtitle}
                        </p>
                        <ul className="flex flex-col gap-2 font-space text-[11px] md:text-xs text-warm-white/70 leading-relaxed list-none">
                          {m.details.map((d, i) => (
                            <li key={i} className="flex gap-2 justify-start md:justify-end">
                              <span className="order-2 md:order-1">{d}</span>
                              <span className="w-1 h-1 rounded-full bg-warm-white/40 mt-2 flex-shrink-0 order-1 md:order-2" />
                            </li>
                          ))}
                        </ul>
                        <div className="border-t border-warm-white/5 pt-3 font-mono text-[9px] text-warm-white/30 tracking-widest select-none">
                          {m.metrics}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Column (Transit Node & Japanese Kanji Station label) */}
                  <div className="flex flex-col items-center justify-center order-1 md:order-2">
                    {/* Glowing Vector Station Circle */}
                    <div
                      className={`node-${m.id} w-5 h-5 rounded-full border-4 border-[#171717] bg-[#070707] transition-all duration-500 scale-100 flex items-center justify-center cursor-pointer`}
                      style={{
                        boxShadow: 'none',
                      }}
                      title={m.station}
                    >
                      <div className="w-1 h-1 rounded-full bg-pure-black" />
                    </div>
                    {/* Vertical Kanji Transit Sign */}
                    <span 
                      className="font-syne text-[10px] md:text-xs font-bold text-warm-white/20 select-none vertical-text mt-3 tracking-widest uppercase hover:text-warm-white/60 transition-colors"
                      title={m.station}
                    >
                      {m.stationKanji}
                    </span>
                  </div>

                  {/* Right Column (Odd: Data Panel, Even: Empty) */}
                  <div className={`flex flex-col ${!isEven ? 'md:pl-8 text-left' : 'md:opacity-0 order-3 select-none pointer-events-none'}`}>
                    {!isEven && (
                      <div className={`panel-${m.id} right-panel border border-warm-white/10 hover:border-warm-white/20 bg-warm-white/[0.01] p-6 md:p-8 rounded-2xl flex flex-col gap-4 max-w-md w-full`}>
                        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-warm-white/40 select-none">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                          <span>{m.date}</span>
                        </div>
                        <h3 className="font-syne font-extrabold text-xl text-warm-white tracking-tight uppercase">
                          {m.title}
                        </h3>
                        <p className="font-space text-xs text-neon-blue uppercase tracking-wider font-semibold select-none">
                          {m.subtitle}
                        </p>
                        <ul className="flex flex-col gap-2 font-space text-[11px] md:text-xs text-warm-white/70 leading-relaxed list-none">
                          {m.details.map((d, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="w-1 h-1 rounded-full bg-warm-white/40 mt-2 flex-shrink-0" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="border-t border-warm-white/5 pt-3 font-mono text-[9px] text-warm-white/30 tracking-widest select-none">
                          {m.metrics}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
