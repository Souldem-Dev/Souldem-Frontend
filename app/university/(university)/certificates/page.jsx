'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Award, Plus, Palette, MapPin, Building2, Shield, Pencil, CheckCircle2, Loader2 } from 'lucide-react';

const FEATURES = [
  { icon: Palette,   label: 'Custom Colors',       desc: 'Set unique colors for marksheets and provisional certificates.' },
  { icon: MapPin,    label: 'Location Info',        desc: 'Embed your university location into every issued certificate.' },
  { icon: Building2, label: 'Affiliation Details',  desc: 'Specify affiliated university or board on certificates.' },
  { icon: Shield,    label: 'Autonomous / Private', desc: 'Flag your institution type for regulatory compliance.' },
];

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function ColorBlock({ label, hex }) {
  return (
    <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100">
      <div style={{ height: 80, background: hex }} />
      <div className="p-3 bg-white flex flex-col gap-0.5">
        <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
        <p style={{ fontSize: 13, fontFamily: 'monospace', color: '#374151', fontWeight: 600 }}>{hex}</p>
      </div>
    </div>
  );
}

function TemplatePreview({ tmpl }) {
  const msColor = tmpl.marksheetColor   || '#561ecb';
  const pvColor = tmpl.provisionalColor || '#00aaff';

  const badges = [
    tmpl.Autonomous && { label: 'Autonomous', bg: 'rgba(74,222,128,0.12)', color: '#15803d', border: 'rgba(74,222,128,0.3)' },
    tmpl.Private    && { label: 'Private',    bg: 'rgba(251,191,36,0.12)',  color: '#92400e', border: 'rgba(251,191,36,0.3)' },
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* gradient top bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg,${msColor},${pvColor})` }} />

      <div className="p-6 flex flex-col gap-6">

        {/* header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(62,104,252,0.08)' }}>
              <Award size={16} style={{ color: '#3E68FC' }} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Certificate Template</p>
              <p className="text-xs text-gray-400">Applied to all new marksheets</p>
            </div>
          </div>
          <Link
            href="/university/certificates/certificateCreate"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#3E68FC,#5b51f5)' }}
          >
            <Pencil size={13} />Edit
          </Link>
        </div>

        {/* 2-col layout: details left, colors right */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Details */}
          <div className="flex-1 flex flex-col">
            {tmpl.universityLoc && <Row label="Location" value={tmpl.universityLoc} />}
            {tmpl.AffliatedTo   && <Row label="Affiliated To" value={tmpl.AffliatedTo} />}
            <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>Institution Type</span>
              <div className="flex gap-1.5">
                {badges.length > 0 ? badges.map(b => (
                  <span key={b.label} className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}` }}>
                    <CheckCircle2 size={10} />{b.label}
                  </span>
                )) : (
                  <span className="text-xs text-gray-400 font-medium">Government / Affiliated</span>
                )}
              </div>
            </div>
          </div>

          {/* Color swatches */}
          <div className="flex gap-3 lg:w-64 shrink-0">
            <ColorBlock label="Marksheet" hex={msColor} />
            <ColorBlock label="Provisional" hex={pvColor} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const [template, setTemplate] = useState(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) { setLoading(false); return; }
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}marksheets/getMarksheetTemplate/${encodeURIComponent(email)}`)
      .then(res => setTemplate(res.data?.dt || null))
      .catch(() => setTemplate(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)' }}>
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Award size={26} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>University</p>
            <h1 className="text-2xl font-bold text-white">Certificate Template</h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Configure how your institution's marksheets and certificates are generated on-chain.
            </p>
          </div>
          <Link
            href="/university/certificates/certificateCreate"
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
          >
            <Plus size={16} />{template ? 'Edit Template' : 'Configure'}
          </Link>
        </div>
      </div>

      {/* Template preview or empty state */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-14 flex flex-col items-center gap-3">
          <Loader2 size={22} className="animate-spin text-gray-300" />
          <p className="text-sm text-gray-400">Loading template…</p>
        </div>
      ) : template ? (
        <TemplatePreview tmpl={template} />
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-14 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(62,104,252,0.06)' }}>
            <Award size={28} style={{ color: 'rgba(62,104,252,0.35)' }} />
          </div>
          <p className="font-semibold text-gray-600 text-base">No template configured yet</p>
          <p className="text-sm text-gray-400 mt-1 mb-6 max-w-xs mx-auto">
            Set up your certificate template once — it will be applied to all marksheets issued by your institution.
          </p>
          <Link
            href="/university/certificates/certificateCreate"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)' }}
          >
            <Plus size={15} /> Set Up Template
          </Link>
        </div>
      )}

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {FEATURES.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(62,104,252,0.08)' }}>
              <Icon size={18} style={{ color: '#3E68FC' }} />
            </div>
            <p className="font-semibold text-sm text-gray-800">{label}</p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
