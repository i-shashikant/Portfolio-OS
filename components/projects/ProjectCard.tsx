'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

import type { Project } from '@/data/projects';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  
  // 3D tilt
  const rotateX = useSpring(0, {
    stiffness: 180,
    damping: 18,
});

const rotateY = useSpring(0, {
    stiffness: 180,
    damping: 18,
});

// Cursor position
const glowX = useMotionValue(50);
const glowY = useMotionValue(50);

const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>,
) => {
    const card = cardRef.current;
    
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    // Spotlight position
    glowX.set(percentX);
    glowY.set(percentY);
    
    

    // 3D tilt
    const tiltX =
    ((y / rect.height) - 0.5) * -8;
    
    const tiltY =
    ((x / rect.width) - 0.5) * 8;
    
    rotateX.set(tiltX);
    rotateY.set(tiltY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);

    glowX.set(50);
    glowY.set(50);
  };

  return (
    <Link
    href={`/projects/${project.slug}`}
    className="block">
    <motion.article
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      whileTap={{ scale: 0.98 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group relative cursor-pointer overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.035]
        p-6
        backdrop-blur-xl
        transition-colors duration-500
        hover:border-violet-400/30
        hover:bg-white/[0.055]
        md:p-8
      "
    >
      {/* Cursor spotlight */}
      <motion.div
        className="
          pointer-events-none
          absolute
          h-[440px]
          w-[440px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/10
          blur-3xl
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          left: glowX,
          top: glowY,
        }}
      />

      {/* Project number + category */}
      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium text-white/30">
          0{index + 1}
        </span>

        <span
          className="
            rounded-full
            border border-white/10
            bg-white/[0.04]
            px-3 py-1
            text-xs
            text-white/50
          "
        >
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="
          relative mt-10
          text-3xl
          font-semibold
          tracking-tight
          md:text-4xl
        "
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className="
          relative mt-5
          max-w-xl
          text-sm
          leading-7
          text-[var(--muted)]
          md:text-base
        "
      >
        {project.description}
      </p>

      {/* Technologies */}
      <div
        className="
          relative mt-7
          flex flex-wrap
          gap-2
        "
      >
        {project.technologies.map(
          (technology) => (
            <span
              key={technology}
              className="
                rounded-lg
                border border-white/10
                bg-black/20
                px-3 py-1.5
                text-xs
                text-white/60
              "
            >
              {technology}
            </span>
          ),
        )}
      </div>

      {/* Footer */}
      <div
        className="
          relative mt-8
          flex items-center
          justify-between
          border-t border-white/10
          pt-5
        "
      >
        <span
            className="
                text-sm
                text-white/40
                transition-colors
                duration-300
                group-hover:text-white
            "
        >
            Explore project
        </span>

        <span
          className="
            text-xl
            text-white/60
            transition-transform
            duration-300
            group-hover:translate-x-1
            group-hover:-translate-y-1
            group-hover:text-white
          "
        >
          ↗
        </span>
      </div>
    </motion.article>
    </Link>
  );
}