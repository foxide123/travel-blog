import QuillEditorWrapper from "@/components/QuillEditorWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import PictureChooserMain from "@/components/PictureChooser";

function choosePicture() {}

export default function CreatePostPage() {
  return (
    <div>
      <header className="flex items-center justify-between bg-blue-50 px-4 py-4 sticky top-0">
        <div className="w-26"></div>
        <h1 className="bg-blue-50 text-center text-3xl py-10">Create a Post</h1>
        <div className="space-x-4">
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
      </header>
      {/*Add Main Picture */}
      <PictureChooserMain/>
      <div className="absolute bg-amber-200 p-10 bottom-10 right-10 rounded-lg z-10">
        {" "}
        Preview
      </div>
      <QuillEditorWrapper />
    </div>
  );
}
