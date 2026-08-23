'use client';

import { useEffect, useRef, useState } from 'react';

type VoiceButtonProps = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
};

type SpeechRecognitionEvent = {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
};

type SpeechRecognitionErrorEvent = {
  error?: string;
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  start: () => void;
  stop: () => void;
  abort: () => void;

  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function VoiceButton({
  onTranscript,
  disabled = false,
}: VoiceButtonProps) {
  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const transcriptCallbackRef = useRef(onTranscript);

  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  /*
   * Always keep the latest callback without
   * recreating the speech recognition instance.
   */
  useEffect(() => {
    transcriptCallbackRef.current = onTranscript;
  }, [onTranscript]);

  /*
   * Create SpeechRecognition ONLY ONCE.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results?.[0]?.[0]?.transcript?.trim();

      if (transcript) {
        transcriptCallbackRef.current(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.warn(
        'Speech recognition error:',
        event?.error || 'unknown',
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {
        // Ignore cleanup errors.
      }

      recognitionRef.current = null;
    };
  }, []);

  const handleClick = () => {
    if (disabled) return;

    const recognition = recognitionRef.current;

    if (!recognition) {
      console.warn('Speech recognition is not available.');
      return;
    }

    if (isListening) {
      try {
        recognition.stop();
      } catch {
        setIsListening(false);
      }

      return;
    }

    try {
      recognition.start();
    } catch (error) {
      console.warn(
        'Could not start speech recognition:',
        error,
      );

      setIsListening(false);
    }
  };

  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        title="Voice input is not supported by this browser"
        className="
          flex h-12 w-12 items-center justify-center
          rounded-full
          border border-white/10
          bg-white/[0.03]
          text-white/20
        "
      >
        🎙
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      title={
        isListening
          ? 'Stop listening'
          : 'Speak your question'
      }
      aria-label={
        isListening
          ? 'Stop listening'
          : 'Start voice input'
      }
      className={`
        flex h-12 w-12 items-center justify-center
        rounded-full border
        transition-all duration-200

        ${
          isListening
            ? `
              border-emerald-400/40
              bg-emerald-400/10
              text-emerald-400
            `
            : `
              border-white/10
              bg-white/[0.03]
              text-white/50
              hover:border-white/20
              hover:bg-white/[0.07]
              hover:text-white
            `
        }

        ${
          disabled
            ? 'cursor-not-allowed opacity-40'
            : ''
        }
      `}
    >
      {isListening ? '●' : '🎙'}
    </button>
  );
}