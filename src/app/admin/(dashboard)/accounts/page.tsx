"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, ShieldX, Trash2, UserPlus } from "lucide-react";

import { Pagination, PAGE_SIZE } from "@/components/admin/Pagination";
import { Button } from "@/components/ui/button";
import {
  createAccount,
  deleteAccount,
  listAccounts,
  resetPassword,
  toggleAccountStatus,
  updateAccount,
  type SafeAdminAccount,
} from "@/lib/data/accounts";

const ADMIN_EMAIL_KEY = "adminEmail";

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<SafeAdminAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [formError, setFormError] = useState("");

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = listAccounts();
      setAccounts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load admin accounts right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  const filteredAccounts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return accounts.filter((account) => {
      const haystack = `${account.name} ${account.email}`.toLowerCase();
      return !normalized || haystack.includes(normalized);
    });
  }, [accounts, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / PAGE_SIZE));
  const paginatedAccounts = filteredAccounts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const adminEmail = typeof window !== "undefined" ? (window.localStorage.getItem(ADMIN_EMAIL_KEY) ?? "admin@brightsmile.test") : "admin@brightsmile.test";

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ name: "", email: "", password: "" });
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (account: SafeAdminAccount) => {
    setEditingId(account.id);
    setForm({ name: account.name, email: account.email, password: "" });
    setFormError("");
    setModalOpen(true);
  };

  const handleSubmit = () => {
    try {
      if (editingId) {
        updateAccount(editingId, { name: form.name, email: form.email });
      } else {
        createAccount({ name: form.name, email: form.email, password: form.password });
      }

      setModalOpen(false);
      setForm({ name: "", email: "", password: "" });
      setFormError("");
      setPage(1);
      void loadAccounts();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to save the admin account.");
    }
  };

  const handleResetPassword = (account: SafeAdminAccount) => {
    const nextPassword = window.prompt(`Set a new password for ${account.name} (minimum 8 characters):`);
    if (!nextPassword) {
      return;
    }

    try {
      resetPassword(account.id, nextPassword);
      void loadAccounts();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to reset the password.");
    }
  };

  const handleToggleStatus = (account: SafeAdminAccount) => {
    const action = account.status === "active" ? "disable" : "reactivate";
    const confirmed = window.confirm(`${action === "disable" ? "Disable" : "Reactivate"} ${account.name}?`);
    if (!confirmed) {
      return;
    }

    try {
      toggleAccountStatus(account.id, adminEmail);
      void loadAccounts();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to update the account status.");
    }
  };

  const handleDelete = (account: SafeAdminAccount) => {
    if (account.email.toLowerCase() === adminEmail.toLowerCase()) {
      window.alert("You cannot delete your own account.");
      return;
    }

    const confirmed = window.confirm(`Delete ${account.name}? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    try {
      deleteAccount(account.id, adminEmail);
      void loadAccounts();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to delete the account.");
    }
  };

  const startIndex = (page - 1) * PAGE_SIZE;

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold text-[#14284B] md:text-3xl">Accounts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage admin access for the BrightSmile portal.</p>
        </div>
        <Button type="button" className="bg-[#14284B] text-white hover:bg-[#1d355e]" onClick={openCreateModal}>
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Add admin
        </Button>
      </div>

      <section className="rounded-[var(--radius-md)] border border-border bg-white p-4 md:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#14284B]">Admin accounts</h2>
            <p className="mt-1 text-sm text-muted-foreground">Manage sign-in access for the BrightSmile admin portal.</p>
          </div>

          <label className="relative block min-w-0 flex-1 sm:max-w-xs">
            <span className="sr-only">Search admin accounts</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => {
                setPage(1);
                setSearchTerm(event.target.value);
              }}
              placeholder="Search name or email"
              className="w-full rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] py-2.5 pl-9 pr-3 text-sm text-[#14284B] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8896B] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            />
          </label>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-[var(--radius-md)] border border-border bg-[#F7F7F7] p-4">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-full rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-lg font-semibold text-[#14284B]">Unable to load admin accounts</p>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <Button type="button" onClick={() => void loadAccounts()} className="mt-4 bg-[#14284B] text-white hover:bg-[#1d355e]">
              Retry
            </Button>
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className="rounded-[var(--radius-md)] border border-dashed border-border bg-[#F9FAFB] p-8 text-center">
            <p className="text-lg font-semibold text-[#14284B]">No admin accounts match your search</p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-[var(--radius-md)] border border-border">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#F6F1E9] text-[#14284B]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Created</th>
                    <th className="px-4 py-3 font-semibold">Last sign-in</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAccounts.map((account) => {
                    const isCurrentUser = account.email.toLowerCase() === adminEmail.toLowerCase();
                    const isDisabled = account.status === "disabled";

                    return (
                      <tr key={account.id} className="border-t border-border bg-white">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 font-medium text-[#14284B]">
                            <span>{account.name}</span>
                            {isCurrentUser ? (
                              <span className="rounded-full border border-[#14284B]/15 bg-[#F3F5F7] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#14284B]">
                                You
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{account.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={[
                              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                              isDisabled ? "border border-red-200 bg-red-50 text-red-700" : "border border-emerald-200 bg-emerald-50 text-emerald-700",
                            ].join(" ")}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                            {isDisabled ? "Disabled" : "Active"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{new Date(account.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {account.lastSignInAt ? new Date(account.lastSignInAt).toLocaleString("en-PH", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Never"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button type="button" size="sm" variant="secondary" onClick={() => openEditModal(account)}>
                              Edit
                            </Button>
                            <Button type="button" size="sm" variant="outline" onClick={() => handleResetPassword(account)}>
                              Reset password
                            </Button>
                            {!isCurrentUser ? (
                              <>
                                <Button type="button" size="sm" variant="outline" onClick={() => handleToggleStatus(account)}>
                                  {isDisabled ? "Reactivate" : "Disable"}
                                </Button>
                                <Button type="button" size="sm" variant="ghost" className="text-red-700 hover:bg-red-50" onClick={() => handleDelete(account)}>
                                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                                </Button>
                              </>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {Math.min(startIndex + 1, filteredAccounts.length)}-{Math.min(startIndex + PAGE_SIZE, filteredAccounts.length)} of {filteredAccounts.length} accounts
              </p>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}
      </section>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14284B]/40 p-4">
          <div className="w-full max-w-md rounded-[var(--radius-md)] border border-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2BB5A8]">Admin</p>
                <h3 className="text-xl font-semibold text-[#14284B]">{editingId ? "Edit admin" : "Add admin"}</h3>
              </div>
              <button
                type="button"
                aria-label="Close admin modal"
                onClick={() => setModalOpen(false)}
                className="rounded-[var(--radius-md)] p-2 text-muted-foreground hover:bg-[#F3F5F7] hover:text-[#14284B]"
              >
                <ShieldX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="admin-name" className="text-sm font-medium text-[#14284B]">Name</label>
                <input
                  id="admin-name"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#14284B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8896B] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="admin-email" className="text-sm font-medium text-[#14284B]">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#14284B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8896B] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                />
              </div>

              {!editingId ? (
                <div className="space-y-2">
                  <label htmlFor="admin-password" className="text-sm font-medium text-[#14284B]">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    className="w-full rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#14284B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8896B] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  />
                </div>
              ) : null}

              {formError ? <div className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</div> : null}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="button" className="bg-[#14284B] text-white hover:bg-[#1d355e]" onClick={handleSubmit}>
                {editingId ? "Save changes" : "Add admin"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
