import { useEffect,useState } from "react";
import { ContentIcon } from "../icon/content";
import { YoutubeIcon } from "../icon/youtube";
import { SidebarItems } from "./sidebarItems";
import { LinkIcon } from "../icon/link";
import { ProfileIcon } from "../icon/profile";
import { useNavigate } from "react-router-dom";
import { Logout } from "./logout";
import { LogoutIcon } from "../icon/logout";
import { toast } from "react-toastify";

export function SideBar(){
  
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      navigate("/login");
    }
    setUsername(storedUsername);
  }, [navigate]);

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

  return (
    <div className="h-screen bg-black border-darkPurple  border-r-2 w-56 fixed left-0  top-0 flex flex-col">
      <div className="flex items-center justify-center text-white text-3xl p-5 m-5 tracking-widest">
        <a className="text-darkPurple">ᑎ</a>ᗴᑌᖇᗝ
        <a className="text-darkPurple">ᑎ</a>
      </div>
      <div className="text-white pt-2 text-1xl flex flex-col gap-6 items-center justify-center p-4 w-full max-w-md px-4">
        <SidebarItems text=" CONTENTS " icon={<ContentIcon />} />
        <SidebarItems text=" YOUTUBE " icon={<YoutubeIcon />} />
        <SidebarItems text=" LINK DUMP " icon={<LinkIcon />} />
        <div className="absolute bottom-4 w-full flex flex-col items-center duration-300 cursor-pointer px-4 rounded-md py-2 gap-2">
          
          <hr className="border-darkPurple w-full" />
          <SidebarItems text={username} icon={<ProfileIcon />} />
          <hr />
          <Logout onClick={logouthandler} icon={<LogoutIcon />} text="Logout" />
        </div>
      </div>
    </div>
  );
}