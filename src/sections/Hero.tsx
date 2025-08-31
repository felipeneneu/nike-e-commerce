'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { shoes, statistics } from '@/constants';

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState('/hero-shoe.png');

  return (
    <section
      className="max-container -mt-28 flex min-h-screen w-full flex-col justify-center gap-10 xl:flex-row"
      id="home"
    >
      <div className="max-xl:padding-x relative mt-5 flex w-full flex-col items-start justify-center px-5 md:mt-0 md:px-0 xl:w-2/5">
        <p className="-font-josh bg-gradient-to-r from-[#E2418D] to-[#FB7C76] bg-clip-text font-bold text-green text-transparent text-xl">
          Bold & Sporty
        </p>

        <h1 className="mt-10 font-bold font-inter text-8xl max-sm:text-[72px] max-sm:leading-[82px]">
          <span className="relative z-10 pr-10 xl:whitespace-nowrap xl:bg-light-100">
            Style That Moves
          </span>
          <br />
          <span className="mt-3 inline-block text-green">With </span> You.
        </h1>
        <p className="mt-6 mb-14 font-inter text-dark-700 text-lg leading-8 sm:max-w-sm">
          Not just style. Not just comfort. Footwear that effortlessly moves
          with your every step.
        </p>

        <Button className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 py-4 font-inter text-gray-100 text-lg leading-none">
          Find Your Shoe
        </Button>

        <div className="hidden md:mt-20 md:flex md:w-full md:flex-wrap md:items-start md:justify-start md:gap-16">
          {statistics.map((stat, index) => (
            <div key={index}>
              <p className="font-bold font-inter text-4xl">{stat.value}</p>
              <p className="font-inter text-dark-700 leading-7">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:relative md:flex md:flex-1 md:items-center md:justify-center md:bg-center md:bg-cover md:bg-hero-bg md:bg-primary xl:min-h-screen">
        <Image
          alt="shoe collection"
          className="relative object-contain"
          height={502}
          src={bigShoeImg}
          width={610}
        />

        <div className="-bottom-[1%] absolute flex gap-4 max-sm:px-6 sm:left-[10%] sm:gap-6">
          {shoes.map((image, index) => (
            <div key={index}>
              <div
                className={`rounded-xl border-2 ${
                  bigShoeImg === image.bigShoe
                    ? 'border-green'
                    : 'border-transparent'
                } cursor-pointer max-sm:flex-1`}
                onClick={() => setBigShoeImg(image.bigShoe)}
              >
                <div className="flex items-center justify-center rounded-xl bg-card bg-center bg-cover max-sm:p-4 sm:h-40 sm:w-40">
                  <Image
                    alt="shoe colletion"
                    className="object-contain"
                    height={103.34}
                    src={image.thumbnail}
                    width={127}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
