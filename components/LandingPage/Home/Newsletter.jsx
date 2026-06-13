import React from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #0F1628 0%, #0A0E1A 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="py-24 md:py-32"
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(62,104,252,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <span
          style={{
            background: 'rgba(62,104,252,0.12)',
            border: '1px solid rgba(62,104,252,0.25)',
            color: '#6B8EFF',
          }}
          className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
        >
          Stay Updated
        </span>

        <h2
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em', color: '#fff' }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          The future of credentials
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #3E68FC, #6B8EFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            in your inbox
          </span>
        </h2>

        <p style={{ color: 'rgba(255,255,255,0.45)' }} className="text-base md:text-lg mb-10">
          Get product updates, blockchain education news, and early access to new features — directly from the Souldem team.
        </p>

        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '6px',
            gap: '8px',
            maxWidth: '480px',
            margin: '0 auto',
          }}
          className="flex-col sm:flex-row"
        >
          <input
            type="email"
            placeholder="your@university.edu"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '14px',
              padding: '10px 16px',
            }}
          />
          <button
            style={{
              background: 'linear-gradient(135deg, #3E68FC 0%, #6B8EFF 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 22px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 16px rgba(62,104,252,0.35)',
            }}
          >
            <Send size={14} />
            Subscribe
          </button>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.25)' }} className="text-xs mt-5 max-w-sm mx-auto leading-relaxed">
          No spam. Unsubscribe anytime. Protected by reCAPTCHA and subject to our Privacy Policy.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
