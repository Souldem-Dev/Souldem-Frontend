import React from 'react';
import ProposalCard from '../proposal/ProposalCard';

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

const Proposals = () => {
  return (
    <div className="mr-4">
      {proposalList.map((proposal) => (
        <ProposalCard key={proposal.id} {...proposal} />
      ))}
    </div>
  );
};

export default Proposals;
