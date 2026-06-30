'use client';
import { useState, useEffect } from 'react';
import { Download, Hash, Search, RefreshCw } from 'lucide-react';

export default function StudentNonceTable({ govAdd, govName, cName }) {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [query,   setQuery]   = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '');
      const res  = await fetch(`${base}/subMap/getAllRandomNum/${govAdd}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) throw new Error('Failed to fetch');
      setRows(await res.json());
    } catch (e) {
      setError('Could not load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (govAdd) fetchData(); }, [govAdd]);

  const filtered = rows.filter(r =>
    !query ||
    String(r.regNo    ?? '').toLowerCase().includes(query.toLowerCase()) ||
    String(r.randomNum ?? '').toLowerCase().includes(query.toLowerCase())
  );

  const downloadCsv = () => {
    const header = ['S.No', 'Register Number', 'Nonce'];
    const body   = filtered.map((r, i) => [i + 1, r.regNo ?? '', r.randomNum ?? '']);
    const csv    = [header, ...body]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const a      = Object.assign(document.createElement('a'), {
      href:     URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `nonce-registry-${govAdd.slice(0, 8)}.csv`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #e8eaf0', background: '#fff', boxShadow: '0 2px 16px rgba(62,104,252,0.06)' }}>

      {/* Table header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid #f0f2f8', background: 'linear-gradient(135deg,#f6f8ff 0%,#fff 100%)' }}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#3E68FC,#5b51f5)', color: '#fff' }}>
            <Hash size={16} />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-gray-800 leading-tight">Student Nonce Registry</h2>
            <p className="text-xs text-gray-400 truncate">{govName} · {cName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search…"
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg outline-none"
              style={{ border: '1px solid #e2e6f0', background: '#f9faff', width: 140, color: '#374151' }}
            />
          </div>

          {/* Refresh */}
          <button onClick={fetchData} title="Refresh"
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ border: '1px solid #e2e6f0', background: '#f9faff', color: '#6b7280', cursor: 'pointer' }}>
            <RefreshCw size={13} />
          </button>

          {/* Download */}
          <button onClick={downloadCsv} disabled={loading || rows.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'linear-gradient(135deg,#3E68FC,#5b51f5)', color: '#fff', border: 'none', cursor: loading || rows.length === 0 ? 'default' : 'pointer', opacity: loading || rows.length === 0 ? 0.6 : 1 }}>
            <Download size={12} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f6f8ff' }}>
              <th style={th}>#</th>
              <th style={th}>Register Number</th>
              <th style={th}>Nonce</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: 13 }}>
                  Loading…
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '40px 0', color: '#ef4444', fontSize: 13 }}>
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && filtered.length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: 13 }}>
                  {query ? 'No results match your search.' : 'No students found for this governance.'}
                </td>
              </tr>
            )}
            {!loading && !error && filtered.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafbff', borderBottom: '1px solid #f0f2f8' }}>
                <td style={td}>{i + 1}</td>
                <td style={{ ...td, fontWeight: 600, color: '#1e3a8a', letterSpacing: '0.02em' }}>
                  {r.regNo || <span style={{ color: '#d1d5db' }}>—</span>}
                </td>
                <td style={{ ...td, fontFamily: 'monospace', color: '#374151' }}>
                  {r.randomNum ?? <span style={{ color: '#d1d5db' }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      {!loading && !error && rows.length > 0 && (
        <div className="px-5 py-3 text-xs text-gray-400" style={{ borderTop: '1px solid #f0f2f8' }}>
          Showing {filtered.length} of {rows.length} students
        </div>
      )}
    </div>
  );
}

const th = {
  padding: '10px 16px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  color: '#6b7280',
  borderBottom: '1px solid #e8eaf0',
  whiteSpace: 'nowrap',
};

const td = {
  padding: '11px 16px',
  color: '#374151',
  verticalAlign: 'middle',
};
