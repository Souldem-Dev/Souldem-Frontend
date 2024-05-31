import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function InformationCard() {
  return (
    <div>
      <Card className="border-0 rounded-3xl min-w-60 bg-white shadow-md py-4 ">
        <CardHeader className=" py-2 md:py-4">
          <CardTitle className="text-center">Information</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between px-4 py-0 md:py-2">
          <p className="font-extrabold  ">Author</p>
          <p>Card Content</p>
        </CardContent>
        <CardContent className="flex justify-between px-4 py-0 md:py-2">
          <p className="font-extrabold ">Governance</p>
          <p>Card Content</p>
        </CardContent>{' '}
        <CardContent className="flex justify-between px-4 py-0 md:py-2">
          <p className="font-extrabold ">Start date</p>
          <p>Card Content</p>
        </CardContent>{' '}
        <CardContent className="flex justify-between px-4 py-0 md:py-2">
          <p className="font-extrabold ">End Date</p>
          <p>Card Content</p>
        </CardContent>
        <CardContent className="flex justify-between px-4 py-0 md:py-2">
          <p className="font-extrabold ">Status</p>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default InformationCard;
