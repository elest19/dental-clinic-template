import { siteConfig } from "@/content/site";

export type LegalSection = {
  heading: string;
  body: string[];
};

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/** Copy for the Terms of Service dialog. */
export const termsDoc: LegalDoc = {
  title: "Terms of Service",
  updated: "Effective January 1, 2026",
  intro:
    "These terms cover appointments, treatment, and payment at BrightSmile Dental Clinic. Booking a visit means you accept them.",
  sections: [
    {
      heading: "Appointments",
      body: [
        "Please arrive 10 minutes before your slot so we can start on time. If you need to cancel or move a visit, tell us at least 24 hours ahead by phone or email.",
        "Arriving more than 15 minutes late may mean we reschedule your visit to protect the next patient's slot.",
      ],
    },
    {
      heading: "Treatment and consent",
      body: [
        "Before any treatment beyond a routine check-up, we give you a written plan with the diagnosis, the options, and the full price. Treatment starts only after you agree to the plan.",
        "You can ask questions at any point, and you can decline or stop treatment. We note your decision in your record.",
      ],
    },
    {
      heading: "Prices and payment",
      body: [
        "The price we quote before treatment is the price you pay. If we find extra work mid-treatment, we pause and agree the added cost with you first.",
        `Payment is due on the day of treatment. We accept cash, bank transfer, and major cards. For plans above ${siteConfig.currency}20,000, we offer split payments across visits.`,
      ],
    },
    {
      heading: "Records and privacy",
      body: [
        "We keep your dental records as required by Philippine health regulations. How we store and share them is explained in our Privacy Policy.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `Questions about these terms? Call us at ${siteConfig.phone} or email ${siteConfig.email}.`,
      ],
    },
  ],
};

/** Copy for the Privacy Policy dialog. */
export const privacyDoc: LegalDoc = {
  title: "Privacy Policy",
  updated: "Effective January 1, 2026",
  intro:
    "This policy explains what patient information we keep, why we keep it, and who can see it.",
  sections: [
    {
      heading: "What we collect",
      body: [
        "We keep your name, contact details, health history, treatment notes, X-rays and photos, and billing records. We collect this directly from you at the clinic or when you book online.",
      ],
    },
    {
      heading: "Why we use it",
      body: [
        "We use your information to plan and carry out your care, send appointment reminders, process payment, and meet our legal record-keeping duties. We do not sell patient data.",
      ],
    },
    {
      heading: "Who sees it",
      body: [
        "Only clinic staff involved in your care can open your record. We share details outside the clinic only with your consent, for example with a dental lab or your insurer, or when the law requires it.",
      ],
    },
    {
      heading: "How long we keep records",
      body: [
        "We keep dental records for at least 10 years after your last visit, as required by health regulations. After that, paper records are shredded and digital records are deleted.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask for a copy of your record, ask us to correct a mistake, or ask how your information has been used. Bring a valid ID when you visit so we can confirm your identity.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `For privacy requests, email ${siteConfig.email} or call ${siteConfig.phone}. We reply within 5 working days.`,
      ],
    },
  ],
};
