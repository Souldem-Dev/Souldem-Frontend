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
import Cookies from 'js-cookie';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}login/loginUser`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { publickey, token } = response.data;

        localStorage.setItem('userPublicAddress', publickey);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('jwt', token);

        Cookies.set('jwt', token, { expires: 1 });

        router.push('/user/wallet');
        toast.success('Login successful');
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error(data || 'Invalid email or password');
        } else if (status === 500) {
          toast.error(
            'An internal server error occurred. Please try again later.'
          );
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } else {
        toast.error('An error occurred. Please check your network connection.');
      }
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
            <h3 className="text-3xl font-bold">
              Login to{' '}
              <span className="text-blue text-3xl font-extrabold">Souldem</span>
            </h3>
            <p className="text-para">
              Have your Educational assets seamless with souldem
            </p>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>Email</label>
            <Input
              type="text"
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

          <Button
            className="bg-blue text-white p-2 px-4 rounded-l w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Link href="/resetPass" className="text-blue">
            Forgetten Password?
          </Link>

          <Link
            href="/user/signup"
            className="bg-white text-center text-sm text-blue border-blue border-2 p-2 px-4 rounded-l w-full"
          >
            Register
          </Link>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Page;
