'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio, PortfolioSection } from '@/stores/portfolio-store';
import { soundEngine } from '@/lib/sound/soundEngine';
import { Search, Terminal, Hand, Volume2, Briefcase, User, Code2, FlaskConical, Mail, Home, Command, ArrowRight } from 'lucide-react';

export default function OSCommandPalette() {
  const { openSection, toggleGestureGuide, toggleDevMode, toggleGestures, setTheme, toggleGitHubWidget } = usePortfolio();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Shortcut key listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        soundEngine.playClick();
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const commands = [
    { id: 'home', label: 'Go to Home Overview', category: 'Navigation', icon: <Home size={16} />, action: () => openSection('home') },
    { id: 'projects', label: 'Open Projects Showcase', category: 'Navigation', icon: <Briefcase size={16} />, action: () => openSection('projects') },
    { id: 'skills', label: 'Open Reactive Skills Matrix', category: 'Navigation', icon: <Code2 size={16} />, action: () => openSection('skills') },
    { id: 'about', label: 'View About Me', category: 'Navigation', icon: <User size={16} />, action: () => openSection('about') },
    { id: 'contact', label: 'Jump to Contact', category: 'Navigation', icon: <Mail size={16} />, action: () => openSection('contact') },
    { id: 'github-widget', label: 'Open GitHub Analytics (✌️)', category: 'Analytics', icon: <Command size={16} />, action: () => toggleGitHubWidget() },
    { id: 'gestures', label: 'Toggle Hand Gesture Controls', category: 'OS System', icon: <Hand size={16} />, action: () => toggleGestures() },
    { id: 'gesture-guide', label: 'Open Gesture Matrix Guide', category: 'OS System', icon: <Command size={16} />, action: () => toggleGestureGuide() },
    { id: 'dev-mode', label: 'Unlock Developer Mode (🤘)', category: 'OS System', icon: <Terminal size={16} />, action: () => toggleDevMode() },
    { id: 'theme-dark', label: 'Theme: Dark OS (Default)', category: 'Themes', icon: <Command size={16} />, action: () => setTheme('dark') },
    { id: 'theme-cyberpunk', label: 'Theme: Cyberpunk Neon', category: 'Themes', icon: <Command size={16} />, action: () => setTheme('cyberpunk') },
    { id: 'theme-obsidian', label: 'Theme: Glass Obsidian', category: 'Themes', icon: <Command size={16} />, action: () => setTheme('obsidian') },
    { id: 'theme-matrix', label: 'Theme: Emerald Matrix', category: 'Themes', icon: <Command size={16} />, action: () => setTheme('matrix') },
    { id: 'sound', label: 'Toggle Web Audio SFX', category: 'Preferences', icon: <Volume2 size={16} />, action: () => soundEngine.toggleSound() },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: () => void) => {
    soundEngine.playClick();
    action();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10005] flex items-start justify-center pt-24 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#0a0c18] p-4 shadow-2xl backdrop-blur-2xl"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-white/10 px-3 pb-3">
              <Search className="h-5 w-5 text-violet-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search section... (Cmd + K)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-mono text-sm text-white placeholder-white/40 focus:outline-none"
              />
              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/40">
                ESC
              </span>
            </div>

            {/* Command List */}
            <div className="mt-3 max-h-80 overflow-y-auto space-y-1">
              {filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => handleSelect(cmd.action)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs text-white/80 transition-colors hover:bg-violet-500/20 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-violet-400">{cmd.icon}</span>
                    <span>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase text-white/30">{cmd.category}</span>
                    <ArrowRight size={12} className="text-white/30" />
                  </div>
                </button>
              ))}

              {filtered.length === 0 && (
                <div className="py-8 text-center text-xs text-white/30">
                  No matching commands found.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-white/30 font-mono">
              <span>Portfolio OS Command Palette</span>
              <span>Use ↑ ↓ to navigate, Enter to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
