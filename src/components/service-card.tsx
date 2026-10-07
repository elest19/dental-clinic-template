import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceImage } from "@/components/service-image";
import { formatPrice, type Service } from "@/content/services";

export function ServiceCard({ service, priority = false }: { service: Service; priority?: boolean }) {
  return (
    <Link
      href={`/services/${service.categorySlug}/${service.slug}`}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-md)] border border-border bg-card text-left transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="sr-only">
        {service.name}: learn more about {service.description}
      </span>

      <ServiceImage
        image={service.image}
        alt={service.image?.alt}
        ratio="aspect-[4/3] sm:aspect-[3/2]"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        priority={priority}
        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary">{service.label}</p>
          <span className="shrink-0 text-[11px] font-medium text-muted-foreground sm:text-xs">
            <span className="sm:hidden">from {formatPrice(service.startingPrice)}</span>
            <span className="hidden sm:inline">ranges from {formatPrice(service.startingPrice)}</span>
            {service.priceNote ? ` ${service.priceNote}` : ""}
          </span>
        </div>

        <h3 className="mt-3 font-display text-lg text-balance text-foreground transition-colors group-hover:text-primary sm:mt-4 sm:text-2xl">
          {service.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:line-clamp-none">
          {service.description}
        </p>

        <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-medium text-primary">
          View services <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}