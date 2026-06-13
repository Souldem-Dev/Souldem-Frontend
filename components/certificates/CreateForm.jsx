'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, MapPin, Building2, Palette, CheckCircle2, Loader2, ChevronDown, RefreshCw } from 'lucide-react';

const inputStyle = {
  height: 44, width: '100%', padding: '0 12px', fontSize: 14,
  background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
  outline: 'none', color: '#111827',
};

const labelStyle = {
  fontSize: 11, fontWeight: 600, color: '#9ca3af',
  textTransform: 'uppercase', letterSpacing: '0.06em',
  display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6,
};

const ColorSwatch = ({ label, color, show, onToggle }) => (
  <div className="flex flex-col gap-1.5">
    <p style={labelStyle}><Palette size={10} />{label}</p>
    <button
      type="button"
      onClick={onToggle}
      style={{
        height: 44, width: '100%', borderRadius: 12, border: '1px solid #e5e7eb',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 12px', background: '#fff',
      }}
    >
      <span style={{ width: 22, height: 22, borderRadius: 6, background: color.hex, border: '2px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
      <span style={{ fontSize: 13, fontFamily: 'monospace', color: '#374151', flex: 1, textAlign: 'left' }}>{color.hex}</span>
      <ChevronDown size={14} style={{ color: '#9ca3af', transform: show ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
    </button>
    {show && (
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', marginTop: 4 }}>
        <ColorPicker color={color} onChange={onToggle.setter} width={undefined} height={130} hideInput={['rgb', 'hsv']} />
      </div>
    )}
  </div>
);

const Toggle = ({ checked, onChange, label, desc }) => (
  <div className="flex items-center justify-between gap-4 py-3" style={{ borderBottom: '1px solid #f9fafb' }}>
    <div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
    </div>
    <button
      type="button"
      onClick={onChange}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: checked ? 'linear-gradient(135deg,#3E68FC,#5b51f5)' : '#e5e7eb',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0, padding: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 2, left: checked ? 22 : 2, width: 20, height: 20,
        borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  </div>
);

export default function CreateForm() {
  const [form, setForm] = useState({ email: '', universityLoc: '', AffliatedTo: '', Autonomous: false, Private: false });
  const [loadingTemplate, setLoadingTemplate] = useState(true);

  const [marksheetColor,   setMarksheetColor]   = useColor('hex', '#561ecb');
  const [provisionalColor, setProvisionalColor] = useColor('hex', '#00aaff');
  const [showMarksheet,   setShowMarksheet]   = useState(false);
  const [showProvisional, setShowProvisional] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email') || '';
    if (!email) { setLoadingTemplate(false); return; }
    setForm(f => ({ ...f, email }));
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/getMarksheetTemplate/${encodeURIComponent(email)}`)
      .then(res => {
        const tmpl = res.data?.dt;
        if (!tmpl) return;
        setForm(f => ({
          ...f,
          universityLoc: tmpl.universityLoc || '',
          AffliatedTo:   tmpl.AffliatedTo   || '',
          Autonomous:    tmpl.Autonomous     ?? false,
          Private:       tmpl.Private        ?? false,
        }));
        if (tmpl.marksheetColor)   setMarksheetColor(c   => ({ ...c, hex: tmpl.marksheetColor   }));
        if (tmpl.provisionalColor) setProvisionalColor(c => ({ ...c, hex: tmpl.provisionalColor }));
      })
      .catch(() => {})
      .finally(() => setLoadingTemplate(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/setCertTemplate`, {
        ...form,
        marksheetColor:   marksheetColor.hex,
        provisionalColor: provisionalColor.hex,
      });
      setDone(true);
      toast.success('Certificate template saved!');
    } catch (err) {
      toast.error(err.response?.data?.reason || 'Failed to save template');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingTemplate) return (
    <div className="flex items-center gap-3 py-10 text-gray-400">
      <Loader2 size={18} className="animate-spin" />
      <span className="text-sm">Loading existing template…</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-5 items-start w-full">

      {/* Left col — details */}
      <div className="flex-1 flex flex-col gap-4">

        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Institution Details</p>

          <div className="flex flex-col gap-1.5">
            <p style={labelStyle}><Mail size={10} />University Email <span style={{ fontWeight: 400, textTransform: 'none', color: '#d1d5db' }}>— from your account</span></p>
            <input
              type="email" required readOnly
              value={form.email}
              style={{ ...inputStyle, background: '#f9fafb', color: '#6b7280', cursor: 'default' }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <p style={labelStyle}><MapPin size={10} />University Location</p>
            <input
              type="text" required placeholder="e.g. Chennai, Tamil Nadu"
              value={form.universityLoc}
              onChange={e => setForm(f => ({ ...f, universityLoc: e.target.value }))}
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <p style={labelStyle}><Building2 size={10} />Affiliated To <span style={{ fontWeight: 400, textTransform: 'none', color: '#d1d5db' }}>— optional</span></p>
            <input
              type="text" placeholder="e.g. Anna University"
              value={form.AffliatedTo}
              onChange={e => setForm(f => ({ ...f, AffliatedTo: e.target.value }))}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-1">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Institution Type</p>
          <Toggle
            checked={form.Autonomous} label="Autonomous"
            desc="Institution operates independently of an affiliating university."
            onChange={() => setForm(f => ({ ...f, Autonomous: !f.Autonomous }))}
          />
          <Toggle
            checked={form.Private} label="Private"
            desc="Institution is privately funded (not government-aided)."
            onChange={() => setForm(f => ({ ...f, Private: !f.Private }))}
          />
        </div>
      </div>

      {/* Right col — colors + submit */}
      <div className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col gap-4">

        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Certificate Colors</p>

          <ColorSwatch
            label="Marksheet Color"
            color={marksheetColor}
            show={showMarksheet}
            onToggle={Object.assign(() => setShowMarksheet(v => !v), { setter: setMarksheetColor })}
          />
          <ColorSwatch
            label="Provisional Cert Color"
            color={provisionalColor}
            show={showProvisional}
            onToggle={Object.assign(() => setShowProvisional(v => !v), { setter: setProvisionalColor })}
          />
        </div>

        {/* Preview strip */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-3">
          <div className="flex-1 rounded-xl h-14 flex items-center justify-center text-white text-xs font-semibold" style={{ background: marksheetColor.hex }}>
            Marksheet
          </div>
          <div className="flex-1 rounded-xl h-14 flex items-center justify-center text-white text-xs font-semibold" style={{ background: provisionalColor.hex }}>
            Provisional
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
          onClick={done ? () => setDone(false) : undefined}
          style={{ background: done ? '#22c55e' : 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)', border: 'none', cursor: submitting ? 'default' : 'pointer' }}
        >
          {done       ? <><CheckCircle2 size={15} /> Saved — click to edit again</>
          : submitting ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
          : 'Save Certificate Template'}
        </button>

        <p className="text-xs text-center text-gray-400 -mt-1">
          Changes apply to new certificates only — already-minted marksheets are permanent.
        </p>
      </div>

      <ToastContainer position="bottom-right" />
    </form>
  );
}
