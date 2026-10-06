import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceImage } from "@/components/service-image";
import { formatPrice, type Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-border bg-white/80 transition-colors hover:border-primary/40 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Link
        href={`/services/${service.categorySlug}/${service.slug}`}
        className="absolute inset-0 z-10 rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="sr-only">
          {service.name}: learn more about {service.description}
        </span>
      </Link>

      <ServiceImage
        image={service.image}
        alt={service.image?.alt}
        ratio="aspect-[4/3]"
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary">{service.label}</p>
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            from {formatPrice(service.startingPrice)}
            {service.priceNote ? ` ${service.priceNote}` : ""}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl text-foreground transition-colors group-hover:text-primary">
          {service.name}
        </h3>

        {/* flex-1 keeps the link pinned to the bottom so cards align in a row */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary">
          Learn more <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}