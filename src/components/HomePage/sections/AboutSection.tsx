import { LayoutSizeProps } from "@/types/layout_types";
import Image from "next/image";

export default function HeroSection({
  default_screen_width,
  large_screen_width,
}: LayoutSizeProps) {
  return (
    <div className="caret-transparent w-screen flex justify-center items-center bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)">
      <div
        className={` ${default_screen_width} ${large_screen_width} flex flex-row justify-center items-center`}
      >
        {/* Our story description */}
        <div className="flex flex-col w-1/2">
          <p className="font-normal text-base">-Our story</p>
          <h1 className="font-medium text-5xl">About VoyageBlur</h1>
          <h3 className="font-normal text-base text-custom-font-gray">
            Founded in 2025, VoyageBlur was born from a passion for capturing
            the world through the unique aesthetics of analog film. In a digital
            age, we believe there&apos;s something magical about the imperfect,
            tangible nature of film photography. Our mission is to document
            travel experiences with authenticity and character that only analog
            formats can provide. Each grain, light leak, and imperfection tells
            part of the journey&apos;s story. We believe that travel isn&apos;t just about
            visiting places—it&apos;s about experiencing them deeply, slowly, and
            thoughtfully. Just like the deliberate process of shooting film
            forces you to slow down and consider each frame.
          </h3>

          <button className="w-fit px-5 py-2.5 border-2 border-custom-button-border-gray">
            Read More
          </button>
        </div>
        <div className="w-1/2 h-[1125px] relative">
            <Image 
            src="/section_image_vertical.jpeg"
            alt="Our Story Image"
            fill
            style={{objectFit: "cover"}}
            />
        </div>
      </div>
    </div>
  );
}
