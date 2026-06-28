import LandingNavbar from '@/components/LandingPage/Navbar';

export default function VerifyLayout({ children }) {
  return (
    <main className="bg-[#F9FBFC] min-h-screen">
      <LandingNavbar />
      {children}
    </main>
  );
}
