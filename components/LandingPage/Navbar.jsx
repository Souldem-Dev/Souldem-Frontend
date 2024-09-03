import React from 'react';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, HandCoins, Award } from 'lucide-react';
import logoIcon from '@/app/assets/logoIcon.svg';

const Navbar = () => {
  return (
    <main className="flex justify-between  items-center w-full    h-20 md:bg-[#F2F6F9] bg-[#4F5DE4] px-8">
      <div>
        <Link href="/governance">
          <div className="flex justify-center items-center">
            <Image src={logo} alt="Logo" className="hidden md:flex" />

            <Image src={logoIcon} alt="Logo" className="md:hidden" />
          </div>
        </Link>
      </div>

      <div className=" justify-between items-center py-16 hidden md:flex ">
        <div className="flex flex-col gap-y-4 justify-start items-start">
          <ul className="flex ">
            <Link
              href="/"
              className="hover:text-blue cursor-pointer  p-4 rounded-r-3xl flex "
            >
              <span>Home</span>
            </Link>
            <Link
              href="/features"
              className="hover:text-blue cursor-pointer p-4 rounded-r-3xl flex"
            >
              <span>Features</span>
            </Link>
            <Link
              href="/aboutUs"
              className="hover:text-blue cursor-pointer p-4 rounded-r-3xl flex "
            >
              <span>About us</span>
            </Link>
            <Link
              href="/pageUnderConstruction"
              className=" hover:text-blue cursor-pointer p-4 rounded-r-3xl flex "
            >
              <span>blog</span>
            </Link>
            <Link
              href="/pageUnderConstruction"
              className=" hover:text-blue cursor-pointer p-4 rounded-r-3xl flex "
            >
              <span>Whitepapers</span>
            </Link>
          </ul>
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className=" flex-col gap-y-4 items-start ">
          <Button className="border-white border-2 bg-[#4F5DE4]  md:bg-blue text-white md:w-40">
            launch App
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden bg-white rounded-xl">
              <AlignJustify className="text-blue " />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-60 h-full bg-white drop-shadow-md py-4">
            {' '}
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col gap-y-4 justify-start items-start">
                <ul className="flex flex-col">
                  <Link
                    href="/home"
                    className="hover:text-blue cursor-pointer w-52 p-4  flex gap-x-2"
                  >
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/features"
                    className=" hover:text-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                  >
                    <span>Features</span>
                  </Link>
                  <Link
                    href="/aboutUs"
                    className="hover:text-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                  >
                    <span>About Us</span>
                  </Link>
                  <Link
                    href="/pageUnderConstruction"
                    className="hover:text-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                  >
                    <span>Blogs</span>
                  </Link>{' '}
                  <Link
                    href="/pageUnderConstruction"
                    className="hover:text-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                  >
                    <span>Whitepapers</span>
                  </Link>
                </ul>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </main>
  );
};

export default Navbar;
