import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-body": "#020617",
        "bg-elevated": "#020817",
        "bg-subtle": "#02081f",

        "text-primary": "#e5e7eb",
        "text-secondary": "#9ca3af",
        "text-muted": "#6b7280",

        "accent-DEFAULT": "#3b82f6",
        "accent-hover": "#2563eb",
        "accent-soft": "rgba(59,130,246,0.12)",

        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
    },
  },
  plugins: [],
};

export default config;
