"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, LayoutDashboard, LogOut, Menu, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const ADMIN_FLAG_KEY = "isAdmin";
const ADMIN_EMAIL_KEY = "adminEmail";
const SIDEBAR_COLLAPSED_KEY = "adminSidebarCollapsed";

const navItems = [
  { label: "Appointments", href: "/admin", icon: LayoutDashboard },
  { label: "Accounts", href: "/admin/accounts", icon: Users },
] as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminEmail, setAdminEmail] = useState("admin@brightsmile.test");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isAdmin = window.localStorage.getItem(ADMIN_FLAG_KEY) === "true";
    if (!isAdmin) {
      router.replace("/admin/login");
      return;
    }

    setAdminEmail(window.localStorage.getItem(ADMIN_EMAIL_KEY) ?? "admin@brightsmile.test");
    setSidebarCollapsed(window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true");
    setIsReady(true);
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed));
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (!mobileSidebarOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileSidebarOpen]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_FLAG_KEY);
      window.localStorage.removeItem(ADMIN_EMAIL_KEY);
    }
    router.push("/admin/login");
  };

  if (!isReady) {
    return null;
  }

  const sidebarClassName = sidebarCollapsed ? "w-[72px]" : "w-[240px]";

  return (
    <div className="min-h-screen bg-[#F6F1E9] text-[#14284B]">
      <div className="flex min-h-screen">
        <aside
          className={[
            "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-[#22375E] bg-[#14284B] text-white xl:flex",
            sidebarClassName,
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#EAF7F6] text-sm font-semibold text-[#14284B]">
                B
              </div>
              {!sidebarCollapsed ? (
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E7F9F7]">BrightSmile</p>
                  <p className="text-[11px] text-white/65">Admin</p>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              aria-label={sidebarCollapsed ? "Expand the sidebar" : "Collapse the sidebar"}
              onClick={() => setSidebarCollapsed((value) => !value)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7F9F7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14284B]"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" aria-hidden="true" /> : <X className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5" aria-label="Admin navigation">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = href === pathname || (href === "/admin" && pathname === "/admin");

              return (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  title={sidebarCollapsed ? label : undefined}
                  onClick={() => router.push(href)}
                  className={[
                    "flex w-full items-center rounded-[var(--radius-md)] border border-transparent px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAF7F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14284B]",
                    isActive ? "border-l-2 border-[#E8896B] bg-white/8 text-white" : "text-white/75 hover:bg-white/6 hover:text-white",
                    sidebarCollapsed ? "justify-center" : "justify-start",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {!sidebarCollapsed ? <span>{label}</span> : null}
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2 py-2 text-sm text-white/75 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAF7F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14284B]"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {!sidebarCollapsed ? "View site" : null}
            </button>

            <div className="mt-3 flex items-center gap-3 rounded-[var(--radius-md)] bg-white/6 px-2 py-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF7F6] text-xs font-semibold text-[#14284B]">
                {adminEmail.slice(0, 2).toUpperCase()}
              </div>
              {!sidebarCollapsed ? (
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white">BrightSmile Admin</div>
                  <div className="truncate text-[11px] text-white/65">{adminEmail}</div>
                </div>
              ) : null}
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={handleLogout}
              className={[
                "mt-3 w-full justify-center border-white/10 bg-white/6 text-white hover:bg-white/10",
                sidebarCollapsed ? "px-2" : "",
              ].join(" ")}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {!sidebarCollapsed ? "Log out" : null}
            </Button>
          </div>
        </aside>

        <div
          className={[
            "fixed inset-0 z-40 bg-[#14284B]/35 xl:hidden",
            mobileSidebarOpen ? "block" : "hidden",
          ].join(" ")}
          aria-hidden={!mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen(false)}
        />

        <aside
          className={[
            "fixed inset-y-0 left-0 z-50 flex w-[240px] -translate-x-full flex-col bg-[#14284B] text-white transition-transform duration-200 xl:hidden",
            mobileSidebarOpen ? "translate-x-0" : "",
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[#EAF7F6] text-sm font-semibold text-[#14284B]">
                B
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E7F9F7]">BrightSmile</p>
                <p className="text-[11px] text-white/65">Admin</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close sidebar menu"
              onClick={() => setMobileSidebarOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7F9F7]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5" aria-label="Admin mobile navigation">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = href === pathname || (href === "/admin" && pathname === "/admin");

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    router.push(href);
                  }}
                  className={[
                    "flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    isActive ? "bg-white/8 text-white" : "text-white/75 hover:bg-white/6 hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-3">
            <button
              type="button"
              onClick={() => {
                setMobileSidebarOpen(false);
                router.push("/");
              }}
              className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2 py-2 text-sm text-white/75 hover:bg-white/6 hover:text-white"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              View site
            </button>
            <div className="mt-3 flex items-center gap-3 rounded-[var(--radius-md)] bg-white/6 px-2 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF7F6] text-xs font-semibold text-[#14284B]">
                {adminEmail.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">BrightSmile Admin</div>
                <div className="truncate text-[11px] text-white/65">{adminEmail}</div>
              </div>
            </div>
            <Button type="button" variant="secondary" onClick={handleLogout} className="mt-3 w-full border-white/10 bg-white/6 text-white hover:bg-white/10">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </Button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-5 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
