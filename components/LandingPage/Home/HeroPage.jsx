import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

const HeroPage = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #0A0E1A 0%, #0F1628 50%, #0A0E1A 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="flex items-center pt-16"
    >
      {/* Ambient glow blobs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(62,104,252,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(107,142,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span
              style={{
                background: 'rgba(62,104,252,0.15)',
                border: '1px solid rgba(62,104,252,0.3)',
                color: '#6B8EFF',
              }}
              className="text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase"
            >
              Blockchain · Education · Web3
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              lineHeight: '1.08',
              letterSpacing: '-0.03em',
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            Academic Records
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #3E68FC 0%, #6B8EFF 60%, #a5bfff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Reimagined.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '560px', lineHeight: '1.7' }}
            className="text-lg md:text-xl mb-10"
          >
            Souldem brings tamper-proof, blockchain-verified credentials to universities — so every degree earned is a degree trusted, forever.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href="/university/login"
              style={{
                background: 'linear-gradient(135deg, #3E68FC 0%, #6B8EFF 100%)',
                boxShadow: '0 0 32px rgba(62,104,252,0.4), 0 4px 16px rgba(0,0,0,0.3)',
              }}
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-base hover:opacity-90 transition-opacity"
            >
              Launch App
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/features"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.75)',
              }}
              className="inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-xl text-base hover:bg-white/5 transition-all"
            >
              Explore Features
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: ShieldCheck, label: 'Tamper-Proof Records' },
              { icon: Zap, label: 'Instant Verification' },
              { icon: Globe, label: 'Polygon & Ethereum' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
              >
                <Icon size={15} style={{ color: '#6B8EFF' }} />
                <span style={{ color: 'rgba(255,255,255,0.6)' }} className="text-sm font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          className="mt-20 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50K+', label: 'Credentials Issued' },
            { value: '120+', label: 'Universities Onboarded' },
            { value: '99.9%', label: 'Uptime Guarantee' },
            { value: '< 2s', label: 'Verification Speed' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                className="text-3xl md:text-4xl font-bold mb-1"
              >
                {value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)' }} className="text-sm">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
