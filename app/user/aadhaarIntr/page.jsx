'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import logo from '@/app/assets/logo.svg';
import CoinDesign from '@/app/assets/CoinDesign.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// Define Zod schema for Aadhaar number
const aadhaarSchema = z
  .string()
  .regex(/^\d{12}$/, 'Aadhaar number must be a 12-digit number');

const Page = () => {
  const router = useRouter();
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [error, setError] = useState('');

  const handleGenerateOtp = async () => {
    // Validate Aadhaar number
    try {
      aadhaarSchema.parse(aadhaarNo);
      setError('');

      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'aadhaar/sendOTP',
        {
          aadharNo: aadhaarNo,
        }
      );
      // Access reference_id from response.data.data
      if (
        response.data &&
        response.data.data &&
        response.data.data.reference_id
      ) {
        const referenceId = response.data.data.reference_id;
        toast.success('OTP sent successfully!');

        // Save reference_id in local storage
        localStorage.setItem('reference_id', referenceId);

        // Redirect to OTP verification page
        router.push('user/aadhaarIntr/otp');
      } else {
        toast.error('Invalid response from server');
        console.error('Invalid response:', response);
      }
      g;
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
        toast.error(validationError.errors[0].message);
      } else {
        toast.error('Failed to send OTP');
        console.error(validationError);
      }
    }
  };

  return (
    <div>
      <main className="flex flex-col md:flex-row h-screen lg:overflow-hidden relative">
        <div className="lg:w-7/12 md:w-6/12 flex flex-col md:bg-gray">
          <Image src={logo} alt="Logo" className="m-4 h-1/12" />
          <Image
            src={CoinDesign}
            alt="CoinDesign"
            className="grow w-auto h-auto object-cover max-md:hidden"
          />
        </div>
        <div className="lg:w-5/12 md:w-6/12 h-screen bg-white flex flex-col items-center justify-center lg:px-32 px-20 gap-y-2">
          <div>
            <h3 className="text-3xl font-bold">
              Aadhaar
              <span className="text-blue"> Verification</span>
            </h3>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>Aadhaar Verification</label>
            <Input
              type="text"
              placeholder="**** **** **** ****"
              className="text-dark bg-gray"
              value={aadhaarNo}
              onChange={(e) => setAadhaarNo(e.target.value)}
            />
            {error && <span className="text-red-500">{error}</span>}
          </div>

          <Button
            className="bg-blue text-white p-2 px-4 rounded-l w-full"
            onClick={handleGenerateOtp}
          >
            Generate OTP
          </Button>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Page;
