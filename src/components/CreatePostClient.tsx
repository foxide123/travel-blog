"use client";
import PictureChooserMain from "@/components/PictureChooser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Quill from "quill";
import dynamic from "next/dynamic";
import { submitPostToDB } from "@/actions/post/submit-post-to-db";
import {Post} from "@/types/collection";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});

export default function CreatePostClient() {
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
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
      console.log("Updated selectedImages:", updatedImages); // Debugging line
      return updatedImages;
    });
  };
  

  const submitPost = async () => {
    if (!quillInstance) {
      console.error("Quill instance not available");
      return;
    }

    const postContent = quillInstance.getSemanticHTML(0, 50); // Get HTML content
    console.log("Post Content:", postContent);

    const { large, medium, small } = selectedImages;

    console.log("SELECTED IMAGES:", selectedImages);

    if (!large || !medium || !small) {
      console.log("Selected images are missing:", selectedImages);
      alert("You have not selected all of the images (large, medium, or small)");
      return;
    }
    if (!imageName) {
      alert("You have to specify an image name");
      return;
    }
    else {
      console.log("Sending post request to API...");

      const response = await fetch("/api/submitPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          largeImage: large,
          mediumImage: medium,
          smallImage: small,
          imageName: imageName,
          postDetails: {
            content: postContent,
            creation_date: new Date().toUTCString(),
            id: "1",
            title: postTitle
          }
        })
      });

      const data = await response.json();
      console.log("Response from API:", data);
    }
  };

  const handleImageNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event != null) {
      setImageName(event.target.value);
    }
  };

  const handlePostTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if(event!=null) {
      setPostTitle(event.target.value);
    }
  };

  return (
    <>
      <h3 className="text-center py-5 text-2xl font-bold">
        1. Select Picture For Large Screens (1920 x 400px)
      </h3>
      <PictureChooserMain
        screenSize="large"
        onImageSelect={handleImageSelect}
      />
      <h3 className="text-center py-5 text-2xl font-bold">
        2. Select Picture for Medium Screens (768 x 400)
      </h3>
      <PictureChooserMain
        screenSize="medium"
        onImageSelect={handleImageSelect}
      />
      <h3 className="text-center py-5 text-2xl font-bold">
        3. Select Picture for Small Screens (480 x 400px)
      </h3>
      <PictureChooserMain
        screenSize="small"
        onImageSelect={handleImageSelect}
      />
      <h3 className="text-center py-5 text-2xl font-bold">
        4. Choose the Name for the Picture (without file extension)
      </h3>
      {/*Image Name input*/}
      <form className="flex flex-col items-center justify-center">
        <input
          type="text"
          id="fname"
          name="fname"
          className="border-amber-300 border-8 w-[50%] p-2 mb-10"
          value={imageName}
          onChange={handleImageNameChange}
        />
      </form>
      <h3 className="text-center py-5 text-2xl font-bold">
        5. Post Header / Title
      </h3>
      <form className="flex flex-col items-center justify-center">
        <input
          type="text"
          id="fname"
          name="fname"
          className="border-amber-300 border-8 w-[50%] p-2 mb-10"
          value={postTitle}
          onChange={handlePostTitleChange}
        />
      </form>
      {/*SUBMIT BUTTON*/}
      <div
        className="fixed top-1 right-5 space-x-4 cursor-pointer bg-blue-400 flex flex-col items-center justify-center p-2 rounded-2xl"
        onClick={submitPost}
      >
        <FontAwesomeIcon
          icon={faCheck}
          className="fas fa-check"
          style={{
            color: "green",
            width: "100px",
            height: "100px",
          }}
        ></FontAwesomeIcon>
        <p>SUBMIT</p>
      </div>
      {/*QUILL EDITOR*/}
      <QuillEditor setQuillInstance={setQuillInstance} />
    </>
  );
}
