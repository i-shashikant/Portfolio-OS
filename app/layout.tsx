import type { Metadata } from 'next';

import Navbar from '@/components/layout/Navbar';

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
        <Navbar />

        {children}
      </body>
    </html>
  );
}