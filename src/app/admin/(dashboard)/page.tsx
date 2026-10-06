"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, CircleX, ClipboardList, Clock3, Filter, Menu, Search, ShieldCheck } from "lucide-react";

import { AppointmentDrawer } from "@/components/admin/AppointmentDrawer";
import { AppointmentTable } from "@/components/admin/AppointmentTable";
import { ConfirmDialog } from "@/components/admin/Modal";
import { Pagination, PAGE_SIZE } from "@/components/admin/Pagination";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import {
  DEMO_TODAY,
  deleteAppointment,
  listAppointments,
  type Appointment,
  type AppointmentStatus,
  updateAppointmentStatus,
} from "@/lib/data/appointments";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | AppointmentStatus>("all");
  const [sortField, setSortField] = useState<"preferredDate" | "createdAt">("preferredDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<{ id: string; status: AppointmentStatus } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    kind: "cancel" | "delete";
    appointment: Appointment;
  } | null>(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load appointment requests right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredAppointments = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const matches = appointments.filter((appointment) => {
      const haystack = [appointment.fullName, appointment.email, appointment.phone].join(" ").toLowerCase();
      const searchMatch = !normalized || haystack.includes(normalized);
      const statusMatch = statusFilter === "all" || appointment.status === statusFilter;
      return searchMatch && statusMatch;
    });

    matches.sort((a, b) => {
      const left = new Date(a[sortField]).getTime();
      const right = new Date(b[sortField]).getTime();
      return sortDirection === "asc" ? left - right : right - left;
    });

    return matches;
  }, [appointments, searchTerm, sortDirection, sortField, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / PAGE_SIZE));
  const paginatedAppointments = useMemo(
    () => filteredAppointments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredAppointments, page],
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const stats = useMemo(() => {
    const pending = appointments.filter((appointment) => appointment.status === "pending").length;
    const confirmedThisWeek = appointments.filter((appointment) => {
      const date = new Date(appointment.createdAt);
      const diff = DEMO_TODAY.getTime() - date.getTime();
      return appointment.status === "confirmed" && diff >= 0 && diff <= 1000 * 60 * 60 * 24 * 7;
    }).length;
    const cancelled = appointments.filter((appointment) => appointment.status === "cancelled").length;

    return {
      total: appointments.length,
      pending,
      confirmedThisWeek,
      cancelled,
    };
  }, [appointments]);

  const selectedAppointment = appointments.find((appointment) => appointment.id === selectedId) ?? null;

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    const updated = await updateAppointmentStatus(id, status);
    if (!updated) {
      return;
    }

    setAppointments((previous) => previous.map((appointment) => (appointment.id === id ? updated : appointment)));
    setSelectedId(id);
    const label = status === "confirmed" ? "confirmed" : status === "completed" ? "completed" : "cancelled";
    setToast(`Appointment ${label}`);
  };

  const handleInlineStatus = async (id: string, status: AppointmentStatus) => {
    setBusyAction({ id, status });
    await handleStatusChange(id, status);
    setBusyAction(null);
  };

  const handleDelete = async (id: string) => {
    const deleted = await deleteAppointment(id);
    if (!deleted) {
      return;
    }

    setAppointments((previous) => previous.filter((appointment) => appointment.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
    setToast("Appointment deleted");
  };

  const openCancelDialog = (appointment: Appointment) => {
    setConfirmDialog({ kind: "cancel", appointment });
  };

  const openDeleteDialog = (appointment: Appointment) => {
    setConfirmDialog({ kind: "delete", appointment });
  };

  const handleConfirmDialogAction = async () => {
    if (!confirmDialog) {
      return;
    }

    if (confirmDialog.kind === "cancel") {
      await handleStatusChange(confirmDialog.appointment.id, "cancelled");
    } else {
      await handleDelete(confirmDialog.appointment.id);
    }

    setConfirmDialog(null);
  };

  return (
    <>
      <header className="mb-6 border-b border-border pb-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-[#14284B] md:text-3xl">Appointments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review incoming requests and keep the clinic schedule moving.</p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total requests" value={stats.total} icon={<CalendarDays className="h-4 w-4" aria-hidden="true" />} />
        <StatCard label="Pending" value={stats.pending} icon={<Clock3 className="h-4 w-4" aria-hidden="true" />} />
        <StatCard label="Confirmed this week" value={stats.confirmedThisWeek} icon={<CheckCircle2 className="h-4 w-4" aria-hidden="true" />} />
        <StatCard label="Cancelled" value={stats.cancelled} icon={<CircleX className="h-4 w-4" aria-hidden="true" />} />
      </section>

      <section className="rounded-[var(--radius-md)] border border-border bg-white p-4 md:p-5">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#14284B]">Appointment requests</h2>
          </div>
          <div className="flex w-full flex-col gap-2 md:w-auto">
            <label className="relative block w-full min-w-0 sm:flex-1">
              <span className="sr-only">Search appointments</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setPage(1);
                  setSearchTerm(event.target.value);
                }}
                placeholder="Search name, email or phone"
                className="w-full min-w-0 flex-1 rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] py-2.5 pl-9 pr-3 text-sm text-[#14284B] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              />
            </label>

            <div className="flex gap-2">
              <select
                aria-label="Filter appointments by status"
                value={statusFilter}
                onChange={(event) => {
                  setPage(1);
                  setStatusFilter(event.target.value as "all" | AppointmentStatus);
                }}
                className="min-w-0 flex-1 rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#14284B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                aria-label="Sort appointments"
                value={`${sortField}-${sortDirection}`}
                onChange={(event) => {
                  const [field, direction] = event.target.value.split("-") as ["preferredDate" | "createdAt", "asc" | "desc"];
                  setPage(1);
                  setSortField(field);
                  setSortDirection(direction);
                }}
                className="min-w-0 flex-1 rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#14284B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <option value="preferredDate-asc">Date: soonest</option>
                <option value="preferredDate-desc">Date: latest</option>
                <option value="createdAt-desc">Newest requests</option>
                <option value="createdAt-asc">Oldest requests</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-[var(--radius-md)] border border-border bg-[#F7F7F7] p-4">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-full rounded bg-slate-200" />
                <div className="mt-2 h-3 w-4/5 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-lg font-semibold text-[#14284B]">Unable to load appointment requests</p>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <Button type="button" onClick={() => void loadAppointments()} className="mt-4 bg-[#B75E3B] text-white hover:bg-[#A55333]">
              Retry
            </Button>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="rounded-[var(--radius-md)] border border-dashed border-border bg-[#F9FAFB] p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F7E8E1] text-[#14284B]">
              <Search className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#14284B]">No appointment requests match your filters</h3>
            <p className="mt-2 text-sm text-muted-foreground">Adjust your search or filter settings to see more results.</p>
          </div>
        ) : (
          <>
            <AppointmentTable
              appointments={paginatedAppointments}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
              onStatusAction={(id, status) => void handleInlineStatus(id, status)}
              onCancelRequest={openCancelDialog}
              busyAction={busyAction}
            />

            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, filteredAppointments.length)}-{Math.min(page * PAGE_SIZE, filteredAppointments.length)} of {filteredAppointments.length} requests
              </p>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}
      </section>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-[var(--radius-md)] bg-[#14284B] px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      ) : null}

      <AppointmentDrawer
        appointment={selectedAppointment}
        open={Boolean(selectedAppointment)}
        onClose={() => setSelectedId(null)}
        onStatusChange={handleStatusChange}
        onDelete={(id) => {
          const appointment = appointments.find((item) => item.id === id);
          if (appointment) {
            openDeleteDialog(appointment);
          }
        }}
        onCancelRequest={openCancelDialog}
      />

      {confirmDialog ? (
        <ConfirmDialog
          open={Boolean(confirmDialog)}
          onClose={() => setConfirmDialog(null)}
          onConfirm={() => {
            void handleConfirmDialogAction();
          }}
          title={
            confirmDialog.kind === "cancel"
              ? `Cancel ${confirmDialog.appointment.fullName}'s request?`
              : `Delete ${confirmDialog.appointment.fullName}'s request?`
          }
          description={
            confirmDialog.kind === "cancel"
              ? "This will mark the appointment as cancelled and keep it in the request list for record purposes."
              : "This action permanently removes the request from the clinic queue and cannot be undone."
          }
          confirmLabel={confirmDialog.kind === "cancel" ? "Cancel appointment" : "Delete request"}
          destructive={confirmDialog.kind === "delete"}
        />
      ) : null}
    </>
  );
}
