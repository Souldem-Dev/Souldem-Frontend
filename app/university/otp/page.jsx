import React from 'react';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg';
import CoinDesign from '@/app/assets/CoinDesign.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
  return (
    <div>
      {' '}
      <main className="flex flex-col md:flex-row h-screen lg:overflow-hidden relative">
        <div className="lg:w-7/12 md:w-6/12 flex flex-col md:bg-gray">
          <Image src={logo} alt="Logo" className="m-4 h-1/12" />
          <Image
            src={CoinDesign}
            alt="CoinDesign"
            className="grow w-auto h-auto object-cover max-md:hidden"
          />
        </div>
        <div className="lg:w-5/12 md:w-6/12 h-screen bg-white flex flex-col items-center justify-center lg:px-32 px:20  gap-y-2">
          <div>
            <h3 className="text-3xl font-bold">Verify Email</h3>

            <p className="text-para">
              A six digit code has been sent to your Email abc@gmail.com, Please
              enter it within 30 minutes
            </p>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <Input
              type="text"
              placeholder="6 digits code "
              className="text-dark bg-gray"
              id="Email"
            />
          </div>

          <Button className="bg-blue text-white p-2 px-4 rounded-l w-full">
            Verify
          </Button>

          <Button className="bg-white  text-blue  p-2 px-4 rounded-l w-full">
            Didn't recieve the code
          </Button>
        </div>
      </main>{' '}
    </div>
  );
};

export default page;
