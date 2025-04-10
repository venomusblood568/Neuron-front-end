import { useEffect,useState } from "react";
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

interface sidebarProps{
  onFilterChange:(tag:string) => void
}


export function SideBar({onFilterChange}:sidebarProps){
  
  const [username, setUsername] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      navigate("/login");
    }
    setUsername(storedUsername);
  }, [navigate]);

  const handleFilterClick = (tag:string) => {
    setActiveFilter(tag === activeFilter ? null : tag);
    onFilterChange(tag === activeFilter ? "" : tag); 
  }

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
  async function madeby(){
    toast.info("🚀 Built with caffeine, code & heart by Sam.",{
      position: "bottom-right",
      autoClose:3000
    })
    setTimeout(() => {
      window.open("https://github.com/venomusblood568", "_blank");
    }, 4000);
  }
  return (
    <div className="h-screen border-darkPurple  border-r-2 w-56 fixed left-0  top-0 flex flex-col">
      <div className="flex items-center justify-center text-white text-3xl p-5 m-5 tracking-widest">
        <a
          onClick={madeby}
          className="hover: hover:text-white hover:shadow-xl hover:scale-120 cursor-pointer"
        >
          <span className="text-darkPurple">ᑎ</span>ᗴᑌᖇᗝ
          <span className="text-darkPurple">ᑎ</span>
        </a>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <div className="text-white pt-2 text-1xl flex flex-col gap-2 items-center justify-center p-4 w-full max-w-md px-4">
          <SidebarItems
            active={activeFilter === "projects"}
            onClick={() => handleFilterClick("project")}
            text=" PROJECTS "
            icon={<ContentIcon />}
          />
          <SidebarItems
            active={activeFilter === "area"}
            onClick={() => handleFilterClick("area")}
            text=" AREAS "
            icon={<AreaIcon />}
          />
          <SidebarItems
            active={activeFilter === "resource"}
            onClick={() => handleFilterClick("resource")}
            text=" RESOURCES "
            icon={<LinkIcon />}
          />
          <SidebarItems
            active={activeFilter === "archives"}
            onClick={() => handleFilterClick("archives")}
            text=" ARCHIVES "
            icon={<ArchiveIcon />}
          />
          <SidebarItems
            active={activeFilter === "experiment"}
            onClick={() => handleFilterClick("experiment")}
            text=" EXPERIMENTS "
            icon={<ExperimentIcon />}
          />
          <SidebarItems
            active={activeFilter === "random"}
            onClick={() => handleFilterClick("random")}
            text=" Random Link Dump"
            icon={<RandomIcon />}
          />
        </div>
      </div>
      <div className="w-full p-4 border-t border-darkPurple mt-auto">
        <SidebarItems text={username || "User"} icon={<ProfileIcon />} onClick={function (): void {
          throw new Error("Function not implemented.");
        } } />
        <br />
        <Logout onClick={logouthandler} icon={<LogoutIcon />} text="Logout" />
      </div>
    </div>
  );
}