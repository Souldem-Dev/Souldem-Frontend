import Features from '@/components/LandingPage/Features/Features';
import Hero from '@/components/LandingPage/Features/Hero';
import SouldemDemo from '@/components/LandingPage/Features/SouldemDemo';
import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <SouldemDemo />
      <Footer />
    </div>
  );
};

export default page;
