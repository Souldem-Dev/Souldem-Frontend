import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import Souldem from '@/app/assets/LandingPage/Features/Demo.svg';

const SouldemDemo = () => {
  return (
    <div className="my-8 flex flex-col items-center">
      <h3 className="text-center font-semibold text-blue text-3xl md:text-4xl">
        Souldem
      </h3>
      <h3 className="text-center font-semibold text-black text-3xl md:text-4xl">
        Request Demo for a day
      </h3>
      <p className="text-center text-black  text-lg p-4">
        Experience the power of the system. Request your demo now to see how it
        can revolutionize the Process and scale it up.
      </p>

      <div className="flex flex-col md:flex-row md:gap-x-12">
        <input
          type="text"
          placeholder="Enter your name"
          className="bg-white border-2  rounded-xl px-4 p-2 sm:w-96 my-4"
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="bg-white border-2  rounded-xl px-4 p-2 sm:w-96 my-4"
        />
      </div>

      <Button className="text-white  bg-blue rounded-xl my-2 p-2 w-60 ">
        Request a Demo Now
      </Button>
    </div>
  );
};

export default SouldemDemo;
