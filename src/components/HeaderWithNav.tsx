import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <Link href="/">
          <header 
   // className="bg-[url(/paper_texture.png)] w-screen bg-cover p-10 box-border" 
   className="w-screen p-10 box-border" 
    >
      {/* Logo with car and camera icons*/}
      {/* Small screens: header on its own row */}
            <div className="block lg:hidden mb-4">
        <Image src="/travel_header.svg" alt="Travel Header" className="mx-auto"/>
      </div>
      <div className="flex justify-center items-center">
        <Image src="/car2_improved.svg" alt="Car" className="w-1/2" />
        <Image src="/camera.svg" alt="Camera" className="w-1/4" />
      </div>

      {/* Logo with car and camera icons*/}
      {/* Large screens: car - header - camera */}
      <div className="hidden lg:flex lg:justify-around items-center justify-center flex-row">
        <Image src="/car2_improved.svg" alt="car-icon" className="sm:w-full w-[50%]"/>
        <Image src="/travel_header.svg" alt="logo" className="mr-20" />
        <Image src="/camera.svg" alt="camera-icon" className="sm:w-full sm:block hidden" />
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
