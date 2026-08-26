'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, Layers, Cpu, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'tech' | 'lessons'>('overview');

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-violet-500/30 bg-[#090b18] p-6 shadow-[0_0_50px_rgba(139,92,246,0.15)] backdrop-blur-2xl md:p-8"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-300">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="font-mono text-xs text-violet-300/60">{project.category}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Custom OS Case Study Tabs */}
            <div className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/50 p-1.5 backdrop-blur-xl">
              {[
                { id: 'overview', label: 'Overview', icon: <Sparkles size={14} /> },
                { id: 'architecture', label: 'Architecture', icon: <Cpu size={14} /> },
                { id: 'tech', label: 'Tech Stack', icon: <Layers size={14} /> },
                { id: 'lessons', label: 'Lessons Learned', icon: <ShieldAlert size={14} /> },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-mono text-xs transition-all ${
                      isActive
                        ? 'border border-violet-400/40 bg-violet-500/20 text-violet-200 shadow-md'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body Content */}
            <div className="mt-6 min-h-[220px]">
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <p className="text-sm leading-7 text-white/80">{project.description}</p>

                  {project.caseStudy && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-white/70 space-y-2">
                      <div className="font-semibold text-white mb-1 flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        <span>Problem & Solution Overview</span>
                      </div>
                      <div><strong>Problem:</strong> {project.caseStudy.problem}</div>
                      <div className="mt-1"><strong>Solution:</strong> {project.caseStudy.solution}</div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'architecture' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="rounded-2xl border border-violet-500/20 bg-black/60 p-4 font-mono text-xs text-violet-200">
                    <div className="text-white/40 mb-2">// System Architecture Flow:</div>
                    <div className="space-y-1">
                      <div>[CLIENT] Next.js / React 19 Frontend UI Layer</div>
                      <div>    ↓ (REST / WebSockets API Calls)</div>
                      <div>[BACKEND] FastAPI / Node.js Microservice Engine</div>
                      <div>    ↓ (ORM Queries / Cache Lookups)</div>
                      <div>[DATA] PostgreSQL / Redis Database Storage</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'tech' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h4 className="text-xs font-mono text-white/50">Core Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 font-mono text-xs text-violet-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'lessons' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-white/80 space-y-2">
                    <div className="font-semibold text-amber-400 mb-1">Key Engineering Takeaways:</div>
                    <p className="leading-6 text-white/70">
                      Building {project.title} required rigorous state synchronization, low-latency API handling, and scalable component isolation. Memory profiling and GPU acceleration significantly improved rendering performance.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/20 px-4 py-2 font-mono text-xs text-violet-200 transition-colors hover:bg-violet-500/30"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <span>GitHub Code</span>
                    <GitBranch size={14} />
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/50 hover:bg-white/10 hover:text-white"
              >
                Close Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
