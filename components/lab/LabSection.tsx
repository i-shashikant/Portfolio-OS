'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';

const experiments = [
  {
    number: '01',
    title: 'Portfolio AI',
    description:
      'A conversational assistant that understands my projects, skills, experience, and work.',
    tags: ['RAG', 'LLM', 'AI'],
    status: 'Building',
  },
  {
    number: '02',
    title: 'Gesture Control',
    description:
      'Hands-free portfolio navigation using computer vision and real-time hand tracking.',
    tags: ['MediaPipe', 'CV', 'Interaction'],
    status: 'Experiment',
  },
  {
    number: '03',
    title: 'AI Experiments',
    description:
      'A collection of small experiments exploring machine learning, generative AI, and intelligent interfaces.',
    tags: ['Python', 'ML', 'GenAI'],
    status: 'Active',
  },
  {
    number: '04',
    title: 'Automation Lab',
    description:
      'Experiments connecting APIs, AI agents, scheduled workflows, and everyday automation.',
    tags: ['Python', 'APIs', 'Automation'],
    status: 'Exploring',
  },
];

export default function LabSection() {
  const { osEntered } = usePortfolio();

  return (
    <section
      id="lab"
      className="relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/3 top-1/3
          h-[500px] w-[500px]
          rounded-full
          bg-violet-500/[0.035]
          blur-[140px]
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
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
            03
          </span>

          <span className="h-px w-12 bg-white/10" />

          <span className="text-xs uppercase tracking-[0.25em] text-white/30">
            Lab
          </span>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 25,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="mb-20 max-w-3xl"
        >
          <h2 className="text-4xl font-medium tracking-tight text-white/90 md:text-6xl">
            Where ideas become
            <span className="text-white/30"> experiments.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
            Not everything starts as a polished project. This is where I
            prototype ideas, test new technologies, and build things simply
            because they are interesting.
          </p>
        </motion.div>

        {/* Experiments */}
        <div className="grid gap-4 md:grid-cols-2">
          {experiments.map((experiment, index) => (
            <motion.article
              key={experiment.number}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: osEntered ? 1 : 0,
                y: osEntered ? 0 : 30,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15 + index * 0.08,
              }}
              className="
                group
                relative
                min-h-[340px]
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.025]
                p-7
                transition-all
                duration-500
                hover:border-violet-400/20
                hover:bg-white/[0.04]
                md:p-9
              "
            >
              {/* Hover glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-violet-500/[0.06]
                  blur-[80px]
                  transition-transform
                  duration-700
                  group-hover:scale-125
                "
              />

              <div className="relative flex h-full flex-col justify-between">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/20">
                    {experiment.number}
                  </span>

                  <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-400/50">
                    {experiment.status}
                  </span>
                </div>

                {/* Main */}
                <div className="mt-16">
                  <h3 className="text-3xl font-medium tracking-tight text-white/85 transition-colors duration-300 group-hover:text-white">
                    {experiment.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/30">
                    {experiment.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {experiment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-lg
                          border border-white/10
                          bg-black/20
                          px-2.5
                          py-1
                          text-[10px]
                          text-white/35
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="shrink-0 text-sm text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/60">
                    →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: osEntered ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="mt-8 flex items-center justify-between"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/15">
            EXPERIMENTS / 04
          </span>

          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/30">
            ACTIVE
          </span>
        </motion.div>
      </div>
    </section>
  );
}