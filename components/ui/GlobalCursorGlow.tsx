'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';

export default function GlobalCursorGlow() {
  const { theme } = usePortfolio();

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Color gradient map matching active OS Theme
  const getGlowColor = () => {
    switch (theme) {
      case 'cyberpunk':
        return 'radial-gradient(550px circle at var(--x) var(--y), rgba(6, 182, 212, 0.22), rgba(236, 72, 153, 0.12) 45%, transparent 70%)';
      case 'obsidian':
        return 'radial-gradient(550px circle at var(--x) var(--y), rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05) 45%, transparent 70%)';
      case 'matrix':
        return 'radial-gradient(550px circle at var(--x) var(--y), rgba(16, 185, 129, 0.22), rgba(6, 95, 70, 0.1) 45%, transparent 70%)';
      case 'dark':
      default:
        return 'radial-gradient(550px circle at var(--x) var(--y), rgba(139, 92, 246, 0.18), rgba(99, 102, 241, 0.08) 45%, transparent 70%)';
    }
  };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-colors duration-500"
      style={{
        background: getGlowColor(),
        // Pass X and Y as CSS custom properties
        ['--x' as any]: useTransform(smoothX, (v) => `${v}px`),
        ['--y' as any]: useTransform(smoothY, (v) => `${v}px`),
      }}
    />
  );
}
