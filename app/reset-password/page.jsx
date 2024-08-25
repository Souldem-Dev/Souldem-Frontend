'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import logo from '@/app/assets/logo.svg';
import CoinDesign from '@/app/assets/CoinDesign.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const router = useRouter();
  const { id, type } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}login/resetPassword`,
        { id, type, newPassword }
      );

      if (response.status === 200) {
        toast.success('Password reset successfully');
        setTimeout(() => {
          router.push('/user/login');
        }, 3000);
      } else {
        toast.error('Failed to reset password');
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
            <h3 className="text-3xl font-bold">Set New Password</h3>
            <h1 className="text-blue text-4xl font-extrabold">Souldem</h1>
            <p className="text-para">Enter your new password below</p>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <label>New Password</label>
            <Input
              type="password"
              placeholder="New password"
              className="text-dark bg-gray"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <Button
            className="bg-blue text-white p-2 px-4 rounded-l w-full"
            onClick={handleResetPassword}
            disabled={loading}
          >
            Reset Password
          </Button>

          <p>
            Remembered your password?{' '}
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

export default ResetPassword;
