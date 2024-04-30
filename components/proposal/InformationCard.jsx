import React from 'react';

const InformationCard = () => {
  return (
    <div className="bg-white flex flex-col  h-  p-4  text-black gap-y-4 rounded-xl">
      <h1 className="text-center text-xl">Information</h1>

      <div className="flex justify-between items-center">
        <p className="font-extrabold text-lg">Author</p>
        <p>0X65742..3456</p>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-lg">Governance</h1>
        <p>CSE Batch</p>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-lg">Start date</h1>
        <p>20 MARCH 2024, 2:40 pm</p>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-lg">End Date</h1>
        <p>20 MARCH 2024, 2:40 pm</p>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-lg">Status</h1>
        <p>Ended, proposal accepted </p>
      </div>
    </div>
  );
};

export default InformationCard;
