import React from 'react';

import Image from 'next/image';
import dashboard from '@/app/assets/Governance/dashboard.svg';
import EmptyGov from '@/app/assets/Governance/EmptyGov.svg';
import SearchFilter from '@/components/governance/SearchFilter';
import Card from '@/components/governance/Card';
import { Home } from 'lucide-react';

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
  {
    id: 5,
    batch: 'CSE batch 2024',
    address: '0x5e6fG7H8I9J0K1L2M3N4oPqRsTuV',
    university: 'Chandigarh University',
  },
  {
    id: 6,
    batch: 'CSE batch 2024',
    address: '0x6f7gH8I9J0K1L2M3N4O5pQqRsTuV',
    university: 'Chandigarh University',
  },
  {
    id: 7,
    batch: 'CSE batch 2024',
    address: '0x7g8hI9J0K1L2M3N4O5P6qRrStTuV',
    university: 'Chandigarh University',
  },
  {
    id: 8,
    batch: 'CSE batch 2024',
    address: '0x8h9iJ0K1L2M3N4O5P6Q7rSsTuV',
    university: 'Chandigarh University',
  },
  {
    id: 9,
    batch: 'CSE batch 2024',
    address: '0x9iJ0K1L2M3N4O5P6Q7R8sTtU',
    university: 'Chandigarh University',
  },
  {
    id: 10,
    batch: 'CSE batch 2024',
    address: '0x0jK1L2M3N4O5P6Q7R8S9tTu',
    university: 'Chandigarh University',
  },
];

const page = () => {



  return (
    <div className=" mx-6 md:mx-12 my-4 w-full	">
      <div className="flex mb-8 items-center">
        <Home className="text-blue" />

        <h1 className="font-light text-blue  text-3xl" >Dashboard</h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <SearchFilter />

      {/* <Image src={EmptyGov} alt="EmptyGov" className="mx-auto m-20" /> */}

      {/* card mapping */}

      <Card data={data} />
    </div>
  );
};

export default page;
