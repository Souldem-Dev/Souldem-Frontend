import ProposalBanner from '@/components/student/ProposalBanner';
import Proposals from '@/components/student/Proposals';
import SearchFilter from '@/components/student/SearchFilter';
import { ProportionsIcon } from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    <div className="flex my-8 ">
      <div className=" md:w-2/6">
        <ProposalBanner />
      </div>
      <div className="w-4/6">
        <h1 className="font-light text-blue  text-3xl">Proposals</h1>
        <SearchFilter />
        <Proposals />
      </div>
    </div>
  );
};

export default page;
