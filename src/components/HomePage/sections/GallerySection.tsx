import { LayoutSizeProps } from "@/types/layout_types";
import Image from "next/image";

export default function GallerySection({
  default_screen_width,
  large_screen_width,
}: LayoutSizeProps) {
  return (
    <div
      className=" caret-transparent w-screen flex justify-center items-center bg-white"
    >
      <div
        className={`text-center text-wrap pt-10 pb-30 z-10 relative ${large_screen_width} ${default_screen_width}`}
      >
        <h3 className="text-2xl font-semibold">Gallery</h3>
        <h1 className="font-normal text-[64px]">Through The Analog Lens</h1>
        <h3 className="font-semibold text-2xl text-custom-font-gray">
          A curated selection of film photographs capturing the soul of our
          travels.
        </h3>
        {/*Gallery Pictures*/}
        <div className="mt-10 flex flex-col">
          <div className="flex flex-row flex-wrap gap-10">
            <div className="relative lg:min-w-[500px] min-w-[250px] flex-1 aspect-[16/9] rounded-2xl overflow-hidden">
              <Image src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/37aed710-e371-4714-0520-f51fcb57da00/hd1920x1080" alt="Gallery Picture" fill/>
            </div>
            <div className="relative lg:min-w-[500px] min-w-[250px] flex-1 aspect-[16/9] rounded-2xl overflow-hidden">
              <Image src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/37aed710-e371-4714-0520-f51fcb57da00/hd1920x1080" alt="Gallery Picture" fill/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
