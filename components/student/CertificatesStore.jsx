import React from 'react';
import { FileDown } from 'lucide-react';
import Link from 'next/link';

const CertificatesStore = ({ certificates }) => {
  const colors = [
    'bg-blueLight',
    'bg-purpleLight',
    'bg-tealLight',
    'bg-purpleDark',
  ];

  return (
    <div className="w-10/12 gap-x-4 h-full gap-y-8 justify-center my-4">
      {certificates.map((cert, index) => (
        <div
          key={cert.id}
          className={`w-full h-40 flex m-4 flex-col justify-around p-2 rounded-2xl drop-shadow-md glassmorphism ${
            colors[index % colors.length]
          }`}
        >
          <div className="flex justify-between">
            <p className="text-white">{cert.tag}</p>
            <p className="text-white">{cert.university}</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div>
                <h1 className="text-3xl text-white">{cert.degree}</h1>
              </div>
              <div className="flex gap-x-8 mt-4">
                <p className="text-white font-mono text-xs truncate max-w-xs">{cert.ipfsCid}</p>
                <p className="text-white">{cert.specialization}</p>
              </div>
            </div>
            <Link
              href={`/marksheet/${cert.ipfsCid}/${encodeURIComponent(cert.university)}/${encodeURIComponent(cert.specialization)}`}
              className="flex flex-col items-center hover:opacity-75 transition"
            >
              <FileDown className="text-white h-14 w-40" />
              <p className="text-white">Download</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificatesStore;
