import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Searchbox = () => {
  return (
    <div className="flex xl:w-3/6 w-full  items-center gap-x-2  mx-auto">
      <div className="flex   border-para border rounded-xl gap-x-2 items-center w-3/4 p-2 focus:ring-1 ">
        <Search className="text-para" />

        <input
          type="text"
          placeholder="Search by Address or Batch Name"
          className="w-full text-para border-0 focus:ring-0 focus:outline-none bg-white"
        />
      </div>

      <Button
        variant="outline"
        className=" border-para  w-1/4 rounded-xl bg-blue   text-white hover:bg-blue-500  focus:outline-2 "
      >
        Search
      </Button>
    </div>
  );
};

export default Searchbox;
