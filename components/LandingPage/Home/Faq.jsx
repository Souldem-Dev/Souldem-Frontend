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
        minHeight: '100vh',
        margin: 'auto',
      }}
    >
      <div className="mx-8 my-12 md:mx-28 flex flex-col items-center ">
        <h3 className="text-3xl md:text-4xl text-black my-4">FAQ</h3>

        <h5 className="text-xl md:text-2xl text-black font-semibold">
          You've got questions and we've got the answers
        </h5>
        <p>
          Explore the answers to common queries and make the most of your
          InsurMagix experience.
        </p>

        <Accordion type="single" collapsible className="w-11/12 md:w-3/4 my-8">
          <AccordionItem value="item-1 ">
            <AccordionTrigger className="text-black border-2 px-4 rounded-xl  border-blue py-6">
              Is it accessible?
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
