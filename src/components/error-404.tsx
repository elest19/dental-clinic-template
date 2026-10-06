import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Error404() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-3xl rounded-[var(--radius-md)] border border-border bg-white/70 p-8 text-center sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">BrightSmile</p>
        <div className="mt-6 font-display text-7xl leading-none text-foreground sm:text-8xl">404</div>
        <h1 className="mt-4 font-display text-3xl text-foreground sm:text-5xl">This page could not be found.</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          The page you were looking for may have moved, or the link may no longer be active. We’d be happy to help you get back to your smile care.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-primary text-white hover:bg-primary/90">
            <Link href="/">Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#book">Book an appointment</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
