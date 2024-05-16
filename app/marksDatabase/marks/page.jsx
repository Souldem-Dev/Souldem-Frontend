import React from 'react';

import Image from 'next/image';
import db from '@/app/assets/marksDB/db.svg';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/marksDatabase/SearchFilter';



const Page = () => {
  return (
    <main className=" m-8  w-full	">
      <div className="flex mb-8">
        <Image src={db} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">Marks Database</h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <SearchFilter />
      <Image src={EmptyGov} alt="EmptyGov" className="mx-auto m-20" />

    </main>
  );
}

export default Page;
