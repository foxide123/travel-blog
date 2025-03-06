"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faPlusCircle,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import ImageCropper from "@/components/ImageCropper";

export default function PictureChooserMain() {
  const [within, setWithin] = useState<"canvas" | "image" | "none">("canvas");
  const [croppedImage, setCroppedImage] = useState<string>("");

  // Create refs for the input and the image element.
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const imgPickerRef = useRef<HTMLDivElement>(null);

  const handleCrop = (blob: Blob | MediaSource) => {
    setCroppedImage(URL.createObjectURL(blob));
  };

  useEffect(() => {
    const reader = new FileReader();
    const input = inputRef.current;
    const img = imgRef.current;
    const imgPicker = imgPickerRef.current;
    if (!input || !img) return;

    // When the reader loads the file, set the image's src to the data URL.
    const handleReaderLoad = (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === "string") {
        imgPicker!.style.display = "none";
        img.src = e.target.result;
      }
    };

    reader.addEventListener("load", handleReaderLoad);

    // When the file input changes, read the first file.
    const handleInputChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        reader.readAsDataURL(target.files[0]);
      }
    };

    input.addEventListener("change", handleInputChange);

    // Cleanup the event listeners on unmount.
    return () => {
      reader.removeEventListener("load", handleReaderLoad);
      input.removeEventListener("change", handleInputChange);
    };
  }, []);

  return (
    <>
      <label htmlFor="fileInput" className="cursor-pointer block">
        {/*Image Picker*/}
        <div
          ref={imgPickerRef}
          className="bg-amber-50 w-full h-100 flex flex-col items-center justify-center cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faImage}
            className="fas fa-check"
            style={{
              color: "Gray",
              width: "200px",
              height: "200px",
              marginBottom: "10px",
            }}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="fas fa-check"
            style={{
              color: "Gray",
              width: "100px",
              height: "100px",
            }}
          ></FontAwesomeIcon>
        </div>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          ref={inputRef}
          alt="Selected"
          className="hidden"
        />
      </label>
      <div>
        <ImageCropper src="/castle.jpg" within="image" onCrop={()=>{}} />
        {/*{croppedImage && <img src={croppedImage} alt="Cropped image" />*/}
      </div>
    </>
  );
}
