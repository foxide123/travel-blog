"use client";

import "@/styles/editor-fonts.css";
import { useEffect, useRef } from "react";
import { useMemo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Size = Quill.import("attributors/style/size") as { whitelist: string[]};
Size.whitelist = ["12px", "18px", "24px", "30px", "36px"];
Quill.register("attributors/style/size", Size, true);

// Registering custom module
//Quill.register("modules/imageUploader", ImageUploader);

interface QuillEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  setQuillInstance?: (instance: Quill | null) => void;
}

export default function QuillEditor({
  initialContent = "",
  onContentChange,
  setQuillInstance, // Receive function to store Quill instance in parent
}: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const toolbarOptions = useMemo(
    () => [
      ["bold", "italic", "underline", "strike"],
      [
        { header: "1" },
        { header: "2" },
        { header: [3, 4, 5, 6] },
        { font: [] },
        { size: ["12px", "18px", "24px", "30px", "36px"] },
      ],
      [{ indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ align: "right" }, { align: "center" }, { align: "justify" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
    []
  );

  useEffect(() => {
    let quillInstance: Quill | undefined;
    if (editorRef.current) {
      quillInstance = new Quill(editorRef.current, {
        debug: "info",
        modules: {
          toolbar: toolbarOptions,
          // initializing custom image uploader module
          //imageUploader: {},
        },
        placeholder: "Compose an epic...",
        theme: "snow",
      });

      quillInstance.root.innerHTML = initialContent;

      quillInstance.on("text-change", () => {
        if (onContentChange) {
          onContentChange(quillInstance!.root.innerHTML);
        }
      });

      if (setQuillInstance) {
        setQuillInstance(quillInstance); // Passing Quill instance to parent
      }
    }

    //Cleanup
    return () => {
      setQuillInstance!(null);
    }

  }, [initialContent, onContentChange, toolbarOptions, setQuillInstance]);
  return <div id="editor" ref={editorRef} />;
}
