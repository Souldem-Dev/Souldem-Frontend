import React from 'react';
import Image from 'next/image';
import Abdul from '@/app/assets/LandingPage/aboutUs/Abdul.svg';
import Jay from '@/app/assets/LandingPage/aboutUs/Jay.svg';
import logoIcon from '@/app/assets/logoIconBlue.svg';
import { Linkedin, X } from 'lucide-react';
import Aero from '@/app/assets/LandingPage/Aero.svg';
import Bstar from '@/app/assets/LandingPage/Bstar.svg';

import ITNT from '@/app/assets/LandingPage/aboutUs/ITNT.svg';
import Contact from '@/app/assets/LandingPage/aboutUs/Contact.svg';

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
        Souldem <span className="text-black">Founders</span>
      </h1>
      <div className="flex justify-around items-center">
        <div className=" flex flex-col items-center gap-y-2">
          <Image src={Abdul} alt="abdul" className=" w-40 lg:w-80 h-full" />{' '}
          <h3 className="text-2xl font-semibold text-black">Abdul Haq M</h3>
          <p className="font-medium"> Founder </p>
          <div className="flex gap-2">
            <Linkedin className="bg-blue  text-white rounded-l p-1" />
            <X className="bg-black text-white rounded-2xl" />
          </div>
        </div>

        <div className=" flex flex-col items-center gap-y-2">
          <Image src={Jay} alt="Jayanth" className="w-40 lg:w-80 h-full" />{' '}
          <h3 className="text-2xl font-semibold text-black">Jayanth Koppala</h3>
          <p className="font-medium"> Co-Founder </p>
          <div className="flex gap-2">
            <Linkedin className="bg-blue  p-1 text-white rounded-l " />
            <X className="bg-black text-white rounded-2xl" />
          </div>
        </div>
      </div>

      <p className="text-center text-lg my-4  text-black w-5/6 mx-auto">
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
        <h3 className="text-center font-semibold text-black text-3xl md:text-4xl mb-8">
          Backed by top firm
        </h3>

        <Image src={ITNT} alt="ITNT" className="w-11/12 h-full mx-auto my-8" />
        <p className="text-center   text-lg my-4  text-black w-5/6 mx-auto">
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
        <p className="text-center my-4  text-black w-5/6 mx-auto  text-lg">
          Lorem ipsum dolor sit amet consectetur. Est in enim metus pretium sit
          enim volutpat pellentesque. Eu sit justo urna blandit urna dui.
          Pellentesque nunc sit enim elit scelerisque. Risus purus elementum vel
          vestibulum in diam velit.Lorem ipsum dolor sit amet consectetur. Est
          in enim metus pretium sit enim volutpat pellentesque. Eu sit justo
          urna blandit urna dui. Pellentesque nunc sit enim elit scelerisque.
          Risus purus element
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className=" text-3xl md:text-4xl text-black font-semibold text-center">
          For More Support
        </h3>

        <Image src={Contact} alt="logo" className="" />

        <button className="border-2 border-blue bg-blue text-white rounded-xl p-2 w-60 my-4">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Founders;
