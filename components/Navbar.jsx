import Image from 'next/image';
import React from 'react';
import wallet from '@/app/assets/wallet.svg';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';

const Navbar = () => {
  return (
    <main className="flex justify-between  items-center w-full   drop-shadow-md  bg-white h-20 px-8">
      <Link href="/governance">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="Logo" />
        </div>
      </Link>

      <button className="btn bg-gradient-to-r from-blue to-D_blue rounded-xl p-2 px-4 text-white flex gap-2">
        <Image src={wallet} alt="Logo" />
        Connect Wallet
      </button>
    </main>
  );
};

export default Navbar;
