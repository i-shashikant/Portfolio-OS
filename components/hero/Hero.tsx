'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { portfolio } from '@/data/portfolio';
import AnimatedBackground from '@/components/background/AnimatedBackground';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % portfolio.roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <AnimatedBackground />

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 text-lg font-medium text-[var(--muted)] md:text-xl"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl"
          >
            {portfolio.name}
            <span className="text-[var(--primary)]">.</span>
          </motion.h1>

          {/* Animated Role */}
          <div className="mt-8 h-12 overflow-hidden md:h-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={portfolio.roles[roleIndex]}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45 }}
                className="text-2xl font-semibold md:text-4xl"
              >
                {portfolio.roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg"
          >
            {portfolio.bio}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button
              onClick={() => {
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore My Work
            </Button>

            <Button
              variant="secondary"
              onClick={() => window.open(portfolio.resume, '_blank')}
            >
              View Resume
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-20 flex flex-col items-center gap-3 text-sm text-[var(--muted)]"
          >
            <span>Scroll to explore</span>

            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-8 w-px bg-white/30"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}