import Hero from '@/components/hero/Hero';
import PageTransition from '@/components/transitions/PageTransition';
import ProjectsSection from '../components/projects/ProjectsSection';
// import ProjectCarousel from '@/components/projects/ProjectCarousel';
import ProjectShowcase from '@/components/projects/ProjectShowcase';
import AboutSection from '@/components/about/AboutSection';
import SkillsSection from '@/components/skills/SkillsSection';
import LabSection from "@/components/lab/LabSection";
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/layout/Footer';
import PortfolioAI from '@/components/ai/PortfolioAI';




export default function Home() {
  return (
    <PageTransition>
      <main>

        <section id="hero">
          <Hero />
        </section>

        <ProjectsSection />


        <section
          id="projects"
          className="px-6 py-32 md:py-40"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-16">
              <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
                01 — Work
              </p>

              <h2 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
                Selected projects.
              </h2>

              <p className="mt-5 max-w-xl text-[var(--muted)]">
                Systems, applications and experiments built from
                ideas into working products.
              </p>
            </div>

            <ProjectShowcase />
          </div>
        </section> 
        <AboutSection />

        <SkillsSection />

        <LabSection />

        <ContactSection />
        <Footer />
        <PortfolioAI />
      </main>
    </PageTransition>
  );
}