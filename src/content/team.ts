import type { ContentImage } from "@/content/images";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: ContentImage;
};

/** Copy for the team block inside the About section. */
export const teamSection = {
  title: "Meet the people behind your care.",
  description:
    "Every visit is led by a clinician who explains your options, answers your questions, and listens to what matters to you.",
} as const;

/** The first entry is rendered as the large split-layout portrait. */
export const leadDentist: TeamMember = {
  name: "Dr. Maria Reyes",
  role: "Lead General Dentist",
  bio: "Sees patients for check-ups, cleanings, and fillings, and explains each step before she starts.",
  image: {
    src: "/images/team/dr-maria-reyes.jpg",
    alt: "Dr. Maria Reyes, lead dentist",
    width: 1200,
    height: 1800,
    focus: "center",
  },
};

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Ethan Soriano",
    role: "Cosmetic & Restorative Dentist",
    bio: "Handles whitening, veneers, crowns, and bridges, and quotes the full price before treatment begins.",
    image: {
      src: "/images/team/dr-ethan-soriano.jpg",
      alt: "Dr. Ethan Soriano, cosmetic dentist",
      width: 1200,
      height: 1800,
      focus: "center",
    },
  },
  {
    name: "Dr. Caleb Tan",
    role: "Orthodontic Specialist",
    bio: "Fits braces and clear aligners, and walks you through each stage and its cost before you commit.",
    image: {
      src: "/images/team/dr-caleb-tan.jpg",
      alt: "Dr. Caleb Tan, orthodontic specialist",
      width: 1200,
      height: 1798,
      focus: "center",
    },
  },
];
