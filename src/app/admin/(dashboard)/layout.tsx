"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, LayoutDashboard, LogOut, Menu, PanelLeftClose, Users, X } from "lucide-react";

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
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);
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
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileSidebarOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const focusTarget = drawerRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusTarget?.focus();

    const triggerButton = menuButtonRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerButton?.focus();
    };
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
      <header className="sticky top-0 z-30 border-b border-[#22375E]/80 bg-[#14284B] px-4 py-3 text-white shadow-sm xl:hidden">
        <div className="flex items-center gap-3">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-controls="admin-mobile-drawer"
            aria-expanded={mobileSidebarOpen}
            onClick={() => setMobileSidebarOpen((value) => !value)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#14284B]"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#F7E8E1] text-sm font-semibold text-[#14284B]">
            B
          </div>

          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E7F9F7]">BrightSmile</p>
            <p className="truncate text-sm font-medium text-white">Admin</p>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        <aside
          className={[
            "sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden border-r border-[#22375E] bg-[#14284B] text-white transition-[width] duration-300 ease-out motion-reduce:transition-none xl:flex",
            sidebarClassName,
          ].join(" ")}
        >
          {!sidebarCollapsed ? (
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#F7E8E1] text-sm font-semibold text-[#14284B]">
                  B
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E7F9F7]">BrightSmile</p>
                  <p className="text-[11px] text-white/65">Admin</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Collapse sidebar"
                aria-expanded={!sidebarCollapsed}
                onClick={() => setSidebarCollapsed((value) => !value)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#14284B]"
              >
                <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 border-b border-white/10 px-3 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#F7E8E1] text-sm font-semibold text-[#14284B]">
                B
              </div>
              <button
                type="button"
                aria-label="Expand sidebar"
                aria-expanded={!sidebarCollapsed}
                onClick={() => setSidebarCollapsed((value) => !value)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#14284B]"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

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
                    "flex w-full cursor-pointer items-center rounded-[var(--radius-md)] border border-transparent px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#14284B]",
                    isActive ? "border-l-2 border-[#E8896B] bg-[#E8896B]/10 text-white" : "text-white/75 hover:bg-white/6 hover:text-white",
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

          <div className={[
            "border-t border-white/10 p-3",
            sidebarCollapsed ? "flex flex-col items-center gap-3" : "",
          ].join(" ")}>
            <button
              type="button"
              aria-label="View site"
              title="View site"
              onClick={() => router.push("/")}
              className={[
                "flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-2 py-2 text-sm text-white/75 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#14284B]",
                sidebarCollapsed ? "w-full justify-center" : "w-full",
              ].join(" ")}
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {!sidebarCollapsed ? "View site" : null}
            </button>

            <div
              className={[
                "flex items-center rounded-[var(--radius-md)] bg-white/6 px-2 py-2",
                sidebarCollapsed ? "w-full justify-center" : "gap-3",
              ].join(" ")}
              role="img"
              aria-label="Admin user profile"
              title="Admin user profile"
              tabIndex={0}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7E8E1] text-xs font-semibold text-[#14284B]">
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
              aria-label="Log out"
              title="Log out"
              onClick={handleLogout}
              className={[
                "mt-0 w-full justify-center border-white/10 bg-white/6 text-white hover:bg-white/10",
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
            "fixed inset-0 z-40 bg-[#14284B]/35 backdrop-blur-[1px] xl:hidden",
            mobileSidebarOpen ? "block" : "hidden",
          ].join(" ")}
          aria-hidden={!mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen(false)}
        />

        <aside
          id="admin-mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation drawer"
          tabIndex={-1}
          className={[
            "fixed inset-y-0 left-0 z-50 flex w-[280px] -translate-x-full flex-col bg-[#14284B] text-white shadow-2xl transition-transform duration-300 ease-out xl:hidden",
            mobileSidebarOpen ? "translate-x-0" : "",
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[#F7E8E1] text-sm font-semibold text-[#14284B]">
                B
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E7F9F7]">BrightSmile</p>
                <p className="text-[11px] text-white/65">Admin</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              aria-expanded={mobileSidebarOpen}
              onClick={() => setMobileSidebarOpen(false)}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                    "flex w-full cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    isActive ? "bg-[#E8896B]/10 text-white" : "text-white/75 hover:bg-white/6 hover:text-white",
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
              className="flex w-full cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-2 py-2 text-sm text-white/75 hover:bg-white/6 hover:text-white"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              View site
            </button>
            <div className="mt-3 flex items-center gap-3 rounded-[var(--radius-md)] bg-white/6 px-2 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7E8E1] text-xs font-semibold text-[#14284B]">
                {adminEmail.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">BrightSmile Admin</div>
                <div className="truncate text-[11px] text-white/65">{adminEmail}</div>
              </div>
            </div>
            <Button type="button" variant="secondary" onClick={handleLogout} className="mt-3 w-full cursor-pointer border-white/10 bg-white/6 text-white hover:bg-white/10">
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
