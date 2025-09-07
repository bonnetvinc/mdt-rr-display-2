import '~/styles/globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { Toaster } from '~/components/ui/sonner';

export const metadata: Metadata = {
  title: 'MDT-RR Digester',
  description: 'VBT inc. application for digesting race results',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans'
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="flex min-h-screen flex-col bg-gray-100 text-black">
        <div className="min-h-screen bg-black text-white">
          {/* Compact Header for Display */}
          <div className="bg-gradient-to-r from-green-600 via-orange-600 to-red-600 py-3 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="font-bold text-2xl">DÉFI 24H LACOURSE</h1>
                  <div className="animate-pulse rounded-full bg-red-500 px-3 py-1 font-bold text-sm">LIVE</div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
