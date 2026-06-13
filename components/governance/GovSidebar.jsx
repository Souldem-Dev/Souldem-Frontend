'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Home, CheckSquare, LogOut, GraduationCap } from 'lucide-react';

const ROLE_NAV = {
  hod: [
    { href: '/user/hod',  icon: Home, label: 'Home' },
  ],
  mentor: [
    { href: '/user/mentor', icon: Home, label: 'Home' },
  ],
  grader: [
    { href: '/user/grader', icon: Home, label: 'Home' },
  ],
  university: [
    { href: '/university/governance',   icon: Home,        label: 'Governance'   },
    { href: '/university/certificates', icon: CheckSquare, label: 'Certificates' },
  ],
};

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

const GovSidebar = () => {
  const pathname = usePathname();
  const router   = useRouter();
  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(Cookies.get('activeRole') || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userPublicAddress');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('jwt');
    localStorage.removeItem('allRoles');
    Cookies.remove('jwt');
    Cookies.remove('activeRole');
    router.push('/user/login');
  };

  const nav = ROLE_NAV[role] || [];

  const isActive = (href) =>
    href.split('/').length === 3
      ? pathname === href || pathname.startsWith(href + '/')
      : pathname.startsWith(href);

  return (
    <aside className="hidden md:flex flex-col items-center w-14 shrink-0 min-h-[calc(100vh-56px)] py-5 gap-1.5" style={{ background: '#3E68FC' }}>
      <div className="mb-4 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
        <GraduationCap size={20} className="text-white" />
      </div>

      {nav.map(({ href, icon: Icon, label }) => (
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

export default GovSidebar;
