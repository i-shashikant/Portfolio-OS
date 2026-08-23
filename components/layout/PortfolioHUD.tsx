'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';

const shortcuts = [
  { key: 'P', label: 'Projects' },
  { key: 'S', label: 'Skills' },
  { key: 'L', label: 'Lab' },
  { key: 'C', label: 'Contact' },
];

export default function PortfolioHUD() {
  const { section, osEntered } = usePortfolio();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="pointer-events-none fixed left-5 top-5 z-50 hidden md:block"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              osEntered
                ? 'bg-emerald-400'
                : 'bg-white/30'
            }`}
          />

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Portfolio OS
          </span>
        </div>

        <span className="h-3 w-px bg-white/10" />

        {/* Current section */}
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
          {section}
        </span>
      </div>

      {/* Keyboard shortcuts */}
      <div className="mt-2 flex gap-1.5">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.key}
            className="rounded-full border border-white/[0.06] bg-black/20 px-2.5 py-1 backdrop-blur-md"
          >
            <span className="font-mono text-[9px] text-white/25">
              {shortcut.key}
            </span>

            <span className="ml-1.5 text-[9px] text-white/20">
              {shortcut.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}