'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import dashboard from '@/app/assets/Governance/dashboard.svg';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/hod/SearchFilter';
<<<<<<< HEAD
import CardUser from '@/components/governance/CardUser';
import axios from 'axios';
=======
import Card from '@/components/governance/Card';

const data = [
  {
    id: 1,
    batch: 'CSE batch 2024',
    address: '0x1a2b3C4D5e6F7G8H9I0JkLmNoPQr',
    university: 'Chandigarh University',
  },
  {
    id: 2,
    batch: 'CSE batch 2024',
    address: '0x2b3cD4E5F6G7H8I9J0K1lMnOpQrS',
    university: 'Chandigarh University',
  },
  {
    id: 3,
    batch: 'CSE batch 2024',
    address: '0x3c4dE5F6G7H8I9J0K1L2mNoPqRsT',
    university: 'Chandigarh University',
  },
  {
    id: 4,
    batch: 'CSE batch 2024',
    address: '0x4d5eF6G7H8I9J0K1L2M3nOpQrStU',
    university: 'Chandigarh University',
  },
];
>>>>>>> fc629df (&&)

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
<<<<<<< HEAD
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
      ) : null}
=======

      {/* Add the search and filter dropdown here */}
      <SearchFilter />

      <Card data={data} />
>>>>>>> fc629df (&&)
    </div>
  );
};

export default page;
