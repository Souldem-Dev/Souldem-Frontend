import Image from 'next/image';
import React from 'react';
import icon from '@/app/assets/proposal/icon.svg';
import banner from '@/app/assets/proposal/banner.png';

const Banner = () => {
  return (
    <div className="  w-full static  ">
      <Image
        src={banner}
        alt="banner"
        className="h-80 absolute z-0 opacity-25 object-cover"
      />

      <div className="flex flex-col  p-8 px-20 gap-y-6 relative    ">
        <div className="flex ">
          <Image src={icon} alt="dashbopard" />

          <h1 className="font-light text-blue  text-3xl">Marks Database</h1>
        </div>{' '}
        <div>
          <p>
            The Computer Science program comprises eight semesters, with the
            ongoing semester being the fourth. The graduating batch is
            anticipated to complete their studies by 2026.
          </p>
        </div>
        <div className=" flex border-t justify-between border-black">
          <div className="flex justify-around gap-x-6">
            <div>
              <h5 className="font-bold">Members</h5>
              <p>2050</p>
            </div>
            <div>
              <h5 className="font-bold">Students</h5>
              <p>2050</p>
            </div>
            <div>
              <h5 className="font-bold">Mentors</h5>
              <p>2050</p>
            </div>
            <div>
              <h5 className="font-bold">Graders</h5>
              <p>2050</p>
            </div>
          </div>
          <div>
            <h5 className="font-bold">Proposal</h5>
            <p>2050</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
