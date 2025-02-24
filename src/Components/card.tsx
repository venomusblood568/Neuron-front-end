import { ShareIcon } from "../icon/shareIcon";
import { NeuronIcon } from "../icon/neuronIcon";
import { DeleteIcon } from "../icon/deleteIcon";
import { useState, useEffect } from "react";

interface Cardprops {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "medium" | "article" | "blog" | "instagram";
}

export function Card({ title, link, type }: Cardprops) {
  const formattedLink = link.replace("x.com", "twitter.com");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const defaultImage = "https://source.unsplash.com/400x300/?technology,code"; // Fallback image

  useEffect(() => {
    const fetchThumbnail = async (url: string) => {
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          url
        )}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");
        const ogImage = doc
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content");

        setThumbnail(ogImage || defaultImage);
      } catch (error) {
        console.error("Error fetching thumbnail:", error);
        setThumbnail(defaultImage);
      }
    };

    if (["medium", "article", "blog", "instagram"].includes(type)) {
      fetchThumbnail(link);
    }
  }, [link, type]);

  const getYouTubeThumbnail = () => {
    try {
      let videoId = null;

      if (link.includes("youtube.com/watch?v=")) {
        videoId = new URL(link).searchParams.get("v");
      } else if (link.includes("youtu.be/")) {
        videoId = link.split("youtu.be/")[1].split("?")[0];
      } else if (link.includes("youtube.com/shorts/")) {
        videoId = link.split("youtube.com/shorts/")[1].split("?")[0];
      } else if (link.includes("youtube.com/embed/")) {
        videoId = link.split("youtube.com/embed/")[1].split("?")[0];
      }

      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null;
    } catch {
      return null;
    }
  };

  return (
    <div className="p-2 rounded-md border-darkPurple max-w-72 border min-h-48 min-w-72 shadow-xl ">
      {/* Header Section */}
      <div className="flex justify-between text-white ">
        <div className="flex items-center text-md gap-2">
          <NeuronIcon className="text-white pr-2 " />
          <h1>{title || "Untitled Post"}</h1>
        </div>
        <div className="flex items-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="pr-2 text-gray-500"
          >
            <ShareIcon className="text-white" />
          </a>
          <DeleteIcon className="text-white" />
        </div>
      </div>

      {/* Content Section */}
      <div className="py-2">
        {/* YouTube Video (Regular & Shorts) */}
        {type === "youtube" && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {getYouTubeThumbnail() ? (
              <img
                className="w-full rounded-5xl"
                src={getYouTubeThumbnail()!}
                alt="YouTube Thumbnail"
                onError={(e) => (e.currentTarget.src = defaultImage)}
              />
            ) : (
              <p className="text-red-400">Invalid YouTube URL</p>
            )}
          </a>
        )}

        {/* Twitter Embed */}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={formattedLink} target="_blank" rel="noopener noreferrer">
              View Tweet
            </a>
          </blockquote>
        )}

        {/* Article, Blog, Instagram, or Medium Preview */}
        {["medium", "article", "blog", "instagram"].includes(type) && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              className="w-full rounded-5xl"
              src={thumbnail || defaultImage}
              alt="Article Thumbnail"
              onError={(e) => (e.currentTarget.src = defaultImage)}
            />
            <p className="text-gray-400 mt-2">Read more</p>
          </a>
        )}
      </div>
    </div>
  );
}
