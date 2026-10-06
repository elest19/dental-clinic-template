"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { BookingForm } from "@/components/booking-form";
import { bookingSection } from "@/content/booking";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" as const },
} as const;

/**
 * Booking section (id="book") — the target of every "Book an Appointment"
 * button. Navy background with off-white text; the navbar highlights nothing
 * while this section is in view, because the Book button is already
 * emphasized in the bar itself.
 */
export function BookingSection() {
  return (
    <motion.section
      id="book"
      className="relative scroll-mt-28 overflow-hidden bg-foreground py-20 text-background"
      {...reveal}
    >
      <Image
        src="/images/kid-waving.png"
        alt=""
        aria-hidden="true"
        width={320}
        height={320}
        className="pointer-events-none absolute -bottom-[calc(clamp(220px,22vw,320px)*0.1445)] right-[6%] z-0 hidden w-[clamp(220px,22vw,320px)] select-none md:block"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left: heading, intro, form */}
          <div>
            <h2 className="font-display text-4xl leading-none text-background md:text-5xl">
              {bookingSection.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-background/80">
              {bookingSection.description}
            </p>

            <BookingForm />
          </div>

          {/* Right: what happens next — a plain numbered list */}
          <div className="lg:pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              {bookingSection.stepsHeading}
            </p>
            <ol className="mt-6 space-y-8">
              {bookingSection.steps.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden="true" className="font-display text-xl text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold text-background">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-background/80">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
