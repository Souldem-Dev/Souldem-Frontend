import FunctionCard from '@/components/mentor/FunctionCard';
import ProposalBanner from '@/components/student/ProposalBanner';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className="m-4 w-11/12 flex flex-col">
        <ProposalBanner />

        <FunctionCard />
      </div>
    </div>
  );
};

export default page;
