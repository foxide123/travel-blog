import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { PostWithTags } from "@/types/collection";
import { notFound } from "next/navigation";

interface PostPageProps {
    params: {
        slug: string[];
    }
}

async function getPost(params: { slug: string[] }) {
  const supabase = await createClient();
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug.join("/");

  console.log("slug:", slug);

  const {data, error} = await supabase
    .from("Posts")
    .select("header")
    .eq("url_header", slug)
    .single();

  if (!data || error) {
    console.log("Error fetching post: ", error);
    notFound();
  }

  console.log("Data: ", data);
  return data;
}

export default async function PostPage({ params }: PostPageProps) {
  const supabase = await createClient();
  const post = await getPost(params);
  if (!post) {
    notFound();
  }

  let username = null;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    console.log(session.user?.user_metadata);
    username = session.user?.user_metadata.full_name;
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: post || "" }} />
    </>
  );
}
