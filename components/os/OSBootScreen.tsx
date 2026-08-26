'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePortfolio } from '@/stores/portfolio-store';
import { soundEngine } from '@/lib/sound/soundEngine';
import { Terminal, Cpu, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const BOOT_STEPS = [
  'INITIALIZING PORTFOLIO OS KERNEL V1.0...',
  'LOADING MEDIAPIPE VISION WASM MODULES...',
  'MOUNTING REACT 19 & NEXT.JS ROUTER...',
  'STARTING WEB AUDIO SYNTHESIZER...',
  'SYSTEM READY — ALL MODULES ONLINE',
];

export default function OSBootScreen() {
  const { osEntered, enterOS } = usePortfolio();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBootComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < BOOT_STEPS.length - 1 ? prev + 1 : prev));
    }, 220);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
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
    soundEngine.playClick();
    enterOS();
  };

  return (
    <AnimatePresence>
      {!osEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(12px)',
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={handleEnter}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-[#04050a]"
        >
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[140px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full">
            {/* System Status Header */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-xl"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  bootComplete ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400 animate-pulse'
                }`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                {bootComplete ? 'System Booted — Online' : 'BIOS Initializing...'}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-6xl font-extrabold tracking-tight text-white md:text-7xl"
            >
              Portfolio OS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-violet-300/60"
            >
              v1.0.4 / SHASHIKANT
            </motion.p>

            {/* BIOS Initialization Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 w-full rounded-2xl border border-white/10 bg-black/70 p-4 text-left font-mono text-[11px] text-emerald-400 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-white/30 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-violet-400" />
                  <span>BIOS_BOOT.LOG</span>
                </div>
                <span>{progress}%</span>
              </div>

              <div className="mt-3 space-y-1 h-16 overflow-hidden">
                <div className="text-white/40">// System Booting:</div>
                <div className="text-emerald-400">&gt; {BOOT_STEPS[currentStep]}</div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-violet-400 transition-all duration-150 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>

            {/* Enter Button */}
            <AnimatePresence>
              {bootComplete && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnter();
                  }}
                  className="mt-8 flex items-center gap-3 rounded-full border border-violet-400/40 bg-violet-500/20 px-6 py-3 text-xs text-white transition-all hover:border-violet-400/60 hover:bg-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  <kbd className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[10px] text-violet-200">
                    ENTER
                  </kbd>
                  <span className="font-mono tracking-wider">ENTER PORTFOLIO OS</span>
                  <ArrowRight size={14} className="text-violet-300" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}