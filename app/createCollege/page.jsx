import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <main className=" flex">
      <div className="w-4/6 h-screen bg-gray">hello</div>
      <div className="w-2/6 h-screen bg-white flex flex-col items-center justify-center px-20 gap-y-4">
        <div>
          <h3 className="text-3xl font-bold">Create a college in </h3>
          <h1 className="text-blue text-4xl font-extrabold ">Souldem</h1>
          <p className="text-gray">
            have your college on Souldem network for Easier management of
            examination{' '}
          </p>
        </div>
        <Input
          type="email"
          placeholder="Enter College Name"
          className="text-gray"
        />
        <Button className="bg-blue text-white p-2 px-4 rounded-l w-full">
          Create College{' '}
        </Button>
        <p className="text-gray">------if already created------</p>
        <Button className="bg-blue text-white p-2 px-4 rounded-l w-full">
          Connect Wallet{' '}
        </Button>
      </div>
    </main>
  );
};

export default page;
