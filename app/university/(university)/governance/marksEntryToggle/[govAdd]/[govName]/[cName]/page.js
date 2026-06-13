'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ToggleRight, ClipboardEdit, Users } from 'lucide-react';
import Link from 'next/link';

const Toggle = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className="relative shrink-0 transition-all duration-300"
    style={{
      width: 52, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', padding: 0,
      background: checked ? 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)' : '#e5e7eb',
    }}
  >
    <span
      className="absolute top-0.5 transition-all duration-300"
      style={{
        left: checked ? 26 : 2, width: 24, height: 24, borderRadius: '50%',
        background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        display: 'inline-block',
      }}
    />
  </button>
);

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [internalToggle, setInternalToggle] = useState(false);
  const [externalToggle, setExternalToggle] = useState(false);

  const govName = decodeURIComponent(params.govName || '');
  const cName   = decodeURIComponent(params.cName   || '');

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/toggleStatus/${params.govAdd}`)
      .then(res => {
        setInternalToggle(!!res.data.internal);
        setExternalToggle(!!res.data.external);
      })
      .catch(() => {}); // no record yet — both stay false
  }, [params.govAdd]);

  const handleInternal = async () => {
    const next = !internalToggle;
    setInternalToggle(next);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/allowInternalMarks`, {
        governAdd: params.govAdd, internal: next, external: false,
      });
      toast.success(next ? 'Internal marks entry opened' : 'Internal marks entry closed');
    } catch {
      setInternalToggle(!next);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleExternal = async () => {
    const next = !externalToggle;
    setExternalToggle(next);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/allowExternalMarks`, {
        governAdd: params.govAdd, internal: false, external: next,
      });
      toast.success(next ? 'External marks entry opened' : 'External marks entry closed');
    } catch {
      setExternalToggle(!next);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">

      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)' }}>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative flex items-center gap-4">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <ChevronLeft size={18} />
          </button>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <ToggleRight size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{cName}</p>
            <h1 className="text-xl font-bold text-white leading-tight truncate">Marks Entry Control</h1>
            <p className="text-xs mt-0.5 font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>{govName}</p>
          </div>
          <Link
            href={`/university/governance/invite/${params.govAdd}/${params.govName}/${params.cName}`}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
          >
            <Users size={14} /> Invite
          </Link>
        </div>
      </div>

      {/* Toggle cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Internal */}
        <div className="bg-white rounded-2xl border p-6 flex flex-col gap-4 transition-all" style={{ borderColor: internalToggle ? 'rgba(62,104,252,0.25)' : '#f0f0f0' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: internalToggle ? 'rgba(62,104,252,0.1)' : '#f9fafb' }}>
              <ClipboardEdit size={20} style={{ color: internalToggle ? '#3E68FC' : '#9ca3af' }} />
            </div>
            <Toggle checked={internalToggle} onChange={handleInternal} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base">Internal Marks Entry</h3>
            <p className="text-sm text-gray-400 mt-1">Allow graders to enter internal assessment marks for this governance.</p>
          </div>
          <div className="pt-3 flex items-center gap-2" style={{ borderTop: '1px solid #f0f0f0' }}>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={internalToggle
                ? { background: 'rgba(74,222,128,0.1)', color: '#15803d', border: '1px solid rgba(74,222,128,0.2)' }
                : { background: '#f3f4f6', color: '#9ca3af', border: '1px solid #e5e7eb' }}
            >
              {internalToggle ? '● Open' : '○ Closed'}
            </span>
          </div>
        </div>

        {/* External */}
        <div className="bg-white rounded-2xl border p-6 flex flex-col gap-4 transition-all" style={{ borderColor: externalToggle ? 'rgba(62,104,252,0.25)' : '#f0f0f0' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: externalToggle ? 'rgba(62,104,252,0.1)' : '#f9fafb' }}>
              <ClipboardEdit size={20} style={{ color: externalToggle ? '#3E68FC' : '#9ca3af' }} />
            </div>
            <Toggle checked={externalToggle} onChange={handleExternal} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base">External Marks Entry</h3>
            <p className="text-sm text-gray-400 mt-1">Allow graders to enter external examination marks for this governance.</p>
          </div>
          <div className="pt-3 flex items-center gap-2" style={{ borderTop: '1px solid #f0f0f0' }}>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={externalToggle
                ? { background: 'rgba(74,222,128,0.1)', color: '#15803d', border: '1px solid rgba(74,222,128,0.2)' }
                : { background: '#f3f4f6', color: '#9ca3af', border: '1px solid #e5e7eb' }}
            >
              {externalToggle ? '● Open' : '○ Closed'}
            </span>
          </div>
        </div>

      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Page;
