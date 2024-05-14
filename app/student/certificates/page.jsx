import SearchFilter from '@/components/student/SearchFilter';
import React from 'react';
import Image from 'next/image';
import icon from '@/app/assets/proposal/icon.svg';
import CertificatesStore from '../../../components/student/CertificatesStore';

const data = [
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
  {
    id: 20,
    logo: '/app/assets/logo.svg',
    degree: 'Degree Certificate',
    number: '234567890',
    university: 'University of Code',
    specialization: 'Software Engineer',
  },
  {
    id: 9,
    logo: '/app/assets/logo.svg',
    degree: 'Degree Certificate',
    number: '345678901',
    university: 'Tech Institute',
    specialization: 'Computer Scientist',
  },
  {
    id: 6,
    logo: '/app/assets/logo.svg',
    degree: 'Degree Certificate',
    number: '234567890',
    university: 'University of Code',
    specialization: 'Software Engineer',
  },
  {
    id: 99,
    logo: '/app/assets/logo.svg',
    degree: 'Degree Certificate',
    number: '345678901',
    university: 'Tech Institute',
    specialization: 'Computer Scientist',
  },
];

const page = () => {
  return (
    <div className=" m-8  w-full	">
      <div className="flex mb-8">
        <Image src={icon} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">Issued Certificates</h1>
      </div>

      <SearchFilter />
      <CertificatesStore certificates={data} />
    </div>
  );
};

export default page;
