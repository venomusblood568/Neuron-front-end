import { ReactElement } from "react";

export function SidebarItems({text,icon}:{
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex text-white items-center gap-3 cursor-pointer rounded max-w-55 pl-5 pr-5 py-3 transition-all duration-300 hover:bg-darkPurple hover:text-white hover:shadow-xl hover:scale-105">
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}
