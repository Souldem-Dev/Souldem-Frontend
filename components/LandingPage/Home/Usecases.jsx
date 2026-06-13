'use client';
import React from 'react';
import Image from 'next/image';
import case1 from '@/app/assets/LandingPage/Home/usecases/case1.svg';
import case2 from '@/app/assets/LandingPage/Home/usecases/case2.svg';
import case3 from '@/app/assets/LandingPage/Home/usecases/case3.svg';
import case4 from '@/app/assets/LandingPage/Home/usecases/case4.svg';
import case5 from '@/app/assets/LandingPage/Home/usecases/case5.svg';
import case6 from '@/app/assets/LandingPage/Home/usecases/case6.svg';
import { ArrowRight } from 'lucide-react';

const benefits = [
  {
    img: case1,
    title: 'Enhanced Security',
    desc: 'Academic records are stored on immutable blockchains, eliminating the risk of tampering or credential fraud.',
  },
  {
    img: case2,
    title: 'Streamlined Verification',
    desc: 'Employers and institutions verify credentials in seconds — no emails, no phone calls, no waiting.',
  },
  {
    img: case3,
    title: 'Student-Owned Access',
    desc: 'Students hold their own credentials and can share verified records with anyone, anywhere, at any time.',
  },
  {
    img: case4,
    title: 'Decentralized Storage',
    desc: 'Records live on IPFS and public blockchains — no single point of failure, always accessible.',
  },
  {
    img: case5,
    title: 'Real-Time Updates',
    desc: 'Academic record changes propagate on-chain instantly, ensuring the most current information at all times.',
  },
  {
    img: case6,
    title: 'Paperless & Sustainable',
    desc: 'Replace physical documents with cryptographic proofs — reducing waste and administrative overhead.',
  },
];

const Carousel = () => {
  return (
    <section
      style={{ background: '#0A0E1A' }}
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            style={{
              background: 'rgba(62,104,252,0.12)',
              border: '1px solid rgba(62,104,252,0.25)',
              color: '#6B8EFF',
            }}
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
          >
            Why Souldem
          </span>
          <h2
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em', color: '#fff' }}
            className="text-4xl md:text-5xl font-bold"
          >
            Benefits that speak
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #3E68FC, #6B8EFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              for themselves
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '28px',
                transition: 'border-color 0.2s, background 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(62,104,252,0.35)';
                e.currentTarget.style.background = 'rgba(62,104,252,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(62,104,252,0.12)',
                  border: '1px solid rgba(62,104,252,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  overflow: 'hidden',
                }}
              >
                <Image src={b.img} alt={b.title} className="w-7 h-7 object-contain" />
              </div>

              <h3
                style={{ color: '#fff', letterSpacing: '-0.01em' }}
                className="text-lg font-semibold mb-2"
              >
                {b.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.65' }} className="text-sm mb-5">
                {b.desc}
              </p>
              <button
                style={{
                  color: '#6B8EFF',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '13px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                Find out more <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
