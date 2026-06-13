'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Award, Link2, ChevronRight, MoveUpRight, AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react';

const safeEncode = (v) => {
  try { return encodeURIComponent(decodeURIComponent(v || '')); }
  catch { return encodeURIComponent(v || ''); }
};

export default function StudentDashboard() {
  const [profile, setProfile]             = useState(null);
  const [email, setEmail]                 = useState('');
  const [aadhaarLinked, setAadhaarLinked] = useState(false);
  const [certs, setCerts]                 = useState([]);
  const [govs, setGovs]                   = useState([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    const add  = localStorage.getItem('userPublicAddress');
    const mail = localStorage.getItem('userEmail') || '';
    setEmail(mail);
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    Promise.allSettled([
      axios.get(`${base}become/joinedGov/student/${add}`),
      axios.get(`${base}aadhaar/isAadhaarIntegWithSDEM/${mail}`),
      axios.get(`${base}marksheets/getMintedCerts/${add}`),
      axios.get(`${base}aadhaar/detail/${mail}`),
    ]).then(([govsRes, aadhaarRes, certsRes, profileRes]) => {
      if (govsRes.status === 'fulfilled')    setGovs(govsRes.value.data || []);
      if (aadhaarRes.status === 'fulfilled') setAadhaarLinked(true);
      if (certsRes.status === 'fulfilled')   setCerts(certsRes.value.data || []);
      if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data);
      setLoading(false);
    });
  }, []);

  const displayName = profile?.name || email.split('@')[0] || 'Student';
  const latestCert  = certs[0] || null;

  if (loading) {
    return (
      <div className="p-6 md:p-8 w-full flex flex-col gap-4">
        <div className="h-44 rounded-2xl animate-pulse" style={{ background: '#dde4ff' }} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-56 rounded-2xl animate-pulse bg-white" />
          <div className="flex flex-col gap-4">
            <div className="h-24 rounded-2xl animate-pulse bg-white" />
            <div className="h-24 rounded-2xl animate-pulse bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">

      {/* Aadhaar warning — full width */}
      {!aadhaarLinked && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <AlertTriangle size={15} className="text-amber-500 shrink-0" />
          <p className="text-sm text-amber-800">Aadhaar not linked — required for certificate minting.</p>
          <Link href="/user/aadhaarIntr" className="ml-auto text-sm font-semibold text-blue whitespace-nowrap hover:underline">
            Link now →
          </Link>
        </div>
      )}

      {/* Profile hero — full width */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white w-full" style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)' }}>
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0 select-none" style={{ background: 'rgba(255,255,255,0.2)' }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Student</p>
            <h1 className="text-2xl font-bold leading-tight truncate text-white">{displayName}</h1>
            <p className="text-sm truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>{email}</p>
          </div>
          <div className="shrink-0">
            {aadhaarLinked ? (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(74,222,128,0.2)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac' }}>
                <CheckCircle2 size={12} /> Aadhaar Verified
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.3)', color: '#fde68a' }}>
                <AlertTriangle size={12} /> Aadhaar Not Linked
              </span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="relative mt-6 pt-5 grid grid-cols-3 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div>
            <p className="text-3xl font-bold text-white">{certs.length}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Certificates</p>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
            <p className="text-3xl font-bold text-white">{govs.length}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Governances</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{latestCert?.semNo ?? '—'}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Latest Sem</p>
          </div>
        </div>
      </div>

      {/* Main 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left col — latest cert (spans 2) */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Latest Certificate</p>
              {certs.length > 1 && (
                <Link href="/user/wallet/certificates" className="text-xs text-blue hover:underline">View all →</Link>
              )}
            </div>

            {latestCert ? (
              <div className="relative rounded-2xl p-6 text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #7c3aed 100%)' }}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{latestCert.collegeName} · {latestCert.governName}</p>
                    <h3 className="font-bold text-xl text-white">Semester {latestCert.semNo} Marksheet</h3>
                    <p className="text-xs mt-2 font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>{String(latestCert.ipfsCid).slice(0, 36)}…</p>
                  </div>
                  <Link
                    href={`/marksheet/${latestCert.ipfsCid}/${encodeURIComponent(latestCert.collegeName)}/${encodeURIComponent(latestCert.governName)}`}
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    <MoveUpRight size={18} />
                  </Link>
                </div>
                <div className="relative mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Issued via Souldem · On-chain verified</span>
                  <Link
                    href={`/marksheet/${latestCert.ipfsCid}/${encodeURIComponent(latestCert.collegeName)}/${encodeURIComponent(latestCert.governName)}`}
                    className="text-xs px-4 py-1.5 rounded-full text-white font-medium"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    Download ↓
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(62,104,252,0.06)' }}>
                  <Award size={24} style={{ color: 'rgba(62,104,252,0.3)' }} />
                </div>
                <p className="text-sm font-medium text-gray-500">No certificates yet</p>
                <p className="text-xs text-gray-400 mt-1">Your marksheets appear here once minted</p>
              </div>
            )}
          </div>

          {/* Governances */}
          {govs.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">My Governances</p>
              <div className="flex flex-col gap-2">
                {govs.map((g, i) => (
                  <div key={i} className="group bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center gap-4 hover:border-blue/20 hover:shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(62,104,252,0.08)' }}>
                      <BookOpen size={16} className="text-blue" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-gray-800 truncate">{decodeURIComponent(g.gName || '')}</p>
                      <p className="text-xs text-gray-400 truncate">{decodeURIComponent(g.cName || '')}</p>
                    </div>
                    <Link
                      href={`/user/wallet/addSubjects/${g.governAdd}/${safeEncode(g.gName)}/${safeEncode(g.cName)}`}
                      className="shrink-0 flex items-center gap-1 text-xs text-blue font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Pick subjects <ChevronRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right col — quick actions */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Actions</p>

          <Link href="/user/wallet/certificates" className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue/30 hover:shadow-sm transition-all flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(62,104,252,0.08)' }}>
              <Award size={20} className="text-blue" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-gray-800">My Certificates</p>
              <p className="text-xs text-gray-400">{certs.length} issued</p>
            </div>
            <ChevronRight size={16} className="shrink-0 text-gray-200 group-hover:text-blue transition-colors" />
          </Link>

          {aadhaarLinked ? (
            <div className="bg-white rounded-2xl p-5 border border-green-100 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className="text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">Aadhaar</p>
                <p className="text-xs text-green-600">Verified ✓</p>
              </div>
            </div>
          ) : (
            <Link href="/user/aadhaarIntr" className="group bg-white rounded-2xl p-5 border border-amber-100 hover:border-amber-300 hover:shadow-sm transition-all flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Link2 size={20} className="text-amber-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-800">Link Aadhaar</p>
                <p className="text-xs text-amber-500">Required for minting</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-gray-200 group-hover:text-amber-400 transition-colors" />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
