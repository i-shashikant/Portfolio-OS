export type KnowledgeItem = {
  id: string;
  type: 'profile' | 'project' | 'skill' | 'experience' | 'achievement';
  title: string;
  content: string;
  keywords: string[];
};

export const aiKnowledge: KnowledgeItem[] = [
  {
    id: 'profile',
    type: 'profile',
    title: 'Shashikant',
    content:
      'Shashikant is a data science and software developer focused on AI, machine learning, full-stack development, and building practical software systems.',
    keywords: [
      'shashikant',
      'developer',
      'data science',
      'software',
      'ai',
      'machine learning',
    ],
  },

  {
    id: 'campuschaupal',
    type: 'project',
    title: 'CampusChaupal',
    content:
      'CampusChaupal is a full-stack campus placement platform connecting students, companies, and administrators. It uses Flask, SQLAlchemy, Vue 3, Pinia, Axios, Bootstrap, SQLite, JWT authentication, Celery, and Redis. Students can register, maintain profiles, browse jobs, and apply to placement drives. Companies can create and manage placement drives and applications. Administrators can manage students, companies, jobs, approvals, and platform statistics.',
    keywords: [
      'campuschaupal',
      'placement',
      'flask',
      'vue',
      'pinia',
      'sqlalchemy',
      'celery',
      'redis',
      'jwt',
      'full stack',
    ],
  },

  {
    id: 'goghummi',
    type: 'project',
    title: 'GoGhummi',
    content:
      'GoGhummi is a trekking management platform designed for discovering and booking trekking experiences. The application uses Flask and SQLAlchemy with a role-based architecture for users, staff, and administrators.',
    keywords: [
      'goghummi',
      'trekking',
      'flask',
      'sqlalchemy',
      'booking',
      'management',
    ],
  },

  {
    id: 'heavy-equipment',
    type: 'project',
    title: 'Heavy Equipment Price Prediction',
    content:
      'Heavy Equipment Price Prediction is a machine learning project created for a Kaggle competition. The project predicts the selling price of heavy equipment using structured historical data and feature engineering. Features included transaction year, transaction quarter, asset age, descriptor length, operational-hours indicators, and variant modifiers. Multiple machine learning models were evaluated and tuned.',
    keywords: [
      'heavy equipment',
      'price prediction',
      'machine learning',
      'kaggle',
      'catboost',
      'feature engineering',
      'regression',
    ],
  },

  {
    id: 'python',
    type: 'skill',
    title: 'Python',
    content:
      'Python is one of Shashikant’s primary programming languages and is used for machine learning, data analysis, automation, backend development, and experimentation.',
    keywords: [
      'python',
      'programming',
      'machine learning',
      'automation',
      'backend',
    ],
  },

  {
    id: 'flask',
    type: 'skill',
    title: 'Flask',
    content:
      'Flask is used for building backend applications and REST APIs. Shashikant has used Flask extensively in projects including CampusChaupal and GoGhummi.',
    keywords: [
      'flask',
      'backend',
      'api',
      'rest',
      'python',
    ],
  },

  {
    id: 'machine-learning',
    type: 'skill',
    title: 'Machine Learning',
    content:
      'Shashikant works with supervised machine learning, feature engineering, model evaluation, regression, classification, and hyperparameter tuning.',
    keywords: [
      'machine learning',
      'ml',
      'regression',
      'classification',
      'feature engineering',
      'hyperparameter tuning',
    ],
  },

  {
    id: 'frontend',
    type: 'skill',
    title: 'Frontend Development',
    content:
      'Frontend technologies include React, Next.js, Vue 3, TypeScript, JavaScript, Tailwind CSS, Framer Motion, and modern web APIs.',
    keywords: [
      'react',
      'next.js',
      'vue',
      'typescript',
      'javascript',
      'tailwind',
      'frontend',
    ],
  },

  {
    id: 'backend',
    type: 'skill',
    title: 'Backend Development',
    content:
      'Backend technologies include Flask, FastAPI, SQLAlchemy, REST APIs, PostgreSQL, Redis, Celery, authentication systems, and service-oriented application architecture.',
    keywords: [
      'backend',
      'flask',
      'fastapi',
      'sqlalchemy',
      'postgresql',
      'redis',
      'celery',
      'api',
    ],
  },

  {
    id: 'portfolio-os',
    type: 'project',
    title: 'Portfolio OS',
    content:
      'Portfolio OS is an AI-powered interactive portfolio designed to demonstrate software engineering, artificial intelligence, computer vision, frontend animation, API integration, and immersive user experiences. Planned capabilities include conversational AI, RAG, gesture navigation, voice commands, live GitHub and LeetCode integrations, analytics, and interactive visualizations.',
    keywords: [
      'portfolio',
      'portfolio os',
      'ai',
      'rag',
      'gesture',
      'voice',
      'github',
      'leetcode',
      'computer vision',
    ],
  },
];