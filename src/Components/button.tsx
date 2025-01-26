import { ReactElement } from "react";

interface ButtonPros {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullwidth?: boolean;
  loading?: boolean;
}

// Mapping button variants to their respective CSS classes
const variantClasses = {
  primary: "bg-darkPurple text-white",
  secondary: "bg-lightPurple text-darkPurple",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

export function Button({
  variant,
  text,
  startIcon,
  endIcon,
  onClick,
  fullwidth,
  loading,
}: ButtonPros) {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyles} ${
        fullwidth ? "w-full flex justify-center items-center" : ""
      } ${loading ? "opacity-45" : ""}`}
      disabled={loading}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
      {endIcon && <div className="pl-2">{endIcon}</div>}
    </button>
  );
}
