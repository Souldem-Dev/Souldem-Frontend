import React from 'react';

import Image from 'next/image';
import db from '@/app/assets/marksDB/db.svg';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/marksDatabase/SearchFilter';
import GovForm from '@/components/governance/GovForm';
import { ProfileMarks } from '@/components/marksDatabase/ProfileMarks';
import Profile from '@/components/marksDatabase/Profile';

const page = () => {
  return (
    <main className=" m-8  w-full	">
      <div className="flex mb-8">
        <Image src={db} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">Marks Database</h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <SearchFilter />

      <Profile />
      <ProfileMarks />
      {/* card mapping */}
    </main>
  );
};

export default page;
