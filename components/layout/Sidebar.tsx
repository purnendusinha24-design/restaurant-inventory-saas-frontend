"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "./sidebar.config";
import { useAuth } from "@/lib/use-auth";
import clsx from "clsx";

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const visibleItems = SIDEBAR_ITEMS.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <nav className="flex h-full flex-col gap-1 p-3">
      {visibleItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition",
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            )}
          >
            {/* Icon (optional) */}
            {item.icon && (
              <span className="flex h-5 w-5 items-center justify-center">
                {item.icon}
              </span>
            )}

            {/* Label */}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
