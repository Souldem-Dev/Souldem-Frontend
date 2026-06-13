'use client';
import Image from 'next/image';
import React from 'react';
import Feature1 from '@/app/assets/LandingPage/Home/Features/Feature1.svg';
import Feature2 from '@/app/assets/LandingPage/Home/Features/Feature2.svg';
import Feature3 from '@/app/assets/LandingPage/Home/Features/Feature3.svg';
import Feature4 from '@/app/assets/LandingPage/Home/Features/Feature4.svg';
import Feature5 from '@/app/assets/LandingPage/Home/Features/Feature5.svg';
import { ArrowRight } from 'lucide-react';

const features = [
  {
    img: Feature1,
    title: 'Blockchain-Based Verification',
    summary: 'Every marksheet and degree is written directly onto Polygon or Ethereum — immutable, permanent, and publicly auditable.',
    bullets: [
      'On-chain records eliminate the possibility of forgery',
      'Instant third-party verification without contacting the university',
      'Compliant with emerging digital credential standards',
    ],
  },
  {
    img: Feature2,
    title: 'Digital Transcript Requests',
    summary: 'Students can request, manage, and share their official transcripts entirely online — no paper, no delays.',
    bullets: [
      'Self-service portal available 24/7',
      'Cryptographically signed documents accepted globally',
      'Automated delivery to employers and institutions',
    ],
  },
  {
    img: Feature3,
    title: 'Degree Authentication',
    summary: 'Employers verify degrees in seconds — directly from the chain, with zero reliance on slow intermediaries.',
    bullets: [
      'QR-code and hash-based instant lookup',
      'No registration required for verifiers',
      'Audit trail stored permanently on-chain',
    ],
  },
  {
    img: Feature4,
    title: 'Automated University Processes',
    summary: 'Replace weeks of manual administrative work with smart-contract workflows that run themselves.',
    bullets: [
      'Results published on-chain the moment they\'re approved',
      'Role-based governance: HODs, mentors, graders',
      'EIP-712 signed invites for tamper-proof onboarding',
    ],
  },
  {
    img: Feature5,
    title: 'Tamper-Proof Academic Records',
    summary: 'Once written, no record can be altered, deleted, or backdated — by anyone, including the university.',
    bullets: [
      'Decentralized storage via IPFS & Pinata',
      'Cryptographic hash verification on every document',
      'Student-owned credentials — portable for life',
    ],
  },
];

const Features = () => {
  return (
    <section
      style={{ background: 'linear-gradient(180deg, #0A0E1A 0%, #0F1628 100%)' }}
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <span
            style={{
              background: 'rgba(62,104,252,0.12)',
              border: '1px solid rgba(62,104,252,0.25)',
              color: '#6B8EFF',
            }}
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
          >
            Platform Features
          </span>
          <h2
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em', color: '#fff' }}
            className="text-4xl md:text-5xl font-bold"
          >
            Built for the modern
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #3E68FC, #6B8EFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              academic institution
            </span>
          </h2>
          <p
            style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '480px' }}
            className="mx-auto mt-4 text-base md:text-lg"
          >
            Every feature is designed around trust, transparency, and zero compromise on security.
          </p>
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-28">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
            >
              {/* Image */}
              <div className="w-full md:w-5/12 flex-shrink-0">
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    padding: '24px',
                  }}
                >
                  <Image
                    src={f.img}
                    alt={f.title}
                    className="w-full rounded-xl"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-7/12">
                <div
                  style={{
                    display: 'inline-block',
                    background: 'rgba(62,104,252,0.1)',
                    color: '#6B8EFF',
                    border: '1px solid rgba(62,104,252,0.2)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    padding: '4px 10px',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                  }}
                >
                  0{i + 1}
                </div>
                <h3
                  style={{ fontFamily: 'Georgia, serif', color: '#fff', letterSpacing: '-0.02em' }}
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  {f.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: '1.7' }} className="text-base md:text-lg mb-6">
                  {f.summary}
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#3E68FC',
                          marginTop: '8px',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ color: 'rgba(255,255,255,0.5)' }} className="text-sm">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    border: '1px solid rgba(62,104,252,0.4)',
                    color: '#6B8EFF',
                    background: 'transparent',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(62,104,252,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Learn more <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(62,104,252,0.15) 0%, rgba(107,142,255,0.08) 100%)',
            border: '1px solid rgba(62,104,252,0.25)',
            borderRadius: '20px',
            marginTop: '80px',
          }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12"
        >
          <div>
            <h3
              style={{ fontFamily: 'Georgia, serif', color: '#fff', letterSpacing: '-0.02em' }}
              className="text-2xl md:text-3xl font-bold mb-2"
            >
              Ready to transform your institution?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.45)' }} className="text-base">
              Join 120+ universities already issuing verifiable, blockchain-backed credentials.
            </p>
          </div>
          <button
            style={{
              background: 'linear-gradient(135deg, #3E68FC 0%, #6B8EFF 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 24px rgba(62,104,252,0.4)',
              flexShrink: 0,
            }}
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
