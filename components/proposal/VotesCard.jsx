import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const VotesCard = () => {
  // Dummy data for 10 votes
  const votes = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    user: {
      avatarSrc: 'https://github.com/shadcn.png',
      username: `@user${index + 1}`,
      address: `0x${Math.floor(Math.random() * 9999999999)}`,
    },
    action: Math.random() < 0.5 ? 'upvoted' : 'downvoted',
  }));

  return (
    <div>
      <div className="bg-white  h-full  p-4 rounded-xl text-black ">
        <h1 className="text-center text-xl">Votes</h1>

        <div className="flex flex-col justify-center ">
          {votes.map((vote) => (
            <div
              key={vote.id}
              className="flex justify-between items-center mb-2"
            >
              <div className="flex justify-between items-center gap-x-2">
                <Avatar>
                  <AvatarImage
                    src={vote.user.avatarSrc}
                    alt={vote.user.username}
                  />
                  <AvatarFallback>{vote.user.username}</AvatarFallback>
                </Avatar>
                <p>{vote.user.address}</p>
              </div>
              <p>{vote.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotesCard;
