'use client';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import logo from '@/app/assets/logo.svg';

const JoinForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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
    <main className="flex flex-col gap-6 w-1/2 m-auto my-20 h-3/6 p-20 bg-white  drop-shadow-xl text-L_black rounded-2xl justify-center items-center">
      <Image src={logo} alt="Logo" className="" />

      <div className="flex flex-col text-blue ">
        <label htmlFor="title ">Enter Email Address</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border border-blue rounded-full h-12 px-2 w-96"
        />
      </div>
      <div className="flex flex-col text-blue ">
        <label htmlFor="title ">Enter Graders Id</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border border-blue rounded-full h-12 px-2 w-96"
        />
      </div>
      <button
        type="submit"
        className="btn bg-gradient-to-r from-blue to-D_blue focus:outline-none focus:ring w-40 text-white  py-2 px-4  mr-6  rounded-xl"
      >
        Join
      </button>
    </main>
  );
};

export default JoinForm;
