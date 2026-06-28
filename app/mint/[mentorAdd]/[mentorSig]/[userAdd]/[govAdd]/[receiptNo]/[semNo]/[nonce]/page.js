"use client";
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import logo from '@/app/assets/logo.svg';
import { CheckCircle2, XCircle, AlertTriangle, Loader2, BookOpen, Shield } from 'lucide-react';

function Page() {
  const params = useParams();
  const [status,   setStatus]   = useState('loading');
  const [arrears,  setArrears]  = useState({ internalArrear: [], externalArrear: [] });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const govAdd = params.govAdd;
    const semNo  = params.semNo;
    const nonce  = params.nonce;

    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/getResult/${govAdd}/${nonce}/${semNo}`)
      .then(res => {
        if (res.status === 200) {
          setArrears({ internalArrear: res.data.internalArrear || [], externalArrear: res.data.externalArrear || [] });
          setStatus('arrears');
          return;
        }
        return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/mintCert`, {
          governAdd:       govAdd,
          studentAdd:      params.userAdd,
          mentorAdd:       params.mentorAdd,
          currentSem:      parseInt(params.semNo),
          receiptNo:       params.receiptNo,
          mentorSignature: params.mentorSig,
          _ipfsCID:        res.data.ipfsCid,
          relayerSig:      res.data.signature,
          degreeIpfs:      res.data.provisionalCid || '',
        });
      })
      .then(resp => { if (resp) setStatus('minted'); })
      .catch(err => {
        setErrorMsg(err.response?.data?.reason || err.message || 'Something went wrong');
        setStatus('error');
      });
  }, []);

  const short = (addr) => addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0A0E1A' }}>

      {/* Navbar */}
      <header className="flex items-center px-6 py-4 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
          <Image src={logo} alt="Souldem" height={24} />
        </Link>
        <div className="ml-auto flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(62,104,252,0.15)', border: '1px solid rgba(62,104,252,0.3)', color: 'rgba(62,104,252,0.9)' }}>
          <Shield size={11} />
          Blockchain verified
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">

          {/* ── LOADING ── */}
          {status === 'loading' && (
            <div className="rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="p-10 text-center">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)' }}>
                  <Loader2 size={32} className="text-white animate-spin" />
                  <div className="absolute inset-0 rounded-2xl animate-pulse" style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)', opacity: 0.3, filter: 'blur(12px)' }} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Processing your result</h2>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Fetching your marksheet from the blockchain. This may take a moment…
                </p>
                <div className="mt-8 flex gap-1.5 justify-center">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#3E68FC', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MINTED ── */}
          {status === 'minted' && (
            <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(62,104,252,0.25)' }}>
              <div className="p-8 text-center" style={{ background: 'linear-gradient(160deg, #0d1535 0%, #111827 100%)' }}>
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(62,104,252,0.2)', filter: 'blur(16px)' }} />
                  <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)' }}>
                    <CheckCircle2 size={34} className="text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">Certificate Minted!</h2>
                <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Your Semester {params.semNo} marksheet is now permanently on-chain.
                </p>

                <div className="rounded-2xl text-left p-4 flex flex-col gap-3 mb-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {[
                    { label: 'Semester',          value: `Semester ${params.semNo}` },
                    { label: 'Student address',    value: short(params.userAdd) },
                    { label: 'Governance address', value: short(params.govAdd)  },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
                      <span className="text-xs font-mono font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 text-xs px-4 py-2 rounded-full mx-auto w-fit" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: '#86efac' }}>
                  <CheckCircle2 size={11} /> Verified on Polygon
                </div>
              </div>
            </div>
          )}

          {/* ── ARREARS ── */}
          {status === 'arrears' && (
            <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
              <div style={{ background: 'linear-gradient(160deg, #1a0d0d 0%, #111827 100%)' }}>
                <div className="p-8 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(239,68,68,0.2)', filter: 'blur(16px)' }} />
                    <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #9f1239 100%)' }}>
                      <XCircle size={34} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">Result: Arrears</h2>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    You have not cleared all subjects. Clear your arrears to receive your certificate.
                  </p>
                </div>

                <div className="px-6 pb-8 flex flex-col gap-4">
                  {arrears.internalArrear.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(252,165,165,0.7)' }}>Internal Arrears</p>
                      <div className="flex flex-col gap-1.5">
                        {arrears.internalArrear.map((a, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)' }}>
                            <div className="flex items-center gap-2">
                              <BookOpen size={13} style={{ color: 'rgba(252,165,165,0.6)' }} />
                              <span className="text-sm text-white">{a.subjectName}</span>
                              <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.2)', color: 'rgba(252,165,165,0.8)' }}>{a.subjectCode}</span>
                            </div>
                            <span className="text-xs font-mono" style={{ color: 'rgba(252,165,165,0.7)' }}>{a.markScored}/{a.totalMark}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {arrears.externalArrear.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(252,165,165,0.7)' }}>External Arrears</p>
                      <div className="flex flex-col gap-1.5">
                        {arrears.externalArrear.map((a, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)' }}>
                            <div className="flex items-center gap-2">
                              <BookOpen size={13} style={{ color: 'rgba(252,165,165,0.6)' }} />
                              <span className="text-sm text-white">{a.subjectName}</span>
                              <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.2)', color: 'rgba(252,165,165,0.8)' }}>{a.subjectCode}</span>
                            </div>
                            <span className="text-xs font-mono" style={{ color: 'rgba(252,165,165,0.7)' }}>{a.markScored}/{a.totalMark}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── ERROR ── */}
          {status === 'error' && (
            <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(251,191,36,0.2)' }}>
              <div className="p-8 text-center" style={{ background: 'linear-gradient(160deg, #1a1600 0%, #111827 100%)' }}>
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(251,191,36,0.2)', filter: 'blur(16px)' }} />
                  <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)' }}>
                    <AlertTriangle size={34} className="text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Minting Failed</h2>
                <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  An error occurred while processing your certificate.
                </p>
                <div className="rounded-xl px-4 py-3 text-left" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'rgba(253,230,138,0.6)' }}>Error details</p>
                  <p className="text-sm font-mono break-all" style={{ color: 'rgba(253,230,138,0.85)' }}>{errorMsg}</p>
                </div>
                <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  If this keeps happening, contact your institution's admin.
                </p>
              </div>
            </div>
          )}

          {/* Footer note */}
          <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Souldem · Blockchain-secured academic credentials
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
