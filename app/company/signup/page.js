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
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      // Request to generate and send OTP
      await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'register/createAccountAuth',
        { email, type: 'register' }
      );
      toast.success('OTP sent to your email');
      setIsOtpSent(true); // Update state to show OTP input
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndCreateAccount = async () => {
    setLoading(true);
    try {
      // Verify the OTP and create the account
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'register/createCompaniesAccount',
        { email, password, companyName, otp }
      );

      if (response.status === 200) {
        toast.success('Account successfully created');
        setTimeout(() => {
          router.push('/user/login');
        }, 3000);
      } else {
        toast.error(response.data.resp);
      }
    } catch (error) {
      toast.error(
        'An error occurred during OTP verification. Please try again.'
      );
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
            <h3 className="text-3xl font-bold">Create a user account</h3>
            <h1 className="text-blue text-4xl font-extrabold">Souldem</h1>
            <p className="text-para">
              Have your Educational assets seamless with souldem
            </p>
          </div>

          {!isOtpSent ? (
            <>
              <div className="w-full flex flex-col gap-y-1">
                <label>Comapny Name</label>
                <Input
                  type="text"
                  placeholder="Company Name"
                  className="text-dark bg-gray"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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
                />
              </div>

              <p className="text-para text-xs">
                By creating an account, I agree to Souldem's Terms of Service
                and Privacy Policy.
              </p>
              <Button
                className="bg-blue text-white p-2 px-4 rounded-l w-full"
                onClick={handleSendOtp}
                disabled={loading}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="w-full flex flex-col gap-y-1">
                <label>Enter OTP</label>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  className="text-dark bg-gray"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <Button
                className="bg-blue text-white p-2 px-4 rounded-l w-full"
                onClick={handleVerifyOtpAndCreateAccount}
                disabled={loading}
              >
                Verify OTP & Create Account
              </Button>
            </>
          )}

          <p>
            Already have an account?{' '}
            <Link href="/company/login" className="text-blue">
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
