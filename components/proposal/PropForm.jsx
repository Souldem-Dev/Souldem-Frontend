'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import close from '@/app/assets/Governance/close.svg';

const PropForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    Title: '',
    Summary: '',
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
    <main>
      <form
        className="flex flex-col gap-y-4 w-5/6 md:w-3/6  mt-20 m-auto  h-max 	 p-6  bg-white  backdrop-blur-xl  z-50 drop-shadow-xl text-L_black rounded-2xl fixed inset-0"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center my-4">
          <h1 className="text-2xl font-semibold text-center">
            Create Governance
          </h1>
          <button
            className="p-2 bg-white text-gray-800 absolute  top-6 right-6 rounded-lg mt-4"
            onClick={onClose}
          >
            <Image src={close} alt="close" />
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="Title">Proposal Title:</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            className="bg-gray rounded-xl h-12 px-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Summary">Proposal Summary:</label>
          <input
            type="text"
            id="Summary"
            name="Summary"
            value={formData.Summary}
            onChange={handleChange}
            className="bg-gray rounded-xl h-20 px-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description"> Proposal Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className=" rounded-2xl h-40 px-2  bg-gray"
          />
        </div>
        <div className="flex flex-row ">
          <button
            type="submit"
            className="btn bg-gradient-to-r from-blue to-cyan focus:outline-none focus:ring  w-1/2 text-white  py-2 px-4 mr-2  rounded-xl"
          >
            Confirm
          </button>
          <button
            type="submit"
            className="btn bg-white hover:bg-blue hover:text-white focus:outline-none focus:ring w-1/2 text-blue border-blue border py-2 px-4  mr-6  rounded-xl"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default PropForm;
