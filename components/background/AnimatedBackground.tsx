'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Purple Blob */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]"
      />

      {/* Cyan Blob */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-15%] right-[-10%] h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[120px]"
      />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[100px]" />
    </div>
  );
}