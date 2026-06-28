'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What blockchain networks does Souldem support?',
    a: 'Souldem currently supports Polygon and Ethereum. Polygon is used for cost-efficient, high-speed credential issuance, while Ethereum provides the highest level of decentralisation and trust for premium credentials.',
  },
  {
    q: 'How long does it take to issue a credential?',
    a: 'Credential issuance typically completes within 2–5 seconds on Polygon. The blockchain confirmation is near-instant, and the credential is immediately verifiable by any employer or institution worldwide.',
  },
  {
    q: 'Can employers verify credentials without creating an account?',
    a: 'Yes. Verification is completely open and requires no sign-up. Any verifier can scan a QR code or enter a credential hash at our public verification portal — zero friction, zero gatekeeping.',
  },
  {
    q: 'Is student personal data stored on the blockchain?',
    a: 'No. Personal data is never stored on-chain. Only cryptographic hashes of credential documents are written to the blockchain. Actual documents are stored on IPFS with student-controlled access permissions.',
  },
  {
    q: 'How does Souldem work alongside existing university systems?',
    a: "Souldem's governance layer sits alongside existing systems. Universities don't need to replace current infrastructure — Souldem adds a blockchain verification layer on top of existing processes.",
  },
  {
    q: 'What happens if a student disputes a record?',
    a: 'Mentors can re-issue corrected marksheets with the original kept as an immutable audit trail. Every correction is signed and timestamped on-chain, so disputes can be traced transparently.',
  },
];

const FaqItem = ({ q, a, isOpen, onToggle }) => (
  <div
    style={{
      border: '1.5px solid',
      borderColor: isOpen ? '#c7d2fe' : '#e5e7eb',
      borderRadius: 14,
      background: isOpen ? '#f8faff' : '#fff',
      transition: 'all 0.2s',
      overflow: 'hidden',
    }}
  >
    <button
      onClick={onToggle}
      style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, cursor: 'pointer', textAlign: 'left' }}
    >
      <span style={{ color: '#0f172a', fontWeight: 600, fontSize: 15, lineHeight: 1.5 }}>{q}</span>
      <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: isOpen ? '#eef2ff' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isOpen ? '#3E68FC' : '#9ca3af', transition: 'all 0.2s' }}>
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </span>
    </button>
    {isOpen && (
      <div style={{ padding: '0 24px 20px', color: '#6b7280', fontSize: 14, lineHeight: 1.8 }}>{a}</div>
    )}
  </div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ background: '#fff', padding: '80px 0 96px' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">

          {/* Left */}
          <div className="md:w-5/12 flex-shrink-0">
            <span style={{ display: 'inline-block', background: '#eef2ff', border: '1px solid #c7d2fe', color: '#4338ca', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 20 }}>
              FAQ
            </span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, lineHeight: 1.15 }}>
              Questions
              <br />
              <span style={{ color: '#3E68FC' }}>answered.</span>
            </h2>
            <p style={{ color: '#6b7280', lineHeight: 1.7, fontSize: 15 }}>
              Can't find what you're looking for? Reach out to our team — we respond within one business day.
            </p>
            <a
              href="/helpdesk"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, border: '1.5px solid #e5e7eb', color: '#374151', background: '#fff', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}
            >
              Contact Support →
            </a>
          </div>

          {/* Right */}
          <div className="md:w-7/12 flex flex-col gap-3">
            {faqs.map((item, i) => (
              <FaqItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
