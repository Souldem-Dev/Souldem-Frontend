import React from 'react';
import Image from 'next/image';
import icon from '@/app/assets/proposal/icon.svg';
import banner from '@/app/assets/proposal/banner.png';
import { Checkbox } from '@/components/ui/checkbox';

const ProposalBanner = () => {
  return (
    <div className="relative  h-48 ">
      <div className="absolute inset-0 bg-banner-img opacity-90 rounded-2xl"></div>

      <div className="flex flex-col  p-8 px-4 gap-y-6 relative    ">
        <div className="flex ">
          <Image src={icon} alt="dashbopard" />

          <h1 className="font-light   text-3xl text-blue">Marks Database</h1>
        </div>{' '}
        <div>
          <p className="text-white">
            The Computer Science program comprises eight semesters, with the
            ongoing semester being the fourth. The graduating batch is
            anticipated to complete their studies by 2026.
          </p>
        </div>
        {/* <div className=" flex border-t justify-between border-black">
          <div className="flex justify-around gap-x-6">
            <div>
              <h5 className="font-bold text-white">Members</h5>
              <p className="text-white">2050</p>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white">Proposal</h5>
            <p className="text-white">2050</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <p className="text-lg text-white"> Accepted Proposal</p>
            <Checkbox className="text-white" />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg text-white"> Pending Proposal</p>
            <Checkbox className="text-white" />
          </div>{' '}
          <div className="flex justify-between items-center">
            <p className="text-white text-lg">Proposal Accepted</p>
            <Checkbox className="text-white" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProposalBanner;
