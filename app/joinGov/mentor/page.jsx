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

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    //   try {
    //     const response = await axios.post(
    //       process.env.NEXT_PUBLIC_BACKEND_URL +
    //         {
    //           email,
    //           password,
    //         }
    //     );
    //     if (response.status === 200) {
    //       // Assuming the backend sends the public address, email, and JWT token in the response
    //       const { publickey, token } = response.data;
    //       console.log(publickey, email, token);
    //       toast.success('Login successful');
    //       router.push('/university/governance'); // Adjust this route as needed
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       const { status, data } = error.response;
    //       if (status === 400) {
    //         toast.error(data || 'Invalid email or password');
    //       } else if (status === 500) {
    //         toast.error(
    //           'An internal server error occurred. Please try again later.'
    //         );
    //       } else {
    //         toast.error('An error occurred. Please try again.');
    //       }
    //     } else {
    //       toast.error('An error occurred. Please check your network connection.');
    //     }
    //   }
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
              Welcome to
              <span className="text-blue text-3xl font-extrabold">
                {' '}
                Souldem
              </span>
            </h3>
            <h3 className="text-2xl font-bold text-black ">Join Governance</h3>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>Secret Key 1</label>
            <Input
              type="text"
              placeholder="Secret Key 1"
              className="text-dark bg-gray"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label>Secret Key 2</label>
            <Input
              type="text"
              placeholder="Secret Key 1"
              className="text-dark bg-gray"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="bg-blue text-white p-2 px-4 rounded-l w-full"
            onClick={handleLogin}
          >
            Join
          </Button>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Page;
