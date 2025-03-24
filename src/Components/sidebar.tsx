import { useEffect,useState } from "react";
import { ContentIcon } from "../icon/content";
import { YoutubeIcon } from "../icon/youtube";
import { SidebarItems } from "./sidebarItems";
import { LinkIcon } from "../icon/link";
import { ProfileIcon } from "../icon/profile";

export function SideBar(){
   
  const[username,setUsername] = useState<String | null>(null);
  useEffect(() =>{
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername)
  },[])
  
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
          <div className="absolute bottom-4 w-full flex flex-col items-center duration-300 cursor-pointer p-4 rounded-md">
            <hr className="border-darkPurple w-full" />
            <br />
            <SidebarItems text={username} icon={<ProfileIcon />} />
          </div>
        </div>
      </div>
    );
}