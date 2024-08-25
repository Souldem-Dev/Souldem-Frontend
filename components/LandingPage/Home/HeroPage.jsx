import React from 'react';

const HeroPage = () => {
  return (
    <div className="flex h-full ">
      <div className="w-1/2">
        <h5>For Universities</h5>
        <h1 className="text-4xl">Manage University with Transparency, Ease </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Est in enim metus pretium sit
          enim volutpat pellentesque. Eu sit justo urna blandit urna dui.
          Pellentesque nunc sit enim elit scelerisque. Risus purus elementum vel
          vestibulum in diam velit.
        </p>
        <div className="flex">
          {' '}
          <button className="bg-blue text-white p-2 px-4 rounded-l w-full">
            Launch App
          </button>
          <button className="bg-blue text-white p-2 px-4 rounded-l w-full">
            Play Video
          </button>
        </div>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
};

export default HeroPage;
