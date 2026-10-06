import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { ServiceImage } from "@/components/service-image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { formatPrice, getCategoryBySlug, type Service } from "@/content/services";

export function ServicesDetail({ service }: { service: Service }) {
  const category = getCategoryBySlug(service.categorySlug);

  return (
    <div className="bg-background text-foreground">
      <Navbar variant="detail" />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <Button asChild variant="outline">
          <Link
            href={`/services/${service.categorySlug}`}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {category?.name ?? "services"}
          </Link>
        </Button>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ServiceImage keeps the frame when the image is missing or fails */}
          <ServiceImage
            image={service.image}
            alt={service.image?.alt}
            ratio="aspect-[16/10]"
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
            className="rounded-[var(--radius-sm)]"
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{service.label}</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-foreground sm:text-6xl">{service.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{service.detail}</p>
            <div className="mt-6 inline-flex items-center rounded-[var(--radius-md)] border border-border bg-surface px-4 py-2 text-base font-medium text-foreground">
              Starting from{" "}
              <span className="ml-2 text-primary">
                {formatPrice(service.startingPrice)}
                {service.priceNote ? ` ${service.priceNote}` : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">What to expect</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {service.whatToExpect.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Who it’s for</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {service.whoItsFor.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-[var(--radius-md)] border border-border bg-[#edf5f8] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-4xl text-foreground">Let’s plan your next visit.</h2>
            <Button asChild className="bg-accent text-foreground hover:bg-accent/90">
              <Link href="/#book">Book an Appointment</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
            <span>{siteConfig.phone}</span>
            <span>{siteConfig.email}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

