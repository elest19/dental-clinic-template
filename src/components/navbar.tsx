"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { detailNavItems, navItems, type NavItem } from "@/content/site";
import { serviceCategories, services } from "@/content/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * `variant="detail"` reuses the same bar on service pages: links are reduced
 * to About Us / Services / Contact Us and the bar stays solid, since those
 * pages have no hero image to overlay and no homepage sections to track.
 */
export function Navbar({ variant = "home" }: { variant?: "home" | "detail" }) {
  const isDetail = variant === "detail";
  const items: readonly NavItem[] = isDetail ? detailNavItems : navItems;
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(isDetail ? "services" : "home");
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Hover only closes after a short delay, so moving the pointer from the
  // button to the panel does not flicker the menu shut.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Escape and outside clicks close the menu.
  useEffect(() => {
    if (!servicesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    // Detail pages have no section[id] anchors and never switch to transparent.
    if (isDetail) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));

    // Picks the section occupying the reading line below the fixed navbar.
    // Ratio-based picking breaks once a section is taller than the viewport,
    // which is the case for the merged About section.
    const pickActive = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0]?.id ?? "home";

      for (const section of sections) {
        if (section.offsetTop <= line) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    let frameId = 0;
    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const hero = document.getElementById("home");
        const threshold = hero ? hero.offsetHeight - 80 : 80;
        setScrolled(window.scrollY > threshold);
        pickActive();
      });
    };

    pickActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDetail]);

  const solid = isDetail || scrolled || open;
  // Shared open/close motion for the Services menus: quick fade with a
  // slight slide, matching the chevron rotate duration (200ms).
  const menuTransition = { duration: 0.2, ease: "easeOut" as const };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid
          ? "border-border bg-background text-foreground"
          : "border-white/15 bg-transparent text-white",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/#home" className="flex items-center gap-3" aria-label="BrightSmile Dental Clinic home">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border text-lg font-semibold",
              solid ? "border-border bg-surface text-primary" : "border-white/40 bg-white/10 text-white",
            )}
          >
            B
          </div>
          <div>
            <p className={cn("text-sm font-semibold uppercase tracking-[0.18em]", solid ? "text-primary" : "text-white")}>
              BrightSmile
            </p>
            <p className={cn("text-[10px] uppercase tracking-[0.18em]", solid ? "text-muted-foreground" : "text-white/75")}>
              Dental Clinic
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex xl:gap-8" aria-label="Main navigation">
          {items.map((item) => {
            const section = item.href.replace("/#", "").replace("/", "");

            if (item.label === "Services") {
              const isActive = activeSection === "services";

              return (
                <div
                  key={item.label}
                  ref={servicesRef}
                  className="-my-4 flex items-center py-4"
                  onMouseEnter={() => { cancelClose(); setServicesOpen(true); }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => {
                      cancelClose();
                      setServicesOpen((value) => !value);
                    }}
                    onFocus={() => {
                      cancelClose();
                      setServicesOpen(true);
                    }}
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      solid
                        ? isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background"
                        : isActive
                          ? "text-white"
                          : "text-white/80 hover:text-white focus-visible:ring-white/70 focus-visible:ring-offset-transparent cursor-pointer",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-3.5 w-3.5 transition-transform duration-200", servicesOpen && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen ? (
                    <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} className="absolute left-0 right-0 top-full z-50 w-full before:absolute before:-top-4 before:inset-x-0 before:block before:h-4 before:content-['']">
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={menuTransition}
                        data-lenis-prevent
                        className="max-h-[calc(100vh-73px)] w-full overflow-y-auto border-b border-border bg-background text-foreground shadow-[0_24px_48px_-12px_rgba(15,42,67,0.30)]">
                        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div aria-hidden="true" className="mb-8 h-px bg-border" />
                        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">
                          {serviceCategories.map((category) => {
                            const items = services.filter((service) => service.categorySlug === category.slug);

                            return (
                              <div key={category.slug} className="flex flex-col">
                                <Link
                                  href={`/services/${category.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="rounded-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                  {category.name}
                                </Link>
                                <p className="mt-1 text-xs text-muted-foreground">{category.description}</p>
                                <ul className="mt-4 flex flex-col gap-2.5">
                                  {items.map((service) => (
                                    <li key={service.slug}>
                                      <Link
                                        href={`/services/${service.categorySlug}/${service.slug}`}
                                        onClick={() => setServicesOpen(false)}
                                        className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                      >
                                        {service.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-6">
                          <p className="text-sm text-muted-foreground">Not sure which treatment you need?</p>
                          <Link
                            href="/#contact"
                            onClick={() => setServicesOpen(false)}
                            className="text-sm font-medium text-primary underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            Talk to our team
                          </Link>
                        </div>
                        </div>
                      </motion.div>
                    </div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = activeSection === section;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  solid
                    ? isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background"
                    : isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white focus-visible:ring-white/70 focus-visible:ring-offset-transparent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button asChild size="sm" className="ml-2 bg-accent text-foreground hover:bg-accent/90">
            <Link href="/#book">Book an Appointment</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Button asChild size="sm" className="bg-accent text-foreground hover:bg-accent/90">
            <Link href="/#book">Book</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
                          setMobileServicesOpen(false);
                          setOpen((value) => !value);
                        }}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              solid
                ? "border-border bg-surface text-foreground focus-visible:ring-ring focus-visible:ring-offset-background"
                : "border-white/40 bg-white/10 text-white focus-visible:ring-white/70 focus-visible:ring-offset-transparent",
            )}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile menu"
              className="fixed inset-0 z-40 bg-[#14284B]/40 backdrop-blur-[1px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              id="mobile-menu"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] overflow-y-auto border-r border-border bg-background text-foreground shadow-2xl md:hidden"
              aria-label="Mobile navigation sidebar"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <Link href="/#home" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label="BrightSmile Dental Clinic home">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface text-lg font-semibold text-primary">
                    B
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">BrightSmile</p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Dental Clinic</p>
                  </div>
                </Link>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface text-foreground transition-colors hover:bg-surface/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
                {items.map((item) => {
                  const section = item.href.replace("/#", "").replace("/", "");
                  const isActive = activeSection === section;

                  if (item.label === "Services") {
                    return (
                      <div key={item.label}>
                        <div className="flex items-center gap-1">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                              "flex-1 rounded-[var(--radius-md)] px-3 py-2 text-base font-medium",
                              isActive ? "bg-surface text-primary" : "text-foreground",
                            )}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            aria-expanded={mobileServicesOpen}
                            aria-label={mobileServicesOpen ? "Close Services submenu" : "Open Services submenu"}
                            onClick={() => setMobileServicesOpen((value) => !value)}
                            className="rounded-[var(--radius-md)] p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            <ChevronDown
                              size={18}
                              aria-hidden="true"
                              className={cn("transition-transform duration-200", mobileServicesOpen && "rotate-180")}
                            />
                          </button>
                        </div>

                        <AnimatePresence initial={false}>
                          {mobileServicesOpen ? (
                            <motion.div
                              key="mobile-services"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={menuTransition}
                              className="overflow-hidden"
                            >
                              <ul className="mb-2 ml-3 border-l border-border pl-3">
                                {serviceCategories.map((category) => (
                                  <li key={category.slug}>
                                    <p className="pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                                      {category.name}
                                    </p>
                                    <ul>
                                      {services
                                        .filter((service) => service.categorySlug === category.slug)
                                        .map((service) => (
                                          <li key={service.slug}>
                                            <Link
                                              href={`/services/${service.categorySlug}/${service.slug}`}
                                              onClick={() => setOpen(false)}
                                              className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary"
                                            >
                                              {service.name}
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-[var(--radius-md)] px-3 py-2 text-base font-medium",
                        isActive ? "bg-surface text-primary" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/#book"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-[var(--radius-md)] bg-accent px-4 py-3 text-center text-sm font-medium text-foreground"
                >
                  Book an Appointment
                </Link>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
