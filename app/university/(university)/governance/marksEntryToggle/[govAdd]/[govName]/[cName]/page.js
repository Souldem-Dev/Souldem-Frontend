'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import './slider.css';

const Page = () => {
  const [internalToggle, setInternalToggle] = useState(false);
  const [externalToggle, setExternalToggle] = useState(false);
  const params = useParams();

  const handleInternalToggle = async () => {
    setInternalToggle(!internalToggle);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + 'marksheets/allowInternalMarks',
        {
          governAdd: params.govAdd,
          semNo: 9,
          internal: !internalToggle,
          external: false,
        }
      );
      if (response.status === 200) {
        toast.success('Internal Marks Allowed');
      }
      console.log(response);
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
          governAdd: params.govAdd,
          semNo: 9,
          internal: false,
          external: !externalToggle,
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
    <div className="w-full bg-white drop-shadow-md h-full py-8 px-4 md:p-20 flex flex-col gap-y-8 rounded-xl mx-20  my-20 md:my-auto">
      <div className="flex gap-x-4 items-center mx-auto">
        <Link
          href={`/university/governance/invite/${params.govAdd}/${params.govName}/${params.cName}`}
        >
          <button className="px-4 py-2 rounded-md bg-white text-blue hover:border-2 hover:border-blue">
            {' '}
            governance
          </button>
        </Link>

        <Link
          href={`/university/governance/marksEntryToggle/${params.govAdd}/${params.govName}/${params.cName}`}

          // href={'/university/governance/marksEntryToggle'}
        >
          <button className="px-4 py-2 rounded-md bg-blue text-white hover:border-blue hover:border-2">
            {' '}
            toggle
          </button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label htmlFor="internal-marks-toggle" className="font-bold text-xl">
            Toggle Internal Marks
          </label>
          <p className="text-sm text-gray-600">
            The Graders will be allowed to enter internal marks
          </p>
        </div>
        <div className="md:w-1/2 text-right">
          <label className="switch">
            <input
              id="internal-marks-toggle"
              type="checkbox"
              checked={internalToggle}
              onChange={handleInternalToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label htmlFor="external-marks-toggle" className="font-bold text-xl">
            Toggle External Marks
          </label>
          <p className="text-sm text-gray-600">
            The Graders will be allowed to enter external marks
          </p>
        </div>
        <div className="md:w-1/2 text-right">
          <label className="switch">
            <input
              id="external-marks-toggle"
              type="checkbox"
              checked={externalToggle}
              onChange={handleExternalToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Page;
