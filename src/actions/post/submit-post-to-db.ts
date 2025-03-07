"use server";

import type { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { Post } from "@/types/collection";
import { useCallback } from "react";
import * as z from "zod";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface submitPostProps {
  largeImage: string;
  mediumImage: string;
  smallImage: string;
  imageName: string;
  postDetails: Post;
}

async function uploadImage(file: string, fileName: string) {
  const base64Data = file.split(",")[1];
  const binaryData = atob(base64Data);
  const buffer = new Uint8Array(binaryData.length);

  for (let i = 0; i < binaryData.length; i++) {
    buffer[i] = binaryData.charCodeAt(i);
  }

  const blob = new Blob([buffer], {type: "image/jpeg"});

  const { data, error } = await supabase.storage
    .from("assets") //bucket name
    .upload(`images/${fileName}`, blob, {
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Image upload error:", error);
    return null;
  }
  else{
    console.log("Image uploaded successfully");
  }
  return supabase.storage.from('assets').getPublicUrl(data.path);
}

export async function submitPostToDB({
  largeImage,
  mediumImage,
  smallImage,
  imageName,
  postDetails,
}: submitPostProps) {
  console.log("submitPostToDB is being called...");
  try {
    const imageLargeUrl = await uploadImage(largeImage, imageName);
    console.log("image url:", imageLargeUrl);

    const { data, error } = await supabase.from("posts").insert([
      {
        title: postDetails.title,
        content: postDetails.content,
        creationDate: postDetails.creation_date,
      },
    ]);

    if(error){
      console.error("Error inserting post:", error);
      return {error};
    }
    console.log("Post inserted successfully:", data);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}
