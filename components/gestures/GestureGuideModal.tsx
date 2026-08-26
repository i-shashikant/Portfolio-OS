'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Hand, MousePointer, ThumbsUp, ArrowDown, ArrowUp, ArrowRight, ArrowLeft, Code2, Home, Mail, Terminal } from 'lucide-react';
import { usePortfolio } from '@/stores/portfolio-store';

export const gestureList = [
  {
    action: 'Cursor',
    gesture: 'Point (index extended)',
    type: 'Continuous',
    icon: <MousePointer className="text-violet-400" size={18} />,
  },
  {
    action: 'Select / confirm',
    gesture: 'Thumbs up (👍)',
    type: 'Discrete',
    icon: <ThumbsUp className="text-emerald-400" size={18} />,
  },
  {
    action: 'Scroll down / next section',
    gesture: 'Open palm, swipe down',
    type: 'Discrete (swipe)',
    icon: <ArrowDown className="text-blue-400" size={18} />,
  },
  {
    action: 'Scroll up / prev section',
    gesture: 'Open palm, swipe up',
    type: 'Discrete (swipe)',
    icon: <ArrowUp className="text-blue-400" size={18} />,
  },
  {
    action: 'Next project',
    gesture: 'Point + swipe right',
    type: 'Discrete',
    icon: <ArrowRight className="text-amber-400" size={18} />,
  },
  {
    action: 'Previous project',
    gesture: 'Point + swipe left',
    type: 'Discrete',
    icon: <ArrowLeft className="text-amber-400" size={18} />,
  },
  
  {
    action: 'Go home / close overlay',
    gesture: 'Closed fist (✊)',
    type: 'Discrete',
    icon: <Home className="text-rose-400" size={18} />,
  },
  {
    action: 'Go to Contact',
    gesture: 'Call-me sign (🤙)',
    type: 'Discrete',
    icon: <Mail className="text-pink-400" size={18} />,
  },
  {
    action: 'Developer mode easter egg',
    gesture: 'Rock sign (🤘)',
    type: 'Discrete',
    icon: <Terminal className="text-cyan-400" size={18} />,
  },
];

export default function GestureGuideModal() {
  const { gestureGuideOpen, toggleGestureGuide } = usePortfolio();

  return (
    <AnimatePresence>
      {gestureGuideOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleGestureGuide}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d16] p-6 shadow-2xl md:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-400">
                  <Hand size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Gesture Control Matrix</h3>
                  <p className="text-xs text-white/40">Portfolio OS Vision Controls</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleGestureGuide}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Gesture Table */}
            <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/40">
                    <th className="pb-3 font-medium">Action</th>
                    <th className="pb-3 font-medium">Gesture</th>
                    <th className="pb-3 font-medium text-right">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {gestureList.map((item) => (
                    <tr key={item.action} className="transition-colors hover:bg-white/[0.02]">
                      <td className="py-3 font-medium text-white/90">
                        <div className="flex items-center gap-2.5">
                          {item.icon}
                          <span>{item.action}</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-violet-300">{item.gesture}</td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                            item.type === 'Continuous'
                              ? 'border border-violet-500/30 bg-violet-500/10 text-violet-300'
                              : 'border border-white/10 bg-white/5 text-white/50'
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/40">
              <span>Position hand in webcam view (1-3 ft away)</span>
              <button
                type="button"
                onClick={toggleGestureGuide}
                className="rounded-xl border border-violet-500/30 bg-violet-500/20 px-4 py-2 text-violet-200 transition-colors hover:bg-violet-500/30"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
