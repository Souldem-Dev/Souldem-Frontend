'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2, Plus, ChevronLeft, BookOpen, Loader2, BookMarked } from 'lucide-react';

const inputStyle = {
  height: 44, border: '1px solid #e5e7eb', borderRadius: 12,
  padding: '0 12px', fontSize: 14, background: '#fff', color: '#111827', outline: 'none', width: '100%',
};

const labelStyle = {
  fontSize: 11, fontWeight: 600, color: '#9ca3af',
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, display: 'block',
};

const ACCENTS = ['#3E68FC', '#7c3aed', '#0891b2', '#0f766e', '#dc2626', '#d97706'];

function StatRow({ label, pass, max }) {
  const pct = max > 0 ? Math.round((pass / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', width: 52, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#f3f4f6' }}>
        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: '#3E68FC' }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#374151', width: 48, textAlign: 'right', flexShrink: 0 }}>{pass}/{max}</span>
    </div>
  );
}

export default function SubjectCataloguePage() {
  const params  = useParams();
  const router  = useRouter();
  const govAdd  = params.govAdd;
  const govName = decodeURIComponent(params.govName || '');
  const cName   = decodeURIComponent(params.cName   || '');

  const [catalogue,  setCatalogue]  = useState({ subjects: [], exists: false, createdByEmail: '' });
  const [loading,    setLoading]    = useState(true);
  const [me,         setMe]         = useState({ email: '', role: 'hod' });
  const [form,       setForm]       = useState({
    subjectName: '', subjectCode: '',
    internalMark: 100, intPassMark: 40,
    externalMark: 100, exPassMark: 40,
    isMandatory: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleting,   setDeleting]   = useState(null);

  useEffect(() => {
    setMe({ email: localStorage.getItem('userEmail') || '', role: 'hod' });
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/catalogue/${govAdd}`);
      setCatalogue(res.data);
    } catch {
      toast.error('Failed to load catalogue');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.subjectName.trim() || !form.subjectCode.trim()) {
      toast.error('Subject name and code are required');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/catalogue`, {
        governAdd: govAdd,
        createdByEmail: me.email,
        createdByRole: me.role,
        subject: form,
      });
      toast.success('Subject added');
      setForm({ ...form, subjectName: '', subjectCode: '' });
      await refresh();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add subject');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (subjectId) => {
    if (!confirm('Delete this subject?')) return;
    setDeleting(subjectId);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/catalogue/${govAdd}/subject/${subjectId}`, {
        data: { email: me.email },
      });
      toast.success('Subject removed');
      await refresh();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const isCreator = !catalogue.exists || catalogue.createdByEmail === me.email;

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)' }}>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative flex items-center gap-4">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <ChevronLeft size={18} />
          </button>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <BookOpen size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{cName}</p>
            <h1 className="text-xl font-bold text-white leading-tight">Subject Catalogue</h1>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{govName}</p>
          </div>
          <div className="hidden md:block text-center shrink-0">
            <p className="text-3xl font-bold text-white leading-none">{loading ? '—' : catalogue.subjects.length}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Subjects</p>
          </div>
        </div>
      </div>

      {/* readonly warning */}
      {!isCreator && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <p className="text-sm text-amber-800">
            View only — this catalogue was created by <span className="font-mono font-semibold">{catalogue.createdByEmail}</span>
          </p>
        </div>
      )}

      {/* 2-col layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* Left — catalogue */}
        <div className="flex-1 flex flex-col gap-3">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {catalogue.subjects.length} Subject{catalogue.subjects.length !== 1 ? 's' : ''} in catalogue
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[1,2,3,4].map(i => <div key={i} className="h-36 rounded-2xl animate-pulse bg-white" />)}
            </div>
          ) : catalogue.subjects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(62,104,252,0.06)' }}>
                <BookMarked size={24} style={{ color: 'rgba(62,104,252,0.3)' }} />
              </div>
              <p className="text-sm font-medium text-gray-500">No subjects yet</p>
              <p className="text-xs text-gray-400 mt-1">Add your first subject using the form</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {catalogue.subjects.map((s, i) => {
                const accent = ACCENTS[i % ACCENTS.length];
                return (
                  <div key={s.subjectId} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
                    <div className="h-1.5" style={{ background: accent }} />
                    <div className="p-4 flex flex-col gap-3 flex-1">

                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-800 text-sm">{s.subjectName}</span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>
                            {s.subjectCode}
                          </span>
                          {!s.isMandatory && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#f3f4f6', color: '#6b7280' }}>
                              Elective
                            </span>
                          )}
                        </div>
                        {isCreator && (
                          <button
                            onClick={() => onDelete(s.subjectId)}
                            disabled={deleting === s.subjectId}
                            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                            style={{ border: '1px solid #fee2e2' }}
                          >
                            {deleting === s.subjectId
                              ? <Loader2 size={12} className="animate-spin text-red-400" />
                              : <Trash2 size={13} className="text-red-400" />}
                          </button>
                        )}
                      </div>

                      {/* Marks breakdown */}
                      <div className="flex flex-col gap-2 pt-2" style={{ borderTop: '1px solid #f3f4f6' }}>
                        <StatRow label="Internal" pass={s.intPassMark}  max={s.internalMark} />
                        <StatRow label="External" pass={s.exPassMark}   max={s.externalMark} />
                        <StatRow label="Total"    pass={s.totalPassMark} max={s.totalMark}   />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right — add form (sticky) */}
        {isCreator && (
          <div className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-6">
            <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4" style={{ borderBottom: '1px solid #f0f0f0', background: 'rgba(62,104,252,0.02)' }}>
                <p className="text-sm font-bold text-gray-800">Add a Subject</p>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the details and click Add</p>
              </div>

              <div className="p-5 flex flex-col gap-4">

                <div>
                  <label style={labelStyle}>Subject Name</label>
                  <input
                    type="text" required placeholder="e.g. Mathematics"
                    value={form.subjectName}
                    onChange={(e) => setForm({ ...form, subjectName: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Subject Code</label>
                  <input
                    type="text" required placeholder="e.g. MTH"
                    value={form.subjectCode}
                    onChange={(e) => setForm({ ...form, subjectCode: e.target.value.toUpperCase() })}
                    style={{ ...inputStyle, fontFamily: 'monospace', textTransform: 'uppercase' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>Internal Max</label>
                    <input type="number" min="0" value={form.internalMark}
                      onChange={(e) => setForm({ ...form, internalMark: +e.target.value })}
                      style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Internal Pass</label>
                    <input type="number" min="0" value={form.intPassMark}
                      onChange={(e) => setForm({ ...form, intPassMark: +e.target.value })}
                      style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>External Max</label>
                    <input type="number" min="0" value={form.externalMark}
                      onChange={(e) => setForm({ ...form, externalMark: +e.target.value })}
                      style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>External Pass</label>
                    <input type="number" min="0" value={form.exPassMark}
                      onChange={(e) => setForm({ ...form, exPassMark: +e.target.value })}
                      style={inputStyle} />
                  </div>
                </div>

                {/* Mandatory toggle */}
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, isMandatory: !f.isMandatory }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl border transition-colors"
                  style={{ borderColor: form.isMandatory ? 'rgba(62,104,252,0.3)' : '#e5e7eb', background: form.isMandatory ? 'rgba(62,104,252,0.04)' : '#fff' }}
                >
                  <span className="text-sm font-medium" style={{ color: form.isMandatory ? '#3E68FC' : '#6b7280' }}>
                    {form.isMandatory ? 'Mandatory' : 'Elective'}
                  </span>
                  <div className="relative shrink-0" style={{ width: 40, height: 22, borderRadius: 11, background: form.isMandatory ? 'linear-gradient(135deg,#3E68FC,#5b51f5)' : '#e5e7eb', transition: 'background 0.2s' }}>
                    <span style={{ position: 'absolute', top: 2, left: form.isMandatory ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </div>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
                  style={{ background: 'linear-gradient(135deg,#3E68FC,#5b51f5)', border: 'none', cursor: submitting ? 'default' : 'pointer' }}
                >
                  {submitting ? <><Loader2 size={15} className="animate-spin" />Adding…</> : <><Plus size={15} />Add Subject</>}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}
