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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

// Define Zod schema for Aadhaar number
const aadhaarSchema = z
  .string()
  .regex(/^\d{12}$/, 'Aadhaar number must be a 12-digit number');

const Page = () => {
  const router = useRouter();
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [otpRequested, setOtpRequested] = useState(false); // New state
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleGenerateOtp = async () => {
    try {
      // Validate Aadhaar number
      aadhaarSchema.parse(aadhaarNo);
      setError('');

      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'aadhaar/sendOTP',
        {
          aadhaarNo: aadhaarNo,
        }
      );

      const referenceId = res.data.data.reference_id;
      console.log('Your reference id:', referenceId);
      toast.success('OTP sent successfully!');

      // Save reference_id in local storage
      localStorage.setItem('reference_id', referenceId);
      localStorage.setItem('aadhaar_num', aadhaarNo);

      // Set OTP request status
      setOtpRequested(true);
    } catch (err) {
      console.log(err);
      setError(err.errors ? err.errors[0].message : 'Failed to send OTP!');
      toast.error('Failed to send OTP!');
    }
  };

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    const referenceId = localStorage.getItem('reference_id');

    if (!referenceId) {
      toast.error('Reference ID not found. Please request a new OTP.');
      return;
    }

    try {
      const aadhaar_number = localStorage.getItem('aadhaar_num');
      const userEmail = localStorage.getItem('userEmail');

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}aadhaar/verifyOTP`,
        {
          otp,
          reference_id: referenceId,
          userEmail,
          aadhaar_number,
        }
      );

      console.log(res);
      toast.success('OTP verified successfully!');
      router.push('/user/wallet');
    } catch (err) {
      toast.error('Failed to verify OTP');
      console.log(err);
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
          {!otpRequested ? (
            <>
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
            </>
          ) : (
            <>
              <div className="flex flex-col gap-y-2 items-center">
                <h5>Enter the OTP sent to your registered mobile number</h5>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onChange={handleOtpChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <button
                  className="bg-blue px-8 py-2 rounded-xl text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Page;
