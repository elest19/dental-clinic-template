import type { NextConfig } from "next";

/**
 * Service detail pages moved from /services/<service> to
 * /services/<category>/<service>. These keep old links and bookmarks working.
 *
 * The "general-dentistry" service shares its slug with the General Dentistry
 * category page, so it is deliberately excluded — a redirect there would make
 * /services/general-dentistry unreachable as a category page.
 */

const legacyServiceRedirects = [
  { service: "dental-cleaning", category: "general-dentistry" },
  { service: "dental-examinations", category: "general-dentistry" },
  { service: "emergency-dentistry", category: "general-dentistry" },
  { service: "dental-sealants", category: "general-dentistry" },
  { service: "teeth-whitening", category: "cosmetic-dentistry" },
  { service: "dental-bonding", category: "cosmetic-dentistry" },
  { service: "dental-veneers", category: "cosmetic-dentistry" },
  { service: "dental-implants", category: "restorative-dentistry" },
  { service: "crowns-and-bridges", category: "restorative-dentistry" },
  { service: "root-canal-therapy", category: "restorative-dentistry" },
  { service: "tooth-extractions", category: "restorative-dentistry" },
  { service: "dentures", category: "restorative-dentistry" },
  { service: "orthodontics-braces", category: "specialty-services" },
  { service: "pediatric-dentistry", category: "specialty-services" },
  { service: "temporomandibular-joint-care", category: "specialty-services" },
  { service: "sedation-dentistry", category: "specialty-services" },
  { service: "retainer-repair", category: "specialty-services" },
].map(({ service, category }) => ({
  source: `/services/${service}`,
  destination: `/services/${category}/${service}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    // All imagery is served locally from /public/images — no remote hosts allowed.
    minimumCacheTTL: 604800,
  },
  async redirects() {
    return legacyServiceRedirects;
  },
};

export default nextConfig;
