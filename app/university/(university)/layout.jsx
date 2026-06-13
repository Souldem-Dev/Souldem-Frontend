import Navbar from '@/components/Navbar';
import GovSidebar from '@/components/governance/GovSidebar';

export default function UniversityLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-[#f5f7ff]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <GovSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
