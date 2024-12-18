import React from 'react';

const Approval = () => {
  return (
    <form className="w-11/12 bg-white drop-shadow-md h-full py-8 px-4 md:p-20 my-8 flex flex-col gap-y-12 rounded-xl">
      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label className="font-bold text-lg md:text-xl">
            Student’s Email
          </label>
          <p className="text-sm text-para">
            The email Id of student registered to souldem{' '}
          </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="authorizedName"
            name="authorizedName"
            placeholder="Enter Authorized Name"
            className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label className="font-bold text-lg md:text-xl">
            Current Semester{' '}
          </label>
          <p className="text-sm text-para">
            Student’s current college semester
          </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="universityName"
            name="universityName"
            placeholder="Enter University Name"
            className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-y-2">
        <div className="md:w-1/2">
          <label className="font-bold text-lg md:text-xl">Receipt Number</label>
          <p className="text-sm text-para">Student’s Receipt number </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="universityName"
            name="universityName"
            placeholder="Enter University Name"
            className="rounded-xl h-12 px-2 min-w-full bg-gray text-sm md:text-base"
          />
        </div>
      </div>
    </form>
  );
};

export default Approval;
