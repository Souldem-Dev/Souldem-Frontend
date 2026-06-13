import StudentSidebar from '@/components/student/StudentSidebar';
import StudentNavbar from '@/components/student/StudentNavbar';

export default function StudentLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-[#f5f7ff]">
      <StudentNavbar />
      <div className="flex flex-1 overflow-hidden">
        <StudentSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
