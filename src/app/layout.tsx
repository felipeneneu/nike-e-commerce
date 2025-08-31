import type { Metadata } from 'next';
import './globals.css';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Inter, Jost } from 'next/font/google';

const jost: NextFontWithVariable = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
});
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nike',
  description: 'An e-commerce website for Nike products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link href="/icon.svg" rel="icon" sizes="any" type="image/svg+xml" />
      <body className={`${jost.className} ${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
