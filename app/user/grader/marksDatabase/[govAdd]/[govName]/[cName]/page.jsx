'use client';
import React from 'react';
import { Folder } from 'lucide-react';
import Searchbox from '@/components/grader/Searchbox';
import StudentInfo from '@/components/grader/StudentInfo';
import SubjectInput from '@/components/grader/SubjectInput';
import MarksTable from '@/components/grader/MarksTable';
import { useParams } from 'next/navigation';

const page = () => {
  const params = useParams();

  const govAdd = params.govAdd;

  console.log(govAdd);
  return (
    <div className=" m-8  w-full mb-40">
      <div className="flex items-center gap-2 ">
        <Folder className="text-blue" />

        <h1 className=" text-blue font-bold  text-4xl">Marks Database</h1>
      </div>

      {/* Add the search and filter dropdown here */}

      <SubjectInput govAdd={govAdd} />
    </div>
  );
};

export default page;
