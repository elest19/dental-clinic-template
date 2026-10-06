export type Testimonial = {
  quote: string;
  patient: string;
  treatment: string;
};

/** Copy for the testimonial section heading. */
export const testimonialSection = {
  title: "What patients say after their visit.",
  description: "Short reviews from people treated at the clinic this year.",
} as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      "I had put off the dentist for years. They cleaned my teeth, showed me two small cavities on the X-ray, and fixed both in the same visit. No lectures, no upselling.",
    patient: "Angela M.",
    treatment: "Dental Cleaning",
  },
  {
    quote:
      "Whitening took about an hour and they checked for sensitivity halfway through. My teeth were several shades lighter and the price matched the quote they gave me on Monday.",
    patient: "Jasper C.",
    treatment: "Teeth Whitening",
  },
  {
    quote:
      "They explained the X-ray, gave me a written plan with prices, and let me think about it overnight. I booked the next morning.",
    patient: "Lena R.",
    treatment: "General Dentistry",
  },
];
