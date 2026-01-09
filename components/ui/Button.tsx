import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm ${
        variant === "ghost"
          ? "text-gray-600 hover:bg-gray-100"
          : "bg-black text-white hover:opacity-90"
      }`}
    >
      {children}
    </button>
  );
}
