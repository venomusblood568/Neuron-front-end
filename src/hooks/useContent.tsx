import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  const refresh = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setContents(response.data.content);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const deleteContent = async (contentId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: { contentId },
      });
      // Optimistic update
      setContents((prev) =>
        prev.filter((content) => content._id !== contentId)
      );
      return true;
    } catch (error) {
      console.error("Delete failed:", error);
      refresh(); // Fallback refresh
      return false;
    }
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  return { contents, refresh, deleteContent };
}
