import React from 'react';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg';

const CertificateCard = ({ certificates }) => {
  return (
    <div className="flex  justify-center">
      {certificates.map((cert) => (
        <div
          key={cert.id}
          className="bg-white w-80 h-32 grid grid-cols-3  justify-around p-2 rounded-xl drop-shadow-md mr-8"
        >
          <div className="flex justify-between">
            <Image src={cert.logo} alt="logo" width={40} height={20} />
            <div>
              <h1>{cert.degree}</h1>
              <p>{cert.number}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <p>{cert.university}</p>
            <p>{cert.specialization}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificateCard;
