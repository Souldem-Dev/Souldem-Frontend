import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import case1 from '@/app/assets/LandingPage/Home/usecases/case1.svg';
import case2 from '@/app/assets/LandingPage/Home/usecases/case2.svg';
import case3 from '@/app/assets/LandingPage/Home/usecases/case3.svg';
import case4 from '@/app/assets/LandingPage/Home/usecases/case4.svg';
import case5 from '@/app/assets/LandingPage/Home/usecases/case5.svg';
import case6 from '@/app/assets/LandingPage/Home/usecases/case6.svg';
import { MoveRight } from 'lucide-react';

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false, // Hide navigation arrows
};

const Carousel = () => {
  return (
    <div className="pt-20">
      <h3 className="text-2xl md:text-4xl text-center font-bold text-black">
        Benefits <span className="text-blue">Souldem</span> Provides To
        Universities
      </h3>
      <div className="sm:hidden">
        <Slider {...carouselSettings}>
          <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl">
            <Image src={case1} alt="Feature1" className="w-11/12 rounded-lg" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
              Enhanced Security
            </h3>
            <p className="text-base text-black mt-2">
              Academic records are stored on immutable blockchains, reducing the
              risk of tampering or fraud.
            </p>
            <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
              Find Out More
              <MoveRight />
            </button>
          </div>
          <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl">
            <Image src={case2} alt="Feature2" className="w-11/12 rounded-lg" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
              Streamlined Verification
            </h3>
            <p className="text-base text-black mt-2">
              Simplifies the process of verifying academic credentials for
              employers and institutions.
            </p>
            <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
              Find Out More
              <MoveRight />
            </button>
          </div>
          <div className="flex flex-col bg-white drop-shadow-2xl p-4 h-full items-center rounded-3xl">
            <Image src={case3} alt="Feature3" className="w-11/12 rounded-lg" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
              Easy Access
            </h3>
            <p className="text-base text-black mt-2">
              Provides students with easy access to their academic records
              anytime, anywhere.
            </p>
            <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
              Find Out More
              <MoveRight />
            </button>
          </div>
          <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl">
            <Image src={case4} alt="Feature4" className="w-11/12 rounded-lg" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
              Decentralized Storage
            </h3>
            <p className="text-base text-black mt-2">
              Utilizes decentralized networks to ensure that academic records
              are always accessible and secure.
            </p>
            <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
              Find Out More
              <MoveRight />
            </button>
          </div>
          <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl">
            <Image src={case5} alt="Feature5" className="w-11/12 rounded-lg" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
              Instant Updates
            </h3>
            <p className="text-base text-black mt-2">
              Updates to academic records are reflected in real-time, ensuring
              the most current information.
            </p>
            <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
              Find Out More
              <MoveRight />
            </button>
          </div>
          <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl">
            <Image src={case6} alt="Feature6" className="w-11/12 rounded-lg" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
              Eco-Friendly
            </h3>
            <p className="text-base text-black mt-2">
              Reduces the need for paper-based documentation, contributing to a
              more sustainable environment.
            </p>
            <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
              Find Out More
              <MoveRight />
            </button>
          </div>
        </Slider>
      </div>

      <div className="hidden sm:grid grid-cols-1 mx-2 md:mx-16 my-8 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl justify-between">
          <Image src={case1} alt="Feature1" className="w-11/12 rounded-lg" />
          <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
            Enhanced Security
          </h3>
          <p className="text-base text-black mt-2">
            Academic records are stored on immutable blockchains, reducing the
            risk of tampering or fraud.
          </p>
          <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
            Find Out More
            <MoveRight />
          </button>
        </div>
        <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl justify-between">
          <Image src={case2} alt="Feature2" className="w-11/12 rounded-lg" />
          <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
            Streamlined Verification
          </h3>
          <p className="text-base text-black mt-2">
            Simplifies the process of verifying academic credentials for
            employers and institutions.
          </p>
          <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
            Find Out More
            <MoveRight />
          </button>
        </div>
        <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl justify-between">
          <Image src={case3} alt="Feature3" className="w-11/12 rounded-lg" />
          <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
            Easy Access
          </h3>
          <p className="text-base text-black mt-2">
            Provides students with easy access to their academic records
            anytime, anywhere.
          </p>
          <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
            Find Out More
            <MoveRight />
          </button>
        </div>
        <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl justify-between">
          <Image src={case4} alt="Feature4" className="w-11/12 rounded-lg" />
          <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
            Decentralized Storage
          </h3>
          <p className="text-base text-black mt-2">
            Utilizes decentralized networks to ensure that academic records are
            always accessible and secure.
          </p>
          <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
            Find Out More
            <MoveRight />
          </button>
        </div>
        <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl justify-between">
          <Image src={case5} alt="Feature5" className="w-11/12 rounded-lg" />
          <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
            Instant Updates
          </h3>
          <p className="text-base text-black mt-2">
            Updates to academic records are reflected in real-time, ensuring the
            most current information.
          </p>
          <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
            Find Out More
            <MoveRight />
          </button>
        </div>
        <div className="flex flex-col bg-white drop-shadow-2xl p-4 items-center rounded-3xl justify-between">
          <Image src={case6} alt="Feature6" className="w-11/12 rounded-lg" />
          <h3 className="text-xl md:text-2xl font-semibold text-black mt-4">
            Eco-Friendly
          </h3>
          <p className="text-base text-black mt-2">
            Reduces the need for paper-based documentation, contributing to a
            more sustainable environment.
          </p>
          <button className="flex items-center gap-x-2 justify-center text-black bg-inherit my-2 border border-blue w-full p-2">
            Find Out More
            <MoveRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
