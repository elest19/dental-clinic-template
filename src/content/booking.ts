export type BookingStep = {
  title: string;
  text: string;
};

/**
 * All copy for the Booking section (id="book"): the section intro,
 * the "What happens next" steps, and every user-facing string in the
 * appointment request form.
 */
export const bookingSection = {
  title: "Request an appointment.",
  description:
    "Send your details and preferred time. Our front desk replies within one business day to confirm the booking.",
  stepsHeading: "What happens next",
  steps: [
    {
      title: "We confirm within one business day",
      text: "Send your request and our front desk replies within one business day to confirm a time that works for you.",
    },
    {
      title: "We match you with the right dentist",
      text: "Your concern goes to the clinician who handles that work most, from routine cleanings to braces.",
    },
    {
      title: "You arrive, we take it from there",
      text: "Check in at the front desk and we do the rest. Clear pricing, no surprises, and your visit finished on schedule.",
    },
  ] as BookingStep[],
};

export const bookingForm = {
  labels: {
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    service: "Preferred service ",
    date: "Preferred date",
    message: "Message",
  },
  placeholders: {
    name: "Your name",
    email: "you@example.com",
    phone: "0917 123 4567",
    service: "Select a service",
    message: "Tell us a little about your goals and scheduling needs.",
  },
  errors: {
    name: "Please enter your full name.",
    email: "Please enter a valid email address.",
    phone: "Please provide a phone number.",
    service: "Please choose a service.",
    date: "Please choose a preferred date.",
    message: "Please add a few details about your visit.",
    consent: "Please confirm we may contact you about your request.",
  },
  consent: {
    label: "I agree to be contacted about my appointment request. Read our",
    privacyLabel: "Privacy Policy",
  },
  submitLabel: "Send request",
  successMessage:
    "Your request is in. We will confirm your appointment within one business day.",
} as const;
