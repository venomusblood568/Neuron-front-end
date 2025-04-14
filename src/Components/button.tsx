import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullwidth?: boolean;
  loading?: boolean;
  mobile?: boolean;
}

const variantClasses: Record<ButtonProps["variant"], string> = {
  primary: "bg-darkPurple text-white",
  secondary: "bg-lightPurple text-darkPurple",
};

const defaultStyles = [
  "inline-flex items-center justify-center",
  "px-3 py-2 text-sm",
  "sm:px-4 sm:py-2 sm:text-base",
  "md:px-5 md:py-3 md:text-base",
  "lg:px-6 lg:py-3 lg:text-lg",
  "rounded-md font-medium",
  "cursor-pointer transition-colors duration-200",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ");

export function Button({
  variant,
  text,
  startIcon,
  endIcon,
  onClick,
  fullwidth = false,
  loading = false,
}: ButtonProps) {
  const selectedVariant = variantClasses[variant];

  return (
    <button
      onClick={onClick}
      className={`
        ${selectedVariant}
        ${defaultStyles}
        ${fullwidth ? "w-full" : "w-fit"}
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      disabled={loading}
    >
      {startIcon && (
        <span className="mr-2 text-base sm:text-lg">{startIcon}</span>
      )}
      <span className="whitespace-nowrap">{text}</span>
      {endIcon && <span className="ml-2 text-base sm:text-lg">{endIcon}</span>}
    </button>
  );
}
