import React from 'react';
import Image from 'next/image';
import dashboard from '@/app/assets/Governance/dashboard.svg';

import Card from '@/components/governance/Card';
import CertificateCard from '@/components/student/CertificateCard';
import Link from 'next/link';

const data = [
  {
    id: 1,
    batch: 'CSE batch 2024',
    address: '0x1a2b3C4D5e6F7G8H9I0JkLmNoPQr',
    university: 'Chandigarh University',
  },
  {
    id: 2,
    batch: 'CSE batch 2024',
    address: '0x2b3cD4E5F6G7H8I9J0K1lMnOpQrS',
    university: 'Chandigarh University',
  },
  {
    id: 3,
    batch: 'CSE batch 2024',
    address: '0x3c4dE5F6G7H8I9J0K1L2mNoPqRsT',
    university: 'Chandigarh University',
  },
  {
    id: 4,
    batch: 'CSE batch 2024',
    address: '0x4d5eF6G7H8I9J0K1L2M3nOpQrStU',
    university: 'Chandigarh University',
  },
];

const dummyCertificates = [
  {
    id: 1,
    logo: '/app/assets/logo.svg',
    degree: 'Degree Certificate',
    number: '123456789',
    university: 'Souldem University',
    specialization: 'BE Developer',
  },
  {
    id: 2,
    logo: '/app/assets/logo.svg',
    degree: 'Degree Certificate',
    number: '234567890',
    university: 'University of Code',
    specialization: 'Software Engineer',
  },
  {
    id: 3,
    logo: '/app/assets/logo.svg',
    degree: 'Degree Certificate',
    number: '345678901',
    university: 'Tech Institute',
    specialization: 'Computer Scientist',
  },
  // {
  //   id: 4,
  //   logo: '/app/assets/logo.svg',
  //   degree: 'Degree Certificate',
  //   number: '345678901',
  //   university: 'Tech Institute',
  //   specialization: 'Computer Scientist',
  // },
];
const page = () => {
  return (
    <div className=" m-8  w-full	">
      <div className="flex mb-8">
        <Image src={dashboard} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">Dashboard</h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <div className="flex flex-col">
        <div className="flex justify-between mr-20">
          <h1 className="font-light text-blue  text-xl">Issued Certificates</h1>

          <Link href="student/certificates">
            <p className='className="font-light text-blue  '>View All</p>
          </Link>
        </div>

        <CertificateCard certificates={dummyCertificates} />
      </div>
      {/* card mapping */}
      <div className="flex flex-col">
        <h1 className="font-light text-blue  text-xl">Dashboard</h1>

        <Card data={data} />
      </div>
    </div>
  );
};

export default page;
