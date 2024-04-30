import SearchFilter from '@/components/student/SearchFilter';
import React from 'react';
import Image from 'next/image';
import icon from '@/app/assets/proposal/icon.svg';

const page = () => {
  return (
    <div className=" m-8  w-full	">
      <div className="flex mb-8">
        <Image src={icon} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">Issued Certificates</h1>
      </div>

      <SearchFilter />
    </div>
  );
};

export default page;
