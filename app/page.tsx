import Hero from '@/components/hero/Hero';
import PageTransition from '@/components/transitions/PageTransition';
import ProjectsSection from '../components/projects/ProjectsSection';
import AboutSection from '@/components/about/AboutSection';
import SkillsSection from '@/components/skills/SkillsSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/layout/Footer';
import PortfolioAI from '@/components/ai/PortfolioAI';
import ExperienceSection from '@/components/experience/ExperienceSection';
import HowIWorkSection from '@/components/HowIWork/HowIWorkSection';

// 'use client';

// import { usePortfolioTheme } from '@/hooks/usePortfolioTheme';




export default function Home() {
  // usePortfolioTheme();
  return (
    <PageTransition>
      <main>

          <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <HowIWorkSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
        <PortfolioAI />
      </main>
    </PageTransition>
  );
}