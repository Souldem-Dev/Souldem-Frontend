'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Loader2, RefreshCw, Users, CheckCircle2, Clock, X, Send } from 'lucide-react';

function StatusBadge({ ok, labelOk, labelNo, colorOk = '#15803d', bgOk = 'rgba(74,222,128,0.1)', borderOk = 'rgba(74,222,128,0.2)' }) {
  if (ok) return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: bgOk, color: colorOk, border: `1px solid ${borderOk}` }}>
      <CheckCircle2 size={10} />{labelOk}
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: '#f3f4f6', color: '#9ca3af', border: '1px solid #e5e7eb' }}>
      <Clock size={10} />{labelNo}
    </span>
  );
}

export default function StudentProgressTable({ govAdd, govName, cName, approveLink }) {
  const [students, setStudents] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/govProgress/${govAdd}`);
      setStudents(res.data || []);
    } catch {
      // silent — empty table shown
    } finally {
      setLoading(false);
    }
  }, [govAdd]);

  useEffect(() => { load(); }, [load]);

  const filtered = students.filter(s =>
    !search ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.userName?.toLowerCase().includes(search.toLowerCase()) ||
    s.regNo?.toLowerCase().includes(search.toLowerCase())
  );

  const summary = {
    total:    students.length,
    marks:    students.filter(s => s.marksEntered).length,
    approved: students.filter(s => s.approved).length,
    minted:   students.filter(s => s.minted).length,
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Summary stat row */}
      {!loading && students.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Students',   value: summary.total,    color: '#3E68FC' },
            { label: 'Marks in',   value: summary.marks,    color: '#0891b2' },
            { label: 'Approved',   value: summary.approved, color: '#7c3aed' },
            { label: 'Minted',     value: summary.minted,   color: '#15803d' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-1">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{s.label}</p>
              <div className="h-1 rounded-full mt-1" style={{ background: '#f3f4f6' }}>
                <div className="h-1 rounded-full transition-all" style={{ width: `${summary.total > 0 ? (s.value / summary.total) * 100 : 0}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

        {/* Table header */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <div className="flex items-center gap-2">
            <Users size={15} style={{ color: '#3E68FC' }} />
            <p className="text-sm font-semibold text-gray-700">Student Progress</p>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(62,104,252,0.08)', color: '#3E68FC' }}>
              {students.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ height: 32, border: '1px solid #e5e7eb', borderRadius: 8, padding: '0 10px', fontSize: 13, background: '#fff', color: '#111', outline: 'none', width: 180 }}
            />
            <button onClick={load} disabled={loading}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors px-2 py-1.5 rounded-lg border border-gray-100"
              style={{ background: 'none', cursor: 'pointer' }}
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-10 flex justify-center"><Loader2 size={22} className="animate-spin text-gray-300" /></div>
        ) : !students.length ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: '#f9fafb' }}>
              <Users size={20} className="text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-400">No students have joined yet</p>
          </div>
        ) : !filtered.length ? (
          <div className="p-8 text-center text-sm text-gray-400">No results for "{search}"</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  {['#', 'Student', 'Reg No', 'Subjects', 'Marks', 'Approved', 'Minted', ...(approveLink ? ['Action'] : [])].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                    <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">{s.userName}</p>
                      <p className="text-xs text-gray-400">{s.email}</p>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{s.regNo || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold" style={{ color: s.subjectsChosen > 0 ? '#3E68FC' : '#d1d5db' }}>
                        {s.subjectsChosen > 0 ? s.subjectsChosen : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge ok={s.marksEntered} labelOk="Entered" labelNo="Pending"
                        colorOk="#0891b2" bgOk="rgba(8,145,178,0.08)" borderOk="rgba(8,145,178,0.2)" />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge ok={s.approved} labelOk="Sent" labelNo="Not yet"
                        colorOk="#7c3aed" bgOk="rgba(124,58,237,0.08)" borderOk="rgba(124,58,237,0.2)" />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge ok={s.minted} labelOk="On-chain" labelNo="—" />
                    </td>
                    {approveLink && (
                      <td className="px-4 py-3">
                        {s.marksEntered && !s.approved ? (
                          <Link href={approveLink}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                            style={{ background: 'linear-gradient(135deg,#3E68FC,#5b51f5)' }}
                          >
                            <Send size={10} />Approve
                          </Link>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
