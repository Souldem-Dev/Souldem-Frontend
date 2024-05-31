'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import books from '@/app/assets/sidebar/books.svg';
import { Home, HandCoins, Award, Folder } from 'lucide-react';

const GovSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative max-md:hidden ">
      {/* Full Side Bar */}
      {isOpen && (
        <main className="w-full h-full bg-white drop-shadow-md py-4">
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col gap-y-4 justify-start items-start">
              <ul className="flex flex-col">
                <Link
                  href="/university/governance"
                  className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                >
                  <Home className="hover:text-white" />
                  <span>Governance</span>
                </Link>
                <Link
                  href="/"
                  className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                >
                  <HandCoins className="hover:text-white" />
                  <span>Buy tokens</span>
                </Link>
                <Link
                  href="/university/certificates"
                  className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                >
                  <Award className="hover:text-white" />
                  <span>Certificates</span>
                </Link>
                <Link
                  href="/university/marksDatabase"
                  className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
                >
                  <Folder className="hover:text-white" />
                  <span>Marks database</span>
                </Link>
              </ul>
            </div>
          </div>

          <div>
            <Image src={books} alt="books" width={230} height={300} />
          </div>
        </main>
      )}

      {/* Small Side Bar */}
      {!isOpen && (
        <main className=" w-full h-full bg-white drop-shadow-md py-4">
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col gap-y-4 justify-start items-start">
              <ul className="flex flex-col">
                <li className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer p-4 rounded-r-3xl flex ">
                  <Home className="hover:text-white" />
                </li>
                <li className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer p-4 rounded-r-3xl flex ">
                  <HandCoins className="hover:text-white" />
                </li>
                <li className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer p-4 rounded-r-3xl flex gap-x-2">
                  <Award className="hover:text-white" />
                </li>
                <li className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer p-4 rounded-r-3xl flex gap-x-2">
                  <Folder className="hover:text-white" />
                </li>
              </ul>
            </div>
          </div>
        </main>
      )}

      <button
        onClick={toggleSidebar}
        className={`absolute top-4 z-10 ${
          isOpen ? 'left-48' : 'left-12'
        } bg-blue text-white p-1 rounded-full`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-left"
        >
          <path d={isOpen ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
        </svg>
      </button>
    </div>
  );
};

export default GovSidebar;
