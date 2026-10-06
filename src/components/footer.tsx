"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { LegalModal, type LegalDocKey } from "@/components/legal-modal";
import { legalLinks, navItems, siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [legalDoc, setLegalDoc] = useState<LegalDocKey | null>(null);
  const closeLegal = useCallback(() => setLegalDoc(null), []);

  return (
    <footer className="border-t border-border bg-[#edf5f8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border bg-white text-lg font-semibold text-primary">
              B
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">BrightSmile</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Check-ups, cleanings, fillings, whitening, and braces in Makati.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
            {legalLinks.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => setLegalDoc(item.key)}
                  className="rounded-sm transition-colors hover:text-primary hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Visit</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>{siteConfig.address}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.email}</li>
          </ul>
          <Button asChild size="sm" className="mt-6 bg-accent text-foreground hover:bg-accent/90">
            <Link href="/#book">Book an Appointment</Link>
          </Button>
        </div>
      </div>
      <div className="border-t border-border bg-white/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          {/* <p>© 2026 {siteConfig.name}. All rights reserved.</p> */}
          <p>© 2026 John Paul Ruiz - Dental Clinic Template #1. All rights reserved.</p>
          <p>Open Monday to Saturday.</p>
        </div>
      </div>
      <LegalModal doc={legalDoc} onClose={closeLegal} />
    </footer>
  );
}
