"use client"

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import createDOMPurify from "dompurify";

const EmbedSection = dynamic(() => import("./MediaEmbedSection"), {
  ssr: false,
  loading: () => <p>Loading media...</p>,
});

function isValidImage(url: string | null | undefined): url is string {
  return typeof url === "string" && url.trim() !== "";
}

interface PostDetailsProps {
  largeAssetPath: string | null | undefined;
  mediumAssetPath: string | null | undefined;
  smallAssetPath: string | null | undefined;
  header: string;
  content: string;
}

export default function PostDetailsClient({
  largeAssetPath,
  mediumAssetPath,
  smallAssetPath,
  header,
  content,
}: PostDetailsProps) {
  {
    /* IMPORTANT */
  }
  const [sanitizedContent, setSanitizedContent] = useState<string>(content ?? "");

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(content ?? "", {
      USE_PROFILES: { html: true},
    });
    setSanitizedContent(clean);
  }, [content]);


  return (
    <div>
      <picture className="md:h-150 flex items-center justify-center w-full aspect-[16/9] relative">
        {/* For Large Screens */}
        {isValidImage(largeAssetPath) && (
          <source media="(min-width: 1024px)" srcSet={largeAssetPath} />
        )}
        {/* For Medium Screens */}
        {isValidImage(mediumAssetPath) && (
          <source media="(min-width: 768px)" srcSet={mediumAssetPath} />
        )}
        {/* For Small Screens */}
        {isValidImage(smallAssetPath) ? (
          <img
            src={smallAssetPath}
            alt="post-image"
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src={mediumAssetPath || ""}
            alt="post-image"
            className="object-cover w-full h-full"
          />
        )}
      </picture>
      {/* Container for Content (Header, text and embeds) */}
      <div className="flex sm:flex-row flex-col justify-center w-screen">
        {/* Left Column (To Center everything) */}
        <div className="sm:block sm:w-[328px] hidden"></div>
        {/* Main Content Area */}
        <div className="w-screen">
          <h1 className="sm:text-7xl text-center text-5xl p-10 pb-0">
            {header}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="flex flex-col justify-center whitespace-normal break-words p-10 content"
          />
        </div>
        {/* Embed Section (YT, IG etc.) */}
        <EmbedSection
          youtubeUrl="https://www.youtube.com/shorts/Kc3KwIlwZiM"
          instagramUrl="https://www.instagram.com/p/DGHFZn-oY-l/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA=="
        />
      </div>
    </div>
  );
}
