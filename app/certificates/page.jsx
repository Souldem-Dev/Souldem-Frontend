import React from 'react';

import Image from 'next/image';
import certificate from '@/app/assets/certificates/certificate.svg';
import EmptyCert from '@/app/assets/certificates/EmptyCert.svg';
import SearchFilter from '@/components/certificates/SearchFilter';
import GovForm from '@/components/governance/GovForm';

const page = () => {
  return (
    <div className=" m-8  w-full	">
      <div className="flex mb-8">
        <Image src={certificate} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">
          Certificates Template
        </h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <SearchFilter />

      <Image src={EmptyCert} alt="EmptyCert" className="m-auto " />

      {/* card mapping */}
    </div>
  );
};

export default page;
