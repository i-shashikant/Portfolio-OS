'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { SkillItem } from '@/data/skillData';
import { soundEngine } from '@/lib/sound/soundEngine';
import { ArrowUpRight, Sparkles, Terminal, Code2, Database, Cpu, GitBranch, Box } from 'lucide-react';
import {
  ScanFace,
  Layers3,
  Wind,
} from 'lucide-react';
interface ReactiveSkillCardProps {
  skill: SkillItem;
  onSelect: (skill: SkillItem) => void;
}

export default function ReactiveSkillCard({ skill, onSelect }: ReactiveSkillCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position inside card for 3D tilt & dynamic spotlight
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);

    setSpotlightPos({ x: Math.round(x * 100), y: Math.round(y * 100) });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    soundEngine.playClick();
    onSelect(skill);
  };

  // Icon selector helper
  const renderBrandIcon = () => {
    switch (skill.iconType) {
      case 'python':
        return (
          <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" style={{ color: skill.brandColor }}>
            <path d="M12 2C6.48 2 6 3.5 6 6v3h6v1H5c-2.5 0-4 1.5-4 4.5s1.5 4.5 4 4.5h2v-2.5c0-1.66 1.34-3 3-3h6c1.38 0 2.5-1.12 2.5-2.5V6c0-2.5-1.5-4-4.5-4H12zm-2.5 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
            <path d="M12 22c5.52 0 6-1.5 6-4.5v-3h-6v-1h7c2.5 0 4-1.5 4-4.5S21.5 4.5 19 4.5h-2v2.5c0 1.66-1.34 3-3 3h-6c-1.38 0-2.5 1.12-2.5 2.5V18c0 2.5 1.5 4 4.5 4H12zm2.5-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
          </svg>
        );
      case 'javascript':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7DF1E] font-extrabold text-black text-xl shadow-lg">
            JS
          </div>
        );
      case 'typescript':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3178C6] font-extrabold text-white text-xl shadow-lg">
            TS
          </div>
        );
      case 'react':
        return (
          <svg viewBox="0 0 24 24" className="h-10 w-10 animate-[spin_10s_linear_infinite]" style={{ color: skill.brandColor }}>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1.5" fill="none">
              <ellipse cx="12" cy="12" rx="9" ry="3.5" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
            </g>
          </svg>
        );
      case 'nextjs':
        return <Sparkles className="h-9 w-9 text-white animate-pulse" />;
      case 'vue':
        return (
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill={skill.brandColor}>
            <path d="M2 3h3.5L12 15 18.5 3H22L12 21 2 3z"/>
            <path d="M6 3h3.5L12 12 14.5 3H18L12 15 6 3z" fill="#35495E"/>
          </svg>
        );
      case 'sql':
        return <Database className="h-9 w-9 text-blue-400" />;
      case 'ml':
        return <Cpu className="h-9 w-9 text-amber-500 animate-pulse" />;
      case 'git':
        return <GitBranch className="h-9 w-9 text-orange-500" />;
      case 'docker':
        return <Box className="h-9 w-9 text-sky-400" />;

      case 'mediapipe':
  return <ScanFace className="h-9 w-9 text-cyan-400" />;

case 'threejs':
  return <Layers3 className="h-9 w-9 text-white" />;

case 'tailwind':
  return <Wind className="h-9 w-9 text-sky-400" />;

      default:
        return <Code2 className="h-9 w-9 text-violet-400" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0a0c1a] p-6 transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${skill.glowColor}, transparent 60%)`,
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60">
          {skill.categoryLabel}
        </span>

        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 transition-colors group-hover:border-white/20 group-hover:bg-white/10">
          <span className="font-mono text-[10px] text-white/50">{skill.strength}</span>
          <ArrowUpRight className="h-3 w-3 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        </div>
      </div>

      {/* Main Content Area (Morphs on Hover!) */}
      <div className="relative z-10 mt-8 min-h-[110px]">
        {/* Default View: Name & Description */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.25 }}
          className={isHovered ? 'pointer-events-none absolute inset-0' : 'block'}
        >
          <h3 className="text-2xl font-bold tracking-tight text-white/90">
            {skill.name}
          </h3>
          <p className="mt-2.5 text-xs leading-5 text-white/40 line-clamp-2">
            {skill.description}
          </p>
        </motion.div>

        {/* Hover Morph View: Glowing Official Brand Symbol + Interactive Tag */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          className={!isHovered ? 'pointer-events-none absolute inset-0' : 'flex flex-col justify-between'}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/60 shadow-xl backdrop-blur-md transition-transform group-hover:scale-110">
                {renderBrandIcon()}
              </div>

              <div>
                <span className="text-lg font-bold text-white">{skill.name}</span>
                <span className="block font-mono text-[10px] text-white/40">Exp: {skill.strength}</span>
              </div>
            </div>
          </div>

          {/* Proficiency Bar */}
          <div className="mt-4 w-full">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isHovered ? `${skill.strength}` : '0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: skill.brandColor }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Details */}
      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-white/30">
        <span className="font-mono">Explore Snippet & Code</span>
        <span className="font-mono text-emerald-400/80 group-hover:text-emerald-400">Interactive →</span>
      </div>
    </motion.div>
  );
}
