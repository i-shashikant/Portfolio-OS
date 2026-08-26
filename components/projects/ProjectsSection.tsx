'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';
import { projects, Project } from '@/data/projects';
import ProjectCaseStudyModal from './ProjectCaseStudyModal';
import LeetCodeWidget from '@/components/widgets/LeetCodeWidget';
import { soundEngine } from '@/lib/sound/soundEngine';
import { ArrowUpRight, Code2, ExternalLink, GitBranch, Filter, Sparkles } from 'lucide-react';

const FILTER_TAGS = ['All', 'Python', 'Flask', 'React', 'Next.js', 'Machine Learning', 'Vue'];

export default function ProjectsSection() {
  const { osEntered, projectFilterTag, setProjectFilterTag, toggleGitHubWidget } = usePortfolio();
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (projectFilterTag === 'All') return projects;
    return projects.filter((p) =>
      p.technologies.some((t) => t.toLowerCase().includes(projectFilterTag.toLowerCase())) ||
      p.category.toLowerCase().includes(projectFilterTag.toLowerCase())
    );
  }, [projectFilterTag]);

  const handleTagSelect = (tag: string) => {
    setProjectFilterTag(tag);
    soundEngine.playClick();
  };

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-32 md:py-40">
      {/* Ambient Radial Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[550px] w-[550px] rounded-full bg-violet-500/[0.04] blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-[450px] w-[450px] rounded-full bg-cyan-500/[0.03] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-violet-400">01</span>
            <span className="h-px w-12 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">Selected Works & Systems</span>
          </div>

          <button
            type="button"
            onClick={toggleGitHubWidget}
            className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 font-mono text-xs text-purple-200 transition-colors hover:bg-purple-500/20"
          >
            <GitBranch size={14} />
            <span>GitHub Live Analytics</span>
          </button>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-14 max-w-3xl"
        >
          <h2 className="text-4xl font-medium tracking-tight text-white/90 md:text-6xl">
            Systems & Applications <span className="text-white/30">built from ideas.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
            Production full-stack web applications, AI models, and real-time backend systems. Click any card to launch the Portfolio OS case study drawer.
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl w-fit"
        >
          {FILTER_TAGS.map((tag) => {
            const isActive = projectFilterTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagSelect(tag)}
                className={`relative rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectTagGlow"
                    className="absolute inset-0 rounded-xl border border-violet-400/30 bg-violet-500/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid (Portfolio OS Signature Cards) */}
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug || project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedModalProject(project);
                }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#080a18] p-7 transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              >
                {/* Glow Overlay */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/70">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-white/40 group-hover:text-violet-300">
                    <span>Inspect</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-white/45 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Micro Tech Tags */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-white/50 group-hover:border-violet-400/20 group-hover:text-violet-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-white/30">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px]">
                  <span className="font-mono text-white/30">Portfolio OS Case Study</span>
                  <span className="font-mono text-violet-300 group-hover:underline">View Details →</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Integrated LeetCode Widget at bottom of Projects */}
        <div className="mt-16">
          <LeetCodeWidget />
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </section>
  );
}