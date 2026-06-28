'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Building2, Save, CheckCircle2, Mail, Camera } from 'lucide-react';

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function UniversityProfilePage() {
  const [univ,         setUniv]         = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [saved,        setSaved]        = useState(false);
  const [form,         setForm]         = useState({ universityName: '', address: '', affiliatedTo: '', institutionType: '' });
  const [email,        setEmail]        = useState('');
  const [logoPreview,  setLogoPreview]  = useState(null);
  const [uploading,    setUploading]    = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    const mail = localStorage.getItem('email') || '';
    setEmail(mail);
    if (!mail) { setLoading(false); return; }
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}university/profile/${mail}`)
      .then(res => {
        setUniv(res.data);
        setForm({
          universityName:  res.data.universityName  || '',
          address:         res.data.address         || '',
          affiliatedTo:    res.data.affiliatedTo    || '',
          institutionType: res.data.institutionType || '',
        });
        if (res.data.logoIpfs) {
          const p  = res.data.logoIpfs;
          const gw = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'gateway.pinata.cloud';
          setLogoPreview(p.startsWith('data:') ? p : `https://${gw}/ipfs/${p}`);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!email) return;
    setSaving(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}university/profile/update`, { email, ...form });
      setUniv(res.data);
      setSaved(true);
      toast.success('Profile updated!');
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      toast.error(err.response?.data?.reason || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setLogoPreview(base64);
      setUploading(true);
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}university/profile/uploadLogo`, { email, logoBase64: base64 });
        setUniv(res.data);
        toast.success('Logo updated!');
      } catch {
        toast.error('Logo upload failed');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const inputStyle = {
    height: 44, padding: '0 14px', borderRadius: 10,
    border: '1.5px solid #ebebeb', fontSize: 14, color: '#111827',
    background: '#fff', outline: 'none', width: '100%',
    transition: 'border-color .15s, box-shadow .15s', fontFamily: 'inherit',
  };
  const focus = e => { e.target.style.borderColor = '#3E68FC'; e.target.style.boxShadow = '0 0 0 3px rgba(62,104,252,0.08)'; };
  const blur  = e => { e.target.style.borderColor = '#ebebeb'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{ padding: '28px 32px', width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Left: Identity card */}
        <div style={{ width: 240, flexShrink: 0, borderRadius: 20, overflow: 'hidden', background: '#fff', border: '1px solid #ebebeb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

          {/* Gradient top */}
          <div style={{ height: 90, background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          </div>

          {/* Logo overlapping */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px 24px', marginTop: -44 }}>
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  width: 88, height: 88, borderRadius: 20,
                  border: '3px solid #fff',
                  background: 'linear-gradient(135deg,#3E68FC,#5b51f5)',
                  overflow: 'hidden', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(62,104,252,0.25)',
                }}
              >
                {logoPreview
                  ? <img src={logoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Building2 size={32} color="#fff" />}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                title="Upload logo"
                style={{
                  position: 'absolute', bottom: -6, right: -6,
                  width: 26, height: 26, borderRadius: '50%',
                  background: uploading ? 'rgba(255,255,255,0.5)' : '#fff',
                  border: '1.5px solid #ebebeb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                <Camera size={13} color="#3E68FC" />
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoChange} />

            <p style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: '#111827', textAlign: 'center', lineHeight: 1.3 }}>
              {form.universityName || 'University Name'}
            </p>
            <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, textAlign: 'center', wordBreak: 'break-all' }}>{email}</p>

            {univ?.publickey && (
              <div style={{ marginTop: 14, width: '100%', background: 'rgba(62,104,252,0.06)', border: '1px solid rgba(62,104,252,0.15)', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: '#3E68FC', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Wallet Address</p>
                <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#1e3a8a', margin: '3px 0 0', wordBreak: 'break-all' }}>
                  {univ.publickey.slice(0, 10)}…{univ.publickey.slice(-8)}
                </p>
              </div>
            )}

            <p style={{ marginTop: 14, fontSize: 11, color: '#d1d5db', textAlign: 'center', lineHeight: 1.5 }}>
              Name updates reflect instantly on all issued certificates
            </p>
          </div>
        </div>

        {/* Right: Form card */}
        <div style={{ flex: 1, minWidth: 300, background: '#fff', borderRadius: 20, border: '1px solid #ebebeb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '24px 24px 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 20 }}>Institution Details</p>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ height: 44, borderRadius: 10, background: '#f3f4f6' }} className="animate-pulse" />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              <Field label="University / Institution Name">
                <input
                  style={inputStyle}
                  placeholder="e.g. Anna University"
                  value={form.universityName}
                  onChange={e => setForm(f => ({ ...f, universityName: e.target.value }))}
                  onFocus={focus} onBlur={blur}
                />
              </Field>

              <Field label="Email (Login ID — read only)">
                <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: 8, background: '#fafafa', color: '#9ca3af', cursor: 'not-allowed' }}>
                  <Mail size={14} style={{ color: '#d1d5db', flexShrink: 0 }} />
                  <span style={{ fontSize: 14 }}>{email}</span>
                </div>
              </Field>

              <Field label="Address">
                <textarea
                  placeholder="Institution address"
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  rows={3}
                  style={{ ...inputStyle, height: 'auto', padding: '10px 14px', resize: 'none' }}
                  onFocus={focus} onBlur={blur}
                />
              </Field>

              <Field label="Affiliated To">
                <input
                  style={inputStyle}
                  placeholder="e.g. Anna University, Mumbai University"
                  value={form.affiliatedTo}
                  onChange={e => setForm(f => ({ ...f, affiliatedTo: e.target.value }))}
                  onFocus={focus} onBlur={blur}
                />
              </Field>

              <Field label="Institution Type">
                <select
                  value={form.institutionType}
                  onChange={e => setForm(f => ({ ...f, institutionType: e.target.value }))}
                  onFocus={focus} onBlur={blur}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                >
                  <option value="">Select type…</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Autonomous">Autonomous</option>
                  <option value="Deemed University">Deemed University</option>
                  <option value="Central University">Central University</option>
                  <option value="State University">State University</option>
                </select>
              </Field>
            </div>
          )}

          <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid #f5f5f5', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSave}
              disabled={saving || loading}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '11px 22px', borderRadius: 10, border: 'none',
                cursor: saving || loading ? 'not-allowed' : 'pointer',
                fontSize: 13, fontWeight: 700, color: '#fff',
                opacity: saving || loading ? 0.6 : 1,
                background: saved ? 'linear-gradient(135deg,#16a34a,#22c55e)' : 'linear-gradient(135deg,#3E68FC,#5b51f5)',
                transition: 'background .3s',
                boxShadow: saved ? '0 4px 12px rgba(22,163,74,0.3)' : '0 4px 12px rgba(62,104,252,0.3)',
              }}
            >
              {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
              {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
