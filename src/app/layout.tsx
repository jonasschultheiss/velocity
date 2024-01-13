import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Navigation } from './components/navigation/navigation';
import { ThemeProvider } from './components/theme-provider';
import './globals.css';
import { Footer } from './components/footer';

export const metadata: Metadata = {
  title: 'Velocity',
  description: 'Analyse and compare swimmers` speeds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className="flex flex-col justify-between min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <div>
            <Navigation />
            <main className="px-6 md:px-32 md:py-16">{children}</main>
          </div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
