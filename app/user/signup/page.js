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
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setuserName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'register/createAccountAuth',
        { email, type: 'user' }
      );
      if (response.status === 200) {
        toast.success('OTP sent successfully');
        setIsOtpSent(true);
      } else {
        toast.error('Error sending OTP');
      }
    } catch (error) {
      toast.error('An error occurred while sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'register/createUser',
        { email, password, userName, otp }
      );
      if (response.status === 200) {
        toast.success('Account successfully created');
        setTimeout(() => {
          router.push('/user/login');
        }, 3000);
      } else {
        toast.error(response.data.resp || 'Error creating account');
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('An error occurred. Please try again.');
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
            <h3 className="text-3xl font-bold">Create an account in</h3>
            <h1 className="text-blue text-4xl font-extrabold">Souldem</h1>
            <p className="text-para">
             Mint and Manage your all academics in souldem
            </p>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>Name</label>
            <Input
              type="text"
              placeholder="Your Good Name"
              className="text-dark bg-gray"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              disabled={isOtpSent}
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>Email</label>
            <Input
              type="email"
              placeholder="email"
              className="text-dark bg-gray"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
            />
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label>Password</label>
            <Input
              type="password"
              placeholder="password"
              className="text-dark bg-gray"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isOtpSent}
            />
          </div>

          {isOtpSent && (
            <div className="w-full flex flex-col gap-y-1">
              <label>OTP</label>
              <Input
                type="text"
                placeholder="Enter OTP"
                className="text-dark bg-gray"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          <p className="text-para text-xs">
            By creating an account, I agree to Souldem's Terms of Service and
            Privacy Policy.
          </p>
          {isOtpSent ? (
            <Button
              className="bg-blue text-white p-2 px-4 rounded-l w-full"
              onClick={handleCreateAccount}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          ) : (
            <Button
              className="bg-blue text-white p-2 px-4 rounded-l w-full"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                'Send OTP'
              )}
            </Button>
          )}

          <p>
            Already have an account?{' '}
            <Link href="/user/login" className="text-blue">
              Login
            </Link>
          </p>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Page;