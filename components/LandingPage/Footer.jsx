'use client';
import React from 'react';
import Link from 'next/link';
import { GraduationCap, Github, Linkedin, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Top CTA strip */}
      <div style={{ background: '#1e3a8a', padding: '36px 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Start issuing verifiable credentials today.</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>No setup fee. Free for pilot universities during beta.</p>
          </div>
          <Link
            href="/university/login"
            style={{ background: '#fff', color: '#1e3a8a', padding: '13px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Register Your University →
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          {/* Brand */}
          <div className="md:w-4/12">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#3E68FC,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em', color: '#fff', fontSize: 20, fontWeight: 700 }}>
                SOUL<span style={{ color: '#6B8EFF' }}>DEM</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, fontSize: 14, maxWidth: 280 }}>
              Decentralised academic credential management for modern universities. Built on Polygon and Ethereum.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Twitter,  href: '#' },
                { icon: Github,   href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(62,104,252,0.5)'; e.currentTarget.style.color = '#6B8EFF'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Product</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Features',    href: '/features' },
                  { label: 'Whitepaper',  href: '/pageUnderConstruction' },
                  { label: 'Roadmap',     href: '/pageUnderConstruction' },
                  { label: 'Changelog',   href: '/pageUnderConstruction' },
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Company</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'About',    href: '/aboutUs' },
                  { label: 'Blog',     href: '/pageUnderConstruction' },
                  { label: 'Help',     href: '/helpdesk' },
                  { label: 'Contact',  href: '/pageUnderConstruction' },
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, transition: 'color 0.15s' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Legal</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Privacy Policy',  href: '/privacy-policy' },
                  { label: 'Terms of Service', href: '/terms-and-conditions' },
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, transition: 'color 0.15s' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24 }}>
                <h4 style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Contact</h4>
                <div className="flex flex-col gap-2.5">
                  <a href="mailto:souldem@org" style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}>
                    <Mail size={12} /> souldem@org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }} className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 13 }}>© {new Date().getFullYear()} Souldem. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 13 }}>Built on Polygon & Ethereum · Powered by IPFS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
