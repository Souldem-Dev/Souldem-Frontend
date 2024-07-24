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
  const [universityName, setUniversityName] = useState('');

  const handleCreateAccount = async () => {
    const domain = {
      name: 'BASE_FACTORY',
      version: '1',
      chainId: 1337,
      verifyingContract: process.env.NEXT_PUBLIC_BASE_FACTORY_ADDRESS,
    };

    const types = {
      Create: [
        { name: 'wallet', type: 'address' },
        { name: 'universityName', type: 'string' },
      ],
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          'register/createUniversityAccount',
        {
          email,
          password,
          universityName,
          domain,
          types,
        }
      );
      console.log(response);

      if (response.status !== 200) {
        toast.error('Error creating account');
        router.push('/university/login');
        return;
      }

      toast.success('Account successfully created');
      setTimeout(() => {
        router.push('/university/login');
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
            <h3 className="text-3xl font-bold">Create a college in</h3>
            <h1 className="text-blue text-4xl font-extrabold">Souldem</h1>
            <p className="text-para">
              Have your college on Souldem network for easier management of
              examinations
            </p>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>University Name</label>
            <Input
              type="text"
              placeholder="Name of the University"
              className="text-dark bg-gray"
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
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
            Create College
          </Button>

          <p>
            Already have an account?{' '}
            <Link href="/university/login" className="text-blue">
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
