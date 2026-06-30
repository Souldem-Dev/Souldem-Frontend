import React from 'react';
import Link from 'next/link';
import { Building2, GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';

const audiences = [
  {
    icon: Building2,
    color: '#1e3a8a',
    gradient: 'linear-gradient(135deg,#1e3a8a 0%,#2d52b8 100%)',
    title: 'Universities',
    subtitle: 'Full institutional control',
    points: [
      'Deploy your own governance contract',
      'Manage HODs, mentors, graders by role',
      'Issue tamper-proof marksheets & degrees',
      'Update records — audit trail stays on-chain',
    ],
    cta: 'University Portal →',
    href: '/university/login',
    light: false,
  },
  {
    icon: GraduationCap,
    color: '#3E68FC',
    gradient: 'linear-gradient(135deg,#3E68FC 0%,#6366f1 100%)',
    title: 'Students',
    subtitle: 'Own your credentials',
    points: [
      'View all semester marksheets in one place',
      'Download blockchain-verified certificates',
      'Share instantly with employers',
      'Credentials are yours — for life',
    ],
    cta: 'User Portal →',
    href: '/user/login',
    light: false,
  },
  {
    icon: Briefcase,
    color: '#0f766e',
    gradient: 'linear-gradient(135deg,#0f766e 0%,#0d9488 100%)',
    title: 'Employers',
    subtitle: 'Verify in seconds',
    points: [
      'No login or registration required',
      'Scan QR or enter credential hash',
      'Results directly from the blockchain',
      'Zero chance of forged documents',
    ],
    cta: 'Verify a Credential →',
    href: '/verify',
    light: false,
  },
];

const ForWho = () => {
  return (
    <section style={{ background: '#f8faff', padding: '80px 0 96px' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="text-center mb-16">
          <span style={{ display: 'inline-block', background: '#eef2ff', border: '1px solid #c7d2fe', color: '#4338ca', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 16 }}>
            Who Is It For?
          </span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            One platform, three beneficiaries
          </h2>
          <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Souldem serves everyone in the academic trust chain — from issuance to verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.title} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                {/* Top gradient */}
                <div style={{ background: a.gradient, padding: '28px 26px 24px' }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.2)', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={22} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{a.subtitle}</p>
                </div>

                {/* Points */}
                <div style={{ padding: '24px 26px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {a.points.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle2 size={15} style={{ color: a.color, flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ padding: '0 26px 26px' }}>
                  <Link
                    href={a.href}
                    style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 12, fontWeight: 700, fontSize: 14, color: a.color, background: '#f8faff', border: `1.5px solid ${a.color}30` }}
                  >
                    {a.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ForWho;
