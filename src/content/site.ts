export type SocialLink = {
  label: string;
  href: string;
};

/**
 * Optional looping background video for the hero.
 * Leave unset to render the static hero image.
 * `poster` doubles as the still shown when prefers-reduced-motion is on.
 */
export type HeroVideo = {
  src: string;
  poster: string;
};

export const siteConfig = {
  name: "BrightSmile Dental Clinic",
  shortName: "BrightSmile",
  tagline: "Family and cosmetic dental care in Makati.",
  description:
    "BrightSmile Dental Clinic in Makati offers check-ups, cleanings, fillings, whitening, braces, and emergency appointments.",
  email: "hello@brightsmiledental.com",
  phone: "+63 (02) 555 0198",
  phoneHref: "+63025550198",
  address: "145 Harbor View Avenue, Makati City, Metro Manila 1200",
  /** Embeddable map URL (e.g. Google Maps embed). Empty renders the styled placeholder. */
  mapEmbedUrl: "",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=145%20Harbor%20View%20Avenue%2C%20Makati%20City%2C%20Metro%20Manila%201200",
  currency: "₱",
  heroNote: "Open Monday–Saturday • emergency care available",
  heroSubtitle: "Check-ups, cleanings, fillings, whitening, and braces, six days a week.",
  availabilityNote: "Same-week appointments available for new patients.",
  heroVideo: undefined as HeroVideo | undefined,
  openingHours: [
    { day: "Mon - Fri", hours: "8:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
    { day: "Sunday", hours: "By appointment only" },
  ],
  socialLinks: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ] as SocialLink[],
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
] as const;

/** Legal links open the legal modal from the footer. */
export const legalLinks = [
  { label: "Terms of Service", key: "terms" },
  { label: "Privacy Policy", key: "privacy" },
] as const;

/**
 * Service category and service detail pages reuse the main navbar with a
 * reduced link set — Home and FAQ only make sense from the homepage.
 */
// For detail pages we want the full site navigation including Home and FAQ
export const detailNavItems: readonly NavItem[] = navItems;
