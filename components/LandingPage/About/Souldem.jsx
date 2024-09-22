import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import Aero from '@/app/assets/LandingPage/Aero.svg';
import Bstar from '@/app/assets/LandingPage/Bstar.svg';

const Souldem = () => {
  return (
    <div className="my-20 flex flex-col items-center relative">
      <h3 className="text-center font-semibold text-black text-3xl mb-8 md:text-4xl">
        What is
        <span className="text-blue"> Souldem </span>
      </h3>
      <p className="text-center text-black mx-2 text-lg md:w-2/3">
        Allow us to introduce ourselves! Hear from our CEO,{' '}
        <span className="font-bold">Abdul Haq M</span>, about who we are, how we
        started, and where we're headed.
        <span className="border-b-2 ">
          {' '}
           Learn more about Souldem in our Learn Center
        </span>
      </p>

      <Button className="text-white  bg-blue rounded-xl my-2 p-2 w-60 ">
        Follow us on Social Media
      </Button>
    </div>
  );
};

export default Souldem;
