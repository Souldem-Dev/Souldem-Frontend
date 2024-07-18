'use client';
import React, { useState } from 'react';

import Invite from './Invite';
import Approval from './Approval';

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
  const [activeSection, setActiveSection] = useState('Invite');

  const openCard = () => {
    setCard(true);
  };

  const closeCard = () => {
    setCard(false);
  };

  return (
    <div className="flex flex-col relative bg-white  p-2 md:p-4 md:mx-4 mx-2 lg:mx-20">
      <div className="flex justify-between mb-4">
        <div>
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
              activeSection === 'Approval'
                ? 'bg-blue text-white'
                : 'bg-gray-200'
            } rounded-l`}
            onClick={() => setActiveSection('Approval')}
          >
            Approval
          </button>
        </div>
      </div>

      {activeSection === 'Invite' && (
        <div className="p-2">
          <inviteMentor />
        </div>
      )}

      {activeSection === 'Approval' && (
        <div className="p-2">
          <Approval />
        </div>
      )}
    </div>
  );
};

export default FunctionCard;
