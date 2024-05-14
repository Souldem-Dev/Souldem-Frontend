import React from 'react';
import Image from 'next/image';
import search from '@/app/assets/searchFilter/search.svg';
import { Checkbox } from '@/components/ui/checkbox';

const ProposalFilter = () => {
  return (
    <div className="w-full">
      <div className="flex input input-bordered w-60 h-8 rounded-3xl gap-x-2 my-4">
        <Image src={search} alt="search" />

        <input type="text" placeholder="Search..." />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <p className="text-lg"> Accepted Proposal</p>
          <Checkbox className="text-white" />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg"> Pending Proposal</p>
          <Checkbox className="text-white" />
        </div>{' '}
        <div className="flex justify-between items-center">
          <p className="text-lg">Proposal Accepted</p>
          <Checkbox className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ProposalFilter;
