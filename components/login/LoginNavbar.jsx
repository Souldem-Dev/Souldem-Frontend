import Image from 'next/image';
import React from 'react';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';

const LoginNavbar = () => {
  return (
    <header className="flex items-center w-full h-14 bg-white px-6 shrink-0" style={{ borderBottom: '1px solid #eef0f6' }}>
      <Link href="/" className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
        <Image src={logo} alt="Souldem" height={24} />
      </Link>
    </header>
  );
};

export default LoginNavbar;
