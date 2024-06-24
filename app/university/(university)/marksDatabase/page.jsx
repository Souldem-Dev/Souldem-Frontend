import React from 'react';

import { Folder } from 'lucide-react';
import Searchbox from '@/components/grader/Searchbox';
import StudentInfo from '@/components/grader/StudentInfo';
import { ProfileMarks } from '@/components/marksDatabase/ProfileMarks';

const page = () => {
  return (
    <div className=" my-8  w-full	">
      <div className="flex mb-8 items-center  justify-center gap-x-1">
        <Folder className="text-blue font-bold" />

        <h1 className=" text-blue font-bold  text-3xl ">AcadHub</h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <Searchbox />

      <StudentInfo />
      <ProfileMarks />

      {/* card mapping */}
    </div>
  );
};

export default page;
