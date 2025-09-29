import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Right Message Stream',
  description: 'For Markopolo AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
