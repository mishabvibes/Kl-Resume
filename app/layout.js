import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'KL RESUME - Professional Portfolio Engine',
  description: 'Design your high-end portfolio in seconds. Premium themes for Kerala\'s top creators.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen bg-black text-white selection:bg-purple-500/30`}>
        {children}
      </body>
    </html>
  );
}
