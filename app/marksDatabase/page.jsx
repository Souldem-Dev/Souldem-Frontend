import React from 'react';

import Image from 'next/image';
import db from '@/app/assets/marksDB/db.svg';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/marksDatabase/SearchFilter';
import GovForm from '@/components/governance/GovForm';
import { GovernanceTable } from '@/components/marksDatabase/GovernanceTable';
import { Folder } from 'lucide-react';

const page = () => {
  return (
    <div className=" m-8  w-full	">
      <div className="flex mb-8 items-center">
        <Folder className="text-blue" />

        <h1 className="font-light text-blue  text-3xl">Marks Database</h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <SearchFilter />

      {/* card mapping */}
      <GovernanceTable />
    </div>
  );
};

export default page;
