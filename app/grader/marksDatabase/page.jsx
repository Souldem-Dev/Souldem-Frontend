import React from 'react';
import { Folder } from 'lucide-react';
import Searchbox from '@/components/grader/Searchbox';
import StudentInfo from '@/components/grader/StudentInfo';
import SubjectInput from '@/components/grader/SubjectInput';
import MarksTable from '@/components/grader/MarksTable';

const page = () => {
  return (
    <div className=" m-8  w-full mb-40">
      <div className="flex items-center gap-2 mb-8">
        <Folder className="text-blue" />

        <h1 className="font-light text-blue  text-3xl">Marks Database</h1>
      </div>

      {/* Add the search and filter dropdown here */}
      <Searchbox />

      <SubjectInput />
    </div>
  );
};

export default page;
