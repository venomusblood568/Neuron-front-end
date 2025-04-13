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
    return contents.filter((content: ContentType) =>
      content.tag?.toLowerCase().includes(activeTag.toLowerCase())
    );
  }, [contents, activeTag]);

  const handleShare = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: token } }
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
    if (!modelOpen) {
      refresh(); // Refresh only when modal closes
    }
  }, [modelOpen]);

  return (
    <div className="relative min-h-screen flex flex-col bg-black">
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid-light-purple opacity-60 pointer-events-none" />

      {/* Sidebar */}
      <SideBar onFilterChange={(tag?: string) => setActiveTag(tag || "")} />

      {/* Main Content */}
      <div className="p-3 pt-4 min-h-screen transition-all lg:ml-56">
        <CreateContentModel
          open={modelOpen}
          onClose={() => setModelOpen(false)}
        />

        {/* Top Buttons */}
        <div className="flex justify-end gap-4 py-2">
          <Button
            variant="secondary"
            text="Share Neuron"
            startIcon={<ShareIcon />}
            onClick={handleShare}
          />
          <Button
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
            onClick={() => setModelOpen(true)}
          />
        </div>

        {/* Active Tag Info */}
        {activeTag && (
          <div className="text-white mb-4">
            Showing collection: <span className="font-bold">{activeTag}</span>
            <div className="mt-2">
              <Button
                onClick={() => setActiveTag("")}
                text="Clear Filter"
                variant="primary"
              />
            </div>
          </div>
        )}

        {/* Content Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
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
