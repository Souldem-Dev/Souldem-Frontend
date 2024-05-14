import React from 'react';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg';

const CertificatesStore = ({ certificates }) => {
  return (
    <div className="flex flex-col gap-y-4">
      {certificates.map((cert) => (
        <div
          key={cert.id}
          className="flex w-full md:w-5/6 h-24 bg-white justify-between items-center  px-4 rounded-xl"
        >
          <div className="flex gap-x-8">
            <div>
              <Image src={logo} alt="dashboard" width={100} height={40} />
            </div>

            <div>
              <h1>{cert.degree}</h1>
              <p className="text-sm">{cert.number}</p>
            </div>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificatesStore;
