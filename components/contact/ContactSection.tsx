'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';

export default function ContactSection() {
  const { osEntered } = usePortfolio();

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[600px] w-[600px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-violet-500/[0.04]
          blur-[150px]
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 20,
          }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/70">
            04
          </span>

          <span className="h-px w-12 bg-white/10" />

          <span className="text-xs uppercase tracking-[0.25em] text-white/30">
            Contact
          </span>
        </motion.div>

        {/* Main */}
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
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border border-white/10
            bg-white/[0.025]
            px-7 py-16
            md:px-16 md:py-24
          "
        >
          {/* Grid */}
          <div
            className="
              pointer-events-none absolute inset-0
              opacity-[0.025]
              [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
              [background-size:64px_64px]
            "
          />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-300/50">
              Have an idea?
            </p>

            <h2 className="mt-6 max-w-4xl text-5xl font-medium tracking-tight text-white/90 md:text-7xl">
              Let&apos;s build something
              <span className="text-white/25"> interesting.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/35 md:text-lg">
              Whether it&apos;s an internship, a project, an experiment, or just
              an interesting problem worth solving — I&apos;m always open to
              building something meaningful.
            </p>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:your-email@example.com"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-7 py-3.5
                  text-sm
                  font-medium
                  text-black
                  transition-transform
                  duration-300
                  hover:scale-[1.03]
                "
              >
                Get in touch

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="https://github.com/i-shashikant"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border border-white/10
                  bg-white/[0.03]
                  px-7 py-3.5
                  text-sm
                  text-white/50
                  transition-all
                  duration-300
                  hover:border-white/20
                  hover:bg-white/[0.07]
                  hover:text-white
                "
              >
                GitHub
                <span>↗</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: osEntered ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="mt-8 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-xs uppercase tracking-[0.2em] text-white/25">
            Open to opportunities
          </span>
        </motion.div>
      </div>
    </section>
  );
}