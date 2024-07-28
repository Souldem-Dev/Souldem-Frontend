// pages/404.js
import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray text-para">
      <h1 className="text-5xl font-bold mb-4 text-blue">
        404 - Page Not Found
      </h1>
      <p className="text-xl mb-8 text-para">
        The page you are looking for does not exist.
      </p>
      <div className="flex space-x-4 text-6xl">
        <span role="img" aria-label="construction" className="text-cyan">
          🚧
        </span>
        <span role="img" aria-label="tools" className="text-blueLight">
          🔧
        </span>
        <span role="img" aria-label="hammer" className="text-purpleLight">
          🔨
        </span>
      </div>
    </div>
  );
};

export default ErrorPage;
