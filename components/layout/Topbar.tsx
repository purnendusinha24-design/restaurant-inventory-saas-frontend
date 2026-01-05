"use client";

import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  return (
    <div className="flex h-full w-full items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span className="text-white">Dashboard</span>
        {segments.map((segment, index) => (
          <span key={index} className="flex items-center gap-2">
            <span>/</span>
            <span className="text-white">{segment}</span>
          </span>
        ))}
      </div>

      {/* Right side (user placeholder) */}
      <div className="text-sm">User</div>
    </div>
  );
}
