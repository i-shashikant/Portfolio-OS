import Hero from '@/components/hero/Hero';

export default function Home() {
  return (
    <main>
      <Hero />

      <section
        id="projects"
        className="flex min-h-screen items-center justify-center"
      >
        <p className="text-[var(--muted)]">
          Projects section coming next...
        </p>
      </section>
    </main>
  );
}