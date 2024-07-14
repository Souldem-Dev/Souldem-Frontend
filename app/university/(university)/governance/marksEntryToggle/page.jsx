'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Switch } from '@/components/ui/switch';

const Page = () => {
  const [internalToggle, setInternalToggle] = useState(false);
  const [externalToggle, setExternalToggle] = useState(false);

  const handleInternalToggle = async () => {
    setInternalToggle(!internalToggle);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'marksheets/allowInternalMarks',
        {
          governAdd: '0xbD5ED0d45129dD88D87CfB9228905252fB83b1a6',
          semNo: 9,
          internal: true,
          external: false,
        }
      );
      if (response.status === 200) {
        toast.success('Internal Marks Allowed');
      }
      console.log(res);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleExternalToggle = async () => {
    setExternalToggle(!externalToggle);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'marksheets/allowExternalMarks',
        {
          governAdd: '0xbD5ED0d45129dD88D87CfB9228905252fB83b1a6',
          semNo: 9,
          internal: false,
          external: true,
        }
      );
      if (response.status === 200) {
        toast.success('External Marks Allowed');
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full bg-white drop-shadow-md h-full py-8 px-4 md:p-20 flex flex-col gap-y-8 rounded-xl">
      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label htmlFor="internal-marks-toggle" className="font-bold text-xl">
            Toggle Internal marks
          </label>
          <p className="text-sm text-para">
            The Graders will be allowed to Enter Internal marks
          </p>
        </div>
        <div className="md:w-1/2 text-right">
          <Switch
            id="internal-marks-toggle"
            className="bg-gray"
            checked={internalToggle}
            onChange={handleInternalToggle}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label htmlFor="external-marks-toggle" className="font-bold text-xl">
            Toggle External marks
          </label>
          <p className="text-sm text-para">
            The Graders will be allowed to Enter External marks
          </p>
        </div>
        <div className="md:w-1/2 text-right">
          <Switch
            id="external-marks-toggle"
            className="bg-gray"
            // checked={externalToggle}
            onChange={handleExternalToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
