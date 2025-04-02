"use client";

import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { PostWithAssets } from "@/types/post_types";
import HeroSection from "@/components/HomePage/sections/HeroSection";
import { ScreenSizeEnum } from "@/types/layout_types";
import FeaturedStoriesSection from '../components/HomePage/sections/FeaturedStoriesSection';
import AboutSection from "@/components/HomePage/sections/AboutSection";
import DestinationsSection from "@/components/HomePage/sections/DestinationsSection";
import GallerySection from "@/components/HomePage/sections/GallerySection";

export default function HomePage() {
  {/*
  const supabase = await supabaseCreateClientServer();

  let posts: PostWithAssets[];
  const { data, error } = await supabase.from("Posts").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    posts = [];
  } else {
    posts = data || [];

    for (let i=0; i<posts.length; i++) {
      const post = posts[i];
      const { data: assetData, error: assetError } = await supabase
        .from("Assets")
        .select("url_path")
        .eq("post_id", post.id);
      if(assetError) console.log(`No assets fetched for post ${post.id}`);



      posts[i] = {
        ...post,
        assets: assetData ? assetData.map((asset: {url_path: string}) => asset.url_path): [],
      };
    }
  }
*/}
    return (
      <div>
        <HeroSection default_screen_width={ScreenSizeEnum.default_size} large_screen_width={ScreenSizeEnum.large_size} />
        <FeaturedStoriesSection default_screen_width={ScreenSizeEnum.default_size} large_screen_width={ScreenSizeEnum.large_size}/>
        <AboutSection default_screen_width={ScreenSizeEnum.default_size} large_screen_width={ScreenSizeEnum.large_size}/>
        <DestinationsSection default_screen_width={ScreenSizeEnum.default_size} large_screen_width={ScreenSizeEnum.large_size}/>
        <GallerySection default_screen_width={ScreenSizeEnum.default_size} large_screen_width={ScreenSizeEnum.large_size}/>
      </div>
    )
}

/*
    <div>
      <video
        autoPlay
        muted
        loop
        controls
        preload="none"
        style={{      
          height: '100vh',     // Set the desired height in px
          objectFit: 'cover',  // Crop edges while filling the area
        }}
      >
        <source src="/video3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    */
