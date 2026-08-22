import Hero from '@/components/hero/Hero';
import Navbar from '@/components/layout/Navbar';
import ProjectsSection from '@/components/projects/ProjectsSection';

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <ProjectsSection />

      <section
        id="about"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-bold">About</h2>
      </section>

      <section
        id="lab"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-bold">Lab</h2>
      </section>

      <section
        id="contact"
        className="flex min-h-screen items-center justify-center"
      >
        <h2 className="text-4xl font-bold">Contact</h2>
      </section>
    </main>
  );
}