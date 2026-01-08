import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PilotPulse - Aviation Career Platform',
  description:
    'Discover pilot and cabin crew opportunities worldwide. Connect with leading airlines, find accredited flight schools, and join our aviation community.',
  keywords: [
    'pilot jobs',
    'cabin crew jobs',
    'aviation careers',
    'flight schools',
    'airline jobs',
    'pilot training',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
