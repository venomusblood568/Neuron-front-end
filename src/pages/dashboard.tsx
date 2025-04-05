import { Button } from "../Components/button";
import { ShareIcon } from "../icon/shareIcon";
import { PlusIcon } from "../icon/plusIcon";
import { Card } from "../Components/card";
import { CreateContentModel } from "../Components/createpop";
import { useEffect, useState } from "react";
import { SideBar } from "../Components/sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config"; 
import { toast } from "react-toastify";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, refresh, deleteContent } = useContent();

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl)
      toast.success("Link copied! Share your Neuron.",{
        position:"bottom-right",
        autoClose:2000
      }
      )
    } catch (error) {
      console.error("Sharing failed:", error);
      toast.error("Error generating share link",{
        position:"bottom-right",
        autoClose:2000
      });
    }
  };

  useEffect(() => {
    if (modelOpen) {
      refresh();
    }
  }, [modelOpen]);

  
  return (
    <div>
      <SideBar />
      <div className="p-3 bg-black ml-56 min-screen ">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
            refresh();
          }}
        />
        <div className="flex justify-end gap-4 py-2 ">
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

        <div className="grid grid-cols-4 gap-4 py-5 items-stretch w-full auto-rows-fr">
          {contents.map((content) => (
            <Card
              key={content._id}
              id={content._id}
              type={content.type}
              link={content.link}
              title={content.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
