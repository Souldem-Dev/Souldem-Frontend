'use client';
import Footer from '@/components/LandingPage/Footer';
import Faq from '@/components/LandingPage/Home/Faq';
import Features from '@/components/LandingPage/Home/Features';
import HeroPage from '@/components/LandingPage/Home/HeroPage';
import Newsletter from '@/components/LandingPage/Home/Newsletter';
import Navbar from '@/components/LandingPage/Navbar';
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
      <Navbar />
      <HeroPage /> <Features />
      <Newsletter />
      <Faq />
      <Footer />
    </div>
  );
}
export default Page;
