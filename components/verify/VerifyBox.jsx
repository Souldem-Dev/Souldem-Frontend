import Image from 'next/image';
import React from 'react';
import verifySvg from '@/app/assets/verify.svg';

const VerifyBox = () => {
  return (
    <div className="flex  ">
      <Image src={verifySvg} alt="" className="w-1/2 h-1/2" />
      <div className="bg-white p-20 drop-shadow-md flex ">
        <label>Governance Address</label>
        <input type="text" placeholder="Enter your Governance Address" />

        <label>College Name</label>
        <input type="text" placeholder="Enter the College Name" />
        <label>Aadhaar No</label>
        <input type="text" placeholder="Enter the Aadhaar No" />

        <button className="bg-blue text-white rounded-xl p-2 w-60 my-4">
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyBox;
