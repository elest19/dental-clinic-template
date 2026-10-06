import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_NAME,
  DEMO_ADMIN_PASSWORD,
  authenticateAccount,
  createAccount,
  deleteAccount,
  getAccountByEmail,
  listAccounts,
  resetAccounts,
  resetPassword,
  toggleAccountStatus,
  updateAccount,
  type AdminAccount,
  type AdminAccountStatus,
  type SafeAdminAccount,
} from "@/lib/data/accounts";

export type { AdminAccount, AdminAccountStatus, SafeAdminAccount };
export { DEMO_ADMIN_EMAIL, DEMO_ADMIN_NAME, DEMO_ADMIN_PASSWORD };

export const readAccounts = listAccounts;
export const writeAccounts = resetAccounts;
export const listAdminAccounts = listAccounts;
export const createAdminAccount = createAccount;
export const updateAdminAccount = updateAccount;
export const resetAdminPassword = resetPassword;
export const toggleAdminStatus = toggleAccountStatus;
export const deleteAdminAccount = deleteAccount;
export const authenticateAdmin = authenticateAccount;
export const getCurrentAdminAccount = getAccountByEmail;
export const getAdminDisplayLabel = (email: string) => getAccountByEmail(email)?.name ?? DEMO_ADMIN_NAME;
