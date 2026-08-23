"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import LabCard from "./LabCard";

const experiments = [
  {
    title: "Portfolio AI",
    description:
      "An experimental AI layer for Portfolio OS that turns the portfolio into an interactive experience.",
    status: "BUILDING" as const,
    type: "AI",
    details:
      "Exploring how an AI assistant can understand the portfolio, answer questions about projects, and create a more interactive way to explore my work.",
  },
  {
    title: "Gesture Control",
    description:
      "Exploring gesture-driven interactions for navigating and controlling web interfaces.",
    status: "EXPERIMENT" as const,
    type: "INTERACTION",
    details:
      "A browser-based interaction experiment exploring how hand gestures can control elements of a web interface without traditional mouse input.",
  },
  {
    title: "AI Experiments",
    description:
      "Small experiments exploring how AI can be integrated into useful software products.",
    status: "EXPERIMENT" as const,
    type: "AI / ML",
    details:
      "A collection of small prototypes exploring practical applications of machine learning and generative AI.",
  },
  {
    title: "Automation Lab",
    description:
      "Experiments with APIs, automation workflows, background tasks, and intelligent systems.",
    status: "LIVE" as const,
    type: "AUTOMATION",
    details:
      "Experiments involving APIs, scheduled workflows, background processing, and automation systems.",
  },
];

export default function LabSection() {
  const [selectedExperiment, setSelectedExperiment] =
    useState<(typeof experiments)[number] | null>(null);

  return (
    <section
      id="lab"
      className="relative scroll-mt-32 px-6 py-32 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-violet-400" />

            <span className="text-xs uppercase tracking-[0.35em] text-white/40">
              Lab
            </span>
          </div>

          <h2 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Experiments, ideas,
            <br />
            <span className="text-white/30">
              and things I'm building.
            </span>
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
            A collection of experiments, prototypes, and interaction ideas
            where I explore AI, software, automation, and new ways of building.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <LabCard
                {...experiment}
                onClick={() => setSelectedExperiment(experiment)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experiment Modal */}
      <AnimatePresence>
        {selectedExperiment && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExperiment(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#080a16] p-8 shadow-2xl md:p-10"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => setSelectedExperiment(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:text-white"
                aria-label="Close experiment"
              >
                <X size={17} />
              </button>

              {/* Category */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.3em] text-violet-300">
                  {selectedExperiment.type}
                </span>

                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/40">
                  {selectedExperiment.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl">
                {selectedExperiment.title}
              </h3>

              {/* Description */}
              <p className="mt-6 text-base leading-8 text-[var(--muted)]">
                {selectedExperiment.details}
              </p>

              {/* Bottom */}
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-sm text-white/30">
                  Portfolio OS Lab
                </span>

                <span className="flex items-center gap-2 text-sm text-white/60">
                  Experiment
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}