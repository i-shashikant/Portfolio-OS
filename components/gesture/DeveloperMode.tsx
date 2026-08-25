"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DeveloperModeProps {
  active: boolean;
  onClose: () => void;
}

const LOG_LINES = [
  "$ whoami",
  "shashikant — AI Engineer / Full Stack Developer",
  "",
  "$ git log --oneline -5",
  "a3f9c21 feat: gesture-controlled navigation",
  "9d1e4b7 feat: RAG chat over resume + projects",
  "5c2a018 perf: swap pinch-scroll for swipe-snap",
  "e77b4f0 feat: live GitHub + LeetCode widgets",
  "112d9aa chore: initial commit",
  "",
  "$ cat status.txt",
  "Open to opportunities: true",
  "Coffee level: sufficient",
  "Bugs remaining: 0 (probably)",
];

/*
 * Mounted only while the overlay is active, so its
 * state naturally starts fresh at 0 every time — no
 * need to reset state from inside an effect.
 */
function TerminalLog() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((current) => {
        if (current >= LOG_LINES.length) {
          clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[320px] overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-emerald-300">
      {LOG_LINES.slice(0, visibleLines).map((line, index) => (
        <div
          key={index}
          className={
            line.startsWith("$")
              ? "mt-3 text-white/90 first:mt-0"
              : "text-emerald-400/70"
          }
        >
          {line || "\u00A0"}
        </div>
      ))}
      {visibleLines >= LOG_LINES.length && (
        <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" />
      )}
    </div>
  );
}

export default function DeveloperMode({
  active,
  onClose,
}: DeveloperModeProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="
              w-[min(92vw,640px)]
              overflow-hidden
              rounded-2xl
              border
              border-emerald-400/20
              bg-[#050505]
              shadow-[0_0_60px_rgba(16,185,129,0.15)]
            "
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                developer-mode.sh
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                🤟 unlocked
              </span>
            </div>

            {active && <TerminalLog />}

            <div className="border-t border-white/10 bg-white/[0.02] px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              rock sign again, or click anywhere, to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
