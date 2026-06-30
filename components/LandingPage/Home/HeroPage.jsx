import React from 'react';
import Link from 'next/link';
import { Building2, GraduationCap, CheckCircle2, ShieldCheck, Zap, Globe2 } from 'lucide-react';

const HeroPage = () => {
  return (
    <section style={{ paddingTop: 64 }}>

      {/* Announcement bar */}
      <div style={{ background: '#1e3a8a', padding: '10px 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-2">
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500 }}>
            🎓 Blockchain-Verified Academic Credential System for Indian Universities
          </p>
          <div className="flex items-center gap-2">
            <span style={{ background: '#22c55e', width: 7, height: 7, borderRadius: '50%', display: 'inline-block' }} />
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>Live on Polygon Testnet</p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg, #eef2ff 0%, #ffffff 55%, #f0f5ff 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#c7d2fe 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.35, pointerEvents: 'none' }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col items-center text-center">

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #c7d2fe', borderRadius: 999, padding: '7px 18px', marginBottom: 28, boxShadow: '0 1px 6px rgba(99,102,241,0.1)' }}>
            <ShieldCheck size={13} style={{ color: '#3E68FC' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#3730a3', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Tamper-Proof · Instant · Blockchain-Backed</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(38px, 6vw, 74px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.07, letterSpacing: '-0.03em', maxWidth: 820, margin: '0 0 22px' }}>
            Academic Records{' '}
            <span style={{ color: '#3E68FC' }}>You Can Trust.</span>
            <br />
            <span style={{ color: '#1e3a8a' }}>Forever.</span>
          </h1>

          <p style={{ color: '#4b5563', maxWidth: 560, lineHeight: 1.8, fontSize: 18, marginBottom: 40 }}>
            Souldem brings blockchain-verified degrees and marksheets to every university — so employers, institutions, and students all share one source of truth.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <Link
              href="/university/login"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#2d52b8)', color: '#fff', padding: '15px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 4px 18px rgba(30,58,138,0.28)' }}
            >
              <Building2 size={17} /> University Portal
            </Link>
            <Link
              href="/user/login"
              style={{ background: '#fff', color: '#1e3a8a', padding: '15px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, border: '2px solid #c7d2fe', display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
            >
              <GraduationCap size={17} /> User Portal
            </Link>
          </div>

          {/* Trust checkmarks */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-16">
            {[
              'No paperwork required',
              'Instant employer verification',
              '100% tamper-proof records',
              'Student-owned credentials',
            ].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <CheckCircle2 size={15} style={{ color: '#059669', flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: '#374151', fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div style={{ width: '100%', maxWidth: 860, background: 'linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%)', borderRadius: 20, padding: '28px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 20, boxShadow: '0 8px 32px rgba(30,58,138,0.22)' }}>
            {[
              { value: '50,000+', label: 'Credentials Issued' },
              { value: '120+',    label: 'Universities' },
              { value: '< 2 sec', label: 'Verification Speed' },
              { value: '100%',    label: 'Tamper-Proof' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1.1, fontFamily: 'Georgia, serif' }}>{value}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Powered by */}
          <div className="flex items-center gap-6 mt-10 flex-wrap justify-center">
            {[
              { icon: ShieldCheck, label: 'EIP-712 Signed' },
              { icon: Zap,         label: 'Polygon Network' },
              { icon: Globe2,      label: 'IPFS Storage' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon size={14} style={{ color: '#6366f1' }} />
                <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
