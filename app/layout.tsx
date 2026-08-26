import type { Metadata } from 'next';

import Navbar from '@/components/layout/Navbar';
import PortfolioKeyboard from '@/components/layout/PortfolioKeyboard';
import PortfolioHUD from '@/components/layout/PortfolioHUD';

import { PortfolioProvider } from '@/stores/portfolio-store';

import OSBootScreen from '@/components/os/OSBootScreen';
import KeyboardController from '@/components/os/KeyboardController';

// import GestureController from '@/components/gesture/GestureController';

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
          {/* Portfolio OS boot / entry screen */}
          <OSBootScreen />

          {/* Existing portfolio navigation/UI */}
          <PortfolioKeyboard />
          <PortfolioHUD />
          <Navbar />
          <KeyboardController />

          {/* Global gesture layer */}
          {/* <GestureController /> */}

          {/* ORIGINAL PORTFOLIO */}
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}