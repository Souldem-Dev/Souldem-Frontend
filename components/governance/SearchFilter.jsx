'use client';
import Image from 'next/image';
import { useState } from 'react';
import search from '@/app/assets/searchFilter/search.svg';
import filter from '@/app/assets/searchFilter/filter.svg';
import { set } from 'date-fns';
import GovForm from '@/components/governance/GovForm';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
        <div className="flex   border-para border rounded-3xl gap-x-2 items-center w-3/4 p-2 focus:ring-1 focus">
          <Search className="text-para" />

          <input
            type="text"
            placeholder="Search by Address or Batch Name"
            className="w-full text-para border-0 focus:ring-0 focus:outline-none"
          />
        </div>

        <Button
          variant="outline"
          className=" border-para  w-1/4 rounded-3xl hover:bg-gray"
        >
          Search
        </Button>
      </div>
      <div onClick={openCard}>
        <button className="bg-blue text-white p-2 px-4 rounded-l w-96 md:w-60">
          &#43; Create Governance
        </button>
        {Card && <GovForm onClose={closeCard} />}
      </div>
    </div>
  );
};

export default SearchFilter;
