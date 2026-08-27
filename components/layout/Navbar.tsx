'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useState } from 'react';

import { usePortfolio } from '@/stores/portfolio-store';
import Container from '@/components/ui/Container';
import { socials } from '@/data/socials';

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'How I Work', href: '#how-i-work' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { gesturesEnabled, toggleGestures } = usePortfolio();

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
      className="
        fixed
        inset-x-0
        top-2
        z-50
        px-3
        sm:px-4
        md:px-5
      "
    >
      <Container>
        <nav
          className="
            mx-auto
            flex
            h-14
            w-full
            max-w-6xl
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            px-3
            shadow-2xl
            shadow-black/20
            backdrop-blur-xl
            sm:px-4
            md:px-10
          "
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="
              group
              flex
              shrink-0
              items-center
              gap-2
            "
          >
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-white
                text-sm
                font-bold
                text-black
                transition-transform
                duration-300
                group-hover:rotate-6
                sm:h-9
                sm:w-9
                sm:rounded-xl
              "
            >
              P
            </span>

            <span className="font-semibold tracking-tight text-sm text-white">
              Portfolio OS
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className="
                  rounded-xl
                  px-2.5
                  py-2
                  text-xs
                  font-semibold
                  text-white/80
                  transition-all
                  duration-300
                  hover:bg-white/5
                  hover:text-white
                  xl:px-5
                "
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

            {/* GitHub */}
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                hidden
                rounded-xl
                p-2.5
                text-white/60
                transition
                hover:bg-white/5
                hover:text-white
                sm:block
              "
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>

            {/* Gesture Control */}
            <button
              type="button"
              onClick={toggleGestures}
              aria-label={
                gesturesEnabled
                  ? 'Disable gesture control'
                  : 'Enable gesture control'
              }
              title={
                gesturesEnabled
                  ? 'Disable gesture control'
                  : 'Enable gesture control'
              }
              className={`
                hidden
                items-center
                gap-2
                rounded-full
                border
                px-3.5
                py-2
                text-xs
                transition-all
                duration-300
                sm:flex
                ${
                  gesturesEnabled
                    ? `
                      border-emerald-400/30
                      bg-emerald-400/10
                      text-emerald-300
                    `
                    : `
                      border-white/10
                      bg-white/[0.03]
                      text-white/50
                      hover:border-white/20
                      hover:bg-white/[0.07]
                      hover:text-white
                    `
                }
              `}
            >
              <span
                className={`
                  h-2
                  w-2
                  rounded-full
                  ${
                    gesturesEnabled
                      ? 'bg-emerald-400'
                      : 'bg-white/20'
                  }
                `}
              />

              Gestures
            </button>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                text-white/70
                transition
                hover:bg-white/5
                hover:text-white
                lg:hidden
              "
              aria-label="Toggle navigation"
              aria-expanded={open}
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
            transition={{ duration: 0.2 }}
            className="
              mx-auto
              mt-2
              w-full
              max-w-6xl
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-black/80
              p-2
              shadow-2xl
              backdrop-blur-xl
              lg:hidden
            "
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.03,
                }}
                className="
                  block
                  w-full
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-white/60
                  transition
                  hover:bg-white/5
                  hover:text-white
                "
              >
                <span className="mr-3 font-mono text-[9px] text-white/20">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </Container>
    </motion.header>
  );
}