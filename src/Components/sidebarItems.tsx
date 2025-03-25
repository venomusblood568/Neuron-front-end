import { ReactElement } from "react";

export function SidebarItems({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  onClick: () => void
}) {
  return (
    <div onClick={onClick} className="flex text-white items-center gap-4 w-full cursor-pointer rounded px-6 py-3 transition-transform duration-300 hover:bg-darkPurple hover:text-white hover:shadow-xl hover:scale-105">
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <div className="flex-1">{text}</div>
    </div>
  );
}
