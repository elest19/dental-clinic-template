import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "dark" renders on brand-color bands (navy) with light text. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl", className)}>
      {(eyebrow || index) ? (
        <div className={cn("mb-4 flex items-center gap-3", align === "center" ? "justify-center" : "") }>
          {index ? (
            <span className={cn("text-[10px] font-medium uppercase tracking-[0.26em]", dark ? "text-accent" : "text-primary")}>
              {index}
            </span>
          ) : null}
          <span className={cn("h-px flex-1", dark ? "bg-white/25" : "bg-border")} />
          {eyebrow && !index ? (
            <span className={cn("text-[10px] font-semibold uppercase tracking-[0.22em]", dark ? "text-accent" : "text-primary")}>
              {eyebrow}
            </span>
          ) : null}
        </div>
      ) : null}
      <h2 className={cn("font-display text-4xl leading-none md:text-5xl", dark ? "text-background" : "text-foreground")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed", dark ? "text-background/80" : "text-muted-foreground")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
