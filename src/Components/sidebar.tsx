import { ContentIcon } from "../icon/content";
import { YoutubeIcon } from "../icon/youtube";
import { SidebarItems } from "./sidebarItems";
import { LinkIcon } from "../icon/link";

export function SideBar(){
    return (
      <div className="h-screen bg-black border-darkPurple  border-r-2 w-56 fixed left-0  top-0 ">
        <div className="flex items-center justify-center text-white text-3xl p-5 m-5 tracking-widest">
          <a className="text-darkPurple">ᑎ</a>ᗴᑌᖇᗝ
          <a className="text-darkPurple">ᑎ</a>
        </div>
        <div className="text-white pt-2 text-1xl flex flex-col gap-6 items-center justify-center p-4 w-full max-w-md px-4">
          <SidebarItems text=" CONTENTS " icon={<ContentIcon />} />
          <SidebarItems text=" YOUTUBE " icon={<YoutubeIcon />} />
          <SidebarItems text=" LINK DUMP " icon={<LinkIcon />} />
        </div>
      </div>
    );
}