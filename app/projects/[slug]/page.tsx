import { notFound } from 'next/navigation';

import ProjectCaseStudy from '@/components/projects/ProjectCaseStudy';
import PageTransition from '@/components/transitions/PageTransition';
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

  return (
  <PageTransition>
    <ProjectCaseStudy project={project} />
  </PageTransition>
);
}