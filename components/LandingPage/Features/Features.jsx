import Image from 'next/image';
import React from 'react';
import Feature1 from '@/app/assets/LandingPage/Features/feature1.svg';
import Feature2 from '@/app/assets/LandingPage/Features/feature2.svg';
import Feature3 from '@/app/assets/LandingPage/Features/feature3.svg';
import Feature4 from '@/app/assets/LandingPage/Features/feature4.svg';
import MainImage from '@/app/assets/LandingPage/Features/MainImage.svg';
import Bstar from '@/app/assets/LandingPage/Bstar.svg';

const Features = () => {
  return (
    <div className="h-full pt-20 relative">
      <h3 className="text-2xl md:text-4xl text-center font-bold text-black">
        <div>
          Features <span className="text-blue">Souldem</span>
        </div>
        <div className="text-lg md:text-2xl">Provides To Universities</div>
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
      {/* <Image
        src={Bstar}
        alt="Aero"
        className="w-20 md:flex hidden h-full  absolute top-2/4 end-64  "
      /> */}
      <Image
        src={Bstar}
        alt="Aero"
        className="w-20 md:flex hidden h-full  absolute  inset-x-3/4 bottom-24 end-96  "
      />
      <Image
        src={MainImage}
        alt="MainImage"
        className="p-10 md:p-20 hidden md:flex mx-auto"
      />

      <div className="flex items-center flex-col md:flex-row md:px-20 md:p-4 my-8 relative">
        <Image
          src={Feature1}
          alt="Feature1"
          className="w-3/4 md:w-1/3 md:h-1/2 bg-white md:bg-inherit drop-shadow-sm rounded-2xl"
        />

        <div className="mx-8 md:w-2/3 lg:m-20 mt-4 md:mt-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
            Automated University Processes
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

      <div className="flex items-center md:flex-row-reverse flex-col md:px-20 md:p-4 my-8">
        <Image
          src={Feature2}
          alt="Feature2"
          className="w-3/4 md:w-1/3 md:h-1/2 bg-white md:bg-inherit drop-shadow-sm rounded-2xl"
        />

        <div className="mx-8 md:w-2/3 lg:m-20 mt-4 md:mt-0">
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
          className="w-3/4 md:w-1/3 md:h-1/2 bg-white drop-shadow-sm rounded-2xl md:bg-inherit"
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
          className="w-3/4 md:w-1/3 md:h-1/2 bg-white drop-shadow-sm rounded-2xl md:bg-inherit"
        />

        <div className="mx-8 md:w-2/3 lg:m-20 mt-4 md:mt-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
            Secure Storage on Public Blockchains
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
    </div>
  );
};

export default Features;
