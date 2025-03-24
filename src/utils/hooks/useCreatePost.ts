"use client";

import {
  AssetSizeEnum,
  AssetTypeEnum,
  SubmitAssetsBody,
} from "@/types/asset_types";
import { useState } from "react";
import {
  getAssetTypes,
  submitAssetsRequest,
  submitPostRequest,
  getAssetSizes,
} from "../api/post_requests";
import { Post } from "@/types/collection";
import { NextResponse } from "next/server";
import Quill from "quill";

export function useCreatePost() {
  const [postContent, setPostContent] = useState("");
  const [imageName, setImageName] = useState<string>("");
  const [postHeader, setPostHeader] = useState<string>("");
  const [postPathname, setPostPathname] = useState<string>("");
  //eslint-disable-next-line
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

  const [selectedImages, setSelectedImages] = useState<{
    [key: string]: string | null;
  }>({
    large: null,
    medium: null,
    small: null,
  });

  const handleImageSelect = (screenSize: string, imageSrc: string) => {
    setSelectedImages((prevImages) => {
      const updatedImages = { ...prevImages, [screenSize]: imageSrc };
      return updatedImages;
    });
  };

  const submitPost = async (token: string) => {
    //const postContent = quillInstance.getSemanticHTML(0, 50); // Get HTML content

    if (
      !selectedImages.large ||
      !selectedImages.medium ||
      !selectedImages.small
    )
      throw new Error("Not all images selected");
    if (!imageName) throw new Error("Image name is required");

    const submitPostData: Post = {
      content: postContent,
      creation_date: new Date().toUTCString(),
      id: "",
      header: postHeader,
      url_pathname: postPathname,
      owner_email: "",
    };

    const submitAssetsData: SubmitAssetsBody = {
      assets: [
        {
          type: AssetTypeEnum.image,
          caption: "",
          size: AssetSizeEnum.large,
          content: selectedImages.large,
          image_name: imageName,
        },
        {
          type: AssetTypeEnum.image,
          caption: "",
          size: AssetSizeEnum.medium,
          content: selectedImages.medium,
          image_name: imageName,
        },
        {
          type: AssetTypeEnum.image,
          caption: "",
          size: AssetSizeEnum.small,
          content: selectedImages.small,
          image_name: imageName,
        },
      ],
    };

    try {

      const assetTypes = await getAssetTypes();
      const assetSizes = await getAssetSizes();
      const postId = await submitPostRequest(token, submitPostData);

      const assetsResponse = await submitAssetsRequest(
        token,
        submitAssetsData,
        postId,
        assetTypes,
        assetSizes
      );
      console.log("Post submitted successfuly:", assetsResponse);

      return NextResponse.json({ success:true});

    } catch (error) {
      console.error("Error during submission process:", error);
    }
  };

  return {
    postContent,
    setPostContent,
    imageName,
    setImageName,
    postHeader,
    setPostHeader,
    postPathname,
    setPostPathname,
    selectedImages,
    handleImageSelect,
    submitPost,
    setQuillInstance,
  };
}
