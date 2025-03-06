"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface Post {
  id: string; // or UUID, adjust based on your type
  creation_date: string;
  content: string;
  header: string;
  url_header: string;
}

interface HomePageClientProps {
  posts: Post[];
}

function formatDate(dateToFormat:string) {
  const date = new Date(dateToFormat);
  return date.toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'});
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
    <div className="bg-[url(/paper_texture.png)] w-full bg-cover p-20 box-border">
      {/* Logo with car and camera icons*/}
      <div className="flex justify-around">
        <img src="/car2_improved.svg" />
        <img src="/travel_header.svg" className="mr-20" />
        <img src="/camera.svg" />
      </div>
      {/* Navigation Bar*/}
      <nav className="flex items-center justify-center border-y border-black-300 p-4">
        <ul className="flex">
          <li
            className="px-4 py-2 border-r-2 
              border-black text-5xl text-white
              text-outline
              "
          >
            Home
          </li>
          <li
            className="px-4 py-2 border-r-2 
              border-black text-5xl text-white
              text-outline
              "
          >
            Blog
          </li>
          <li
            className="px-4 py-2 border-r-2 
              border-black text-5xl text-white
              text-outline
              "
          >
            Gallery
          </li>
          <li
            className="px-4 py-2
              text-5xl text-white
              text-outline
              "
          >
            About
          </li>
        </ul>
      </nav>
      {/* Latest Story & Blog Introduction*/}
      <div className="flex justify-around mt-15">
        <div className="w-1/2 h-100">
          <video
            autoPlay
            muted
            loop
            controls
            preload="none"
            style={{
              height: "100%", // Set the desired height in px
              objectFit: "cover", // Crop edges while filling the area
            }}
          >
            <source src="/video3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="w-1/3">
          <h2 className="text-5xl text-center tracking-wider">
            Travel Stories
          </h2>
          <p className="text-2xl mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
            neque consequat erat scelerisque aliquam ut sed mauris. Fusce non
            enim et tellus aliquam congue.
          </p>
        </div>
      </div>
      {/*Countries Filter*/}
      <div className="flex justify-center items-center mt-20">
        <img src="/europe.png" />
        {/*Country Filter*/}
        <div className="flex justify-center text-center ml-20 ">
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
      <div className="flex flex-wrap justify-around">
        {posts.map((post) => (
          <div className="w-110 h-100 bg-amber-50 flex flex-col mt-20" key={post.id}>
            <Link href={`/${post.url_header}`}>
              <img src="/bismarck.jpg" className="w-full h-70" />
              {/*Text and Data*/}
              <div className="flex-grow flex flex-col justify-around">
                <h3 className="text-center mt-5 text-2xl font-bold">
                  {post.header}
                </h3>
                <div className="flex justify-center items-center">
                  <img src="/calendar.svg" className="w-6 mr-2" />
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
