'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', id: '#home' },
  { label: 'About', id: '#about' },
  { label: 'Skills', id: '#skills' },
  { label: 'Projects', id: '#projects' },
  { label: 'Experience', id: '#experience' },
  { label: 'Contact', id: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section on scroll
      const sections = navLinks.map(link => document.querySelector(link.id));
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;

        if (scrollPos >= top && scrollPos <= bottom) {
          setActiveSection(`#${section.id}`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);

    // Scroll using global Lenis instance
    const lenis = (window as any).lenis;
    const targetElement = document.querySelector(id);
    if (lenis && targetElement) {
      lenis.scrollTo(targetElement, {
        offset: -20,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4`}
      >
        <nav
          className={`flex items-center justify-between w-full max-w-5xl h-14 px-6 rounded-full border border-warm-white/10 backdrop-blur-md bg-pure-black/30 transition-all duration-300 ${
            scrolled ? 'border-neon-purple/20 bg-pure-black/60 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' : ''
          }`}
        >
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick('#home', e)}
            className="font-syne font-extrabold text-lg text-warm-white tracking-widest hover:text-neon-blue transition-colors magnetic-effect"
            id="nav-logo"
          >
            S.
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.id}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`magnetic-effect px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-full ${
                  activeSection === link.id
                    ? 'text-pure-black bg-warm-white font-semibold'
                    : 'text-warm-white/60 hover:text-warm-white hover:bg-warm-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Glowing Action Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick('#contact', e)}
              className="magnetic-effect relative px-5 py-2 text-xs uppercase tracking-wider text-pure-black bg-neon-blue font-bold rounded-full hover:bg-neon-purple transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_20px_rgba(189,0,255,0.5)] active:scale-95"
            >
              Connect
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-warm-white hover:text-neon-blue transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-pure-black/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="absolute top-6 left-6 font-syne font-extrabold text-2xl tracking-widest text-warm-white">
          SAIRAJU.
        </div>
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.id}
              onClick={(e) => handleNavClick(link.id, e)}
              className={`font-syne text-3xl uppercase tracking-widest transition-colors ${
                activeSection === link.id ? 'text-neon-blue font-bold' : 'text-warm-white/60 hover:text-warm-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick('#contact', e)}
            className="mt-6 px-8 py-3 text-sm uppercase tracking-widest text-pure-black bg-neon-blue font-bold rounded-full hover:bg-neon-purple transition-colors shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </>
  );
}
