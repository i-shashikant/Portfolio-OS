import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/data/projects';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-32 md:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to work
        </Link>

        {/* Header */}
        <div className="mt-16">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-400">
            {project.category}
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            {project.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mt-10 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-10 flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
            >
              GitHub
              <ArrowUpRight size={15} />
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
            >
              Live Demo
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>

        {/* Case Study */}
        {project.caseStudy && (
          <div className="mt-24 space-y-20">

            {/* Overview */}
            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Overview
              </p>

              <p className="mt-5 max-w-3xl text-xl leading-9 text-white/70">
                {project.caseStudy.overview}
              </p>
            </section>

            {/* Problem / Solution */}
            <div className="grid gap-12 md:grid-cols-2">
              <section>
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Problem
                </p>

                <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                  {project.caseStudy.problem}
                </p>
              </section>

              <section>
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Solution
                </p>

                <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                  {project.caseStudy.solution}
                </p>
              </section>
            </div>

            {/* Highlights */}
            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Highlights
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {project.caseStudy.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm text-white/60"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

      </div>
    </main>
  );
}