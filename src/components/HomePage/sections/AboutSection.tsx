import { LayoutSizeProps } from "@/types/layout_types";
import Image from "next/image";

export default function HeroSection({
  default_screen_width,
  large_screen_width,
}: LayoutSizeProps) {
  return (
    <div className="caret-transparent w-screen flex justify-center items-center bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)">
      <div
        className={`grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-12 grid-rows-9 ${default_screen_width} ${large_screen_width} lg:text-start text-center`}
      >
        <h3 className="lg:self-end self-center col-start-1 col-span-1 row-start-1 lg:row-span-4 row-span-1  font-normal text-base">
          Our Story
        </h3>
        <h1 className="lg:rounded-0 lg:self-center self-start leading-15 col-start-1 col-span-1 lg:row-start-5 row-start-2 lg:row-span-2 row-span-1  font-medium text-5xl">
          About VoyageBlur
        </h1>
        <p className="col-start-1 col-span-1 lg:row-start-7  lg:row-span-6 lg:mt-0 mt-10 lg:pr-[50px] row-start-5 row-span-6  font-normal text-base text-custom-font-gray">
          Founded in 2025, VoyageBlur was born from a passion for capturing the
          world through the unique aesthetics of analog film. In a digital age,
          we believe there&apos;s something magical about the imperfect, tangible
          nature of film photography. Our mission is to document travel
          experiences with authenticity and character that only analog formats
          can provide. Each grain, light leak, and imperfection tells part of
          the journey&apos;s story. We believe that travel isn&apos;t just about visiting
          places—it&apos;s about experiencing them deeply, slowly, and thoughtfully.
          Just like the deliberate process of shooting film forces you to slow
          down and consider each frame.
        </p>
        <div className="relative lg:col-start-2 lg:h-[1000px] lg:row-span-12 lg:ml-[50px] lg:rounded-0 rounded-2xl overflow-hidden lg:mt-0 mt-10 row-start-3 row-span-2 col-span-1">
          <Image
            src="/section_image_vertical.jpeg"
            alt="Our Story Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
