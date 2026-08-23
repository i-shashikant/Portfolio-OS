'use client';

import { useEffect } from 'react';

import { usePortfolio } from '@/stores/portfolio-store';

export function usePortfolioKeyboard() {
  const {
    enterOS,
    goHome,
    openSection,
    nextProject,
    previousProject,
  } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      // Don't hijack typing inside inputs, textareas, etc.
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          enterOS();
          break;

        case 'Escape':
          event.preventDefault();
          goHome();
          break;

        case 'ArrowRight':
          event.preventDefault();
          nextProject();
          break;

        case 'ArrowLeft':
          event.preventDefault();
          previousProject();
          break;

        case 'h':
        case 'H':
          event.preventDefault();
          goHome();
          break;

        case 'p':
        case 'P':
          event.preventDefault();
          openSection('projects');
          break;

        case 's':
        case 'S':
          event.preventDefault();
          openSection('skills');
          break;

        case 'l':
        case 'L':
          event.preventDefault();
          openSection('lab');
          break;

        case 'c':
        case 'C':
          event.preventDefault();
          openSection('contact');
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [
    enterOS,
    goHome,
    openSection,
    nextProject,
    previousProject,
  ]);
}