import type { Metadata } from 'next';

import Navbar from '@/components/layout/Navbar';
import PortfolioKeyboard from '@/components/layout/PortfolioKeyboard';
import PortfolioHUD from '@/components/layout/PortfolioHUD';

import { PortfolioProvider } from '@/stores/portfolio-store';

import OSBootScreen from '@/components/os/OSBootScreen';
import KeyboardController from '@/components/os/KeyboardController';
import GestureController from '@/components/gestures/GestureController';
import GestureGuideModal from '@/components/gestures/GestureGuideModal';
import DeveloperModeEasterEgg from '@/components/gestures/DeveloperModeEasterEgg';
import OSCommandPalette from '@/components/os/OSCommandPalette';
import VoiceController from '@/components/voice/VoiceController';
import GlobalCursorGlow from '@/components/ui/GlobalCursorGlow';

import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio OS',
  description: 'A creative developer portfolio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PortfolioProvider>
          {/* Theme-reactive global mouse cursor glow ball */}
          <GlobalCursorGlow />

          {/* Portfolio OS boot / entry screen */}
          <OSBootScreen />

          {/* Existing portfolio navigation/UI */}
          <PortfolioKeyboard />
          <PortfolioHUD />
          <Navbar />
          <KeyboardController />

          {/* Hand Gesture Controls System & OS Palette */}
          <GestureController />
          <GestureGuideModal />
          <DeveloperModeEasterEgg />
          <OSCommandPalette />

          {/* Voice Navigation & Live Widgets */}
          <VoiceController />


          {/* ORIGINAL PORTFOLIO */}
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}