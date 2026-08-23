'use client';

import { motion } from 'framer-motion';

const skills = [
  {
    name: 'Python',
    category: 'Languages',
    description: 'Data science, backend development and automation.',
  },
  {
    name: 'JavaScript',
    category: 'Languages',
    description: 'Interactive web applications and frontend development.',
  },
  {
    name: 'TypeScript',
    category: 'Languages',
    description: 'Type-safe application development.',
  },
  {
    name: 'React',
    category: 'Frontend',
    description: 'Component-driven interfaces and interactive experiences.',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    description: 'Modern full-stack React applications.',
  },
  {
    name: 'Vue',
    category: 'Frontend',
    description: 'Reactive interfaces and application dashboards.',
  },
  {
    name: 'Flask',
    category: 'Backend',
    description: 'REST APIs and Python backend systems.',
  },
  {
    name: 'SQL',
    category: 'Data',
    description: 'Relational data modeling and database operations.',
  },
  {
    name: 'Machine Learning',
    category: 'AI / Data',
    description: 'Predictive modeling, feature engineering and experimentation.',
  },
  {
    name: 'Git',
    category: 'Tools',
    description: 'Version control and collaborative development.',
  },
  {
    name: 'Docker',
    category: 'Tools',
    description: 'Containerized application development.',
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative px-6 py-32 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-violet-400" />

          <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            Tech Stack
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl scroll-mt-32"
        >
          Tools I use to turn{' '}
          <span className="text-white/40">
            ideas into systems.
          </span>
        </motion.h2>

        {/* Skills */}
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors duration-300 hover:border-violet-400/30 hover:bg-white/[0.045]"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    {skill.name}
                  </h3>

                  <span className="text-xs text-white/20 transition-colors group-hover:text-violet-300/70">
                    ↗
                  </span>
                </div>

                <p className="mt-2 text-xs uppercase tracking-wider text-white/30">
                  {skill.category}
                </p>

                <p className="mt-4 text-sm leading-6 text-white/40">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}