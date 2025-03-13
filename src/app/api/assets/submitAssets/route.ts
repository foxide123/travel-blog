//"use server";
export const runtime="edge";

import { NextResponse } from "next/server";
import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { imageToBlob } from "@/utils/posts/imageToBlob";
import { SupabaseClient } from "@supabase/supabase-js";
import { AssetSize, AssetType } from "@/types/collection";
import { AssetBody } from "@/types/asset_types";

function assetTypeMapping(selectedType:string, assetTypes:Array<AssetType>){
  
  let assetTypeId = 0;
  
  if(!assetTypes || !Array.isArray(assetTypes)){
    console.error("assetTypes is undefined or not an array:", assetTypes);
    return 0;
  }
  
  for (let i=0; i<assetTypes.length; i++){
    console.log("Selected Type: ", selectedType);
    console.log("AssetTypes: ", assetTypes);
    if (selectedType.toLowerCase() === assetTypes[i].type){
      assetTypeId = assetTypes[i].id;
    }
  }

  return assetTypeId;
}

function assetSizeMapping(selectedSize:string, assetSizes:Array<AssetSize>){
  
  let assetSizeId = 0;

  if (!assetSizes) {
    console.error("assetSizes is undefined:", assetSizes);
    return 0;
  }
  
  for (let i=0; i<assetSizes.length; i++){
    console.log("Selected Size: ", selectedSize);
    console.log("AssetSize: ", assetSizes[i].size.toLowerCase());
    if (selectedSize.toLowerCase() === assetSizes[i].size.toLowerCase()){
      assetSizeId = assetSizes[i].id;
    }
  }

  return assetSizeId;
}

async function submitImage(asset: AssetBody, supabase: SupabaseClient) {
  const blob = await imageToBlob(asset.content);

  const { data, error } = await supabase.storage
    .from("assets") //bucket name
    .upload(`images/${asset.image_name}-${asset.size}`, blob, {
      contentType: "image/jpeg",
    });

  if (error) return { data: null, error };

  const publicUrlResponse = supabase.storage
    .from("assets")
    .getPublicUrl(data.path)["data"]["publicUrl"];

  return { data: publicUrlResponse, error: null };
}

export async function POST(req: Request) {
  try {
    console.log("inside submitAssets route");
    const authHeader = req.headers.get("authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;
    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: no token provided" },
        { status: 401 }
      );
    }

    const supabase = await supabaseCreateClientServer(token);

    const body = await req.json();

    const assets:Array<AssetBody> = body.assets;

    for (const asset of assets) {
     // if (asset.type === 1) {
        const { data, error } = await submitImage(asset, supabase);
        if (error) {
          console.error("Image upload error:", error);
          return NextResponse.json(
            { error: error.message || error },
            { status: 500 }
          );
        }

        console.log("Image data:", data);

        const { error: insertError } = await supabase.from("Assets").insert({
          caption: asset.caption,
          upload_date: new Date().toUTCString(),
          type: asset.type != null ? assetTypeMapping(asset.type, body.assetTypes) : null,
          url_path: data,
          size: assetSizeMapping(asset.size, body.assetSizes),
          name: asset.image_name,
          post_id: body.postId
        });
        if (insertError){
          console.error("Error inserting asset record: ", insertError);
          return NextResponse.json(
            { error: insertError.message || insertError },
            { status: 500 }
          );
        }
      }
    //}
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error (submitAssets):", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
