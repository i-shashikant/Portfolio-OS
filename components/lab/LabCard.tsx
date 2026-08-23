"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FlaskConical } from "lucide-react";

type LabCardProps = {
  title: string;
  description: string;
  status: "LIVE" | "EXPERIMENT" | "BUILDING";
  type: string;
  onClick: () => void;
};

export default function LabCard({
  title,
  description,
  status,
  type,
  onClick,
}: LabCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25 }}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 text-left backdrop-blur-xl md:p-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
            <FlaskConical size={17} className="text-violet-300" />
          </div>

          <span className="text-xs uppercase tracking-[0.2em] text-white/35">
            {type}
          </span>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium tracking-wider text-white/50">
          {status}
        </span>
      </div>

      <h3 className="relative mt-10 text-2xl font-semibold tracking-tight">
        {title}
      </h3>

      <p className="relative mt-4 max-w-lg text-sm leading-7 text-[var(--muted)]">
        {description}
      </p>

      <div className="relative mt-8 flex items-center justify-between border-t border-white/10 pt-5">
        <span className="text-sm text-white/40 transition-colors group-hover:text-white/70">
          Open experiment
        </span>

        <ArrowUpRight
          size={18}
          className="text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
        />
      </div>
    </motion.button>
  );
}