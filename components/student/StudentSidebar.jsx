'use client';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg';
import squares from '@/app/assets/sidebar/squares.svg';
import certificate from '@/app/assets/sidebar/certificates.svg';
import Db from '@/app/assets/sidebar/Db.svg';
import setting from '@/app/assets/sidebar/setting.svg';
import logout from '@/app/assets/sidebar/logout.svg';
import token from '@/app/assets/sidebar/token.svg';
import { useState } from 'react';
import closeArrow from '@/app/assets/sidebar/closeArrow.svg';
import Link from 'next/link';
import books from '@/app/assets/sidebar/books.svg';

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {/* Full Side Bar */}
      <main
        className={`    w-60 h-full bg-white drop-shadow-md py-4 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="flex   justify-center items-center py-16  ">
          <div className=" flex flex-col gap-y-4 justify-start items-start">
            <ul className=" flex flex-col  ">
              <Link
                href="/student/governance"
                className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
              >
                <Image src={squares} alt="sqaure" />
                <span>Governance</span>
              </Link>
              <Link
                href="/"
                className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
              >
                <Image src={token} alt="sqaure" />
                <span>Buy tokens</span>{' '}
              </Link>
              <Link
                href="/certificates"
                className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer w-52 p-4 rounded-r-3xl flex gap-x-2"
              >
                <Image src={certificate} alt="sqaure" />
                <span> Certificates</span>
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
          isOpen ? 'hidden' : ''
        } `}
      >
        <div className="flex  justify-center items-center py-16  ">
          <div className=" flex flex-col gap-y-4 justify-start items-start">
            <ul className=" flex flex-col  ">
              <li className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer  p-4 rounded-r-3xl flex gap-x-2">
                <Image src={squares} alt="sqaure" />
              </li>
              <li className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer p-4 rounded-r-3xl flex gap-x-2">
                <Image src={token} alt="sqaure" />
              </li>
              <li className="hover:bg-blue hover:text-white active:bg-blue cursor-pointer p-4 rounded-r-3xl flex gap-x-2">
                <Image src={certificate} alt="sqaure" />
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-8 bg-blue text-white rounded-full p-1"
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

export default StudentSidebar;
