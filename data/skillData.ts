export type SkillStrength = 'Core' | 'Strong' | 'Working' | 'Exploring';

export interface SkillItem {
  id: string;
  name: string;
  category:
    | 'languages'
    | 'frontend'
    | 'backend'
    | 'ai-data'
    | 'computer-vision'
    | 'creative'
    | 'tools';
  categoryLabel: string;
  description: string;
  strength: SkillStrength;
  brandColor: string;
  glowColor: string;
  iconType: string;
  codeSnippet: string;
  highlights: string[];
}

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Skills' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai-data', label: 'AI & Data' },
  { id: 'computer-vision', label: 'Computer Vision' },
  { id: 'creative', label: 'Creative Tech' },
  { id: 'tools', label: 'Tools' },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    description:
      'Primary language for machine learning, data science, experimentation, and Python-based backend development.',
    strength: 'Core',
    brandColor: '#3776AB',
    glowColor: 'rgba(55, 118, 171, 0.4)',
    iconType: 'python',
    highlights: [
      'Machine learning and data science workflows',
      'Backend development with Flask',
      'Data processing and experimentation',
    ],
    codeSnippet: `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)`,
  },

  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    description:
      'Used to build interactive web applications, browser experiences, and dynamic application logic.',
    strength: 'Strong',
    brandColor: '#F7DF1E',
    glowColor: 'rgba(247, 223, 30, 0.4)',
    iconType: 'javascript',
    highlights: [
      'Interactive web interfaces',
      'Modern ES6+ syntax',
      'Browser and application logic',
    ],
    codeSnippet: `const openWindow = (windowId) => {
  setActiveWindow(windowId);
};`,
  },

  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    description:
      'Used throughout the Portfolio OS for type-safe React components, application state, and reusable data models.',
    strength: 'Strong',
    brandColor: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.4)',
    iconType: 'typescript',
    highlights: [
      'Typed React components',
      'Interfaces and reusable data models',
      'Safer application architecture',
    ],
    codeSnippet: `type Project = {
  slug: string;
  title: string;
  technologies: string[];
};`,
  },

  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'FRONTEND',
    description:
      'Building component-driven interfaces with state, hooks, animations, and interactive application architecture.',
    strength: 'Core',
    brandColor: '#61DAFB',
    glowColor: 'rgba(97, 218, 251, 0.4)',
    iconType: 'react',
    highlights: [
      'Component-driven UI development',
      'Hooks and state management',
      'Interactive and animated interfaces',
    ],
    codeSnippet: `const [activeSkill, setActiveSkill] =
  useState<SkillItem | null>(null);

return (
  <ReactiveSkillCard
    skill={skill}
    onSelect={setActiveSkill}
  />
);`,
  },

  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'FRONTEND',
    description:
      'Used for building full-stack React applications with the App Router, API routes, and server/client components.',
    strength: 'Strong',
    brandColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    iconType: 'nextjs',
    highlights: [
      'App Router',
      'API routes',
      'Server and client components',
    ],
    codeSnippet: `export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
    </main>
  );
}`,
  },

  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    categoryLabel: 'FRONTEND',
    description:
      'Used in full-stack applications for reactive interfaces and application state management.',
    strength: 'Working',
    brandColor: '#4FC08D',
    glowColor: 'rgba(79, 192, 141, 0.4)',
    iconType: 'vue',
    highlights: [
      'Vue 3 interfaces',
      'Reactive application state',
      'Used in CampusChaupal',
    ],
    codeSnippet: `<script setup>
import { ref } from 'vue';

const applications = ref([]);
</script>`,
  },

  {
    id: 'flask',
    name: 'Flask',
    category: 'backend',
    categoryLabel: 'BACKEND',
    description:
      'Python backend framework used to build full-stack applications and REST APIs.',
    strength: 'Strong',
    brandColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    iconType: 'flask',
    highlights: [
      'REST API development',
      'SQLAlchemy integration',
      'Used in CampusChaupal and GoGhummi',
    ],
    codeSnippet: `from flask import Flask

app = Flask(__name__)

@app.get("/api/health")
def health():
    return {"status": "ok"}`,
  },

  {
    id: 'sql',
    name: 'SQL & Databases',
    category: 'backend',
    categoryLabel: 'BACKEND / DATA',
    description:
      'Used for storing, querying, and structuring application data in full-stack projects.',
    strength: 'Working',
    brandColor: '#4169E1',
    glowColor: 'rgba(65, 105, 225, 0.4)',
    iconType: 'sql',
    highlights: [
      'Relational data modeling',
      'SQL queries',
      'SQLAlchemy-based applications',
    ],
    codeSnippet: `SELECT name, email
FROM students
WHERE placement_status = 'eligible';`,
  },

  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'ai-data',
    categoryLabel: 'AI / DATA',
    description:
      'Developing and evaluating machine learning models with feature engineering, model comparison, and hyperparameter tuning.',
    strength: 'Core',
    brandColor: '#E97108',
    glowColor: 'rgba(233, 113, 8, 0.4)',
    iconType: 'ml',
    highlights: [
      'Model evaluation and comparison',
      'Feature engineering',
      'Manual hyperparameter tuning',
      'Regression and classification workflows',
    ],
    codeSnippet: `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model.fit(X_train, y_train)`,
  },

  {
    id: 'mediapipe',
    name: 'MediaPipe',
    category: 'computer-vision',
    categoryLabel: 'COMPUTER VISION',
    description:
      'Used for real-time hand tracking and gesture-based interaction inside the Portfolio OS.',
    strength: 'Working',
    brandColor: '#00A8E8',
    glowColor: 'rgba(0, 168, 232, 0.4)',
    iconType: 'mediapipe',
    highlights: [
      'Real-time hand landmark detection',
      'Gesture classification',
      'Camera-based interaction',
    ],
    codeSnippet: `const result = handLandmarker.detectForVideo(
  video,
  timestamp
);

const landmarks = result.landmarks?.[0];`,
  },

  {
    id: 'threejs',
    name: 'Three.js',
    category: 'creative',
    categoryLabel: 'CREATIVE TECH',
    description:
      'Exploring 3D and immersive web experiences as part of the Portfolio OS.',
    strength: 'Exploring',
    brandColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    iconType: 'threejs',
    highlights: [
      'Interactive 3D web experiences',
      'React Three Fiber experiments',
      'Visual experimentation',
    ],
    codeSnippet: `import { Canvas } from '@react-three/fiber';

export function Scene() {
  return (
    <Canvas>
      {/* Interactive scene */}
    </Canvas>
  );
}`,
  },

  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    categoryLabel: 'TOOLS',
    description:
      'Used for version control, project development, experimentation, and maintaining source code.',
    strength: 'Strong',
    brandColor: '#F05032',
    glowColor: 'rgba(240, 80, 50, 0.4)',
    iconType: 'git',
    highlights: [
      'Version control',
      'Branch-based development',
      'GitHub project management',
    ],
    codeSnippet: `git checkout -b feature/experience-section
git add .
git commit -m "feat: add reactive experience"
git push origin feature/experience-section`,
  },

  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'tools',
    categoryLabel: 'UI / STYLING',
    description:
      'Used extensively for responsive layouts, visual systems, and interactive UI styling.',
    strength: 'Strong',
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    iconType: 'tailwind',
    highlights: [
      'Responsive UI',
      'Utility-first styling',
      'Interactive visual systems',
    ],
    codeSnippet: `<div className="
  rounded-3xl
  border border-white/10
  bg-white/[0.02]
  p-6
">
  Interactive UI
</div>`,
  },
];