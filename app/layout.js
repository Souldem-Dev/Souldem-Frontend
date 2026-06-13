import './globals.css';

export const metadata = {
  title: 'Souldem — Blockchain-Verified Academic Credentials',
  description: 'Souldem brings tamper-proof, blockchain-verified credentials to universities. Manage academic records with transparency and ease on Polygon and Ethereum.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: '#0A0E1A', margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
