'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';

const shortcuts = [
  { key: 'P', label: 'Projects' },
  { key: 'S', label: 'Skills' },
  { key: 'C', label: 'Contact' },
];

export default function PortfolioHUD() {
  const { section, osEntered } = usePortfolio();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="
        pointer-events-none
        fixed
        left-6
        top-20
        z-40 
        hidden
        lg:block
      "
    >
      {/* OS Status */}
      <div
        className="
          flex
          items-center
          gap-3
          rounded-full
          border
          border-white/10
          bg-black/40
          px-4
          py-2
          backdrop-blur-xl
          shadow-lg
        "
      >
        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              osEntered
                ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                : 'bg-white/30'
            }`}
          />

          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-white/60
            "
          >
            Portfolio OS
          </span>
        </div>

        <span className="h-3 w-px bg-white/10" />

        {/* Current section */}
        <span
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-violet-300
          "
        >
          {section}
        </span>
      </div>

      {/* Keyboard shortcuts */}
      <div className="mt-2 flex gap-1.5">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.key}
            className="
              rounded-full
              border
              border-white/[0.08]
              bg-black/30
              px-2.5
              py-1
              backdrop-blur-md
            "
          >
            <span
              className="
                font-mono
                text-[9px]
                text-violet-300
              "
            >
              {shortcut.key}
            </span>

            <span
              className="
                ml-1.5
                text-[9px]
                text-white/40
              "
            >
              {shortcut.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}