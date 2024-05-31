'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Invite = () => {
  const [position, setPosition] = useState('bottom');
  return (
    <div className="m-4 w-11/12  flex flex-col">
      <div className="mt-4 flex  flex-col justify-betwee gap-y-2">
        <div className="flex md:flex-row my-4 flex-col gap-y-4 justify-between gap-x-2 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="22bcs10035@cuchd.in"
              className="bg-gray w-full"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="ID">ID</Label>
            <Input
              type="ID"
              id="ID"
              placeholder="22bcs10035"
              className="bg-gray w-full"
            />
          </div>
        </div>

        <div className="flex md:flex-row  flex-col gap-y-4 gap-x-20 ">
          <div className="grid w-full  gap-1.5">
            <Label htmlFor="To">To:</Label>
            <Input
              type="To"
              id="To"
              placeholder="22bcs10035@cuchd.in"
              className="bg-gray h-60"
            />
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button className="bg-blue text-white w-24">Invite</Button>
          <Button
            variant="outline "
            className="hover:bg-blue w-24 border-blue border"
          >
            Import CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
