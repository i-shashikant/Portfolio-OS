"use client";

import { ReactNode } from "react";

type GestureTargetProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export default function GestureTarget({
  children,
  active = false,
  onClick,
}: GestureTargetProps) {
  return (
    <button
      type="button"
      data-gesture-target
      onClick={onClick}
      className={`
        rounded-xl
        border
        px-8
        py-5
        transition-all
        duration-200
        ${
          active
            ? "border-violet-400 bg-violet-500/20 scale-[1.03] shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            : "border-white/10 bg-white/[0.03] hover:border-white/20"
        }
      `}
    >
      {children}
    </button>
  );
}