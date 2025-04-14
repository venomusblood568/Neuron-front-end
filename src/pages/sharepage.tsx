import { Button } from "../Components/button";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../Components/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { MenuIcon } from "../icon/menu";
import { XIcon } from "../icon/xicon";

type ContentType =
  | "twitter"
  | "youtube"
  | "medium"
  | "article"
  | "blog"
  | "instagram";

interface Content {
  _id: string;
  type: ContentType;
  link: string;
  title: string;
}

interface ShareResponse {
  content: Content[];
  username: string;
}

export function SharePage() {
  const navigate = useNavigate();
  const { hash } = useParams<{ hash: string }>();

  const [sharedContent, setSharedContent] = useState<Content[]>([]);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isValidContentType = (type: string): type is ContentType =>
    ["twitter", "youtube", "medium", "article", "blog", "instagram"].includes(
      type
    );

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get<ShareResponse>(
          `${BACKEND_URL}/api/v1/brain/${hash}`
        );

        const validatedContent = response.data.content.map((item) => ({
          ...item,
          type: isValidContentType(item.type) ? item.type : "article",
        }));

        setSharedContent(validatedContent);
        setUsername(response.data.username);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Invalid or expired share link"
          );
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash]);

  const navigateTo = (path: string) => navigate(path);

  const madeby = async () => {
    toast.info("🚀 Built with caffeine, code & heart by Sam.", {
      position: "bottom-right",
      autoClose: 3000,
    });
    setTimeout(() => {
      window.open("https://github.com/venomusblood568", "_blank");
    }, 4000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl md:text-3xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white text-center px-4">
        <p className="text-xl md:text-3xl mb-6">{error}</p>
        <div className="w-64">
          <Button
            text="Return to Home"
            onClick={() => navigateTo("/")}
            variant="primary"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-grid-light-purple opacity-60 pointer-events-none" />

      {/* Mobile Hamburger */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-darkPurple/80 hover:bg-darkPurple transition-all shadow-lg ${
          isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <div className="text-white w-6 h-6">
          <MenuIcon />
        </div>
      </button>

      {/* Sidebar with top-aligned buttons */}
      <div
        className={`fixed top-0 left-0 h-screen border-r-2 border-darkPurple bg-darkBg z-40 
          transition-transform duration-300 ease-in-out 
          lg:translate-x-0 lg:w-56
          ${
            isSidebarOpen
              ? "translate-x-0 w-72"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex justify-between items-center p-4 lg:p-5 lg:m-5 border-b lg:border-none border-darkPurple/50">
          <div
            onClick={madeby}
            className="text-3xl tracking-widest cursor-pointer hover:scale-105 transition-transform text-white"
          >
            <span className="text-darkPurple">ᑎ</span>
            <span className="text-white">ᗴᑌᖇᗝ</span>
            <span className="text-darkPurple">ᑎ</span>
          </div>

          <button
            className="lg:hidden text-white hover:text-darkPurple p-1"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="w-6 h-6">
              <XIcon />
            </div>
          </button>
        </div>

        {/* Sidebar Buttons */}
        <div className=" w-full flex flex-col items-center px-4 gap-2 lg:gap-4">
          
          <Button
            variant="primary"
            text="Neuron"
            fullwidth
            onClick={() => navigateTo("/")}
          />
          <Button
            variant="secondary"
            text="Create Account"
            fullwidth
            onClick={() => navigateTo("/signup")}
          />
          <Button
            variant="primary"
            text="Login"
            fullwidth
            onClick={() => navigateTo("/login")}
          />
        </div>
      </div>

      {/* Main Content with fixed grid layout */}
      <div className="lg:ml-56 flex-1 p-4 lg:p-10 relative">
        <h1 className="text-center lg:text-right text-2xl lg:text-5xl font-extrabold tracking-wide mb-12 lg:mb-0 lg:absolute lg:top-8 lg:right-8">
          <span className="text-darkPurple">{username}'s</span>
          <span className="text-white ml-2">Neuron</span>
        </h1>

        {/* Grid layout fixes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-8 lg:mt-16 w-full">
          {sharedContent.map((content) => (
            <Card
              key={content._id}
              id={content._id}
              type={content.type}
              link={content.link}
              title={content.title}
              disableActions
            />
          ))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
