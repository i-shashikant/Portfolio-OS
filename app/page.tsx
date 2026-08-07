// app/page.tsx

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Container className="text-center">
        <h1 className="mb-6 text-6xl font-bold">
          Portfolio OS
        </h1>

        <p className="mb-8 text-xl text-[var(--muted)]">
          Building the future, one interaction at a time.
        </p>

        <Button>Let's Build 🚀</Button>
      </Container>
    </main>
  );
}