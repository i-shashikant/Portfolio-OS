Portfolio OS

An interactive, AI-powered developer portfolio designed as a personal operating system rather than a traditional portfolio website.

🌐 Live: https://portfolio-os-opal.vercel.app

Overview

Portfolio OS is my personal developer portfolio built to present my work, experience, skills, and technical interests through an interactive interface.

Instead of treating a portfolio as a collection of static pages, I designed it as a small operating-system-style experience with interactive navigation, dynamic project views, visual themes, gesture interaction, and an AI-powered conversation interface.

The goal is simple:

Make exploring a developer's portfolio feel like using a product.

✨ Features

Interactive Portfolio OS interface with smooth transitions and micro-interactions

Responsive desktop and mobile experience

Dedicated project showcase and dynamic project pages

Interactive experience section

Categorized skills and technology stack

Skill strengths: Core, Strong, Working, and Exploring

Camera-based gesture control using MediaPipe

Hand landmark tracking and gesture-based interaction

AI-powered portfolio chat

Multiple visual modes/themes

Keyboard-friendly navigation

Structured data for projects, experience, skills, and social links

🛠️ Tech Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

Framer Motion

Lucide React

React Icons

AI

AI-powered chat through a Next.js API route

Computer Vision

MediaPipe

Real-time hand landmark tracking

Gesture recognition and interaction

Backend & Data

Next.js API routes

Flask

SQL

SQLAlchemy

REST APIs

Data Science & Machine Learning

Python

NumPy

Pandas

Scikit-learn

Matplotlib

Seaborn

Regression

Classification

Cross-validation

Hyperparameter optimization

Development Tools

Git

GitHub

Vercel

🧠 Why I Built It

Most portfolios follow the same structure:

Hero → About → Skills → Projects → Contact

I wanted to build something that demonstrated how I think and build, not just what I have built.

Portfolio OS became a way to experiment with:

Interactive UI systems

State-driven interfaces

Computer vision

Gesture-based interaction

AI integration

Responsive design

Animation and motion

Modular application architecture

It is both a portfolio and an ongoing technical experiment.

🏗️ Architecture

The project is built around reusable React components and structured data.

Portfolio OS
│
├── Hero
├── Projects
│   └── Dynamic project pages
├── Experience
├── How I Work
├── Skills
│   ├── Languages
│   ├── Frontend
│   ├── Backend
│   ├── AI & Data
│   ├── Computer Vision
│   ├── Creative Tech
│   └── Tools
├── About
├── Contact
│   └── AI Chat
│
└── Gesture Control
    └── MediaPipe Hand Tracking

Content such as projects, experience, and skills is maintained as structured data, making the portfolio easier to update without rewriting the UI.

🎮 Gesture Interaction

One of the experimental features of Portfolio OS is camera-based gesture control.

The system uses MediaPipe hand tracking to detect hand landmarks and translate gestures into interaction.

Gesture

Interaction

☝️ Point

Move cursor

👍 Thumbs Up

Gesture interaction

🤏 Pinch

Selection / interaction

The gesture system can be enabled through the portfolio interface.

Camera-based interaction is an experimental feature and may behave differently depending on lighting, camera quality, and browser/device performance.

🤖 AI Chat

Portfolio OS includes an AI-powered chat experience.

Instead of forcing visitors to manually browse every section, the interface provides a conversational way to explore the portfolio.

The chat is exposed through a Next.js API route and can be extended as the portfolio evolves.

📱 Responsive Experience

The interface is designed for both desktop and mobile.

Desktop focuses on the full Portfolio OS experience, including the HUD-style interface and gesture controls.

Mobile uses a simplified navigation system so the content remains usable on smaller screens.

🚀 Getting Started

1. Clone the repository

git clone <your-repository-url>
cd portfolio-os

2. Install dependencies

npm install

3. Configure environment variables

Create a .env.local file in the project root and add the environment variables required by the AI functionality.

# Add your AI provider/API configuration here

Never commit .env.local or API keys to GitHub.

4. Start the development server

npm run dev

Open http://localhost:3000.

5. Build for production

npm run build

6. Run the production build locally

npm run start

☁️ Deployment

The portfolio is deployed using Vercel.

Live website:

https://portfolio-os-opal.vercel.app

The project can be updated by pushing changes to the connected Git repository, after which Vercel can create a new deployment.

🔄 Updating the Portfolio

Projects, experience, and skills are represented through structured TypeScript data.

For example:

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
};

This makes it possible to add or modify portfolio content without rebuilding the entire UI from scratch.

📂 Project Structure

A simplified structure:

portfolio-os/
│
├── app/
│   ├── api/
│   │   └── ai/
│   ├── projects/
│   │   └── [slug]/
│   └── page.tsx
│
├── components/
│   ├── gesture/
│   ├── ui/
│   └── ...
│
├── data/
│   ├── projects
│   ├── experience
│   ├── skills
│   └── socials
│
├── stores/
│   └── portfolio-store
│
├── public/
│
└── README.md

🧪 Current Status

Status: Live 🚀

The portfolio is deployed and publicly accessible.

The project is intentionally designed to evolve over time as new projects, experiments, technologies, and interaction ideas are added.

🎯 Future Ideas

More advanced gesture interactions

Additional AI-powered portfolio features

More interactive project demonstrations

Richer 3D experiences

Improved accessibility for gesture-based interactions

Additional portfolio themes

More personalized AI responses

Performance improvements for computer-vision features

👨‍💻 About

I'm Shashikant, an AI Engineer, Full Stack Developer, and Problem Solver interested in building data-driven products, software systems, and AI-powered experiences.

My work sits at the intersection of:

AI · Data · Software · Computer Vision · Interactive Experiences

🌐 Connect

Portfolio: https://portfolio-os-opal.vercel.app

GitHub: https://github.com/i-shashikant

LinkedIn: https://www.linkedin.com/in/i-shashikant

📄 License

This project is a personal portfolio and showcase project.

If you find the implementation interesting, feel free to explore the code and learn from it. Please do not present the portfolio, content, or personal work as your own.
