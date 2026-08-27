'use client';

import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Code2,
  Database,
  Rocket,
  Search,
  Wrench,
} from 'lucide-react';

import { usePortfolio } from '@/stores/portfolio-store';

const capabilities = [
  {
    icon: BrainCircuit,
    title: 'Intelligence',
    description: 'ML models, AI systems, experimentation',
  },
  {
    icon: Code2,
    title: 'Software',
    description: 'Full-stack applications and backend systems',
  },
  {
    icon: Database,
    title: 'Data',
    description: 'Analysis, pipelines, features and insights',
  },
];

const process = [
  {
    number: '01',
    icon: Search,
    title: 'Understand',
    description: 'Break the problem down.',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Build',
    description: 'Turn the idea into a system.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Refine',
    description: 'Test, iterate and improve.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Ship',
    description: 'Make it usable in the real world.',
  },
];

export default function AboutSection() {
  const { osEntered } = usePortfolio();

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.035] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 20,
          }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
            05 — About
          </p>

          <span className="h-px w-12 bg-white/10" />
        </motion.div>

        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 30,
          }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl"
        >
          <p className="text-3xl font-medium leading-tight tracking-tight text-white/90 md:text-6xl md:leading-[1.05]">
            I like building things that sit at the intersection of{' '}
            <span className="text-white">
              intelligence, software, and real-world problems.
            </span>
          </p>

          <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
            My work spans data science, machine learning, full-stack
            development, and AI-powered applications. I enjoy taking
            an idea from a rough concept to something people can
            actually interact with.
          </p>
        </motion.div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 30,
          }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-20 grid gap-4 md:grid-cols-3"
        >
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/[0.04] blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon
                        size={18}
                        className="text-emerald-300/80"
                      />
                    </div>

                    <span className="font-mono text-[10px] text-white/20">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white/90">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        

        {/* Current focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 20,
          }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
              Currently exploring
            </p>

            <p className="mt-3 text-sm text-white/60">
              AI engineering · intelligent interfaces · scalable software
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/60">
              Always building
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
