"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const EmbedSection = dynamic(()=>import("./MediaEmbedSection"), {
  ssr:false,
  loading: () => <p>Loading media...</p>,
})

interface PostDetailsProps {
  largeAssetPath: string | null | undefined;
  mediumAssetPath: string | null | undefined;
  smallAssetPath: string | null | undefined;
  header: string;
  content: string;
}

function isValidImage(url: string | null | undefined): url is string {
  return typeof url==="string" && url.trim()!=="";
}

export default function PostDetailsClient({
  largeAssetPath,
  mediumAssetPath,
  smallAssetPath,
  header,
  content,
}: PostDetailsProps) {

   {/* IMPORTANT */}
  const [sanitizer, setSanitizer] = useState<{sanitize: (input: string) => string} | null>(null);

  useEffect(() => {
    // Dynamically import DOMPurify so that it's only loaded in the browser.
    import("isomorphic-dompurify").then((mod) => {
      setSanitizer(mod.default);
    });
  }, []);

  const sanitizedContent = sanitizer ? sanitizer.sanitize(content ?? "") : content ?? "";

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
          <Image src={smallAssetPath}
           alt="post-image"
           objectFit="cover"
           layout="fill" />
        ) : (
          <Image
            src={mediumAssetPath || ""}
            alt="post-image"
            objectFit="cover"
            layout="fill"
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
