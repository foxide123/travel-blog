"use client"

import { InstagramEmbed } from "react-social-media-embed";

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
    content
}: PostDetailsProps) {
    return (
         <>
              <picture className="flex items-center justify-center">
                {/* For Large Screens */}
                {largeAssetPath!=="" && (
                  <source media="(min-width: 1024px)" srcSet={largeAssetPath} />
                )}
                {/* For Medium Screens */}
                {mediumAssetPath!=="" && (
                  <source media="(min-width: 768px)" srcSet={mediumAssetPath} />
                )}
                {/* For Small Screens */}
                {smallAssetPath!=="" ? (
                  <img src={smallAssetPath} alt="" />
                ) : (
                  <img src={mediumAssetPath || ""} />
                )}
              </picture>
              <h1 className="text-7xl text-center">{header}</h1>
              <div dangerouslySetInnerHTML={{ __html: content}} 
              className="w-[840px] flex flex-col justify-center ml-auto mr-auto mt-10"/>
              <div>
                <InstagramEmbed url="https://www.instagram.com/p/DGHFZn-oY-l/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==" width={328} captioned/>
              </div>
            </>
    );
}