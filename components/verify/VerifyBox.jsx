'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function VerifyBox() {
  const searchParams = useSearchParams();
  const cid = searchParams.get('cid');

  const [loading, setLoading]   = useState(false);
  const [result,  setResult]    = useState(null);   // CID mode result
  const [certs,   setCerts]     = useState(null);   // search mode results
  const [error,   setError]     = useState('');
  const [souldemId, setSouldemId] = useState('');

  // Auto-verify when ?cid is in the URL
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
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>
        Verify Certificate
      </h1>
      <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 40px' }}>
        Scan the QR code on a marksheet, or enter a Souldem ID to check authenticity.
      </p>

      {/* ── CID MODE ── */}
      {cid && (
        <>
          {loading && (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '48px 0' }}>
              Verifying certificate…
            </p>
          )}

          {!loading && result && (
            <div style={{
              border: `2px solid ${result.verified ? '#16a34a' : '#dc2626'}`,
              borderRadius: 12,
              padding: 32,
              background: result.verified ? '#f0fdf4' : '#fef2f2',
              textAlign: 'center',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: result.verified ? '#16a34a' : '#dc2626',
                color: '#fff', fontSize: 30, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                {result.verified ? '✓' : '✗'}
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: result.verified ? '#15803d' : '#b91c1c' }}>
                {result.verified ? 'Certificate Verified' : 'Verification Failed'}
              </h2>

              {result.verified ? (
                <>
                  <div style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto 28px' }}>
                    <InfoField label="Student"    value={result.studentName} />
                    <InfoField label="College"    value={result.collegeName} />
                    <InfoField label="Programme"  value={result.governName} />
                    <InfoField label="Semester"   value={result.semNo} />
                    <InfoField label="Contract"   value={result.governAdd} mono />
                  </div>
                  <Link
                    href={`/marksheet/${cid}/${encodeURIComponent(result.collegeName)}/${encodeURIComponent(result.governName)}`}
                    style={{
                      display: 'inline-block', padding: '10px 24px',
                      background: '#1a3c8f', color: '#fff',
                      borderRadius: 8, fontWeight: 600, fontSize: 14,
                      textDecoration: 'none',
                    }}
                  >
                    View Full Marksheet →
                  </Link>
                </>
              ) : (
                <p style={{ color: '#b91c1c', fontSize: 14, margin: 0 }}>{result.reason}</p>
              )}
            </div>
          )}
        </>
      )}

      {/* ── SEARCH MODE ── */}
      {!cid && (
        <>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Souldem ID
            </label>
            <input
              type="text"
              placeholder="e.g. SLD-2024-0042"
              value={souldemId}
              onChange={e => setSouldemId(e.target.value)}
              style={{
                padding: '10px 14px', borderRadius: 8,
                border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 24px', background: loading ? '#9ca3af' : '#1a3c8f',
                color: '#fff', border: 'none', borderRadius: 8,
                fontWeight: 600, fontSize: 14, cursor: loading ? 'default' : 'pointer',
              }}
            >
              {loading ? 'Searching…' : 'Verify'}
            </button>
          </form>

          {error && (
            <p style={{ color: '#dc2626', fontSize: 14, margin: '16px 0 0' }}>{error}</p>
          )}

          {certs && certs.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
              marginTop: 32,
            }}>
              {certs.map((c, i) => (
                <Link
                  key={i}
                  href={`/marksheet/${c.ipfsCid}/${encodeURIComponent(c.collegeName)}/${encodeURIComponent(c.governName)}`}
                  style={{
                    display: 'block', border: '1.5px solid #e5e7eb',
                    borderRadius: 10, padding: 20, textDecoration: 'none',
                    background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {c.collegeName}
                  </p>
                  <p style={{ margin: '4px 0 6px', fontSize: 15, fontWeight: 700, color: '#111' }}>
                    Semester {c.semNo} — {c.governName}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', fontFamily: 'Courier New, monospace' }}>
                    {String(c.ipfsCid).slice(0, 24)}…
                  </p>
                  <span style={{ marginTop: 10, display: 'inline-block', fontSize: 13, color: '#2563eb', fontWeight: 600 }}>
                    View Marksheet →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function InfoField({ label, value, mono }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</p>
      <p style={{
        margin: 0, fontSize: 14, fontWeight: 600, color: '#111',
        fontFamily: mono ? 'Courier New, monospace' : 'inherit',
        wordBreak: 'break-all',
      }}>
        {value || '—'}
      </p>
    </div>
  );
}
