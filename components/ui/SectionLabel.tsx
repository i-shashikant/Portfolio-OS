'use client';

import { motion } from 'framer-motion';

type SectionLabelProps = {
  number: number;
  label: string;
};

export default function SectionLabel({
  number,
  label,
}: SectionLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-sm uppercase tracking-[0.25em] text-violet-300"
    >
      {String(number).padStart(2, '0')} — {label}
    </motion.p>
  );
}

