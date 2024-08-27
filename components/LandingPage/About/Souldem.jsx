import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import Souldem from '@/app/assets/LandingPage/Features/Demo.svg';

const Souldem = () => {
  return (
    <div className="my-8 flex flex-col items-center">
      <h3 className="text-center font-semibold text-black text-3xl md:text-4xl">
        What is
        <span className="text-blue">Souldem </span>
      </h3>
      <p className="text-center text-black  text-lg">
        Allow us to introduce ourselves! Hear from our CEO, Abdul Haq M, about
        who we are, how we started, and where we're headed. Learn more about
        Souldem in our Learn Center
      </p>

      <div className="bg-gray w-11/12 h-96 mx-auto my-4"></div>

      <Button className="text-white  bg-blue rounded-xl my-2 p-2 w-60 ">
        Follow us on Social Media
      </Button>
    </div>
  );
};

export default Souldem;
