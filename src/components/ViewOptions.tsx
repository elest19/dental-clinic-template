"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, LayoutDashboard, LogIn } from "lucide-react";

import { Button } from "@/components/ui/base-button";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuTrigger,
} from "@/components/ui/base-menu";

export function ViewOptions() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Menu>
        <MenuTrigger
          render={
            <Button
              type="button"
              aria-label="View options"
              className="cursor-pointer rounded-full bg-[#C65D3B] px-3.5 py-2.5 text-sm font-medium text-white shadow-[0_18px_35px_-18px_rgba(198,93,59,0.9)] transition-colors duration-200 ease-out hover:bg-[#A94E32] sm:px-4 sm:py-2.5"
            >
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" aria-hidden="true" />
                <span className="whitespace-nowrap">Optional Demo Pages</span>
              </span>
            </Button>
          }
        />

        <MenuContent side="top" align="end" sideOffset={8} className="w-56 transition-all duration-200 ease-out">
          <MenuGroup>
            <MenuGroupLabel>Demo access</MenuGroupLabel>
            <MenuItem
              render={
                <Link
                  href="/admin"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover"
                >
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                  Admin Dashboard
                </Link>
              }
            />
            <MenuItem
              render={
                <Link
                  href="/admin/login"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Login Page
                </Link>
              }
            />
          </MenuGroup>
        </MenuContent>
      </Menu>
    </div>
  );
}
