'use client';
import React from 'react';
import Image from 'next/image';
import forest from '@/app/assets/forest.svg';
import { useState } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({
    secret1: '',
    secret2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, for example, send data to backend or perform some action with formData
    console.log(formData);
  };
  return (
    <div className="flex items-center justify-center  m-auto p-32">
      <Image
        src={forest}
        alt="banner"
        className="h-4/6 w-full absolute z-0 opacity-25 object-cover"
      />
      <form className="flex w-full flex-col items-center bg-white  h-80 gap-y-4 p-4  px-32 relative  border-b-8 border-indigo-500 rounded-xl">
        {' '}
        <h1 className="text-2xl text-center">
          Sign In to Your Mentor Account!{' '}
        </h1>
        <div className="flex flex-col w-11/12  ">
          <label htmlFor="title">Enter Secret Phrase 1</label>
          <input
            type="password"
            id="secret1"
            name="secret1"
            value={formData.secret1}
            onChange={handleChange}
            placeholder="***************"
            className=" rounded-xl h-12 px-2 bg-gray"
          />
        </div>
        <div className="flex flex-col w-11/12  ">
          <label htmlFor="title">Enter Secret Phrase 2</label>
          <input
            type="password"
            id="secret2"
            name="secret2"
            value={formData.secret2}
            onChange={handleChange}
            placeholder="***************"
            className=" rounded-xl h-12 px-2 bg-gray"
          />
        </div>
        <button
          type="submit"
          className="btn bg-gradient-to-r from-blue to-D_blue focus:outline-none focus:ring  w-60 text-white  py-2 px-4  mr-6  rounded-xl"
          onSubmit={handleSubmit}
        >
          Connect Wallet
        </button>
      </form>
    </div>
  );
};

export default Page;
