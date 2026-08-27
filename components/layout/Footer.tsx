'use client';

import { usePortfolio } from '@/stores/portfolio-store';

export default function Footer() {
  const { goHome, openSection } = usePortfolio();

  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={goHome}
          className="
            text-left
            text-sm
            font-medium
            tracking-tight
            text-white/70
            transition-colors
            hover:text-white
          "
        >
          Shashikant<span className="text-white/20">.</span>
        </button>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-5">
          {[
            ['Work', 'projects'],
            ['Experience', 'experience'],
            ['How I Work', 'how-i-work'],
            ['Skills', 'skills'],
            ['About', 'about'],
            ['Contact', 'contact'],
          ].map(([label, section]) => (
            <button
              key={section}
              type="button"
              onClick={() =>
                openSection(
                  section as
                    | 'projects'
                    | 'experience'
                    | 'how-i-work'
                    | 'skills'
                    | 'about'
                    | 'contact',
                )
              }
              className="
                text-xs
                text-white/30
                transition-colors
                hover:text-white
              "
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Copyright */}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/15">
          © 2026 Shashikant
        </span>
      </div>
    </footer>
  );
}