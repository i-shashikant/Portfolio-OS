'use client';
import { useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';
import ParticleField from '@/components/hero/ParticleField';
import { Palette } from 'lucide-react';

export default function Hero() {

  const {
  osEntered,
  openSection,
  theme,
  setTheme,
} = usePortfolio();

const [themeOpen, setThemeOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const glowX = useTransform(smoothX, [-1, 1], ['20%', '80%']);
  const glowY = useTransform(smoothY, [-1, 1], ['20%', '80%']);
  const contentX = useTransform(
    smoothX,
    [-1, 1],
    [-12, 12],
  );
  const contentY = useTransform(
    smoothY,
    [-1, 1],
    [-8, 8],
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    if (prefersReducedMotion) return;

    const { innerWidth, innerHeight } = window;

    const x =
      (event.clientX / innerWidth) * 2 - 1;

    const y =
      (event.clientY / innerHeight) * 2 - 1;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="
        relative flex min-h-screen
        items-center overflow-hidden
        px-6
      "
    >
      <ParticleField />
      {/* Theme control */}
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{
    opacity: osEntered ? 1 : 0,
    y: osEntered ? 0 : -10,
  }}
  transition={{
    duration: 0.6,
    delay: 0.5,
  }}
  className="absolute right-6 top-24 z-30"
>
  <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1 backdrop-blur-xl">
    {[
      { id: 'dark', label: 'Dark' },
      { id: 'cyberpunk', label: 'Cyber' },
      { id: 'obsidian', label: 'Obsidian' },
      { id: 'matrix', label: 'Matrix' },
    ].map((item) => {
      const active = theme === item.id;

      return (
        <button
          key={item.id}
          type="button"
          onClick={() => setTheme(item.id as typeof theme)}
          className={`
            rounded-full px-3 py-1.5
            text-[10px] font-mono uppercase
            tracking-wider transition-all duration-200
            ${
              active
                ? 'bg-white text-black'
                : 'text-white/40 hover:bg-white/10 hover:text-white'
            }
          `}
          aria-label={`Switch to ${item.label} theme`}
          aria-pressed={active}
        >
          {item.label}
        </button>
      );
    })}
  </div>
</motion.div>
      {/* Ambient cursor glow */}
      <motion.div
        className="
          pointer-events-none absolute
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[var(--glow)]
          blur-[120px]
        "
        style={{
          left: prefersReducedMotion ? '50%' : glowX,
          top: prefersReducedMotion ? '50%' : glowY,
        }}
      />

      {/* Subtle grid */}
      <div
        className="
          pointer-events-none absolute inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* Content */}
      <motion.div className="relative z-10 mx-auto w-full max-w-6xl"
        style={{
          x: prefersReducedMotion ? 0 : contentX,
          y: prefersReducedMotion ? 0 : contentY,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: osEntered ? 1: 0,
            y: osEntered ?  0 : 20,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-8 flex items-center gap-3"
        >
          <span
  className="
    h-2 w-2
    rounded-full
    bg-[var(--primary)]
    shadow-[0_0_12px_var(--primary)]
  "
/>

          <span className="text-xs uppercase tracking-[0.25em] text-white/40">
            Data Science · Software · AI
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: osEntered ? 1: 0,
            y: osEntered ?  0 : 30,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="
            max-w-5xl
            text-6xl font-semibold
            tracking-[-0.05em]
            md:text-8xl
            lg:text-[9rem]
            lg:leading-[0.9]
          "
        >
          Shashikant
          <span className="text-[var(--primary)]">.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 25,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
            mt-8
            max-w-3xl
            text-base
            leading-7
            text-[var(--muted)]
            md:text-lg
            md:leading-8
          "
        >
          <span className="text-white">
            AI Engineer
          </span>
          {' · '}
          <span className="text-white/60">
            Full Stack Developer
          </span>
          {' · '}
          <span className="text-white/40">
            Problem Solver
          </span>

          <br />

          <span className="text-white/45">
            I build data-driven products, software systems,
            and AI-powered experiments — turning ideas into
            things people can actually use.
          </span>
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: osEntered ? 1: 0,
            y: osEntered ?  0 : 20,
          }}
          transition={{
            duration: 0.7,
            delay: 0.35,
          }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            type="button"
            onClick={() => openSection('projects')}
            className="
              group inline-flex items-center
              gap-3 rounded-full
              bg-white px-6 py-3.5
              text-sm font-medium text-black
              transition-transform duration-300
              hover:scale-[1.03]
            "
          >
            Explore work

            <span
              className="
                transition-transform duration-300
                group-hover:translate-y-1
              "
            >
              ↓
            </span>
          </button>

          <a
            href="https://github.com/i-shashikant"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center
              gap-2 rounded-full
              border border-white/10
              bg-white/[0.03]
              px-6 py-3.5
              text-sm text-white/60
              backdrop-blur
              transition-all duration-300
              hover:border-white/20
              hover:bg-white/[0.07]
              hover:text-white
            "
          >
            GitHub
            <span>↗</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: osEntered ? 1: 0,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="
          absolute bottom-8
          left-1/2
          -translate-x-1/2
          text-center
        "
      >
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/20">
          Scroll
        </p>

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-white/30"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}