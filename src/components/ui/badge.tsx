import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary",
        className,
      )}
      {...props}
    />
  );
}
