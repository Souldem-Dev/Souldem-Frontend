import React from 'react';

import CreateForm from '@/components/certificates/CreateForm';
import { Award } from 'lucide-react';

const page = () => {
  return (
    <div className=" mx-6 md:mx-12 my-4 w-full	">
      <div className="flex  mb-8 items-center">
        <Award className="text-blue " />
        <h1 className="font-light text-blue  text-2xl md:text-3xl">
          Create Certificate Template
        </h1>
      </div>

      {/* Add the search and filter dropdown here */}

      {/* Form */}
      <CreateForm />
    </div>
  );
};

export default page;
