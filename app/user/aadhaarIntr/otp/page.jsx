'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import logo from '@/app/assets/logo.svg';
import CoinDesign from '@/app/assets/CoinDesign.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const Page = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    const referenceId = localStorage.getItem('reference_id');

    if (!referenceId) {
      toast.error('Reference ID not found. Please request a new OTP.');
      return;
    }

    let aadhaar_number = localStorage.getItem('aadhaar_num')
      let userEmail = localStorage.getItem('userEmail')

       axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}aadhaar/verifyOTP`,
        {
          otp: otp,
          reference_id: referenceId,
          userEmail,
          aadhaar_number
        }
      ).then(res=>{
        console.log(res)
        toast.success('OTP verified successfully!');
        router.push('/student');

      }).catch(err=>{
        toast.error('failed to verify')
        console.log(err)
      })

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
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Page;
