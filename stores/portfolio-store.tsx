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

export type OSTheme = 'dark' | 'cyberpunk' | 'obsidian' | 'matrix';

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

  const [gesturesEnabled, setGesturesEnabled] = useState(false);
  const [devModeOpen, setDevModeOpen] = useState(false);
  const [gestureGuideOpen, setGestureGuideOpenState] = useState(false);
  const [gestureToast, setGestureToast] = useState<string | null>(null);

  const toggleGestures = useCallback(() => {
    setGesturesEnabled((current) => !current);
  }, []);

  const toggleDevMode = useCallback(() => {
    setDevModeOpen((current) => !current);
  }, []);

  const toggleGestureGuide = useCallback(() => {
    setGestureGuideOpenState((current) => !current);
  }, []);

  const setGestureGuideOpen = useCallback((open: boolean) => {
    setGestureGuideOpenState(open);
  }, []);

  const triggerGestureToast = useCallback((message: string) => {
    setGestureToast(message);
    setTimeout(() => {
      setGestureToast((current) => (current === message ? null : current));
    }, 2500);
  }, []);

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

  const [theme, setThemeState] = useState<OSTheme>('dark');
  const [projectFilterTag, setProjectFilterTagState] = useState<string>('All');
  const [gitHubWidgetOpen, setGitHubWidgetOpen] = useState(false);

  const setTheme = useCallback((newTheme: OSTheme) => {
    setThemeState(newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, []);

  const setProjectFilterTag = useCallback((tag: string) => {
    setProjectFilterTagState(tag);
  }, []);

  const toggleGitHubWidget = useCallback(() => {
    setGitHubWidgetOpen((current) => !current);
  }, []);

  const value = useMemo(
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