'use client';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'react-qr-code';

const MIN_ROWS = 7;
const DISCLAIMER = 'This marksheet is issued via Souldem to blockchain for testing purpose only';

const BORDER = '1px solid #333';

const cell = {
  border: BORDER,
  padding: '4px 7px',
  fontSize: 10,
  verticalAlign: 'middle',
  color: '#111',
};

const labelCell = {
  ...cell,
  fontWeight: 700,
  background: '#f4f4f4',
  whiteSpace: 'nowrap',
  width: 1,
};

const Cert = ({ governAdd, marks = [], cName, gName, studentProfile = {}, template = {}, cid = null }) => {
  const certRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(false);

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
      // Temporarily hide images that could cause CORS taint
      const imgs = el.querySelectorAll('img');
      imgs.forEach(img => img.setAttribute('crossorigin', 'anonymous'));

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      // Use A4 proportions
      const A4_W = 794;
      const A4_H = 1123;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [A4_W, A4_H], hotfixes: ['px_scaling'] });
      const ratio = Math.min(A4_W / canvas.width, A4_H / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      pdf.addImage(imgData, 'PNG', (A4_W - w) / 2, (A4_H - h) / 2, w, h);
      pdf.save(`marksheet-${studentProfile.souldemId || 'certificate'}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      // Fallback: trigger print dialog with PDF destination hint
      window.print();
    } finally {
      setPdfLoading(false);
    }
  };

  const accent   = template?.marksheetColor || '#1a3c8f';
  const gw       = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'gateway.pinata.cloud';

  const resolveIpfs = (cid) =>
    !cid ? null : cid.startsWith('data:') ? cid : `https://${gw}/ipfs/${cid}`;

  const photoUrl  = resolveIpfs(studentProfile?.photoIpfs);
  const logoUrl   = resolveIpfs(template?.logoIpfs);

  const today    = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const verifyUrl = cid
    ? `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/verify?cid=${cid}`
    : null;

  const universityName = template?.universityName || cName || 'SOULDEM UNIVERSITY';
  const collegeName    = cName || '';
  const programName    = gName || 'DEGREE EXAMINATIONS';

  const calculateGrade = (total) =>
    total >= 90 ? 'S'  :
    total >= 80 ? 'A+' :
    total >= 70 ? 'A'  :
    total >= 60 ? 'B+' :
    total >= 50 ? 'B'  :
    total >= 40 ? 'C'  : 'U';

  // Pad to MIN_ROWS with empty rows
  const rows = [...marks];
  while (rows.length < MIN_ROWS) rows.push(null);

  const totalInternal = marks.reduce((s, m) => s + (Number(m.internalMark) || 0), 0);
  const totalExternal = marks.reduce((s, m) => s + (Number(m.externalMark) || 0), 0);
  const grandTotal    = totalInternal + totalExternal;
  const maxMarks      = marks.length * 100;
  const percentage    = maxMarks ? ((grandTotal / maxMarks) * 100).toFixed(2) : '0.00';
  const allPassed     = marks.length > 0 && marks.every(m => (Number(m.internalMark) + Number(m.externalMark)) >= 40);

  const sideDisclaimer = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    pointerEvents: 'none',
    userSelect: 'none',
  };

  const sideText = {
    writingMode: 'vertical-rl',
    fontSize: 8,
    fontWeight: 600,
    color: '#aaa',
    letterSpacing: 1.5,
    whiteSpace: 'nowrap',
    margin: 0,
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
        width: '210mm',
        height: '297mm',
        background: '#ffffff',
        padding: '7mm 18mm',
        boxSizing: 'border-box',
        fontFamily: 'Arial, Helvetica, sans-serif',
        boxShadow: '0 4px 40px rgba(0,0,0,0.14)',
        border: `3px double ${accent}`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        overflow: 'hidden',
      }}>

        {/* ── LEFT SIDE DISCLAIMER ── */}
        <div style={{ ...sideDisclaimer, left: 2 }}>
          <p style={{ ...sideText, transform: 'rotate(180deg)' }}>{DISCLAIMER}</p>
        </div>

        {/* ── RIGHT SIDE DISCLAIMER ── */}
        <div style={{ ...sideDisclaimer, right: 2 }}>
          <p style={{ ...sideText }}>{DISCLAIMER}</p>
        </div>

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: `3px solid ${accent}`, paddingBottom: 8 }}>

          {/* Left: university logo */}
          <div style={{ width: 72, height: 72, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {logoUrl ? (
              <img src={logoUrl} alt="University Logo"
                style={{ width: 72, height: 72, objectFit: 'contain', borderRadius: 4 }} />
            ) : (
              <div style={{ width: 72, height: 72, border: `1.5px solid ${accent}40`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${accent}10` }}>
                <span style={{ fontSize: 22, color: accent, fontWeight: 900 }}>✦</span>
              </div>
            )}
          </div>

          {/* Centre: university info */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 900, color: accent, letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1.2 }}>
              {universityName}
              {template?.universityLoc ? ` — ${template.universityLoc}` : ''}
            </p>
            {template?.AffliatedTo && (
              <p style={{ margin: '2px 0 0', fontSize: 10.5, color: '#444' }}>Affiliated to {template.AffliatedTo}</p>
            )}
            <p style={{ margin: '5px 0 2px', fontSize: 13, fontWeight: 700, color: '#111', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {programName.toUpperCase()} — DEGREE EXAMINATIONS
            </p>
            <div style={{ display: 'inline-block', background: accent, color: '#fff', padding: '3px 28px', fontWeight: 800, fontSize: 13, letterSpacing: 4, marginTop: 4 }}>
              GRADE SHEET
            </div>
          </div>

          {/* Right: photo + serial */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {photoUrl ? (
              <img src={photoUrl} alt="Student"
                style={{ width: 70, height: 84, objectFit: 'cover', border: `2px solid ${accent}` }} />
            ) : (
              <div style={{ width: 70, height: 84, border: '1px dashed #aaa', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#aaa', textAlign: 'center' }}>
                Paste<br />Photo
              </div>
            )}
            <p style={{ margin: 0, fontSize: 8.5, color: '#555', textAlign: 'center' }}>
              Sl. No. <strong>{studentProfile?.souldemId?.slice(-6) || '———'}</strong>
            </p>
          </div>
        </div>

        {/* ── STUDENT INFO TABLE ── */}
        <table style={{ width: '100%', borderCollapse: 'collapse', border: BORDER }}>
          <tbody>
            <tr>
              <td style={labelCell}>NAME OF THE STUDENT</td>
              <td style={{ ...cell, fontWeight: 700, textTransform: 'uppercase' }} colSpan={3}>{studentProfile.name || '—'}</td>
              <td style={labelCell}>REGISTER NO.</td>
              <td style={{ ...cell, fontFamily: 'Courier New, monospace', fontWeight: 700 }}>{studentProfile.souldemId || '—'}</td>
            </tr>
            <tr>
              <td style={labelCell}>DATE OF BIRTH</td>
              <td style={cell}>{studentProfile.dob || '—'}</td>
              <td style={labelCell}>GENDER</td>
              <td style={cell}>{studentProfile.gender || '—'}</td>
              <td style={labelCell}>DATE OF ISSUE</td>
              <td style={cell}>{today}</td>
            </tr>
            <tr>
              <td style={labelCell}>FATHER / GUARDIAN</td>
              <td style={{ ...cell, textTransform: 'uppercase' }} colSpan={5}>{studentProfile.fatherName || '—'}</td>
            </tr>
            <tr>
              <td style={labelCell}>NAME OF INSTITUTION</td>
              <td style={{ ...cell, textTransform: 'uppercase' }} colSpan={3}>{collegeName || universityName}</td>
              <td style={labelCell}>PROGRAMME</td>
              <td style={{ ...cell, textTransform: 'uppercase' }}>{programName}</td>
            </tr>
          </tbody>
        </table>

        {/* ── MARKS TABLE ── */}
        <table style={{ width: '100%', borderCollapse: 'collapse', border: BORDER }}>
          <thead>
            <tr style={{ background: accent, color: '#fff' }}>
              {['S.No', 'COURSE TITLE', 'INT', 'EXT', 'TOTAL', 'GRADE', 'RESULT'].map((h, i) => (
                <th key={i} style={{
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '5px 6px', fontSize: 10, fontWeight: 700,
                  textAlign: i === 2 ? 'left' : 'center',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((m, i) => {
              if (!m) {
                // Empty padding row
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f7f8ff' }}>
                    <td style={{ ...cell, textAlign: 'center', color: '#bbb' }}>{String(i + 1).padStart(2, '0')}</td>
                    <td style={{ ...cell, color: '#ccc' }}>—</td>
                    <td style={{ ...cell, textAlign: 'center', color: '#ccc' }}>—</td>
                    <td style={{ ...cell, textAlign: 'center', color: '#ccc' }}>—</td>
                    <td style={{ ...cell, textAlign: 'center', color: '#ccc' }}>—</td>
                    <td style={{ ...cell, textAlign: 'center', color: '#ccc' }}>—</td>
                    <td style={{ ...cell, textAlign: 'center', color: '#ccc' }}>—</td>
                  </tr>
                );
              }
              const total  = (Number(m.internalMark) || 0) + (Number(m.externalMark) || 0);
              const grade  = calculateGrade(total);
              const passed = total >= 40;
              return (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f7f8ff' }}>
                  <td style={{ ...cell, textAlign: 'center' }}>{String(i + 1).padStart(2, '0')}</td>
                  <td style={{ ...cell, textAlign: 'left' }}>{m.subjectName}</td>
                  <td style={{ ...cell, textAlign: 'center' }}>{m.internalMark ?? '—'}</td>
                  <td style={{ ...cell, textAlign: 'center' }}>{m.externalMark ?? '—'}</td>
                  <td style={{ ...cell, textAlign: 'center', fontWeight: 700 }}>{total}</td>
                  <td style={{ ...cell, textAlign: 'center', fontWeight: 800, color: passed ? accent : '#dc2626' }}>{grade}</td>
                  <td style={{ ...cell, textAlign: 'center', fontWeight: 700, fontSize: 10, color: passed ? '#16a34a' : '#dc2626' }}>
                    {passed ? 'PASS' : 'FAIL'}
                  </td>
                </tr>
              );
            })}

            {/* Totals row */}
            <tr style={{ background: '#eef0f8', fontWeight: 700 }}>
              <td colSpan={3} style={{ ...cell, textAlign: 'right', fontSize: 10.5 }}>TOTAL</td>
              <td style={{ ...cell, textAlign: 'center', fontWeight: 800 }}>{totalInternal}</td>
              <td style={{ ...cell, textAlign: 'center', fontWeight: 800 }}>{totalExternal}</td>
              <td style={{ ...cell, textAlign: 'center', fontWeight: 800 }}>{grandTotal}</td>
              <td colSpan={2} style={{ ...cell, textAlign: 'center', color: accent, fontSize: 10.5 }}>{percentage}%</td>
            </tr>
          </tbody>
        </table>

        <p style={{ textAlign: 'center', fontSize: 10, color: '#555', margin: 0, fontStyle: 'italic' }}>
          * * * End of Statement * * *
        </p>

        {/* ── SUMMARY TABLE ── */}
        <table style={{ width: '100%', borderCollapse: 'collapse', border: BORDER, marginTop: 4 }}>
          <thead>
            <tr style={{ background: accent, color: '#fff' }}>
              {['SUBJECTS', 'MAX MARKS', 'MARKS OBTAINED', 'PERCENTAGE', 'STATUS'].map((h, i) => (
                <th key={i} style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '4px 8px', fontSize: 10, fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...cell, textAlign: 'center', fontWeight: 700 }}>{marks.length}</td>
              <td style={{ ...cell, textAlign: 'center' }}>{maxMarks}</td>
              <td style={{ ...cell, textAlign: 'center', fontWeight: 700 }}>{grandTotal}</td>
              <td style={{ ...cell, textAlign: 'center', fontWeight: 700, color: accent }}>{percentage}%</td>
              <td style={{ ...cell, textAlign: 'center', fontWeight: 800, fontSize: 11, color: allPassed ? '#16a34a' : '#dc2626' }}>
                {marks.length === 0 ? '—' : allPassed ? 'PASSED' : 'FAILED'}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── GRADING SCALE + NOTES ── */}
        <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>

          {/* Grade scale table */}
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 5px', fontSize: 9.5, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 0.5 }}>Grading Scale</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: BORDER, fontSize: 9.5 }}>
              <thead>
                <tr style={{ background: accent, color: '#fff' }}>
                  {['Grade', 'Marks Range', 'Performance', 'Points'].map((h, i) => (
                    <th key={i} style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '3px 5px', fontWeight: 700, textAlign: 'center' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['S',  '90 – 100', 'Outstanding',   '10'],
                  ['A+', '80 – 89',  'Excellent',     '9'],
                  ['A',  '70 – 79',  'Very Good',     '8'],
                  ['B+', '60 – 69',  'Good',          '7'],
                  ['B',  '50 – 59',  'Above Average', '6'],
                  ['C',  '40 – 49',  'Pass',          '5'],
                  ['U',  'Below 40', 'Fail',          '0'],
                ].map(([g, r, p, pt], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    <td style={{ ...cell, textAlign: 'center', fontWeight: 800, color: g === 'U' ? '#dc2626' : accent, padding: '3px 5px' }}>{g}</td>
                    <td style={{ ...cell, textAlign: 'center', padding: '3px 5px' }}>{r}</td>
                    <td style={{ ...cell, padding: '3px 5px' }}>{p}</td>
                    <td style={{ ...cell, textAlign: 'center', padding: '3px 5px' }}>{pt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes + verification box */}
          <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: 8 }}>

            {/* Important notes */}
            <div>
              <p style={{ margin: '0 0 5px', fontSize: 9.5, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 0.5 }}>Important Notes</p>
              <div style={{ border: BORDER, padding: '6px 8px', fontSize: 9, color: '#444', lineHeight: 1.7 }}>
                {[
                  'This grade sheet is computer generated and does not require a physical signature.',
                  'Grades are awarded based on continuous assessment (Internal) and end-semester examination (External).',
                  'A minimum of 40 marks out of 100 is required to pass each course.',
                  'This document is blockchain-verified and tamper-proof. Any alteration renders it invalid.',
                  'For re-evaluation or discrepancies, contact the Controller of Examinations within 30 days of issue.',
                ].map((note, i) => (
                  <p key={i} style={{ margin: 0, display: 'flex', gap: 5 }}>
                    <span style={{ fontWeight: 700, color: accent, flexShrink: 0 }}>{i + 1}.</span>
                    {note}
                  </p>
                ))}
              </div>
            </div>

            {/* Blockchain verification strip */}
            <div style={{ border: `1px solid ${accent}30`, borderRadius: 4, padding: '6px 10px', background: `${accent}06`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: 13, lineHeight: 1 }}>⛓</span>
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ margin: 0, fontSize: 8.5, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: 0.5 }}>Blockchain Verified · Souldem Network</p>
                <p style={{ margin: '2px 0 0', fontSize: 8, color: '#666', fontFamily: 'Courier New, monospace', wordBreak: 'break-all' }}>{governAdd}</p>
              </div>
              {verifyUrl && (
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <QRCodeSVG value={verifyUrl} size={52} fgColor={accent} bgColor="transparent" />
                  <p style={{ margin: 0, fontSize: 6.5, color: '#888', textAlign: 'center', letterSpacing: 0.3 }}>Scan to verify</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ── FOOTER / SIGNATURES ── */}
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 9, color: '#888', maxWidth: 180 }}>
            <p style={{ margin: 0, fontSize: 9, color: '#aaa' }}>Medium of Instruction: <strong style={{ color: '#555' }}>ENGLISH</strong></p>
            <p style={{ margin: '4px 0 0', fontSize: 9, color: '#aaa' }}>Issued: <strong style={{ color: '#555' }}>{today}</strong></p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', background: `${accent}10` }}>
              {logoUrl
                ? <img src={logoUrl} alt="seal" style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: '50%' }} />
                : <span style={{ fontSize: 20, color: accent }}>✦</span>}
            </div>
            <p style={{ margin: 0, fontSize: 9, color: '#666' }}>Official Seal</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 180, borderTop: '1.5px solid #333', marginBottom: 5 }} />
            <p style={{ margin: 0, fontWeight: 800, fontSize: 11, textTransform: 'uppercase' }}>Controller of Examinations</p>
            <p style={{ margin: '3px 0 0', fontSize: 9.5, color: '#555', textTransform: 'uppercase' }}>{universityName}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cert;
