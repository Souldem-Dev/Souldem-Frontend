'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Home, Award, LogOut, GraduationCap } from 'lucide-react';

const NAV = [
  { href: '/user/wallet',              icon: Home,  label: 'Home'         },
  { href: '/user/wallet/certificates', icon: Award, label: 'Certificates' },
];

function Tooltip({ label, children }) {
  return (
    <div className="relative group flex">
      {children}
      <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 text-white text-xs px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
        {label}
      </span>
    </div>
  );
}

const StudentSidebar = () => {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userPublicAddress');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('jwt');
    localStorage.removeItem('allRoles');
    Cookies.remove('jwt');
    Cookies.remove('activeRole');
    router.push('/user/login');
  };

  const isActive = (href) =>
    href === '/user/wallet' ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="hidden md:flex flex-col items-center w-14 shrink-0 bg-blue min-h-[calc(100vh-56px)] py-5 gap-1.5">
      <div className="mb-4 w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
        <GraduationCap size={20} className="text-white" />
      </div>

      {NAV.map(({ href, icon: Icon, label }) => (
        <Tooltip key={href} label={label}>
          <Link
            href={href}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isActive(href)
                ? 'bg-white/25 text-white'
                : 'text-white/55 hover:text-white hover:bg-white/15'
            }`}
          >
            <Icon size={19} />
          </Link>
        </Tooltip>
      ))}

      <div className="flex-1" />

      <Tooltip label="Logout">
        <button
          onClick={handleLogout}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white/45 hover:text-white hover:bg-red-500/25 transition-all"
        >
          <LogOut size={19} />
        </button>
      </Tooltip>
    </aside>
  );
};

export default StudentSidebar;
