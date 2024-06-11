import Footer from '@/components/Footer';
import GovSidebar from '@/components/governance/GovSidebar';
import Navbar from '@/components/Navbar';
import NextAuth from '@auth-kit/next/NextAuth';

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      <div className="flex  bg-[#FAFAFD]">
        <GovSidebar />

        {children}
      </div>

      <Footer />
    </main>
  );
}
