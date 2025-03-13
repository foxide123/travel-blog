"use server";

import { SubmitAssetsBody } from "@/types/asset_types";
import { AssetSize, AssetType, Post } from "@/types/collection";

export async function getAssets(post_id?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voyageblur.com";
  let url = `${baseUrl}/api/assets/getAssets`;

  if (post_id) {
    url += `?post_id=${encodeURIComponent(post_id)}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log("Parsed result from getAssets:", result);

  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    const resultData = result.data;
    return JSON.parse(JSON.stringify(resultData));
  } else {
    throw new Error("Post insertion did not return an ID");
  }
}

export async function getAssetTypes() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voyageblur.com";
  const url = `${baseUrl}/api/assets/getAssetTypes`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log("Parsed result from getAssetTypes:", result);

  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    const resultData = result.data;
    return JSON.parse(JSON.stringify(resultData));
  } else {
    throw new Error("Failed retrieving asset types");
  }
}

export async function getAssetSizes() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voyageblur.com";
  const url = `${baseUrl}/api/assets/getAssetSizes`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log("Parsed result from getAssetSizes:", result);

  if(result.data && Array.isArray(result.data) && result.data.length > 0) {
    const resultData = result.data;
    return JSON.parse(JSON.stringify(resultData));
  }else{
    throw new Error("Failed retrieving asset sizes");
  }
}

export async function submitPostRequest(token: string, submitPostData: Post) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voyageblur.com";
  const url = `${baseUrl}/api/posts/submitPost`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(submitPostData),
  });

  console.log("Response from submitPostRequest:", response);

  const result = await response.json();
  console.log("Parsed result from submitPostRequest:", result);

  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    const postId = result.data[0].id;
    return postId;
  } else {
    throw new Error("Post insertion did not return an ID");
  }
}

export async function submitAssetsRequest(
  token: string,
  submitAssetsData: SubmitAssetsBody,
  postId: string,
  assetTypes: AssetType[],
  assetSizes: AssetSize[]
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voyageblur.com";
  const url = `${baseUrl}/api/assets/submitAssets`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...submitAssetsData,
      postId: postId,
      assetTypes: assetTypes,
      assetSizes: assetSizes,
    }),
  });

  console.log("Response from submitAssetsRequest:", response);

  const result = await response.json();
  console.log("Parsed result from submitAssetsRequest:", result);

  if (result['success']) {
    const resultData = result.data;
    return resultData;
  } else {
    throw new Error("Assets submition error");
  }
}
