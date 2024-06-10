'use client';

import WalletProvider from '@/app/university/WalletContext';

export default function UniversityLayout({ children }) {
  return (
    <WalletProvider>
      <main className="bg-[#FBFBFD] ">
        <div className="flex">{children}</div>
      </main>
    </WalletProvider>
  );
}
