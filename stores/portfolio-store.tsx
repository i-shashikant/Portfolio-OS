'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { projects } from '@/data/projects';

export type PortfolioSection =
  | 'home'
  | 'projects'
  | 'experience'
  | 'how-i-work'
  | 'skills'
  | 'about'
  | 'contact';

export type OSTheme =
  | 'dark'
  | 'cyberpunk'
  | 'obsidian'
  | 'matrix';

type PortfolioState = {
  section: PortfolioSection;

  activeProjectIndex: number;

  osEntered: boolean;

  gesturesEnabled: boolean;

  devModeOpen: boolean;

  gestureGuideOpen: boolean;

  gestureToast: string | null;

  theme: OSTheme;

  projectFilterTag: string;

  gitHubWidgetOpen: boolean;

  commandPaletteOpen: boolean;

  aiOpen: boolean;

  enterOS: () => void;

  goHome: () => void;

  openSection: (section: PortfolioSection) => void;

  nextProject: () => void;

  previousProject: () => void;

  openProject: (slug: string) => void;

  setActiveProject: (index: number) => void;

  toggleGestures: () => void;

  toggleDevMode: () => void;

  toggleGestureGuide: () => void;

  setGestureGuideOpen: (open: boolean) => void;

  triggerGestureToast: (message: string) => void;

  setTheme: (theme: OSTheme) => void;

  setProjectFilterTag: (tag: string) => void;

  toggleGitHubWidget: () => void;

  toggleCommandPalette: () => void;

  setAiOpen: (open: boolean) => void;
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

  const [osEntered, setOsEntered] =
    useState(false);

  const [gesturesEnabled, setGesturesEnabled] =
    useState(false);

  const [devModeOpen, setDevModeOpen] =
    useState(false);

  const [gestureGuideOpen, setGestureGuideOpenState] =
    useState(false);

  const [gestureToast, setGestureToast] =
    useState<string | null>(null);

  const [theme, setThemeState] =
    useState<OSTheme>('dark');

  const [projectFilterTag, setProjectFilterTagState] =
    useState('All');

  const [gitHubWidgetOpen, setGitHubWidgetOpen] =
    useState(false);

  const [commandPaletteOpen, setCommandPaletteOpen] =
    useState(false);

  const [aiOpen, setAiOpen] =
    useState(false);

  const toggleCommandPalette = useCallback(() => {
    setCommandPaletteOpen((current) => !current);
  }, []);

  /*
   * --------------------------------
   * Restore saved theme
   * --------------------------------
   */

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem(
        'portfolio-theme',
      ) as OSTheme | null;

    if (
      savedTheme === 'dark' ||
      savedTheme === 'cyberpunk' ||
      savedTheme === 'obsidian' ||
      savedTheme === 'matrix'
    ) {
      setThemeState(savedTheme);

      document.documentElement.setAttribute(
        'data-theme',
        savedTheme,
      );
    } else {
      document.documentElement.setAttribute(
        'data-theme',
        'dark',
      );
    }
  }, []);

  /*
   * --------------------------------
   * Gestures
   * --------------------------------
   */

  const toggleGestures = useCallback(() => {
    setGesturesEnabled((current) => !current);
  }, []);

  /*
   * --------------------------------
   * Developer mode
   * --------------------------------
   */

  const toggleDevMode = useCallback(() => {
    setDevModeOpen((current) => !current);
  }, []);

  /*
   * --------------------------------
   * Gesture guide
   * --------------------------------
   */

  const toggleGestureGuide = useCallback(() => {
    setGestureGuideOpenState((current) => !current);
  }, []);

  const setGestureGuideOpen = useCallback(
    (open: boolean) => {
      setGestureGuideOpenState(open);
    },
    [],
  );

  /*
   * --------------------------------
   * Gesture toast
   * --------------------------------
   */

  const triggerGestureToast = useCallback(
    (message: string) => {
      setGestureToast(message);

      setTimeout(() => {
        setGestureToast((current) =>
          current === message ? null : current,
        );
      }, 2500);
    },
    [],
  );

  /*
   * --------------------------------
   * Projects
   * --------------------------------
   */

  const setActiveProject = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= projects.length
      ) {
        return;
      }

      setActiveProjectIndex(index);
    },
    [],
  );

  const nextProject = useCallback(() => {
    setActiveProjectIndex((current) =>
      current === projects.length - 1
        ? 0
        : current + 1,
    );

    if (section !== 'projects') {
      setSection('projects');

      requestAnimationFrame(() => {
        document
          .getElementById('projects')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      });
    }
  }, [section]);

  const previousProject = useCallback(() => {
    setActiveProjectIndex((current) =>
      current === 0
        ? projects.length - 1
        : current - 1,
    );

    if (section !== 'projects') {
      setSection('projects');

      requestAnimationFrame(() => {
        document
          .getElementById('projects')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      });
    }
  }, [section]);

  const openProject = useCallback(
    (slug: string) => {
      const index = projects.findIndex(
        (project) => project.slug === slug,
      );

      if (index === -1) {
        return;
      }

      setActiveProjectIndex(index);
      setSection('projects');

      requestAnimationFrame(() => {
        document
          .getElementById('projects')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      });
    },
    [],
  );

  /*
   * --------------------------------
   * Navigation
   * --------------------------------
   */

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

      const targetId = nextSection;

      requestAnimationFrame(() => {
        document
          .getElementById(targetId)
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      });
    },
    [],
  );

  /*
   * --------------------------------
   * Theme
   * --------------------------------
   */

  const setTheme = useCallback(
    (newTheme: OSTheme) => {
      setThemeState(newTheme);

      document.documentElement.setAttribute(
        'data-theme',
        newTheme,
      );

      window.localStorage.setItem(
        'portfolio-theme',
        newTheme,
      );
    },
    [],
  );

  /*
   * --------------------------------
   * Project filter
   * --------------------------------
   */

  const setProjectFilterTag = useCallback(
    (tag: string) => {
      setProjectFilterTagState(tag);
    },
    [],
  );

  /*
   * --------------------------------
   * GitHub widget
   * --------------------------------
   */

  const toggleGitHubWidget = useCallback(() => {
    setGitHubWidgetOpen((current) => !current);
  }, []);

  /*
   * --------------------------------
   * AI
   * --------------------------------
   */

  const setAiOpenState = useCallback(
    (open: boolean) => {
      setAiOpen(open);
    },
    [],
  );

  /*
   * --------------------------------
   * Context value
   * --------------------------------
   */

  const value = useMemo<PortfolioState>(
    () => ({
      section,

      activeProjectIndex,

      osEntered,

      gesturesEnabled,

      devModeOpen,

      gestureGuideOpen,

      gestureToast,

      theme,

      projectFilterTag,

      gitHubWidgetOpen,

      commandPaletteOpen,

      aiOpen,

      enterOS,

      goHome,

      openSection,

      nextProject,

      previousProject,

      openProject,

      setActiveProject,

      toggleGestures,

      toggleDevMode,

      toggleGestureGuide,

      setGestureGuideOpen,

      triggerGestureToast,

      setTheme,

      setProjectFilterTag,

      toggleGitHubWidget,

      toggleCommandPalette,

      setAiOpen: setAiOpenState,
    }),
    [
      section,
      activeProjectIndex,
      osEntered,
      gesturesEnabled,
      devModeOpen,
      gestureGuideOpen,
      gestureToast,
      theme,
      projectFilterTag,
      gitHubWidgetOpen,
      commandPaletteOpen,
      aiOpen,
      enterOS,
      goHome,
      openSection,
      nextProject,
      previousProject,
      openProject,
      setActiveProject,
      toggleGestures,
      toggleDevMode,
      toggleGestureGuide,
      setGestureGuideOpen,
      triggerGestureToast,
      setTheme,
      setProjectFilterTag,
      toggleGitHubWidget,
      toggleCommandPalette,
      setAiOpenState,
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