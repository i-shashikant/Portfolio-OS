"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Maximize2,
  Minus,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

type OSWindowProps = {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function OSWindow({
  title,
  description,
  open,
  onClose,
  children,
}: OSWindowProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.97,
            y: 8,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            inset-4
            z-[9995]
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.09]
            bg-[#08080d]/95
            shadow-2xl
            backdrop-blur-3xl
            md:inset-8
            lg:inset-12
          "
        >
          {/* =====================================
              WINDOW HEADER
              ===================================== */}

          <header
            className="
              flex
              h-14
              items-center
              justify-between
              border-b
              border-white/[0.07]
              bg-white/[0.015]
              px-4
              md:px-5
            "
          >
            {/* Left */}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-white/35
                  transition-colors
                  hover:bg-white/[0.06]
                  hover:text-white
                "
                aria-label="Close window"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="h-4 w-px bg-white/[0.08]" />

              <div>
                <div className="text-xs font-medium text-white/80">
                  {title}
                </div>

                {description && (
                  <div
                    className="
                      hidden
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.15em]
                      text-white/25
                      sm:block
                    "
                  >
                    {description}
                  </div>
                )}
              </div>
            </div>

            {/* Right window controls */}

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="
                  hidden
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-white/25
                  transition-colors
                  hover:bg-white/[0.06]
                  hover:text-white
                  sm:flex
                "
                aria-label="Minimize"
              >
                <Minus size={15} />
              </button>

              <button
                type="button"
                className="
                  hidden
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-white/25
                  transition-colors
                  hover:bg-white/[0.06]
                  hover:text-white
                  sm:flex
                "
                aria-label="Maximize"
              >
                <Maximize2 size={14} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-white/30
                  transition-colors
                  hover:bg-red-500/10
                  hover:text-red-300
                "
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          {/* =====================================
              WINDOW CONTENT
              ===================================== */}

          <div
            className="
              h-[calc(100%-3.5rem)]
              overflow-y-auto
            "
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}