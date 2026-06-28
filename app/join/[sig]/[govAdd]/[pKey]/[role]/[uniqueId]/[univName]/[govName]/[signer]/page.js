'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const roleEndpoint = {
  hod:     'become/becomeHod',
  mentor:  'become/becomeMentor',
  student: 'become/becomeStudent',
  grader:  'become/becomeGrader',
};

const roleLabel = {
  hod:     'Head of Department',
  mentor:  'Mentor',
  student: 'Student',
  grader:  'Grader',
};

const roleIcon = {
  hod:     '🎓',
  mentor:  '📚',
  student: '🧑‍🎓',
  grader:  '📝',
};

const BLUE = '#3E68FC';

export default function Page() {
  const params       = useParams();
  const searchParams = useSearchParams();
  const router       = useRouter();

  const [status, setStatus]   = useState('joining');
  const [errorMsg, setErrorMsg] = useState('');
  const [countdown, setCountdown] = useState(5);

  const univName = decodeURIComponent(params.univName || '');
  const govName  = decodeURIComponent(params.govName  || '');
  const role     = params.role || '';

  useEffect(() => {
    const k1 = searchParams.get('k1');
    const k2 = searchParams.get('k2');
    const endpoint = roleEndpoint[role];

    if (!endpoint || !k1 || !k2) {
      setStatus('error');
      setErrorMsg('This invitation link is invalid or incomplete. Please ask for a new one.');
      return;
    }

    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + endpoint, {
        contractAdd: params.govAdd,
        memAdd:      params.pKey,
        secretKey_1: k1,
        secretKey_2: k2,
        role,
        uniqueId:    params.uniqueId,
        signature:   params.sig,
        gName:       params.govName,
        cName:       params.univName,
        signerAdd:   params.signer,
      })
      .then(() => {
        setStatus('success');
      })
      .catch((err) => {
        const msg = err.response?.data?.reason || err.response?.data;
        setErrorMsg(typeof msg === 'string' ? msg : 'Something went wrong. The link may have already been used.');
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    if (countdown <= 0) { router.push('/user/login'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [status, countdown]);

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(62,104,252,0.07)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(91,81,245,0.07)', filter: 'blur(80px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 500 }}>

        {/* Logo strip */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Souldem" style={{ height: 28, width: 'auto' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', overflow: 'hidden' }}>

          {/* Coloured top bar */}
          <div style={{ height: 6, background: `linear-gradient(90deg, ${BLUE}, #5b51f5)` }} />

          <div style={{ padding: '40px 40px 36px' }}>

            {/* ── JOINING ── */}
            {status === 'joining' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: '50%', background: '#f0f4ff', marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, border: `4px solid ${BLUE}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                </div>
                <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#1a1f36' }}>Setting up your account…</h2>
                <p style={{ margin: 0, fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>
                  Joining as <b>{roleLabel[role] || role}</b> in <b>{govName}</b>.<br />This takes a few seconds.
                </p>

                {/* Context card */}
                {univName && (
                  <div style={{ marginTop: 28, background: '#f8f9fc', borderRadius: 12, padding: '16px 20px', textAlign: 'left' }}>
                    <p style={{ margin: '0 0 4px', fontSize: 12, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Joining</p>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1a1f36' }}>{govName}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 13, color: '#6b7280' }}>{univName}</p>
                  </div>
                )}
              </div>
            )}

            {/* ── SUCCESS ── */}
            {status === 'success' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: '#ecfdf5', marginBottom: 20 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>

                <div style={{ display: 'inline-block', background: '#ecfdf5', borderRadius: 20, padding: '4px 14px', marginBottom: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Verified on blockchain</span>
                </div>

                <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 900, color: '#1a1f36' }}>
                  {roleIcon[role] || '🎉'} You're in!
                </h2>
                <p style={{ margin: '0 0 28px', fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>
                  You've successfully joined as <b>{roleLabel[role] || role}</b>.
                </p>

                {/* Details card */}
                <div style={{ background: '#f8f9fc', borderRadius: 14, overflow: 'hidden', marginBottom: 28, textAlign: 'left' }}>
                  {[
                    ['Programme', govName],
                    ['University', univName],
                    ['Your Role', roleLabel[role] || role],
                  ].map(([label, value], i) => (
                    <div key={i} style={{ display: 'flex', padding: '12px 18px', borderTop: i > 0 ? '1px solid #f0f2f5' : 'none' }}>
                      <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, minWidth: 100 }}>{label}</span>
                      <span style={{ fontSize: 13, color: '#1a1f36', fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/user/login"
                  style={{ display: 'inline-block', width: '100%', padding: '14px', borderRadius: 12, background: `linear-gradient(135deg,${BLUE},#5b51f5)`, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}
                >
                  Go to Login
                </Link>

                <p style={{ margin: '14px 0 0', fontSize: 13, color: '#9ca3af' }}>
                  Auto-redirecting in {countdown}s…
                </p>
              </div>
            )}

            {/* ── ERROR ── */}
            {status === 'error' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: '#fef2f2', marginBottom: 20 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#1a1f36' }}>Invitation failed</h2>
                <p style={{ margin: '0 0 20px', fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>{errorMsg}</p>

                <div style={{ background: '#fff9ed', border: '1px solid #fcd34d', borderRadius: 12, padding: '16px 18px', textAlign: 'left', marginBottom: 24 }}>
                  <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: '#92400e' }}>Common reasons</p>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#78350f', lineHeight: 1.8 }}>
                    <li>The link has already been used</li>
                    <li>The link has expired — ask your admin for a new invite</li>
                    <li>A network error occurred — try again</li>
                  </ul>
                </div>

                <Link
                  href="/user/login"
                  style={{ display: 'inline-block', width: '100%', padding: '14px', borderRadius: 12, background: `linear-gradient(135deg,${BLUE},#5b51f5)`, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}
                >
                  Go to Login
                </Link>
              </div>
            )}

          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#c5cad4' }}>
          © 2025 Souldem — Academic Records on Blockchain
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
