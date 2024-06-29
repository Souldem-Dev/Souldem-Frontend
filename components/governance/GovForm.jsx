'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CircleX } from 'lucide-react';

const GovForm = ({ onClose, publickey }) => {
  const [formData, setFormData] = useState({
    governanceName: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const publickey = localStorage.getItem('publicAddress');
      console.log(publickey);

      if (!publickey) {
        console.error('Public key is missing');
        toast.error('Public key is missing');
        return;
      }

      let getData;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}factory/getData/${publickey}`
        );

        if (response.status !== 200) {
          toast.error('Error fetching data');
          return;
        }

        getData = response.data;
        console.log('Data retrieved:', getData);
      } catch (error) {
        console.error(
          'Error fetching data:',
          error.response ? error.response.data : error
        );
        toast.error(
          error.response?.data?.reason ||
            'An error occurred while fetching data'
        );
        return;
      }

      const { nonce, name, collegeAddress, relayer } = getData;
      const currentNonce = parseInt(nonce, 10);

      const domain = {
        name: name,
        version: '1',
        chainId: 80002,
        verifyingContract: collegeAddress,
      };

      const types = {
        CreateGovernance: [
          { name: 'wallet', type: 'address' },
          { name: 'governanceName', type: 'string' },
          { name: 'totalEndExamination', type: 'uint256' },
          { name: 'batch', type: 'string' },
          { name: 'nonces', type: 'uint256' },
          { name: 'relayer', type: 'address' },
        ],
      };

      const value = {
        wallet: publickey,
        governanceName: formData.governanceName,
        totalEndExamination: formData.semester,
        batch: formData.batch,
        nonces: currentNonce,
        relayer: relayer,
      };

      const email = localStorage.getItem('email');

      const signResponse = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'signature/signWithUniv',
        {
          email,
          domain,
          types,
          value,
        }
      );
      console.log(signResponse);

      if (signResponse.status !== 200) {
        toast.error('Error signing data');
        return;
      }

      const signature = signResponse.data.signature;
      console.log(signature);

      // Log the data to be sent to the backend
      console.log({
        owner: publickey,
        signature,
        governanceName: formData.governanceName,
        batch: formData.batch,
        semester: formData.semester,
        nonce: currentNonce,
      });

      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'factory/createGovernance',
        {
          owner: publickey,
          signature,
          governanceName: formData.governanceName,
          batch: formData.batch,
          totalEndExamination: formData.semester,
          nonce: currentNonce,
        }
      );

      console.log(response.data);
      if (response.data._type === 'TransactionResponse') {
        toast.success('Governance Created!');
        onClose();
      }
    } catch (error) {
      console.error('Error creating governance:', error);
      toast.error(error.response?.data?.reason || 'An error occurred');
    }
  };

  return (
    <main>
      <form
        className="flex flex-col gap-y-4 w-5/6 md:w-2/6  mt-40 m-auto  h-max 	 p-6  bg-white  backdrop-blur-xl  z-50 drop-shadow-xl text-L_black rounded-2xl fixed inset-0"
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
            id="governanceName"
            name="governanceName"
            value={formData.governanceName}
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
          className="bg-blue  hover:bg-blue hover:text-white hover:cursor-pointer focus:outline-none focus:ring  w-28 text-white  py-2 px-4  mr-6  rounded-xl"
          onSubmit={onClose}
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default GovForm;
