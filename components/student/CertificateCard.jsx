import React from 'react';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg';

const CertificateCard = ({ certificates }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3   xl:grid-cols-3 w-full  gap-x-8  gap-y-4 justify-center my-4">
      {certificates.map((cert) => (
        <div
          key={cert.id}
          className="bg-white w-full h-32 flex  flex-col justify-around p-2 rounded-xl drop-shadow-md mr-8"
        >
          <div className="flex justify-between">
            <Image src={logo} alt="logo" width={100} height={20} />
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
