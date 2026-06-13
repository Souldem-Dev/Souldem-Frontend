'use client';
import React, { useState } from 'react';
import { CirclePlus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MODES = [
  { key: 'new',    label: 'First Entry',   desc: 'Enter marks for the first time',              color: 'blue'   },
  { key: 'update', label: 'Correct Marks', desc: 'Fix a mistake — overwrites existing marks',   color: 'yellow' },
  { key: 'arrear', label: 'Arrear Re-exam',desc: 'Student re-appeared after failing — increments attempt count', color: 'red' },
];

const MarksTable = ({ formData }) => {
  const { subjectCode, subjectName, selectedOption, maxMark, passMark, govAdd, nonce, semNo } = formData;
  const isInternal = selectedOption === 'internal';
  const typeLabel  = isInternal ? 'Internal' : 'External';

  const [mode, setMode]       = useState('new');
  const [sections, setSections] = useState([
    { name: 'Section 1', rows: [{ marksObtained: '', totalMarks: '' }] },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);

  // Running totals
  const totalObtained = sections.reduce((a, sec) =>
    a + sec.rows.reduce((b, row) => b + (parseFloat(row.marksObtained) || 0), 0), 0);
  const totalPossible = sections.reduce((a, sec) =>
    a + sec.rows.reduce((b, row) => b + (parseFloat(row.totalMarks) || 0), 0), 0);
  const passed    = totalObtained >= passMark;
  const overLimit = maxMark != null && totalObtained > maxMark;
  const totalOverLimit = maxMark != null && totalPossible > maxMark;

  const addSection = () =>
    setSections([...sections, { name: `Section ${sections.length + 1}`, rows: [{ marksObtained: '', totalMarks: '' }] }]);

  const addRow = (si) =>
    setSections(sections.map((s, i) => i === si ? { ...s, rows: [...s.rows, { marksObtained: '', totalMarks: '' }] } : s));

  const deleteRow = (si, ri) =>
    setSections(sections.map((s, i) => i === si ? { ...s, rows: s.rows.filter((_, j) => j !== ri) } : s));

  const deleteSection = (si) =>
    setSections(sections.filter((_, i) => i !== si));

  const updateRow = (si, ri, field, val) =>
    setSections(sections.map((s, i) =>
      i === si ? { ...s, rows: s.rows.map((r, j) => j === ri ? { ...r, [field]: val } : r) } : s));

  const updateSectionName = (si, name) =>
    setSections(sections.map((s, i) => i === si ? { ...s, name } : s));

  const handleSubmit = async () => {
    if (overLimit)           { toast.error(`Total obtained (${totalObtained}) exceeds max (${maxMark})`); return; }
    if (totalOverLimit)      { toast.error(`Section totals (${totalPossible}) exceed max (${maxMark})`); return; }
    if (totalObtained === 0) { toast.error('Enter at least one mark before submitting'); return; }

    setSubmitting(true);
    try {
      const base    = process.env.NEXT_PUBLIC_BACKEND_URL;
      const grader  = localStorage.getItem('userPublicAddress');
      const common  = { governAdd: govAdd, nonce, semesterNo: semNo, graderAdd: grader, subjectName, subjectCode };
      const total   = totalPossible || maxMark;

      if (mode === 'new') {
        if (isInternal) {
          await axios.post(`${base}marksheets/enterInternalMarks`, {
            ...common,
            internalMark: totalObtained, totalInternalMark: total, eachMarkArrInternal: sections,
            externalMark: 0, eachMarkArrExternal: [], totalExternalMark: 0,
          });
        } else {
          await axios.post(`${base}marksheets/enterExternalMark`, {
            ...common,
            externalMark: totalObtained, totalExternalMark: total, eachMarkArrExternal: sections,
          });
        }
      } else if (mode === 'update') {
        if (isInternal) {
          await axios.post(`${base}marksheets/updateInternal`, {
            ...common,
            internalMark: totalObtained, totalInternalMark: total, eachMarkArrInternal: sections,
          });
        } else {
          // external update reuses enterExternalMark (it overwrites)
          await axios.post(`${base}marksheets/enterExternalMark`, {
            ...common,
            externalMark: totalObtained, totalExternalMark: total, eachMarkArrExternal: sections,
          });
        }
      } else if (mode === 'arrear') {
        if (isInternal) {
          await axios.post(`${base}marksheets/arrearUpdate/internal`, {
            ...common,
            internalMark: totalObtained, eachMarkArrInternal: sections,
          });
        } else {
          await axios.post(`${base}marksheets/arrearUpdate/external`, {
            ...common,
            externalMark: totalObtained, totalExternalMark: total, eachMarkArrExternal: sections,
          });
        }
      }

      setDone(true);
      toast.success(`${typeLabel} marks saved — ${totalObtained}/${maxMark}`);
    } catch (err) {
      const msg = err.response?.data?.reason || (typeof err.response?.data === 'string' ? err.response.data : null) || 'Failed to save marks';
      toast.error(msg, { autoClose: 6000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">

      {/* Header — subject + type + limits */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold">{subjectName}
              <span className="ml-2 text-sm font-normal text-para">({subjectCode})</span>
            </h2>
            <p className="text-sm text-para mt-0.5">
              {typeLabel} marks · Nonce <span className="font-mono font-semibold">{nonce}</span> · Sem {semNo}
            </p>
          </div>
          <div className="text-right text-sm">
            <p className="text-para">Max: <span className="font-bold text-black">{maxMark}</span></p>
            <p className="text-green-700">Pass: <span className="font-bold">{passMark}</span></p>
          </div>
        </div>

        {/* Mode selector */}
        <div className="mt-4 flex flex-col gap-1.5">
          <p className="text-xs font-semibold text-para uppercase tracking-wide">Entry type</p>
          <div className="flex gap-2 flex-wrap">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => { setMode(m.key); setDone(false); }}
                className={`flex-1 min-w-[110px] text-left px-3 py-2 rounded-xl border text-xs transition ${
                  mode === m.key
                    ? m.key === 'new'    ? 'bg-blue text-white border-blue'
                    : m.key === 'update' ? 'bg-yellow-500 text-white border-yellow-500'
                                         : 'bg-red-500 text-white border-red-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold">{m.label}</p>
                <p className={`mt-0.5 leading-tight ${mode === m.key ? 'opacity-80' : 'text-gray-400'}`}>{m.desc}</p>
              </button>
            ))}
          </div>
          {mode === 'arrear' && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-1">
              Arrear mode only works if the student genuinely failed this subject. The attempt counter will be incremented.
            </p>
          )}
          {mode === 'update' && (
            <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mt-1">
              Use this to correct a grader mistake. Existing marks will be overwritten.
            </p>
          )}
        </div>

      {/* Live total */}
        <div className={`mt-4 rounded-xl px-4 py-3 flex items-center justify-between text-sm font-medium transition ${
          overLimit ? 'bg-red-50 text-red-700 border border-red-200'
          : passed   ? 'bg-green-50 text-green-700 border border-green-200'
                     : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
        }`}>
          <span className="flex items-center gap-1.5">
            {overLimit ? <XCircle size={15}/> : passed ? <CheckCircle size={15}/> : <XCircle size={15}/>}
            Running total: <strong>{totalObtained}</strong> / {maxMark}
          </span>
          <span>
            {overLimit ? '⚠ Over limit!' : passed ? '✓ Will pass' : `Need ${passMark - totalObtained} more to pass`}
          </span>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-4">
        {sections.map((section, si) => (
          <div key={si} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={section.name}
                onChange={(e) => updateSectionName(si, e.target.value)}
                style={{ fontSize: 13, fontWeight: 600, background: 'transparent', borderBottom: '1px dashed #d1d5db', outline: 'none', width: 160, color: '#111' }}
              />
              <div className="flex gap-1">
                <button
                  onClick={() => addRow(si)}
                  className="flex items-center gap-1 text-xs text-blue border border-blue px-2 py-1 rounded-lg hover:bg-blue/5"
                >
                  <CirclePlus size={12}/> Add row
                </button>
                {sections.length > 1 && (
                  <button
                    onClick={() => deleteSection(si)}
                    className="text-xs text-red-500 border border-red-200 px-2 py-1 rounded-lg hover:bg-red-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Instruction for this section */}
            <p className="text-xs text-para mb-3">
              Enter marks obtained and the total for each question / sub-part in this section.
              Section total must not exceed <strong>{maxMark}</strong> across all sections combined.
            </p>

            <div className="grid grid-cols-[2fr_2fr_auto] gap-2 text-xs text-para font-medium mb-1 px-1">
              <span>Marks obtained</span>
              <span>Out of (section max)</span>
              <span></span>
            </div>

            {section.rows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-[2fr_2fr_auto] gap-2 mb-2 items-center">
                <input
                  type="number"
                  min="0"
                  max={maxMark}
                  placeholder="e.g. 18"
                  value={row.marksObtained}
                  onChange={(e) => updateRow(si, ri, 'marksObtained', e.target.value)}
                  style={{ height: 36, border: '1px solid #e5e7eb', borderRadius: 8, padding: '0 10px', fontSize: 13, background: '#fff', color: '#111', outline: 'none', width: '100%' }}
                />
                <input
                  type="number"
                  min="0"
                  max={maxMark}
                  placeholder={`e.g. ${maxMark}`}
                  value={row.totalMarks}
                  onChange={(e) => updateRow(si, ri, 'totalMarks', e.target.value)}
                  style={{ height: 36, border: '1px solid #e5e7eb', borderRadius: 8, padding: '0 10px', fontSize: 13, background: '#fff', color: '#111', outline: 'none', width: '100%' }}
                />
                <button
                  onClick={() => deleteRow(si, ri)}
                  disabled={section.rows.length === 1}
                  className="p-1.5 text-red-400 hover:text-red-600 disabled:opacity-20"
                >
                  <Trash2 size={15}/>
                </button>
              </div>
            ))}

            <p className="text-xs text-right text-para mt-1">
              Section total: <strong>
                {section.rows.reduce((a, r) => a + (parseFloat(r.marksObtained) || 0), 0)}
              </strong> / {section.rows.reduce((a, r) => a + (parseFloat(r.totalMarks) || 0), 0)}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={addSection}
        className="mt-3 w-full flex items-center justify-center gap-2 border border-dashed border-blue text-blue text-sm py-2.5 rounded-xl hover:bg-blue/5 transition"
      >
        <CirclePlus size={15}/> Add section
      </button>

      <button
        onClick={handleSubmit}
        disabled={submitting || done || overLimit}
        className={`mt-4 w-full py-2.5 rounded-xl font-medium text-sm transition ${
          done        ? 'bg-green-500 text-white'
          : mode === 'update' ? 'bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-40'
          : mode === 'arrear' ? 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-40'
                              : 'bg-blue text-white hover:bg-blue/90 disabled:opacity-40'
        }`}
      >
        {done        ? `✓ Saved — ${totalObtained}/${maxMark}`
        : submitting ? 'Saving…'
        : mode === 'update' ? `Overwrite ${typeLabel} Marks`
        : mode === 'arrear' ? `Submit Arrear ${typeLabel} Marks`
                            : `Save ${typeLabel} Marks`}
      </button>

      <ToastContainer />
    </div>
  );
};

export default MarksTable;
