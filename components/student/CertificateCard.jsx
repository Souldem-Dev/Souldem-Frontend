import React from 'react';

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
        <div
          key={cert.id}
          className={`w-full h-40 flex flex-col justify-around p-2  rounded-xl drop-shadow-md glassmorphism ${
            colors[index % colors.length]
          }`}
        >
          <div className="flex justify-between">
            <p className="text-white">{cert.tag}</p>
            <p className="text-white">{cert.university}</p>
          </div>

          <div>
            <h1 className="text-2xl text-white">{cert.degree}</h1>
          </div>

          <div className="flex justify-between">
            <p className="text-white">{cert.number}</p>
            <p className="text-white">{cert.specialization}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificateCards;
