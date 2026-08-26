export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'ai-data' | 'tools';
  categoryLabel: string;
  description: string;
  proficiency: number; // 0 - 100
  experience: string;
  brandColor: string; // Hex or HSL
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
  { id: 'ai-data', label: 'AI & Data Science' },
  { id: 'tools', label: 'Tools & DevOps' },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    description: 'Data science, backend APIs, machine learning, and automation scripting.',
    proficiency: 95,
    experience: '4+ Years',
    brandColor: '#3776AB',
    glowColor: 'rgba(55, 118, 171, 0.4)',
    iconType: 'python',
    highlights: ['AsyncIO & Parallel Execution', 'FastAPI & Flask Architectures', 'Pandas, NumPy & Scikit-Learn'],
    codeSnippet: `import asyncio

async function train_model(data: list[float]) -> dict:
    print("⚡ Optimizing neural hyperparameters...")
    await asyncio.sleep(0.5)
    return {"accuracy": 0.984, "loss": 0.016}

asyncio.run(train_model([0.1, 0.4, 0.9]))`,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    description: 'Interactive web applications, ESNext features, and modern runtime logic.',
    proficiency: 95,
    experience: '5+ Years',
    brandColor: '#F7DF1E',
    glowColor: 'rgba(247, 223, 30, 0.4)',
    iconType: 'javascript',
    highlights: ['ES6+ Modern Syntax', 'Asynchronous Promises & Event Loop', 'DOM & Canvas Manipulations'],
    codeSnippet: `const executePipeline = async (tasks) => {
  console.log('🚀 Running JS Event Pipeline...');
  const results = await Promise.all(
    tasks.map(async (t) => t.run())
  );
  return results.filter(Boolean);
};`,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    description: 'Type-safe application architecture, generics, and interface contracts.',
    proficiency: 92,
    experience: '4+ Years',
    brandColor: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.4)',
    iconType: 'typescript',
    highlights: ['Advanced Generic Constraints', 'Strict Null & Type Inference', 'AST & Type Guards'],
    codeSnippet: `type ApiResponse<T> = 
  | { success: true; data: T } 
  | { success: false; error: string };

function processPayload<T>(res: ApiResponse<T>): T {
  if (!res.success) throw new Error(res.error);
  return res.data;
}`,
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'FRONTEND',
    description: 'Component-driven interfaces, custom hooks, and reactive UI architecture.',
    proficiency: 94,
    experience: '4+ Years',
    brandColor: '#61DAFB',
    glowColor: 'rgba(97, 218, 251, 0.4)',
    iconType: 'react',
    highlights: ['React 19 Server & Client Components', 'Custom Hooks & State Management', 'Framer Motion Animations'],
    codeSnippet: `import { useState, useEffect } from 'react';

export function MatrixDisplay() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulse(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return <div className="glow">System Pulse: {pulse}</div>;
}`,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'FRONTEND',
    description: 'Full-stack SSR/SSG framework, App Router, and server actions.',
    proficiency: 90,
    experience: '3+ Years',
    brandColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    iconType: 'nextjs',
    highlights: ['App Router & React Server Components', 'API Routes & Middleware', 'Image & Performance Optimization'],
    codeSnippet: `export async function GET(request: Request) {
  const data = { status: "online", timestamp: Date.now() };
  return Response.json({ success: true, ...data });
}`,
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    categoryLabel: 'FRONTEND',
    description: 'Reactive user interfaces, Vue 3 Composition API, and Pinia stores.',
    proficiency: 85,
    experience: '3+ Years',
    brandColor: '#4FC08D',
    glowColor: 'rgba(79, 192, 141, 0.4)',
    iconType: 'vue',
    highlights: ['Vue 3 Composition API (<script setup>)', 'Reactivity Ref & Computed Properties', 'Pinia State Stores'],
    codeSnippet: `<script setup>
import { ref, computed } from 'vue';

const count = ref(10);
const double = computed(() => count.value * 2);
</script>

<template>
  <button @click="count++">Energy: {{ double }}</button>
</template>`,
  },
  {
    id: 'flask',
    name: 'Flask & FastAPI',
    category: 'backend',
    categoryLabel: 'BACKEND',
    description: 'High-performance async REST APIs, Pydantic validation, and Python backends.',
    proficiency: 88,
    experience: '3+ Years',
    brandColor: '#009688',
    glowColor: 'rgba(0, 150, 136, 0.4)',
    iconType: 'fastapi',
    highlights: ['Async ASGI Controllers', 'Pydantic V2 Type Schemas', 'SQLAlchemy ORM & Migrations'],
    codeSnippet: `from fastapi import FastAPI, Depends

app = FastAPI(title="Portfolio OS Core API")

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok", "latency_ms": 1.2}`,
  },
  {
    id: 'sql',
    name: 'SQL & Postgres',
    category: 'backend',
    categoryLabel: 'BACKEND / DATA',
    description: 'Relational database schema design, indexing, queries, and optimization.',
    proficiency: 88,
    experience: '4+ Years',
    brandColor: '#4169E1',
    glowColor: 'rgba(65, 105, 225, 0.4)',
    iconType: 'sql',
    highlights: ['Complex JOINs & Subqueries', 'PostgreSQL JSONB & Indexing', 'ORM Mapping & Migrations'],
    codeSnippet: `SELECT 
  p.title,
  COUNT(t.id) AS total_technologies,
  AVG(p.rating) AS avg_score
FROM projects p
JOIN tech_stack t ON p.id = t.project_id
GROUP BY p.id
HAVING AVG(p.rating) > 4.5
ORDER BY avg_score DESC;`,
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'ai-data',
    categoryLabel: 'AI / DATA',
    description: 'Predictive modeling, feature engineering, neural evaluation, and SciKit/CatBoost.',
    proficiency: 86,
    experience: '3+ Years',
    brandColor: '#E97108',
    glowColor: 'rgba(233, 113, 8, 0.4)',
    iconType: 'ml',
    highlights: ['Supervised & Unsupervised Learning', 'Model Evaluation & Cross Validation', 'Feature Scaling & Ensembling'],
    codeSnippet: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
acc = clf.score(X_test, y_test)
print(f"Accuracy: {acc:.4f}")`,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    categoryLabel: 'TOOLS',
    description: 'Version control, branch workflows, interactive rebase, and CI/CD pipelines.',
    proficiency: 94,
    experience: '5+ Years',
    brandColor: '#F05032',
    glowColor: 'rgba(240, 80, 50, 0.4)',
    iconType: 'git',
    highlights: ['Feature Branch & Gitflow Strategies', 'Interactive Rebase & Conflict Resolution', 'GitHub Actions Automation'],
    codeSnippet: `git checkout -b feature/gesture-engine
git add .
git commit -m "feat(os): add 3D reactive skills grid"
git push origin feature/gesture-engine`,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    categoryLabel: 'TOOLS & DEVOPS',
    description: 'Containerization, multi-stage Dockerfiles, and compose orchestration.',
    proficiency: 84,
    experience: '3+ Years',
    brandColor: '#2496ED',
    glowColor: 'rgba(36, 150, 237, 0.4)',
    iconType: 'docker',
    highlights: ['Multi-Stage Lightweight Builds', 'Docker Compose Container Suites', 'Volume & Network Isolation'],
    codeSnippet: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]`,
  },
];
