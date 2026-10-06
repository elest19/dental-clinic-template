"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authenticateAccount, DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD } from "@/lib/data/accounts";

const ADMIN_FLAG_KEY = "isAdmin";
const ADMIN_EMAIL_KEY = "adminEmail";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const account = authenticateAccount(email, password);
    if (!account) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    localStorage.setItem(ADMIN_FLAG_KEY, "true");
    localStorage.setItem(ADMIN_EMAIL_KEY, account.email);
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F1E9] px-4 py-12">
      <div className="w-full max-w-md rounded-[var(--radius-md)] border border-border bg-white p-6 md:p-8">
        <div className="flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-[#14284B] text-xl font-semibold text-white">
            B
          </div>
        </div>

        <div className="mt-5 text-center">
          <h1 className="mt-2 text-3xl font-semibold text-[#14284B]">Admin sign in</h1>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#14284B]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#14284B] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8896B] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[#14284B]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full rounded-[var(--radius-md)] border border-border bg-[#F9FAFB] px-3 py-2.5 pr-10 text-sm text-[#14284B] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8896B] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-[#14284B]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {error ? (
            <div className="flex items-start gap-2 rounded-[var(--radius-md)] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          ) : null}

          <Button type="submit" className="w-full bg-[#B75E3B] text-white hover:bg-[#A55333] disabled:bg-[#D8A18B] disabled:text-white/90">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Sign in
          </Button>
        </form>

        {demoMode ? (
          <div className="mt-6 rounded-[var(--radius-md)] border border-dashed border-slate-300 bg-[#F3F4F6] p-4 text-sm text-[#14284B]">
            <p className="font-medium">Demo account</p>
            <p className="mt-2">Email: {DEMO_ADMIN_EMAIL}</p>
            <p>Password: {DEMO_ADMIN_PASSWORD}</p>
          </div>
        ) : null}

        <div className="mt-5 text-center text-sm text-muted-foreground">
          <Link href="/" className="font-medium text-[#14284B] underline-offset-4 hover:underline">
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
