import { TwitterIcon } from "../icon/twitter";
import { YoutubeIcon } from "../icon/youtube";
import { SidebarItems } from "./sidebarItems";

export function SideBar(){
    return (
      <div className="h-screen bg-black border-darkPurple  border-r-2 w-72 fixed left-0  top-0 ">
        <div className="flex items-center justify-center text-white text-5xl p-5  m-5 ">
          <a className="text-darkPurple">ᑎ</a>ᗴᑌᖇᗝᑎ
        </div>
        <div className="text-white pt-4 text-2xl flex flex-col gap-6 items-center justify-center p-6 w-full max-w-md">
          <SidebarItems text="丅ᗯI丅丅ᗴᖇ" icon={<TwitterIcon />} />
          <SidebarItems text="Ƴᗝᑌ丅ᑌᗷᗴ" icon={<YoutubeIcon />} />
        </div>
      </div>
    );
}