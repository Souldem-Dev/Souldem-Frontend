import React from 'react';
import Image from 'next/image';
import hero from '@/app/assets/LandingPage/aboutUs/hero.svg';
import { CirclePlay } from 'lucide-react';
import heroMobile from '@/app/assets/LandingPage/aboutUs/HeroMobile.svg';
import Aero from '@/app/assets/LandingPage/Aero.svg';
import Bstar from '@/app/assets/LandingPage/Bstar.svg';

const Hero = () => {
  return (
    <div className="flex h-full items-center bg-[#4F5DE4] md:bg-inherit relative">
      <Image
        src={Aero}
        alt="Aero"
        className="w-60 h-full  absolute inset-y-full inset-0 "
      />
      <Image
        src={Bstar}
        alt="Aero"
        className="w-12 md:flex hidden h-full   absolute inset-y-full bottom-64 "
      />

      <div className="md:w-7/12  lg:p-20  md:p-8 mt-8 mx-auto px-4 ">
        <h5 className="text-2xl hidden md:flex text-blue font-medium">
          About Us
        </h5>
        <h1 className=" text-5xl text-center md:text-left text-white md:text-black font-semibold">
          Souldem Instant blockchain verification of credentials.
        </h1>
        <p className="my-2 text-center md:text-left text-white md:text-para">
          Lorem ipsum dolor sit amet consectetur. Est in enim metus pretium sit
          enim volutpat pellentesque. Eu sit justo urna blandit urna dui.
          Pellentesque nunc sit enim elit scelerisque. Risus purus elementum vel
          vestibulum in diam velit.
        </p>
        <div className="flex justify-center md:justify-start">
          {' '}
          <button className=" border-white border-2 bg-[#4F5DE4]  md:bg-blue text-white rounded-xl p-2 px-4  md:w-40">
            Launch App
          </button>
        </div>

        <Image src={heroMobile} alt="hero" className="md:hidden mx-auto mt-4" />
      </div>

      <div className="w-5/12  hidden md:flex">
        <Image src={hero} alt="hero" className="" />
      </div>
    </div>
  );
};

export default Hero;
