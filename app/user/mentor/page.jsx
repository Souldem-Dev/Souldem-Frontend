'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Users, ChevronRight, GraduationCap, ArrowRight } from 'lucide-react';

const safeEncode = (v) => {
  try { return encodeURIComponent(decodeURIComponent(v || '')); }
  catch { return encodeURIComponent(v || ''); }
};

export default function MentorDashboard() {
  const [govs,    setGovs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [email,   setEmail]   = useState('');

  useEffect(() => {
    const add  = localStorage.getItem('userPublicAddress');
    const mail = localStorage.getItem('userEmail') || '';
    setEmail(mail);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}become/joinedGov/mentor/${add}`)
      .then((res) => setGovs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayName = email.split('@')[0] || 'Mentor';

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white w-full" style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)' }}>
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 select-none" style={{ background: 'rgba(255,255,255,0.2)' }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Mentor</p>
            <h1 className="text-2xl font-bold leading-tight truncate text-white">{displayName}</h1>
            <p className="text-sm truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>{email}</p>
          </div>
        </div>
        <div className="relative mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="text-center w-fit">
            <p className="text-3xl font-bold text-white">{loading ? '—' : govs.length}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Governances</p>
          </div>
        </div>
      </div>

      {/* Governance list */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">My Governances</p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-44 rounded-2xl animate-pulse bg-white" />)}
          </div>
        ) : govs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(62,104,252,0.06)' }}>
              <Users size={24} style={{ color: 'rgba(62,104,252,0.3)' }} />
            </div>
            <p className="text-sm font-medium text-gray-500">No governances joined yet</p>
            <p className="text-xs text-gray-400 mt-1">You'll be able to invite students once you're added to a governance</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {govs.map((g, i) => {
              const accent = ['#3E68FC','#7c3aed','#0891b2','#0f766e'][i % 4];
              return (
                <Link
                  key={i}
                  href={`/user/mentor/invite/${g.governAdd}/${safeEncode(g.gName)}/${safeEncode(g.cName)}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all"
                >
                  <div className="h-1.5 w-full" style={{ background: accent }} />
                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${accent}15` }}>
                        <GraduationCap size={18} style={{ color: accent }} />
                      </div>
                      <ChevronRight size={16} className="text-gray-200 group-hover:text-blue transition-colors mt-1" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-sm leading-snug">{decodeURIComponent(g.gName || '')}</p>
                      <p className="text-xs text-gray-400 mt-1">{decodeURIComponent(g.cName || '')}</p>
                    </div>
                    <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #f3f4f6' }}>
                      <p className="text-xs font-mono text-gray-300 truncate max-w-[70%]">{g.governAdd}</p>
                      <span className="text-xs font-semibold shrink-0" style={{ color: accent }}>Manage →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
