// DEMO ONLY: plaintext mock credentials. Replace with a real database and hashed passwords before production.

export type AdminAccountStatus = "active" | "disabled";

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  status: AdminAccountStatus;
  createdAt: string;
  lastSignInAt: string | null;
};

export type SafeAdminAccount = Omit<AdminAccount, "password">;

type GlobalWithAccounts = typeof globalThis & {
  __brightsmileAccounts?: AdminAccount[];
};

export const DEMO_ADMIN_EMAIL = "admin@brightsmile.test";
export const DEMO_ADMIN_NAME = "BrightSmile Admin";
export const DEMO_ADMIN_PASSWORD = "admin123";

function sanitizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildSeedAccounts(): AdminAccount[] {
  return [
    {
      id: "admin-demo",
      name: DEMO_ADMIN_NAME,
      email: DEMO_ADMIN_EMAIL,
      password: DEMO_ADMIN_PASSWORD,
      status: "active",
      createdAt: new Date().toISOString(),
      lastSignInAt: null,
    },
  ];
}

function getAccountStore(): AdminAccount[] {
  const globalStore = globalThis as GlobalWithAccounts;

  if (!globalStore.__brightsmileAccounts) {
    globalStore.__brightsmileAccounts = buildSeedAccounts();
  }

  return globalStore.__brightsmileAccounts;
}

function toSafeAccount(account: AdminAccount): SafeAdminAccount {
  const { password: _password, ...safe } = account;
  return safe;
}

export function listAccounts(): SafeAdminAccount[] {
  return getAccountStore()
    .map(toSafeAccount)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getAccountByEmail(email: string) {
  const normalized = normalizeEmail(email);
  return getAccountStore().find((account) => account.email === normalized && account.status === "active") ?? null;
}

export function createAccount(input: { name: string; email: string; password: string }) {
  const name = sanitizeName(input.name);
  const email = normalizeEmail(input.email);

  if (!name || name.length < 2) {
    throw new Error("Name must be at least 2 characters long.");
  }

  if (!isValidEmail(email)) {
    throw new Error("Enter a valid email address.");
  }

  if (input.password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const accounts = getAccountStore();
  if (accounts.some((account) => account.email === email)) {
    throw new Error("An account with this email already exists.");
  }

  const created: AdminAccount = {
    id: `admin-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    password: input.password,
    status: "active",
    createdAt: new Date().toISOString(),
    lastSignInAt: null,
  };

  accounts.unshift(created);
  return toSafeAccount(created);
}

export function updateAccount(id: string, updates: { name?: string; email?: string }) {
  const accounts = getAccountStore();
  const index = accounts.findIndex((account) => account.id === id);

  if (index === -1) {
    return null;
  }

  const current = accounts[index];
  const nextName = updates.name ? sanitizeName(updates.name) : current.name;
  const nextEmail = updates.email ? normalizeEmail(updates.email) : current.email;

  if (!nextName || nextName.length < 2) {
    throw new Error("Name must be at least 2 characters long.");
  }

  if (!isValidEmail(nextEmail)) {
    throw new Error("Enter a valid email address.");
  }

  if (accounts.some((account) => account.id !== id && account.email === nextEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const updated = { ...current, name: nextName, email: nextEmail };
  accounts[index] = updated;
  return toSafeAccount(updated);
}

export function resetPassword(id: string, password: string) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const accounts = getAccountStore();
  const index = accounts.findIndex((account) => account.id === id);

  if (index === -1) {
    return null;
  }

  const updated: AdminAccount = { ...accounts[index], password };
  accounts[index] = updated;
  return toSafeAccount(updated);
}

export function toggleAccountStatus(id: string, currentUserEmail?: string) {
  const accounts = getAccountStore();
  const account = accounts.find((item) => item.id === id);

  if (!account) {
    return null;
  }

  if (currentUserEmail && normalizeEmail(account.email) === normalizeEmail(currentUserEmail)) {
    throw new Error("You cannot disable or re-enable your own account.");
  }

  const activeAccounts = accounts.filter((item) => item.id !== id && item.status === "active");
  if (account.status === "active" && activeAccounts.length === 0) {
    throw new Error("The last active admin account cannot be disabled.");
  }

  const updated: AdminAccount = {
    ...account,
    status: account.status === "active" ? "disabled" : "active",
  };

  const nextAccounts = accounts.map((item) => (item.id === id ? updated : item));
  (globalThis as GlobalWithAccounts).__brightsmileAccounts = nextAccounts;
  return toSafeAccount(updated);
}

export function deleteAccount(id: string, currentUserEmail?: string) {
  const accounts = getAccountStore();
  const target = accounts.find((account) => account.id === id);

  if (!target) {
    return null;
  }

  if (currentUserEmail && normalizeEmail(target.email) === normalizeEmail(currentUserEmail)) {
    throw new Error("You cannot delete your own account.");
  }

  const remainingActive = accounts.filter((account) => account.id !== id && account.status === "active");
  if (target.status === "active" && remainingActive.length === 0) {
    throw new Error("The last active admin account cannot be deleted.");
  }

  const nextAccounts = accounts.filter((account) => account.id !== id);
  (globalThis as GlobalWithAccounts).__brightsmileAccounts = nextAccounts;
  return toSafeAccount(target);
}

export function authenticateAccount(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const account = getAccountStore().find(
    (item) => item.email === normalizedEmail && item.status === "active",
  );

  if (!account || account.password !== password) {
    return null;
  }

  const nextAccounts = getAccountStore().map((item) =>
    item.id === account.id ? { ...item, lastSignInAt: new Date().toISOString() } : item,
  );
  (globalThis as GlobalWithAccounts).__brightsmileAccounts = nextAccounts;

  const signedIn = nextAccounts.find((item) => item.id === account.id);
  return signedIn ? toSafeAccount(signedIn) : null;
}

export function resetAccounts() {
  (globalThis as GlobalWithAccounts).__brightsmileAccounts = buildSeedAccounts();
}
