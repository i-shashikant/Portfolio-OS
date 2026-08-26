'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';
import { SKILLS_DATA, SKILL_CATEGORIES, SkillItem } from '@/data/skillData';
import ReactiveSkillCard from './ReactiveSkillCard';
import SkillDetailModal from './SkillDetailModal';
import { soundEngine } from '@/lib/sound/soundEngine';
import { Search, Volume2, VolumeX, Sparkles, Filter } from 'lucide-react';

export default function SkillsSection() {
  const { osEntered } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalSkill, setActiveModalSkill] = useState<SkillItem | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(soundEngine.isEnabled());

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    soundEngine.playClick();
  };

  const handleToggleAudio = () => {
    const newState = soundEngine.toggleSound();
    setSoundOn(newState);
  };

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32 md:py-40">
      {/* Ambient Radial Glow */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[550px] w-[550px] rounded-full bg-violet-500/[0.04] blur-[150px]" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 h-[450px] w-[450px] rounded-full bg-cyan-500/[0.03] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: osEntered ? 1 : 0, y: osEntered ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/80">02</span>
            <span className="h-px w-12 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">Skills & Tech Stack</span>
          </div>

          <button
            type="button"
            onClick={handleToggleAudio}
            title={soundOn ? 'Mute Audio SFX' : 'Enable Audio SFX'}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            {soundOn ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} className="text-white/30" />}
            <span className="hidden sm:inline">{soundOn ? 'SFX ON' : 'SFX MUTED'}</span>
          </button>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: osEntered ? 1 : 0, y: osEntered ? 0 : 25 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-14 max-w-3xl"
        >
          <h2 className="text-4xl font-medium tracking-tight text-white/90 md:text-6xl">
            Tools I use to turn <span className="text-white/30">ideas into systems.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
            A dynamic, reactive skill matrix. Hover over any skill to morph into its official brand symbol, or click to launch the code playground drawer.
          </p>
        </motion.div>

        {/* Filter Tabs & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: osEntered ? 1 : 0, y: osEntered ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl">
            {SKILL_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`relative rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-xl border border-violet-400/30 bg-violet-500/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Filter skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 py-2 pl-10 pr-4 font-mono text-xs text-white placeholder-white/30 backdrop-blur-xl transition-colors focus:border-violet-400/50 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Reactive 3D Skill Grid */}
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ReactiveSkillCard skill={skill} onSelect={(s) => setActiveModalSkill(s)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when search yields no matches */}
        {filteredSkills.length === 0 && (
          <div className="mt-12 text-center rounded-3xl border border-white/10 bg-white/[0.02] p-12">
            <Filter className="mx-auto h-8 w-8 text-white/20 mb-3" />
            <p className="text-sm text-white/40">No skills match your filter query.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/70 hover:bg-white/10"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* System Line Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: osEntered ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex items-center justify-between border-t border-white/5 pt-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
            SKILL_MATRIX / REACTIVE_GRID_V2
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/40">
            {filteredSkills.length} SKILLS LOADED
          </span>
        </motion.div>
      </div>

      {/* Code Playground / Detail Modal */}
      <SkillDetailModal skill={activeModalSkill} onClose={() => setActiveModalSkill(null)} />
    </section>
  );
}