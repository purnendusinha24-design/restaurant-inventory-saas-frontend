import "./globals.css";
import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-body text-white min-h-screen">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-slate-900 border-r border-slate-800">
            <Sidebar />
          </aside>

          <div className="flex-1 flex flex-col">
            <header className="h-14 bg-slate-900 border-b border-slate-800">
              <Topbar />
            </header>

            <main className="flex-1 p-6 bg-bg-body">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
