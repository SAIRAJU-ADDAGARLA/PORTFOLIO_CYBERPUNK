'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Globe, Smartphone, ShieldAlert, Cpu } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  gridSpan: string;
  accentColor: string;
  tech: string[];
  description: string;
  highlights: string[];
  interfaceMockup: React.ReactNode;
}

export default function ProjectsBento() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic spotlight card follower hover event handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const projects: Project[] = [
    {
      id: 'futureme',
      title: 'FutureMe',
      subtitle: 'AI-Powered Future Self Communication Platform',
      category: 'ARTIFICIAL INTELLIGENCE',
      gridSpan: 'md:col-span-8 md:row-span-2 h-[420px]',
      accentColor: '#BD00FF', // Neon Purple
      tech: ['Next.js', 'LLM Agent APIs', 'WebSockets', 'Tailwind', 'MongoDB'],
      description: 'An advanced predictive modeling system simulating conversational exchanges with your future self. Utilizing temporal feedback neural networks and personal vectors, it projects personal paths and lets users interface with their simulated 2035 state.',
      highlights: [
        'Interactive real-time chat with custom simulated neural states',
        'Dynamic visual progression timelines showing personal metrics',
        'Advanced vector storage of personal goals and cognitive weights'
      ],
      interfaceMockup: (
        <div className="absolute inset-0 bg-[#070707] flex flex-col font-mono text-[9px] text-[#BD00FF] p-4 select-none">
          <div className="border-b border-[#BD00FF]/20 pb-2 mb-2 flex justify-between uppercase">
            <span>// SIMULATION_ENGINE: ACTIVE</span>
            <span className="animate-pulse">● RECORDING</span>
          </div>
          <div className="flex-grow flex flex-col gap-2 overflow-hidden py-1">
            <div className="bg-[#BD00FF]/5 p-2 rounded border border-[#BD00FF]/15 max-w-[80%]">
              <span className="text-warm-white/40 block mb-1">SAIRAJU (2026):</span>
              What does the developer ecosystem look like in 2035?
            </div>
            <div className="bg-pure-black p-2 rounded border border-warm-white/10 max-w-[80%] self-end">
              <span className="text-neon-blue block mb-1">SAIRAJU (2035):</span>
              Development is spatial and cognitive. We architect using semantic neural grids. Code compiles dynamically in response to intent patterns.
            </div>
          </div>
          <div className="border-t border-[#BD00FF]/20 pt-2 flex items-center justify-between text-[8px] text-warm-white/40">
            <span>LOG: TEMPORAL_STREAM_OK</span>
            <span>SECURE LINK v2.4</span>
          </div>
        </div>
      )
    },
    {
      id: 'agroscan',
      title: 'AgroScan',
      subtitle: 'Crop Disease Diagnostics Platform',
      category: 'COMPUTER VISION',
      gridSpan: 'md:col-span-4 md:row-span-2 h-[420px]',
      accentColor: '#00FF66', // Cyber Green
      tech: ['Python', 'TensorFlow', 'React Native', 'FastAPI', 'AWS'],
      description: 'A mobile computer vision solution analyzing leaves for exact plant disease diagnosis. Leveraging mobile hardware-accelerated convolutional neural networks, it returns crop-saving remedies in milliseconds under absolute offline field conditions.',
      highlights: [
        'Highly optimized MobileNetV3 CNN targeting edge device inference',
        'Intuitive real-time smartphone camera diagnostic UI layout',
        'Generates actionable agricultural advice and remedies'
      ],
      interfaceMockup: (
        <div className="absolute inset-0 bg-[#050505] flex flex-col justify-between items-center p-6 border border-emerald-500/10">
          <div className="w-full flex justify-between font-mono text-[8px] text-emerald-400">
            <span>CAMERA_FEED: READY</span>
            <span>ZOOM: 1.0X</span>
          </div>
          {/* Target Camera Overlay Frame */}
          <div className="relative w-36 h-36 border border-dashed border-emerald-400/40 rounded-2xl flex items-center justify-center">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
            
            <div className="w-24 h-24 rounded-full border border-dashed border-emerald-400/20 animate-spin absolute" />
            <Smartphone size={28} className="text-emerald-400 animate-pulse" />
          </div>
          <div className="w-full text-center bg-emerald-950/20 border border-emerald-400/20 py-2 rounded-lg font-mono text-[9px] text-emerald-400">
            SCANNING: SOLANUM_LYCOPERSICUM
          </div>
        </div>
      )
    },
    {
      id: 'campusconnect',
      title: 'Campus Connect',
      subtitle: 'Student Networking Ecosystem',
      category: 'FULL-STACK INFRASTRUCTURE',
      gridSpan: 'md:col-span-4 h-[320px]',
      accentColor: '#00E5FF', // Neon Blue
      tech: ['React', 'Node.js', 'Express', 'Firebase', 'Tailwind'],
      description: 'A unified portal enabling campus networks to coordinate resources, build group portfolios, match project roles, and synchronize student academic initiatives. Overcomes traditional communication friction in campus environments.',
      highlights: [
        'Integrated resource reservation and scheduling systems',
        'Custom student-to-project capability matchmaking engine',
        'High-contrast digital campus messaging hub architecture'
      ],
      interfaceMockup: (
        <div className="absolute inset-0 bg-[#030303] p-4 flex flex-col font-mono text-[8px] text-sky-400 gap-3 border border-sky-500/10">
          <div className="flex justify-between border-b border-sky-400/20 pb-1.5 uppercase font-bold">
            <span>CAMPUS_GRID</span>
            <span>ONLINE: 1,402</span>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-grow">
            <div className="border border-sky-400/20 bg-sky-950/5 rounded p-2 flex flex-col justify-between">
              <span>PROJ_MATCH</span>
              <span className="text-warm-white text-[10px]">AI Hackathon</span>
              <span className="text-sky-400/40">3 openings left</span>
            </div>
            <div className="border border-sky-400/20 bg-sky-950/5 rounded p-2 flex flex-col justify-between">
              <span>RESOURCES</span>
              <span className="text-warm-white text-[10px]">Lab 3D Printer</span>
              <span className="text-sky-400/40">Status: Free</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'emergencyalert',
      title: 'Emergency Alert',
      subtitle: 'Real-time SOS Safety Broadcast Network',
      category: 'MISSION-CRITICAL SYSTEMS',
      gridSpan: 'md:col-span-4 h-[320px]',
      accentColor: '#FF003C', // Japanese Red
      tech: ['Node.js', 'Socket.io', 'Geofencing', 'Firebase', 'PWA'],
      description: 'A robust geofenced alert network facilitating immediate, localized broadcast of crisis scenarios. Dynamically coordinates safety maps, triggers alert vectors, and feeds immediate instructions to nearby citizens.',
      highlights: [
        'Instant geofenced alert distribution with near-zero latency',
        'Offline fallback caching coordinates for offline navigation maps',
        'One-click urgent distress signal dispatcher interface'
      ],
      interfaceMockup: (
        <div className="absolute inset-0 bg-[#070002] p-4 flex flex-col justify-between border border-red-500/10 select-none">
          <div className="flex justify-between items-center font-mono text-[8px] text-red-500 uppercase">
            <span>SOS_TRANSMITTER</span>
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center bg-red-950/20 cursor-pointer animate-pulse">
              <ShieldAlert size={28} className="text-red-500" />
            </div>
            <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider mt-1 select-none">
              TRIGGER DISTRESS
            </span>
          </div>
          <div className="font-mono text-[7px] text-warm-white/30 text-center select-none">
            GEO_LOCK: 17.4085 N, 78.4312 E
          </div>
        </div>
      )
    },
    {
      id: 'govassistant',
      title: 'Scheme Assistant',
      subtitle: 'Multilingual Welfare AI Voice Assistant',
      category: 'SOCIETAL INTELLIGENCE',
      gridSpan: 'md:col-span-4 h-[320px]',
      accentColor: '#FFC800', // Neon Gold/Yellow
      tech: ['Python', 'LLM Fine-tuning', 'Whisper ASR', 'FastAPI', 'React'],
      description: 'A regional voice assistant translating convoluted policy texts into natural dialects. Developed to empower rural communities, it answers complex benefit structures, application workflows, and welfare guidelines in native languages.',
      highlights: [
        'Advanced fine-tuning mapping state policy frameworks to LLMs',
        'Custom local regional automated speech recognition interfaces',
        'Vocal responses crafted in multiple regional Indian dialects'
      ],
      interfaceMockup: (
        <div className="absolute inset-0 bg-[#050400] p-4 flex flex-col justify-between border border-amber-500/10">
          <div className="flex justify-between font-mono text-[8px] text-amber-500 uppercase">
            <span>VOICE_ENGINE</span>
            <span>LANG: TELUGU / HINDI</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* Audio Wave Mockup */}
            <div className="flex items-center gap-1.5 h-10">
              <span className="w-1 h-4 bg-amber-400/60 rounded animate-bounce" style={{ animationDelay: '0.1s' }} />
              <span className="w-1 h-8 bg-amber-400 rounded animate-bounce" style={{ animationDelay: '0.3s' }} />
              <span className="w-1 h-10 bg-amber-400 rounded animate-bounce" style={{ animationDelay: '0.5s' }} />
              <span className="w-1 h-6 bg-amber-400 rounded animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 h-3 bg-amber-400/60 rounded animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="font-mono text-[8px] text-amber-500/60 text-center uppercase select-none">
              &gt; TRANSLATING COMPLEX CLAUSES
            </span>
          </div>
          <div className="font-mono text-[8px] text-amber-500 text-center select-none">
            SYSTEM STATUS: ENGAGED
          </div>
        </div>
      )
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full py-24 md:py-32 px-6 bg-pure-black border-b border-warm-white/10"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-warm-white/10 pb-6 select-none">
          <div>
            <span className="font-mono text-xs text-cyber-green uppercase tracking-widest block mb-2">
              [ 03 // PORTFOLIO ]
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-6xl uppercase tracking-tighter">
              THE FUTURISTIC BENTO
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-warm-white/40">
            <span className="text-[10px] tracking-widest font-mono font-medium uppercase">
              CLICK CARDS TO EXPAND
            </span>
            <span className="w-12 h-[1px] bg-warm-white/20" />
            <span className="text-sm font-syne font-bold text-japanese-red vertical-text">
              実績
            </span>
          </div>
        </div>

        {/* Bento CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(0,_1fr)]">
          {projects.map((project) => (
            <motion.div
              layoutId={`card-container-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              key={project.id}
              onMouseMove={handleMouseMove}
              className={`group border border-warm-white/10 hover:border-warm-white/20 bg-warm-white/[0.01] rounded-2xl overflow-hidden cursor-pointer relative p-6 flex flex-col justify-between transition-all duration-500 shadow-md ${project.gridSpan}`}
              style={{
                // Custom CSS Properties for mouse tracking spotlight
                background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(245, 245, 243, 0.04), transparent 80%)'
              } as any}
            >
              {/* Spotlight Edge Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" 
                style={{
                  background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${project.accentColor}12, transparent 80%)`
                }}
              />

              {/* Bento Card Header */}
              <div className="flex justify-between items-start z-10 select-none">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-warm-white/40 block mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-syne font-bold text-xl md:text-2xl tracking-tight text-warm-white group-hover:text-neon-blue transition-colors select-none">
                    {project.title}
                  </h3>
                </div>
                <button
                  className="w-8 h-8 rounded-full border border-warm-white/10 flex items-center justify-center text-warm-white/40 group-hover:text-warm-white group-hover:border-warm-white/30 transition-all active:scale-95"
                  aria-label="Expand project details"
                >
                  <Maximize2 size={12} />
                </button>
              </div>

              {/* Interface Visual Mockup Area */}
              <div className="relative w-full flex-grow my-4 rounded-xl border border-warm-white/5 bg-[#030303] overflow-hidden min-h-[140px] shadow-inner select-none">
                {project.interfaceMockup}
              </div>

              {/* Bento Card Footer */}
              <div className="flex flex-wrap gap-2 z-10 select-none">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] uppercase tracking-wider bg-warm-white/5 px-2 py-0.5 rounded text-warm-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Seamless Layout Morph Expanded Modal */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <>
              {/* Dark Ambient Backdrop Filter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 z-50 bg-pure-black/80 backdrop-blur-md cursor-zoom-out"
              />

              {/* Expanded Card Panel */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  layoutId={`card-container-${selectedProject.id}`}
                  className="w-full max-w-2xl bg-[#090909] border border-warm-white/15 rounded-3xl overflow-hidden pointer-events-auto shadow-2xl relative max-h-[90vh] flex flex-col justify-between"
                >
                  {/* Modal Header */}
                  <div className="p-6 md:p-8 flex justify-between items-start border-b border-warm-white/10">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neon-blue block mb-1">
                        {selectedProject.category}
                      </span>
                      <h3 className="font-syne font-black text-2xl md:text-3xl text-warm-white uppercase">
                        {selectedProject.title}
                      </h3>
                      <p className="font-space text-xs text-warm-white/60 mt-1">
                        {selectedProject.subtitle}
                      </p>
                    </div>
                    
                    {/* Close Trigger */}
                    <button
                      onClick={() => setSelectedId(null)}
                      className="w-9 h-9 rounded-full border border-warm-white/15 flex items-center justify-center text-warm-white/50 hover:text-warm-white hover:border-warm-white/40 transition-all active:scale-90"
                      aria-label="Close modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Scrollable Modal Content */}
                  <div className="p-6 md:p-8 overflow-y-auto flex-grow flex flex-col gap-6">
                    {/* Interface Showcase */}
                    <div className="relative w-full aspect-video rounded-2xl border border-warm-white/10 bg-pure-black overflow-hidden shadow-inner">
                      {selectedProject.interfaceMockup}
                    </div>

                    {/* Detailed Narrative */}
                    <div className="flex flex-col gap-4">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-warm-white/40 flex items-center gap-1.5">
                        <Cpu size={12} className="text-neon-blue" />
                        SYSTEM NARRATIVE
                      </h4>
                      <p className="font-space text-sm md:text-base leading-relaxed text-warm-white/80">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Highlights Bulleting */}
                    <div className="flex flex-col gap-3">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-warm-white/40">
                        // IMPLEMENTATION_KEY_HIGHLIGHTS
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {selectedProject.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2.5 font-space text-xs md:text-sm text-warm-white/70">
                            <span 
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: selectedProject.accentColor }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Full Stack Tech Stack Tags */}
                    <div className="flex flex-col gap-3">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-warm-white/40">
                        // STACK_ARCHITECTURE
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[9px] md:text-xs uppercase tracking-widest bg-warm-white/5 border border-warm-white/10 px-2.5 py-1 rounded-md text-warm-white"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Controls */}
                  <div className="p-6 md:p-8 bg-[#070707] border-t border-warm-white/10 flex justify-between gap-4 font-mono text-xs">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-neon-blue hover:text-warm-white transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Globe size={14} />
                      <span>LIVE DEMO</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-warm-white/60 hover:text-warm-white transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span>SOURCE CODE</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
