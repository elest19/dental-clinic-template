// DEMO ONLY: plaintext mock credentials. Replace with a real database and hashed passwords before production.

import { services } from "@/content/services";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  service: string;
  message: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type AppointmentInput = {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  service: string;
  message: string;
  status?: AppointmentStatus;
};

type GlobalWithAppointments = typeof globalThis & {
  __brightsmileAppointments?: Appointment[];
};

function addDays(date: Date, days: number) {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + days);
  return clone;
}

function formatInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export const DEMO_TODAY = new Date("2026-10-07T12:00:00.000Z");

function buildSeedAppointments(): Appointment[] {
  const serviceNames = services.map((service) => service.name);

  const seed: Omit<Appointment, "id">[] = [
    {
      fullName: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "0917 123 4567",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 2)),
      service: serviceNames[1] ?? "Dental Cleaning",
      message: "Would like to book a cleaning and a quick check on the chipped front tooth.",
      status: "pending",
      createdAt: new Date("2026-10-06T09:00:00.000Z").toISOString(),
    },
    {
      fullName: "Renzo Dela Cruz",
      email: "renzo.dc@yahoo.com",
      phone: "0922 234 5678",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 4)),
      service: serviceNames[2] ?? "Teeth Whitening",
      message: "Interested in whitening before my wedding next month. Please let me know availability.",
      status: "confirmed",
      createdAt: new Date("2026-10-05T13:30:00.000Z").toISOString(),
    },
    {
      fullName: "Andrea Lim",
      email: "andrea.lim@example.com",
      phone: "0932 345 6789",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 1)),
      service: serviceNames[0] ?? "General Dentistry",
      message: "My son has a toothache and is having trouble chewing. Could you see him this week?",
      status: "pending",
      createdAt: new Date("2026-10-06T16:00:00.000Z").toISOString(),
    },
    {
      fullName: "Clifford Ramos",
      email: "cliff.ramos@gmail.com",
      phone: "0947 456 7890",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 6)),
      service: serviceNames[5] ?? "Dental Implants",
      message: "Looking for a consultation to discuss implant options after losing a molar.",
      status: "completed",
      createdAt: new Date("2026-10-02T09:15:00.000Z").toISOString(),
    },
    {
      fullName: "Lourdes Villanueva",
      email: "lourdes.villanueva@mail.com",
      phone: "0917 987 6543",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 3)),
      service: serviceNames[3] ?? "Orthodontics (Braces)",
      message: "My daughter is interested in braces consult; we want to know treatment timing and cost.",
      status: "confirmed",
      createdAt: new Date("2026-10-05T10:45:00.000Z").toISOString(),
    },
    {
      fullName: "Jayson Tan",
      email: "jayson.tan@outlook.com",
      phone: "0998 765 4321",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 8)),
      service: serviceNames[4] ?? "Crowns & Bridges",
      message: "I chipped a tooth while eating and need a same-week consult for a crown assessment.",
      status: "pending",
      createdAt: new Date("2026-10-04T08:30:00.000Z").toISOString(),
    },
    {
      fullName: "Nina Bautista",
      email: "nina.bautista@example.com",
      phone: "0905 112 3344",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, -1)),
      service: serviceNames[0] ?? "General Dentistry",
      message: "Need a review for recurring sensitivity on the lower left teeth.",
      status: "completed",
      createdAt: new Date("2026-10-05T11:10:00.000Z").toISOString(),
    },
    {
      fullName: "Marco Perez",
      email: "marco.perez@gmail.com",
      phone: "0928 556 7788",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 9)),
      service: serviceNames[6] ?? "Dental Cleaning",
      message: "I am due for a cleaning and would like to know if there are any whitening add-ons available.",
      status: "cancelled",
      createdAt: new Date("2026-10-01T14:25:00.000Z").toISOString(),
    },
    {
      fullName: "Sofia Garcia",
      email: "sofia.garcia@icloud.com",
      phone: "0955 271 6901",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 5)),
      service: serviceNames[11] ?? "Emergency Dentistry",
      message: "Painful swelling near the gum after a dental procedure. Need urgent advice.",
      status: "confirmed",
      createdAt: new Date("2026-10-06T15:15:00.000Z").toISOString(),
    },
    {
      fullName: "Paolo Mendoza",
      email: "paolo.mendoza@proton.me",
      phone: "0937 810 2314",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 10)),
      service: serviceNames[8] ?? "Cosmetic Dentistry",
      message: "Seeking a consultation for veneer options and smile makeover discussion.",
      status: "pending",
      createdAt: new Date("2026-10-04T12:20:00.000Z").toISOString(),
    },
    {
      fullName: "Carmela Flores",
      email: "carmela.flores@gmail.com",
      phone: "0961 884 1200",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 12)),
      service: serviceNames[9] ?? "Pediatric Dentistry",
      message: "Booking for my 8-year-old daughter who needs a routine check and some sealants.",
      status: "confirmed",
      createdAt: new Date("2026-10-03T08:40:00.000Z").toISOString(),
    },
    {
      fullName: "Rafael Reyes",
      email: "rafael.reyes@example.net",
      phone: "0917 539 2271",
      preferredDate: formatInputDate(addDays(DEMO_TODAY, 7)),
      service: serviceNames[7] ?? "Root Canal Therapy",
      message: "I have a throbbing toothache and need to understand my root canal treatment options.",
      status: "cancelled",
      createdAt: new Date("2026-09-30T10:05:00.000Z").toISOString(),
    },
  ];

  return seed.map((item) => ({
    ...item,
    id: `seed-${Math.random().toString(36).slice(2, 10)}`,
  }));
}

function getAppointmentStore(): Appointment[] {
  const globalStore = globalThis as GlobalWithAppointments;

  if (!globalStore.__brightsmileAppointments) {
    globalStore.__brightsmileAppointments = buildSeedAppointments();
  }

  return globalStore.__brightsmileAppointments;
}

export async function listAppointments(): Promise<Appointment[]> {
  return [...getAppointmentStore()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function createAppointment(data: AppointmentInput): Promise<Appointment> {
  const appointments = getAppointmentStore();
  const appointment: Appointment = {
    id: `appt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    fullName: data.fullName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    preferredDate: data.preferredDate,
    service: data.service.trim(),
    message: data.message.trim(),
    status: data.status ?? "pending",
    createdAt: new Date().toISOString(),
  };

  appointments.unshift(appointment);
  return appointment;
}

export async function getAppointment(id: string): Promise<Appointment | undefined> {
  return getAppointmentStore().find((appointment) => appointment.id === id);
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
): Promise<Appointment | undefined> {
  const appointments = getAppointmentStore();
  const index = appointments.findIndex((appointment) => appointment.id === id);

  if (index === -1) {
    return undefined;
  }

  const updated = { ...appointments[index], status };
  appointments[index] = updated;
  return updated;
}

export async function deleteAppointment(id: string): Promise<Appointment | undefined> {
  const appointments = getAppointmentStore();
  const match = appointments.find((appointment) => appointment.id === id);

  if (!match) {
    return undefined;
  }

  const nextAppointments = appointments.filter((appointment) => appointment.id !== id);
  (globalThis as GlobalWithAppointments).__brightsmileAppointments = nextAppointments;
  return match;
}

export async function resetAppointments() {
  (globalThis as GlobalWithAppointments).__brightsmileAppointments = buildSeedAppointments();
}
