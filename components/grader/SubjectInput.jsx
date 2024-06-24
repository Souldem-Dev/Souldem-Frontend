import React from 'react';

const SubjectInput = () => {
  return (
    <div className="w-1/2 p-4 flex flex-col  m-12 gap-y-4">
      <div className="flex items-center justify-content">
        <label className="text-para font-bold w-1/3">Subject Code</label>
        <input
          type="text"
          placeholder="Enter Subject Code"
          className="w-2/3 h-12 text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2"
        />
      </div>
      <div
        className="flex items-center justify-content
      "
      >
        <label className="text-para font-bold w-1/3">Subject Name</label>
        <input
          type="text"
          placeholder="Enter Subject Name"
          className=" text-para border-0 focus:ring-0 focus:outline-none bg-gray rounded-xl px-2 h-12 w-2/3"
        />
      </div>

      <div className="flex">
        <button className="btn bg-blue focus:outline-none focus:ring w-1/2 text-white py-2 px-4 mr-2 rounded-xl">
          Internal Marks
        </button>
        <button className="btn bg-white hover:bg-blue hover:text-white focus:outline-none focus:ring w-1/2 text-blue border-blue border py-2 px-4 mr-6 rounded-xl">
          External Marks
        </button>
      </div>
    </div>
  );
};

export default SubjectInput;
