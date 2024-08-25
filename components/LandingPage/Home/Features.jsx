import Image from 'next/image';
import React from 'react';
import Feature1 from '@/app/assets/LandingPage/Home/Features/Feature1.svg';

const Features = () => {
  return (
    <div className="h-full">
      <h3 className="text-4xl text-center flex-row  font-bold text-black ">
        <div>
          {' '}
          Features <span className="text-blue">Souldem </span>
        </div>
        <div> Provides To Universities</div>
      </h3>

      <div className="flex items-center px-20">
        <Image src={Feature1} alt="Feature1" className="w-1/3 h-1/2" />

        <div className="w-2/3 m-20  ">
          <h3 className="text-black text-3xl font-semibold">
            Blockchain-Based Verification
          </h3>
          <p className="font-medium text-black">
            Stores marksheets and degrees on public blockchains like Polygon and
            Ethereum for secure and tamper-proof records.
          </p>

          <p>
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud. 2. *Increased
            Efficiency*: Automates administrative processes, reducing manual
            work and speeding up credential issuance a
          </p>

          <button className="text-white bg-blue ">Know more</button>
        </div>
      </div>
      <div className="flex items-center px-20">
        <Image src={Feature1} alt="Feature1" className="w-1/3 h-1/2" />

        <div className="w-2/3 m-20  ">
          <h3 className="text-black text-3xl font-semibold">
            Blockchain-Based Verification
          </h3>
          <p className="font-medium text-black">
            Stores marksheets and degrees on public blockchains like Polygon and
            Ethereum for secure and tamper-proof records.
          </p>

          <p>
            *Enhanced Security*: Academic records are stored on immutable
            blockchains, reducing the risk of tampering or fraud. 2. *Increased
            Efficiency*: Automates administrative processes, reducing manual
            work and speeding up credential issuance a
          </p>

          <button className="text-white bg-blue ">Know more</button>
        </div>
      </div>
    </div>
  );
};

export default Features;
