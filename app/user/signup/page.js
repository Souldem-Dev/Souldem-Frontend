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
  const [userName, setUserName] = useState('');

  const handleCreateAccount = async () => {

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          'register/createUser',
        {
          email,
          password,
          userName,
        }
      );
      console.log(response);

      if (response.status !== 200) {
        toast.error('Error creating account');
        router.push('/user/login');
        return;
      }

      toast.success('Account successfully created');
      setTimeout(() => {
        router.push('/user/login');
      }, 3000);
    } catch (error) {
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
            <h3 className="text-3xl font-bold">Create a user account</h3>
            <h1 className="text-blue text-4xl font-extrabold">Souldem</h1>
            <p className="text-para">
              Have your Educational assets seamless with souldem
            </p>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>Your Name</label>
            <Input
              type="text"
              placeholder="Your Good Name"
              className="text-dark bg-gray"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
            By creating an account, I agree to Souldem's Terms of Service and
            Privacy Policy.
          </p>
          <Button
            className="bg-blue text-white p-2 px-4 rounded-l w-full"
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>

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
