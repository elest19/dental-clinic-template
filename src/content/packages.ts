export type DentalPackage = {
  title: string;
  price: string;
  popular?: boolean;
  description: string;
  features: string[];
};

/** Copy for the pricing section heading on the homepage. */
export const packageSection = {
  title: "Packages with prices listed up front.",
  description: "Four bundles for common treatments. What is included is what you pay for.",
} as const;

export const dentalPackages: DentalPackage[] = [
  {
    title: "Essential Care",
    price: "₱1,800",
    description: "One visit: exam, cleaning, and a full check of your teeth and gums.",
    features: ["Consultation", "Dental Cleaning", "Oral Examination"],
  },
  {
    title: "Smile Bright",
    price: "₱4,200",
    popular: true,
    description: "Cleaning, exam, and a whitening session in one appointment.",
    features: ["Dental Cleaning", "Oral Examination", "Teeth Whitening"],
  },
  {
    title: "Complete Care",
    price: "₱5,800",
    description: "A full exam and cleaning with an X-ray to catch anything the mirror misses.",
    features: ["Consultation", "Cleaning", "Oral Examination", "Dental X-Ray"],
  },
  {
    title: "Family Dental Care",
    price: "₱9,500",
    description: "Check-ups and cleaning for up to four people in one booking.",
    features: [
      "Consultation and Cleaning for each member",
      "Oral Examination",
      "Fluoride Treatment for children",
    ],
  },
];
