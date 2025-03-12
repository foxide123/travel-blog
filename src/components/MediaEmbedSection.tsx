"use client"

import { InstagramEmbed, YouTubeEmbed } from "react-social-media-embed";

interface MediaEmbedProps {
  instagramUrl: string;
  youtubeUrl: string;
}

export default function MediaEmbedSection({
  instagramUrl,
  youtubeUrl
}: MediaEmbedProps) {
  return (
    <div className="flex flex-col mt-10 justify-center items-center w-screen">
      <InstagramEmbed
        url={instagramUrl}
        width={328}
        captioned
      />
      <YouTubeEmbed
        url={youtubeUrl}
        width={328}
      />
    </div>
  );
}
