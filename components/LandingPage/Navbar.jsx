'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg';
import Link from 'next/link';
import { AlignJustify, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/aboutUs', label: 'About' },
    { href: '/pageUnderConstruction', label: 'Blog' },
    { href: '/pageUnderConstruction', label: 'Whitepaper' },
  ];

  return (
    <>
      <nav
        style={{
          background: scrolled
            ? 'rgba(10,14,26,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}
            className="text-xl font-bold text-white"
          >
            SOUL<span style={{ color: '#3E68FC' }}>DEM</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/university/login"
            className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/university/login"
            style={{
              background: 'linear-gradient(135deg, #3E68FC 0%, #6B8EFF 100%)',
              boxShadow: '0 0 20px rgba(62,104,252,0.35)',
            }}
            className="text-sm text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Launch App
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/80 hover:text-white p-2"
        >
          {mobileOpen ? <X size={20} /> : <AlignJustify size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{ background: 'rgba(10,14,26,0.98)', backdropFilter: 'blur(20px)' }}
          className="fixed inset-0 z-40 flex flex-col pt-20 px-6 md:hidden"
        >
          <ul className="flex flex-col gap-1 mt-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg py-3 px-4 text-white/70 hover:text-white border-b border-white/5 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/university/login"
            onClick={() => setMobileOpen(false)}
            style={{ background: 'linear-gradient(135deg, #3E68FC 0%, #6B8EFF 100%)' }}
            className="mt-8 text-center text-white py-3 rounded-lg font-medium text-base"
          >
            Launch App
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
