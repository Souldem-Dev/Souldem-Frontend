'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Lock, Check, BookOpen, CheckCircle2 } from 'lucide-react';

const Page = () => {
  const params  = useParams();
  const govAdd  = params.govAdd;
  const govName = decodeURIComponent(params.govname || '');
  const cName   = decodeURIComponent(params.cName   || '');

  const [catalogue,   setCatalogue]   = useState({ subjects: [], exists: false });
  const [picked,      setPicked]      = useState(new Set());
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [email,       setEmail]       = useState('');
  const [alreadySaved, setAlreadySaved] = useState(false);

  useEffect(() => {
    const e = localStorage.getItem('userEmail') || '';
    setEmail(e);
    (async () => {
      try {
        const catRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/catalogue/${govAdd}`);
        setCatalogue(catRes.data);
        const initial = new Set();
        (catRes.data.subjects || []).forEach((s) => { if (s.isMandatory) initial.add(s.subjectId); });
        if (e) {
          try {
            const mineRes = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/getMappedSubject/viaMail/${govAdd}/${e}`
            );
            const mine = mineRes.data?.subjectChoosed || [];
            if (mine.length > 0) {
              setAlreadySaved(true);
              const codes = new Set(mine.map((m) => m.subjectCode));
              (catRes.data.subjects || []).forEach((s) => { if (codes.has(s.subjectCode)) initial.add(s.subjectId); });
            }
          } catch (_) {}
        }
        setPicked(initial);
      } catch {
        toast.error('Failed to load subject catalogue');
      } finally {
        setLoading(false);
      }
    })();
  }, [govAdd]);

  const toggle = (id, isMandatory) => {
    if (isMandatory) return;
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const onSave = async () => {
    if (picked.size === 0) { toast.error('Pick at least one subject'); return; }
    setSubmitting(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/pick`, {
        email, governAdd: govAdd, subjectIds: [...picked],
      });
      toast.success(`Saved ${res.data.count} subject(s)`);
      setAlreadySaved(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const mandatory = (catalogue.subjects || []).filter((s) => s.isMandatory);
  const elective  = (catalogue.subjects || []).filter((s) => !s.isMandatory);

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">

      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)' }}>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <BookOpen size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {cName}
            </p>
            <h1 className="text-xl font-bold text-white leading-tight">{govName}</h1>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Pick the subjects you'll be taking. Mandatory subjects are pre-selected.
            </p>
          </div>
          {picked.size > 0 && (
            <div className="ml-auto shrink-0 text-center">
              <p className="text-3xl font-bold text-white leading-none">{picked.size}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>selected</p>
            </div>
          )}
        </div>
      </div>

      {/* Already saved notice */}
      {alreadySaved && (
        <div className="flex items-center gap-3 rounded-xl px-4 py-2.5" style={{ background: 'rgba(62,104,252,0.07)', border: '1px solid rgba(62,104,252,0.2)' }}>
          <CheckCircle2 size={15} className="text-blue shrink-0" />
          <p className="text-sm" style={{ color: '#3E68FC' }}>You've already picked subjects. Update your selection below.</p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl animate-pulse bg-white" />
          ))}
        </div>
      ) : !catalogue.exists || catalogue.subjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-amber-100 p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
            <BookOpen size={20} className="text-amber-400" />
          </div>
          <p className="font-semibold text-gray-700">Catalogue not ready</p>
          <p className="text-sm text-gray-400 mt-1">Your HOD hasn't created the subject catalogue yet. Check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

          {/* Subject list — spans 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-3">

            {mandatory.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Mandatory</p>
                <div className="flex flex-col gap-2">
                  {mandatory.map((s) => (
                    <div
                      key={s.subjectId}
                      className="bg-white rounded-2xl border px-5 py-4 flex items-start gap-4"
                      style={{ borderColor: 'rgba(74,222,128,0.3)' }}
                    >
                      <div className="mt-0.5 w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={3} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-sm text-gray-800">{s.subjectName}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full text-white font-mono" style={{ background: '#3E68FC' }}>{s.subjectCode}</span>
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
                            <Lock size={9} /> required
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Internal {s.internalMark} (pass {s.intPassMark}) · External {s.externalMark} (pass {s.exPassMark}) · Total {s.totalMark}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {elective.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Elective</p>
                <div className="flex flex-col gap-2">
                  {elective.map((s) => {
                    const isPicked = picked.has(s.subjectId);
                    return (
                      <label
                        key={s.subjectId}
                        className="bg-white rounded-2xl border px-5 py-4 flex items-start gap-4 cursor-pointer transition-all"
                        style={{
                          borderColor: isPicked ? '#3E68FC' : '#f0f0f0',
                          background: isPicked ? 'rgba(62,104,252,0.03)' : 'white',
                          boxShadow: isPicked ? '0 0 0 1px rgba(62,104,252,0.15)' : 'none',
                        }}
                      >
                        <div
                          className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                          style={{
                            background: isPicked ? '#3E68FC' : 'rgba(0,0,0,0.04)',
                            border: isPicked ? 'none' : '2px solid #d1d5db',
                          }}
                        >
                          {isPicked && <Check size={13} strokeWidth={3} className="text-white" />}
                        </div>
                        <input
                          type="checkbox"
                          checked={isPicked}
                          onChange={() => toggle(s.subjectId, false)}
                          className="sr-only"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-sm text-gray-800">{s.subjectName}</h3>
                            <span className="text-xs px-2 py-0.5 rounded-full text-white font-mono" style={{ background: '#3E68FC' }}>{s.subjectCode}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">elective</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Internal {s.internalMark} (pass {s.intPassMark}) · External {s.externalMark} (pass {s.exPassMark}) · Total {s.totalMark}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right col — summary + save */}
          <div className="flex flex-col gap-3 lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Your Selection</p>

              <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Mandatory</span>
                  <span className="font-semibold text-gray-800">{mandatory.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Elective picked</span>
                  <span className="font-semibold text-gray-800">{picked.size - mandatory.length}</span>
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-gray-700">Total</span>
                  <span className="text-blue">{picked.size}</span>
                </div>
              </div>

              <button
                onClick={onSave}
                disabled={submitting || picked.size === 0}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)' }}
              >
                {submitting ? 'Saving…' : alreadySaved ? `Update subjects (${picked.size})` : `Save subjects (${picked.size})`}
              </button>
            </div>
          </div>

        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Page;
