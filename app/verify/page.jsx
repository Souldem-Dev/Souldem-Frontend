import VerifyBox from '@/components/verify/VerifyBox';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <Suspense fallback={null}>
      <VerifyBox />
    </Suspense>
  );
};

export default page;
