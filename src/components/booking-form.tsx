"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CheckCircle2, Mail, Phone, UserRound } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LegalModal } from "@/components/legal-modal";
import { ServiceSelect } from "@/components/ui/service-select";
import { Textarea } from "@/components/ui/textarea";
import { bookingForm } from "@/content/booking";
import { createAppointment } from "@/lib/appointments";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  name: z.string().min(2, bookingForm.errors.name),
  email: z.string().email(bookingForm.errors.email),
  phone: z.string().min(7, bookingForm.errors.phone),
  service: z.string().min(1, bookingForm.errors.service),
  date: z.string().min(1, bookingForm.errors.date),
  message: z.string().min(10, bookingForm.errors.message),
  consent: z.boolean().refine((value) => value, bookingForm.errors.consent),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

/**
 * Fields sit on the navy booking section: a lighter surface, the shared
 * radius token, and a focus ring whose offset matches the section background.
 */
const fieldClassName =
  "rounded-[var(--radius-md)] border border-foreground/15 bg-surface text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground";

const errorClassName = "border-red-500 focus-visible:ring-red-400";

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-background">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function BookingForm() {
  const [success, setSuccess] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const closePrivacy = useCallback(() => setPrivacyOpen(false), []);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    await createAppointment({
      fullName: values.name,
      email: values.email,
      phone: values.phone,
      preferredDate: values.date,
      service: values.service,
      message: values.message,
      status: "pending",
    });

    reset();
    setSuccess(true);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        if (success) setSuccess(false);
      }}
      className="mt-8 space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={bookingForm.labels.name} error={errors.name?.message}>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(fieldClassName, "pl-10", errors.name && errorClassName)}
              placeholder={bookingForm.placeholders.name}
              {...register("name")}
            />
          </div>
        </Field>
        <Field id="email" label={bookingForm.labels.email} error={errors.email?.message}>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(fieldClassName, "pl-10", errors.email && errorClassName)}
              placeholder={bookingForm.placeholders.email}
              {...register("email")}
            />
          </div>
        </Field>

        <Field id="phone" label={bookingForm.labels.phone} error={errors.phone?.message}>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={cn(fieldClassName, "pl-10", errors.phone && errorClassName)}
              placeholder={bookingForm.placeholders.phone}
              {...register("phone")}
            />
          </div>
        </Field>

        <Field id="date" label={bookingForm.labels.date} error={errors.date?.message}>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="date"
              type="date"
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "date-error" : undefined}
              className={cn(fieldClassName, "pl-10", errors.date && errorClassName)}
              {...register("date")}
            />
          </div>
        </Field>

        <Field
          id="service"
          label={bookingForm.labels.service}
          error={errors.service?.message}
          className="sm:col-span-2"
        >
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <ServiceSelect
                id="service"
                value={field.value}
                onChange={field.onChange}
                placeholder={bookingForm.placeholders.service}
                invalid={Boolean(errors.service)}
                describedBy={errors.service ? "service-error" : undefined}
              />
            )}
          />
        </Field>

        <Field
          id="message"
          label={bookingForm.labels.message}
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(fieldClassName, errors.message && errorClassName)}
            placeholder={bookingForm.placeholders.message}
            {...register("message")}
          />
        </Field>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0 accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
              errors.consent && "focus-visible:ring-red-400",
            )}
            {...register("consent")}
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-background">
            {bookingForm.consent.label}{" "}
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setPrivacyOpen(true);
              }}
              className="rounded-sm text-accent underline underline-offset-4 transition-colors hover:cursor-pointer hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              {bookingForm.consent.privacyLabel}
            </button>
            .
          </label>
        </div>
        {errors.consent ? (
          <p id="consent-error" className="pl-7 text-sm text-red-300">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          className="bg-accent text-foreground hover:bg-accent/90 focus-visible:ring-offset-foreground"
        >
          {bookingForm.submitLabel}
        </Button>

        {success ? (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm leading-relaxed text-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{bookingForm.successMessage}</span>
          </div>
        ) : null}
      </div>
      <LegalModal doc={privacyOpen ? "privacy" : null} onClose={closePrivacy} />
    </form>
  );
}

