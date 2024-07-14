import React from 'react';
import { FileDown } from 'lucide-react';

const CertificatesStore = ({ certificates }) => {
  const colors = [
    'bg-blueLight',
    'bg-purpleLight',
    'bg-tealLight',
    'bg-purpleDark',
  ];

  return (
    <div className="w-10/12 gap-x-4 h-full  gap-y-8  justify-center my-4">
      {certificates.map((cert, index) => (
        <div
          key={cert.id}
          className={`w-full h-40 flex m-4 flex-col justify-around p-2  rounded-2xl drop-shadow-md glassmorphism ${
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
                <p className="text-white">{cert.number}</p>
                <p className="text-white">{cert.specialization}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <FileDown className="text-white h-14 w-40" />
              <p className="text-white">Download</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificatesStore;
