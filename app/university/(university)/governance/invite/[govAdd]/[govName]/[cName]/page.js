'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from 'next/navigation';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import {
  ChevronLeft, UserPlus, X, Upload, Download,
  Send, Loader2, RefreshCw, CheckCircle2, Clock, Users
} from 'lucide-react';

const ROLES = [
  { value: 'grader', label: 'Grader', color: '#f97316' },
  { value: 'hod',    label: 'HOD',    color: '#8b5cf6' },
];

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();

  const [email,    setEmail]    = useState('');
  const [emails,   setEmails]   = useState([]);
  const [role,     setRole]     = useState('grader');
  const [loading,  setLoading]  = useState(false);

  // members state: { grader: [], hod: [] }
  const [members,       setMembers]       = useState({ grader: [], hod: [] });
  const [membersLoading, setMembersLoading] = useState(true);
  const [activeTab,     setActiveTab]     = useState('grader');

  const govName = decodeURIComponent(params.govName || '');
  const cName   = decodeURIComponent(params.cName   || '');

  const fetchMembers = useCallback(async () => {
    setMembersLoading(true);
    try {
      const [graderRes, hodRes] = await Promise.allSettled([
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}become/getAllMemFromGov/grader/${params.govAdd}`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}become/getAllMemFromGov/hod/${params.govAdd}`),
      ]);
      setMembers({
        grader: graderRes.status === 'fulfilled' ? (graderRes.value.data || []) : [],
        hod:    hodRes.status   === 'fulfilled' ? (hodRes.value.data   || []) : [],
      });
    } catch {
      toast.error('Failed to load members');
    } finally {
      setMembersLoading(false);
    }
  }, [params.govAdd]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const addEmail = () => {
    const t = email.trim();
    if (t && !emails.includes(t)) { setEmails([...emails, t]); setEmail(''); }
  };
  const removeEmail = (e) => setEmails(emails.filter(x => x !== e));
  const handleKeyDown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addEmail(); } };

  const handleSendInvite = async () => {
    if (!emails.length) { toast.error('Add at least one email'); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}mail/sendMail/invite`, {
        role,
        universityName: params.cName,
        GovName:        params.govName,
        universityMail: localStorage.getItem('email'),
        toEmails:       emails,
        domain: { name: params.govName, version: '1', chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337'), verifyingContract: params.govAdd },
      });
      if (res.status === 200) {
        toast.success(`Invitations sent to ${emails.length} recipient(s)`);
        setEmails([]);
        fetchMembers();
      }
    } catch {
      toast.error('Failed to send invitations');
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = (r) => {
    const list = members[r];
    if (!list.length) { toast.info('No members joined yet'); return; }
    const csv = Papa.unparse(list.map(m => ({ email: m.email || '', address: m.publicKey || m.publicAdd || '', status: 'Joined' })));
    saveAs(new Blob([csv], { type: 'text/csv' }), `${r}_joined.csv`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: (r) => setEmails(prev => [...new Set([...prev, ...r.data.map(x => x.email).filter(Boolean)])]),
      error: () => toast.error('Failed to parse CSV'),
    });
  };

  const activeRoleObj = ROLES.find(r => r.value === role);
  const tabMembers    = members[activeTab] || [];
  const tabColor      = ROLES.find(r => r.value === activeTab)?.color;

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
            <h1 className="text-xl font-bold text-white leading-tight truncate">Invite to {govName}</h1>
          </div>
          {/* Member counts */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {ROLES.map(r => (
              <div key={r.value} className="text-center">
                <p className="text-2xl font-bold text-white leading-none">{members[r.value].length}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{r.label}s joined</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 2-col: invite form + action panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Left — form */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Role selector */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Inviting as</p>
            <div className="flex gap-2">
              {ROLES.map(r => (
                <button key={r.value} onClick={() => setRole(r.value)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                  style={role === r.value
                    ? { background: r.color, color: '#fff', borderColor: r.color }
                    : { background: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }}
                >{r.label}</button>
              ))}
            </div>
          </div>

          {/* Email input */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Add Emails</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="person@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ flex: 1, height: 44, border: '1px solid #e5e7eb', borderRadius: 12, padding: '0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none' }}
              />
              <button onClick={addEmail}
                className="px-5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)', border: 'none', cursor: 'pointer', height: 44 }}
              >Add</button>
            </div>
            <div className="min-h-[100px] max-h-48 overflow-y-auto rounded-xl p-3 flex flex-col gap-1.5" style={{ background: '#f9fafb', border: '1px solid #f0f0f0' }}>
              {!emails.length ? (
                <p className="text-xs text-gray-400 text-center mt-6">No emails added yet. Type above and press Enter or Add.</p>
              ) : emails.map((e, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-gray-100">
                  <span className="text-sm text-gray-700 truncate">{e}</span>
                  <button onClick={() => removeEmail(e)} className="shrink-0 ml-2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
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
            <span className="text-gray-500">Recipients</span>
            <span className="font-bold text-gray-800">{emails.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm py-1">
            <span className="text-gray-500">Role</span>
            <span className="font-semibold" style={{ color: activeRoleObj?.color }}>{activeRoleObj?.label}</span>
          </div>

          <div className="h-px bg-gray-100 my-1" />

          <button onClick={handleSendInvite} disabled={loading || !emails.length}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)', border: 'none', cursor: emails.length && !loading ? 'pointer' : 'default' }}
          >
            {loading ? <><Loader2 size={14} className="animate-spin" />Sending…</> : <><Send size={14} />Send Invites</>}
          </button>

          <label className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer border border-gray-200 hover:border-blue/30 hover:bg-blue/5 transition-colors" style={{ color: '#3E68FC' }}>
            <Upload size={14} />Import CSV
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
          </label>

          <div className="h-px bg-gray-100 my-1" />
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Export</p>
          {ROLES.map(r => (
            <button key={r.value} onClick={() => downloadCsv(r.value)}
              className="w-full py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 transition-colors text-gray-600"
            >
              <Download size={12} />{r.label} list CSV
            </button>
          ))}
        </div>
      </div>

      {/* Member tables */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Tab header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <div className="flex gap-1">
            {ROLES.map(r => (
              <button
                key={r.value}
                onClick={() => setActiveTab(r.value)}
                className="relative px-4 py-2.5 text-sm font-semibold transition-colors"
                style={{ color: activeTab === r.value ? r.color : '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {r.label}s
                <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" style={{ background: activeTab === r.value ? `${r.color}15` : '#f3f4f6', color: activeTab === r.value ? r.color : '#9ca3af' }}>
                  {members[r.value].length}
                </span>
                {activeTab === r.value && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full" style={{ background: r.color }} />
                )}
              </button>
            ))}
          </div>
          <button onClick={fetchMembers} disabled={membersLoading}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors pb-2"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <RefreshCw size={12} className={membersLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Table */}
        {membersLoading ? (
          <div className="p-8 text-center">
            <Loader2 size={20} className="animate-spin text-gray-300 mx-auto" />
          </div>
        ) : !tabMembers.length ? (
          <div className="p-10 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: '#f9fafb' }}>
              <Users size={20} className="text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-400">No {activeTab}s have joined yet</p>
            <p className="text-xs text-gray-300 mt-1">Invite members using the form above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Wallet Address</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {tabMembers.map((m, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: i < tabMembers.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                    <td className="px-5 py-3 text-sm text-gray-400">{i + 1}</td>
                    <td className="px-5 py-3 text-sm text-gray-800 font-medium">{m.email || '—'}</td>
                    <td className="px-5 py-3 text-xs font-mono text-gray-400">
                      {m.publicKey || m.publicAdd
                        ? `${(m.publicKey || m.publicAdd).slice(0, 8)}…${(m.publicKey || m.publicAdd).slice(-6)}`
                        : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(74,222,128,0.1)', color: '#15803d', border: '1px solid rgba(74,222,128,0.2)' }}>
                        <CheckCircle2 size={11} /> Joined
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}
