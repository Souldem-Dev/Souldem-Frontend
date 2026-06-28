'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Building2, Loader2, Eye, EyeOff } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const domain = {
    name: 'BASE_FACTORY',
    version: '1',
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337'),
    verifyingContract: process.env.NEXT_PUBLIC_BASE_FACTORY_ADDRESS,
  };

  const types = {
    Create: [
      { name: 'wallet', type: 'address' },
      { name: 'universityName', type: 'string' },
    ],
  };

  const triggerOtpIfReady = async () => {
    if (otpSent || otpSending || !universityName || !email || !password) return;
    setOtpSending(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'register/createAccountAuth',
        { email, type: 'university' }
      );
      if (response.status === 200) {
        setOtpSent(true);
        toast.success('OTP sent to your email');
        if (response.data?._devOtp) {
          setOtp(String(response.data._devOtp));
          toast.info(`Dev mode: OTP = ${response.data._devOtp}`);
        }
      } else {
        toast.error('Error sending OTP');
      }
    } catch {
      toast.error('An error occurred while sending OTP. Please try again.');
    } finally {
      setOtpSending(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!otp) { toast.error('Enter the OTP sent to your email'); return; }
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'register/createUniversityAccount',
        { email, password, universityName, otp, domain, types }
      );
      if (response.status === 200) {
        toast.success('Account successfully created');
        setTimeout(() => router.push('/university/login'), 3000);
      } else {
        toast.error(response.data.resp || 'Error creating account');
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setOtpSent(false);
    setOtp('');
    await triggerOtpIfReady();
  };

  return (
    <div>
      <main className="flex flex-col md:flex-row h-screen lg:overflow-hidden relative" style={{ background: '#f5f7ff' }}>

        {/* Left panel */}
        <div className="md:w-6/12 lg:w-[45%] shrink-0 flex flex-col relative overflow-hidden"
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
              <Building2 size={36} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white leading-tight mb-3">University<br />Registration</h2>
            <p className="text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Register your institution to manage academic governance, invite staff, and control semester examination flow — all on-chain.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 w-full max-w-xs">
              {[['Blockchain', 'Verified'], ['On-chain', 'Records'], ['Tamper', 'Proof']].map(([a, b], i) => (
                <div key={i} className="rounded-xl px-3 py-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-semibold text-white">{a}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — signup form */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Register your university</h1>
              <p className="text-sm text-gray-400 mt-1">Join Souldem as a university admin</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 shadow-sm">

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>University Name</label>
                <input
                  type="text"
                  placeholder="Name of the university"
                  value={universityName}
                  onChange={e => setUniversityName(e.target.value)}
                  style={{ height: 44, border: '1px solid #e5e7eb', borderRadius: 12, padding: '0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none', width: '100%' }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
                <input
                  type="email"
                  placeholder="admin@university.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onBlur={triggerOtpIfReady}
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
                    onBlur={triggerOtpIfReady}
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

              {(otpSending || otpSent) && (
                <div className="flex flex-col gap-1.5">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>OTP</label>
                    {otpSent && (
                      <button type="button" onClick={resendOtp}
                        style={{ fontSize: 11, color: '#3E68FC', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        Resend
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder={otpSending ? 'Sending OTP…' : 'Enter the OTP sent to your email'}
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    disabled={otpSending}
                    style={{ height: 44, border: '1px solid #e5e7eb', borderRadius: 12, padding: '0 12px', fontSize: 14, background: otpSending ? '#f9fafb' : '#fff', color: '#111', outline: 'none', width: '100%' }}
                  />
                  {otpSent && (
                    <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>OTP sent to {email}</p>
                  )}
                </div>
              )}

              <p style={{ fontSize: 11, color: '#9ca3af' }}>
                By creating an account, I agree to Souldem's Terms of Service and Privacy Policy.
              </p>

              <button
                onClick={otpSent ? handleCreateAccount : triggerOtpIfReady}
                disabled={loading || otpSending}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)', border: 'none', cursor: (loading || otpSending) ? 'default' : 'pointer', marginTop: 4 }}
              >
                {loading
                  ? <><Loader2 size={15} className="animate-spin" /> Creating…</>
                  : otpSending
                  ? <><Loader2 size={15} className="animate-spin" /> Sending OTP…</>
                  : 'Create Account'
                }
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{' '}
              <Link href="/university/login" style={{ color: '#3E68FC', fontWeight: 600 }}>Login</Link>
            </p>
            <p className="text-center text-sm text-gray-400 mt-2">
              Registering as a student?{' '}
              <Link href="/user/signup" style={{ color: '#3E68FC', fontWeight: 600 }}>Register here</Link>
            </p>
          </div>
        </div>

      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Page;
