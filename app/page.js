'use client';
import React, { useState, useEffect } from 'react';

function Page() {
  const [count, setCount] = useState({
    title: '',
    description: '',
  });

  const [submit, setSubmit] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count.title} times`;
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(count);

    setSubmit(count);
  };

  return (
    <div>
      {' '}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray text-para">
        <h1 className="text-5xl font-bold mb-4 text-blue">
          Welcome to Souldem
        </h1>
        <p className="text-xl mb-8 text-para">
          We are working hard to bring you something amazing! Stay tuned.
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
    </div>
  );
}
export default Page;
