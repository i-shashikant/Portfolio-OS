import type { Metadata } from 'next';

import Navbar from '@/components/layout/Navbar';
import PortfolioKeyboard from '@/components/layout/PortfolioKeyboard';
import { PortfolioProvider } from '@/stores/portfolio-store';
import PortfolioHUD from '@/components/layout/PortfolioHUD';

import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio OS',
  description:
    'A creative developer portfolio.',
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
          <PortfolioKeyboard />
          <PortfolioHUD />
          <Navbar />
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}