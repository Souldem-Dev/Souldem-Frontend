import React from 'react';
import logo from '@/app/assets/logo.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <main className="flex justify-around w-full  drop-shadow-lg  bg-white h-full py-20 ">
      <div>
        <Image src={logo} alt="Logo" />
      </div>
      <div className="flex">
        <ul>
          <li className="font-bold">Resources</li>
          <li>Whitepaper</li>
          <li>Whitepaper</li>
          <li>Whitepaper</li>
        </ul>
      </div>

      <div className="flex">
        <ul>
          <li className="font-bold">Resources</li>
          <li>Whitepaper</li>
          <li>Whitepaper</li>
          <li>Whitepaper</li>
        </ul>
      </div>

      <div className="flex">
        <ul>
          <li className="font-bold">Resources</li>
          <li>Whitepaper</li>
          <li>Whitepaper</li>
          <li>Whitepaper</li>
        </ul>
      </div>
    </main>
  );
};

export default Footer;
