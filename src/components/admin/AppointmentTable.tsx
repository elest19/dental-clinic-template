import { CalendarDays, Eye, Phone, Search } from "lucide-react";

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

export function AppointmentTable({
  appointments,
  selectedId,
  onSelect,
  onStatusAction,
  busyAction,
}: {
  appointments: Appointment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onStatusAction: (id: string, status: AppointmentStatus) => void;
  busyAction: { id: string; status: AppointmentStatus } | null;
}) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-[var(--radius-md)] border border-dashed border-border bg-[#F9FAFB] p-8 text-center text-muted-foreground">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF7F6] text-[#14284B]">
          <Search className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[#14284B]">No appointment requests match your filters</h3>
        <p className="mt-2 text-sm">Try another search term or clear the status filter.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-white">
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left">
          <thead className="bg-[#F6F1E9] text-sm font-semibold text-[#14284B]">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Preferred date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const isSelected = selectedId === appointment.id;
              const isBusy = busyAction?.id === appointment.id;

              return (
                <tr
                  key={appointment.id}
                  tabIndex={0}
                  onClick={() => onSelect(appointment.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(appointment.id);
                    }
                  }}
                  aria-label={`Open details for ${appointment.fullName}`}
                  className={[
                    "cursor-pointer border-t border-border text-sm transition-colors",
                    isSelected ? "bg-[#F4F8F8]" : "bg-white hover:bg-[#F8FBFB]",
                  ].join(" ")}
                >
                  <td className="px-4 py-4 align-top">
                    <div className="font-medium text-[#14284B]">{appointment.fullName}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{appointment.email}</div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" aria-hidden="true" />
                      {appointment.phone}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-muted-foreground">{appointment.service}</td>
                  <td className="px-4 py-4 align-top text-muted-foreground">{formatDate(appointment.preferredDate)}</td>
                  <td className="px-4 py-4 align-top">
                    <StatusBadge status={appointment.status} />
                  </td>
                  <td className="px-4 py-4 align-top text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDateTime(appointment.createdAt)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right align-top">
                    {appointment.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          size="sm"
                          className="bg-[#14284B] text-white hover:bg-[#1d355e]"
                          onClick={(event) => {
                            event.stopPropagation();
                            onStatusAction(appointment.id, "confirmed");
                          }}
                          disabled={isBusy}
                        >
                          {isBusy && busyAction?.status === "confirmed" ? "Confirming..." : "Confirm"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={(event) => {
                            event.stopPropagation();
                            const shouldCancel = window.confirm(`Cancel the appointment for ${appointment.fullName}?`);
                            if (shouldCancel) {
                              onStatusAction(appointment.id, "cancelled");
                            }
                          }}
                          disabled={isBusy}
                        >
                          {isBusy && busyAction?.status === "cancelled" ? "Cancelling..." : "Cancel"}
                        </Button>
                      </div>
                    ) : appointment.status === "confirmed" ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={(event) => {
                          event.stopPropagation();
                          onStatusAction(appointment.id, "completed");
                        }}
                        disabled={isBusy}
                      >
                        {isBusy && busyAction?.status === "completed" ? "Updating..." : "Mark completed"}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-[#14284B] hover:bg-[#F3F6F8]"
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelect(appointment.id);
                        }}
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        View
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 md:hidden">
        {appointments.map((appointment) => {
          const isSelected = selectedId === appointment.id;
          const isBusy = busyAction?.id === appointment.id;

          return (
            <div
              key={appointment.id}
              className={[
                "rounded-[var(--radius-md)] border p-4 text-left transition-colors",
                isSelected ? "border-[#14284B] bg-[#F4F8F8]" : "border-border bg-white",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <button type="button" onClick={() => onSelect(appointment.id)} className="text-left">
                  <p className="font-semibold text-[#14284B]">{appointment.fullName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{appointment.service}</p>
                </button>
                <StatusBadge status={appointment.status} />
              </div>

              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p>{appointment.email}</p>
                <p>{appointment.phone}</p>
                <p>{formatDate(appointment.preferredDate)}</p>
                <p>{formatDateTime(appointment.createdAt)}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {appointment.status === "pending" ? (
                  <>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-[#14284B] text-white hover:bg-[#1d355e]"
                      onClick={() => onStatusAction(appointment.id, "confirmed")}
                      disabled={isBusy}
                    >
                      {isBusy && busyAction?.status === "confirmed" ? "Confirming..." : "Confirm"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const shouldCancel = window.confirm(`Cancel the appointment for ${appointment.fullName}?`);
                        if (shouldCancel) {
                          onStatusAction(appointment.id, "cancelled");
                        }
                      }}
                      disabled={isBusy}
                    >
                      {isBusy && busyAction?.status === "cancelled" ? "Cancelling..." : "Cancel"}
                    </Button>
                  </>
                ) : appointment.status === "confirmed" ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => onStatusAction(appointment.id, "completed")}
                    disabled={isBusy}
                  >
                    {isBusy && busyAction?.status === "completed" ? "Updating..." : "Mark completed"}
                  </Button>
                ) : (
                  <Button type="button" size="sm" variant="ghost" onClick={() => onSelect(appointment.id)}>
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    View
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
