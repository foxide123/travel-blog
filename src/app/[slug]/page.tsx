"use server";

import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { Post } from "@/types/collection";
import { PostWithAssets } from "@/types/post_types";
import {
  getAssets,
  getAssetSizes,
  getAssetTypes,
} from "@/utils/api/post_requests";

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
    .eq("header", pageParams)
    .single();

  const post = data as Post;

  if (error || !data) {
    return <div>{error?.message}</div>;
  }

  const { content, creation_date, header, id, owner_email, url_pathname } =
    post;

  const assetTypes = (await (await getAssetTypes()).json())["data"];
  const assetSizes = (await (await getAssetSizes()).json())["data"];
  const assets = (await (await getAssets(id)).json())["data"];

  {/* Return assets with Type and Size Names */}
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
    (asset:any) => asset['sizeName'].toLowerCase() === 'large'
  );

  const mediumAsset = assetsWithDetails.find(
    (asset:any) => asset['sizeName'].toLowerCase() === 'medium'
  );

  const smallAsset = assetsWithDetails.find(
    (asset:any) => asset['sizeName'].toLowerCase() === 'small'
  );
  

  return (
    <>
    <picture className="flex items-center justify-center">
        {/* For Large Screens */}
        {largeAsset && (
            <source media="(min-width: 1024px)" srcSet={largeAsset['url_path']}/>
        )}
        {/* For Medium Screens */}
        {mediumAsset && (
            <source media="(min-width: 768px)" srcSet={mediumAsset['url_path']}/>
        )}
        {/* For Small Screens */}
        {smallAsset ? (
            <img src={smallAsset['url_path']} alt={smallAsset['name']}/>
        ) : (
            <img src={mediumAsset['url_path'] || ''} />
        )}
    </picture>
    <h1 className="text-7xl text-center">{header}</h1>
      <p>Content: {content}</p>
      <p>Creation Date: {creation_date}</p>
      <p>Header: {header}</p>
      <p>Id: {id}</p>
      <p>Owner Email: {owner_email}</p>
      <p>Url Pathname: {url_pathname}</p>
    </>
  );
}
