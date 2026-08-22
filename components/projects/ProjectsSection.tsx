import Container from '@/components/ui/Container';
import { projects } from '@/data/projects';

import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-28 py-32 md:py-40"
    >
      <Container>
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
            Selected Work
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            Things I&apos;ve built.
          </h2>

          <p className="mt-6 text-base leading-7 text-[var(--muted)] md:text-lg">
            A collection of projects where I&apos;ve worked across
            machine learning, full-stack development, backend
            systems, and product engineering.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}