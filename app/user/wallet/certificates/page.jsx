'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Award, Download, MoveUpRight } from 'lucide-react';

const GRADS = [
  'linear-gradient(135deg, #3E68FC 0%, #6366f1 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #3E68FC 0%, #7c3aed 100%)',
];

export default function CertificatesPage() {
  const [certs,             setCerts]             = useState([]);
  const [provisionalCerts,  setProvisionalCerts]  = useState([]);
  const [loading,           setLoading]           = useState(true);

  useEffect(() => {
    const publicAdd = localStorage.getItem('userPublicAddress');
    if (!publicAdd) { setLoading(false); return; }
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/getMintedCerts/${publicAdd}`)
      .then((res) => setCerts(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/getProvisionalCert/${publicAdd}`)
      .then((res) => setProvisionalCerts(res.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6 md:p-8 w-full">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(62,104,252,0.1)' }}>
          <Award size={20} className="text-blue" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Certificates</h1>
          <p className="text-sm text-gray-400">{loading ? '…' : `${certs.length} issued`}</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-44 rounded-2xl animate-pulse" style={{ background: '#e8ecff' }} />)}
        </div>
      ) : certs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(62,104,252,0.06)' }}>
            <Award size={26} style={{ color: 'rgba(62,104,252,0.3)' }} />
          </div>
          <p className="font-medium text-gray-500">No certificates issued yet</p>
          <p className="text-sm text-gray-400 mt-1">Your marksheets will appear here once minted by your institution</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <div
              key={`${cert.governAdd}-${cert.semNo}`}
              className="relative rounded-2xl p-5 text-white overflow-hidden"
              style={{ background: GRADS[i % GRADS.length] }}
            >
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <div className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />

              <div className="relative">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>{cert.collegeName}</p>
                    <h3 className="font-bold text-base mt-0.5 text-white">Semester {cert.semNo} Marksheet</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{cert.governName}</p>
                  </div>
                  <Link
                    href={`/marksheet/${cert.ipfsCid}/${encodeURIComponent(cert.collegeName)}/${encodeURIComponent(cert.governName)}`}
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    <MoveUpRight size={14} />
                  </Link>
                </div>

                <p className="text-xs font-mono truncate mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {String(cert.ipfsCid).slice(0, 28)}…
                </p>

                <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Souldem · On-chain</span>
                  <Link
                    href={`/marksheet/${cert.ipfsCid}/${encodeURIComponent(cert.collegeName)}/${encodeURIComponent(cert.governName)}`}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full text-white font-medium transition-colors"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    <Download size={11} /> Download
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {provisionalCerts.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(202,138,4,0.12)' }}>
              <Award size={20} style={{ color: '#ca8a04' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Provisional Certificate</h2>
              <p className="text-sm text-gray-400">Issued pending award of original degree</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {provisionalCerts.map((cert) => (
              <div key={cert.govAdd} className="relative rounded-2xl p-5 text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #92400e 0%, #ca8a04 100%)' }}>
                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.07)' }} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>{cert.collegeName}</p>
                      <h3 className="font-bold text-base mt-0.5 text-white">Provisional Certificate</h3>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{cert.governName}</p>
                    </div>
                    <Link
                      href={`/provisional/${cert.ipfsCid}/${encodeURIComponent(cert.collegeName)}/${encodeURIComponent(cert.governName)}`}
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <MoveUpRight size={14} />
                    </Link>
                  </div>
                  <p className="text-xs font-mono truncate mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {String(cert.ipfsCid).slice(0, 28)}…
                  </p>
                  <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Souldem · On-chain</span>
                    <Link
                      href={`/provisional/${cert.ipfsCid}/${encodeURIComponent(cert.collegeName)}/${encodeURIComponent(cert.governName)}`}
                      className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full text-white font-medium transition-colors"
                      style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <Download size={11} /> Download
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
