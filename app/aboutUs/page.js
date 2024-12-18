import Founders from '@/components/LandingPage/About/Founders';
import Hero from '@/components/LandingPage/About/Hero';
import Souldem from '@/components/LandingPage/About/Souldem';
import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Souldem />
      <Founders />
      <Footer />
    </div>
  );
};

export default page;
