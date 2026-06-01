'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Mail, Send, CheckCircle } from 'lucide-react';

const ContactCanvas = dynamic(() => import('./ContactCanvas'), { ssr: false });

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate server submission API call
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 px-6 bg-pure-black border-b border-warm-white/10 flex flex-col justify-between overflow-hidden"
    >
      {/* Abstract neural network backdrop map */}
      <ContactCanvas />

      <div className="max-w-5xl w-full mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-warm-white/10 pb-6 select-none">
          <div>
            <span className="font-mono text-xs text-cyber-green uppercase tracking-widest block mb-2">
              [ 05 // CONNECTION ]
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-6xl uppercase tracking-tighter">
              GET IN TOUCH
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-warm-white/40">
            <span className="text-[10px] tracking-widest font-mono font-medium uppercase">
              SECURE PROTOCOL
            </span>
            <span className="w-12 h-[1px] bg-warm-white/20" />
            <span className="text-sm font-syne font-bold text-japanese-red vertical-text">
              連絡
            </span>
          </div>
        </div>

        {/* Contact Layout: Split Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Info & Magnetic Social Links (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-8 select-none">
            <div className="flex flex-col gap-4">
              <h3 className="font-syne font-bold text-xl uppercase tracking-tight text-warm-white">
                COLLABORATIVE DIALOGUES
              </h3>
              <p className="font-space text-sm md:text-base leading-relaxed text-warm-white/70">
                Whether you have an ambitious platform build, a core machine integration, or want to discuss AI models and creative shader designs—connect directly.
              </p>
            </div>

            {/* Social Grid */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-warm-white/40">
                // EXTERNAL_VECTORS
              </span>
              
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-effect group flex items-center gap-4 border border-warm-white/10 hover:border-neon-blue bg-warm-white/[0.01] px-5 py-3 rounded-xl transition-all duration-300 w-fit hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-warm-white/60 group-hover:text-neon-blue transition-colors">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span className="font-mono text-xs uppercase tracking-wider text-warm-white/80 group-hover:text-neon-blue transition-colors">
                    GITHUB.COM
                  </span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-effect group flex items-center gap-4 border border-warm-white/10 hover:border-neon-purple bg-warm-white/[0.01] px-5 py-3 rounded-xl transition-all duration-300 w-fit hover:shadow-[0_0_15px_rgba(189,0,255,0.15)]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-warm-white/60 group-hover:text-neon-purple transition-colors">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="font-mono text-xs uppercase tracking-wider text-warm-white/80 group-hover:text-neon-purple transition-colors">
                    LINKEDIN.COM
                  </span>
                </a>

                <a
                  href="mailto:sairaju@example.com"
                  className="magnetic-effect group flex items-center gap-4 border border-warm-white/10 hover:border-cyber-green bg-warm-white/[0.01] px-5 py-3 rounded-xl transition-all duration-300 w-fit hover:shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                >
                  <Mail size={18} className="text-warm-white/60 group-hover:text-cyber-green transition-colors" />
                  <span className="font-mono text-xs uppercase tracking-wider text-warm-white/80 group-hover:text-cyber-green transition-colors">
                    SAIRAJU@EMAIL
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Card (7 Cols) */}
          <div className="md:col-span-7 border border-warm-white/10 bg-warm-white/[0.01] p-8 md:p-12 rounded-3xl backdrop-blur-sm relative">
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center select-none">
                <CheckCircle size={48} className="text-cyber-green mb-4 animate-bounce" />
                <h3 className="font-syne font-bold text-2xl uppercase tracking-tight text-warm-white mb-2">
                  TRANSMISSION SUCCESSFUL
                </h3>
                <p className="font-space text-xs text-warm-white/60 uppercase tracking-widest max-w-sm leading-relaxed">
                  Thank you. Your project brief has bypassed filters and reached the primary terminal queue. Expected callback rate: 100%.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-8 font-mono text-[9px] uppercase tracking-widest text-neon-blue border border-neon-blue/20 hover:border-neon-blue/60 px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  SEND NEW MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                {/* Name Input */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="name"
                    id="form-name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block py-3 px-0 w-full text-sm text-warm-white bg-transparent border-0 border-b-2 border-warm-white/15 appearance-none focus:outline-none focus:ring-0 focus:border-neon-blue peer transition-colors font-space"
                    placeholder=" "
                  />
                  <label
                    htmlFor="form-name"
                    className="peer-focus:font-medium absolute text-xs uppercase tracking-widest text-warm-white/40 duration-300 transform -translate-y-6 scale-75 top-3.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-neon-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-mono"
                  >
                    IDENTIFIER / Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative z-0 w-full group">
                  <input
                    type="email"
                    name="email"
                    id="form-email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block py-3 px-0 w-full text-sm text-warm-white bg-transparent border-0 border-b-2 border-warm-white/15 appearance-none focus:outline-none focus:ring-0 focus:border-neon-purple peer transition-colors font-space"
                    placeholder=" "
                  />
                  <label
                    htmlFor="form-email"
                    className="peer-focus:font-medium absolute text-xs uppercase tracking-widest text-warm-white/40 duration-300 transform -translate-y-6 scale-75 top-3.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-neon-purple peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-mono"
                  >
                    RETURN LINK / Email
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative z-0 w-full group">
                  <textarea
                    name="message"
                    id="form-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="block py-3 px-0 w-full text-sm text-warm-white bg-transparent border-0 border-b-2 border-warm-white/15 appearance-none focus:outline-none focus:ring-0 focus:border-cyber-green peer transition-colors font-space resize-none"
                    placeholder=" "
                  />
                  <label
                    htmlFor="form-message"
                    className="peer-focus:font-medium absolute text-xs uppercase tracking-widest text-warm-white/40 duration-300 transform -translate-y-6 scale-75 top-3.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyber-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-mono"
                  >
                    SYSTEM BRIEF / Project Details
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="magnetic-effect flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-widest text-pure-black bg-neon-blue rounded-full transition-all duration-300 hover:bg-neon-purple disabled:opacity-40 disabled:hover:bg-neon-blue shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_25px_rgba(189,0,255,0.4)] active:scale-95 w-full sm:w-fit"
                >
                  {loading ? (
                    <span className="font-mono animate-pulse">TRANSMITTING...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>TRANSMIT BRIEF</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Minimal Editorial Footer */}
        <footer className="border-t border-warm-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-warm-white/30 font-mono text-[9px] uppercase tracking-widest select-none pointer-events-none">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>© A. SAIRAJU • 2026. ALL CORE VECTORS ENGAGED.</span>
            <span className="hidden md:inline-block">/</span>
            <span>BUILD v2.5.9</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-warm-white/20 select-none">TOKYO SUBWAY MAP TIMELINE STANDARD</span>
            <span className="text-japanese-red font-bold font-syne text-[11px] vertical-text select-none">
              終
            </span>
          </div>
        </footer>

      </div>
    </section>
  );
}
