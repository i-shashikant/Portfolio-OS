'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import type { Project } from '@/data/projects';

type ProjectCaseStudyProps = {
  project: Project;
};

export default function ProjectCaseStudy({
  project,
}: ProjectCaseStudyProps) {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl">
          {/* Back */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
          >
            <span>←</span>
            Back to work
          </Link>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-violet-300">
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="mt-8 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl"
          >
            {project.description}
          </motion.p>

          {/* Tech */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {project.technologies.map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/60"
                >
                  {technology}
                </span>
              ),
            )}
          </motion.div>

          {/* Links */}
          <div className="mt-10 flex flex-wrap gap-4">
            {project.github &&
              project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-6 py-3 text-sm transition-all hover:border-white/20 hover:bg-white/10"
                >
                  GitHub ↗
                </a>
              )}

            {project.live &&
              project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-violet-500 px-6 py-3 text-sm transition-all hover:bg-violet-400"
                >
                  Live Demo ↗
                </a>
              )}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="border-t border-white/10 px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-32">
              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Case Study
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/40">
                <a
                  href="#overview"
                  className="block transition-colors hover:text-white"
                >
                  Overview
                </a>

                <a
                  href="#technology"
                  className="block transition-colors hover:text-white"
                >
                  Technology
                </a>

                <a
                  href="#architecture"
                  className="block transition-colors hover:text-white"
                >
                  Architecture
                </a>

                <a
                  href="#features"
                  className="block transition-colors hover:text-white"
                >
                  Features
                </a>

                <a
                  href="#challenges"
                  className="block transition-colors hover:text-white"
                >
                  Challenges
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-24">
            {/* Overview */}
            <section id="overview">
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
                01 — Overview
              </p>

              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
                What I built
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
                {project.description}
              </p>
            </section>

            {/* Technology */}
            <section id="technology">
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
                02 — Technology
              </p>

              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
                Built with
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {project.technologies.map(
                  (technology) => (
                    <div
                      key={technology}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white/70"
                    >
                      {technology}
                    </div>
                  ),
                )}
              </div>
            </section>

            {/* Architecture */}
            <section id="architecture">
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
                03 — Architecture
              </p>

              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
                How it works
              </h2>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-center">
                  {project.technologies.map(
                    (technology, index) => (
                      <div
                        key={technology}
                        className="flex items-center gap-4"
                      >
                        <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white/60">
                          {technology}
                        </span>

                        {index <
                          project.technologies.length - 1 && (
                          <span className="hidden text-white/20 md:block">
                            →
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            {/* Features */}
            <section id="features">
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
                04 — Features
              </p>

              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
                What it does
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Feature title="Responsive interface" />
                <Feature title="Role-based architecture" />
                <Feature title="Data-driven workflows" />
                <Feature title="Real-world use cases" />
              </div>
            </section>

            {/* Challenges */}
            <section id="challenges">
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
                05 — Challenges
              </p>

              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
                What I learned
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
                This project helped me work through real
                engineering challenges involving architecture,
                debugging, state management, data handling,
                and building features that work together as
                one system.
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* Bottom navigation */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/#projects"
            className="text-sm text-white/40 transition-colors hover:text-white"
          >
            ← All projects
          </Link>

          <span className="text-sm text-white/20">
            Portfolio OS
          </span>
        </div>
      </section>
    </main>
  );
}

function Feature({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4 h-2 w-2 rounded-full bg-violet-400" />

      <h3 className="font-medium text-white/80">
        {title}
      </h3>
    </div>
  );
}