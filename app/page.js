'use client';
import Features from '@/components/LandingPage/Home/Features';
import HeroPage from '@/components/LandingPage/Home/HeroPage';
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
      <HeroPage /> <Features />
    </div>
  );
}
export default Page;
