'use client';

import { motion } from 'framer-motion';
import {
  Search,
  Hammer,
  SlidersHorizontal,
  Rocket,
  ArrowUpRight,
} from 'lucide-react';

const PROCESS = [
  {
    number: '01',
    label: 'DISCOVER',
    title: 'Understand',
    description:
      'Break the problem down, understand the users, and identify what actually needs to be solved.',
    detail: 'Research · Context · Architecture',
    icon: Search,
  },
  {
    number: '02',
    label: 'ENGINEER',
    title: 'Build',
    description:
      'Turn the idea into a working system with the right technologies, architecture, and foundations.',
    detail: 'Code · Systems · Integration',
    icon: Hammer,
  },
  {
    number: '03',
    label: 'ITERATE',
    title: 'Refine',
    description:
      'Test what I built, find weak points, improve the experience, and keep iterating.',
    detail: 'Testing · Feedback · Optimization',
    icon: SlidersHorizontal,
  },
  {
    number: '04',
    label: 'DELIVER',
    title: 'Ship',
    description:
      'Take the finished system out of the development environment and make it usable in the real world.',
    detail: 'Deploy · Monitor · Improve',
    icon: Rocket,
  },
];

export default function HowIWorkSection() {
  return (
    <section
      id="how-i-work"
      className="relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Background grid */}
      <div
        className="
          pointer-events-none absolute inset-0
          opacity-[0.035]
          [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* Ambient glows */}
      <div
        className="
          pointer-events-none absolute
          -left-40 top-20
          h-[450px] w-[450px]
          rounded-full
          bg-[var(--primary)]/[0.06]
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-40 bottom-10
          h-[400px] w-[400px]
          rounded-full
          bg-[var(--secondary)]/[0.04]
          blur-[140px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4">
            <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
            03 — How I Work
          </p>

            <span className="h-px w-12 bg-white/10" />

            
          </div>

          <div className="mt-7 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h2 className="max-w-4xl text-4xl font-medium tracking-tight text-white/90 md:text-6xl">
                From problem
                <span className="text-white/25"> to product.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                I approach projects as systems — understand the problem,
                engineer the solution, iterate on the details, and ship
                something people can actually use.
              </p>
            </div>

            {/* System indicator */}
            <div className="hidden shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 lg:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                System / Iterating
              </span>
            </div>
          </div>
        </motion.div>

        {/* Process */}
        <div className="relative">
          {/* Connection line */}
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[72px] hidden h-px bg-white/10 lg:block" />

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              delay: 0.4,
              ease: 'easeOut',
            }}
            className="
              pointer-events-none absolute
              left-[8%] right-[8%] top-[72px]
              hidden h-px origin-left
              bg-gradient-to-r
              from-[var(--primary)]/50
              via-[var(--secondary)]/30
              to-emerald-400/50
              lg:block
            "
          />

          <div className="grid gap-4 lg:grid-cols-4">
            {PROCESS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                  }}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 22,
                    }}
                    className="
                      relative h-full min-h-[390px]
                      overflow-hidden
                      rounded-3xl
                      border border-white/10
                      bg-[#080a15]/80
                      p-6
                      backdrop-blur-xl
                      transition-all duration-500
                      group-hover:border-[var(--primary)]/30
                      group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                    "
                  >
                    {/* Hover glow */}
                    <div
                      className="
                        pointer-events-none absolute
                        -right-24 -top-24
                        h-56 w-56
                        rounded-full
                        bg-[var(--primary)]/[0.08]
                        blur-3xl
                        opacity-0
                        transition-opacity duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* Top row */}
                    <div className="relative z-10 flex items-start justify-between">
                      <span className="font-mono text-xs tracking-[0.2em] text-[var(--primary)]/70">
                        {step.number}
                      </span>

                      <div
                        className="
                          flex h-10 w-10 items-center justify-center
                          rounded-xl
                          border border-white/10
                          bg-white/[0.035]
                          text-white/35
                          transition-all duration-300
                          group-hover:border-[var(--primary)]/30
                          group-hover:bg-[var(--primary)]/10
                          group-hover:text-[var(--primary)]
                        "
                      >
                        <Icon size={17} strokeWidth={1.6} />
                      </div>
                    </div>

                    {/* Large number */}
                    <div
                      className="
                        pointer-events-none absolute
                        -right-3 top-20
                        select-none
                        font-mono text-[100px]
                        font-bold leading-none
                        text-white/[0.025]
                        transition-all duration-500
                        group-hover:text-[var(--primary)]/[0.06]
                      "
                    >
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-20">
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                        {step.label}
                      </p>

                      <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white/90">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-white/45">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="mb-4 h-px bg-white/5" />

                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">
                          {step.detail}
                        </span>

                        <ArrowUpRight
                          size={15}
                          className="
                            text-white/20
                            transition-all duration-300
                            group-hover:-translate-y-1
                            group-hover:translate-x-1
                            group-hover:text-[var(--primary)]
                          "
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Mobile connector */}
                  {index !== PROCESS.length - 1 && (
                    <div className="mx-auto h-6 w-px bg-gradient-to-b from-white/10 to-transparent lg:hidden" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom system panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="
            mt-10
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-white/[0.02]
          "
        >
          <div className="grid md:grid-cols-3">
            <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                Input
              </p>

              <p className="mt-3 text-sm text-white/65">
                Problems worth solving.
              </p>
            </div>

            <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                Process
              </p>

              <p className="mt-3 text-sm text-white/65">
                Intelligence · Software · Iteration
              </p>
            </div>

            <div className="p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                Output
              </p>

              <p className="mt-3 text-sm text-white/65">
                Useful things that actually work.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer status */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
            SHASHIKANT / PROCESS_ENGINE
          </span>

          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Always building
          </span>
        </div>
      </div>
    </section>
  );
}