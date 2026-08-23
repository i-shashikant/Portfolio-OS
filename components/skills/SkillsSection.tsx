'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';

const skillGroups = [
  {
    number: '01',
    title: 'Languages',
    description: 'The tools I use to think, build, and solve problems.',
    skills: [
      'Python',
      'JavaScript',
      'TypeScript',
      'SQL',
      'Java',
      'HTML',
      'CSS',
    ],
  },
  {
    number: '02',
    title: 'AI & Data',
    description: 'Turning data into models, insights, and intelligent systems.',
    skills: [
      'Machine Learning',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'CatBoost',
      'Matplotlib',
      'Data Analysis',
    ],
  },
  {
    number: '03',
    title: 'Development',
    description: 'Building full-stack applications and backend systems.',
    skills: [
      'React',
      'Next.js',
      'Vue 3',
      'Flask',
      'FastAPI',
      'SQLAlchemy',
      'REST APIs',
    ],
  },
  {
    number: '04',
    title: 'Tools & Infrastructure',
    description: 'The systems behind the things I build.',
    skills: [
      'Git',
      'GitHub',
      'Docker',
      'PostgreSQL',
      'Redis',
      'Pinia',
      'Celery',
    ],
  },
];

export default function SkillsSection() {
  const { osEntered } = usePortfolio();

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none absolute
          -right-40 top-1/3
          h-[500px] w-[500px]
          rounded-full
          bg-violet-500/[0.035]
          blur-[140px]
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 20,
          }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/70">
            02
          </span>

          <span className="h-px w-12 bg-white/10" />

          <span className="text-xs uppercase tracking-[0.25em] text-white/30">
            Skills
          </span>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: osEntered ? 1 : 0,
            y: osEntered ? 0 : 25,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="mb-20 max-w-3xl"
        >
          <h2 className="text-4xl font-medium tracking-tight text-white/90 md:text-6xl">
            Tools I use to turn
            <span className="text-white/30"> ideas into systems.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
            A constantly evolving toolkit spanning software engineering,
            machine learning, data science, and modern web development.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.number}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: osEntered ? 1 : 0,
                y: osEntered ? 0 : 30,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15 + index * 0.08,
              }}
              className="
                group
                relative
                min-h-[300px]
                bg-[#070914]
                p-7
                transition-colors
                duration-500
                hover:bg-white/[0.025]
                md:p-9
              "
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/20">
                  {group.number}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/50 transition-all duration-300 group-hover:scale-150 group-hover:bg-emerald-400" />
              </div>

              {/* Title */}
              <div className="mt-10">
                <h3 className="text-2xl font-medium tracking-tight text-white/85">
                  {group.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/30">
                  {group.description}
                </p>
              </div>

              {/* Skills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-full
                      border border-white/10
                      bg-white/[0.025]
                      px-3 py-1.5
                      text-xs
                      text-white/45
                      transition-all
                      duration-300
                      hover:border-violet-400/30
                      hover:bg-violet-400/[0.06]
                      hover:text-white/80
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom system line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: osEntered ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="mt-8 flex items-center justify-between"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/15">
            SKILL_MATRIX / ACTIVE
          </span>

          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/30">
            ONLINE
          </span>
        </motion.div>
      </div>
    </section>
  );
}