import { useEffect, useState } from "react";
import { ContentIcon } from "../icon/content";
import { SidebarItems } from "./sidebarItems";
import { LinkIcon } from "../icon/link";
import { ProfileIcon } from "../icon/profile";
import { useNavigate } from "react-router-dom";
import { Logout } from "./logout";
import { LogoutIcon } from "../icon/logout";
import { toast } from "react-toastify";
import { AreaIcon } from "../icon/areas";
import { ArchiveIcon } from "../icon/archieve";
import { ExperimentIcon } from "../icon/experiment";
import { RandomIcon } from "../icon/random";
import { MenuIcon } from "../icon/menu";
import { XIcon } from "../icon/xicon";

interface sidebarProps {
  onFilterChange: (tag: string) => void;
}

export function SideBar({ onFilterChange }: sidebarProps) {
  const [username, setUsername] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    }
    setUsername(storedUsername);
  }, [navigate]);

  const handleFilterClick = (tag: string) => {
    const newFilter = tag === activeFilter ? "" : tag;
    setActiveFilter(tag === activeFilter ? null : tag);
    onFilterChange(newFilter);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  async function logouthandler() {
    localStorage.removeItem("username");
    toast.success(`Bye ${username}. See you soon!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  async function madeby() {
    toast.info("🚀 Built with caffeine, code & heart by Sam.", {
      position: "bottom-right",
      autoClose: 3000,
    });
    setTimeout(() => {
      window.open("https://github.com/venomusblood568", "_blank");
    }, 4000);
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-darkPurple/80 hover:bg-darkPurple transition-all
          ${isSidebarOpen ? "opacity-0" : "opacity-100"} shadow-lg`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <MenuIcon className="text-white w-6 h-6" />
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen bg-darkBg border-r-2 border-darkPurple z-40 
          transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-56
          ${isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full"}`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 border-b border-darkPurple/50">
          <div
            onClick={madeby}
            className="flex text-white items-center gap-2 text-3xl  tracking-widest cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="text-darkPurple">ᑎ</span>ᗴᑌᖇᗝ
            <span className="text-darkPurple">ᑎ</span>
          </div>
          <button
            className="lg:hidden text-white hover:text-darkPurple p-1"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2 p-4 h-[calc(100vh-180px)] overflow-y-auto">
          <SidebarItems
            icon={<ContentIcon />}
            text="PROJECTS"
            onClick={() => handleFilterClick("project")}
            active={activeFilter === "project"}
            mobile
          />
          <SidebarItems
            icon={<AreaIcon />}
            text="AREAS"
            onClick={() => handleFilterClick("area")}
            active={activeFilter === "area"}
            mobile
          />
          <SidebarItems
            icon={<LinkIcon />}
            text="RESOURCES"
            onClick={() => handleFilterClick("resource")}
            active={activeFilter === "resource"}
            mobile
          />
          <SidebarItems
            icon={<ArchiveIcon />}
            text="ARCHIVES"
            onClick={() => handleFilterClick("archives")}
            active={activeFilter === "archives"}
            mobile
          />
          <SidebarItems
            icon={<ExperimentIcon />}
            text="EXPERIMENTS"
            onClick={() => handleFilterClick("experiment")}
            active={activeFilter === "experiment"}
            mobile
          />
          <SidebarItems
            icon={<RandomIcon />}
            text="RANDOM LINK"
            onClick={() => handleFilterClick("random")}
            active={activeFilter === "random"}
            mobile
          />
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full border-t border-darkPurple/50 bg-darkBg">
          <div className="p-4">
            <SidebarItems
              icon={<ProfileIcon />}
              text={username || "User"}
              onClick={() => {}}
              mobile
            />
            <div className="mt-2">
              <Logout
                icon={<LogoutIcon />}
                text="Logout"
                onClick={logouthandler}
                mobile
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
