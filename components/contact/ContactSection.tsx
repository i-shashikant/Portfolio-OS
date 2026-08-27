'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  Terminal,
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { usePortfolio } from '@/stores/portfolio-store';
import { socials } from '@/data/socials';

export default function ContactSection() {
  const { osEntered } = usePortfolio();

  const email = 'shashi873kant@gmail.com';

  const openGmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[650px] w-[650px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[var(--primary)]/[0.06]
          blur-[160px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 20,
          }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
            06 — Contact
          </p>

          <span className="h-px w-12 bg-white/10" />
        </motion.div>

        {/* Main terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 30,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-white/10
            bg-[#080a15]/80
            backdrop-blur-xl
          "
        >
          {/* Grid */}
          <div
            className="
              pointer-events-none absolute inset-0
              opacity-[0.035]
              [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
              [background-size:64px_64px]
            "
          />

          {/* Top terminal bar */}
          <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <Terminal
                size={15}
                className="text-[var(--primary)]"
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Communication Terminal
              </span>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              PORTFOLIO_OS / 06
            </span>
          </div>

          {/* Content */}
          <div className="relative grid lg:grid-cols-[1.4fr_0.6fr]">

            {/* Left */}
            <div className="border-b border-white/10 p-8 md:p-14 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--primary)]/70">
                Connection available
              </p>

              <h2 className="mt-6 max-w-4xl text-5xl font-medium tracking-tight text-white/90 md:text-7xl">
                Let&apos;s build
                <span className="text-white/25"> something.</span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/40 md:text-lg">
                Have an internship, project, experiment, or interesting
                problem in mind? Send me a message and let&apos;s see what
                we can build.
              </p>

              {/* Primary action */}
              <div className="mt-10">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    email,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="
                    group inline-flex items-center gap-3
                    rounded-full
                    bg-white
                    px-7 py-3.5
                    text-sm font-medium text-black
                    transition-all duration-300
                    hover:scale-[1.03]
                    hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]
                  "
                >
                  <Mail size={16} />

                  Start a conversation

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Right — connection info */}
            <div className="flex flex-col justify-between p-8 md:p-10">

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                  Available channels
                </p>

                <div className="mt-6 space-y-3">

                  {/* GitHub */}
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="
                      group flex items-center justify-between
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.025]
                      p-4
                      transition-all duration-300
                      hover:border-white/20
                      hover:bg-white/[0.05]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <FaGithub
                        size={17}
                        className="text-white/40 transition-colors group-hover:text-white"
                      />

                      <span className="text-sm text-white/55 group-hover:text-white">
                        GitHub
                      </span>
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                    />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/i-shashikant"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="
                      group flex items-center justify-between
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.025]
                      p-4
                      transition-all duration-300
                      hover:border-white/20
                      hover:bg-white/[0.05]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <FaLinkedinIn
                        size={17}
                        className="text-white/40 transition-colors group-hover:text-white"
                      />

                      <span className="text-sm text-white/55 group-hover:text-white">
                        LinkedIn
                      </span>
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                    />
                  </a>

                </div>
              </div>

              {/* Status */}
              <div className="mt-12 lg:mt-0">
                <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-5">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>

                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400/70">
                      System online
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-white/45">
                    Open to internships, collaborations, and interesting
                    engineering problems.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom status bar */}
          <div className="relative flex flex-col gap-3 border-t border-white/10 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              SHASHIKANT / PORTFOLIO_OS
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              Connection ready
            </span>
          </div>
        </motion.div>

        {/* Final footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: osEntered ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/15">
            END_OF_PORTFOLIO_OS
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/15">
            Built with curiosity.
          </span>
        </motion.div>
      </div>
    </section>
  );
}