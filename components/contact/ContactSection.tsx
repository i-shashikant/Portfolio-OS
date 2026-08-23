'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/40">
            Contact
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          Have an idea?
          <br />
          <span className="text-white/30">Let&apos;s build it.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg"
        >
          I&apos;m always interested in interesting products, experiments,
          collaborations, and opportunities where software, data, and AI come
          together.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="mailto:shashi873kant@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ y: -3 }}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-violet-400"
        >
          <Mail size={17} />
          Get in touch
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.a>

        {/* Bottom area */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {/* Email */}
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/30">
                Email
              </p>

              <a
                href="mailto:shashi873kant@gmail.com"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                shashi873kant@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 flex flex-col gap-2 text-xs text-white/25 md:flex-row md:items-center md:justify-between">
            <span>© 2026 Shashikant</span>
            <span>Portfolio OS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}