import { useEffect } from "react";
import { CalendarDays, CheckCheck, Clock3, Mail, MessageSquareText, Phone, Stethoscope, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { Appointment, AppointmentStatus } from "@/lib/data/appointments";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function AppointmentDrawer({
  appointment,
  open,
  onClose,
  onStatusChange,
  onDelete,
  onCancelRequest,
}: {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
  onDelete: (id: string) => void;
  onCancelRequest: (appointment: Appointment) => void;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!appointment) {
    return null;
  }

  const statusActions = (() => {
    if (appointment.status === "pending") {
      return [
        { label: "Confirm", action: () => onStatusChange(appointment.id, "confirmed"), primary: true, icon: CheckCheck },
        { label: "Cancel", action: () => onCancelRequest(appointment), primary: false },
      ];
    }

    if (appointment.status === "confirmed") {
      return [
        { label: "Mark completed", action: () => onStatusChange(appointment.id, "completed"), primary: true, icon: CheckCheck },
        { label: "Cancel", action: () => onCancelRequest(appointment), primary: false },
      ];
    }

    return [];
  })();

  const handleDelete = () => {
    onDelete(appointment.id);
  };

  return (
    <>
      <div
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-40 bg-[#14284B]/35 transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      <aside
        aria-label="Appointment details"
        className={[
          "fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-border bg-[#F7F4EE] p-5 transition-transform duration-200 md:p-6",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-[#14284B]">{appointment.fullName}</h2>
            <StatusBadge status={appointment.status} />
          </div>
          <button
            type="button"
            aria-label="Close appointment details"
            onClick={onClose}
            className="rounded-[var(--radius-md)] p-2 text-muted-foreground transition-colors hover:bg-[#F4EFE9] hover:text-[#14284B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EE]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">Submitted {formatDateTime(appointment.createdAt)}</div>

        <div className="mt-6 divide-y divide-border rounded-[var(--radius-md)]">
          <div className="flex flex-col gap-1 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email
            </div>
            <a href={`mailto:${appointment.email}`} className="text-sm text-[#14284B] hover:text-[#0d1f34] underline-offset-4 hover:underline">
              {appointment.email}
            </a>
          </div>

          <div className="flex flex-col gap-1 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              Phone
            </div>
            <a href={`tel:${appointment.phone}`} className="text-sm text-[#14284B] hover:text-[#0d1f34] underline-offset-4 hover:underline">
              {appointment.phone}
            </a>
          </div>

          <div className="flex flex-col gap-1 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Preferred date
            </div>
            <p className="text-sm text-muted-foreground">{formatDate(appointment.preferredDate)}</p>
          </div>

          <div className="flex flex-col gap-1 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
              Service
            </div>
            <p className="text-sm text-muted-foreground">{appointment.service}</p>
          </div>

          <div className="py-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
              Message
            </div>
            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{appointment.message}</p>
          </div>
        </div>

        {statusActions.length > 0 ? (
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {statusActions.map(({ label, action, primary, icon: Icon }) => (
              <Button
                key={label}
                type="button"
                variant={primary ? "default" : "secondary"}
                className={primary ? "bg-[#B75E3B] text-white hover:bg-[#A55333] disabled:bg-[#D8A18B]" : ""}
                onClick={action}
              >
                {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                {label}
              </Button>
            ))}
          </div>
        ) : null}

        <div className="mt-6 border-t border-border pt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 transition-colors hover:text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EE]"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </aside>
    </>
  );
}
