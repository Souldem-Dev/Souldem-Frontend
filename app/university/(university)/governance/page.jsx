'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus, UserPlus, ToggleRight, Building2, ChevronRight, X, Loader2 } from 'lucide-react';

const safeEncode = (v) => {
  try { return encodeURIComponent(decodeURIComponent(v || '')); }
  catch { return encodeURIComponent(v || ''); }
};


export default function GovernancePage() {
  const [govs,         setGovs]         = useState([]);
  const [univName,     setUnivName]     = useState('');
  const [loading,      setLoading]      = useState(true);
  const [showModal,    setShowModal]    = useState(false);
  const [creating,     setCreating]     = useState(false);
  const [form, setForm] = useState({ governanceName: '', batch: '', semester: '' });

  const fetchData = async () => {
    try {
      const pk = localStorage.getItem('publicAddress');
      const { data: info } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}factory/getData/${pk}`);
      setUnivName(info.name || '');
      const { data: govData } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}factory/getGovernanceAddress/${info.collegeAddress}`);
      setGovs(govData || []);
    } catch (e) {
      toast.error('Failed to fetch governances');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const pk    = localStorage.getItem('publicAddress');
      const email = localStorage.getItem('email');
      const { data: info } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}factory/getData/${pk}`);
      const { nonce, name, collegeAddress, relayer } = info;

      const domain = { name, version: '1', chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337'), verifyingContract: collegeAddress };
      const types  = { CreateGovernance: [
        { name: 'wallet', type: 'address' }, { name: 'governanceName', type: 'string' },
        { name: 'totalEndExamination', type: 'uint256' }, { name: 'batch', type: 'string' },
        { name: 'nonces', type: 'uint256' }, { name: 'relayer', type: 'address' },
      ]};
      const value  = { wallet: pk, governanceName: form.governanceName, totalEndExamination: form.semester, batch: form.batch, nonces: parseInt(nonce, 10), relayer };

      const { data: sigData } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}signature/signWithUniv`, { email, domain, types, value });
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}factory/createGovernance`, {
        owner: pk, signature: sigData.signature,
        governanceName: form.governanceName, batch: form.batch,
        totalEndExamination: form.semester, nonce: parseInt(nonce, 10),
      });

      if (res.data._type === 'TransactionResponse') {
        toast.success('Governance created!');
        setShowModal(false);
        setForm({ governanceName: '', batch: '', semester: '' });
        fetchData();
      }
    } catch (e) {
      toast.error(e.response?.data?.reason || 'Failed to create governance');
    } finally {
      setCreating(false);
    }
  };

  const displayName = univName || localStorage?.getItem?.('email')?.split('@')[0] || 'University';

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)' }}>
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Building2 size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>University</p>
            <h1 className="text-2xl font-bold leading-tight truncate text-white">{univName || '—'}</h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
          >
            <Plus size={16} /> New Governance
          </button>
        </div>

        <div className="relative mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="text-center w-fit">
            <p className="text-3xl font-bold text-white">{loading ? '—' : govs.length}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Governances</p>
          </div>
        </div>
      </div>

      {/* Governance grid */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">All Governances</p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-44 rounded-2xl animate-pulse" style={{ background: '#dde4ff' }} />)}
          </div>
        ) : govs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(62,104,252,0.06)' }}>
              <Building2 size={24} style={{ color: 'rgba(62,104,252,0.3)' }} />
            </div>
            <p className="text-sm font-medium text-gray-500">No governances yet</p>
            <p className="text-xs text-gray-400 mt-1">Click "New Governance" to create your first one</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {govs.map((item, i) => {
              const govAdd  = item.args[1];
              const govName = item.args[3];
              const accent  = ['#3E68FC','#7c3aed','#0891b2','#0f766e'][i % 4];
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  {/* Colour strip */}
                  <div className="h-1 w-full shrink-0" style={{ background: accent }} />

                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}15` }}>
                        <Building2 size={18} style={{ color: accent }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 truncate">{univName}</p>
                        <h3 className="font-bold text-gray-800 truncate">{govName}</h3>
                        <p className="text-xs font-mono text-gray-400 mt-0.5 truncate">
                          {String(govAdd).slice(0, 10)}…{String(govAdd).slice(-6)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto pt-3 border-t border-gray-50">
                      <Link
                        href={`/university/governance/invite/${govAdd}/${safeEncode(govName)}/${safeEncode(univName)}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-colors text-white"
                        style={{ background: accent }}
                      >
                        <UserPlus size={13} /> Invite
                      </Link>
                      <Link
                        href={`/university/governance/marksEntryToggle/${govAdd}/${safeEncode(govName)}/${safeEncode(univName)}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-colors"
                        style={{ border: `1px solid ${accent}40`, color: accent, background: `${accent}08` }}
                      >
                        <ToggleRight size={13} /> Marks Toggle
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Governance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <div>
                <h2 className="text-lg font-bold text-gray-800">New Governance</h2>
                <p className="text-xs text-gray-400 mt-0.5">Creates a governance contract on-chain</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="px-6 py-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Governance Name</label>
                <input
                  required
                  placeholder="e.g. BCA 2024"
                  value={form.governanceName}
                  onChange={e => setForm(f => ({ ...f, governanceName: e.target.value }))}
                  style={{ height: 44, border: '1px solid #e5e7eb', borderRadius: 12, padding: '0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none', width: '100%' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Batch</label>
                  <input
                    required
                    placeholder="e.g. 2024"
                    value={form.batch}
                    onChange={e => setForm(f => ({ ...f, batch: e.target.value }))}
                    style={{ height: 44, border: '1px solid #e5e7eb', borderRadius: 12, padding: '0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none', width: '100%' }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Semesters</label>
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="e.g. 8"
                    value={form.semester}
                    onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
                    style={{ height: 44, border: '1px solid #e5e7eb', borderRadius: 12, padding: '0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none', width: '100%' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity disabled:opacity-60 mt-1"
                style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)' }}
              >
                {creating ? <><Loader2 size={15} className="animate-spin" /> Creating…</> : 'Create Governance'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}
