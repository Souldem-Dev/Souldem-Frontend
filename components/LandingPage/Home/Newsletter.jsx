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
        height: '30vh',
      }}
      className="md:min-h-[60vh] min-h-[20vh]"
    >
      <div className="mx-8 py-40 md:mx-auto flex flex-col justify-center items-center ">
        <h6 className="text-2xl md:text-4xl font-semibold text-black my-4">
          Receive our newsletter
        </h6>
        <p className="text-black md:text-xl">
          Sign up for our newsletter to learn more about
          <span className="text-blue"> Souldem</span>
        </p>
        <div className="flex md:flex-row flex-col items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white border-2  rounded-3xl px-4 p-2 sm:w-96 my-4"
          />
          <button className="border-white border-2 bg-[#4F5DE4] h-12 px-8 md:bg-blue text-white rounded-xl  ">
            Subscribe
          </button>
        </div>

        <p className="text-black md:text-l md:w-4/12 text-center ">
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
