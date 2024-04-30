import Footer from '@/components/Footer';
import GovSidebar from '@/components/governance/GovSidebar';
import Navbar from '@/components/Navbar';
import '../globals.css';

export default function GovernanceLayout({ children }) {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <GovSidebar />
        {children}
      </div>

      <Footer />
    </main>
  );
}
