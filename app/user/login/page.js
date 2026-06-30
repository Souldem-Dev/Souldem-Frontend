'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { GraduationCap, Loader2, Eye, EyeOff } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPw,   setShowPw]   = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { toast.error('Enter email and password'); return; }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}login/loginUser`,
        { email, password }
      );

      if (response.status === 200) {
        const { publickey, token } = response.data;

        localStorage.setItem('userPublicAddress', publickey);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('jwt', token);

        Cookies.set('jwt', token, { expires: 1 });

        toast.success('Login successful');

        const base = process.env.NEXT_PUBLIC_BACKEND_URL;
        const [hodRes, mentorRes, graderRes, studentRes] = await Promise.allSettled([
          axios.get(`${base}become/joinedGov/hod/${publickey}`),
          axios.get(`${base}become/joinedGov/mentor/${publickey}`),
          axios.get(`${base}become/joinedGov/grader/${publickey}`),
          axios.get(`${base}become/joinedGov/student/${publickey}`),
        ]);

        const hasHod     = hodRes.status     === 'fulfilled' && hodRes.value.data?.length     > 0;
        const hasMentor  = mentorRes.status  === 'fulfilled' && mentorRes.value.data?.length  > 0;
        const hasGrader  = graderRes.status  === 'fulfilled' && graderRes.value.data?.length  > 0;
        const hasStudent = studentRes.status === 'fulfilled' && studentRes.value.data?.length > 0;

        const allRoles = [];
        if (hasHod)     allRoles.push('hod');
        if (hasMentor)  allRoles.push('mentor');
        if (hasGrader)  allRoles.push('grader');
        if (hasStudent) allRoles.push('student');

        localStorage.setItem('allRoles', JSON.stringify(allRoles));

        let primaryRole = 'student';
        if (hasHod)         primaryRole = 'hod';
        else if (hasMentor) primaryRole = 'mentor';
        else if (hasGrader) primaryRole = 'grader';

        Cookies.set('activeRole', primaryRole, { expires: 1 });

        if (hasHod)         router.push('/user/hod');
        else if (hasMentor) router.push('/user/mentor');
        else if (hasGrader) router.push('/user/grader');
        else                router.push('/user/wallet');
      }
    } catch (error) {
      const msg = error.response?.data;
      toast.error(typeof msg === 'string' ? msg : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleLogin(); };

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f7ff' }}>

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col w-[45%] shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#1e2a6e 0%,#0a0e1a 100%)' }}>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full"
            style={{ background: 'rgba(62,104,252,0.15)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full"
            style={{ background: 'rgba(91,81,245,0.15)', filter: 'blur(60px)' }} />
        </div>

        <div className="relative p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Souldem" style={{ height: 28, width: 'auto' }} />
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center px-12 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
            style={{ background: 'rgba(62,104,252,0.25)', border: '1px solid rgba(62,104,252,0.3)' }}>
            <GraduationCap size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-3">User<br />Portal</h2>
          <p className="text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Access your marksheets, track semester progress, and claim verified certificates — all on-chain.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 w-full max-w-xs">
            {[['Blockchain', 'Certificates'], ['Semester', 'Marksheets'], ['On-chain', 'Verified']].map(([a, b], i) => (
              <div key={i} className="rounded-xl px-3 py-3 text-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-semibold text-white">{a}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="lg:hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Souldem" style={{ height: 26, width: 'auto' }} />
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
            <p className="text-sm text-gray-400 mt-1">Sign in to your Souldem account</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 shadow-sm">

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ height: 44, border: '1px solid #e5e7eb', borderRadius: 12, padding: '0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none', width: '100%' }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ height: 44, border: '1px solid #e5e7eb', borderRadius: 12, padding: '0 40px 0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none', width: '100%' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/resetPass" className="text-xs" style={{ color: '#3E68FC' }}>Forgot password?</Link>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)', border: 'none', cursor: loading ? 'default' : 'pointer', marginTop: 4 }}
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link href="/user/signup" style={{ color: '#3E68FC', fontWeight: 600 }}>Register</Link>
          </p>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Page;
