import React from 'react';

import Image from 'next/image';
import EmptyCert from '@/app/assets/Certificates/EmptyCert.svg';
import SearchFilter from '@/components/certificates/SearchFilter.jsx';
import { Award } from 'lucide-react';

const page = () => {
  return (
    <div className=" mx-6 md:mx-12 my-4 w-full	">
      <div className="flex mb-8 items-center">
        <Award className="text-blue " />

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
