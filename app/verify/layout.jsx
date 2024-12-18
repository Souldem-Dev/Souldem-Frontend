import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import StudentSidebar from '@/components/student/StudentSidebar';

export default function StudentLayout({ children }) {
  return (
    <main className="bg-[#F9FBFC] ">
      <Navbar />
      <div className="flex">{children}</div>

      <Footer />
    </main>
  );
}
