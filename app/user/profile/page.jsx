'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Camera, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

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

export default function ProfilePage() {
  const [profile,        setProfile]        = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [saving,         setSaving]         = useState(false);
  const [saved,          setSaved]          = useState(false);
  const [form,           setForm]           = useState({ name: '', fatherName: '', dob: '', gender: '', address: '' });
  const [photoPreview,   setPhotoPreview]   = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    const mail = localStorage.getItem('userEmail');
    if (!mail) { setLoading(false); return; }
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}profile/${mail}`)
      .then(res => {
        setProfile(res.data);
        setForm({
          name:       res.data.name       || '',
          fatherName: res.data.fatherName || '',
          dob:        res.data.dob        || '',
          gender:     res.data.gender     || '',
          address:    res.data.address    || '',
        });
        if (res.data.photoIpfs) {
          const p  = res.data.photoIpfs;
          const gw = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'gateway.pinata.cloud';
          if (p.startsWith('data:')) {
            setPhotoPreview(p);
          } else {
            // Backend stores photos as JSON { type, data: "data:image/..." } on Pinata — unwrap
            fetch(`https://${gw}/ipfs/${p}`)
              .then(r => r.json())
              .then(json => setPhotoPreview(json?.data || `https://${gw}/ipfs/${p}`))
              .catch(() => setPhotoPreview(`https://${gw}/ipfs/${p}`));
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    setSaving(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}profile/update`, { email, ...form });
      setProfile(res.data);
      setSaved(true);
      toast.success('Profile saved!');
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      toast.error(err.response?.data?.reason || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setPhotoPreview(base64);
      setUploadingPhoto(true);
      const email = localStorage.getItem('userEmail');
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}profile/uploadPhoto`, { email, photoBase64: base64 });
        // Re-fetch profile to sync photoIpfs CID in state (for certificates) but keep base64 as preview
        // — IPFS gateway URLs are not immediately accessible after upload
        const updated = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}profile/${email}`);
        if (updated.data) setProfile(updated.data);
        toast.success('Photo updated!');
      } catch {
        toast.error('Photo upload failed');
      } finally {
        setUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const [email, setEmail] = useState('');
  useEffect(() => { setEmail(localStorage.getItem('userEmail') || ''); }, []);

  const initials = form.name
    ? form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : email[0]?.toUpperCase() || '?';

  const filledCount = [form.name, form.fatherName, form.dob, form.gender, form.address].filter(Boolean).length;
  const completion  = Math.round((filledCount / 5) * 100);

  const inputStyle = {
    height: 44, padding: '0 14px', borderRadius: 10,
    border: '1.5px solid #ebebeb', fontSize: 14, color: '#111827',
    background: '#fff', outline: 'none', width: '100%',
    transition: 'border-color .15s, box-shadow .15s',
    fontFamily: 'inherit',
  };
  const focus   = e => { e.target.style.borderColor = '#3E68FC'; e.target.style.boxShadow = '0 0 0 3px rgba(62,104,252,0.08)'; };
  const blur    = e => { e.target.style.borderColor = '#ebebeb'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{ padding: '28px 32px', width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* ── Left: Identity card ── */}
        <div style={{ width: 240, flexShrink: 0, borderRadius: 20, overflow: 'hidden', background: '#fff', border: '1px solid #ebebeb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

          {/* gradient top */}
          <div style={{ height: 90, background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          </div>

          {/* avatar overlapping */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px 24px', marginTop: -44 }}>
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => !uploadingPhoto && fileRef.current?.click()}
                style={{
                  width: 88, height: 88, borderRadius: '50%',
                  border: '3px solid #fff',
                  background: 'linear-gradient(135deg,#3E68FC,#5b51f5)',
                  overflow: 'hidden', cursor: uploadingPhoto ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(62,104,252,0.25)',
                  position: 'relative',
                }}
              >
                {photoPreview
                  ? <img src={photoPreview} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: 28, fontWeight: 800, color: '#fff', userSelect: 'none' }}>{initials}</span>
                }
                {uploadingPhoto && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 24, height: 24, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  </div>
                )}
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploadingPhoto}
                title="Change photo"
                style={{
                  position: 'absolute', bottom: 2, right: 2,
                  width: 24, height: 24, borderRadius: '50%',
                  background: '#fff', border: '1.5px solid #ebebeb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                <Camera size={12} color="#3E68FC" />
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />

            {/* name */}
            <p style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: '#111827', textAlign: 'center', lineHeight: 1.3 }}>
              {form.name || 'Your Name'}
            </p>
            <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, textAlign: 'center' }}>{email}</p>

            {/* souldem id */}
            <div style={{ marginTop: 14, width: '100%' }}>
              {loading ? (
                <div style={{ height: 36, borderRadius: 10, background: '#f3f4f6' }} />
              ) : profile?.souldemId ? (
                <div style={{
                  background: 'rgba(62,104,252,0.06)', border: '1px solid rgba(62,104,252,0.15)',
                  borderRadius: 10, padding: '8px 12px', textAlign: 'center',
                }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#3E68FC', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Souldem ID</p>
                  <p style={{ fontSize: 13, fontFamily: 'monospace', fontWeight: 700, color: '#1e3a8a', letterSpacing: '0.1em', margin: '3px 0 0' }}>
                    {profile.souldemId}
                  </p>
                </div>
              ) : (
                <div style={{ background: '#fafafa', border: '1px solid #ebebeb', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: '#9ca3af', margin: 0, lineHeight: 1.4 }}>Join a governance to get your Souldem ID</p>
                </div>
              )}
            </div>

            {/* profile completion */}
            <div style={{ marginTop: 16, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>Profile complete</span>
                <span style={{ fontSize: 11, color: completion === 100 ? '#16a34a' : '#3E68FC', fontWeight: 700 }}>{completion}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: '#f3f4f6', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 99,
                  width: `${completion}%`,
                  background: completion === 100 ? 'linear-gradient(90deg,#16a34a,#22c55e)' : 'linear-gradient(90deg,#3E68FC,#5b51f5)',
                  transition: 'width .4s ease',
                }} />
              </div>
              {completion === 100 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                  <ShieldCheck size={13} color="#16a34a" />
                  <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>Ready for certificate</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: Form card ── */}
        <div style={{ flex: 1, minWidth: 300, background: '#fff', borderRadius: 20, border: '1px solid #ebebeb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '24px 24px 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 20 }}>Personal Details</p>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ height: 44, borderRadius: 10, background: '#f3f4f6' }} className="animate-pulse" />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 18px' }}>

              <Field label="Full Name">
                <input style={inputStyle} placeholder="e.g. Rahul Sharma"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={focus} onBlur={blur} />
              </Field>

              <Field label="Father's Name">
                <input style={inputStyle} placeholder="e.g. Ramesh Sharma"
                  value={form.fatherName} onChange={e => setForm(f => ({ ...f, fatherName: e.target.value }))}
                  onFocus={focus} onBlur={blur} />
              </Field>

              <Field label="Date of Birth">
                <input type="date" style={inputStyle}
                  value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                  onFocus={focus} onBlur={blur} />
              </Field>

              <Field label="Gender">
                <select style={{ ...inputStyle, color: form.gender ? '#111827' : '#9ca3af' }}
                  value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                  onFocus={focus} onBlur={blur}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Field>

              <Field label="Address">
                <div style={{ gridColumn: '1 / -1' }}>
                  <textarea
                    placeholder="Your full address"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    rows={3}
                    style={{ ...inputStyle, height: 'auto', padding: '10px 14px', resize: 'none' }}
                    onFocus={focus} onBlur={blur}
                  />
                </div>
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
                background: saved
                  ? 'linear-gradient(135deg,#16a34a,#22c55e)'
                  : 'linear-gradient(135deg,#3E68FC,#5b51f5)',
                transition: 'background .3s, opacity .2s',
                boxShadow: saved ? '0 4px 12px rgba(22,163,74,0.3)' : '0 4px 12px rgba(62,104,252,0.3)',
              }}
            >
              {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
              {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
