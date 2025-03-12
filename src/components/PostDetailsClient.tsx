"use client";

import {
  InstagramEmbed,
  YouTubeEmbed,
  TikTokEmbed,
} from "react-social-media-embed";
import Image from "next/image";

interface PostDetailsProps {
  largeAssetPath: string;
  mediumAssetPath: string;
  smallAssetPath: string;
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
  return (
    <>
      <picture className="flex items-center justify-center">
        {/* For Large Screens */}
        {largeAssetPath !== "" && (
          <source media="(min-width: 1024px)" srcSet={largeAssetPath} />
        )}
        {/* For Medium Screens */}
        {mediumAssetPath !== "" && (
          <source media="(min-width: 768px)" srcSet={mediumAssetPath} />
        )}
        {/* For Small Screens */}
        {smallAssetPath !== "" ? (
          <Image src={smallAssetPath} alt="post-image" />
        ) : (
          <Image src={mediumAssetPath || ""} alt="post-image" />
        )}
      </picture>
      {/* Container for Content (Header, text and embeds) */}
      <div className="flex sm:flex-row flex-col justify-center w-screen">
        {/* Left Column (To Center everything) */}
        <div className="sm:block sm:w-[328px] hidden"></div>
        {/* Main Content Area */}
        <div className="w-screen">
          <h1 className="sm:text-7xl text-center text-5xl p-10 pb-0">{header}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="flex flex-col justify-center whitespace-normal break-words p-10 content"
          />
        </div>
        {/* Embed Section (YT, IG etc.) */}
        <div className="flex flex-col mt-10 justify-center items-center w-screen">
          <InstagramEmbed
            url="https://www.instagram.com/p/DGHFZn-oY-l/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA=="
            width={328}
            captioned
          />
          <YouTubeEmbed
            url="https://www.youtube.com/shorts/Kc3KwIlwZiM"
            width={328}
          />
        </div>
      </div>

    </>
  );
}
