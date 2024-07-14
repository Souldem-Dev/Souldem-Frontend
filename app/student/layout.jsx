import Footer from '@/components/Footer';
import StudentSidebar from '@/components/student/StudentSidebar';
import StudentNavbar from '@/components/student/StudentNavbar';

export default function StudentLayout({ children }) {
  return (
    <main>
      <StudentNavbar />
      <div className="flex  bg-[#FAFAFD]">
        <StudentSidebar />

        {children}
      </div>

      <Footer />
    </main>
  );
}
