import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SkillsGalaxy from '@/components/SkillsGalaxy';
import ProjectsBento from '@/components/ProjectsBento';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <SmoothScroll>
      {/* Premium WebGL/Canvas stretching pointer trails */}
      <CustomCursor />
      
      {/* Floating glass navigation control */}
      <Navbar />

      <main className="w-full bg-pure-black relative overflow-x-hidden">
        {/* Section 00: The Hook Viewport */}
        <Hero />

        {/* Section 01: Asymmetric Collage Editorial */}
        <About />

        {/* Section 02: 3D Constellations Galaxy */}
        <SkillsGalaxy />

        {/* Section 03: Spotlight Bento Projects Grid */}
        <ProjectsBento />

        {/* Section 04: Japanese Metro Transit Timeline */}
        <ExperienceTimeline />

        {/* Section 05: Frictionless Connection Hub & Credits */}
        <Contact />
      </main>
    </SmoothScroll>
  );
}
