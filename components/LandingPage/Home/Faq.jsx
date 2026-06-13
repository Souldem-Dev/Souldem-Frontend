'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What blockchain networks does Souldem support?',
    a: 'Souldem currently supports Polygon and Ethereum mainnet. Polygon is used for cost-efficient, high-speed credential issuance, while Ethereum provides the highest level of decentralization and trust for premium credentials.',
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
    q: 'Is student data stored on the blockchain?',
    a: 'Personal data is never stored on-chain. Only cryptographic hashes of credential documents are written to the blockchain. The actual documents are stored on IPFS with student-controlled access permissions.',
  },
  {
    q: 'How does Souldem handle universities with existing student management systems?',
    a: 'Souldem offers API integrations and a governance layer that sits alongside existing systems. Universities don\'t need to replace their current infrastructure — Souldem adds a blockchain verification layer on top.',
  },
  {
    q: 'What happens if a student disputes a record?',
    a: 'Mentors can re-issue corrected marksheets with the original record kept as an immutable audit trail. Every edit is signed and timestamped on-chain, so corrections are transparent and disputes can be traced fairly.',
  },
];

const FaqItem = ({ q, a, isOpen, onToggle }) => (
  <div
    style={{
      border: '1px solid',
      borderColor: isOpen ? 'rgba(62,104,252,0.35)' : 'rgba(255,255,255,0.07)',
      borderRadius: '12px',
      background: isOpen ? 'rgba(62,104,252,0.05)' : 'rgba(255,255,255,0.02)',
      transition: 'all 0.2s ease',
      overflow: 'hidden',
    }}
  >
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        background: 'none',
        border: 'none',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span style={{ color: '#fff', fontWeight: 500, fontSize: '15px', lineHeight: '1.5' }}>
        {q}
      </span>
      <span
        style={{
          flexShrink: 0,
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: isOpen ? 'rgba(62,104,252,0.2)' : 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isOpen ? '#6B8EFF' : 'rgba(255,255,255,0.4)',
          transition: 'all 0.2s',
        }}
      >
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </span>
    </button>
    {isOpen && (
      <div style={{ padding: '0 24px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.7' }}>
        {a}
      </div>
    )}
  </div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      style={{ background: '#0A0E1A' }}
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Left: heading */}
          <div className="md:w-5/12 flex-shrink-0">
            <span
              style={{
                background: 'rgba(62,104,252,0.12)',
                border: '1px solid rgba(62,104,252,0.25)',
                color: '#6B8EFF',
              }}
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            >
              FAQ
            </span>
            <h2
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em', color: '#fff' }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Questions
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #3E68FC, #6B8EFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                answered.
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: '1.7' }} className="text-base">
              Can't find what you're looking for? Reach out to our team — we respond within one business day.
            </p>
            <button
              style={{
                marginTop: '24px',
                border: '1px solid rgba(62,104,252,0.35)',
                color: '#6B8EFF',
                background: 'transparent',
                borderRadius: '10px',
                padding: '11px 22px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Contact Support
            </button>
          </div>

          {/* Right: accordion */}
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
