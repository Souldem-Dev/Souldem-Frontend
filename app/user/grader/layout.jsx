import Footer from '@/components/Footer';
import GovSidebar from '@/components/governance/GovSidebar';
import Navbar from '@/components/Navbar';
export default function GovernanceLayout({ children }) {
  return (
    <main className="bg-[#FBFBFD] ">
      {/* <Navbar /> */}
      <div className="flex">{children}</div>

      <Footer />
    </main>
  );
}
