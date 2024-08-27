import Navbar from '@/components/LandingPage/Navbar';
import React from 'react';
import Image from 'next/image';
import HelpDesk from '@/app/assets/LandingPage/Helpdesk/HelpDesk.svg';
import Footer from '@/components/LandingPage/Footer';

const page = () => {
  return (
    <div className="bg-white">
      <Navbar />

      <div className="bg-white mx-8 my-12 md:mx-28 ">
        <h6 className="text-xl md:text-4xl text-blue my-4">Help Desk</h6>
        <p className="text-black md:text-2xl">
          We’re currently working on building a better Help Desk experience for
          you. if you need support, please email us at
          <span className="text-red-500"> support@souldem.com</span>
        </p>

        <Image src={HelpDesk} alt="HelpDesk" className="mx-auto w-1/2 h-1/2" />

        <p className="text-black md:text-2xl">
          For common questions and answers, you can also check our
          <span className="text-red-500"> FAQ page.</span>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default page;
