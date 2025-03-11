"use server";

import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { Post } from "@/types/collection";
import { PostWithAssets } from "@/types/post_types";
import DOMPurify from "isomorphic-dompurify";

import {
  getAssets,
  getAssetSizes,
  getAssetTypes,
} from "@/utils/api/post_requests";
import PostDetailsClient from "@/components/PostDetailsClient";

{
  /* Page with full post.
    The example url: https://voyageblur.com/exploring-schwarzwald */
}

export default async function FullPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await supabaseCreateClientServer();

  const pageParams = (await params).slug;
  console.log("Page params:", pageParams);

  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("url_pathname", pageParams)
    .maybeSingle();

  const post = data as Post;

  if (error || !data) {
    console.log("Error:", error);
    return <div>{error?.message}</div>;
  }

  const { content, creation_date, header, id, owner_email, url_pathname } =
    post;

  const assetTypes = await getAssetTypes();
  const assetSizes = await getAssetSizes();
  const assets = await getAssets(id);
  //const assets = (await (await getAssets(id)).json());

  console.log("Asset types:", assetTypes);
  console.log("Asset sizes:", assetSizes);
  console.log("Assets:", assets);

  {
    /* Return assets with Type and Size Names */
  }
  const assetsWithDetails = assets.map((asset: any) => {
    const typeDetail = assetTypes.find((type: any) => {
      return type["id"] === asset["type"];
    });

    const sizeDetail = assetSizes.find(
      (size: any) => size["id"] === asset["size"]
    );

    return {
      ...asset,
      typeName: typeDetail ? typeDetail["type"] : "Unknown Type",
      sizeName: sizeDetail ? sizeDetail["size"] : "Unknown Size",
    };
  });

  console.log("Assets with details", assetsWithDetails);

  const largeAsset = assetsWithDetails.find(
    (asset: any) => asset["sizeName"].toLowerCase() === "large"
  );

  const mediumAsset = assetsWithDetails.find(
    (asset: any) => asset["sizeName"].toLowerCase() === "medium"
  );

  const smallAsset = assetsWithDetails.find(
    (asset: any) => asset["sizeName"].toLowerCase() === "small"
  );

  {/* IMPORTANT */}
  const sanitizedContent = DOMPurify.sanitize(content ?? "");

  return <PostDetailsClient largeAssetPath={largeAsset['url_path']} mediumAssetPath={mediumAsset['url_path']} smallAssetPath={smallAsset['url_path']} header={header!} content={sanitizedContent}/>
}
