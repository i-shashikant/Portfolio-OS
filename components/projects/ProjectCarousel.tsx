// 'use client';

// import { motion, useMotionValue, useSpring } from 'framer-motion';
// import Link from 'next/link';
// import { useState } from 'react';

// import { projects } from '@/data/projects';

// export default function ProjectCarousel() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const dragX = useMotionValue(0);

//   const smoothDragX = useSpring(dragX, {
//     stiffness: 300,
//     damping: 30,
//   });

//   const activeProject = projects[activeIndex];

//   const goToProject = (index: number) => {
//     if (index < 0) {
//       setActiveIndex(projects.length - 1);
//       return;
//     }

//     if (index >= projects.length) {
//       setActiveIndex(0);
//       return;
//     }

//     setActiveIndex(index);
//   };

//   const handleDragEnd = (
//     _: MouseEvent | TouchEvent | PointerEvent,
//     info: { offset: { x: number } },
//   ) => {
//     const threshold = 80;

//     if (info.offset.x < -threshold) {
//       goToProject(activeIndex + 1);
//     }

//     if (info.offset.x > threshold) {
//       goToProject(activeIndex - 1);
//     }
//   };

//   return (
//     <div className="relative mx-auto w-full max-w-5xl">
//       {/* Project counter */}
//       <div className="mb-6 flex items-center justify-between">
//         <span className="text-xs uppercase tracking-[0.25em] text-white/30">
//           Selected Work
//         </span>

//         <span className="font-mono text-sm text-white/40">
//           {String(activeIndex + 1).padStart(2, '0')} /{' '}
//           {String(projects.length).padStart(2, '0')}
//         </span>
//       </div>

//       {/* Carousel */}
//       <motion.div
//         key={activeProject.slug}
//         style={{
//           x: smoothDragX,
//         }}
//         drag="x"
//         dragConstraints={{
//           left: 0,
//           right: 0,
//         }}
//         dragElastic={0.8}
//         onDragEnd={handleDragEnd}
//         whileTap={{
//           scale: 0.985,
//         }}
//         initial={{
//           opacity: 0,
//           x: 40,
//         }}
//         animate={{
//           opacity: 1,
//           x: 0,
//         }}
//         transition={{
//           duration: 0.45,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         className="touch-pan-y"
//       >
//         <Link
//           href={`/projects/${activeProject.slug}`}
//           className="group block"
//         >
//           <article
//             className="
//               relative min-h-[420px]
//               overflow-hidden rounded-[2rem]
//               border border-white/10
//               bg-white/[0.035]
//               p-7
//               transition-colors
//               duration-500
//               hover:border-violet-400/30
//               hover:bg-white/[0.055]
//               md:min-h-[520px]
//               md:p-12
//             "
//           >
//             {/* Background glow */}
//             <div
//               className="
//                 pointer-events-none absolute
//                 -right-32 -top-32
//                 h-80 w-80
//                 rounded-full
//                 bg-violet-500/10
//                 blur-[100px]
//                 transition-opacity
//                 duration-500
//                 group-hover:opacity-100
//               "
//             />

//             {/* Content */}
//             <div className="relative flex h-full min-h-[360px] flex-col justify-between md:min-h-[440px]">
//               <div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-white/30">
//                     0{activeIndex + 1}
//                   </span>

//                   <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/50">
//                     {activeProject.category}
//                   </span>
//                 </div>

//                 <h3 className="mt-20 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
//                   {activeProject.title}
//                 </h3>

//                 <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
//                   {activeProject.description}
//                 </p>
//               </div>

//               <div className="flex items-end justify-between gap-6">
//                 <div className="flex flex-wrap gap-2">
//                   {activeProject.technologies
//                     .slice(0, 4)
//                     .map((technology) => (
//                       <span
//                         key={technology}
//                         className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/50"
//                       >
//                         {technology}
//                       </span>
//                     ))}
//                 </div>

//                 <span className="shrink-0 text-2xl text-white/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white">
//                   ↗
//                 </span>
//               </div>
//             </div>
//           </article>
//         </Link>
//       </motion.div>

//       {/* Navigation */}
//       <div className="mt-6 flex items-center justify-between">
//         <div className="flex gap-2">
//           {projects.map((project, index) => (
//             <button
//               key={project.slug}
//               type="button"
//               aria-label={`Show ${project.title}`}
//               onClick={() => goToProject(index)}
//               className={`
//                 h-1.5 rounded-full
//                 transition-all duration-300
//                 ${
//                   index === activeIndex
//                     ? 'w-10 bg-white'
//                     : 'w-3 bg-white/20 hover:bg-white/40'
//                 }
//               `}
//             />
//           ))}
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="button"
//             onClick={() => goToProject(activeIndex - 1)}
//             aria-label="Previous project"
//             className="
//               flex h-11 w-11 items-center
//               justify-center rounded-full
//               border border-white/10
//               text-white/50
//               transition-all
//               hover:border-white/20
//               hover:bg-white/10
//               hover:text-white
//             "
//           >
//             ←
//           </button>

//           <button
//             type="button"
//             onClick={() => goToProject(activeIndex + 1)}
//             aria-label="Next project"
//             className="
//               flex h-11 w-11 items-center
//               justify-center rounded-full
//               border border-white/10
//               text-white/50
//               transition-all
//               hover:border-white/20
//               hover:bg-white/10
//               hover:text-white
//             "
//           >
//             →
//           </button>
//         </div>
//       </div>

//       <p className="mt-4 text-center text-xs text-white/20">
//         Swipe or drag to explore
//       </p>
//     </div>
//   );
// }