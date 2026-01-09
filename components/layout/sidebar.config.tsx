import type { ReactNode } from "react";
import type { UserRole } from "@/lib/api/types";
import {
  LayoutDashboard,
  Boxes,
  Utensils,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  Users,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  href: string;
  roles: UserRole[];
  icon?: ReactNode;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    roles: ["OWNER", "MANAGER", "STAFF"],
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Inventory",
    href: "/inventory",
    roles: ["OWNER", "MANAGER"],
    icon: <Boxes size={18} />,
  },
  {
    label: "Menu",
    href: "/menu",
    roles: ["OWNER", "MANAGER"],
    icon: <Utensils size={18} />,
  },
  {
    label: "Orders",
    href: "/orders",
    roles: ["OWNER", "MANAGER", "STAFF"],
    icon: <ShoppingCart size={18} />,
  },
  {
    label: "Kitchen",
    href: "/kitchen",
    roles: ["OWNER", "MANAGER", "STAFF"],
    icon: <ShoppingCart size={18} />,
  },
  {
    label: "Vendors",
    href: "/vendors",
    roles: ["OWNER", "MANAGER"],
    icon: <Truck size={18} />,
  },
  {
    label: "Reports",
    href: "/reports",
    roles: ["OWNER", "MANAGER"],
    icon: <BarChart3 size={18} />,
  },
  {
    label: "Settings",
    href: "/settings",
    roles: ["OWNER"],
    icon: <Settings size={18} />,
  },
  {
    label: "Users",
    href: "/settings/users",
    roles: ["OWNER"],
    icon: <Users size={18} />,
  },
];
