import StudentSidebar from '@/components/student/StudentSidebar';
import StudentNavbar from '@/components/student/StudentNavbar';

export default function ProfileLayout({ children }) {
  return (
    <div className="flex flex-col h-screen" style={{ background: '#f8faff' }}>
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
