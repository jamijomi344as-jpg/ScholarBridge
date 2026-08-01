import type { Metadata } from 'next';
import './globals.css'; // <-- SHU QATOR BORLIGIGA ISHONCH HOSIL QILING!

export const metadata: Metadata = {
  title: 'ScholarBridge AI',
  description: 'Find the universities that would actually want you',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
