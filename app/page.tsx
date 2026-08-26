import Hero from '@/components/hero/Hero';
import PageTransition from '@/components/transitions/PageTransition';
import ProjectsSection from '../components/projects/ProjectsSection';
import AboutSection from '@/components/about/AboutSection';
import SkillsSection from '@/components/skills/SkillsSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/layout/Footer';
import PortfolioAI from '@/components/ai/PortfolioAI';
import ExperienceSection from '@/components/experience/ExperienceSection';





export default function Home() {
  return (
    <PageTransition>
      <main>

        <section id="hero">
          <Hero />
        </section>

        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />

        <SkillsSection />

        <ContactSection />
        <Footer />
        <PortfolioAI />
      </main>
    </PageTransition>
  );
}