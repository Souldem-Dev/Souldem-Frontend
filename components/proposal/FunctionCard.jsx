'use client';
import React, { useState } from 'react';

import PropForm from './PropForm';
import ProposalCard from './ProposalCard';
import ProposalFilter from './ProposalFilter';
import Invite from './Invite';
import Settings from '@/components/proposal/Settings';

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
      'Proposing to allocate funds for a community garden project to promote sustainability and healthy living on campus.Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation',
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
      'Suggesting a monthly hackathon to encourage collaboration and creativity among students in the computer science department. Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation',
  },
];

const FunctionCard = () => {
  const [Card, setCard] = useState(false);
  const [activeSection, setActiveSection] = useState('Proposal');

  const openCard = () => {
    setCard(true);
  };

  const closeCard = () => {
    setCard(false);
  };

  return (
    <div className="flex flex-col relative bg-white  md:p-4 md:mx-4 mx-2 lg:mx-20">
      <div className="flex justify-between mb-4">
        <div>
          <button
            className={`px-4 py-2 ${
              activeSection === 'Proposal'
                ? 'bg-blue text-white'
                : 'bg-gray-200'
            } rounded-l`}
            onClick={() => setActiveSection('Proposal')}
          >
            Proposal
          </button>
          <button
            className={`px-4 py-2 ${
              activeSection === 'Invite' ? 'bg-blue text-white' : 'bg-gray-200'
            } rounded-l`}
            onClick={() => setActiveSection('Invite')}
          >
            Invite
          </button>
          <button
            className={`px-4 py-2 ${
              activeSection === 'Settings'
                ? 'bg-blue text-white'
                : 'bg-gray-200'
            } rounded-l`}
            onClick={() => setActiveSection('Settings')}
          >
            Settings
          </button>
        </div>
        <button
          className="bg-blue text-white w-40 h-10 rounded-l"
          onClick={openCard}
        >
          &#43; Create Proposal
        </button>
        {Card && <PropForm onClose={closeCard} />}
      </div>

      {activeSection === 'Proposal' && (
        <div className="flex flex-col-reverse lg:flex-row p-2">
          <div className="lg:w-5/6">
            {proposalList.map((proposal) => (
              <ProposalCard key={proposal.id} {...proposal} />
            ))}
          </div>
          <div className="lg:w-1/6">
            <ProposalFilter />
          </div>
        </div>
      )}

      {activeSection === 'Invite' && (
        <div className="p-2">
          <Invite />
        </div>
      )}

      {activeSection === 'Settings' && (
        <div className="p-2">
          <Settings />
        </div>
      )}
    </div>
  );
};

export default FunctionCard;
