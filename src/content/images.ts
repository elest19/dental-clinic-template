export type ContentImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focus?: string;
};

export const clinicImages = {
  hero: {
    src: "/images/clinic/hero.webp",
    alt: "Dentist speaking with a patient in a bright, modern treatment room",
    width: 2100,
    height: 1400,
    focus: "center",
  },
  about: {
    src: "/images/clinic/about.webp",
    alt: "Dental clinician examining a patient during a routine check-up",
    width: 1200,
    height: 960,
    focus: "center",
  },
};
