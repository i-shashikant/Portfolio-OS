'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import Link from 'next/link';
import { usePortfolio } from '@/stores/portfolio-store';

import { projects } from '@/data/projects';

export default function ProjectShowcase() {
  const {
    activeProjectIndex,
    nextProject,
    previousProject,
    setActiveProject,
  } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();

  const dragX = useMotionValue(0);

  const springX = useSpring(dragX, {
    stiffness: 300,
    damping: 30,
  });

  const project = projects[activeProjectIndex];

  const next = nextProject;
  const previous = previousProject;

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => {
    if (info.offset.x < -80) {
      next();
    } else if (info.offset.x > 80) {
      previous();
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <span className="text-xs uppercase tracking-[0.25em] text-white/30">
          Selected Work
        </span>

        <span className="font-mono text-sm text-white/30">
          {String(activeProjectIndex + 1).padStart(2, '0')} /{' '}
          {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      {/* Showcase */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{
              x: prefersReducedMotion ? 0 : springX,
            }}
            initial={{
              opacity: 0,
              x: prefersReducedMotion ? 0 : 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: prefersReducedMotion ? 0 : -40,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileTap={{
              scale: prefersReducedMotion ? 1 : 0.985,
            }}
            className="touch-pan-y"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <article
                className="
                  relative min-h-[480px]
                  overflow-hidden rounded-[2rem]
                  border border-white/10
                  bg-white/[0.035]
                  p-7
                  transition-all duration-500
                  hover:border-violet-400/30
                  hover:bg-white/[0.055]
                  md:min-h-[560px]
                  md:p-12
                "
              >
                {/* Ambient glow */}
                <div
                  className="
                    pointer-events-none absolute
                    -right-32 -top-32
                    h-[28rem] w-[28rem]
                    rounded-full
                    bg-violet-500/10
                    blur-[120px]
                    transition-transform duration-700
                    group-hover:scale-110
                  "
                />

                {/* Grid */}
                <div
                  className="
                    pointer-events-none absolute inset-0
                    opacity-[0.025]
                    [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
                    [background-size:48px_48px]
                  "
                />

                <div className="relative flex min-h-[426px] flex-col justify-between md:min-h-[460px]">
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-white/30">
                      0{activeProjectIndex + 1}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/50">
                      {project.category}
                    </span>
                  </div>

                  {/* Main */}
                  <div>
                    <p className="mb-5 text-xs uppercase tracking-[0.2em] text-violet-300/70">
                      Project
                    </p>

                    <h3 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                      {project.title}
                    </h3>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base md:leading-8">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="
                            rounded-lg
                            border border-white/10
                            bg-black/20
                            px-3 py-1.5
                            text-xs text-white/50
                          "
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <span
                      className="
                        shrink-0
                        text-sm text-white/40
                        transition-colors duration-300
                        group-hover:text-white
                      "
                    >
                      Explore project
                      <span className="ml-2 text-lg">
                        ↗
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {projects.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`View ${item.title}`}
              onClick={() => setActiveProject(index)}
              className={`
                h-1.5 rounded-full
                transition-all duration-300
                ${
                  index === activeProjectIndex
                    ? 'w-10 bg-white'
                    : 'w-3 bg-white/20 hover:bg-white/40'
                }
              `}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous project"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full border border-white/10
              text-white/50 transition-all
              hover:border-white/20
              hover:bg-white/10
              hover:text-white
            "
          >
            ←
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next project"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full border border-white/10
              text-white/50 transition-all
              hover:border-white/20
              hover:bg-white/10
              hover:text-white
            "
          >
            →
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-white/20">
        Drag or swipe to explore
      </p>
    </div>
  );
}