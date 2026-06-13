'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, RefreshCw, Users } from 'lucide-react';

const NonceSheet = ({ govAdd, govName }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}subMap/getAllRandomNum/${govAdd}`
      );
      setStudents(res.data || []);
    } catch {
      setError('Failed to load nonce sheet');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [govAdd]);

  const exportCsv = () => {
    if (students.length === 0) return;
    const header = 'Nonce,Reg No,Email';
    const rows   = students.map((s) => `${s.randomNum},${s.regNo},${s.email}`);
    const csv    = [header, ...rows].join('\n');
    const blob   = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement('a');
    a.href       = url;
    a.download   = `nonce-sheet-${govName || govAdd}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-10 bg-white border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-blue" />
          <h2 className="text-lg font-semibold">Student Nonce Sheet</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="flex items-center gap-1.5 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={students.length === 0}
            className="flex items-center gap-1.5 text-sm bg-blue text-white px-3 py-1.5 rounded-lg hover:bg-blue/90 disabled:opacity-40 transition"
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-para text-sm">Loading…</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : students.length === 0 ? (
        <p className="text-para text-sm italic">No students have joined this governance yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-para">
                <th className="pb-2 pr-6 font-medium">Nonce</th>
                <th className="pb-2 pr-6 font-medium">Reg No</th>
                <th className="pb-2 font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 pr-6 font-mono font-semibold text-blue">{s.randomNum}</td>
                  <td className="py-2 pr-6">{s.regNo}</td>
                  <td className="py-2">{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-para mt-3">{students.length} student(s) total</p>
        </div>
      )}
    </div>
  );
};

export default NonceSheet;
