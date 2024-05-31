'use client';
import React, { useState } from 'react';

import { CircleX } from 'lucide-react';

const GovForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    batch: '',
    semester: '',
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
        className="flex absolute z-10 flex-col gap-y-4 w-4/6 sm:w-5/6 md:w-2/6 m-auto h-full sm:h-2/4 p-8 bg-white  drop-shadow-xl text-L_black rounded-2xl  inset-0  backdrop-blur-xl  "
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
            <CircleX />
          </button>
        </div>

        <div className="flex flex-col  ">
          <label htmlFor="title">Governance Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className=" rounded-xl h-12 px-2 bg-gray"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 gap-x-2">
          <div className="flex flex-col  md:w-1/2 ">
            <label htmlFor="batch">Governance Batch:</label>
            <input
              type="text"
              id="batch"
              name="batch"
              placeholder="e.g. 2024"
              value={formData.batch}
              onChange={handleChange}
              className="rounded-xl h-12 px-2 bg-gray "
            />
          </div>
          <div className=" flex flex-col md:w-1/2 ">
            <label htmlFor="semester">Total Semesters:</label>
            <input
              type="text"
              id="semester"
              name="semester"
              placeholder='e.g. "8"'
              value={formData.semester}
              onChange={handleChange}
              className="rounded-xl h-12 px-2 bg-gray "
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-gradient-to-r from-blue to-D_blue focus:outline-none focus:ring  w-28 text-white  py-2 px-4  mr-6  rounded-xl"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default GovForm;
