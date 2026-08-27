export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  location: string;
  type: 'Current' | 'Internship' | 'Self-employed';
  startDate: string;
  endDate?: string;
  description: string;
  highlights: string[];
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'chibify',
    role: 'Subtitle Editor & Script Writer',
    organization: 'Lapsy Studios',
    location: 'Remote',
    type: 'Current',
    startDate: 'Feb 2025',
    endDate: 'Aug 2025',
    description:
      'Working across subtitle creation, script writing, localization, proofreading, and quality control for digital content.',
    highlights: [
      'Subtitle creation and precise time-coding',
      'Proofreading and subtitle quality control',
      'Script writing and content localization',
      'Adapting scripts for voice-over, dubbing, and subtitling',
      'Experience with Aegisub and Subtitle Edit',
    ],
  },

  {
    id: 'mathematics-computing',
    role: 'Mathematics & Computing',
    organization: 'Self-employed',
    location: 'Ayodhya',
    type: 'Self-employed',
    startDate: 'Jul 2024',
    endDate: 'Oct 2024',
    description:
      'Working independently on mathematics and computing education while developing structured approaches to teaching, debugging, and technical problem solving.',
    highlights: [
      'Developed lesson plans around mathematics and computing',
      'Created structured approaches for teaching and debugging',
      'Prepared and reviewed technical journal content',
      'Worked across mathematics, computing, and data-oriented topics',
    ],
  },

  {
    id: 'school-of-core-ai',
    role: 'Technical Content Writer',
    organization: 'School of Core AI',
    location: 'Virtual',
    type: 'Internship',
    startDate: 'Dec 2024',
    endDate: 'Feb 2025',
    description:
      'Worked as a content and blog writing intern in a Data Science-oriented environment, creating technical and non-technical content.',
    highlights: [
      'Produced SEO-optimized technical content',
      'Wrote about data analysis and machine learning',
      'Created content around artificial intelligence',
      'Covered data visualization concepts',
    ],
  },
];