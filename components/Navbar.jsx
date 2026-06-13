'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlignJustify, LogOut, Home, CheckSquare, Users, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import RoleSwitcher from '@/components/RoleSwitcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ROLE_HOME = {
  hod:        '/user/hod',
  mentor:     '/user/mentor',
  grader:     '/user/grader',
  university: '/university/governance',
};

const Navbar = () => {
  const router = useRouter();
  const [initials, setInitials] = useState('');
  const [email, setEmail]       = useState('');
  const [role, setRole]         = useState('');

  useEffect(() => {
    const mail = localStorage.getItem('userEmail') || '';
    setEmail(mail);
    setInitials((mail.split('@')[0] || 'U').charAt(0).toUpperCase());
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

  const homeHref = ROLE_HOME[role] || '/user/wallet';

  return (
    <header className="flex justify-between items-center w-full h-14 bg-white px-5 shrink-0 z-30" style={{ borderBottom: '1px solid #eef0f6' }}>

      {/* Left — logo */}
      <Link href={homeHref} className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
        <Image src={logo} alt="Souldem" height={24} />
      </Link>

      {/* Right */}
      <div className="flex items-center gap-2">
        <RoleSwitcher />

        {/* User avatar — desktop */}
        <div className="hidden md:flex items-center gap-2.5 pl-2 ml-1 border-l border-gray-100">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white select-none"
            style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)' }}
            title={email}
          >
            {initials}
          </div>
          <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate hidden lg:block">
            {email.split('@')[0]}
          </span>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden h-8 w-8 p-0 rounded-lg bg-transparent hover:bg-gray-50 border border-gray-200 shadow-none">
              <AlignJustify size={15} className="text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-0 flex flex-col py-0 px-0 gap-0" style={{ background: '#1e2a5e' }}>
            <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{email.split('@')[0]}</p>
                <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{email}</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
              <Link href={homeHref} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                <Home size={16} /> Home
              </Link>
            </nav>
            <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
