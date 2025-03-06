import { createClient } from "@/utils/supabase/server";
import HomePageClient, {Post} from "@/components/HomePageClient";


export default async function HomePage(){
  const supabase = await createClient();

  let posts: Post[];
  const { data, error } = await supabase
    .from("Posts")
    .select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    posts = [];
  } else {
    posts = data || [];
    console.log("Fetched Posts:", posts);
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
