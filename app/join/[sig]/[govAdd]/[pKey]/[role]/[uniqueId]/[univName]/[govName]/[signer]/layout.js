import Footer from '@/components/Footer';

//import '../globals.css';
import LoginNavbar from '@/components/login/LoginNavbar';

export default function GovernanceLayout({ children }) {
  return (
    <main className="bg-[#FBFBFD] h-max   ">
      <LoginNavbar />
      <div className="flex">{children}</div>

      <Footer />
    </main>
  );
}
