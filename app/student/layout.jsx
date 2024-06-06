import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import StudentSidebar from '@/components/student/StudentSidebar';

export default function StudentLayout({ children }) {
  return (
    <main className="bg-[#F9FBFC] ">
      <div className="flex">
        <StudentSidebar />
        {children}
      </div>

      <Footer />
    </main>
  );
}
