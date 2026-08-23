export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  featured?: boolean;
  github?: string;
  live?: string;

  caseStudy?: {
    overview: string;
    problem: string;
    solution: string;
    highlights: string[];
  };
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
    github : "https://github.com/i-shashikant/Placement-Portal-MAD-II",
    caseStudy : {
      overview:
        'CampusChaupal is a full-stack placement platform designed to connect students, companies, and administrators through a structured campus recruitment ecosystem.',

      problem:
        'Campus placement workflows can become fragmented across students, companies, applications, approvals, and placement drives.',

      solution:
        'Built a role-based platform where students can discover and apply for opportunities, companies can manage placement drives and applications, and administrators can manage the overall ecosystem.',

      highlights: [
        'Role-based authentication and authorization',
        'Student job discovery and applications',
        'Company placement drive management',
        'Application status workflow',
        'Administrative approval and moderation',
        'Vue 3 frontend with Flask backend',
      ],
    },
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
    github : "https://github.com/i-shashikant/Trekking-Management-App",
    caseStudy: {
      overview:
        'GoGhummi is a trekking management platform focused on discovering trails, managing trekking experiences, and handling bookings across different user roles.',

      problem:
        'Managing treks, users, bookings, and staff operations requires multiple workflows to work together reliably.',

      solution:
        'Built a role-based web application with Flask and SQLAlchemy to manage trekking experiences, bookings, users, and administrative operations.',

      highlights: [
        'Trekking discovery and management',
        'Booking workflow',
        'Role-based access',
        'Admin and staff operations',
        'SQLAlchemy database models',
        'Flask blueprint architecture',
      ],
    },
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
    github : "https://github.com/i-shashikant/Heavy-Equipment-Price-Prediction-MLP",
    caseStudy: {
      overview:
        'A machine learning project focused on predicting heavy equipment selling prices using structured data, feature engineering, categorical encoding, and model experimentation.',

      problem:
        'Heavy equipment prices depend on multiple characteristics such as age, configuration, location, and equipment attributes, making direct price estimation challenging.',

      solution:
        'Built a machine learning pipeline involving exploratory analysis, feature engineering, categorical encoding, and experimentation with multiple regression models.',

      highlights: [
        'Feature engineering',
        'Categorical feature handling',
        'Model experimentation',
        'Regression-based price prediction',
        'Machine learning evaluation',
        'Kaggle competition workflow',
      ],
    },
  },
];