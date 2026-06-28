'use client';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, Fingerprint, Settings2, Lock, Leaf } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    color: '#1e3a8a',
    bg: '#eef2ff',
    title: 'Blockchain-Based Verification',
    desc: 'Every marksheet and degree is written directly onto Polygon — immutable, permanent, and publicly auditable by anyone.',
  },
  {
    icon: FileText,
    color: '#0891b2',
    bg: '#ecfeff',
    title: 'Digital Transcript Requests',
    desc: 'Students request and share official transcripts entirely online. Cryptographically signed documents accepted globally.',
  },
  {
    icon: Fingerprint,
    color: '#7c3aed',
    bg: '#f5f3ff',
    title: 'Degree Authentication',
    desc: 'Employers verify degrees in seconds — directly from the chain, with zero reliance on slow intermediaries or phone calls.',
  },
  {
    icon: Settings2,
    color: '#0f766e',
    bg: '#f0fdfa',
    title: 'Automated Processes',
    desc: 'Role-based governance for HODs, mentors, and graders. Smart-contract workflows replace weeks of manual admin work.',
  },
  {
    icon: Lock,
    color: '#b45309',
    bg: '#fffbeb',
    title: 'Tamper-Proof Records',
    desc: 'Once written, no record can be altered or backdated — by anyone, including the university. Student-owned for life.',
  },
  {
    icon: Leaf,
    color: '#15803d',
    bg: '#f0fdf4',
    title: 'Paperless & Sustainable',
    desc: 'Replace physical documents with cryptographic proofs — reducing waste, costs, and administrative overhead drastically.',
  },
];

const Features = () => {
  return (
    <section style={{ background: '#ffffff', padding: '80px 0 96px' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span style={{ display: 'inline-block', background: '#eef2ff', border: '1px solid #c7d2fe', color: '#4338ca', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 16 }}>
            Platform Features
          </span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Built for the modern academic institution
          </h2>
          <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Every feature is designed around trust, transparency, and zero compromise on security.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 18, padding: '28px 26px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(62,104,252,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 13, background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={22} style={{ color: b.color }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10, lineHeight: 1.35 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div style={{ marginTop: 64, background: 'linear-gradient(135deg,#1e3a8a 0%,#2d52b8 100%)', borderRadius: 20, padding: '40px 48px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, boxShadow: '0 8px 32px rgba(30,58,138,0.22)' }}>
          <div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>Ready to transform your institution?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Join universities already issuing verifiable, blockchain-backed credentials.</p>
          </div>
          <Link
            href="/university/login"
            style={{ background: '#fff', color: '#1e3a8a', padding: '14px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          >
            Get Started Today →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
