'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, HelpCircle, Eye, EyeOff, Hand, Maximize2, Minimize2 } from 'lucide-react';
import { usePortfolio } from '@/stores/portfolio-store';

interface GestureHUDProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  activeGesture: string;
  isCameraActive: boolean;
  fps: number;
  onToggleCamera: () => void;
}

export default function GestureHUD({
  canvasRef,
  activeGesture,
  isCameraActive,
  fps,
  onToggleCamera,
}: GestureHUDProps) {
  const { gesturesEnabled, toggleGestures, toggleGestureGuide, gestureToast } = usePortfolio();
  const [minimized, setMinimized] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  if (!gesturesEnabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] hidden md:flex flex-col items-end gap-3 pointer-events-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {gestureToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="flex items-center gap-2.5 rounded-2xl border border-violet-400/30 bg-violet-950/90 px-4 py-2.5 shadow-xl backdrop-blur-xl text-xs text-white"
          >
            <Hand size={16} className="text-violet-300 animate-pulse" />
            <span className="font-medium">{gestureToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main HUD Box */}
      <motion.div
        layout
        className="overflow-hidden rounded-3xl border border-white/10 bg-black/80 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-300"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 px-2 pb-2">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isCameraActive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400'
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
              {isCameraActive ? `Vision Active (${fps} FPS)` : 'Camera Off'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowSkeleton(!showSkeleton)}
              title="Toggle Mesh Skeleton"
              className="rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              {showSkeleton ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>

            <button
              type="button"
              onClick={toggleGestureGuide}
              title="Gesture Matrix Guide"
              className="rounded-lg p-1 text-violet-300 transition-colors hover:bg-violet-500/20"
            >
              <HelpCircle size={14} />
            </button>

            <button
              type="button"
              onClick={onToggleCamera}
              title={isCameraActive ? 'Disable Camera' : 'Enable Camera'}
              className="rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              {isCameraActive ? <Camera size={14} /> : <CameraOff size={14} />}
            </button>

            <button
              type="button"
              onClick={() => setMinimized(!minimized)}
              title={minimized ? 'Expand HUD' : 'Minimize HUD'}
              className="rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
          </div>
        </div>

        {/* Camera Preview Canvas */}
        {!minimized && (
          <div className="relative h-36 w-48 overflow-hidden rounded-2xl border border-white/10 bg-black/60">
            <canvas
              ref={canvasRef}
              className={`h-full w-full object-cover transform -scale-x-100 ${
                showSkeleton ? 'opacity-100' : 'opacity-20'
              }`}
            />

            {/* Gesture Badge Overlay */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-xl border border-white/10 bg-black/70 px-2.5 py-1 backdrop-blur-md">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Gesture</span>
              <span className="font-mono text-[10px] font-bold text-violet-300">
                {activeGesture !== 'NONE' ? activeGesture : 'Scanning...'}
              </span>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-2 flex items-center justify-between gap-2 px-1">
          <button
            type="button"
            onClick={toggleGestures}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-1.5 font-mono text-[10px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            Turn Off Gestures
          </button>
        </div>
      </motion.div>
    </div>
  );
}
