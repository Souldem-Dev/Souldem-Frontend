'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCode } from 'react-qr-code';

const DISCLAIMER = 'This certificate is issued via Souldem to blockchain for testing purpose only';
const BORDER = '1px solid #444';

export default function ProvisionalCert({ ipfsData = {}, studentProfile = {}, template = {}, cName, gName, cid = null }) {
  const certRef = useRef();
  const [pdfLoading,       setPdfLoading]       = useState(false);
  const [resolvedPhotoUrl, setResolvedPhotoUrl] = useState(null);
  const [resolvedLogoUrl,  setResolvedLogoUrl]  = useState(null);

  const handlePrint = useReactToPrint({
    content: () => certRef.current,
    pageStyle: `
      @page { size: A4 portrait; margin: 0; }
      @media print {
        body { margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }
    `,
  });

  const handleDownloadPdf = async () => {
    if (pdfLoading) return;
    setPdfLoading(true);
    try {
      const el = certRef.current;
      el.querySelectorAll('img').forEach(img => img.setAttribute('crossorigin', 'anonymous'));
      const canvas = await html2canvas(el, {
        scale: 2, useCORS: true, allowTaint: true,
        logging: false, scrollX: 0, scrollY: 0, backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      const A4_W = 794, A4_H = 1123;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [A4_W, A4_H], hotfixes: ['px_scaling'] });
      const ratio = Math.min(A4_W / canvas.width, A4_H / canvas.height);
      const w = canvas.width * ratio, h = canvas.height * ratio;
      pdf.addImage(imgData, 'PNG', (A4_W - w) / 2, (A4_H - h) / 2, w, h);
      pdf.save(`provisional-${studentProfile.souldemId || ipfsData.souldemId || 'certificate'}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      window.print();
    } finally {
      setPdfLoading(false);
    }
  };

  const accent = template?.provisionalColor || template?.marksheetColor || '#1a3c8f';
  const gw     = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'gateway.pinata.cloud';

  const unwrapIpfs = (hash, setter) => {
    if (!hash) { setter(null); return; }
    if (hash.startsWith('data:')) { setter(hash); return; }
    fetch(`https://${gw}/ipfs/${hash}`)
      .then(r => r.json())
      .then(json => setter(json?.data || `https://${gw}/ipfs/${hash}`))
      .catch(() => setter(`https://${gw}/ipfs/${hash}`));
  };

  useEffect(() => { unwrapIpfs(studentProfile?.photoIpfs, setResolvedPhotoUrl); }, [studentProfile?.photoIpfs, gw]);
  useEffect(() => { unwrapIpfs(template?.logoIpfs,        setResolvedLogoUrl);  }, [template?.logoIpfs,        gw]);

  const today        = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const verifyUrl = cid
    ? `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/verify?cid=${cid}`
    : null;
  const pronoun      = studentProfile?.gender === 'Female' ? 'Ms.' : 'Mr.';
  const relation     = studentProfile?.gender === 'Female' ? 'daughter' : 'son';

  const universityName = template?.universityName || cName || 'SOULDEM UNIVERSITY';
  const universityLoc  = template?.universityLoc  || '';
  const affiliatedTo   = template?.affiliatedTo   || template?.AffliatedTo || '';
  const studentName    = studentProfile?.name     || '';
  const fatherName     = studentProfile?.fatherName || '';
  const souldemId      = studentProfile?.souldemId || ipfsData?.souldemId || '';
  const degree         = ipfsData?.governanceName || gName || '';
  const batch          = ipfsData?.batch || '';
  const governAdd      = ipfsData?.governAdd || '';

  const sideDisclaimer = {
    position: 'absolute', top: 0, bottom: 0, width: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', pointerEvents: 'none', userSelect: 'none',
  };
  const sideText = {
    writingMode: 'vertical-rl', fontSize: 8, fontWeight: 600,
    color: '#bbb', letterSpacing: 1.5, whiteSpace: 'nowrap', margin: 0,
  };

  return (
    <div style={{ background: '#f5f7ff', minHeight: '100vh', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button onClick={handleDownloadPdf} disabled={pdfLoading}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#fff', background: pdfLoading ? '#9ca3af' : `linear-gradient(135deg,${accent},${accent}cc)`, border: 'none', cursor: pdfLoading ? 'default' : 'pointer', transition: 'background 0.2s' }}>
          {pdfLoading ? '⏳ Generating…' : '↓ Download PDF'}
        </button>
        <button onClick={handlePrint}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
          🖨 Print
        </button>
      </div>

      {/* A4 Document */}
      <div ref={certRef} style={{
        width: '210mm', height: '297mm',
        background: '#ffffff', padding: '8mm 18mm',
        boxSizing: 'border-box',
        fontFamily: 'Georgia, "Times New Roman", serif',
        border: `4px double ${accent}`,
        position: 'relative',
        display: 'flex', flexDirection: 'column', gap: 0,
        boxShadow: '0 4px 40px rgba(0,0,0,0.14)',
        overflow: 'hidden',
      }}>

        {/* Inner border */}
        <div style={{ position: 'absolute', inset: 16, border: `1px solid ${accent}`, opacity: 0.2, pointerEvents: 'none', borderRadius: 2 }} />

        {/* Side disclaimers */}
        <div style={{ ...sideDisclaimer, left: 2 }}>
          <p style={{ ...sideText, transform: 'rotate(180deg)' }}>{DISCLAIMER}</p>
        </div>
        <div style={{ ...sideDisclaimer, right: 2 }}>
          <p style={{ ...sideText }}>{DISCLAIMER}</p>
        </div>

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          {/* Logo */}
          <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: '50%', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${accent}10` }}>
            {resolvedLogoUrl
              ? <img src={resolvedLogoUrl} alt="University Logo" style={{ width: 54, height: 54, objectFit: 'contain', borderRadius: '50%' }} />
              : <span style={{ fontSize: 22, color: accent }}>✦</span>}
          </div>

          {/* University info */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: accent, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {universityName}
            </h1>
            {universityLoc && (
              <p style={{ fontSize: 10, color: '#555', margin: '2px 0 0' }}>{universityLoc}</p>
            )}
            {affiliatedTo && (
              <p style={{ fontSize: 9.5, color: '#777', margin: '1px 0 0' }}>Affiliated to {affiliatedTo}</p>
            )}
          </div>

          {/* Photo */}
          <div style={{ flexShrink: 0 }}>
            {resolvedPhotoUrl ? (
              <img src={resolvedPhotoUrl} alt="Student"
                crossOrigin="anonymous"
                style={{ width: 70, height: 85, objectFit: 'cover', border: `2px solid ${accent}` }} />
            ) : (
              <div style={{ width: 70, height: 85, background: '#f3f4f6', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#aaa', textAlign: 'center' }}>
                Paste<br />Photo
              </div>
            )}
          </div>
        </div>

        {/* Title band */}
        <div style={{ borderTop: `2px solid ${accent}`, borderBottom: `1px solid ${accent}`, padding: '6px 0', marginBottom: 18, textAlign: 'center' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: accent, letterSpacing: 5, margin: 0, textTransform: 'uppercase' }}>
            Provisional Certificate
          </h2>
        </div>

        {/* ── BODY TEXT ── */}
        <div style={{ fontSize: 13.5, lineHeight: 2.2, color: '#1a1a1a', textAlign: 'justify', marginBottom: 22, padding: '0 4mm', flex: 1 }}>
          <p style={{ margin: '0 0 14px' }}>
            This is to certify that{' '}
            <strong>{pronoun} {studentName || '_____________________'}</strong>,{' '}
            {relation} of <strong>{fatherName || '_____________________'}</strong>,{' '}
            bearing Souldem ID{' '}
            <strong style={{ fontFamily: 'Courier New, monospace', letterSpacing: 2 }}>{souldemId || '_______________'}</strong>,{' '}
            was a bonafide student of <strong>{universityName}</strong>.
          </p>
          <p style={{ margin: '0 0 14px' }}>
            {pronoun === 'Ms.' ? 'She' : 'He'} has successfully completed all the requirements for the award of the degree of{' '}
            <strong style={{ textTransform: 'uppercase' }}>{degree || '_____________________'}</strong>{' '}
            {batch ? <>during the academic batch <strong>{batch}</strong></> : ''},
            having passed all prescribed examinations with satisfactory performance.
          </p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#666', fontSize: 12 }}>
            This Provisional Certificate is issued pending the award of the Original Degree Certificate
            and is valid until the same is conferred.
          </p>
        </div>

        {/* ── ACADEMIC DETAILS CARDS ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, padding: '0 4mm' }}>
          {[
            { label: 'PROGRAMME',  value: degree    || '—' },
            { label: 'BATCH',      value: batch     || '—' },
            { label: 'SOULDEM ID', value: souldemId || '—', mono: true },
          ].map(({ label, value, mono }) => (
            <div key={label} style={{ flex: 1, border: BORDER, borderRadius: 4, padding: '7px 10px', background: '#fafafa' }}>
              <p style={{ margin: 0, fontSize: 8.5, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</p>
              <p style={{ margin: '3px 0 0', fontSize: 11.5, fontWeight: 700, color: '#111', fontFamily: mono ? 'Courier New, monospace' : 'inherit', wordBreak: 'break-all' }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── BLOCKCHAIN VERIFICATION ── */}
        {governAdd && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', margin: '0 4mm 20px', border: `1px solid ${accent}30`, borderRadius: 4, background: `${accent}06` }}>
            <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 12 }}>⛓</span>
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ margin: 0, fontSize: 8.5, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: 0.5 }}>Blockchain Verified · Souldem Network</p>
              <p style={{ margin: '1px 0 0', fontSize: 8, color: '#666', fontFamily: 'Courier New, monospace', wordBreak: 'break-all' }}>{governAdd}</p>
            </div>
            {verifyUrl && (
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <QRCode value={verifyUrl} size={52} fgColor={accent} bgColor="transparent" />
                <p style={{ margin: 0, fontSize: 6.5, color: '#888', textAlign: 'center', letterSpacing: 0.3 }}>Scan to verify</p>
              </div>
            )}
          </div>
        )}

        {/* ── IMPORTANT NOTES ── */}
        <div style={{ padding: '0 4mm', marginBottom: 8 }}>
          <p style={{ margin: '0 0 6px', fontSize: 9.5, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'Arial, sans-serif' }}>Important Notes</p>
          <div style={{ border: '1px solid #ccc', padding: '8px 12px', fontSize: 9.5, color: '#555', lineHeight: 1.75, fontFamily: 'Arial, sans-serif' }}>
            {[
              'This Provisional Certificate is issued subject to the approval of the University Board.',
              'This certificate is valid only until the original degree is formally conferred at the convocation.',
              'This document is blockchain-verified via Souldem and is tamper-evident. Any alteration renders it null and void.',
              'In case of discrepancy, the records maintained by the Controller of Examinations shall be treated as final.',
              'This certificate does not confer the right to use the post-nominal letters of the degree until formally awarded.',
            ].map((note, i) => (
              <p key={i} style={{ margin: 0, display: 'flex', gap: 6 }}>
                <span style={{ fontWeight: 700, color: '#666', flexShrink: 0 }}>{i + 1}.</span>
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* ── DECLARATION BAND ── */}
        <div style={{ margin: '0 4mm 10px', border: `1px solid ${accent}22`, borderRadius: 4, background: `${accent}04`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* Big seal */}
          <div style={{ flexShrink: 0, width: 72, height: 72, borderRadius: '50%', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
            {resolvedLogoUrl
              ? <img src={resolvedLogoUrl} alt="seal" style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: '50%' }} />
              : <span style={{ fontSize: 26, color: accent }}>✦</span>}
          </div>
          <div style={{ flex: 1, fontFamily: 'Arial, sans-serif' }}>
            <p style={{ margin: 0, fontSize: 10.5, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Certified by {universityName}
            </p>
            <p style={{ margin: '5px 0 0', fontSize: 9.5, color: '#555', lineHeight: 1.6 }}>
              We hereby certify that the information contained in this document is true and correct to the best of our knowledge
              and belief, as per the records maintained by the Office of the Controller of Examinations.
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 9, color: '#999', fontStyle: 'italic' }}>
              Issued under the authority of the Academic Council · {universityName}
            </p>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 4mm' }}>
          {/* Date + place */}
          <div style={{ fontSize: 12, color: '#444', fontFamily: 'Arial, sans-serif' }}>
            <p style={{ margin: 0 }}>Date: <strong>{today}</strong></p>
            {universityLoc && (
              <p style={{ margin: '3px 0 0', fontSize: 10, color: '#888' }}>Place: {universityLoc.split(',')[0]}</p>
            )}
          </div>

          {/* Official seal */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', background: `${accent}10` }}>
              {resolvedLogoUrl
                ? <img src={resolvedLogoUrl} alt="seal" style={{ width: 46, height: 46, objectFit: 'contain', borderRadius: '50%' }} />
                : <span style={{ fontSize: 18, color: accent }}>✦</span>}
            </div>
            <p style={{ margin: 0, fontSize: 8.5, color: '#666', fontFamily: 'Arial, sans-serif' }}>Official Seal</p>
          </div>

          {/* Signature */}
          <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ width: 160, borderTop: '1.5px solid #333', marginBottom: 5 }} />
            <p style={{ margin: 0, fontWeight: 800, fontSize: 11, textTransform: 'uppercase' }}>Controller of Examinations</p>
            <p style={{ margin: '2px 0 0', fontSize: 9.5, color: '#555', textTransform: 'uppercase' }}>{universityName}</p>
          </div>
        </div>

        {/* Watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%) rotate(-30deg)',
          fontSize: 72, color: accent, opacity: 0.03,
          fontWeight: 900, whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        }}>
          SOULDEM
        </div>
      </div>
    </div>
  );
}
