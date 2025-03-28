"use server";

import { SubmitAssetsBody } from "@/types/asset_types";
import { AssetSize, AssetType, Post } from "@/types/collection";

export async function getAssets(post_id?: string) {
  const baseUrl = "https://voyageblur.com";
  //const baseUrl = "http://localhost:3000";
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


  if(!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(`Request failed with status ${response.status}`);
  }


  const result = await response.json();

  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    const resultData = result.data;
    return JSON.parse(JSON.stringify(resultData));
  } else {
    throw new Error("Post insertion did not return an ID");
  }
}

export async function getAssetTypes() {
  const baseUrl = "https://voyageblur.com";
  //const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/assets/getAssetTypes`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });


  if(!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(`Request failed with status ${response.status}`);
  }


  const result = await response.json();

  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    const resultData = result.data;
    return JSON.parse(JSON.stringify(resultData));
  } else {
    throw new Error("Failed retrieving asset types");
  }
}

export async function getAssetSizes() {
  const baseUrl = "https://voyageblur.com";
  //const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/assets/getAssetSizes`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(`Request failed with status ${response.status}`);
  }

  const result = await response.json();

  if(result.data && Array.isArray(result.data) && result.data.length > 0) {
    const resultData = result.data;
    return JSON.parse(JSON.stringify(resultData));
  }else{
    throw new Error("Failed retrieving asset sizes");
  }
}

export async function submitPostRequest(token: string, submitPostData: Post) {
  const baseUrl = "https://voyageblur.com";
  //const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/posts/submitPost`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(submitPostData),
  });


  if(!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(`Request failed with status ${response.status}`);
  }

  const result = await response.json();

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
  const baseUrl = "https://voyageblur.com";
  //const baseUrl = "http://localhost:3000";
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

  const result = await response.json();

  if (result['success']) {
    const resultData = result.data;
    return resultData;
  } else {
    throw new Error("Assets submition error");
  }
}
