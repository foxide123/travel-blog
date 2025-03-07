"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faImage } from "@fortawesome/free-solid-svg-icons";

interface PictureChooserMainProps {
  screenSize: "small" | "medium" | "large";
  onImageSelect: (screenSize: string, imageSrc: string) => void;
}

export default function PictureChooserMain({
  screenSize,
  onImageSelect
}: PictureChooserMainProps) {
  const getDimensions = () => {
    switch (screenSize) {
      case "large":
        return { width: "w-full", height: "h-[300px]" };
      case "medium":
        return { width: "w-[768px]", height: "h-[400px]" };
      case "small":
        return { width: "w-[480px]", height: "h-[400px]" };
      default:
        return { width: "w-full", height: "h-[400px" };
    }
  };

  const { width, height } = getDimensions();

  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        setImageSrc(event.target.result);
        onImageSelect(screenSize, event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label htmlFor={`fileInput-${screenSize}`} className="cursor-pointer flex items-center justify-center">
        {/*Image Picker*/}
        <div className={`bg-amber-50 ${width} ${height} flex flex-col items-center justify-center cursor-pointer overflow-hidden`}>
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
                  width: "150px",
                  height: "150px",
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
          id={`fileInput-${screenSize}`}
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange} // Attach the event directly here
        />
      </label>
    </>
  );
}
