import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'ScholarBridge AI — Universitet va Grantlar Platformasi',
  description: "AI yordamida o'zingizga mos keluvchi TOP universitetlar va to'liq grantlarni toping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body style={{ margin: 0, padding: 0 }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
