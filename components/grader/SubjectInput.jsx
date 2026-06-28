'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarksTable from './MarksTable';
import axios from 'axios';
import { Hash, BookOpen, GraduationCap, ChevronDown, ArrowRight, Info } from 'lucide-react';

const ANIM_CSS = `
@keyframes _slideRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0);    }
}
@keyframes _formShift {
  from { opacity: 0.5; transform: scale(0.97); }
  to   { opacity: 1;   transform: scale(1);    }
}
@keyframes _btnPulse {
  0%   { box-shadow: 0 0 0 0   rgba(62,104,252,0.55); }
  60%  { box-shadow: 0 0 0 12px rgba(62,104,252,0);   }
  100% { box-shadow: 0 0 0 0   rgba(62,104,252,0);    }
}
`;

const inputStyle = {
  height: '44px',
  width: '100%',
  padding: '0 12px',
  fontSize: '14px',
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  outline: 'none',
  color: '#111827',
  appearance: 'none',
  WebkitAppearance: 'none',
};

const SubjectInput = ({ govAdd }) => {
  const [subjects,         setSubjects]         = useState([]);
  const [allNonces,        setAllNonces]        = useState([]);
  const [selectedSubject,  setSelectedSubject]  = useState(null);
  const [nonce,            setNonce]            = useState('');
  const [nonceSuggestions, setNonceSuggestions] = useState([]);
  const [showSuggestions,  setShowSuggestions]  = useState(false);
  const [semNo,            setSemNo]            = useState('');
  const [marksType,        setMarksType]        = useState('internal');
  const [formData,         setFormData]         = useState(null);
  const [loading,          setLoading]          = useState(true);
  const [totalSemesters,   setTotalSemesters]   = useState(null);
  const nonceRef = useRef(null);

  useEffect(() => {
    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/catalogue/${govAdd}`),
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/getAllRandomNum/${govAdd}`),
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/totalSemesters/${govAdd}`),
    ])
      .then(([catRes, nonceRes, semRes]) => {
        setSubjects(catRes.data?.subjects || []);
        setAllNonces((nonceRes.data || []).map((s) => s.randomNum));
        setTotalSemesters(semRes.data?.totalSemesters || null);
      })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, [govAdd]);

  useEffect(() => {
    const handler = (e) => { if (nonceRef.current && !nonceRef.current.contains(e.target)) setShowSuggestions(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNonceChange = (val) => {
    setNonce(val);
    setFormData(null);
    if (!val) { setNonceSuggestions([]); setShowSuggestions(false); return; }
    const matches = allNonces.filter((n) => String(n).startsWith(val));
    setNonceSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const maxMark  = selectedSubject ? (marksType === 'internal' ? selectedSubject.internalMark : selectedSubject.externalMark) : null;
  const passMark = selectedSubject ? (marksType === 'internal' ? selectedSubject.intPassMark   : selectedSubject.exPassMark)   : null;

  const handleLoad = () => {
    if (!nonce)           { toast.error('Enter nonce'); return; }
    if (!selectedSubject) { toast.error('Select a subject'); return; }
    if (!semNo)           { toast.error('Enter semester number'); return; }
    setFormData({
      subjectCode:    selectedSubject.subjectCode,
      subjectName:    selectedSubject.subjectName,
      semNo:          parseInt(semNo),
      nonce:          parseInt(nonce),
      govAdd,
      selectedOption: marksType,
      maxMark,
      passMark,
    });
  };

  const formPanel = (
    <div className="flex flex-col gap-4">
      {/* How-to */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(62,104,252,0.05)', border: '1px solid rgba(62,104,252,0.12)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Info size={13} style={{ color: '#3E68FC' }} />
          <p className="text-xs font-semibold" style={{ color: '#3E68FC' }}>How to enter marks</p>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-xs" style={{ color: 'rgba(62,104,252,0.65)' }}>
          <li>Read the <strong>nonce</strong> from the top of the answer paper</li>
          <li>Select the <strong>subject</strong> printed on the paper</li>
          <li>Enter the <strong>semester</strong> and pick marks type</li>
          <li>Click <strong>Load Marks Entry</strong></li>
        </ol>
      </div>

      {/* Fields */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-5">

        {/* Nonce */}
        <div className="flex flex-col gap-2" ref={nonceRef}>
          <label style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Hash size={10} /> Nonce
            <span style={{ fontWeight: 400, textTransform: 'none', color: '#d1d5db' }}>— from answer paper</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              placeholder="e.g. 48291"
              value={nonce}
              onChange={(e) => handleNonceChange(e.target.value)}
              onFocus={() => nonce && setShowSuggestions(nonceSuggestions.length > 0)}
              style={inputStyle}
              autoComplete="off"
            />
            {showSuggestions && (
              <ul style={{ position: 'absolute', zIndex: 20, top: '48px', left: 0, right: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', maxHeight: '160px', overflowY: 'auto' }}>
                {nonceSuggestions.map((n) => (
                  <li
                    key={n}
                    onMouseDown={() => { setNonce(String(n)); setShowSuggestions(false); setFormData(null); }}
                    style={{ padding: '10px 16px', fontSize: '14px', fontFamily: 'monospace', cursor: 'pointer', color: '#111' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(62,104,252,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6 }}>
            <BookOpen size={10} /> Subject
          </label>
          {loading ? (
            <div style={{ height: 44, borderRadius: 12, background: '#f3f4f6', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ) : subjects.length === 0 ? (
            <div style={{ padding: '10px 12px', fontSize: '12px', color: '#92400e', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12 }}>
              No catalogue — ask HOD to create one first.
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <select
                value={selectedSubject?.subjectCode || ''}
                onChange={(e) => { setSelectedSubject(subjects.find((s) => s.subjectCode === e.target.value) || null); setFormData(null); }}
                style={{ ...inputStyle, paddingRight: 36 }}
              >
                <option value="" disabled>Select subject</option>
                {subjects.map((s) => (
                  <option key={s.subjectCode} value={s.subjectCode}>{s.subjectName} ({s.subjectCode})</option>
                ))}
              </select>
              <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
            </div>
          )}
        </div>

        {/* Semester */}
        <div className="flex flex-col gap-2">
          <label style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6 }}>
            <GraduationCap size={10} /> Semester
          </label>
          {!totalSemesters ? (
            <select disabled style={inputStyle}>
              <option>Loading…</option>
            </select>
          ) : (
            <div style={{ position: 'relative' }}>
              <select
                value={semNo}
                onChange={(e) => { setSemNo(e.target.value); setFormData(null); }}
                style={{ ...inputStyle, paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="" disabled>Select semester</option>
                {Array.from({ length: totalSemesters }, (_, i) => i + 1).map(n => (
                  <option key={n} value={String(n)}>Semester {n}</option>
                ))}
              </select>
              <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
            </div>
          )}
        </div>

        {/* Marks type toggle */}
        <div className="flex flex-col gap-2">
          <label style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Marks Type
          </label>
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 12, padding: 4, gap: 4 }}>
            {['internal', 'external'].map((type) => (
              <button
                key={type}
                onClick={() => { setMarksType(type); setFormData(null); }}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  borderRadius: 9,
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: marksType === type ? '#3E68FC' : 'transparent',
                  color: marksType === type ? '#ffffff' : '#6b7280',
                  boxShadow: marksType === type ? '0 1px 4px rgba(62,104,252,0.3)' : 'none',
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {selectedSubject && (
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <div style={{ flex: 1, textAlign: 'center', fontSize: '12px', background: '#f9fafb', border: '1px solid #f0f0f0', borderRadius: 10, padding: '8px 0' }}>
                Max <strong style={{ color: '#111' }}>{maxMark}</strong>
              </div>
              <div style={{ flex: 1, textAlign: 'center', fontSize: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '8px 0', color: '#15803d' }}>
                Pass <strong>{passMark}</strong>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLoad}
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 12,
            fontSize: '14px',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #3E68FC 0%, #5b51f5 100%)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            animation: '_btnPulse 0.6s ease forwards',
          }}
          onAnimationEnd={e => { e.currentTarget.style.animation = 'none'; }}
        >
          Load Marks Entry <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Inject keyframes once */}
      <style>{ANIM_CSS}</style>

      {!formData ? (
        /* Before load: centred wider form */
        <div style={{ maxWidth: 480, margin: '0 auto', animation: '_formShift 0.3s ease' }}>
          {formPanel}
        </div>
      ) : (
        /* After load: 2-col with animations */
        <div
          className="flex flex-col lg:flex-row gap-5 items-start"
          style={{ animation: '_formShift 0.25s ease' }}
        >
          <div style={{ width: '100%', maxWidth: 360, flexShrink: 0 }}>
            {formPanel}
          </div>
          <div
            className="flex-1 min-w-0"
            style={{ animation: '_slideRight 0.45s cubic-bezier(0.16,1,0.3,1) both' }}
          >
            <MarksTable
              key={`${formData.nonce}-${formData.subjectCode}-${formData.selectedOption}`}
              formData={formData}
            />
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default SubjectInput;
