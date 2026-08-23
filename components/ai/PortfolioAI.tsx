'use client';

import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/stores/portfolio-store';
import { projects } from '@/data/projects';
import VoiceButton from '@/components/ai/VoiceButton';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function PortfolioAI() {
  const {
    openSection,
    openProject,
    goHome,
  } = usePortfolio();

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi 👋 I'm Portfolio AI. Ask me anything about Shashikant's projects, skills, or work.",
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /*
   * -------------------------------------------------------
   * PORTFOLIO NAVIGATION
   * -------------------------------------------------------
   *
   * Important:
   * We ONLY navigate when the user explicitly asks
   * Portfolio AI to navigate somewhere.
   *
   * Example:
   *
   * "What are his ML projects?"
   * -> AI answers normally
   *
   * "Show me his projects"
   * -> Opens Projects
   *
   * "Tell me about CampusChaupal"
   * -> AI answers normally
   *
   * "Open CampusChaupal"
   * -> Opens CampusChaupal
   */

  const handlePortfolioAction = (userMessage: string) => {
    const text = userMessage.toLowerCase().trim();

    /*
     * -------------------------------------------------------
     * HOME
     * -------------------------------------------------------
     */

    if (
      text === 'home' ||
      text === 'go home' ||
      text === 'take me home' ||
      text.includes('go back home') ||
      text.includes('return home')
    ) {
      goHome();
      return;
    }

    /*
     * -------------------------------------------------------
     * EXPLICIT PROJECT NAVIGATION
     * -------------------------------------------------------
     */

    const wantsProjectNavigation =
      text.includes('open ') ||
      text.includes('show me ') ||
      text.includes('show ') ||
      text.includes('go to ') ||
      text.includes('take me to ') ||
      text.includes('view ') ||
      text.includes('visit ');

    if (wantsProjectNavigation) {
      const project = projects.find((item) => {
        const title = item.title.toLowerCase();
        const slug = item.slug.toLowerCase();

        return text.includes(title) || text.includes(slug);
      });

      if (project) {
        openProject(project.slug);
        return;
      }
    }

    /*
     * -------------------------------------------------------
     * PROJECTS / WORK SECTION
     * -------------------------------------------------------
     */

    if (
      text === 'projects' ||
      text === 'project' ||
      text === 'work' ||
      text === 'my work' ||
      text === 'show my work' ||
      text === 'show projects' ||
      text === 'show me projects' ||
      text === 'open projects' ||
      text === 'open my projects' ||
      text === 'go to projects' ||
      text === 'go to my projects' ||
      text === 'view projects' ||
      text === 'view my projects'
    ) {
      openSection('projects');
      return;
    }

    /*
     * -------------------------------------------------------
     * SKILLS
     * -------------------------------------------------------
     */

    if (
      text === 'skills' ||
      text === 'skill' ||
      text === 'show skills' ||
      text === 'show me skills' ||
      text === 'open skills' ||
      text === 'go to skills' ||
      text === 'view skills' ||
      text === 'technology' ||
      text === 'technologies' ||
      text === 'tech stack' ||
      text === 'show tech stack' ||
      text === 'open tech stack'
    ) {
      openSection('skills');
      return;
    }

    /*
     * -------------------------------------------------------
     * ABOUT
     * -------------------------------------------------------
     */

    if (
      text === 'about' ||
      text === 'show about' ||
      text === 'show me about' ||
      text === 'open about' ||
      text === 'go to about' ||
      text === 'view about' ||
      text === 'about me' ||
      text === 'about shashikant'
    ) {
      openSection('about');
      return;
    }

    /*
     * -------------------------------------------------------
     * LAB
     * -------------------------------------------------------
     */

    if (
      text === 'lab' ||
      text === 'show lab' ||
      text === 'show me the lab' ||
      text === 'open lab' ||
      text === 'go to lab' ||
      text === 'view lab' ||
      text === 'experiments' ||
      text === 'show experiments' ||
      text === 'open experiments'
    ) {
      openSection('lab');
      return;
    }

    /*
     * -------------------------------------------------------
     * CONTACT
     * -------------------------------------------------------
     */

    if (
      text === 'contact' ||
      text === 'show contact' ||
      text === 'show me contact' ||
      text === 'open contact' ||
      text === 'go to contact' ||
      text === 'view contact' ||
      text === 'contact me' ||
      text === 'hire me'
    ) {
      openSection('contact');
      return;
    }

    /*
     * -------------------------------------------------------
     * NO NAVIGATION
     * -------------------------------------------------------
     *
     * If the user's message doesn't explicitly request
     * navigation, do nothing.
     *
     * The Gemini response remains purely conversational.
     */

    return;
  };

  /*
   * -------------------------------------------------------
   * SUBMIT MESSAGE
   * -------------------------------------------------------
   */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const query = input.trim();

    if (!query || isTyping) return;

    setInput('');

    setMessages((current) => [
      ...current,
      {
        role: 'user',
        content: query,
      },
    ]);

    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || 'Failed to get AI response.',
        );
      }

      /*
       * Add AI response to chat
       */

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: data.answer,
        },
      ]);

      /*
       * Use `query`, NOT `input`.
       *
       * `input` was already cleared above.
       */

      handlePortfolioAction(query);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            'Sorry, Portfolio AI is temporarily unavailable. Please try again.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/[0.06]
          text-white
          shadow-2xl
          backdrop-blur-xl
        "
        aria-label="Open Portfolio AI"
      >
        <span className="text-lg">
          {open ? '×' : '✦'}
        </span>
      </motion.button>

      {/* Chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed
              bottom-24
              right-6
              z-50
              flex
              h-[520px]
              w-[calc(100vw-3rem)]
              max-w-[390px]
              flex-col
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[#070914]/95
              shadow-2xl
              backdrop-blur-2xl
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="text-sm font-medium text-white/80">
                    Portfolio AI
                  </span>
                </div>

                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Knowledge system / online
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xl text-white/30 transition-colors hover:text-white"
                aria-label="Close Portfolio AI"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${
                    message.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`
                      max-w-[85%]
                      rounded-2xl
                      px-4
                      py-3
                      text-sm
                      leading-6
                      ${
                        message.role === 'user'
                          ? 'bg-white text-black'
                          : 'border border-white/10 bg-white/[0.035] text-white/60'
                      }
                    `}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/30" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/30 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/30 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested questions */}
            <div className="flex gap-2 overflow-x-auto px-5 pb-3">
              {[
                'Tell me about CampusChaupal',
                'What are his ML projects?',
                'What technologies does he use?',
              ].map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setInput(question)}
                  className="
                    shrink-0
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-3
                    py-2
                    text-[10px]
                    text-white/35
                    transition-colors
                    hover:bg-white/[0.06]
                    hover:text-white/70
                  "
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 p-4"
            >
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask anything..."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-2
                    py-2
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/20
                  "
                />
                <VoiceButton
                  onTranscript={(text) => {
                    setInput(text);
                  }}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-black
                    transition-all
                    disabled:cursor-not-allowed
                    disabled:opacity-20
                  "
                  aria-label="Send message"
                >
                  →
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}