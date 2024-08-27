import Image from 'next/image';
import React from 'react';
import Feature1 from '@/app/assets/LandingPage/Features/feature1.svg';
import Feature2 from '@/app/assets/LandingPage/Features/feature2.svg';
import Feature3 from '@/app/assets/LandingPage/Features/feature3.svg';
import Feature4 from '@/app/assets/LandingPage/Features/feature4.svg';
import MainImage from '@/app/assets/LandingPage/Features/MainImage.svg';

const Features = () => {
  return (
    <div className="h-full pt-20 ">
      <h3 className="text-4xl text-center flex-row  font-bold text-black ">
        <div>
          {' '}
          Features <span className="text-blue">Souldem </span>
        </div>
      </h3>

      <Image
        src={MainImage}
        alt="MainImage"
        className=" p-20 hidden md:flex "
      />
      <div className="flex items-center flex-col md:flex-row md:px-20 md:p-4">
        <Image
          src={Feature1}
          alt="Feature1"
          className="w-11/12 h-full md:w-1/3 md:h-1/2 bg-white md:bg-inherit drop-shadow-sm rounded-2xl"
        />

        <div className="w-2/3 md:m-20  ">
          <h3 className="text-black text-3xl font-semibold">
            Automated University Processes
          </h3>
          <p className="font-medium text-black">
            Stores marksheets and degrees on public blockchains like Polygon and
            Ethereum for secure and tamper-proof records.
          </p>

          <p className="my-2">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud. 2. *Increased
            Efficiency*: Automates administrative processes, reducing manual
            work and speeding up credential issuance a
          </p>

          <button className="text-white bg-blue rounded-xl my-2 p-2 w-40 ">
            Know more
          </button>
        </div>
      </div>
      <div className="flex items-center  md:flex-row-reverse flex-col  md:px-20 md:p-4">
        <Image
          src={Feature2}
          alt="Feature1"
          className=" w-11/12 h-full md:w-1/3 md:h-1/2 bg-white md:bg-inherit drop-shadow-sm rounded-2xl"
        />

        <div className="w-2/3 md:m-20   ">
          <h3 className="text-black text-3xl font-semibold">
            Digital Transcript Requests{' '}
          </h3>
          <p className="font-medium text-black ">
            Allows students to request their digital transcripts easily.
          </p>

          <p className="my-2">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud. 2. *Increased
            Efficiency*: Automates administrative processes, reducing manual
            work and speeding up credential issuance a
          </p>

          <button className="text-white rounded-xl my-2 p-2 w-40 bg-blue ">
            Know more
          </button>
        </div>
      </div>
      <div className="flex items-center flex-col md:flex-row md:px-20 md:p-4">
        <Image
          src={Feature3}
          alt="Feature1"
          className="w-11/12 h-full md:w-1/3 md:h-1/2 bg-white drop-shadow-sm rounded-2xl md:bg-inherit"
        />

        <div className="w-2/3 md:m-20  ">
          <h3 className="text-black text-3xl font-semibold">
            Degree Authentication
          </h3>
          <p className="font-medium text-black">
            Enables employers to verify degrees directly from the blockchain
            without intermediary verification
          </p>

          <p className="my-2">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud. 2. *Increased
            Efficiency*: Automates administrative processes, reducing manual
            work and speeding up credential issuance a
          </p>

          <button className="text-white bg-blue rounded-xl my-2 p-2 w-40 ">
            Know more
          </button>
        </div>
      </div>
      <div className="flex items-center  md:flex-row-reverse flex-col  md:px-20 md:p-4">
        <Image
          src={Feature4}
          alt="Feature1"
          className="w-11/12 h-full md:w-1/3 md:h-1/2 bg-white drop-shadow-sm rounded-2xl md:bg-inherit"
        />

        <div className="w-2/3 md:m-20   ">
          <h3 className="text-black text-3xl font-semibold">
            Secure Storage on Public Blockchains
          </h3>
          <p className="font-medium text-black ">
            Streamlines administrative tasks related to publishing results and
            issuing academic credentials
          </p>

          <p className="my-2">
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud. 2. *Increased
            Efficiency*: Automates administrative processes, reducing manual
            work and speeding up credential issuance a
          </p>

          <button className="text-white rounded-xl my-2 p-2 w-40 bg-blue ">
            Know more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
