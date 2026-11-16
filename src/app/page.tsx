'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PlayableAdsSection from '@/components/sections/PlayableAdsSection';
import FeaturedGamesSection from '@/components/sections/FeaturedGamesSection';
import TechStackSection from '@/components/sections/TechStackSection';
import PerformanceSection from '@/components/sections/PerformanceSection';
import TimelineSection from '@/components/sections/TimelineSection';
import ContactSection from '@/components/sections/ContactSection';
import GridBackground from '@/components/effects/GridBackground';
import MouseSpotlight from '@/components/effects/MouseSpotlight';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Home() {
  return (
    <>

      {/* Background Effects */}
      <GridBackground />
      <MouseSpotlight />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <HeroSection />
        
        <RevealOnScroll direction="up" duration={0.85} delay={0.05}>
          <PlayableAdsSection />
        </RevealOnScroll>

        <RevealOnScroll direction="up" duration={0.85} delay={0.05}>
          <FeaturedGamesSection />
        </RevealOnScroll>

        <RevealOnScroll direction="up" duration={0.85} delay={0.05}>
          <TechStackSection />
        </RevealOnScroll>

        <RevealOnScroll direction="up" duration={0.85} delay={0.05}>
          <PerformanceSection />
        </RevealOnScroll>

        <RevealOnScroll direction="up" duration={0.85} delay={0.05}>
          <TimelineSection />
        </RevealOnScroll>

        <RevealOnScroll direction="up" duration={0.85} delay={0.05}>
          <ContactSection />
        </RevealOnScroll>
      </main>

      <Footer />
    </>
  );
}
