'use client';

import { motion } from 'framer-motion';

const highlights = [
  {
    value: '3+',
    label: 'Major Projects',
  },
  {
    value: 'AI',
    label: 'Focused Development',
  },
  {
    value: 'Full',
    label: 'Stack Capabilities',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen px-6 py-32 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-violet-400" />

          <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            About
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl"
        >
          I like building things that sit between{' '}
          <span className="text-white/40">
            data, software, and intelligence.
          </span>
        </motion.h2>

        {/* Main content */}
        <div className="mt-20 grid gap-12 md:grid-cols-[1.4fr_0.8fr]">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
              I&apos;m Shashikant, a developer and data science student who
              enjoys turning ideas into working products.
            </p>

            <p className="max-w-2xl text-base leading-8 text-white/50">
              My work spans full-stack applications, data-driven systems,
              machine learning experiments, and interactive web experiences.
              I&apos;m particularly interested in the space where software
              engineering and AI meet.
            </p>

            <p className="max-w-2xl text-base leading-8 text-white/50">
              I&apos;m constantly experimenting with new technologies,
              architectures, and interaction patterns — including this
              portfolio itself.
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-3"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + index * 0.1,
                }}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-5 transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.045]"
              >
                <div>
                  <p className="text-2xl font-semibold">
                    {item.value}
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    {item.label}
                  </p>
                </div>

                <span className="text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}