"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";

import { BookingSection } from "@/components/booking-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { LocationSection } from "@/components/location-section";
import { Navbar } from "@/components/navbar";
import { SectionHeader } from "@/components/section-header";
import { ServiceImage } from "@/components/service-image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aboutSection, valuesSection } from "@/content/about";
import { dentalPackages, packageSection } from "@/content/packages";
import { clinicImages } from "@/content/images";
import {
  formatPrice,
  getCategoryStartingPrice,
  getServicesByCategory,
  serviceCategories,
  serviceSection,
} from "@/content/services";
import { leadDentist, teamMembers, teamSection } from "@/content/team";
import { testimonialSection, testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" as const },
} as const;

/** Line icons for the values row, paired with valuesSection.items by index. */
const valueIcons = [Stethoscope, Users, Clock3, Sparkles];

export function MainPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />

        <motion.section id="about" className="scroll-mt-28 bg-[#edf5f8] py-20" {...reveal}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div>
                <div className="overflow-hidden rounded-[var(--radius-sm)]">
                  <Image
                    src={clinicImages.about.src}
                    alt={clinicImages.about.alt}
                    width={clinicImages.about.width}
                    height={clinicImages.about.height}
                    className="h-[420px] w-full object-cover"
                  />
                </div>
              </div>

              <div>
                <SectionHeader
                  index={aboutSection.index}
                  title={aboutSection.title}
                  description={aboutSection.description}
                />

                <div className="mt-8">
                  {aboutSection.blocks.map((item) => (
                    <div key={item.title} className="border-t border-border py-6">
                      <p className="text-lg font-semibold text-foreground">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
                  {aboutSection.focusAreas.map((item, index) => (
                    <span key={item} className="flex items-center gap-3">
                      {index > 0 ? <span aria-hidden="true" className="h-3 w-px bg-border" /> : null}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-24 border-t border-border pt-16">
              <div className="max-w-2xl">
                <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                  {teamSection.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {teamSection.description}
                </p>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
                <div className="overflow-hidden rounded-[var(--radius-sm)]">
                  <Image
                    src={leadDentist.image.src}
                    alt={leadDentist.image.alt}
                    width={leadDentist.image.width}
                    height={leadDentist.image.height}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>

                <div className="border-t border-border pt-6 lg:border-t-0 lg:pt-0">
                  <h4 className="font-display text-4xl text-foreground md:text-5xl">{leadDentist.name}</h4>
                  <p className="mt-2 text-sm font-medium text-primary">{leadDentist.role}</p>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">{leadDentist.bio}</p>
                </div>
              </div>

              <div className="mt-16 grid gap-10 sm:grid-cols-2">
                {teamMembers.map((member) => (
                  <div key={member.name}>
                    <div className="overflow-hidden rounded-[var(--radius-sm)]">
                      <Image
                        src={member.image.src}
                        alt={member.image.alt}
                        width={member.image.width}
                        height={member.image.height}
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </div>
                    <div className="mt-4 border-t border-border pt-4">
                      <h4 className="font-display text-2xl text-foreground">{member.name}</h4>
                      <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="services" className="scroll-mt-28 py-20" {...reveal}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              index={serviceSection.index}
              title={serviceSection.title}
              description={serviceSection.description}
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {serviceCategories.map((category) => {
                const categoryServices = getServicesByCategory(category.slug);
                const lowestPrice = getCategoryStartingPrice(category.slug);

                return (
                  <Card
                    key={category.slug}
                    className="group relative flex h-full flex-col overflow-hidden p-0 transition-colors hover:border-primary/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  >
                    <Link
                      href={`/services/${category.slug}`}
                      className="absolute inset-0 z-10 rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span className="sr-only">View all {category.name} services</span>
                    </Link>

                    <ServiceImage
                      image={category.image}
                      alt={category.image?.alt}
                      ratio="aspect-[16/10]"
                      sizes="(min-width: 768px) 45vw, 100vw"
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-2xl text-foreground transition-colors group-hover:text-primary">
                        {category.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.description}</p>

                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-sm text-muted-foreground">
                          {categoryServices.length} {categoryServices.length === 1 ? "service available" : "services available"}
                        </span>
                        {lowestPrice ? (
                          <span className="text-sm font-semibold text-foreground">ranges from {formatPrice(lowestPrice)}</span>
                        ) : null}
                      </div>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                        View services <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section className="bg-[#edf5f8] py-20" {...reveal}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title={valuesSection.title}
              description={valuesSection.description}
            />

            <div className="mt-10 grid border-t border-border md:grid-cols-2 xl:grid-cols-4">
              {valuesSection.items.map((item, index) => {
                const Icon = valueIcons[index];

                return (
                  <div
                    key={item.title}
                    className={cn(
                      "border-b border-border py-8 md:py-10",
                      "xl:border-b-0",
                      // Hairline rules: horizontal between stacked rows,
                      // vertical between columns at md (2-col) and xl (4-col).
                      index % 2 === 1 && "md:border-l md:pl-8",
                      index % 2 === 0 && "md:pr-8",
                      index === 1 && "xl:pr-8",
                      index === 2 && "xl:border-l xl:pl-8",
                    )}
                  >
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-2xl text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section className="py-20" {...reveal}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title={packageSection.title}
              description={packageSection.description}
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dentalPackages.map((pkg) => (
                <Card
                  key={pkg.title}
                  className={cn(
                    "flex flex-col p-5",
                    pkg.popular ? "border-primary bg-[#eaf6f8]" : "border-border",
                  )}
                >
                  {pkg.popular ? <Badge className="mb-4">Most popular</Badge> : null}
                  <h3 className="font-display text-3xl text-foreground">{pkg.title}</h3>
                  <p className="mt-4 text-3xl font-semibold text-foreground">{pkg.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pkg.description}</p>
                  <ul className="mt-5 space-y-3 text-sm text-foreground">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                        <span>{feature} available</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="bg-foreground py-20 text-background" {...reveal}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              tone="dark"
              title={testimonialSection.title}
              description={testimonialSection.description}
            />

            {/* One featured quote plus two smaller ones, separated by rules. */}
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <figure className="border-t border-white/20 pt-6">
                <div className="flex items-center gap-1 text-accent">
                  <span className="sr-only">Rated 5 out of 5</span>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${testimonials[0].patient}-${index}`} fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-3xl leading-snug text-background sm:text-4xl">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-white/20 pt-4">
                  <p className="font-medium text-background">{testimonials[0].patient}</p>
                  <p className="mt-1 text-sm text-background/70">{testimonials[0].treatment}</p>
                </figcaption>
              </figure>

              <div className="flex flex-col justify-center gap-8">
                {testimonials.slice(1).map((item) => (
                  <figure key={item.patient} className="border-t border-white/20 pt-6">
                    <div className="flex items-center gap-1 text-accent">
                      <span className="sr-only">Rated 5 out of 5</span>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={`${item.patient}-${index}`} fill="currentColor" className="h-3 w-3" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-base leading-relaxed text-background/90">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 flex items-baseline justify-between gap-3 border-t border-white/15 pt-3">
                      <p className="text-sm font-medium text-background">{item.patient}</p>
                      <p className="text-sm text-background/70">{item.treatment}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <FaqSection />

        <LocationSection />

        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
