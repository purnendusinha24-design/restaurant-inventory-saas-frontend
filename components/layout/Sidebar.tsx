"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Package,
  UtensilsCrossed,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Menu", href: "/menu", icon: UtensilsCrossed },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Vendors", href: "/vendors", icon: Truck },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="h-full px-3 py-6">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <span className="text-lg font-semibold">
          {collapsed ? "🍽️" : "Inventory Ops"}
        </span>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative flex items-center rounded-md px-3 py-2 text-sm transition",
                collapsed ? "justify-center" : "gap-3",
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              {/* Active indicator */}
              <span
                className={clsx(
                  "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-blue-500",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />

              <Icon className="h-4 w-4 shrink-0" />

              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
