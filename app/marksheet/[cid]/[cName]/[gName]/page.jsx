'use client';
import React, { useEffect, useState } from 'react';
import Cert from '@/components/Cert';
import { useParams } from 'next/navigation';

function Page() {
  const [data, setData] = useState(null);
  let [userMail,setMail] = useState()
  let params = useParams()
  useEffect(()=>{
    let mail = localStorage.getItem('userEmail')
    setMail(mail)

    const fetchIPFSData = async (cid) => {
      console.log("run")
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
    fetchIPFSData(params.cid)
  },[])

console.log(data)
  return (
    <div className="App">
     
      {data && (
        <Cert
          governAdd={data.governAdd}
          marks={data.marks}
          subjects={data.marks.subjectName}
          userMail={userMail}
          cName={params.cName}
          gName={params.gName}
        />
      )}
    </div>
  );
}

export default Page;
