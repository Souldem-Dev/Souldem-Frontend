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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={count.title}
          onChange={handleChange}
        />

        <label htmlFor="description">desc</label>
        <input
          type="text"
          id="description"
          name="description"
          value={count.description}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          submit
        </button>
      </form>

      {submit && (
        <div>
          <p>{submit.title}</p>
          <p>{submit.description}</p>
        </div>
      )}
    </div>
  );
}
export default Page;
