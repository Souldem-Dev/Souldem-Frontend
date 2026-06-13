'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from 'next/navigation';
import Papa from 'papaparse';
import {
  ChevronLeft, UserPlus, X, Upload, Download,
  Send, Loader2, RefreshCw, CheckCircle2, Users, ClipboardCheck,
} from 'lucide-react';
import Link from 'next/link';
import NonceSheet from '@/components/NonceSheet';

const inputStyle = {
  height: 44, border: '1px solid #e5e7eb', borderRadius: 12,
  padding: '0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none', width: '100%',
};

export default function MentorInvitePage() {
  const params = useParams();
  const router = useRouter();

  const govName = decodeURIComponent(params.govName || '');
  const cName   = decodeURIComponent(params.cName   || '');

  const [email,   setEmail]   = useState('');
  const [regNo,   setRegNo]   = useState('');
  const [entries, setEntries] = useState([]); // { email, regNo }
  const [loading, setLoading] = useState(false);

  const [students,        setStudents]        = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    setStudentsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}become/getAllMemFromGov/stud/${params.govAdd}`
      );
      setStudents(res.data || []);
    } catch {
      toast.error('Failed to load students');
    } finally {
      setStudentsLoading(false);
    }
  }, [params.govAdd]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const addEntry = () => {
    const e = email.trim(), r = regNo.trim();
    if (!e || !r) return;
    if (entries.some((x) => x.email === e)) { toast.info('Email already added'); return; }
    setEntries((prev) => [...prev, { email: e, regNo: r }]);
    setEmail('');
    setRegNo('');
  };

  const removeEntry = (em) => setEntries((prev) => prev.filter((x) => x.email !== em));

  const handleKeyDown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addEntry(); } };

  const handleSendInvite = async () => {
    if (!entries.length) { toast.error('Add at least one student'); return; }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}mail/sendMail/invite/student`,
        {
          userMail:       localStorage.getItem('userEmail'),
          role:           'student',
          universityName: cName,
          GovName:        govName,
          toEmails:       entries,
          domain: {
            name:              govName,
            version:           '1',
            chainId:           parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337'),
            verifyingContract: params.govAdd,
          },
        }
      );
      toast.success(`Invitations sent to ${entries.length} student(s)`);
      setEntries([]);
      fetchStudents();
    } catch {
      toast.error('Failed to send invitations');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: (r) => {
        const parsed = r.data
          .filter((row) => row.email && row.regNo)
          .map((row) => ({ email: row.email.trim(), regNo: row.regNo.trim() }));
        setEntries((prev) => {
          const existing = new Set(prev.map((x) => x.email));
          return [...prev, ...parsed.filter((x) => !existing.has(x.email))];
        });
      },
      error: () => toast.error('Failed to parse CSV'),
    });
  };

  const downloadJoinedCsv = () => {
    if (!students.length) { toast.info('No students joined yet'); return; }
    const csv = Papa.unparse(students.map((s) => ({
      email:   s.email || '',
      address: s.publicKey || '',
      status:  'Joined',
    })));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href = url; a.download = 'joined_students.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">

      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)' }}>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative flex items-center gap-4">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <ChevronLeft size={18} />
          </button>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <UserPlus size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{cName}</p>
            <h1 className="text-xl font-bold text-white leading-tight truncate">{govName}</h1>
          </div>
          {/* Stats */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-white leading-none">{students.length}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Students joined</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white leading-none">{entries.length}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Queued</p>
            </div>
          </div>
          {/* Approve button */}
          <Link
            href={`/user/mentor/approval/${params.govAdd}/${params.govName}/${params.cName}`}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
          >
            <ClipboardCheck size={15} /> Approve
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Left — invite form */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Email + RegNo inputs */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Add Students</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email" placeholder="student@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown}
                style={{ ...inputStyle, flex: 1 }}
              />
              <input
                type="text" placeholder="Reg. No (e.g. 21CS001)"
                value={regNo} onChange={(e) => setRegNo(e.target.value)} onKeyDown={handleKeyDown}
                style={{ ...inputStyle, width: 180 }}
              />
              <button onClick={addEntry}
                className="px-5 rounded-xl text-sm font-semibold text-white shrink-0"
                style={{ background: 'linear-gradient(135deg,#3E68FC,#5b51f5)', border: 'none', cursor: 'pointer', height: 44 }}
              >Add</button>
            </div>

            {/* Queue list */}
            <div className="min-h-[100px] max-h-52 overflow-y-auto rounded-xl p-3 flex flex-col gap-1.5" style={{ background: '#f9fafb', border: '1px solid #f0f0f0' }}>
              {!entries.length ? (
                <p className="text-xs text-gray-400 text-center mt-7">No students queued. Add email + reg no above, then press Enter or Add.</p>
              ) : entries.map((entry, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-gray-100">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-800 font-medium truncate">{entry.email}</p>
                    <p className="text-xs text-gray-400 font-mono">{entry.regNo}</p>
                  </div>
                  <button onClick={() => removeEntry(entry.email)} className="shrink-0 ml-2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                    <X size={12} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 lg:sticky lg:top-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Actions</p>

          <div className="flex items-center justify-between text-sm py-1">
            <span className="text-gray-500">Queued</span>
            <span className="font-bold text-gray-800">{entries.length} student(s)</span>
          </div>
          <div className="flex items-center justify-between text-sm py-1">
            <span className="text-gray-500">Already joined</span>
            <span className="font-bold text-gray-800">{students.length}</span>
          </div>

          <div className="h-px bg-gray-100 my-1" />

          <button onClick={handleSendInvite} disabled={loading || !entries.length}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg,#3E68FC,#5b51f5)', border: 'none', cursor: entries.length && !loading ? 'pointer' : 'default' }}
          >
            {loading ? <><Loader2 size={14} className="animate-spin" />Sending…</> : <><Send size={14} />Send Invitations</>}
          </button>

          <label className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer border border-gray-200 hover:border-blue/30 transition-colors" style={{ color: '#3E68FC' }}>
            <Upload size={14} />Import CSV
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
          </label>

          <div className="h-px bg-gray-100 my-1" />

          <button onClick={downloadJoinedCsv}
            className="w-full py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 transition-colors text-gray-600"
          >
            <Download size={12} />Export joined students
          </button>

          <div className="h-px bg-gray-100 my-1" />

          <Link
            href={`/user/mentor/approval/${params.govAdd}/${params.govName}/${params.cName}`}
            className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border transition-colors"
            style={{ borderColor: 'rgba(62,104,252,0.3)', color: '#3E68FC', background: 'rgba(62,104,252,0.04)' }}
          >
            <ClipboardCheck size={14} />Go to Approval
          </Link>
        </div>
      </div>

      {/* Joined students table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <div className="flex items-center gap-2">
            <Users size={15} style={{ color: '#3E68FC' }} />
            <p className="text-sm font-semibold text-gray-700">Joined Students</p>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(62,104,252,0.08)', color: '#3E68FC' }}>{students.length}</span>
          </div>
          <button onClick={fetchStudents} disabled={studentsLoading}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <RefreshCw size={12} className={studentsLoading ? 'animate-spin' : ''} />Refresh
          </button>
        </div>

        {studentsLoading ? (
          <div className="p-8 text-center"><Loader2 size={20} className="animate-spin text-gray-300 mx-auto" /></div>
        ) : !students.length ? (
          <div className="p-10 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: '#f9fafb' }}>
              <Users size={20} className="text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-400">No students have joined yet</p>
            <p className="text-xs text-gray-300 mt-1">Invite students using the form above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  {['#', 'Email', 'Wallet Address', 'Status'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: i < students.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                    <td className="px-5 py-3 text-sm text-gray-400">{i + 1}</td>
                    <td className="px-5 py-3 text-sm text-gray-800 font-medium">{s.email || '—'}</td>
                    <td className="px-5 py-3 text-xs font-mono text-gray-400">
                      {s.publicKey ? `${s.publicKey.slice(0,8)}…${s.publicKey.slice(-6)}` : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(74,222,128,0.1)', color: '#15803d', border: '1px solid rgba(74,222,128,0.2)' }}>
                        <CheckCircle2 size={11} />Joined
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Nonce sheet */}
      <NonceSheet govAdd={params.govAdd} govName={govName} />

      <ToastContainer position="bottom-right" />
    </div>
  );
}
