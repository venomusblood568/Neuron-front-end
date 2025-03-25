import { ReactElement } from "react";

export function Logout({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  onClick: () => void
}) {
  return (
    <div 
          onClick={onClick}
          className="
                    flex 
                    text-white 
                    bg-red-600 
                    items-center 
                    gap-4 
                    w-full 
                    cursor-pointer 
                    rounded 
                    px-6 
                    py-3 
                    ">
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <div className="flex-1">{text}</div>
      <div></div>
    </div>
  );
}
