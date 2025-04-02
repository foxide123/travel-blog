"use client"
import { Destinations } from "@/data/destinations_data";
import { LayoutSizeProps } from "@/types/layout_types";
import Image from "next/image";
/* import { useId } from "react";
 */
export default function HeroSection({
  default_screen_width,
  large_screen_width,
}: LayoutSizeProps) {


  const destinationItems = Destinations.map((destination) => {
    return (
      <div key={destination.name} className=" lg:w-[330px] lg:h-[301px] w-[250px] h-[250px] rounded-2xl relative overflow-hidden">
        <Image src="/hero_bg.png" alt="Destination Picture" fill />
        <div className="flex flex-row justify-center absolute bottom-0 h-5 w-full mb-10">
          <img
            src="/location_icon.svg"
            alt="Location Icon"
            className="mr-5"
            width={20}
          />
          <p className="text-white font-normal text-2xl">
            {destination.name}, {destination.country}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="caret-transparent w-screen flex justify-center items-center bg-custom-bg">
      <div
        className={`lg:mt-20 mt-10 mb-20 ${default_screen_width} ${large_screen_width} flex flex-col justify-center items-center overflow-hidden`}
      >
        <h2 className="font-normal text-base">EXPLORE</h2>
        <h1 className="font-normal lg:text-6xl text-5xl">Destinations</h1>
        <h3 className="lg:text-start text-center mt-5 font-normal text-2xl text-custom-font-gray">
          Discover the places we&apos;ve captured through our analog lenses, each
          with its own unique stories and film aesthetics
        </h3>
        {/* Destination Items Wrapper */}
        <div className="mt-10 flex flex-row flex-wrap justify-around gap-20">
          {destinationItems}
        </div>
        <h3 className="font-semibold text-2xl mt-10">More Places Coming Soon</h3>
        <p className="font-normal text-base">
          We&apos;re constantly exploring new destinations and adding them to
          our film travel journal. check back soon or subscribe to our
          newsletter to be notified
        </p>
       {/*  <button className="px-10 py-3 rounded-[10px]">
          View All Destinations
        </button> */}
      </div>
    </div>
  );
}
