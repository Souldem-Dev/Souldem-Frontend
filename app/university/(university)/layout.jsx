'use client';
import Footer from '@/components/Footer';
import GovSidebar from '@/components/governance/GovSidebar';
import Navbar from '@/components/Navbar';
import WalletProvider from '@/app/university/WalletContext';

export default function UniversityLayout({ children }) {
  return (
    <WalletProvider>
      <main className="bg-[#FBFBFD] ">
        <Navbar />
        <div className="flex">
          <GovSidebar />
          {children}
        </div>

        <Footer />
      </main>
    </WalletProvider>
  );
}
