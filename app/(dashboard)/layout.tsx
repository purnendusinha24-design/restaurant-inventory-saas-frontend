"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useAuth } from "@/lib/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  // 🔐 AUTH GUARD (single source of truth)
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Load persisted sidebar state
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored !== null) {
      setCollapsed(stored === "true");
    }
  }, []);

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  // ⏳ Prevent flash before auth resolution
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-bg-body text-white">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300
          ${collapsed ? "w-16" : "w-64"}
          bg-slate-900 border-r border-slate-800`}
      >
        <Sidebar collapsed={collapsed} />
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center border-b border-slate-800 bg-slate-900 px-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mr-3 rounded-md p-2 hover:bg-slate-800"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          <Topbar />
        </header>

        <main className="flex-1 bg-bg-body p-6">{children}</main>
      </div>
    </div>
  );
}
