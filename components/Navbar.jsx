import Image from 'next/image';
import React from 'react';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <main className="flex justify-between  items-center w-full   drop-shadow-md h-20 bg-white px-8">
      <Link href="/governance">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="Logo" />
        </div>
      </Link>

      <Button className="bg-black text-white ">
        <Wallet /> Connect Wallet
      </Button>
    </main>
  );
};

export default Navbar;
