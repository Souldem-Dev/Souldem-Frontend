'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CardUser from '@/components/governance/CardUser';
import { Home } from 'lucide-react';
import Image from 'next/image';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/hod/SearchFilter';

const page = () => {
  let [joinedGov, setJoinedGov] = useState([]);
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          'become/joinedGov/hod/' +
          localStorage.getItem('userPublicAddress')
      )
      .then((res) => {
        setJoinedGov(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" mx-6 md:mx-12 my-4 w-full	">
      <div className="flex mb-8 items-center">
        <Home className="text-blue" />

        <h1 className="font-light text-blue  text-3xl">Dashboard</h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <SearchFilter />
      {/* <Image src={EmptyGov} alt="EmptyGov" className="mx-auto m-20" /> */}

      {/* card mapping */}

      {/* <Card data={data} /> */}
      {joinedGov.length != 0 ? (
        <CardUser
          data={joinedGov}
          url={'http://localhost:3000/user/hod/invite'}
        />
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
