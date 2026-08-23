'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePortfolio } from '@/stores/portfolio-store';

export default function OSBootScreen() {
  const { osEntered, enterOS } = usePortfolio();

  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBootComplete(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (osEntered) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [osEntered]);

  const handleEnter = () => {
    if (!bootComplete) return;

    enterOS();
  };

  return (
    <AnimatePresence>
      {!osEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: 'blur(8px)',
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={handleEnter}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-[#050509]"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.06] blur-[120px]" />

          {/* Grid */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              opacity-[0.035]
              [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
              [background-size:64px_64px]
            "
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-2"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  bootComplete
                    ? 'bg-emerald-400'
                    : 'bg-white/30'
                }`}
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                {bootComplete
                  ? 'System Ready'
                  : 'Initializing'}
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl"
            >
              Portfolio OS
            </motion.h1>

            {/* Version */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/20"
            >
              v1.0 / Shashikant
            </motion.p>

            {/* Enter */}
            <AnimatePresence>
                {bootComplete && (
                    <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleEnter();
                    }}
                    className="
                        mt-14
                        flex items-center gap-3
                        rounded-full
                        border border-white/10
                        bg-white/[0.04]
                        px-5 py-2.5
                        transition-colors duration-200
                        hover:border-white/20
                        hover:bg-white/[0.08]
                    "
                    >
                    <kbd
                        className="
                        rounded-md
                        border border-white/10
                        bg-white/[0.06]
                        px-2 py-1
                        font-mono text-[10px]
                        text-white/50
                        "
                    >
                        ENTER
                    </kbd>

                    <span className="text-xs text-white/50">
                        Enter Portfolio
                    </span>
                    </motion.button>
                )}
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-5 text-[10px] text-white/15"
            >
              Click anywhere or press Enter
            </motion.p>
          </div>

          {/* Corner metadata */}
          <div className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/15">
            Interactive Portfolio
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/15">
            AI / FULL STACK / DATA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}