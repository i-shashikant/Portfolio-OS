import { notFound } from 'next/navigation';

import ProjectCaseStudy from '@/components/projects/ProjectCaseStudy';
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

  const project = projects.find(
    (project) => project.slug === slug,
  );

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}