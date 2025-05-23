import { ShareIcon } from "../icon/shareIcon";
import { NeuronIcon } from "../icon/neuronIcon";
import { DeleteIcon } from "../icon/deleteIcon";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContent } from "../hooks/useContent";

interface CardProps {
  id: string;
  title: string;
  link: string;
  disableActions?: boolean;
  tag?:string
  type: "twitter" | "youtube" | "medium" | "article" | "blog" | "instagram";
}
//twitter card
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

export function Card({
  id,
  title,
  link,
  type,
  tag,
  disableActions = false,
}: CardProps) {
  const { deleteContent, refresh } = useContent();
  const formattedLink = link.replace("x.com", "twitter.com");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const defaultImage = "https://source.unsplash.com/400x300/?technology,code";

  const formatTag = (tag:string | undefined) =>{
    if(!tag) return "Untagged";
    return tag.charAt(0).toUpperCase() + tag.slice(1)
  }

  // Thumbnail fetching effect
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

  // Delete handler
  const handleDelete = async () => {
    if (disableActions) return;

    toast.dark(
      <div>
        🗑 Content deleted.{" "}
        <button
          onClick={() => {
            // Undo logic here
            console.log("Undo clicked");
            toast.success("Action undone!");
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "#4EA8DE",
            cursor: "pointer",
            marginLeft: "8px",
            textDecoration: "underline",
          }}
        >
          Undo
        </button>
      </div>,
      {
        position: "bottom-right",
        autoClose: 5000,
      }
    );

    setTimeout(async () => {
      const success = await deleteContent(id);
      if (success) {
        refresh();
      }
    }, 5000);
  };

  // Share handler
  const handleShare = () => {
    if (disableActions) return;

    navigator.clipboard.writeText(link);
    toast.dark("🖇 Link’s ready. Just paste & go.", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  // YouTube thumbnail generator
  const getYouTubeThumbnail = () => {
    try {
      let videoId = null;
      const url = new URL(link);

      if (url.hostname === "www.youtube.com") {
        videoId =
          url.searchParams.get("v") ||
          url.pathname.split("/shorts/")[1] ||
          url.pathname.split("/embed/")[1];
      } else if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1);
      }

      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null;
    } catch {
      return null;
    }
  };

  // Twitter embed effect
  
  useEffect(() => {
    if (type === "twitter" && window.twttr) {
      window.twttr.widgets.load();
    }
  }, [type]);
  return (
    <div
      className=" p-3 rounded-2xl border-2 border-darkPurple bg-black/60 backdrop-blur-sm text-white 
             shadow-lg hover:scale-105 transition-transform duration-300"
    >
      {" "}
      {/* Header Section */}
      <div className="flex justify-between text-white">
        <div className="flex items-center text-md gap-2 truncate">
          <div className="text-white pr-2">
            <NeuronIcon />
          </div>
          <div className="truncate">
            <h1 className="truncate">{title || "Untitled Post"}</h1>
            <h2 className="text-sm text-gray-400">
              Collection: <span>{formatTag(tag)}</span>
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Share Button */}
          <button
            className={`pr-2 transition-opacity duration-200 ${
              disableActions
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer opacity-100 hover:opacity-60"
            }`}
            onClick={handleShare}
            title="Share link"
            disabled={disableActions}
          >
            <div className="white">
              <ShareIcon />
            </div>
          </button>

          {/* Delete Button */}
          <button
            className={`transition-opacity duration-200 ${
              disableActions
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer opacity-100 hover:opacity-60"
            }`}
            onClick={handleDelete}
            title="Delete content"
            disabled={disableActions}
          >
            <div className="text-white">
              <DeleteIcon />
            </div>
          </button>
        </div>
      </div>
      {/* Content Section */}
      <div className="py-2 h-[calc(100%-3rem)]">
        {/* YouTube Video */}
        {type === "youtube" && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            {getYouTubeThumbnail() ? (
              <div className="relative h-full">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={getYouTubeThumbnail()!}
                  alt="YouTube Thumbnail"
                  onError={(e) => (e.currentTarget.src = defaultImage)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                  <p className="text-white font-medium truncate">
                    {title || "Read more"}
                  </p>

                  <p className="text-gray-300 text-sm">Click to view</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-red-400">
                Invalid YouTube URL
              </div>
            )}
          </a>
        )}

        {/* Twitter Embed */}
        {type === "twitter" && (
          <a
            href={formattedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="h-full flex items-center justify-center bg-twitterBlue rounded-lg p-2">
              <blockquote className="twitter-tweet">
                <p lang="en" dir="ltr">
                  View on Twitter
                </p>
                &mdash; {formattedLink.split("/").pop()}
              </blockquote>
            </div>
          </a>
        )}

        {/* Article/Blog/Medium/Instagram */}
        {["medium", "article", "blog", "instagram"].includes(type) && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="relative h-full">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={thumbnail || defaultImage}
                alt="Article Thumbnail"
                onError={(e) => (e.currentTarget.src = defaultImage)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-white font-medium truncate">
                  {title || "Read more"}
                </p>
                <p className="text-gray-300 text-sm">Click to view</p>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
