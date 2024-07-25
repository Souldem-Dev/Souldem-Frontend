'use client';
import React, { useState } from 'react';
import Cert from '@/components/Cert';

function Page() {
  const [data, setData] = useState(null);

  const fetchIPFSData = async (cid) => {
    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error('Error retrieving data:', err);
    }
  };

  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold mt-8">
        IPFS Data Retriever with Pinata
      </h1>
      <div className="text-center mt-8">
        <input
          type="text"
          placeholder="Enter IPFS CID"
          className="border border-gray-300 p-2 rounded-md"
          onBlur={(e) => fetchIPFSData(e.target.value)}
        />
      </div>
      {data && (
        <Cert
          governAdd={data.governAdd}
          marks={data.marks}
          nonce={data.nonce}
          subjects={data.marks.subjectName}
        />
      )}
    </div>
  );
}

export default Page;
