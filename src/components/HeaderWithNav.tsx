import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <Link href="/">
      <header
        // className="bg-[url(/paper_texture.png)] w-screen bg-cover p-10 box-border"
        className="w-screen pl-5 pr-5 box-border"
      >
        {/* Logo with car and camera icons*/}
        {/* Small screens: header on its own row */}
        <div className="sm:hidden block w-full aspect-[16/9] relative mb-[-30px]">
          <Image
            src="/travel_header.svg"
            alt="Travel Header"
            objectFit="contain"
            layout="fill"
            className="mx-auto"
          />
        </div>
        <div className="sm:hidden flex justify-center items-center mb-5">
          <div className="w-1/2 aspect-[16/9] relative">
            <Image
              src="/car2_improved.svg"
              alt="Car"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="w-1/3 aspect-[16/9] relative">
            <Image
              src="/camera.svg"
              alt="Camera"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        {/* Logo with car and camera icons*/}
        {/* Large screens: car - header - camera */}
        <div className="hidden sm:flex items-center justify-center flex-row pr-10">
          <div className="w-1/5 aspect-[16/9] relative">
            <Image
              src="/car2_improved.svg"
              alt="car-icon"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative w-1/3 aspect-[16/9] mr-8">
            <Image
              src="/travel_header.svg"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative w-1/6 aspect-[16/9]">
            <Image
              src="/camera.svg"
              alt="camera-icon"
              layout="fill"
              objectFit="contain"
              className=""
            />
          </div>
        </div>

        {/* Navigation Bar*/}
        <nav className="sm:flex sm:items-center sm:justify-center sm:border-y sm:border-black-300 sm:p-4 hidden">
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
      </header>
    </Link>
  );
}
