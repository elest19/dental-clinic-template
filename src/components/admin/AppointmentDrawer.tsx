import { useEffect } from "react";
import { CalendarDays, CheckCheck, Mail, MessageSquareText, Phone, Trash2, X } from "lucide-react";

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
}: {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
  onDelete: (id: string) => void;
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
          "fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-border bg-[#F7F4EE] p-5 shadow-[0_0_80px_rgba(20,40,75,0.18)] transition-transform duration-200 md:p-6",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2BB5A8]">Appointment details</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#14284B]">{appointment.fullName}</h2>
          </div>
          <button
            type="button"
            aria-label="Close appointment details"
            onClick={onClose}
            className="rounded-[var(--radius-md)] p-2 text-muted-foreground transition-colors hover:bg-[#EAF7F6] hover:text-[#14284B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2BB5A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EE]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <StatusBadge status={appointment.status} />
          <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Submitted {formatDateTime(appointment.createdAt)}</span>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-[var(--radius-md)] border border-border bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#14284B]">
              <Mail className="h-4 w-4 text-[#2BB5A8]" aria-hidden="true" />
              Email
            </div>
            <a href={`mailto:${appointment.email}`} className="mt-2 block text-sm text-muted-foreground hover:text-[#14284B]">
              {appointment.email}
            </a>
          </div>

          <div className="rounded-[var(--radius-md)] border border-border bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#14284B]">
              <Phone className="h-4 w-4 text-[#2BB5A8]" aria-hidden="true" />
              Phone
            </div>
            <a href={`tel:${appointment.phone}`} className="mt-2 block text-sm text-muted-foreground hover:text-[#14284B]">
              {appointment.phone}
            </a>
          </div>

          <div className="rounded-[var(--radius-md)] border border-border bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#14284B]">
              <CalendarDays className="h-4 w-4 text-[#2BB5A8]" aria-hidden="true" />
              Preferred date
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{formatDate(appointment.preferredDate)}</p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-border bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#14284B]">
              <MessageSquareText className="h-4 w-4 text-[#2BB5A8]" aria-hidden="true" />
              Service
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{appointment.service}</p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-border bg-white p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#14284B]">
              <MessageSquareText className="h-4 w-4 text-[#2BB5A8]" aria-hidden="true" />
              Message
            </div>
            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{appointment.message}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Button
            type="button"
            className="bg-[#2BB5A8] text-white hover:bg-[#26A69A]"
            onClick={() => onStatusChange(appointment.id, "confirmed")}
          >
            <CheckCheck className="h-4 w-4" aria-hidden="true" />
            Confirm
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onStatusChange(appointment.id, "completed")}
          >
            Mark completed
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onStatusChange(appointment.id, "cancelled")}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
            onClick={() => onDelete(appointment.id)}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </Button>
        </div>
      </aside>
    </>
  );
}
