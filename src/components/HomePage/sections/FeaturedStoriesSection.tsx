import { Stories } from "@/data/story_data";
import { LayoutSizeProps } from "@/types/layout_types";
import Image from "next/image";

export default function FeaturedStoriesSection({
  default_screen_width,
  large_screen_width,
}: LayoutSizeProps) {
  const stories = Stories.map((story) => {
    return (
      <div
        key={story.description}
        className={`max-w-[400px] w-full`}
      >
        <Image
          src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/37aed710-e371-4714-0520-f51fcb57da00/hd1920x1080"
          alt="Story Image"
          width={451}
          height={302}
          className="rounded-2xl"
        />
        {/* Country name and reading duration */}
        <div className="flex flex-row text-base font-medium">
          <h3>{story.country}</h3>
          <h3>{story.read_time} min read</h3>
        </div>
        <h2 className="font-semibold text-2xl">{story.title}</h2>
        <h3 className="font-normal text-base text-custom-font-gray">
          {story.description}
        </h3>
      </div>
    );
  });

  return (
    <div className="caret-transparent flex w-screen items-center justify-center bg-custom-bg">
      <div
        className={`lg:my-32 my-10 flex flex-col ${default_screen_width} ${large_screen_width}`}
      >
        <h1 className="font-bold text-[72px]">Featured Stories</h1>
        <h2 className="text-custom-font-gray font-semibold text-2xl">
          Travel narratives captures on analog film, documenting moments of
          beauty and discovery around the world.
        </h2>
        {/* Stories */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {stories}
        </div>

        {/* <button onClick={()=>{}} className="px-10 py-3 rounded-xl">
            View All Posts
        </button> */}
      </div>
    </div>
  );
}
