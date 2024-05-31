import React from 'react';

import { Award, Search } from 'lucide-react';
import DriveCard from '@/components/certificates/DriveCard.jsx';
import SearchFilter from '@/components/certificates/SearchFilter.jsx';

const page = () => {
  return (
    <div className=" m-8 w-full	">
      <div className="flex   items-center">
        <Award className="text-blue " />
        <h1 className="font-light text-blue  text-3xl">
          Certificates Template
        </h1>
      </div>

      <SearchFilter />
      {/* Add the search and filter dropdown here */}

      {/* Form */}
      <DriveCard />
    </div>
  );
};

export default page;
