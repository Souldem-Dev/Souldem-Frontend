import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import forest from '@/app/assets/forest.svg';

const DriveCard = () => {
  return (
    <div>
      <Card className="w-60 border-0  ">
        <CardHeader className="flex">
          <CardTitle className="flex justify-between font-thin text-lg">
            Template 1 <EllipsisVertical />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={forest}
            alt="Empty Certificate"
            className="object-cover h-40"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DriveCard;
