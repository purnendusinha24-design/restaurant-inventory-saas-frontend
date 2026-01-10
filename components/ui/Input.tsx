import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
        text-black
        placeholder:text-black
        focus:outline-none
        focus:ring-2 focus:ring-black
        ${props.className || ""}
      `}
    />
  );
}
