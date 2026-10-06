import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/lib/data/appointments";

const statusStyles: Record<AppointmentStatus, string> = {
  pending: "border border-[#E8896B]/30 bg-[#FDE7DF] text-[#B75E3B]",
  confirmed: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  completed: "border border-[#14284B]/15 bg-[#14284B]/5 text-[#14284B]",
  cancelled: "border border-red-200 bg-red-50 text-red-700",
};

const statusLabels: Record<AppointmentStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.02em]",
        statusStyles[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
