"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/login");
  };

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

      {/* Right side */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-300">User</span>

        <button
          onClick={handleLogout}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
