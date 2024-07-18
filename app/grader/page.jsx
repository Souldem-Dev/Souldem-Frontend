'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import dashboard from '@/app/assets/Governance/dashboard.svg';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/hod/SearchFilter';

import CardUser from '@/components/governance/CardUser';
import axios from 'axios';

const page = () => {
  let [joinedGov, setJoinedGov] = useState([]);
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          'become/joinedGov/grader/' +
          localStorage.getItem('userPublicAddress')
      )
      .then((res) => {
        setJoinedGov(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(joinedGov);
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

      {joinedGov.length != 0 ? (
        <CardUser data={joinedGov} url={'http://localhost:3000/grader'} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            src={EmptyGov}
            alt="No Governance Joined"
            className="h-64 w-64"
          />
          <p className="text-center text-gray-500 mt-4">No Governance Joined</p>
        </div>
      )}
    </div>
  );
};

export default page;
