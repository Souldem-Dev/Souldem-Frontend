import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function InformationCard() {
  return (
    <div>
      <Card className="border-0 min-w-60 bg-white">
        <CardHeader>
          <CardTitle className="text-center">Information</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p>Author</p>
          <p>Card Content</p>
        </CardContent>
        <CardContent className="flex justify-between">
          <p>Governance</p>
          <p>Card Content</p>
        </CardContent>{' '}
        <CardContent className="flex justify-between">
          <p>Start date</p>
          <p>Card Content</p>
        </CardContent>{' '}
        <CardContent className="flex justify-between">
          <p>End Date</p>
          <p>Card Content</p>
        </CardContent>
        <CardContent className="flex justify-between">
          <p>Status</p>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default InformationCard;
