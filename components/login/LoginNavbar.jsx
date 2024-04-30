import Image from 'next/image';
import React from 'react';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';

const LoginNavbar = () => {
  return (
    <main className="flex justify-between  items-center w-full   drop-shadow-md  bg-white h-20 px-8">
      <Link href="/governance">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="Logo" />
        </div>
      </Link>
    </main>
  );
};
export default LoginNavbar;
