import Image from 'next/image';
import React from 'react';
import icon from '@/app/assets/proposal/icon.svg';
import banner from '@/app/assets/proposal/banner.png';

const Banner = () => {
  return (
    <div className="relative  min-h-80    ml-8  ">
      <div className="absolute inset-0 bg-banner-img opacity-90 rounded-2xl"></div>

      <div className=" flex flex-col  py-8 px-4  md:px-20 gap-y-6 relative    ">
        <div className="flex ">
          <Image src={icon} alt="dashbopard" />

          <h1 className="font-light text-blue  text-3xl ">Marks Database</h1>
        </div>{' '}
        <div>
          <p className="text-white text-balance ">
            The Computer Science program comprises eight semesters, with the
            ongoing semester being the fourth. The graduating batch is
            anticipated to complete their studies by 2026.
          </p>
        </div>
        <div className=" flex flex-col md:flex-row border-t justify-between border-white">
          <div className="flex justify-around gap-x-0 md:gap-x-6">
            <div>
              <h5 className="font-bold text-white">Members</h5>
              <p className="text-white">2050</p>
            </div>
            <div>
              <h5 className="font-bold text-white">Students</h5>
              <p className="text-white">2050</p>
            </div>
            <div>
              <h5 className="font-bold text-white">Mentors</h5>
              <p className="text-white">2050</p>
            </div>
            <div>
              <h5 className="font-bold text-white">Graders</h5>
              <p className="text-white">2050</p>
            </div>
          </div>
          <div className="text-center">
            <h5 className="font-bold  text-white  ">Proposal</h5>
            <p className="text-white">2050</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
