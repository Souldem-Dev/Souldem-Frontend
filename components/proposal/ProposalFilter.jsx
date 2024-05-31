import React from 'react';
import Image from 'next/image';
import search from '@/app/assets/searchFilter/search.svg';
import { Checkbox } from '@/components/ui/checkbox';
import { Search } from 'lucide-react';

const ProposalFilter = () => {
  return (
    <div className="w-full  border-b-2 border-gray md:border-0 ">
      <div className="flex input input-bordered w-full h-8 rounded-3xl gap-x-2 my-4 items-center">
        <Search className="text-para " />

        <input type="text" placeholder="Search..." className="bg-white" />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <p className="md:text-lg"> Accepted Proposal</p>
          <Checkbox className="text-white" />
        </div>
        <div className="flex justify-between items-center">
          <p className="md:text-lg"> Pending Proposal</p>
          <Checkbox className="text-white" />
        </div>{' '}
        <div className="flex justify-between items-center mb-4  ">
          <p className="md:text-lg">Proposal Accepted</p>
          <Checkbox className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ProposalFilter;
