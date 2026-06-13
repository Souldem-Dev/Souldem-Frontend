'use client';
import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#080B16',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="md:w-4/12">
            <Link href="/">
              <span
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.03em' }}
                className="text-2xl font-bold text-white"
              >
                SOUL<span style={{ color: '#3E68FC' }}>DEM</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.35)', lineHeight: '1.7' }} className="text-sm mt-4 max-w-xs">
              Decentralized academic credential management for modern universities. Built on Polygon and Ethereum.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(62,104,252,0.4)';
                    e.currentTarget.style.color = '#6B8EFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Product
              </h4>
              <ul className="flex flex-col gap-3">
                {['Features', 'Whitepapers', 'Roadmap', 'Changelog'].map((l) => (
                  <li key={l}>
                    <Link href="/pageUnderConstruction" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Company
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'About', href: '/aboutUs' },
                  { label: 'Blog', href: '/pageUnderConstruction' },
                  { label: 'Get Help', href: '/helpdesk' },
                  { label: 'Contact', href: '/pageUnderConstruction' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', transition: 'color 0.2s' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Legal
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms of Service', href: '/terms-and-conditions' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>
            © {new Date().getFullYear()} Souldem. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>
            souldem@org · Built on Polygon & Ethereum
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
