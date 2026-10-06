# BrightSmile Dental Clinic

This project includes a mock-only admin portal for managing appointment requests and admin accounts.

## Mock data notice

- Account and appointment data are stored in memory only.
- The mock store lives on `globalThis` so route handlers and server components share one instance during local development.
- The in-memory data resets whenever the Next.js server restarts.
- Before production, replace this mock layer with a real database and secure authentication flow.
