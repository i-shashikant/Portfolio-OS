import Hero from '@/components/hero/Hero';
import ProjectsSection from '../components/projects/ProjectsSection';
import PageTransition from '@/components/transitions/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <main>

        <Hero />

        <ProjectsSection />

        <section
          id="about"
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="text-4xl font-bold">
            About
          </h2>
        </section>

        <section
          id="lab"
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="text-4xl font-bold">
            Lab
          </h2>
        </section>

        <section
          id="contact"
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="text-4xl font-bold">
            Contact
          </h2>
        </section>
      </main>
    </PageTransition>
  );
}