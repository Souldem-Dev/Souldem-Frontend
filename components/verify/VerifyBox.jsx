import React from 'react';

const VerifyBox = () => {
  return (
    <div className=" w-11/12 bg-white drop-shadow-md h-full py-8 px-4 md:p-20  flex flex-col gap-y-8 rounded-xl ">
      <div className="flex flex-col md:flex-row w-full  ,gap-y-2 ">
        <div className="md:w-1/2 ">
          <label className="font-bold text-xl">University Wallet Address</label>
          <p className="text-sm text-para">
            Verify certificate status by providing the student's university
            wallet address.
          </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Authorized Name"
            className=" rounded-xl h-12 px-2 min-w-full bg-gray"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full  ,gap-y-2 ">
        <div className="md:w-1/2 ">
          <label className="font-bold text-xl">Batch Wallet Address</label>
          <p className="text-sm text-para">
            Verify certificate status by providing the student's Batch wallet
            address.
          </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Authorized Name"
            className=" rounded-xl h-12 px-2 min-w-full bg-gray"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full  ,gap-y-2 ">
        <div className="md:w-1/2 ">
          <label className="font-bold text-xl">Holders Wallet Address</label>
          <p className="text-sm text-para">
            Verify certificate status by providing the Holder’s (student) wallet
            address.
          </p>
        </div>
        <div className="md:w-1/2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Authorized Name"
            className=" rounded-xl h-12 px-2 min-w-full bg-gray"
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn bg-gradient-to-r from-blue to-D_blue focus:outline-none focus:ring  w-28 text-white  py-2 px-4  mr-6  rounded-xl"
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyBox;
