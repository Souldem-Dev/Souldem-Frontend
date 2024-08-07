import Footer from '@/components/Footer';

import Navbar from '@/components/Navbar';

export default function GovernanceLayout({ children }) {
  return (
    <main className="bg-[#FBFBFD] ">
      <Navbar />
      <div className="flex">{children}</div>

      <Footer />
    </main>
  );
}
