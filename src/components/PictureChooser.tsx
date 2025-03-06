"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faImage } from "@fortawesome/free-solid-svg-icons";

export default function PictureChooserMain() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        setImageSrc(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label htmlFor="fileInput" className="cursor-pointer block">
        {/*Image Picker*/}
        <div className="bg-amber-50 w-full h-[400px] flex flex-col items-center justify-center cursor-pointer overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faImage}
                style={{
                  color: "Gray",
                  width: "200px",
                  height: "200px",
                  marginBottom: "10px",
                }}
              />
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{
                  color: "Gray",
                  width: "100px",
                  height: "100px",
                }}
              />
            </>
          )}
        </div>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange} // Attach the event directly here
        />
      </label>
    </>
  );
}
