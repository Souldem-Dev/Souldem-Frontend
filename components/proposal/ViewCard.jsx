import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VotesCard from './VotesCard';
import InformationCard from './InformationCard';

const ViewCard = () => {
  return (
    <main className="flex    ">
      <div className=" w-4/6 h-full mr-8 text-black flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>0X5678......</p>
            {/* <status
              className={`rounded-full px-2 ${
                status === 'Proposal Pending'
                  ? 'bg-blue text-white'
                  : status === 'Proposal Accepted'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              Proposal Pending
            </status> */}
          </div>
          <p>Ended 20 min ago</p>
        </div>
        <div>
          <h1 className="text-3xl mb-4">Proposal Title</h1>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            dolorem explicabo nisi mollitia quae. Dignissimos, iusto? Eveniet
          </p>
        </div>
        <div>
          <h1 className="text-3xl mb-4">Proposal Summary</h1>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            dolorem explicabo nisi mollitia quae. Dignissimos, iusto? Eveniet
            officiis commodi, sint nostrum voluptatem voluptas? Nam quam quidem
            dignissimos quasi, dolor numquam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Maxime dolorem explicabo nisi mollitia
            quae. Dignissimos, iusto? Eveniet officiis commodi, sint nostrum
            voluptatem voluptas? Nam quam quidem dignissimos quasi, dolor
            numquam.
          </p>
        </div>
        <div>
          <h1 className="text-3xl mb-4">Proposal Description</h1>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            dolorem explicabo nisi mollitia quae. Dignissimos, iusto? Eveniet
            officiis commodi, sint nostrum voluptatem voluptas? Nam quam quidem
            dignissimos quasi, dolor numquam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Maxime dolorem explicabo nisi mollitia
            quae. Dignissimos, iusto? Eveniet officiis commodi, sint nostrum
            voluptatem voluptas? Nam quam quidem dignissimos quasi, dolor
            numquam. consectetur adipisicing elit. Maxime dolorem explicabo nisi
            mollitia quae. Dignissimos, iusto? Eveniet officiis commodi, sint
            nostrum voluptatem voluptas? Nam quam quidem dignissimos quasi,
            dolor numquam. consectetur adipisicing elit. Maxime dolorem
            explicabo nisi mollitia quae. Dignissimos, iusto? Eveniet officiis
            commodi, sint nostrum voluptatem voluptas? Nam quam quidem
            dignissimos quasi, dolor numquam.
          </p>
        </div>
      </div>

      <div className="w-2/6 flex flex-col gap-y-12">
        {/* Information Card */}
        <div>
          <InformationCard />
        </div>

        {/* Vote Card */}
        <div>
          <VotesCard />
        </div>

        <button className="btn bg-gradient-to-r from-blue to-D_blue rounded-full p-2 px-4 text-white flex gap-2">
          End Proposal
        </button>
      </div>
    </main>
  );
};

export default ViewCard;
