import React from 'react';
import logo from '@/app/assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, X } from 'lucide-react';

const Footer = () => {
  return (
    <main className="flex  flex-col justify-around w-full  drop-shadow-lg  bg-white h-full  ">
      <div className=" mx-auto md:mx-8 mb-4">
        <Image src={logo} alt="Logo" />
      </div>
      <div className="flex justify-around mx-8 my-4 gap-x-4">
        <div>
          <ul>
            <li className="font-bold  text-l text-black">Quick Links</li>
            <li className="text-sm md:text-base">
              <Link href="/home">Home</Link>
            </li>
            <li className="text-sm md:text-base">
              <Link href="/about-us">About us</Link>
            </li>
            <li className="text-sm md:text-base">
              <Link href="/get-help">Get Help</Link>
            </li>
            <li className="text-sm md:text-base">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="flex">
          <ul>
            <li className="font-bold text-l text-black">Other Links</li>
            <li className="text-sm md:text-base">
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </li>
            <li className="text-sm md:text-base">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div className="flex">
          <ul>
            <li className="font-bold text-l text-black">Contact</li>
            <li className="text-sm md:text-base">jayanth.you.me@gmail.com</li>
            <li className="text-sm md:text-base">99229933993</li>
            <li className="text-sm md:text-base">Location</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-around h-8  md:h-16 items-center bg-blue">
        <p className="text-white text-sm">
          Any Inquiry feel free to Contact - souldem@org{' '}
        </p>

        <div className="flex gap-4">
          <Linkedin className="bg-blue  text-white rounded-l " />
          <X className="bg-black text-white rounded-2xl" />

          <Github className="bg-black text-white rounded-2xl" />
        </div>
      </div>
    </main>
  );
};

export default Footer;
