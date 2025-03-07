"use client"

import PictureChooserMain from "@/components/PictureChooser";
import CreatePostClient from "@/components/CreatePostClient";


export default function CreatePostPage() {


  return (
    <div>
      <header className="bg-blue-50 px-4 py-4 sticky top-0">
        <div className="w-26"></div>
        <h1 className="bg-blue-50 text-center text-3xl py-10">Create a Post</h1>
      </header>
      <div className="fixed bg-amber-200 p-10 bottom-10 right-10 rounded-lg z-10">
        Preview
      </div>
      <CreatePostClient />
    </div>
  );
}
