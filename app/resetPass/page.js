'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import logo from '@/app/assets/logo.svg';
import CoinDesign from '@/app/assets/CoinDesign.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [type, setType] = useState(''); // 'user', 'university', or 'company'
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}login/resetPasswordOtpAuth`,
        { email, type, resetLink: 'http://localhost:3000/reset-password/' } // Update with your actual reset link
      );

      console.log(response);

      if (response.status === 200) {
        toast.success('Reset link sent successfully');
        setTimeout(() => {
          router.push('/reset-password');
        }, 3000);
      } else {
        toast.error('Failed to send reset link');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
            <h3 className="text-3xl font-bold">Reset Password Request</h3>
            <h1 className="text-blue text-4xl font-extrabold">Souldem</h1>
            <p className="text-para">
              Enter your email to request a reset link
            </p>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Your email"
              className="text-dark bg-gray"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>Account Type</label>
            <select
              className="border bg-gray rounded w-full py-2 px-3"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="user">User</option>
              <option value="university">University</option>
              <option value="company">Company</option>
            </select>
          </div>

          <Button
            className="bg-blue text-white p-2 px-4 rounded-l w-full"
            onClick={handleRequestReset}
            disabled={loading}
          >
            Send Reset Link
          </Button>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Page;
