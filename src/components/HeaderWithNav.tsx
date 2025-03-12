import Link from "next/link";

export default function Header() {
  return (
    <Link href="/">
      <header className="bg-[url(/paper_texture.png)] w-screen bg-cover p-20 box-border">
        {/* Logo with car and camera icons*/}
        <div className="lg:flex lg:justify-around items-center justify-center flex-row">
          <img src="/car2_improved.svg" className="w-full" />
          <img src="/travel_header.svg" className="mr-20" />
          <img src="/camera.svg" className="sm:w-full sm:block hidden" />
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
