"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Code2,
  FlaskConical,
  Home,
  Mail,
  User,
  Sparkles,
  Hand,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { usePortfolio } from "@/stores/portfolio-store";
import OSWindow from "@/components/os/OSWindow";
import { projects } from "@/data/projects";

type OSApp = {
  id:
    | "home"
    | "projects"
    | "about"
    | "skills"
    | "contact";

  label: string;

  description: string;

  icon: React.ReactNode;
};

const apps: OSApp[] = [
  {
    id: "home",
    label: "Home",
    description: "Portfolio overview",
    icon: <Home size={22} />,
  },

  {
    id: "projects",
    label: "Projects",
    description: "Selected work",
    icon: <Briefcase size={22} />,
  },

  {
    id: "about",
    label: "About",
    description: "About me",
    icon: <User size={22} />,
  },

  {
    id: "skills",
    label: "Skills",
    description: "Technical stack",
    icon: <Code2 size={22} />,
  },


  {
    id: "contact",
    label: "Contact",
    description: "Get in touch",
    icon: <Mail size={22} />,
  },
];

export default function OSDesktop() {
  const {
    osEntered,
    section,
    gesturesEnabled,
    activeProjectIndex,
    toggleGestures,
    toggleGestureGuide,
    openSection,
    nextProject,
    previousProject,
  } = usePortfolio();

  /*
   * Don't render the desktop until
   * Portfolio OS has been entered.
   */

  if (!osEntered) {
    return null;
  }
  const activeProject =
  projects[activeProjectIndex];

  const currentApp =
    apps.find(
      (app) => app.id === section
    ) ?? apps[0];

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        inset-0
        z-[9990]
        overflow-hidden
        bg-[#050509]
        text-white
      "
    >
      {/* =====================================
          AMBIENT BACKGROUND
          ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_30%,rgba(139,92,246,0.10),transparent_40%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* =====================================
      {/* Main OS Desktop content managed by Navbar header */}

      {/* =====================================
          DESKTOP CONTENT
          ===================================== */}

      <main
        className="
          relative
          flex
          h-full
          w-full
          items-center
          justify-center
          px-6
          pb-24
          pt-24
        "
      >
        <div
          className="
            grid
            w-full
            max-w-5xl
            grid-cols-2
            gap-4
            sm:grid-cols-3
          "
        >
          {apps.map((app, index) => {
            const isActive =
              app.id === section;

            return (
              <motion.button
                key={app.id}
                type="button"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    0.08 * index,
                  duration: 0.45,
                }}
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  openSection(app.id)
                }
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  p-6
                  text-left
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        border-violet-400/30
                        bg-violet-500/[0.08]
                      `
                      : `
                        border-white/[0.07]
                        bg-white/[0.025]
                        hover:border-white/[0.14]
                        hover:bg-white/[0.045]
                      `
                  }
                `}
              >
                {/* Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-violet-500/10
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                {/* Icon */}

                <div
                  className={`
                    relative
                    mb-8
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    transition-colors
                    ${
                      isActive
                        ? `
                          border-violet-400/30
                          bg-violet-500/10
                          text-violet-200
                        `
                        : `
                          border-white/[0.08]
                          bg-white/[0.04]
                          text-white/50
                          group-hover:text-white
                        `
                    }
                  `}
                >
                  {app.icon}
                </div>

                {/* Text */}

                <div
                  className="
                    relative
                    text-sm
                    font-medium
                  "
                >
                  {app.label}
                </div>

                <div
                  className="
                    relative
                    mt-1
                    text-xs
                    text-white/30
                  "
                >
                  {app.description}
                </div>

                {/* Active indicator */}

                {isActive && (
                  <div
                    className="
                      absolute
                      bottom-4
                      right-4
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_10px_rgba(52,211,153,0.8)]
                    "
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </main>

      {/* =====================================
          PROJECT NAVIGATION
          ===================================== */}

      {section === "projects" && (
        <div
          className="
            absolute
            bottom-24
            left-1/2
            z-20
            flex
            -translate-x-1/2
            items-center
            gap-2
            rounded-full
            border
            border-white/[0.08]
            bg-black/60
            p-1
            backdrop-blur-xl
          "
        >
          <button
            type="button"
            onClick={previousProject}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-white/40
              transition-colors
              hover:bg-white/[0.07]
              hover:text-white
            "
            aria-label="Previous project"
          >
            <ChevronLeft
              size={16}
            />
          </button>

          <span
            className="
              px-2
              font-mono
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/25
            "
          >
            Projects
          </span>

          <button
            type="button"
            onClick={nextProject}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-white/40
              transition-colors
              hover:bg-white/[0.07]
              hover:text-white
            "
            aria-label="Next project"
          >
            <ChevronRight
              size={16}
            />
          </button>
        </div>
      )}

      {/* =====================================
          BOTTOM TASKBAR
          ===================================== */}

      <nav
        className="
          absolute
          bottom-4
          left-1/2
          z-20
          flex
          -translate-x-1/2
          items-center
          gap-1
          rounded-2xl
          border
          border-white/[0.08]
          bg-black/60
          p-1.5
          backdrop-blur-2xl
        "
      >
        {apps.map((app) => {
          const isActive =
            app.id === section;

          return (
            <button
              key={app.id}
              type="button"
              title={app.label}
              onClick={() =>
                openSection(app.id)
              }
              className={`
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                transition-all
                duration-200

                ${
                  isActive
                    ? `
                      bg-white/[0.10]
                      text-white
                    `
                    : `
                      text-white/30
                      hover:bg-white/[0.05]
                      hover:text-white/70
                    `
                }
              `}
            >
              {app.icon}

              {isActive && (
                <span
                  className="
                    absolute
                    bottom-1
                    h-0.5
                    w-3
                    rounded-full
                    bg-violet-400
                  "
                />
              )}
            </button>
          );
        })}

        <div
          className="
            mx-1
            h-5
            w-px
            bg-white/[0.08]
          "
        />

        <button
          type="button"
          title="AI"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-white/30
            transition-colors
            hover:bg-violet-500/10
            hover:text-violet-200
          "
        >
          <Sparkles size={18} />
        </button>
      </nav>

      {/* =====================================
          STATUS
          ===================================== */}

      <div
        className="
          absolute
          bottom-6
          left-6
          hidden
          items-center
          gap-2
          font-mono
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/20
          md:flex
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

        Portfolio OS Online
      </div>

      <div
        className="
          absolute
          bottom-6
          right-6
          hidden
          font-mono
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/15
          md:block
        "
      >
        {gesturesEnabled
          ? "Gesture Control Active"
          : "Keyboard Control"}
      </div>
      <OSWindow
  open={section === "projects"}
  title="Projects"
  description="Selected work"
  onClose={() =>
    openSection("home")
  }
>
  <div className="mx-auto max-w-6xl p-6 md:p-10">
    {/* Header */}

    <div className="mb-10">
      <div
        className="
          font-mono
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-violet-300/50
        "
      >
        Portfolio / Projects
      </div>

      <h2
        className="
          mt-3
          text-3xl
          font-semibold
          tracking-[-0.03em]
          text-white
          md:text-5xl
        "
      >
        Selected Work
      </h2>

      <p
        className="
          mt-3
          max-w-2xl
          text-sm
          leading-6
          text-white/35
        "
      >
        A collection of projects,
        experiments and systems I've
        built.
      </p>
    </div>

    {/* Project */}

    {activeProject && (
      <motion.div
        key={activeProject.slug}
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          bg-white/[0.025]
        "
      >
        {/* Project visual */}

        <div
          className="
            flex
            min-h-[260px]
            items-center
            justify-center
            border-b
            border-white/[0.07]
            bg-gradient-to-br
            from-violet-500/[0.08]
            via-transparent
            to-transparent
            p-10
          "
        >
          <div className="text-center">
            <div
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-white/20
              "
            >
              Project
            </div>

            <div
              className="
                mt-3
                text-4xl
                font-semibold
                tracking-[-0.04em]
                text-white/90
              "
            >
              {activeProject.title}
            </div>
          </div>
        </div>

        {/* Details */}

        <div className="p-6 md:p-8">
          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-start
              md:justify-between
            "
          >
            <div>
              <div
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-violet-300/50
                "
              >
                {activeProject.category}
              </div>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  text-white
                "
              >
                {activeProject.title}
              </h3>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-white/40
                "
              >
                {activeProject.description}
              </p>
            </div>

            {/* Project number */}

            <div
              className="
                shrink-0
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-white/20
              "
            >
              {String(
                activeProjectIndex + 1
              ).padStart(2, "0")}{" "}
              /{" "}
              {String(
                projects.length
              ).padStart(2, "0")}
            </div>
          </div>
        </div>
      </motion.div>
    )}

    {/* Navigation */}

    <div
      className="
        mt-6
        flex
        items-center
        justify-between
      "
    >
      <button
        type="button"
        onClick={previousProject}
        className="
          rounded-xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          px-4
          py-2.5
          text-xs
          text-white/40
          transition-colors
          hover:bg-white/[0.06]
          hover:text-white
        "
      >
        ← Previous
      </button>

      <div
        className="
          font-mono
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/20
        "
      >
        Arrow keys supported
      </div>

      <button
        type="button"
        onClick={nextProject}
        className="
          rounded-xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          px-4
          py-2.5
          text-xs
          text-white/40
          transition-colors
          hover:bg-white/[0.06]
          hover:text-white
        "
      >
        Next →
      </button>
    </div>
  </div>
</OSWindow>
    </motion.div>
  );
}