/** Copy for the About section (id="about") on the homepage. */
export const aboutSection = {
  index: "01",
  title: "Check-ups first. Treatment only when you need it.",
  description:
    "We examine your teeth and gums, take X-rays when they are useful, and talk you through what we find before any treatment starts.",
  blocks: [
    {
      title: "Our mission",
      text: "Keep small problems small with regular check-ups, cleanings, and timely repairs.",
    },
    {
      title: "Our values",
      text: "We explain what we found, quote the full price up front, and only treat what needs treating.",
    },
  ],
  focusAreas: ["Preventive care", "Digital X-rays", "Emergency appointments", "Children welcome"],
} as const;

/** Copy for the values row on the homepage. Icons are paired by index in the component. */
export const valuesSection = {
  title: "What you can expect at every visit.",
  description: "Four things every visit includes, from a cleaning to a crown.",
  items: [
    {
      title: "Problems caught early",
      text: "We treat small cavities and gum issues before they turn into bigger work.",
    },
    {
      title: "Straight answers",
      text: "You see the X-rays and hear what each option involves and what it costs.",
    },
    {
      title: "Appointments that fit",
      text: "Open Monday to Saturday, with same-week slots for new patients.",
    },
    {
      title: "See what we see",
      text: "Digital X-rays and intraoral photos shown on the screen beside the chair.",
    },
  ],
} as const;