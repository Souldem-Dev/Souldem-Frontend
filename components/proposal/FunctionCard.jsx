'use client';
import React from 'react';
import { useState } from 'react';

import PropForm from './PropForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProposalCard from './ProposalCard';
import ProposalFilter from './ProposalFilter';
import Invite from './Invite';

const proposalList = [
  {
    id: 1,
    voteCount: 9,
    user: {
      avatarSrc: 'https://github.com/shadcn.png',
      username: '@shadcn',
      address: '0x1234567890',
    },
    status: 'Proposal Pending',
    editedTime: '20 min',
    content:
      'Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation',
  },
  {
    id: 2,
    voteCount: 12,
    user: {
      avatarSrc: 'https://github.com/shadcn.png',
      username: '@user2',
      address: '0x0987654321',
    },
    status: 'Proposal Accepted',
    editedTime: '1 hour',
    content:
      'Proposing to allocate funds for a community garden project to promote sustainability and healthy living on campus.',
  },
  {
    id: 3,
    voteCount: 5,
    user: {
      avatarSrc: 'https://github.com/shadcn.png',
      username: '@user3',
      address: '0x1357924680',
    },
    status: 'Proposal Rejected',
    editedTime: '2 days',
    content:
      'Suggesting a monthly hackathon to encourage collaboration and creativity among students in the computer science department.',
  },
];

const FunctionCard = () => {
  const [Card, setCard] = useState(false);

  const openCard = () => {
    setCard(true);
  };

  const closeCard = () => {
    setCard(false);
  };
  return (
    <div className="flex justify-between relative bg-white   mx-20 p-6">
      <div className="flex  gap-x-20 ">
        <Tabs defaultValue="Proposal">
          <TabsList>
            <TabsTrigger value="Proposal">Proposal</TabsTrigger>
            <TabsTrigger value="Invite">Invite</TabsTrigger>
          </TabsList>
          <TabsContent value="Proposal" className="flex p-4 w-3/3">
            <div className="w-5/6">
              {proposalList.map((proposal) => (
                <ProposalCard key={proposal.id} {...proposal} />
              ))}
            </div>
            <div className="w-1/6 ">
              <ProposalFilter />
            </div>
          </TabsContent>
          <TabsContent value="Invite">
            <Invite />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <button
          className="bg-blue text-white p-2 w-40 px-4 rounded-l "
          onClick={openCard}
        >
          &#43; Create Proposal
        </button>
        {Card && <PropForm onClose={closeCard} />}
      </div>
    </div>
  );
};

export default FunctionCard;
