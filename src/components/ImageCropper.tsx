"use client";

import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "react-cropper/node_modules/cropperjs/dist/cropper.css";
import CropperJS from "cropperjs"; // Import underlying Cropper.js type

interface CropBoxData {
  left: number;
  top: number;
  width: number;
  height: number;
}

const inSelection = (selection: CropBoxData, maxSelection: CropBoxData) => {
  return (
    selection.left >= maxSelection.left &&
    selection.top >= maxSelection.top &&
    selection.left + selection.width <= maxSelection.left + maxSelection.width &&
    selection.top + selection.height <= maxSelection.top + maxSelection.height
  );
};

interface ImageCropperProps {
  src: string;
  within: "canvas" | "image" | "none";
  onCrop: (croppedDataUrl: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ src, within, onCrop }) => {
  // Create a ref to store the underlying CropperJS instance.
  const cropperRef = useRef<Cropper | null>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    const selection = cropper.getCropBoxData() as CropBoxData;
    let maxSelection: CropBoxData | null = null;

    if (within === "canvas") {
      const canvasData = cropper.getCanvasData();
      maxSelection = {
        left: canvasData.left,
        top: canvasData.top,
        width: canvasData.width,
        height: canvasData.height,
      };
    } else if (within === "image") {
      const imageData = cropper.getImageData();
      maxSelection = {
        left: imageData.left,
        top: imageData.top,
        width: imageData.width,
        height: imageData.height,
      };
    }

    if (maxSelection && !inSelection(selection, maxSelection)) {
      console.log("Selection is outside allowed area.");
      return;
    }

    const canvas = cropper.getCroppedCanvas();
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      onCrop(dataUrl);
    }
  };

  return (
    <div>
      <Cropper
        src={src}
        style={{ height: 400, width: "100%" }}
        aspectRatio={16 / 9}
        guides={true}
        crop={handleCrop}
        onInitialized={(instance: Cropper) => {
          // Save the underlying CropperJS instance in our ref.
          cropperRef.current = instance;
        }}
      />
      <button onClick={handleCrop}>Apply Crop</button>
    </div>
  );
};

export default ImageCropper;
