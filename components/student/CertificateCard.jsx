import React from 'react';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';

const CertificateCards = ({ certificates }) => {
  const colors = [
    'bg-blueLight',
    'bg-purpleLight',
    'bg-tealLight',
    'bg-purpleDark',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 w-10/12 gap-x-4  gap-y-4 justify-center my-4">
      {certificates.map((cert, index) => (
        <Link href={"/marksheet/"+cert.ipfsCid+"/"+cert.collegeName+"/"+cert.governName}>
        <div
          key={cert.id}
          className={`w-full h-40 flex flex-col justify-around p-2  rounded-xl drop-shadow-md glassmorphism ${
            colors[index % colors.length]
          }`}
        >
          <div className="flex justify-between">
            <p className="text-white">Marksheet</p>
            <button className=" absolute top-0 right-2  p-2 mx-auto my-4 text-white rounded-full focus:ring-1">
                <MoveUpRight className="text-white" />
              </button>
          </div>

          <div>
            <h1 className="text-2xl text-center text-white">Semester Marksheet: {cert.semNo}</h1>
          </div>

          <div className="flex justify-between">
            <p className="text-white">issued through Souldem</p>
            <p className="text-white">{cert.governName}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default CertificateCards;
