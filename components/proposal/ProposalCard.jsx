'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProposalCard = ({ user, status, editedTime, content }) => {
  const [count, setCount] = useState(0);

  return (
    <main className="flex p-4 static z-0   ">
      {/* Proposal list */}
      <div className="flex gap-x-4  h-40  bg-white rounded-xl ">
        <div className="flex flex-col items-center">
          <button onClick={() => setCount(count + 1)}>
            <svg
              width="26"
              height="24"
              viewBox="0 0 26 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6734 2.3058C11.7352 0.466815 14.3895 0.466817 15.4512 2.3058L25.405 19.5463C26.4668 21.3852 25.1396 23.684 23.0161 23.684H3.10855C0.985081 23.684 -0.342087 21.3852 0.719649 19.5462L10.6734 2.3058Z"
                fill="#3E68FC"
              />
            </svg>
          </button>
          <h1>{count}</h1>
          <button onClick={() => setCount(count - 1)}>
            <svg
              width="26"
              height="24"
              viewBox="0 0 26 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4511 21.8651C14.3893 23.7041 11.735 23.7041 10.6733 21.8651L0.719491 4.62465C-0.342245 2.78567 0.984926 0.486942 3.1084 0.486942H23.016C25.1394 0.486942 26.4666 2.78567 25.4049 4.62465L15.4511 21.8651Z"
                fill="#C8CDD0"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col md:flex-row  justify-between gap-y-4 ">
            <div className="flex items-center gap-x-4">
              <Avatar>
                <AvatarImage src={user.avatarSrc} alt={user.username} />
              </Avatar>
              <address>{user.address}</address>
              <status
                className={`rounded-full px-4 ${
                  status === 'Proposal Pending'
                    ? 'bg-blue text-white'
                    : status === 'Proposal Accepted'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {status}
              </status>
            </div>
            <div>
              <p className="font-serif">Edited {editedTime}</p>
            </div>
          </div>
          <div>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProposalCard;
