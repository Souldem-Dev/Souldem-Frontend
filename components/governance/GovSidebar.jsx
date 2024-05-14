'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import books from '@/app/assets/sidebar/books.svg';
import { Home } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { Award } from 'lucide-react';
import { Folder } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

const GovSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isTabletOrMobile = useMediaQuery({ minWidth: 720 });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Full Side Bar */}
      <main
        className={`  md:static  w-60 h-full bg-white drop-shadow-md py-4 fixed ${
          isOpen ? '' : 'hidden'
        }${isTabletOrMobile ? '' : 'hidden'}`}
      >
        <div className="flex   justify-center items-center py-16  ">
          <div className=" flex flex-col gap-y-4 justify-start items-start">
            <ul className=" flex flex-col  ">
              <Link
                href="/governance"
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
                <span>Buy tokens</span>{' '}
              </Link>
              <Link
                href="/certificates"
                className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
              >
                <Award className="hover:text-white" />

                <span> Certificates</span>
              </Link>
              <Link
                href="/marksDatabase"
                className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
              >
                <Folder className="hover:text-white" />
                <span>Marks database </span>{' '}
              </Link>
            </ul>
          </div>
        </div>

        <div className="">
          <Image src={books} alt="books" />
        </div>
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-60 bg-blue text-white p-1 rounded-full "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </main>

      {/* Small Side Bar */}
      <main
        className={`   w-full h-full   bg-white drop-shadow-md py-4  ${
          isOpen ? '' : ''
        } ${isTabletOrMobile ? 'hidden' : ''}`}
      >
        <div className="flex  justify-center items-center py-16  ">
          <div className=" flex flex-col gap-y-4 justify-start items-start">
            <ul className=" flex flex-col  ">
              <li className="hover:bg-blue  hover:text-white active:bg-blue cursor-pointer  p-4 rounded-r-3xl flex gap-x-2">
                <Home className="hover:text-white" />
              </li>
              <li className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer p-4 rounded-r-3xl flex gap-x-2">
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

        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-8 bg-blue bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </main>
    </div>
  );
};

export default GovSidebar;
