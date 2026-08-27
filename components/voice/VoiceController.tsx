'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Sparkles, Hand, X } from 'lucide-react';
import { usePortfolio } from '@/stores/portfolio-store';
import { soundEngine } from '@/lib/sound/soundEngine';

export default function VoiceController() {
  const {
    openSection,
    goHome,
    toggleDevMode,
    setProjectFilterTag,
    triggerGestureToast,
  } = usePortfolio();

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setSupported(false);
        return;
      }

      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (e: any) => {
        const text = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join('');
        setTranscript(text);
        processVoiceCommand(text);
      };

      rec.onend = () => {
        setListening(false);
      };

      rec.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const processVoiceCommand = (text: string) => {
    const query = text.toLowerCase().trim();

    if (query.includes('flask')) {
      setProjectFilterTag('Flask');
      openSection('projects');
      triggerGestureToast('🎙 Voice: Filtered Flask Projects');
      soundEngine.playClick();
    } else if (query.includes('python')) {
      setProjectFilterTag('Python');
      openSection('projects');
      triggerGestureToast('🎙 Voice: Filtered Python Projects');
      soundEngine.playClick();
    } else if (query.includes('react') || query.includes('frontend')) {
      setProjectFilterTag('React');
      openSection('projects');
      triggerGestureToast('🎙 Voice: Filtered React Projects');
      soundEngine.playClick();
    } else if (query.includes('project') || query.includes('work')) {
      setProjectFilterTag('All');
      openSection('projects');
      triggerGestureToast('🎙 Voice: Opened Projects');
      soundEngine.playClick();
    } else if (query.includes('skill') || query.includes('tech stack')) {
      openSection('skills');
      triggerGestureToast('🎙 Voice: Opened Skills Matrix');
      soundEngine.playClick();
    } else if (query.includes('contact') || query.includes('email') || query.includes('reach out')) {
      openSection('contact');
      triggerGestureToast('🎙 Voice: Jumped to Contact');
      soundEngine.playClick();
    } else if (query.includes('home') || query.includes('overview') || query.includes('main')) {
      goHome();
      triggerGestureToast('🎙 Voice: Returned Home');
      soundEngine.playClick();
    } else if (query.includes('developer') || query.includes('matrix') || query.includes('rock')) {
      toggleDevMode();
      triggerGestureToast('🎙 Voice: Developer Mode Activated');
      soundEngine.playClick();
    } else if (query.includes('sound') || query.includes('audio') || query.includes('mute')) {
      soundEngine.toggleSound();
      triggerGestureToast('🎙 Voice: Audio Toggled');
    }
  };

  const toggleListening = () => {
    if (!supported || !recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setTranscript('');
      soundEngine.playClick();
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (err) {
        console.warn('Speech recognition start failed:', err);
      }
    }
  };

  if (!supported) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9998] flex items-center gap-3 pointer-events-auto">
      <motion.button
        type="button"
        onClick={toggleListening}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={listening ? 'Listening to voice...' : 'Activate Voice Navigation'}
        className={`flex items-center gap-2.5 rounded-full border px-4 py-2.5 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
          listening
            ? 'border-rose-500/50 bg-rose-950/80 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
            : 'border-white/10 bg-black/70 text-white/70 hover:border-violet-400/40 hover:bg-black/90 hover:text-white'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {listening && (
            <span className="absolute h-6 w-6 rounded-full bg-rose-500 animate-ping opacity-60" />
          )}
          {listening ? <Mic size={16} className="text-rose-400 animate-pulse" /> : <MicOff size={16} />}
        </div>

        <span className="font-mono text-xs font-medium">
          {listening ? 'Listening...' : 'Voice Assistant'}
        </span>
      </motion.button>

      {/* Transcript Popup */}
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            className="flex items-center gap-2 rounded-2xl border border-rose-500/30 bg-black/90 px-3.5 py-2 backdrop-blur-xl text-xs font-mono text-rose-200"
          >
            <Sparkles size={14} className="text-rose-400 animate-spin" />
            <span>{transcript || 'Say "Show Flask projects" or "Open skills"...'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
