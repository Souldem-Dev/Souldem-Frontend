import ViewCard from '@/components/proposal/ViewCard';
import React from 'react';
import Image from 'next/image';
import icon from '@/app/assets/proposal/icon.svg';

const data = [
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
    title:
      'Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation',

    summary:
      'Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participationWould hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation  ',

    description:
      'Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participationWould hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation Would hosting a seminar on Artificial Intelligence to enlighten students and faculty about its applications and impacts, featuring experts and fostering interdisciplinary discourse, encourage innovation and broad participation  ',
  },
];

const page = () => {
  return (
    <div className="m-8">
      <div className="flex my-4 ">
        <Image src={icon} alt="dashbopard" />

        <h1 className="font-light text-blue  text-3xl">
          Would hosting a seminar on Artificial Intelligence..
        </h1>
      </div>{' '}
      <ViewCard />
    </div>
  );
};

export default page;
