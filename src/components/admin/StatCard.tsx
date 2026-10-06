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
          <p className="mt-2 text-3xl font-semibold leading-none tracking-tight text-[#14284B]">{value}</p>
        </div>
        <div className="mt-1 flex items-center justify-center text-[#14284B]">
          <span className="flex h-4 w-4 items-center justify-center text-current">{icon}</span>
        </div>
      </div>
    </div>
  );
}
