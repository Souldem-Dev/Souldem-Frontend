import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Page Under Construction</h1>
      <p className="text-xl mb-8">
        We are working hard to bring you something amazing! Stay tuned.
      </p>
      <div className="flex space-x-4 text-6xl">
        <span role="img" aria-label="construction">
          🚧
        </span>
        <span role="img" aria-label="tools">
          🔧
        </span>
        <span role="img" aria-label="hammer">
          🔨
        </span>
      </div>
    </div>
  );
};

export default Page;
