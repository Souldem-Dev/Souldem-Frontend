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
      <div className="mt-4 flex  flex-col justify-between">
        <div className="flex md:flex-row flex-col gap-y-8 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="22bcs10035@cuchd.in" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="ID">ID</Label>
            <Input type="ID" id="ID" placeholder="22bcs10035" />
          </div>
        </div>
        <div className="flex">
          <Button className="bg-blue text-white">Invite</Button>
          <Button
            variant="outline "
            className="hover:bg-blue border-blue border"
          >
            Import CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
