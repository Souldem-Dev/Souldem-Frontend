import React from 'react';
import Image from 'next/image';
import bg from '../../../app/assets/LandingPage/Home/Newsletter/bg.svg';

const Newsletter = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 'auto',
        minHeight: '60vh',
      }}
    >
      <div className="mx-8 my-12 md:mx-28 flex flex-col items-center ">
        <h6 className="text-xl md:text-4xl text-blue my-4">
          Receive our newsletter
        </h6>
        <p className="text-black md:text-xl">
          Sign up for our newsletter to learn more about
          <span className="text-blue"> Souldem</span>
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="bg-white border-2  rounded-xl p-2 w-3/4 my-4"
        />
        <button className="border-white border-2 bg-[#4F5DE4] md:bg-blue text-white rounded-xl p-2 px-4 md:w-40">
          Subscribe
        </button>

        <p className="text-black md:text-l md:w-2/4">
          Souldem may use the contact information you provide to us to contact
          you about our products and services. By clicking “subscribe” you
          consent to receive such communications. Please review our Privacy
          Policy. This site is protected by reCAPTCHA and the Google Privacy
          Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
