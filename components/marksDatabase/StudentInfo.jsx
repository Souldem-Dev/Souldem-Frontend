import React from 'react';

const StudentInfo = () => {
  return (
    <div className="drop-shadow-md w-1/2 p-4 bg-white m-12 flex flex-col gap-4 rounded-xl">
      <h4 className="font-bold text-2xl "> Student Info</h4>
      <div className="flex items-center gap-4 ">
        <div className="flex flex-col gap-4 ">
          <p>Governance Batch</p>
          <p>Nonce Id</p>
          <p> Wallet Address</p>
        </div>
        <div className="flex flex-col gap-4">
          <p> CSE Batch 1</p>
          <p>12</p>
          <p>0x123456789012345678901234567890 </p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
