'use client';
import Image from 'next/image';
import { useState } from 'react';

import GovForm from '@/components/governance/GovForm';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchFilter = () => {
  const [Card, setCard] = useState(false);

  const openCard = () => {
    setCard(true);
  };

  const closeCard = () => {
    setCard(false);
  };

  return (
    <div className="my-4 flex flex-col md:flex-row justify-between items-center w-full gap-x-2 gap-y-4">
      <div className="flex xl:w-3/6 w-full items-center gap-x-2 ">
        <div className="flex   border-para border rounded-3xl gap-x-2 items-center w-3/4 p-2 focus:ring-1 ">
          <Search className="text-para" />

          <input
            type="text"
            placeholder="Search by Address or Batch Name"
            className="w-full text-para border-0 focus:ring-0 focus:outline-none bg-white"
          />
        </div>

        <Button
          variant="outline"
          className=" border-para  w-1/4 rounded-3xl hover:bg-blue  text-para hover:text-white hover:border-white "
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
