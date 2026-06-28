'use client';
import React from 'react';
import { UserPlus, BookOpen, Award, Search } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: UserPlus,
    title: 'University Registers',
    desc: 'University admin signs up, deploys their smart contract on-chain, and creates a governance for each course batch.',
    color: '#1e3a8a',
  },
  {
    num: '02',
    icon: BookOpen,
    title: 'Students Onboarded',
    desc: 'Students join the governance via signed invite. Mentors and HODs are assigned roles through EIP-712 signed transactions.',
    color: '#2563eb',
  },
  {
    num: '03',
    icon: Award,
    title: 'Records Issued On-Chain',
    desc: 'Marksheets and provisional certificates are minted as IPFS-anchored, blockchain-verified credentials by authorised staff.',
    color: '#3E68FC',
  },
  {
    num: '04',
    icon: Search,
    title: 'Verified Instantly',
    desc: 'Employers, institutions, or anyone can verify any credential in under 2 seconds — no login, no calls, no paperwork.',
    color: '#6366f1',
  },
];

const HowItWorks = () => {
  return (
    <section style={{ background: '#f8faff', padding: '80px 0 96px' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span style={{ display: 'inline-block', background: '#eef2ff', border: '1px solid #c7d2fe', color: '#4338ca', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 16 }}>
            How It Works
          </span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            From Registration to Verification
          </h2>
          <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Four simple steps to transform your institution's credential system.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} style={{ position: 'relative' }}>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block" style={{ position: 'absolute', top: 36, left: 'calc(50% + 48px)', width: 'calc(100% - 48px)', height: 2, background: 'linear-gradient(90deg, #c7d2fe, #e0e7ff)', zIndex: 0 }} />
                )}

                <div style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 20, padding: '28px 24px', position: 'relative', zIndex: 1, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', height: '100%' }}>
                  {/* Number + icon row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 14px ${s.color}35` }}>
                      <Icon size={22} color="#fff" />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#d1d5db', letterSpacing: '0.05em' }}>{s.num}</span>
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
