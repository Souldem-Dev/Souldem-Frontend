'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProvisionalCert from '@/components/ProvisionalCert';
import axios from 'axios';

export default function ProvisionalPage() {
  const params = useParams();
  const [ipfsData,       setIpfsData]       = useState(null);
  const [studentProfile, setStudentProfile] = useState({});
  const [template,       setTemplate]       = useState({});
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState('');

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    const gw   = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'gateway.pinata.cloud';

    fetch(`https://${gw}/ipfs/${params.cid}`)
      .then(r => { if (!r.ok) throw new Error('Not found'); return r.json(); })
      .then(async (data) => {
        setIpfsData(data);
        await Promise.allSettled([
          data.souldemId
            ? axios.get(`${base}profile/bySouldemId/${data.souldemId}`)
                .then(r => setStudentProfile(r.data || {}))
                .catch(() => {})
            : Promise.resolve(),
          data.governAdd
            ? axios.get(`${base}marksheets/getTemplateByGovAdd/${data.governAdd}`)
                .then(r => { const d = r.data || {}; setTemplate({ ...d, ...(d.template || {}) }); })
                .catch(() => {})
            : Promise.resolve(),
        ]);
      })
      .catch(() => setError('Failed to load certificate data'))
      .finally(() => setLoading(false));
  }, [params.cid]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7ff' }}>
      <p style={{ color: '#9ca3af', fontSize: 14 }}>Loading certificate…</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7ff' }}>
      <p style={{ color: '#ef4444', fontSize: 14 }}>{error}</p>
    </div>
  );

  return (
    <ProvisionalCert
      ipfsData={ipfsData}
      studentProfile={studentProfile}
      template={template}
      cName={decodeURIComponent(params.cName || '')}
      gName={decodeURIComponent(params.gName || '')}
      cid={params.cid}
    />
  );
}
