'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, Code2, Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { SkillItem } from '@/data/skillData';

interface SkillDetailModalProps {
  skill: SkillItem | null;
  onClose: () => void;
}

export default function SkillDetailModal({ skill, onClose }: SkillDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!skill) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(skill.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {skill && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d1b] p-6 shadow-2xl md:p-8"
          >
            {/* Ambient Brand Glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: skill.brandColor }}
            />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3.5">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/50 shadow-inner"
                  style={{ color: skill.brandColor }}
                >
                  <Code2 size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {skill.categoryLabel}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="font-mono text-[10px] text-emerald-400">Exp: {skill.strength}</span>
                  </div>
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

            {/* Proficiency Gauge */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-white/50">Proficiency Mastery</span>
                <span className="font-mono font-bold text-white">{skill.strength}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.strength}` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.brandColor }}
                />
              </div>
            </div>

            {/* Description & Highlights */}
            <div className="mt-6 space-y-4">
              <p className="text-sm leading-6 text-white/70">{skill.description}</p>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/60 mb-2">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>What I&apos;ve Used It For</span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-white/80">
                  {skill.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Code Playground Snippet */}
            <div className="mt-6">
              <div className="flex items-center justify-between rounded-t-2xl border border-b-0 border-white/10 bg-black/80 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-violet-400" />
                  <span className="font-mono text-xs text-white/60">Sample {skill.name} Execution</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="overflow-x-auto rounded-b-2xl border border-white/10 bg-[#05060f] p-4 font-mono text-xs text-violet-200">
                <pre>{skill.codeSnippet}</pre>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/10 px-5 py-2 font-mono text-xs text-white transition-colors hover:bg-white/20"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
