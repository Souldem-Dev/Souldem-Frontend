import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import Souldem from '@/app/assets/LandingPage/Features/Demo.svg';

const SouldemDemo = () => {
  return (
    <div className="my-8 flex flex-col items-center">
      <h3 className="text-center font-semibold text-black text-3xl md:text-4xl">
        <span className="text-blue">Souldem </span> Demo
      </h3>
      <p className="text-center text-black  text-lg">
        Get A First Hand Experience Of Souldem
      </p>

      <div className="bg-gray w-11/12 h-96 mx-auto my-4"></div>

      <Button className="text-white  bg-blue rounded-xl my-2 p-2 w-60 ">
        Request a Demo Now
      </Button>
    </div>
  );
};

export default SouldemDemo;
