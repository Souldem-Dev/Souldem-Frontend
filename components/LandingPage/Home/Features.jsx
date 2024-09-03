import Image from 'next/image';
import React from 'react';
import Feature1 from '@/app/assets/LandingPage/Home/Features/Feature1.svg';
import Feature2 from '@/app/assets/LandingPage/Home/Features/Feature2.svg';
import Feature3 from '@/app/assets/LandingPage/Home/Features/Feature3.svg';
import Feature4 from '@/app/assets/LandingPage/Home/Features/Feature4.svg';
import Feature5 from '@/app/assets/LandingPage/Home/Features/Feature5.svg';
import logoIcon from '@/app/assets/logoIconBlue.svg';
import { Sparkle } from 'lucide-react';
import Aero from '@/app/assets/LandingPage/Aero.svg';
import Bstar from '@/app/assets/LandingPage/Bstar.svg';
const Features = () => {
  return (
    <div className="h-full pt-20 relative">
      <h3 className="text-2xl md:text-4xl text-center flex-col font-bold text-black">
        <div>
          {' '}
          Features <span className="text-blue">Souldem </span>
        </div>
        <div className="text-lg md:text-2xl"> Provides To Universities</div>
      </h3>

      <Image
        src={Bstar}
        alt="Aero"
        className="w-20 md:flex hidden inset-x-6 top-2/3  absolute  "
      />
      <Image
        src={Bstar}
        alt="Aero"
        className="w-20 md:flex hidden inset-x-6 top-1/4  absolute  "
      />

      <Image
        src={Bstar}
        alt="Aero"
        className="w-20 md:flex hidden h-full  absolute end-64 top-3/3 "
      />
      <Image
        src={Bstar}
        alt="Aero"
        className="w-20 md:flex hidden h-full  absolute end-64 top-3/3 "
      />
      <Image
        src={Bstar}
        alt="Aero"
        className="w-20 md:flex hidden h-full  absolute top-2/4 end-64  "
      />
      <Image
        src={Bstar}
        alt="Aero"
        className="w-20 md:flex hidden h-full  absolute bottom-1/2 end-72  "
      />
      <div className="flex items-center flex-col md:flex-row md:px-20 md:p-4 my-8 md:0">
        <Image
          src={Feature1}
          alt="Feature1"
          className="w-3/4  md:w-1/3 md:h-1/2 bg-white md:bg-inherit drop-shadow-sm rounded-2xl"
        />

        <div className="mx-8 md:w-2/3 lg:mx-20 mt-4 md:mt-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
            Blockchain-Based Verification
          </h3>
          <p className="font-medium text-base md:text-lg text-black mt-2">
            Stores marksheets and degrees on public blockchains like Polygon and
            Ethereum for secure and tamper-proof records.
          </p>

          <p className="my-2 text-sm md:text-base">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud.
            <br /> 2. *Increased Efficiency*: Automates administrative
            processes, reducing manual work and speeding up credential issuance.
          </p>

          <button className="text-white bg-blue rounded-xl my-2 p-2 w-40">
            Know more
          </button>
        </div>
      </div>

      <div className="flex items-center md:flex-row-reverse flex-col md:px-20 md:p-4 my-8 md:0">
        <Image
          src={Feature2}
          alt="Feature2"
          className="w-3/4  md:w-1/3 md:h-1/2 bg-white md:bg-inherit drop-shadow-sm rounded-2xl"
        />

        <div className="mx-8 md:w-2/3 lg:m-20  md:mt-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
            Digital Transcript Requests
          </h3>
          <p className="font-medium text-base md:text-lg text-black mt-2">
            Allows students to request their digital transcripts easily.
          </p>

          <p className="my-2 text-sm md:text-base">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud.
            <br /> 2. *Increased Efficiency*: Automates administrative
            processes, reducing manual work and speeding up credential issuance.
          </p>

          <button className="text-white bg-blue rounded-xl my-2 p-2 w-40">
            Know more
          </button>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row md:px-20 md:p-4 my-8">
        <Image
          src={Feature3}
          alt="Feature3"
          className="w-3/4  md:w-1/3 md:h-1/2 bg-white drop-shadow-sm rounded-2xl md:bg-inherit"
        />

        <div className="mx-8 md:w-2/3 lg:m-20 mt-4 md:mt-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
            Degree Authentication
          </h3>
          <p className="font-medium text-base md:text-lg text-black mt-2">
            Enables employers to verify degrees directly from the blockchain
            without intermediary verification.
          </p>

          <p className="my-2 text-sm md:text-base">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud.
            <br /> 2. *Increased Efficiency*: Automates administrative
            processes, reducing manual work and speeding up credential issuance.
          </p>

          <button className="text-white bg-blue rounded-xl my-2 p-2 w-40">
            Know more
          </button>
        </div>
      </div>

      <div className="flex items-center md:flex-row-reverse flex-col md:px-20 md:p-4 my-8">
        <Image
          src={Feature4}
          alt="Feature4"
          className="w-3/4  md:w-1/3 md:h-1/2 bg-white drop-shadow-sm rounded-2xl md:bg-inherit"
        />

        <div className="mx-8 md:w-2/3 lg:m-20 mt-4 md:mt-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
            Automated University Processes
          </h3>
          <p className="font-medium text-base md:text-lg text-black mt-2">
            Streamlines administrative tasks related to publishing results and
            issuing academic credentials.
          </p>

          <p className="my-2 text-sm md:text-base">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud.
            <br /> 2. *Increased Efficiency*: Automates administrative
            processes, reducing manual work and speeding up credential issuance.
          </p>

          <button className="text-white bg-blue rounded-xl my-2 p-2 w-40">
            Know more
          </button>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row md:px-20 md:p-4 my-8">
        <Image
          src={Feature5}
          alt="Feature5"
          className="w-3/4  md:w-1/3 md:h-1/2 bg-white md:bg-inherit drop-shadow-sm rounded-2xl"
        />

        <div className="mx-8 md:w-2/3  lg:m-20 mt-4 md:mt-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
            Tamper-Proof Records
          </h3>
          <p className="font-medium text-base md:text-lg text-black mt-2">
            Ensures the authenticity and immutability of academic records,
            reducing the risk of fraud.
          </p>

          <p className="my-2 text-sm md:text-base">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud.
            <br /> 2. *Increased Efficiency*: Automates administrative
            processes, reducing manual work and speeding up credential issuance.
          </p>

          <button className="text-white bg-blue rounded-xl my-2 p-2 w-40">
            Know more
          </button>
        </div>
      </div>

      <Image src={Aero} alt="Aero" className="w-96 h-full  absolute top-1/2 " />
      <Image
        src={Bstar}
        alt="Aero"
        className="w-40 md:flex hidden h-full  absolute end-1/2 "
      />

      <div className="border-blue border-2 h-32 my-8 bg-[#F3F6FF] px-4 rounded-xl w-5/6 mx-auto  items-center justify-between hidden md:flex">
        <Image src={logoIcon} alt="logo" className=" mx-auto my-8" />
        <h3 className=" text-xl md:text-2xl text-blue font-semibold">
          Ready to give Souldem a spin?{' '}
          <span className="text-black">Worlds First DEM protocol with</span>
        </h3>
        <button className="bg-blue text-white rounded-xl p-2 px-4 w-40  mx-auto my-8">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Features;
