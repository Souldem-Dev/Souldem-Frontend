'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const BASE  = process.env.NEXT_PUBLIC_BACKEND_URL;
const BLUE  = '#3E68FC';
const BLUE2 = '#5b51f5';

export default function VerifyBox() {
  const searchParams = useSearchParams();
  const cid = searchParams.get('cid');

  const [loading,   setLoading]   = useState(false);
  const [result,    setResult]    = useState(null);
  const [certs,     setCerts]     = useState(null);
  const [error,     setError]     = useState('');
  const [souldemId, setSouldemId] = useState('');

  useEffect(() => {
    if (!cid) return;
    setLoading(true);
    setResult(null);
    axios
      .get(`${BASE}marksheets/verifyCid/${cid}`)
      .then(r => setResult(r.data))
      .catch(() => setResult({ verified: false, reason: 'Verification request failed' }))
      .finally(() => setLoading(false));
  }, [cid]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!souldemId.trim()) return;
    setLoading(true);
    setError('');
    setCerts(null);
    try {
      const r = await axios.get(`${BASE}marksheets/verifyBySouldemId/${souldemId.trim()}`);
      setCerts(r.data);
      if (r.data.length === 0) setError('No certificates found for this Souldem ID.');
    } catch (err) {
      setError(err?.response?.data?.reason || 'Student not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', background: '#f4f6fb', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%', background: `rgba(62,104,252,0.08)`, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: `rgba(91,81,245,0.06)`, filter: 'blur(60px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', padding: '100px 20px 80px' }}>

        {/* ── Hero header ── */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 72, height: 72, borderRadius: 20, marginBottom: 20,
            background: `linear-gradient(135deg, ${BLUE}, ${BLUE2})`,
            boxShadow: `0 8px 32px rgba(62,104,252,0.30)`,
          }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(62,104,252,0.08)', borderRadius: 20, padding: '4px 14px', marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Blockchain Verified</span>
          </div>

          <h1 style={{ margin: '0 0 10px', fontSize: 34, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
            Verify Certificate
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: '#64748b', lineHeight: 1.65, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
            Enter a Souldem ID to check the authenticity of any academic record issued on the blockchain.
          </p>
        </div>

        {/* ── CID mode ── */}
        {cid && (
          <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ height: 5, background: `linear-gradient(90deg, ${BLUE}, ${BLUE2})` }} />
            <div style={{ padding: '40px 36px' }}>

              {loading && (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: '#f0f4ff', marginBottom: 16 }}>
                    <div style={{ width: 30, height: 30, border: `3px solid ${BLUE}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  </div>
                  <p style={{ margin: 0, fontSize: 15, color: '#64748b', fontWeight: 500 }}>Verifying on blockchain…</p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {!loading && result && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 80, height: 80, borderRadius: '50%', marginBottom: 20,
                    background: result.verified ? '#ecfdf5' : '#fef2f2',
                  }}>
                    {result.verified ? (
                      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>

                  <div style={{ display: 'inline-block', borderRadius: 20, padding: '4px 14px', marginBottom: 14, background: result.verified ? '#ecfdf5' : '#fef2f2' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: result.verified ? '#059669' : '#dc2626' }}>
                      {result.verified ? 'Verified on Blockchain' : 'Verification Failed'}
                    </span>
                  </div>

                  <h2 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 800, color: result.verified ? '#064e3b' : '#7f1d1d' }}>
                    {result.verified ? 'Certificate is Authentic' : 'Could Not Verify'}
                  </h2>

                  {result.verified ? (
                    <>
                      <div style={{ background: '#f8fafc', borderRadius: 14, overflow: 'hidden', marginBottom: 28, textAlign: 'left' }}>
                        {[
                          ['Student',   result.studentName],
                          ['College',   result.collegeName],
                          ['Programme', result.governName],
                          ...(result.type === 'marksheet' ? [['Semester', result.semNo]] : []),
                          ['Contract',  result.governAdd, true],
                        ].map(([label, value, mono], i) => (
                          <div key={i} style={{ display: 'flex', padding: '13px 20px', borderTop: i > 0 ? '1px solid #f1f5f9' : 'none', gap: 12 }}>
                            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 90, paddingTop: 1 }}>{label}</span>
                            <span style={{ fontSize: 14, color: '#0f172a', fontWeight: 600, fontFamily: mono ? 'monospace' : 'inherit', wordBreak: 'break-all' }}>{value || '—'}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={
                          result.type === 'provisional'
                            ? `/provisional/${cid}/${encodeURIComponent(result.collegeName)}/${encodeURIComponent(result.governName)}`
                            : `/marksheet/${cid}/${encodeURIComponent(result.collegeName)}/${encodeURIComponent(result.governName)}`
                        }
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          padding: '12px 28px', borderRadius: 12,
                          background: `linear-gradient(135deg,${BLUE},${BLUE2})`,
                          color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                          boxShadow: `0 4px 16px rgba(62,104,252,0.30)`,
                        }}
                      >
                        {result.type === 'provisional' ? 'View Provisional Certificate' : 'View Full Marksheet'}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                      </Link>
                    </>
                  ) : (
                    <p style={{ color: '#b91c1c', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{result.reason}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Search mode ── */}
        {!cid && (
          <>
            <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 32 }}>
              <div style={{ height: 5, background: `linear-gradient(90deg, ${BLUE}, ${BLUE2})` }} />
              <div style={{ padding: '36px 36px 32px' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                      Souldem ID
                    </label>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. SLD-2024-0042"
                        value={souldemId}
                        onChange={e => setSouldemId(e.target.value)}
                        style={{
                          width: '100%', height: 50, paddingLeft: 42, paddingRight: 16,
                          borderRadius: 12, border: '1.5px solid #e2e8f0',
                          fontSize: 15, outline: 'none', color: '#0f172a',
                          background: '#f8fafc', boxSizing: 'border-box',
                          transition: 'border-color 0.15s',
                        }}
                        onFocus={e => e.target.style.borderColor = BLUE}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      height: 50, borderRadius: 12, border: 'none',
                      background: loading ? '#cbd5e1' : `linear-gradient(135deg, ${BLUE}, ${BLUE2})`,
                      color: '#fff', fontWeight: 700, fontSize: 15,
                      cursor: loading ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: loading ? 'none' : `0 4px 16px rgba(62,104,252,0.28)`,
                      transition: 'opacity 0.15s',
                    }}
                  >
                    {loading ? (
                      <>
                        <div style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        Verifying…
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
                        </svg>
                        Verify Certificate
                      </>
                    )}
                  </button>
                </form>

                {error && (
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, background: '#fef2f2', borderRadius: 10, padding: '12px 16px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                    </svg>
                    <p style={{ margin: 0, fontSize: 13, color: '#b91c1c', fontWeight: 500 }}>{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* How it works */}
            {!certs && !error && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { icon: '🆔', title: 'Enter ID', desc: 'Type the student\'s Souldem ID from their marksheet' },
                  { icon: '⛓️', title: 'On-chain Check', desc: 'We query the blockchain contract directly' },
                  { icon: '✅', title: 'Instant Result', desc: 'See verified details or a clear failure reason' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '22px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                    <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{s.title}</p>
                    <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', lineHeight: 1.55 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            {certs && certs.length > 0 && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
                  {certs.length} Certificate{certs.length > 1 ? 's' : ''} Found
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {certs.map((c, i) => (
                    <Link
                      key={i}
                      href={c.semNo === 'Provisional' || c.type === 'provisional'
                        ? `/provisional/${c.ipfsCid}/${encodeURIComponent(c.collegeName)}/${encodeURIComponent(c.governName)}`
                        : `/marksheet/${c.ipfsCid}/${encodeURIComponent(c.collegeName)}/${encodeURIComponent(c.governName)}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        background: '#fff', borderRadius: 16, padding: '18px 20px',
                        textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        border: '1.5px solid transparent', transition: 'border-color 0.15s, box-shadow 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `${BLUE}40`; e.currentTarget.style.boxShadow = `0 4px 20px rgba(62,104,252,0.12)`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(62,104,252,0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: '0 0 2px', fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.collegeName}</p>
                        <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Semester {c.semNo} — {c.governName}</p>
                        <p style={{ margin: 0, fontSize: 11, color: '#cbd5e1', fontFamily: 'monospace' }}>{String(c.ipfsCid).slice(0, 28)}…</p>
                      </div>
                      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#10b981', fontWeight: 700, background: '#ecfdf5', borderRadius: 20, padding: '4px 10px' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.75l6 6 9-13.5"/></svg>
                          Verified
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
