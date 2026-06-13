'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import forest from '@/app/assets/forest.svg';

const roleEndpoint = {
  hod:     'become/becomeHod',
  mentor:  'become/becomeMentor',
  student: 'become/becomeStudent',
  grader:  'become/becomeGrader',
};

const roleName = {
  hod:     'Head of Department',
  mentor:  'Mentor',
  student: 'Student',
  grader:  'Grader',
};

export default function Page() {
  const params       = useParams();
  const searchParams = useSearchParams();
  const router       = useRouter();

  const [status, setStatus] = useState('joining'); // joining | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const k1 = searchParams.get('k1');
    const k2 = searchParams.get('k2');
    const endpoint = roleEndpoint[params.role];

    if (!endpoint || !k1 || !k2) {
      setStatus('error');
      setErrorMsg('Invalid invite link. Please ask for a new invitation.');
      return;
    }

    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + endpoint, {
        contractAdd: params.govAdd,
        memAdd:      params.pKey,
        secretKey_1: k1,
        secretKey_2: k2,
        role:        params.role,
        uniqueId:    params.uniqueId,
        signature:   params.sig,
        gName:       params.govName,
        cName:       params.univName,
        signerAdd:   params.signer,
      })
      .then(() => {
        setStatus('success');
        setTimeout(() => router.push('/user/login'), 2500);
      })
      .catch((err) => {
        const msg = err.response?.data?.reason || err.response?.data || 'Something went wrong. The link may have already been used.';
        setErrorMsg(typeof msg === 'string' ? msg : JSON.stringify(msg));
        setStatus('error');
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        src={forest}
        alt="banner"
        className="h-full w-full absolute z-0 opacity-20 object-cover"
      />

      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center gap-y-6 w-full max-w-md text-center">
        {status === 'joining' && (
          <>
            <div className="animate-spin size-12 border-4 border-blue-600 border-t-transparent rounded-full" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Joining as {roleName[params.role] || params.role}…
            </h2>
            <p className="text-gray-500">
              Setting up your account on the blockchain. This takes a few seconds.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="text-green-600 size-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">You're in!</h2>
            <p className="text-gray-500">
              You've successfully joined as <b>{roleName[params.role] || params.role}</b>.<br />
              Redirecting you to login…
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="size-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="text-red-600 size-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Invite failed</h2>
            <p className="text-gray-500 text-sm">{errorMsg}</p>
            <p className="text-gray-400 text-xs">Please contact your university admin for a new invite.</p>
          </>
        )}
      </div>
    </div>
  );
}
