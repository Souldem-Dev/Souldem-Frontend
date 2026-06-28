'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AlignJustify, LogOut, Home, Award } from 'lucide-react';
import Cookies from 'js-cookie';
import RoleSwitcher from '@/components/RoleSwitcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const PAGE_TITLES = {
  '/user/wallet':              { title: 'Dashboard',     sub: 'Your academic overview' },
  '/user/profile':             { title: 'My Profile',    sub: 'Personal information & photo' },
  '/user/wallet/certificates': { title: 'Certificates',  sub: 'Your blockchain-verified credentials' },
};

const StudentNavbar = () => {
  const router   = useRouter();
  const pathname = usePathname();
  const [initials, setInitials] = useState('');
  const [email,    setEmail]    = useState('');

  useEffect(() => {
    const mail = localStorage.getItem('userEmail') || '';
    setEmail(mail);
    setInitials((mail.split('@')[0] || 'S').charAt(0).toUpperCase());
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

  const pageKey  = Object.keys(PAGE_TITLES).find(k => pathname === k || (k !== '/user/wallet' && pathname.startsWith(k)));
  const pageInfo = pageKey ? PAGE_TITLES[pageKey] : null;

  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0, zIndex: 30 }}>

      {/* Page title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {pageInfo ? (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>{pageInfo.title}</h2>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{pageInfo.sub}</p>
          </div>
        ) : (
          <Link href="/user/wallet" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              SOUL<span style={{ color: '#3E68FC' }}>DEM</span>
            </span>
          </Link>
        )}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RoleSwitcher />

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 10, paddingLeft: 12, marginLeft: 4, borderLeft: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>{email.split('@')[0] || 'Student'}</span>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>Student</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#3E68FC,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: '0 2px 8px rgba(62,104,252,0.25)' }}>
            {initials}
          </div>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden h-9 w-9 p-0 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 shadow-none">
              <AlignJustify size={16} className="text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-0 flex flex-col py-0 px-0 gap-0" style={{ background: '#fff' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                SOUL<span style={{ color: '#3E68FC' }}>DEM</span>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, padding: '10px 12px', background: '#f8faff', borderRadius: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#3E68FC,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                  {initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.split('@')[0]}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8' }}>{email}</p>
                </div>
              </div>
            </div>
            <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link href="/user/wallet" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, fontSize: 14, color: '#374151', textDecoration: 'none' }}>
                <Home size={16} /> Dashboard
              </Link>
              <Link href="/user/wallet/certificates" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, fontSize: 14, color: '#374151', textDecoration: 'none' }}>
                <Award size={16} /> Certificates
              </Link>
            </nav>
            <div style={{ borderTop: '1px solid #f1f5f9', padding: '12px 10px' }}>
              <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, fontSize: 14, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
                <LogOut size={15} /> Sign out
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default StudentNavbar;
