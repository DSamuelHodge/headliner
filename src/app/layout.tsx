import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TechInsights Newsletter',
  description: 'Stay informed with the latest tech industry insights and analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-white dark:bg-gray-900`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="relative flex flex-col min-h-screen">
            {/* Static gradient background */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 opacity-0 dark:opacity-100 pointer-events-none" />
            
            {/* Content */}
            <Nav />
            <main className="flex-1 relative">
              {children}
            </main>
            <footer className="relative border-t border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-sm text-gray-500 dark:text-gray-400" suppressHydrationWarning>
                  &copy; 2025 TechInsights. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
