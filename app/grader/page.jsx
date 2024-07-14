import React from 'react';

import Image from 'next/image';

import dashboard from '@/app/assets/Governance/dashboard.svg';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/hod/SearchFilter';
import Card from '@/components/governance/Card';

const data = [
  {
    id: 1,
    semester: 'Current Semester',
    batch: 'CSE batch 2024',
    students: 3000,
    graders: 20,
    others: 10,
    university: 'Chandigarh University',
  },
  {
    id: 2,
    semester: 'Current Semester',
    batch: 'CSE batch 2024',
    students: 200,
    graders: 20,
    others: 10,
    university: 'Chandigarh University',
  },
  {
    id: 3,
    semester: 'Current Semester',
    batch: 'CSE batch 2024',
    students: 3000,
    graders: 20,
    others: 10,
    university: 'Chandigarh University',
  },
  {
    id: 4,
    semester: 'Current Semester',
    batch: 'CSE batch 2024',
    students: 3000,
    graders: 20,
    others: 10,
    university: 'Chandigarh University',
  },

  // Add more objects as needed
];

const page = () => {
  return (
    <div className=" m-8  w-full mb-40">
      <div className="flex mb-8">
        <Image src={dashboard} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">Dashboard</h1>
      </div>

      {/* <div className="bg-[#FF9D9D] p-2 px-4 rounded-xl w-fit">
      <p className="text-red-600">
        &#9888; Add Nominee account integration to Souldem for enhanced user
        management and security.<span className="text-blue">Add Now</span>
      </p>
    </div> */}
      {/* Add the search and filter dropdown here */}
      <SearchFilter />

      {/* card mapping */}

      {/* <Card data={data} /> */}
    </div>
  );
};

export default page;
