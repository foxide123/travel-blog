//"use server";
export const runtime = "edge";

import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { Asset, AssetSize, AssetType, Post } from "@/types/collection";

import {
  getAssets,
  getAssetSizes,
  getAssetTypes,
} from "@/utils/api/post_requests";
import PostDetailsClient from "@/components/PostDetailsClient";
import { AssetWithTypeAndSizeNames } from "@/types/asset_types";
{
  /* Page with full post.
    The example url: https://voyageblur.com/exploring-schwarzwald */
}

type paramsType = Promise<{ slug: string }>;

export default async function FullPostPage({ params }: { params: paramsType }) {
  const supabase = await supabaseCreateClientServer();

  const { slug } = await params;
  console.log("Page params:", slug);

  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("url_pathname", slug)
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
  console.log(creation_date, owner_email, url_pathname);

  {
    /* Return assets with Type and Size Names */
  }
  const assetsWithDetails: AssetWithTypeAndSizeNames[] = assets.map(
    (asset: Asset) => {
      const typeDetail = assetTypes.find((type: AssetType) => {
        return type.id === asset.type;
      });

      const sizeDetail = assetSizes.find(
        (size: AssetSize) => size.id === asset.size
      );

      return {
        ...asset,
        typeName: typeDetail ? typeDetail["type"] : "Unknown Type",
        sizeName: sizeDetail ? sizeDetail["size"] : "Unknown Size",
      };
    }
  );

  console.log("Assets with details", assetsWithDetails);

  const largeAsset = assetsWithDetails.find(
    (asset: AssetWithTypeAndSizeNames) => asset.sizeName === "large"
  );

  const mediumAsset = assetsWithDetails.find(
    (asset: AssetWithTypeAndSizeNames) => asset.sizeName === "medium"
  );

  const smallAsset = assetsWithDetails.find(
    (asset: AssetWithTypeAndSizeNames) => asset.sizeName === "small"
  );

  return (
    <PostDetailsClient
      largeAssetPath={largeAsset?.url_path}
      mediumAssetPath={mediumAsset?.url_path}
      smallAssetPath={smallAsset?.url_path}
      header={header!}
      content={content || ""}
    />
  );
}
