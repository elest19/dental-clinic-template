"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/content/site";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" as const },
} as const;

const detailLabel = "text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground";
const detailLink =
  "text-base text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Location section (id="contact") — the target of the navbar's "Contact Us"
 * link. The map column bleeds to the right edge of the viewport on desktop;
 * `overflow-x-clip` absorbs the scrollbar-width overshoot of the 100vw-based
 * bleed calculation so no horizontal scrollbar appears.
 */
export function LocationSection() {
  return (
    <motion.section
      id="contact"
      className="scroll-mt-28 overflow-x-clip border-t border-border bg-[#edf5f8] py-20"
      {...reveal}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: heading + clinic details as plain text blocks */}
          <div>
            <SectionHeader
              title="Find us along Harbor View."
              description="Plan your route, check our hours, and reach us anytime."
            />

            <div className="mt-10 space-y-6">
              <div className="border-t border-border pt-5">
                <p className={detailLabel}>Address</p>
                <p className="mt-1.5 text-base leading-relaxed text-foreground">
                  {siteConfig.address}
                </p>
              </div>

              <div className="border-t border-border pt-5">
                <p className={detailLabel}>Phone</p>
                <a href={`tel:${siteConfig.phoneHref}`} className={`mt-1.5 inline-block ${detailLink}`}>
                  {siteConfig.phone}
                </a>
              </div>

              <div className="border-t border-border pt-5">
                <p className={detailLabel}>Email</p>
                <a href={`mailto:${siteConfig.email}`} className={`mt-1.5 inline-block ${detailLink}`}>
                  {siteConfig.email}
                </a>
              </div>

              <div className="border-t border-border pt-5">
                <p className={detailLabel}>Opening hours</p>
                <div className="mt-2 space-y-1.5">
                  {siteConfig.openingHours.map((entry) => (
                    <div key={entry.day} className="grid grid-cols-2 gap-x-6 text-base">
                      <span className="text-muted-foreground">{entry.day}</span>
                      <span className="text-right text-foreground">{entry.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <p className={detailLabel}>Follow us</p>
                <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
                  {siteConfig.socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={detailLink}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <a
                  href={siteConfig.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-base font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Get directions
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: map block bleeding to the viewport's right edge */}
          <div className="relative h-[320px] lg:mr-[calc((max((100vw_-_80rem)/2,0px)_+_2rem)_*_-1)] lg:h-auto">
            {siteConfig.mapEmbedUrl ? (
              <iframe
                src={siteConfig.mapEmbedUrl}
                title={`Map showing ${siteConfig.name} at ${siteConfig.address}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
                <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Clinic location
                </p>
                <p className="max-w-sm text-base leading-relaxed text-foreground">
                  {siteConfig.address}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
