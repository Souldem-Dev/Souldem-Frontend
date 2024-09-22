'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import verifySvg from '@/app/assets/verify.svg';

const collegeList = ['BVP', 'PICT', 'VIT', 'MIT'];
const batchList = ['2021', '2022', '2023', '2024'];

const VerifyBox = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };
  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  return (
    <main>
      <h1 className="text-4xl font-semibold text-black">Verify your Data</h1>
      <div className="flex  ">
        <Image
          src={verifySvg}
          alt="Verification Icon"
          className="w-1/2 h-1/4 p-12"
        />

        <div className="w-1/2 flex flex-col gap-y-12 py-12">
          <div>
            <label
              className="text-xl text-black font-semibold"
              htmlFor="college"
            >
              Choose your College Name
            </label>
            <select
              className="w-full p-2 mt-2 bg-white border-2 focus:outline-none rounded-xl"
              name="college"
              id="college"
              value={selectedCollege}
              onChange={handleCollegeChange}
            >
              <option value="" disabled>
                Select your college
              </option>
              {collegeList.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-xl text-black font-semibold"
              htmlFor="college"
            >
              Choose your batch
            </label>
            <select
              className="w-full p-2 mt-2 bg-white border-2 focus:outline-none rounded-xl"
              name="college"
              id="college"
              value={selectedBatch}
              onChange={handleBatchChange}
            >
              <option value="" disabled>
                Select your college
              </option>
              {batchList.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-xl text-black font-semibold"
              htmlFor="college"
            >
              Enter your Aadhaar Number
            </label>
            <input
              className="w-full p-2 mt-2 bg-white border-2 focus:outline-none rounded-xl"
              type="text"
              placeholder="Enter your Aadhaar Number"
            />
          </div>

          <button className="w-full p-2 mt-2 bg-blue text-white rounded-xl">
            Verify
          </button>
        </div>
      </div>
    </main>
  );
};

export default VerifyBox;
