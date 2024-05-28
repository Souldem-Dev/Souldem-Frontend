'use client';
import React, { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const ProposalCard = ({ user, status, editedTime, content }) => {
  const [count, setCount] = useState(0);

  return (
    <main className="flex md:p-4 static z-0 w-full">
      {/* Proposal list */}
      <Link href="/proposal/proposalView" className="cursor-pointer">
        <div className="flex flex-col gap-4 h-auto bg-white rounded-xl w-full p-4 ">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatarSrc} alt={user.username} />
              </Avatar>
              <address className="text-sm md:text-base">{user.address}</address>
              <span
                className={`rounded-full w-full text-center text-sm md:text-base md:px-2  ${
                  status === 'Proposal Pending'
                    ? 'bg-blue text-white'
                    : status === 'Proposal Accepted'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {status}
              </span>
            </div>
            {/* <div>
              <p className="font-serif text-sm md:text-base">
                Edited {editedTime}
              </p>
            </div> */}
          </div>
          <div>
            <p className="text-sm md:text-base">{content}</p>
          </div>
        </div>
      </Link>
    </main>
  );
};

export default ProposalCard;
