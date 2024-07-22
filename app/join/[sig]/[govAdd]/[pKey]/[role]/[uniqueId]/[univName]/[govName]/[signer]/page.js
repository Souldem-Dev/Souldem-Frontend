'use client';
import React from 'react';
import Image from 'next/image';
import forest from '@/app/assets/forest.svg';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [formData, setFormData] = useState({
    secret1: '',
    secret2: '',
  });

  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url;
    if (params.role === 'hod')
      url = process.env.NEXT_PUBLIC_BACKEND_URL + 'become/becomeHod';
    if (params.role === 'mentor')
      url = process.env.NEXT_PUBLIC_BACKEND_URL + 'become/becomeMentor';
    if (params.role === 'student')
      url = process.env.NEXT_PUBLIC_BACKEND_URL + 'become/becomeStudent';
    if (params.role === 'grader')
      url = process.env.NEXT_PUBLIC_BACKEND_URL + 'become/becomeGrader';

    axios
      .post(url, {
        contractAdd: params.govAdd,
        memAdd: params.pKey,
        secretKey_1: formData.secret1,
        secretKey_2: formData.secret2,
        role: params.role,
        uniqueId: params.uniqueId,
        signature: params.sig,
        gName: params.govName,
        cName: params.univName,
        signerAdd: params.signer,
      })
      .then((res) => {
        toast.success('Successfully joined governance!');
        console.log(res);
        router.push('/user/login');
      })
      .catch((err) => {
        toast.error('Failed to join governance. Please try again.');
        console.log(err);
      });
    console.log(url);
  };

  return (
    <div className="flex items-center justify-center m-auto p-32">
      <Image
        src={forest}
        alt="banner"
        className="h-4/6 w-full absolute z-0 opacity-25 object-cover"
      />
      <form
        autoComplete="off"
        className="flex w-full flex-col items-center bg-white h-80 gap-y-4 p-4 px-32 relative border-b-8 border-indigo-500 rounded-xl"
      >
        <h1 className="text-2xl text-center">
          Sign In to Your Mentor Account!
        </h1>
        <div className="flex flex-col w-11/12">
          <label htmlFor="secret1">Enter Secret Phrase 1</label>
          <input
            type="password"
            id="secret1"
            name="secret1"
            value={formData.secret1}
            onChange={handleChange}
            placeholder="***************"
            className="rounded-xl h-12 px-2 bg-gray"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col w-11/12">
          <label htmlFor="secret2">Enter Secret Phrase 2</label>
          <input
            type="password"
            id="secret2"
            name="secret2"
            value={formData.secret2}
            onChange={handleChange}
            placeholder="***************"
            className="rounded-xl h-12 px-2 bg-gray"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="btn bg-blue focus:outline-none focus:ring w-60 text-white py-2 px-4 mr-6 rounded-xl"
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          Join Governance
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Page;
