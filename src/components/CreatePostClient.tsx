"use client";
import PictureChooserMain from "@/components/PictureChooser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import dynamic from "next/dynamic";
import { useCreatePost } from "@/utils/hooks/useCreatePost";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});


export default function CreatePostClient() {

  const {
   // postContent,
    setPostContent,
    imageName,
    setImageName,
    postHeader,
    setPostHeader,
    postPathname,
    setPostPathname,
   // selectedImages,
    handleImageSelect,
    submitPost,
    setQuillInstance
  } = useCreatePost();

  const handleSubmit = async () => {
    //const supabase = supabaseCreateClient();
    //const sessionResponse = await supabase.auth.getSession();
    //const token = sessionResponse.data.session?.access_token;
    const token = localStorage.getItem("supabase.auth.token")
    if (!token) {
      alert("You are not logged in!");
      return;
    }

    try {
      const result = await submitPost(token);
      console.log("Submission result:", result);
      // Optionally redirect or update UI
     // router.push("/admin/post-success");
    } catch (error: unknown) {
      console.error("Error submitting post:", error);
      alert(error);
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
          onChange={(e) => setImageName(e.target.value)}
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
          value={postHeader}
          onChange={(e) => setPostHeader(e.target.value)}
        />
      </form>
      <h3>
        6. Post pathname (e.g https://voyageblur.com/exploring-schwarzwald).
        Type only pathname(exploring-schwarzwald), without
        domain(https://voyageblur.com)
      </h3>
      <form className="flex flex-col items-center justify-center">
        <input
          type="text"
          id="fname"
          name="fname"
          className="border-amber-300 border-8 w-[50%] p-2 mb-10"
          value={postPathname}
          onChange={(e) => setPostPathname(e.target.value)}
        />
      </form>
      {/*SUBMIT BUTTON*/}
      <div
        className="fixed top-1 right-5 space-x-4 cursor-pointer bg-blue-400 flex flex-col items-center justify-center p-2 rounded-2xl"
        onClick={handleSubmit}
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
      <QuillEditor setQuillInstance={setQuillInstance} 
      onContentChange={setPostContent}/>
    </>
  );
}
