import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="min-h-6 text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#14284B] leading-none">{value}</p>
        </div>
        <div className="mt-1 flex h-5 w-5 items-center justify-center text-[#14284B]">
          {icon}
        </div>
      </div>
    </div>
  );
}
