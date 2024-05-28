import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VotesCard = () => {
  // Dummy data for 10 votes
  const votes = Array.from({ length: 10 }, (_, index) => ({
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
      <Card className="bg-white border-0 min-w-full shadow-md rounded-3xl ">
        <CardHeader>
          <CardTitle className="text-center text-xl">Votes</CardTitle>
        </CardHeader>

        <div className=" ">
          {votes.map((vote) => (
            <CardContent
              key={vote.id}
              className="flex  justify-between items-center py-1 md:py-2"
            >
              <div className="flex  gap-x-2 items-center">
                <Avatar className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
                  <AvatarImage
                    src={vote.user.avatarSrc}
                    alt={vote.user.username}
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback>{vote.user.username}</AvatarFallback>
                </Avatar>
                <p className="text-xs md:text-base">{vote.user.address}</p>
              </div>
              <div>
                <p className="text-xs md:text-base">{vote.action}</p>
              </div>
            </CardContent>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default VotesCard;
