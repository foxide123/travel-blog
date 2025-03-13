"use server";

import { supabaseCreateClientServer } from "@/utils/supabase/server";
import HomePageClient from "@/components/HomePageClient";
import { PostWithAssets } from "@/types/post_types";

export default async function HomePage() {
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

  return <HomePageClient posts={posts} />;
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
