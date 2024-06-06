'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/governance/SearchFilter';
import Card from '@/components/governance/Card';
import { Home } from 'lucide-react';
import axios from 'axios';

const page = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const publicAddress = await signer.getAddress();

      try {
        const { data: getData } = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            'factory/getData/' +
            publicAddress
        );
        const { collegeAddress, name } = getData;

        console.log(collegeAddress);

        const { data: getGovernance } = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            'factory/getGovernanceAddress/' +
            collegeAddress
        );

        setData(getGovernance);
        setName(name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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

      <Card data={data} name={name} />
    </div>
  );
};

export default page;
