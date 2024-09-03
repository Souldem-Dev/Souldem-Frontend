import React from 'react';
import FaqImg from '@/app/assets/LandingPage/Home/Faq/Faq.svg';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Faq = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${FaqImg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'auto',

        display: 'flex',
      }}
      className="md:min-h-[100vh] min-h-[75vh]"
    >
      <div className="mx-4 my-12 md:mx-auto flex flex-col items-center justify-center ">
        <h3 className="text-3xl md:text-4xl text-black  my-2 font-light font-serif ">
          FAQ
        </h3>
        <hr className="w-32 text-[#07904B] " />

        <h5 className="text-xl md:text-3xl text-black my-4 font-light font-serif">
          You've got questions and we've got the answers
        </h5>
        <p className="text-sm">
          Explore the answers to common queries and make the most of your
          InsurMagix experience.
        </p>

        <Accordion type="single" collapsible className="w-full my-8">
          <AccordionItem value="item-1   ">
            <AccordionTrigger className="text-black border-2 px-4 rounded-xl w-3/4  border-blue py-6">
              Is it accessible? hello
            </AccordionTrigger>
            <AccordionContent className="text-black p-4">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-black border-2 px-4 rounded-xl border-blue py-6">
              Is it styled?
            </AccordionTrigger>
            <AccordionContent className="text-black p-4">
              Yes. It comes with default styles that match the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-black border-2 px-4 rounded-xl border-blue py-6">
              Is it animated?
            </AccordionTrigger>
            <AccordionContent className="text-black p-4">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
