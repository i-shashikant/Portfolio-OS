export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  featured?: boolean;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: 'campus-chaupal',
    title: 'CampusChaupal',
    description:
      'A full-stack campus placement platform connecting students, companies, and administrators through a role-based placement ecosystem.',
    category: 'Full Stack',
    technologies: [
      'Flask',
      'Vue 3',
      'SQLAlchemy',
      'JWT',
      'Pinia',
    ],
    featured: true,
  },

  {
    slug: 'goghummi',
    title: 'GoGhummi',
    description:
      'A trekking management platform for discovering trails, managing treks, handling bookings, and supporting multiple user roles.',
    category: 'Web Application',
    technologies: [
      'Flask',
      'SQLAlchemy',
      'SQLite',
      'Jinja2',
    ],
    featured: true,
  },

  {
    slug: 'heavy-equipment-price-prediction',
    title: 'Heavy Equipment Price Prediction',
    description:
      'A machine learning project focused on predicting heavy equipment selling prices using feature engineering, categorical encoding, and model experimentation.',
    category: 'Machine Learning',
    technologies: [
      'Python',
      'Pandas',
      'Scikit-learn',
      'CatBoost',
    ],
    featured: true,
  },
];