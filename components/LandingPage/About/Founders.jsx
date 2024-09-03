import React from 'react';
import Image from 'next/image';
import Abdul from '@/app/assets/LandingPage/aboutUs/Abdul.svg';
import Jay from '@/app/assets/LandingPage/aboutUs/Jay.svg';
import logoIcon from '@/app/assets/logoIconBlue.svg';
import { Linkedin, X } from 'lucide-react';
import Aero from '@/app/assets/LandingPage/Aero.svg';
import Bstar from '@/app/assets/LandingPage/Bstar.svg';

import ITNT from '@/app/assets/LandingPage/aboutUs/ITNT.svg';

const Founders = () => {
  return (
    <div className="relative">
      <Image
        src={Bstar}
        alt="Aero"
        className="w-12 md:flex hidden h-full   absolute  end-12 "
      />
      <Image
        src={Bstar}
        alt="Aero"
        className="w-12 md:flex hidden h-full   absolute top-64 start-12 "
      />
      <h1 className="text-center text-4xl font-semibold text-blue my-8">
        Founders
      </h1>
      <div className="flex justify-around items-center">
        <div className=" flex flex-col items-center gap-y-2">
          <Image src={Abdul} alt="abdul" className=" w-40 lg:w-80 h-full" />{' '}
          <h3 className="text-2xl font-semibold text-black">Abdul Haq M</h3>
          <p className="font-medium"> Founder </p>
          <div className="flex gap-2">
            <Linkedin className="bg-blue  text-white rounded-l " />
            <X className="bg-black text-white rounded-2xl" />
          </div>
        </div>

        <div className=" flex flex-col items-center gap-y-2">
          <Image src={Jay} alt="Jayanth" className="w-40 lg:w-80 h-full" />{' '}
          <h3 className="text-2xl font-semibold text-black">Jayanth Koppala</h3>
          <p className="font-medium"> Co-Founder </p>
          <div className="flex gap-2">
            <Linkedin className="bg-blue  text-white rounded-l " />
            <X className="bg-black text-white rounded-2xl" />
          </div>
        </div>
      </div>

      <p className="text-center text-lg my-4  text-black w-3/4 mx-auto">
        Lorem ipsum dolor sit amet consectetur. Est in enim metus pretium sit
        enim volutpat pellentesque. Eu sit justo urna blandit urna dui.
        Pellentesque nunc sit enim elit scelerisque. Risus purus elementum vel
        vestibulum in diam velit.Lorem ipsum dolor sit amet consectetur. Est in
        enim metus pretium sit enim volutpat pellentesque. Eu sit justo urna
        blandit urna dui. Pellentesque nunc sit enim elit scelerisque. Risus
        purus elementum vel vestibulum in diam velit.Lorem ipsum dolor sit amet
        consectetur. Est in enim metus pretium sit enim volutpat pellentesque.
        Eu sit justo urna blandit urna dui. Pellentesque nunc sit enim elit
        scelerisque. Risus purus elementum vel vestibulum in diam velit.Lorem
        ipsum dolor sit amet consectetur. Est in enim metus pretium sit enim
        volutpat pellentesque. Eu sit justo urna blandit urna dui. Pellentesque
        nunc sit enim elit scelerisque. Risus purus elementum vel vestibulum in
        diam velit.
      </p>

      <div className=" w-11/12  mx-auto my-8">
        <h3 className="text-center font-semibold text-black text-3xl md:text-4xl">
          Backed by top firm
        </h3>

        <Image src={ITNT} alt="ITNT" className="w-11/12 h-full mx-auto my-8" />
        <p className="text-center   text-lg my-4  text-black w-3/4 mx-auto">
          Lorem ipsum dolor sit amet consectetur. Est in enim metus pretium sit
          enim volutpat pellentesque. Eu sit justo urna blandit urna dui.
          Pellentesque nunc sit enim elit scelerisque. Risus purus elementum vel
          vestibulum in diam velit.Lorem ipsum dolor sit amet consectetur. Est
          in enim metus pretium sit enim volutpat pellentesque. Eu sit justo
          urna blandit urna dui. Pellentesque nunc sit enim elit scelerisque.
          Risus purus element
        </p>
      </div>

      <div className=" w-11/12  mx-auto my-20">
        <h3 className="text-center font-semibold text-black text-3xl md:text-4xl">
          Mission and Vision of Souldem
        </h3>
        <p className="text-center my-4  text-black w-3/4 mx-auto  text-lg">
          Lorem ipsum dolor sit amet consectetur. Est in enim metus pretium sit
          enim volutpat pellentesque. Eu sit justo urna blandit urna dui.
          Pellentesque nunc sit enim elit scelerisque. Risus purus elementum vel
          vestibulum in diam velit.Lorem ipsum dolor sit amet consectetur. Est
          in enim metus pretium sit enim volutpat pellentesque. Eu sit justo
          urna blandit urna dui. Pellentesque nunc sit enim elit scelerisque.
          Risus purus element
        </p>
      </div>

      <div className="border-blue border-2 h-32 my-8 bg-[#F3F6FF] px-4 rounded-xl w-5/6 md:w-3/6 mx-auto flex items-center justify-between">
        <Image src={logoIcon} alt="logo" className=" mx-auto my-8" />
        <h3 className=" text-xl md:text-3xl text-black font-semibold">
          For More Support
        </h3>
        <button className="bg-blue text-white rounded-xl p-2 px-4 w-40  mx-auto my-8">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Founders;
