"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PostWithAssets } from "@/types/post_types";
import Image from "next/image";

interface HomePageClientProps {
  posts: PostWithAssets[];
}

function formatDate(dateToFormat: string) {
  const date = new Date(dateToFormat);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function HomePageClient({ posts }: HomePageClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="lg:px-50">
      {/* Latest Story & Blog Introduction*/}
      <div className="flex lg:flex-row lg:justify-around lg:mt-15 flex-col justify-center items-center mt-0 relative">
        <div className="lg:w-1/2 lg:mr-10 md:h-50 md:aspect-none aspect-[16/9] w-full md:rounded-2xl overflow-hidden relative">
          <Image
            src="/stories.jpg"
            alt="stories-background"
            layout="fill"
            objectFit="cover"
            className="opacity-80"
          />
          {/*
          <video
            autoPlay
            muted
            loop
            controls
            preload="none"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover", // Crop edges while filling the area
            }}
          >
            <source src="/video3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          */}
        </div>
        <div className="lg:flex lg:flex-col lg:w-1/2 w-full">
          <h2 className="
              lg:text-7xl text-7xl text-center tracking-wider 
              lg:relative absolute 
              lg:top-auto lg:left-auto top-5 left-1/2
              lg:tranform-none transform
              lg:-translate-x-0 -translate-x-1/2
            lg:text-black text-amber-50">
            Travel Stories
          </h2>
          <p className="hidden lg:block px-30 pt-10 text-3xl text-center">
            Through this blog I will be sharing travel and photography stories,
            tips and anything that I would find interesting and worth sharing 😊
          </p>
        </div>
      </div>
      {/*Countries Filter*/}
      <div className="flex lg:flex-row flex-col justify-center items-center mt-20">
        <div className="lg:w-1/5 w-2/3 aspect-[16/9] relative">
          <Image
            src="/europe.png"
            alt="europe-flag"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/*Country Filter*/}
        <div className="flex justify-center text-center lg:ml-20 lg:mt-0 mt-10 ">
          <p className="text-3xl mr-5">Country: </p>
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              className="bg-blue-400 text-2xl text-white px-4 py-2 border-0 cursor-pointer rounded-md shadow-md focus:outline-none"
              onClick={toggleDropdown}
            >
              All ▼
            </button>

            {isOpen && (
              <div
                className="absolute mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden border"
                id="dropdownMenu"
              >
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Germany
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*Blog Posts*/}
      <div className="flex flex-wrap justify-around p-5 mt-10">
        {posts.map((post) => (
          <div
            className="w-110 h-100 bg-amber-50 flex flex-col mt-10 rounded-2xl overflow-hidden"
            key={post.id}
          >
            <Link href={`/${post.url_pathname}`}>
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={post.assets![0]}
                  alt="post-image"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              {/*Text and Data*/}
              <div className="flex-grow flex flex-col justify-around">
                <h3 className="text-center mt-10 text-2xl font-bold">
                  {post.header}
                </h3>
                <div className="flex justify-center items-center mt-5">
                  <Image
                    src="/calendar.svg"
                    alt="calendar-icon"
                    width={0}
                    height={0}
                    className="w-6 mr-2"
                  />
                  <p>{formatDate(post.creation_date)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
