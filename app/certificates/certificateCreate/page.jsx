import React from 'react';

import Image from 'next/image';
import certificate from '@/app/assets/certificates/Certificate.svg';
import CreateForm from '@/components/certificates/CreateForm';

const page = () => {
  return (
    <div className=" m-8  w-full	">
      <div className="flex mb-8">
        <Image src={certificate} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">
          Create Certificates Template
        </h1>
      </div>

      {/* Add the search and filter dropdown here */}

      {/* Form */}
      <CreateForm />
    </div>
  );
};

export default page;
