import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Providers } from './providers';
import { SearchlightBackground } from '../components/SearchlightBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Devs.Miami',
  description:
    'Shipping real software in Miami. WingIt (real-time presentations) plus tools, experiments, and proof-of-work.',
  metadataBase: new URL('https://devs.miami'),
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Devs.Miami',
    description:
      'Shipping real software in Miami. WingIt plus tools, experiments, and proof-of-work.',
    url: 'https://devs.miami',
    siteName: 'Devs.Miami',
    images: ['/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devs.Miami',
    description:
      'Shipping real software in Miami. WingIt plus tools, experiments, and proof-of-work.',
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}>
        <SearchlightBackground />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
