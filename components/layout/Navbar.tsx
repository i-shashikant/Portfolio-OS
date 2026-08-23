'use client';

import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useState } from 'react';

import Container from '@/components/ui/Container';
import { socials } from '@/data/socials';

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Lab', href: '#lab' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: 'smooth' });

    setOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6"
    >
      <Container>
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-5">
          
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black transition-transform duration-300 group-hover:rotate-6">
              P
            </span>

            <span className="hidden font-semibold tracking-tight sm:block">
              Portfolio OS
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="rounded-xl px-4 py-2 text-sm text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl p-2.5 text-white/60 transition hover:bg-white/5 hover:text-white sm:block"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>

            <button
              className="hidden items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-200 transition hover:bg-violet-500/20 sm:flex"
            >
              <Sparkles size={16} />
              <span>AI</span>
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setOpen((value) => !value)}
              className="rounded-xl p-2 text-white/70 transition hover:bg-white/5 hover:text-white md:hidden"
              aria-label="Toggle navigation"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 bg-black/70 p-3 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </Container>
    </motion.header>
  );
}