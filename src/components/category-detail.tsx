import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { getServicesByCategory, type ServiceCategory } from "@/content/services";

export function CategoryDetail({ category }: { category: ServiceCategory }) {
  const items = getServicesByCategory(category.slug);

  return (
    <div className="bg-background text-foreground">
      <Navbar variant="detail" />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="mt-8 max-w-2xl">
          <h1 className="mt-4 font-display text-5xl leading-none text-foreground sm:text-6xl">{category.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{category.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "service" : "services"} available
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <ServiceCard key={service.slug} service={service} priority={index < 3} />
          ))}
        </div>

        <div className="mt-16 rounded-[var(--radius-md)] border border-border bg-[#edf5f8] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">Talk to our team.</h2>
            <Button asChild className="bg-foreground text-white hover:bg-foreground/90">
              <Link href="/#contact">Contact Us</Link>
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