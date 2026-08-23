'use client';

import { useEffect } from 'react';
import { usePortfolio } from '@/stores/portfolio-store';

export default function KeyboardController() {
  const {
    osEntered,
    goHome,
    openSection,
    nextProject,
    previousProject,
    section,
  } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore keyboard shortcuts while typing.
      const target = event.target as HTMLElement | null;

      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      // Portfolio hasn't been entered yet.
      if (!osEntered) return;

      switch (event.key.toLowerCase()) {
        case 'h':
          event.preventDefault();
          goHome();
          break;

        case 'p':
          event.preventDefault();
          openSection('projects');
          break;

        case 's':
          event.preventDefault();
          openSection('skills');
          break;

        case 'l':
          event.preventDefault();
          openSection('lab');
          break;

        case 'c':
          event.preventDefault();
          openSection('contact');
          break;

        case 'escape':
          event.preventDefault();
          goHome();
          break;

        case 'arrowright':
          // Only project navigation should respond to arrows.
          if (section === 'projects') {
            event.preventDefault();
            nextProject();
          }
          break;

        case 'arrowleft':
          if (section === 'projects') {
            event.preventDefault();
            previousProject();
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    osEntered,
    section,
    goHome,
    openSection,
    nextProject,
    previousProject,
  ]);

  return null;
}