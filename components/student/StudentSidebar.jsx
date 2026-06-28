'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Home, Award, LogOut, GraduationCap, UserCircle, ChevronRight } from 'lucide-react';

const NAV = [
  { href: '/user/wallet',              icon: Home,       label: 'Dashboard'    },
  { href: '/user/profile',             icon: UserCircle, label: 'My Profile'   },
  { href: '/user/wallet/certificates', icon: Award,      label: 'Certificates' },
];

const StudentSidebar = () => {
  const pathname = usePathname();
  const router   = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(localStorage.getItem('userEmail') || '');
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

  const isActive = (href) =>
    href === '/user/wallet' ? pathname === href : pathname.startsWith(href);

  const initials = (email.split('@')[0] || 'S').charAt(0).toUpperCase();

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white border-r border-gray-100" style={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* Brand */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#1e3a8a,#3E68FC)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(30,58,138,0.3)' }}>
            <GraduationCap size={17} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', fontFamily: 'Georgia, serif', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              SOUL<span style={{ color: '#3E68FC' }}>DEM</span>
            </p>
            <p style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 1 }}>
              Student Portal
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px 8px' }}>
          Menu
        </p>
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10,
                fontSize: 14, fontWeight: active ? 600 : 500,
                color: active ? '#1e3a8a' : '#64748b',
                background: active ? '#eef2ff' : 'transparent',
                textDecoration: 'none', transition: 'all 0.15s',
                border: active ? '1px solid #c7d2fe' : '1px solid transparent',
              }}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{label}</span>
              {active && <ChevronRight size={13} style={{ color: '#3E68FC' }} />}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ borderTop: '1px solid #f1f5f9', padding: '12px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#3E68FC,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {email.split('@')[0] || 'Student'}
            </p>
            <p style={{ fontSize: 11, color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 10, fontSize: 13, fontWeight: 500, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#64748b'; }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
