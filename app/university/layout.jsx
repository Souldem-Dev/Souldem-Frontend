'use client';

import WalletProvider from '@/app/university/WalletContext';

export default function UniversityLayout({ children }) {
  return (
    <WalletProvider>
      <body className="flex">{children}</body>
    </WalletProvider>
  );
}
