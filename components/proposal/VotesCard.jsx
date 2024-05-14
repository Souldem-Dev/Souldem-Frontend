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
      <Card className="bg-white border-0 min-w-full ">
        <CardHeader>
          <CardTitle className="text-center text-xl">Votes</CardTitle>
        </CardHeader>

        <div className=" ">
          {votes.map((vote) => (
            <CardContent
              key={vote.id}
              className="flex  justify-between items-center"
            >
              <div className="flex  gap-x-2 items-center">
                <Avatar>
                  <AvatarImage
                    src={vote.user.avatarSrc}
                    alt={vote.user.username}
                  />
                  <AvatarFallback>{vote.user.username}</AvatarFallback>
                </Avatar>
                <p>{vote.user.address}</p>
              </div>
              <div>
                <p>{vote.action}</p>
              </div>
            </CardContent>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default VotesCard;
