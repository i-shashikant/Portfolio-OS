'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';

const facts = [
  {
    label: 'Focus',
    value: 'AI · Data · Software',
  },
  {
    label: 'Building',
    value: 'Products & Experiments',
  },
  {
    label: 'Stack',
    value: 'Python · TypeScript · React',
  },
  {
    label: 'Currently',
    value: 'Learning · Shipping · Improving',
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
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-violet-500/[0.035]
          blur-[140px]
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: osEntered ? 1 : 0,
              y: osEntered ? 0 : 20,
            }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex items-center gap-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/70">
              01
            </span>

            <span className="h-px w-12 bg-white/10" />

            <span className="text-xs uppercase tracking-[0.25em] text-white/30">
              About
            </span>
          </motion.div>

        {/* Main content */}
        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: osEntered ? 1 : 0,
              y: osEntered ? 0 : 30,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
          >
            <p className="max-w-4xl text-3xl font-medium leading-tight tracking-tight text-white/90 md:text-5xl md:leading-[1.08]">
              I like building things that sit at the intersection of{' '}
              <span className="text-white">
                intelligence, software, and real-world problems.
              </span>
            </p>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
              My work spans data science, machine learning, full-stack
              development, and AI-powered applications. I enjoy taking an
              idea from a rough concept to something people can actually
              interact with.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/30 md:text-lg">
              I care about understanding how things work, building them
              properly, and continuously pushing the quality of what I ship.
            </p>
          </motion.div>

          {/* Right — facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: osEntered ? 1 : 0,
              x: osEntered ? 0 : 30,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="self-start"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
              {facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={`
                    group flex flex-col gap-2
                    px-6 py-6
                    transition-colors duration-300
                    hover:bg-white/[0.025]
                    md:px-7
                    ${
                      index !== facts.length - 1
                        ? 'border-b border-white/10'
                        : ''
                    }
                  `}
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                    {fact.label}
                  </span>

                  <span className="text-sm text-white/65 transition-colors duration-300 group-hover:text-white">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: osEntered ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          className="mt-24 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <span className="font-mono text-xs text-white/20">
              SHASHIKANT / PORTFOLIO OS
            </span>

            <span className="text-xs text-white/20">
              Building in public, one experiment at a time.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}