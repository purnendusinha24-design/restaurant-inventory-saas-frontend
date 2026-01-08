"use client";

import { usePathname, useRouter } from "next/navigation";
import OutletSelector from "@/components/OutletSelector";
import { useAuth } from "@/lib/use-auth";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .slice(1)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/login");
  };

  return (
    <div className="flex h-full w-full items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span className="text-white font-medium">Dashboard</span>

        {segments.map((segment, index) => (
          <span key={index} className="flex items-center gap-2">
            <span className="text-slate-500">/</span>
            <span className="text-white">{segment}</span>
          </span>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <OutletSelector />

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="hidden sm:inline">{user?.role ?? "User"}</span>

          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
