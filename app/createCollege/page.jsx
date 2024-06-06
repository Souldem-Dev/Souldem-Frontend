'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ethers } from 'ethers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
const page = () => {
  let createCollege = async () => {
    let collegeName = document.getElementById('collegeName');
    if (collegeName.value.length >= 3) {
      let provider = new ethers.BrowserProvider(window.ethereum);
      let signer = await provider.getSigner();

      let domain = {
        name: 'BASE_FACTORY',
        version: '1',
        chainId: 80002,
        verifyingContract: '0x4D6a18A04DA817c09e456E2e2040C9411949F6dA',
      };

      let types = {
        Create: [
          { name: 'wallet', type: 'address' },
          { name: 'universityName', type: 'string' },
        ],
      };
      let value = {
        wallet: signer.address,
        universityName: collegeName.value,
      };
      try {
        let signature = await signer.signTypedData(domain, types, value);
        console.log(signature);
        axios
          .post(
            process.env.NEXT_PUBLIC_BACKEND_URL + 'factory/createUniversity',
            {
              owner: signer.address,
              signature,
              universityName: collegeName.value,
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data._type == 'TransactionResponse') {
              toast.success('College Created!');
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.reason);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('enter college name!');
    }
  };
  return (
    <main className=" flex">
      <div className="w-4/6 h-screen bg-gray">hello</div>
      <div className="w-2/6 h-screen bg-white flex flex-col items-center justify-center px-20 gap-y-4">
        <div>
          <h3 className="text-3xl font-bold">Create a college in </h3>
          <h1 className="text-blue text-4xl font-extrabold ">Souldem</h1>
          <p className="text-gray-300">
            have your college on Souldem network for Easier management of
            examination{' '}
          </p>
        </div>
        <Input
          type="email"
          placeholder="Enter College Name"
          className="text-dark"
          id="collegeName"
        />
        <Button
          className="bg-blue text-white p-2 px-4 rounded-l w-full"
          onClick={createCollege}
        >
          Create College{' '}
        </Button>
        <p className="text-gray">------if already created------</p>
        <Button className="bg-blue text-white p-2 px-4 rounded-l w-full">
          Connect Wallet{' '}
        </Button>
      </div>
      <ToastContainer />
    </main>
  );
};

export default page;
