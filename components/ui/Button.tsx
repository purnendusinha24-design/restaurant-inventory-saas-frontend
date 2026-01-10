import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "destructive";
  size?: "sm" | "md";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const base =
    "rounded-lg text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2",
  };

  const variantClasses = {
    primary: "bg-black text-white hover:opacity-90",
    ghost: "text-gray-600 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}
