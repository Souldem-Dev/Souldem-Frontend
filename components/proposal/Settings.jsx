import React from 'react';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <div className=" w-full bg-white drop-shadow-md h-full py-8 px-4 md:p-20  flex flex-col gap-y-8 rounded-xl ">
      <div className="flex flex-col md:flex-row w-full  gap-y-2 ">
        <div className="md:w-1/2 ">
          <label className="font-bold text-xl">Toggle Internal marks</label>
          <p className="text-sm text-para">
            The Graders will be allowed to Enter Internal marks
          </p>
        </div>
        <div className="md:w-1/2 text-right">
          <Switch className="bg-gray " />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full  gap-y-2 ">
        <div className="md:w-1/2 ">
          <label className="font-bold text-xl">Toggle External marks</label>
          <p className="text-sm text-para">
            The Graders will be allowed to Enter External marks
          </p>
        </div>
        <div className="md:w-1/2 text-right">
          <Switch className="bg-gray " />
        </div>
      </div>
    </div>
  );
};

export default Settings;
