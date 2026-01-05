import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Inventory", href: "/inventory" },
  { label: "Menu", href: "/menu" },
  { label: "Orders", href: "/orders" },
  { label: "Vendors", href: "/vendors" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <div className="h-full px-4 py-6">
      <h1 className="text-lg font-semibold mb-6">Inventory Ops</h1>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
