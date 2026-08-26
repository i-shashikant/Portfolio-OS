'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Cpu, HardDrive, ShieldCheck, Zap } from 'lucide-react';
import { usePortfolio } from '@/stores/portfolio-store';

export default function DeveloperModeEasterEgg() {
  const { devModeOpen, toggleDevMode } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!devModeOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01PORTFOLIO_OS_DEV_MODE_LEET_CYBER_2026_AGI_QUANTUM_SYSTEM';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#06b6d4'; // Cyan neon matrix
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [devModeOpen]);

  return (
    <AnimatePresence>
      {devModeOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          {/* Matrix canvas background */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-cyan-500/30 bg-black/90 p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] backdrop-blur-2xl md:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-400">
                  <Terminal size={22} />
                </div>
                <div>
                  <h3 className="font-mono text-lg font-bold text-cyan-400">DEVELOPER MODE ACTIVATED 🤘</h3>
                  <p className="font-mono text-xs text-cyan-300/50">Portfolio OS Quantum Terminal v1.0.4</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleDevMode}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 transition-colors hover:bg-cyan-500/20"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-4 font-mono text-xs text-cyan-200">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                  <Zap size={14} />
                  <span>GESTURE RECOGNITION ENGINE STATUS</span>
                </div>
                <p className="text-white/70">
                  MediaPipe Vision Landmarker active. High-precision 21-point 3D tracking running via WASM.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <Cpu size={14} />
                    <span>CPU LOAD</span>
                  </div>
                  <span className="text-lg font-bold text-emerald-400">2.4%</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <HardDrive size={14} />
                    <span>MEMORY</span>
                  </div>
                  <span className="text-lg font-bold text-cyan-400">42 MB</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <ShieldCheck size={14} />
                    <span>STATUS</span>
                  </div>
                  <span className="text-lg font-bold text-violet-400">OPERATIONAL</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-[11px] text-emerald-400">
                <div className="text-white/40 mb-2">// Console Logs:</div>
                <div>[SYSTEM] Hand Landmarker model loaded successfully</div>
                <div>[GESTURE] Rock Sign (🤘) trigger acknowledged</div>
                <div>[EASTER_EGG] Developer Mode unlocked</div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end border-t border-cyan-500/20 pt-4">
              <button
                type="button"
                onClick={toggleDevMode}
                className="rounded-xl border border-cyan-500/40 bg-cyan-500/20 px-5 py-2 font-mono text-xs font-semibold text-cyan-200 transition-colors hover:bg-cyan-500/30"
              >
                CLOSE TERMINAL
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
