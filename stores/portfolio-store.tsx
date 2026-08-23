'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { projects } from '@/data/projects';

export type PortfolioSection =
  | 'home'
  | 'projects'
  | 'about'
  | 'skills'
  | 'lab'
  | 'contact';

type PortfolioState = {
  section: PortfolioSection;
  activeProjectIndex: number;
  osEntered: boolean;

  enterOS: () => void;
  goHome: () => void;
  openSection: (section: PortfolioSection) => void;

  nextProject: () => void;
  previousProject: () => void;
  openProject: (slug: string) => void;
  setActiveProject: (index: number) => void;
};

const PortfolioContext = createContext<PortfolioState | null>(null);

export function PortfolioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [section, setSection] =
    useState<PortfolioSection>('home');

  const [activeProjectIndex, setActiveProjectIndex] =
    useState(0);


  const [osEntered, setOsEntered] = useState(false);

  const setActiveProject = useCallback((index: number) => {
    if (index < 0 || index >= projects.length) return;

    setActiveProjectIndex(index);
    }, []);

  const enterOS = useCallback(() => {
    setOsEntered(true);
    setSection('home');
  }, []);

  const goHome = useCallback(() => {
    setSection('home');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const openSection = useCallback(
    (nextSection: PortfolioSection) => {
      setSection(nextSection);

      const element = document.getElementById(
        nextSection === 'home'
          ? 'hero'
          : nextSection === 'projects'
            ? 'projects'
            : nextSection,
      );

      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    [],
  );

  const nextProject = useCallback(() => {
    setActiveProjectIndex((current) =>
        current === projects.length - 1 ? 0 : current + 1,
    );

    if (section !== 'projects') {
        openSection('projects');
    }
    }, [section, openSection]);

  const previousProject = useCallback(() => {
    setActiveProjectIndex((current) =>
        current === 0 ? projects.length - 1 : current - 1,
    );

    if (section !== 'projects') {
        openSection('projects');
    }
    }, [section, openSection]);

  const openProject = useCallback(
    (slug: string) => {
      const index = projects.findIndex(
        (project) => project.slug === slug,
      );

      if (index === -1) return;

      setActiveProjectIndex(index);
      openSection('projects');
    },
    [openSection],
  );

  const value = useMemo(
    () => ({
      section,
      activeProjectIndex,
      osEntered,

      enterOS,
      goHome,
      openSection,

      nextProject,
      previousProject,
      openProject,
      setActiveProject,
    }),
    [
      section,
      activeProjectIndex,
      osEntered,
      enterOS,
      goHome,
      openSection,
      nextProject,
      previousProject,
      openProject,
      setActiveProject,
    ],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      'usePortfolio must be used inside PortfolioProvider',
    );
  }

  return context;
}