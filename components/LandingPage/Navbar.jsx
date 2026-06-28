'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlignJustify, X, GraduationCap } from 'lucide-react';

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
    { href: '/helpdesk', label: 'Help' },
  ];

  return (
    <>
      <nav
        style={{
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #1e3a8a, #3E68FC)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(30,58,138,0.3)' }}>
            <GraduationCap size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em', color: '#0f172a' }} className="text-xl font-bold">
            SOUL<span style={{ color: '#3E68FC' }}>DEM</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} style={{ color: '#4b5563', fontSize: 14 }} className="px-4 py-2 rounded-lg hover:text-blue-900 hover:bg-blue-50 transition-all duration-150 block">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/user/login" style={{ color: '#374151', fontSize: 14 }} className="px-4 py-2 hover:text-blue-900 transition-colors">
            Student Login
          </Link>
          <Link
            href="/university/login"
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #2d52b8)', color: '#fff', fontSize: 14, fontWeight: 600, padding: '9px 20px', borderRadius: 9, boxShadow: '0 2px 10px rgba(30,58,138,0.3)' }}
            className="hover:opacity-90 transition-opacity"
          >
            University Portal →
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-600 hover:text-gray-900 p-2">
          {mobileOpen ? <X size={20} /> : <AlignJustify size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ background: '#fff', borderRight: '1px solid #e5e7eb' }} className="fixed inset-0 z-40 flex flex-col pt-20 px-6 md:hidden">
          <ul className="flex flex-col mt-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMobileOpen(false)} style={{ color: '#374151' }} className="block text-base py-3 px-4 border-b border-gray-100 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/user/login" onClick={() => setMobileOpen(false)} style={{ border: '1.5px solid #e5e7eb', color: '#374151' }} className="text-center py-3 rounded-xl font-medium text-sm">
              Student Login
            </Link>
            <Link href="/university/login" onClick={() => setMobileOpen(false)} style={{ background: 'linear-gradient(135deg,#1e3a8a,#2d52b8)', color: '#fff' }} className="text-center py-3 rounded-xl font-semibold text-sm">
              University Portal →
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
