import { LayoutSizeProps } from "@/types/layout_types";
import Image from "next/image";

export default function HeroSection({
  default_screen_width,
  large_screen_width,
}: LayoutSizeProps) {
  return (
    <div className="lg:h-screen h-[75vh] caret-transparent w-screen flex justify-center items-center overflow-hidden">
      {/* Bg Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/hero_bg.png"
          alt="hero background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
          decoding="async"
          sizes="100vw"
        />
      </div>

      <div
        className={`lg:pt-10 text-wrap h-full z-10 relative ${large_screen_width} ${default_screen_width}`}
      >
        {/* Navbar */}
        <div className="lg:flex flex-row justify-between items-center hidden">
          <div>
            <h1>VoyageBlur</h1>
          </div>
          <div>
            <ul className="flex flex-row font-semibold text-2xl ">
              <li className="pr-5">Home</li>
              <li className="pr-5">Stories</li>
              <li className="pr-5">About</li>
              <li className="pr-5">Destinations</li>
              <li className="pr-5">Gallery</li>
            </ul>
          </div>
        </div>
        <div className="lg:h-auto lg:mt-20 px-20 flex flex-col justify-center items-center h-full">
          <h1 className="lg:text-[72px] text-5xl font-bold text-center">
            Exploring the world, <br /> one blurry frame at the time
          </h1>
          <h2 className="lg:block hidden text-3xl font-medium xl:w-[950px] p-2.5 text-center">
            A curated collection of analogy photography and travel stories from
            around the globe
          </h2>
          <div className="lg:block hidden px-11 py-5 rounded-2xl bg-custom-button-gray/50">
            <h3 className="text-2xl font-bold">Explore Stories</h3>
          </div>
          <div>
            <h3 className="lg:block hidden font-normal text-[40px]">Scroll</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
