import AnimatedBackground from '@/components/background/AnimatedBackground';
import { Button, Container } from '@/components/ui';

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <Container className="text-center">
        <h1 className="text-6xl font-bold md:text-8xl">
          Portfolio OS
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-xl text-[var(--muted)]">
          Building the future, one interaction at a time.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button>Explore</Button>
          <Button variant="secondary">Resume</Button>
        </div>
      </Container>
    </main>
  );
}