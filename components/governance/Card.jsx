import React from 'react';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';

const Card = ({ data }) => {
  return (
    <main className="  grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 w-full  gap-y-8  gap-x-4  ">
      {data.map((item, index) => (
        <div
          key={index}
          className=" w-auto h-full bg-white  border-0   text-black   relative rounded-3xl "
        >
          <div className=" p-6  flex flex-col justify-between gap-y-4">
            <div>
              <div>
                <h2 className="text-2xl font-thin ">{item.batch}</h2>
                <p> by {item.university}</p>
              </div>
            </div>

            <div>
              <div className="flex flex-col text-right">
                <p> Governannce address</p>
                <h2 className="text-2xl text-blue font-thin truncate ">
                  {item.address}
                </h2>
              </div>
            </div>
            {/* <Link href={`/governance/${item.address}`}> */}
            <Link href="/proposal">
              <button className=" absolute top-0 right-2  p-2 mx-auto my-4 text-white bg-blue   rounded-full focus:ring-1">
                <MoveUpRight className="text-white" />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Card;
