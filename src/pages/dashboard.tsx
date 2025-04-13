import { Button } from "../Components/button";
import { ShareIcon } from "../icon/shareIcon";
import { PlusIcon } from "../icon/plusIcon";
import { Card } from "../Components/card";
import { CreateContentModel } from "../Components/createpop";
import { useEffect, useMemo, useState } from "react";
import { SideBar } from "../Components/sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

// Define content item type based on usage
type ContentType = {
  _id: string;
  type: any;
  link: string;
  title: string;
  tag?: string;
};

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const { contents, refresh } = useContent();
  const [activeTag, setActiveTag] = useState<string>("");

  const filteredContents = useMemo(() => {
    if (!activeTag) return contents;

    return contents.filter((content: ContentType) => {
      const contentTag = content.tag?.toString().toLowerCase().trim() || "";
      const searchTag = activeTag.toLowerCase().trim();
      return contentTag.includes(searchTag);
    });
  }, [contents, activeTag]);

  const handleShare = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;

      await navigator.clipboard.writeText(shareUrl);
      toast.success("🔗 Link copied! Share your Neuron.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Sharing failed:", error);
      toast.error("❌ Error generating share link", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (modelOpen) {
      refresh();
    }
  }, [modelOpen]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-grid-light-purple opacity-60 pointer-events-none" />
      <SideBar onFilterChange={(tag?: string) => setActiveTag(tag || "")} />
      <div className="p-3 bg-black ml-56 min-screen">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
            refresh();
          }}
        />
        <div className="flex justify-end gap-4 py-2">
          <div className="opacity-100 hover:opacity-80 transition-opacity duration-200">
            <Button
              variant="secondary"
              text="Share Neuron"
              startIcon={<ShareIcon />}
              onClick={handleShare}
            />
          </div>
          <div className="opacity-100 hover:opacity-80 transition-opacity duration-200">
            <Button
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
              onClick={() => setModelOpen(true)}
            />
          </div>
        </div>

        {activeTag && (
          <div className="text-white mb-4 p-2">
            Showing collection: <span className="font-bold">{activeTag}</span>
            <div className="gap-2">
              <Button
                onClick={() => setActiveTag("")}
                text="Clear Filter"
                variant="primary"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 py-5 items-stretch w-full auto-rows-fr">
          {filteredContents.map((content: ContentType) => (
            <Card
              key={content._id}
              id={content._id}
              type={content.type}
              link={content.link}
              title={content.title}
              tag={content.tag}
              disableActions={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
