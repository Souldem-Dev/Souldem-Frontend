'use client';
import React, { useEffect, useState } from 'react';
import Cert from '@/components/Cert';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  const params = useParams();
  const [ipfsData,       setIpfsData]       = useState(null);
  const [studentProfile, setStudentProfile] = useState({});
  const [template,       setTemplate]       = useState({});
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    const gw   = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'gateway.pinata.cloud';

    fetch(`https://${gw}/ipfs/${params.cid}`)
      .then(r => r.json())
      .then(async (data) => {
        setIpfsData(data);
        const { nonce, governAdd } = data;
        await Promise.allSettled([
          axios.get(`${base}profile/byNonce/${nonce}/${governAdd}`)
            .then(r => setStudentProfile(r.data || {}))
            .catch(() => {}),
          axios.get(`${base}marksheets/getTemplateByGovAdd/${governAdd}`)
            .then(r => { const d = r.data || {}; setTemplate({ ...d, ...(d.template || {}) }); })
            .catch(() => {}),
        ]);
      })
      .catch(err => console.error('IPFS fetch error:', err))
      .finally(() => setLoading(false));
  }, [params.cid]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7ff' }}>
      <p style={{ color: '#9ca3af', fontSize: 14 }}>Loading certificate…</p>
    </div>
  );

  if (!ipfsData) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7ff' }}>
      <p style={{ color: '#ef4444', fontSize: 14 }}>Failed to load certificate data.</p>
    </div>
  );

  return (
    <div className="App">
      <div className="my-2">
        <Cert
          governAdd={ipfsData.governAdd}
          marks={ipfsData.marks}
          cName={decodeURIComponent(params.cName || '')}
          gName={decodeURIComponent(params.gName || '')}
          studentProfile={studentProfile}
          template={template}
          cid={params.cid}
        />
      </div>
    </div>
  );
}
