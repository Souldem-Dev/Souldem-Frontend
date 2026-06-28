'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft, CheckSquare, Send, Loader2,
  CheckCircle2, User, Search, GraduationCap,
} from 'lucide-react';

const inputStyle = {
  height: 44, border: '1px solid #e5e7eb', borderRadius: 12,
  padding: '0 12px', fontSize: 14, background: '#fff', color: '#111', outline: 'none', width: '100%',
};

export default function ApprovalPage() {
  const params  = useParams();
  const router  = useRouter();
  const govAdd  = params.govAdd;
  const govName = decodeURIComponent(params.govName || '');
  const cName   = decodeURIComponent(params.cName   || '');

  const [students,        setStudents]        = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [search,          setSearch]          = useState('');

  const [selected,  setSelected]  = useState(null); // student object
  const [semester,  setSemester]  = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [loading,   setLoading]   = useState(false);
  const [approved,  setApproved]  = useState(new Set()); // emails approved this session

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}become/getAllMemFromGov/stud/${govAdd}`)
      .then((res) => setStudents(res.data || []))
      .catch(() => toast.error('Failed to load students'))
      .finally(() => setLoadingStudents(false));
  }, [govAdd]);

  // Auto-generate receipt number
  useEffect(() => {
    if (!selected || !semester) { setReceiptNo(''); return; }
    const slug = selected.email.split('@')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
    setReceiptNo(`${cName.slice(0, 4).toUpperCase()}-SEM${semester}-${slug}`);
  }, [selected, semester, cName]);

  const selectStudent = (s) => {
    setSelected(s);
    setSemester('');
    setReceiptNo('');
  };

  const handleApprove = async () => {
    if (!selected)  { toast.error('Select a student'); return; }
    if (!semester)  { toast.error('Select a semester'); return; }
    if (!receiptNo) { toast.error('Receipt number is required'); return; }
    setLoading(true);
    try {
      const userMail = localStorage.getItem('userEmail');
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}mail/sendMail/approve/student`,
        {
          domain: {
            name: govName, version: '1',
            chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337'),
            verifyingContract: govAdd,
          },
          student: {
            studentsEmail:   selected.email,
            currentSemester: parseInt(semester),
            receiptNumber:   receiptNo,
            governAdd:       govAdd,
          },
          userMail,
          cName,
        }
      );
      setApproved((prev) => new Set([...prev, selected.email]));
      toast.success(`Mint link sent to ${selected.email}`);
      if (res.data?._devMintUrl) {
        console.log('DEV mint URL:', res.data._devMintUrl);
        toast.info(`DEV: ${res.data._devMintUrl}`, { autoClose: false });
      }
      // Reset form but keep student selected so mentor can approve another semester
      setSemester('');
    } catch (err) {
      const msg = err.response?.data?.reason
        || (typeof err.response?.data === 'string' ? err.response.data : null)
        || err.message || 'Approval failed';
      toast.error(msg, { autoClose: 8000 });
    } finally {
      setLoading(false);
    }
  };

  const filtered = students.filter((s) =>
    !search || s.email?.toLowerCase().includes(search.toLowerCase()) || s.userName?.toLowerCase().includes(search.toLowerCase())
  );

  const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

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
            <CheckSquare size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{cName}</p>
            <h1 className="text-xl font-bold text-white leading-tight">Approve Results</h1>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{govName}</p>
          </div>
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-white leading-none">{students.length}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white leading-none">{approved.size}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Approved today</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2-col layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* Left — student list */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              placeholder="Search student by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 38 }}
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Select a student to approve
              </p>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>{filtered.length} of {students.length}</span>
            </div>

            {loadingStudents ? (
              <div className="p-8 flex justify-center">
                <Loader2 size={20} className="animate-spin text-gray-300" />
              </div>
            ) : students.length === 0 ? (
              <div className="p-10 text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: '#f9fafb' }}>
                  <GraduationCap size={20} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-400">No students have joined yet</p>
                <p className="text-xs text-gray-300 mt-1">Invite students first from the governance page</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No students match "{search}"</div>
            ) : (
              <div className="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
                {filtered.map((s, i) => {
                  const isSelected = selected?.email === s.email;
                  const wasApproved = approved.has(s.email);
                  return (
                    <button
                      key={i}
                      onClick={() => selectStudent(s)}
                      className="w-full text-left px-5 py-3.5 flex items-center gap-4 transition-colors"
                      style={{ background: isSelected ? 'rgba(62,104,252,0.05)' : 'transparent', borderLeft: isSelected ? '3px solid #3E68FC' : '3px solid transparent' }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ background: isSelected ? 'rgba(62,104,252,0.12)' : '#f9fafb', color: isSelected ? '#3E68FC' : '#9ca3af' }}
                      >
                        {(s.userName || s.email || '?').charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">{s.userName || '—'}</p>
                        <p className="text-xs text-gray-400 truncate">{s.email}</p>
                      </div>
                      {wasApproved && (
                        <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(74,222,128,0.1)', color: '#15803d' }}>
                          <CheckCircle2 size={10} />Sent
                        </span>
                      )}
                      {isSelected && !wasApproved && (
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#3E68FC' }} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right — approval panel */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden lg:sticky lg:top-6">

            {!selected ? (
              <div className="p-10 text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(62,104,252,0.06)' }}>
                  <User size={22} style={{ color: 'rgba(62,104,252,0.35)' }} />
                </div>
                <p className="text-sm font-medium text-gray-500">No student selected</p>
                <p className="text-xs text-gray-400">Click a student on the left to begin approval</p>
              </div>
            ) : (
              <>
                {/* Selected student info */}
                <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid #f0f0f0', background: 'rgba(62,104,252,0.03)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: 'rgba(62,104,252,0.12)', color: '#3E68FC' }}>
                    {(selected.userName || selected.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{selected.userName || '—'}</p>
                    <p className="text-xs text-gray-400 truncate">{selected.email}</p>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">

                  {/* Semester pills */}
                  <div className="flex flex-col gap-2">
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Semester</p>
                    <div className="grid grid-cols-4 gap-2">
                      {SEMESTERS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSemester(String(s))}
                          className="py-2 rounded-xl text-sm font-semibold border transition-all"
                          style={semester === String(s)
                            ? { background: 'linear-gradient(135deg,#3E68FC,#5b51f5)', color: '#fff', borderColor: '#3E68FC' }
                            : { background: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Receipt number */}
                  <div className="flex flex-col gap-1.5">
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Receipt No <span style={{ fontWeight: 400, textTransform: 'none', color: '#d1d5db' }}>— auto-generated</span>
                    </p>
                    <input
                      type="text"
                      value={receiptNo}
                      onChange={(e) => setReceiptNo(e.target.value)}
                      placeholder="Select student + semester first"
                      style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 12, background: receiptNo ? '#fff' : '#f9fafb' }}
                    />
                  </div>

                  {/* Approve button */}
                  <button
                    onClick={handleApprove}
                    disabled={loading || !semester}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
                    style={{ background: 'linear-gradient(135deg,#3E68FC,#5b51f5)', border: 'none', cursor: loading || !semester ? 'default' : 'pointer' }}
                  >
                    {loading
                      ? <><Loader2 size={15} className="animate-spin" />Sending…</>
                      : <><Send size={15} />Approve & Send Mint Link</>}
                  </button>

                  {approved.has(selected.email) && (
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
                      <CheckCircle2 size={14} style={{ color: '#15803d', flexShrink: 0 }} />
                      <p className="text-xs font-medium" style={{ color: '#15803d' }}>Mint link sent to this student</p>
                    </div>
                  )}

                  <p className="text-xs text-center text-gray-400">
                    Student receives an email with a link to mint their marksheet on-chain.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}
