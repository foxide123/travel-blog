"use server";

import { SubmitAssetsBody } from "@/types/asset_types";
import { Post } from "@/types/collection";

export async function getAssets(post_id?: string) {
  const baseUrl = process.env.NEXT_UBLIC_SITE_URL || "http://localhost:3000";
  let url = `${baseUrl}/api/assets/getAssets`;
  
  if(post_id) {
    url += `?post_id=${encodeURIComponent(post_id)}`;
  }
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
}

export async function getAssetTypes() {
  const baseUrl = process.env.NEXT_UBLIC_SITE_URL || "http://localhost:3000";
  let url = `${baseUrl}/api/assets/getAssetTypes`;

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getAssetSizes() {
  const baseUrl = process.env.NEXT_UBLIC_SITE_URL || "http://localhost:3000";
  let url = `${baseUrl}/api/assets/getAssetSizes`;
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function submitPostRequest(token: string, submitPostData: Post) {
  return await fetch("/api/posts/submitPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(submitPostData),
  });
}

export async function submitAssetsRequest(
  token: string,
  submitAssetsData: SubmitAssetsBody,
  postId: string,
  assetTypes: any,
  assetSizes: any
) {
  return await fetch("/api/assets/submitAssets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...submitAssetsData,
      postId: postId,
      assetTypes: assetTypes,
      assetSizes: assetSizes
    }),
  });
}
