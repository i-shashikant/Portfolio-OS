'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

import { EXPERIENCE_DATA, ExperienceItem } from '@/data/experience';

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState<string | null>(
    EXPERIENCE_DATA[0]?.id ?? null
  );

  const activeExperience =
    EXPERIENCE_DATA.find((item) => item.id === activeId) ?? null;

  return (
    <section id="experience" className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
            02 — Experience
          </p>

          <h2 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
            Things I&apos;ve worked on.
          </h2>

          <p className="mt-5 max-w-2xl text-[var(--muted)]">
            My experience spans content, computing, data science, and
            technology — with a focus on continuously learning and building.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Timeline / selector */}
          <div className="space-y-3">
            {EXPERIENCE_DATA.map((experience, index) => {
              const isActive = experience.id === activeId;

              return (
                <motion.button
                  key={experience.id}
                  type="button"
                  onClick={() => setActiveId(experience.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.985 }}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-violet-400/30 bg-violet-500/[0.08] shadow-[0_0_40px_rgba(139,92,246,0.08)]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Active indicator */}
                  <motion.div
                    initial={false}
                    animate={{
                      scaleY: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    className="absolute left-0 top-0 h-full w-1 origin-top rounded-full bg-violet-400"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {experience.type}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold text-white/90">
                        {experience.role}
                      </h3>

                      <p className="mt-1 text-sm text-violet-300/80">
                        {experience.organization}
                      </p>
                    </div>

                    <ArrowUpRight
                      className={`mt-1 h-4 w-4 shrink-0 transition-all ${
                        isActive
                          ? 'translate-x-0.5 -translate-y-0.5 text-violet-300'
                          : 'text-white/20 group-hover:text-white/50'
                      }`}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-white/35">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={12} />
                      {experience.startDate} — {experience.endDate}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {experience.location}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Reactive detail panel */}
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#090b18]">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

            <AnimatePresence mode="wait">
              {activeExperience && (
                <motion.div
                  key={activeExperience.id}
                  initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35 }}
                  className="relative h-full p-7 md:p-9"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <BriefcaseBusiness
                        size={20}
                        className="text-violet-300"
                      />
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                        {activeExperience.type}
                      </p>

                      <p className="text-xs text-white/40">
                        {activeExperience.startDate} —{' '}
                        {activeExperience.endDate}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    {activeExperience.role}
                  </h3>

                  <p className="mt-2 text-lg text-violet-300">
                    {activeExperience.organization}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
                    <MapPin size={13} />
                    {activeExperience.location}
                  </div>

                  <p className="mt-8 max-w-2xl text-sm leading-7 text-white/60">
                    {activeExperience.description}
                  </p>

                  <div className="mt-8">
                    <div className="mb-4 flex items-center gap-2">
                      <Sparkles size={14} className="text-violet-300" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                        What I worked on
                      </span>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {activeExperience.highlights.map((highlight) => (
                        <motion.div
                          key={highlight}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25 }}
                          className="rounded-xl border border-white/5 bg-white/[0.025] p-3 text-xs leading-5 text-white/65"
                        >
                          <span className="mr-2 text-violet-400">+</span>
                          {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}