'use client';
import Image from 'next/image';
import { useState } from 'react';
import search from '@/app/assets/searchFilter/search.svg';
import filter from '@/app/assets/searchFilter/filter.svg';
import { set } from 'date-fns';
import GovForm from '@/components/governance/GovForm';

const SearchFilter = () => {
  return (
    <div className="my-4 flex  flex-col md:flex-row  justify-between items-center w-full gap-x-2">
      <div className="flex w-full items-center gap-x-2 ">
        <div className="flex input w-full input-bordered  rounded-3xl gap-x-2">
          <Image src={search} alt="search" />

          <input type="text" placeholder="Search..." />
        </div>
        <div className="dropdown dropdown-bottom w-full">
          <div tabIndex={0} role="button" className="btn m-1">
            <Image src={filter} alt="search" />
            filter
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
